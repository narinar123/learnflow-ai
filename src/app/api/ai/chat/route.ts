import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  try {
    const { messages, modelType = 'gemini', courseName, lessonName } = await req.json();

    let model;
    if (modelType === 'openai') {
      model = openai('gpt-4o');
    } else if (modelType === 'claude') {
      model = anthropic('claude-3-5-sonnet-20240620');
    } else {
      model = google('gemini-1.5-flash');
    }

    const systemPrompt = `You are a helpful, advanced, educational AI Tutor on the GUIDESOFT IT SOLUTIONS platform.
Your task is to explain concepts clearly, provide simple real-world analogies, code snippets, or practice quiz questions.
Context: The user is currently learning about "${lessonName || 'General Topics'}" in the course "${courseName || 'General Skills'}".
Respond using clear markdown formatting. Be encouraging and concise.`;

    const result = await streamText({
      model,
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('AI API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
