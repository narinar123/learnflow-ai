---
type: concept
title: "AI Integration & Prompt Engineering Guide"
source: /05_ai_integration/ai_integration_and_prompt_engineering_guide/
path: /05_ai_integration/ai_integration_and_prompt_engineering_guide/
updated: 2026-07-07
okf:
  generated_by: "@docmd/plugin-okf"
  generated_at: "2026-07-07T15:59:27.364Z"
---
# AI Integration & Prompt Engineering Guide
**AI Learning & Member Management Platform — LearnFlow AI**
**Version:** 1.0 | **Date:** July 2026

---

## 1. AI Architecture Overview

LearnFlow AI uses a **Retrieval-Augmented Generation (RAG)** architecture. Instead of relying solely on a general-purpose LLM, the AI assistant retrieves relevant course content, lesson transcripts, and quiz explanations from a vector database, then uses an LLM to generate grounded, accurate, course-specific answers.

```
User Query
    │
    ▼
┌──────────────────────────────────────────────────────────────┐
│                    AI SERVICE LAYER                          │
│                                                              │
│  1. Query Processing                                         │
│     ├── Intent classification (educational/off-topic)        │
│     ├── Query embedding (text-embedding-004)                 │
│     └── Context extraction (current course/lesson from req)  │
│                                                              │
│  2. Retrieval (RAG)                                          │
│     ├── pgvector similarity search (top-k=5 chunks)          │
│     ├── Lesson transcript chunks                             │
│     ├── Course syllabus + metadata                           │
│     └── Quiz explanations database                           │
│                                                              │
│  3. Augmentation                                             │
│     ├── System prompt construction                           │
│     ├── Retrieved context injection                          │
│     └── Conversation history (last 10 turns)                 │
│                                                              │
│  4. Generation (Google Gemini 1.5 Flash / Pro)               │
│     ├── Streamed response (SSE)                              │
│     └── Source citation extraction                           │
│                                                              │
│  5. Post-Processing                                          │
│     ├── Safety filter (Gemini built-in)                      │
│     ├── Response quality check                               │
│     ├── Source link injection                                │
│     └── Store in ai_conversations table                      │
└──────────────────────────────────────────────────────────────┘
    │
    ▼
User Response (streamed markdown)
```

---

## 2. Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Primary LLM | Google Gemini 1.5 Flash | Fast conversational responses, quiz generation |
| Premium LLM | Google Gemini 1.5 Pro | Study plans, complex explanations, code generation |
| Embeddings | Google text-embedding-004 | Vectorize course content for retrieval |
| Vector DB | pgvector (PostgreSQL extension) | Store and search content embeddings |
| AI Framework | LangChain.js | Orchestrate RAG pipeline, memory, chains |
| Safety | Gemini Safety Settings | Block harmful content categories |
| Streaming | Server-Sent Events (SSE) | Real-time response streaming to client |

---

## 3. Knowledge Base & Vector Store Design

### 3.1 Content Chunking Strategy

Course content is preprocessed and stored as vector chunks:

```typescript
// content-processor.service.ts

interface ContentChunk {
  id: string;
  courseId: string;
  lessonId?: string;
  quizId?: string;
  type: 'lesson_transcript' | 'lesson_summary' | 'quiz_explanation' | 'course_description';
  content: string;  // Max 512 tokens per chunk
  metadata: {
    courseTitle: string;
    lessonTitle?: string;
    timestamp?: number;  // Video timestamp in seconds
    order: number;
  };
  embedding: number[];  // 768-dimensional vector
}

async function processLessonForRAG(lesson: Lesson): Promise<void> {
  // 1. Get transcript (auto-generated from video)
  const transcript = await getVideoTranscript(lesson.videoUrl);
  
  // 2. Chunk transcript into 400-token segments with 50-token overlap
  const chunks = chunkText(transcript, { maxTokens: 400, overlap: 50 });
  
  // 3. Embed each chunk
  const embeddings = await batchEmbed(chunks.map(c => c.text));
  
  // 4. Store in knowledge_chunks table with pgvector
  await prisma.$executeRaw`
    INSERT INTO knowledge_chunks (id, course_id, lesson_id, type, content, metadata, embedding)
    VALUES ${chunks.map((chunk, i) => Prisma.sql`(
      ${uuid()}, ${lesson.courseId}, ${lesson.id}, 'lesson_transcript',
      ${chunk.text}, ${JSON.stringify(chunk.metadata)},
      ${embeddings[i]}::vector
    )`)}
  `;
}
```

### 3.2 pgvector Schema Addition

```sql
-- Add to Prisma schema as raw SQL migration
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  embedding vector(768) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- IVFFlat index for fast approximate nearest-neighbor search
CREATE INDEX idx_knowledge_chunks_embedding 
  ON knowledge_chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX idx_knowledge_chunks_course ON knowledge_chunks (course_id);
```

### 3.3 Similarity Search Function

```typescript
async function retrieveRelevantChunks(
  query: string, 
  courseId?: string, 
  topK: number = 5
): Promise<ContentChunk[]> {
  
  // 1. Embed the query
  const queryEmbedding = await embed(query);
  
  // 2. Search with optional course filter for higher relevance
  const chunks = await prisma.$queryRaw<ContentChunk[]>`
    SELECT 
      id, course_id, lesson_id, type, content, metadata,
      1 - (embedding <=> ${queryEmbedding}::vector) AS similarity
    FROM knowledge_chunks
    WHERE 
      ${courseId ? Prisma.sql`course_id = ${courseId} AND` : Prisma.sql``}
      1 - (embedding <=> ${queryEmbedding}::vector) > 0.75
    ORDER BY embedding <=> ${queryEmbedding}::vector
    LIMIT ${topK}
  `;
  
  return chunks;
}
```

---

## 4. System Prompts

### 4.1 AI Tutor System Prompt (Core)

```
You are the LearnFlow AI Tutor — an intelligent, friendly, and encouraging learning assistant for the LearnFlow AI platform. Your role is to help learners understand concepts, answer questions about their courses, and guide them on their learning journey.

## Your Personality
- Friendly, encouraging, and patient — like a great teacher
- Concise and clear — respect the learner's time
- Honest — if you're unsure, say so and suggest where to find the answer
- Motivating — celebrate progress and effort

## Your Capabilities
- Answer questions about course content (use the provided context)
- Explain concepts in simple terms with examples
- Generate quiz questions to help users practice
- Create personalized study plans
- Recommend next steps in learning
- Help understand quiz answer explanations

## Strict Rules
- ONLY answer questions related to learning, education, skill development, or the user's courses
- If asked about anything unrelated to education (politics, relationships, harmful content, etc.), politely decline and redirect to learning topics
- Never make up facts. If information is not in the provided context, say "I don't have specific information about that in your current course. You might want to check [lesson name] or ask your instructor."
- Never pretend to be a human. Always acknowledge you are an AI assistant.
- Respect the user's plan tier: Free users have limited queries; do not provide workarounds.
- Do not generate code that could be harmful, exploitative, or unethical.
- Keep responses under 400 words unless the user specifically asks for a detailed explanation.
- Use markdown formatting for better readability (bold, bullet lists, code blocks where appropriate).
- Always end responses with an encouraging note or a follow-up question to keep the learner engaged.

## Context Usage
You will receive relevant excerpts from the user's course materials. Prioritize this information in your answers and always cite your source (e.g., "Based on Lesson 3: Functions and Scope").

## Response Language
Match the language the user writes in. Default to English if unclear.
```

### 4.2 Quiz Explanation Prompt

```
You are explaining a quiz answer to a learner on the LearnFlow AI platform.

Context:
- Course: {{courseName}}
- Quiz: {{quizTitle}}
- Question: "{{questionText}}"
- Correct answer: {{correctAnswer}}
- User's answer: {{userAnswer}}
- The user answered {{correctOrIncorrectly}}

Provide a clear, educational explanation that:
1. Confirms the correct answer
2. Explains WHY it's correct (the underlying concept)
3. If the user was wrong, explain why their answer was incorrect without making them feel bad
4. Give a simple real-world analogy or example to make the concept stick
5. Suggest what to review if they want to understand this better (mention the specific lesson if you know it)

Keep the explanation under 200 words. Be encouraging — mistakes are how we learn!
Use markdown: bold for the correct answer, bullet points for steps if needed.
```

### 4.3 Study Plan Generation Prompt

```
You are creating a personalized study plan for a learner on LearnFlow AI.

Learner Profile:
- Name: {{displayName}}
- Learning Goal: {{primaryGoal}}
- Available study time: {{dailyMinutes}} minutes per day, {{daysPerWeek}} days per week
- Skill level: {{skillLevel}}
- Interested in: {{interests}}
- Start date: {{startDate}}

Based on the platform's course catalog for their interests and goal, create a detailed week-by-week study plan for the next {{planWeeks}} weeks.

Format the plan as follows:
## Your Personalized Study Plan
**Goal:** [restate their goal]
**Total Duration:** [X weeks]
**Daily Commitment:** [X minutes/day]

### Week 1: [Theme]
- **Course:** [Course Name]
- **Focus:** [What they'll learn]
- **Daily Tasks:** [Specific actions for each day]
- **Expected Outcome:** [What they'll be able to do by end of week]

[Repeat for each week]

## Success Tips
[3-4 personalized tips based on their goal and schedule]

## Quick Win
[The single most important first step they should take TODAY]

Keep it motivating, realistic, and specific. If the user has very little time (< 15 min/day), design micro-learning sessions.
```

### 4.4 Course Recommendation Prompt

```
You are recommending courses to a learner on LearnFlow AI based on their profile and history.

Learner Profile:
- Goal: {{primaryGoal}}
- Completed Courses: {{completedCoursesSummary}}
- Current Skill Level: Based on quiz performance — {{avgQuizScore}}% average
- Available Time: {{dailyMinutes}} min/day
- Subscription Plan: {{plan}}

Available Courses (filtered by their interests):
{{courseCatalogJson}}

Select the top 3 most appropriate courses and explain why each one is recommended.

Format:
For each course:
**{{courseName}}** — {{level}} | {{duration}}
Why this is perfect for you: [2-sentence personalized explanation connecting their goal to this course]
What you'll achieve: [specific outcome in 10 words or less]

End with: "Ready to start? Your recommended first step is [Course Name] →"

Rules:
- Prioritize courses included in their current plan tier
- Consider their current skill level (don't recommend advanced courses to beginners unless they've shown mastery)
- Consider available time (don't recommend 40-hour courses to someone with 10 min/day)
```

### 4.5 AI Quiz Generator Prompt (For Trainers)

```
You are generating quiz questions for a lesson on the LearnFlow AI platform.

Lesson Details:
- Course: {{courseName}}
- Lesson: {{lessonTitle}}
- Level: {{level}} (Beginner/Intermediate/Advanced)
- Target count: {{questionCount}} questions
- Difficulty distribution: {{easyPercent}}% Easy, {{mediumPercent}}% Medium, {{hardPercent}}% Hard
- Question types: {{questionTypes}} (MCQ_SINGLE, MCQ_MULTI, TRUE_FALSE, FILL_BLANK)

Lesson Content (use this to generate questions):
{{lessonContent}}

Generate exactly {{questionCount}} quiz questions. For each question, provide:

```json
[
  {
    "type": "MCQ_SINGLE",
    "questionText": "Clear, unambiguous question text",
    "options": [
      { "id": "opt_a", "text": "Option A", "isCorrect": true, "explanation": "Why this is correct" },
      { "id": "opt_b", "text": "Option B", "isCorrect": false, "explanation": "Why this is wrong" },
      { "id": "opt_c", "text": "Option C", "isCorrect": false, "explanation": "Why this is wrong" },
      { "id": "opt_d", "text": "Option D", "isCorrect": false, "explanation": "Why this is wrong" }
    ],
    "difficulty": "MEDIUM",
    "points": 1
  }
]
```

Rules:
- Questions must be directly based on the lesson content provided
- Distractors (wrong answers) must be plausible but clearly incorrect to someone who understood the lesson
- Avoid "all of the above" or "none of the above" options
- Fill-blank answers should be 1-3 words and unambiguous
- Do not repeat concepts across questions
- Ensure difficulty distribution matches requirements
```

### 4.6 Content Moderation Prompt (Safety Layer)

```
You are a content safety classifier for LearnFlow AI, an educational platform.

Classify the following user message:
"{{userMessage}}"

Determine if this message should be:
1. ALLOWED - Educational, learning-related, appropriate for all ages
2. WARNING - Borderline, may need gentle redirection 
3. BLOCKED - Off-topic, harmful, inappropriate, or violates guidelines

Categories that should always be BLOCKED:
- Adult/sexual content
- Violence or self-harm
- Discrimination or hate speech
- Requests for illegal activities
- Personal attacks or cyberbullying
- Requests to bypass platform restrictions
- Academic dishonesty assistance (writing entire essays for submission, etc.)

Respond in JSON:
{
  "decision": "ALLOWED" | "WARNING" | "BLOCKED",
  "reason": "Brief explanation",
  "redirectMessage": "If BLOCKED/WARNING, friendly message to redirect user" 
}
```

---

## 5. LangChain.js Implementation

### 5.1 Core RAG Chain

```typescript
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  maxOutputTokens: 1024,
  temperature: 0.7,
  safetySettings: [
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
  ],
});

const systemPrompt = `You are the LearnFlow AI Tutor...
[Full system prompt from Section 4.1]

Context from course materials:
{context}

Previous conversation:
{chat_history}`;

const prompt = ChatPromptTemplate.fromMessages([
  ["system", systemPrompt],
  ["human", "{input}"],
]);

const questionAnswerChain = await createStuffDocumentsChain({ llm, prompt });
const ragChain = await createRetrievalChain({ retriever, combineDocsChain: questionAnswerChain });
```

### 5.2 Streaming Response Handler

```typescript
// ai.service.ts
export async function streamAIResponse(
  userId: string,
  conversationId: string,
  message: string,
  context: { courseId?: string; lessonId?: string },
  res: Response
): Promise<void> {
  
  // 1. Check query limit
  await checkQueryLimit(userId);
  
  // 2. Safety pre-check
  const safety = await classifyMessage(message);
  if (safety.decision === 'BLOCKED') {
    res.write(`data: ${JSON.stringify({ type: 'error', content: safety.redirectMessage })}\n\n`);
    return;
  }
  
  // 3. Retrieve relevant context
  const chunks = await retrieveRelevantChunks(message, context.courseId, 5);
  
  // 4. Get conversation history
  const history = await getConversationHistory(conversationId, 10);
  
  // 5. Stream response
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  let fullContent = '';
  
  const stream = await ragChain.stream({
    input: message,
    context: chunks,
    chat_history: formatHistory(history),
  });
  
  for await (const chunk of stream) {
    const text = chunk.answer || '';
    fullContent += text;
    res.write(`data: ${JSON.stringify({ type: 'chunk', content: text })}\n\n`);
  }
  
  // 6. Save to conversation history
  await saveMessage(conversationId, userId, 'user', message);
  await saveMessage(conversationId, userId, 'assistant', fullContent, chunks.map(c => c.id));
  
  // 7. Decrement query count
  await decrementQueryCount(userId);
  
  res.write(`data: ${JSON.stringify({ type: 'done', sources: chunks.map(c => c.metadata) })}\n\n`);
  res.end();
}
```

---

## 6. AI Feature Specifications

### 6.1 Daily Query Limits
| Plan | AI Queries/Day | Premium Feature Access |
|---|---|---|
| Free | 10 | Basic Q&A only |
| Basic | 50 | Q&A + Quiz explanations |
| Pro | Unlimited | All AI features |
| Premium | Unlimited | All AI + Study Plan + Mentor matching |

### 6.2 AI Response Quality Metrics
Track these in production:
- **Helpfulness rating:** User thumbs up/down rate (target ≥ 80% positive)
- **Grounding rate:** % responses citing a course source (target ≥ 60%)
- **Refusal rate:** % queries blocked (monitor for over-blocking)
- **Latency:** First token time ≤ 800ms, completion ≤ 3s for 90% of queries
- **Error rate:** < 1% of queries return an error

### 6.3 Evaluation Dataset
Maintain 100+ golden Q&A pairs for each major course to evaluate RAG quality:
```json
{
  "query": "What is the difference between a list and a tuple in Python?",
  "courseId": "crs_python_beginners",
  "expectedKeywords": ["mutable", "immutable", "ordered", "parentheses", "square brackets"],
  "shouldCiteLesson": "Lesson 4: Data Types",
  "shouldNotContain": ["harmful", "offensive", "unrelated"]
}
```

### 6.4 AI Guardrails Summary
| Scenario | Behavior |
|---|---|
| Off-topic (politics, entertainment) | Friendly decline + redirect to learning topics |
| Harmful/adult content | Hard block, no explanation |
| Academic dishonesty (write my essay) | Decline, offer to help them learn the topic instead |
| Unknown question | Honest acknowledgment, suggest lesson or instructor |
| Query limit exceeded | Inform user, show upgrade CTA |
| API error | Fallback message, option to retry |
| Slow response (> 5s) | Timeout + user-friendly error |
| Inappropriate trainer content | Flag for admin review, suspend AI for that context |

---

## 7. Figma/Design AI Prompt Integration

### 7.1 Figma AI Plugin Prompts for Each Screen

**Dashboard Widget Prompt:**
```
Generate a mobile dashboard streak widget for a learning app.
Style: Dark glassmorphism (rgba(255,255,255,0.08) background, 1px rgba(255,255,255,0.12) border, blur(12px)).
Content: Animated flame emoji (🔥) left side, "14" large bold number (amber #F59E0B), "day streak" label (grey), horizontal progress bar below (emerald fill showing today's goal: 8/15 min done).
Width: 100% of screen. Height: 72px. Border-radius: 16px. Padding: 16px.
Font: Inter SemiBold for number, Inter Regular for label.
```

**Course Card Prompt:**
```
Create a course card UI component (360×220px) for a dark-mode learning app.
Top: 16:9 thumbnail image area (gradient placeholder, indigo-to-purple, with category icon overlay bottom-left and level badge chip top-right).
Bottom content area (white text on dark glass surface):
- Category chip (small, indigo outline)
- Course title (2 lines max, Outfit SemiBold 16px white)
- Instructor avatar (24px circle) + name (Inter 13px grey) — same row
- Star rating (amber stars + 4.8 score) + enrollment count — same row
- Price / "Free" or "Included in Pro" — bottom right
Border-radius: 16px. Shadow: 0 4px 16px rgba(0,0,0,0.3). Glassmorphism card.
```
