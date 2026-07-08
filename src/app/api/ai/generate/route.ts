import { generateText, generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { type, content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    if (type === 'summary') {
      const { text } = await generateText({
        model: openai('gpt-4o'),
        system: 'You are an expert educator. Summarize the following content clearly and concisely, focusing on the key takeaways.',
        prompt: content,
      });
      return NextResponse.json({ result: text });
    }

    if (type === 'notes') {
      const { text } = await generateText({
        model: openai('gpt-4o'),
        system: 'You are an expert educator. Convert the following text into highly structured, comprehensive markdown notes with headings, bullet points, and code snippets where appropriate.',
        prompt: content,
      });
      return NextResponse.json({ result: text });
    }

    if (type === 'flashcards') {
      const { object } = await generateObject({
        model: openai('gpt-4o'),
        schema: z.object({
          flashcards: z.array(z.object({
            front: z.string().describe('The question or concept on the front of the card'),
            back: z.string().describe('The answer or explanation on the back of the card')
          }))
        }),
        system: 'Create exactly 5 educational flashcards based on the provided content. Focus on the most important definitions or concepts.',
        prompt: content,
      });
      return NextResponse.json({ result: object.flashcards });
    }

    if (type === 'quiz') {
      const { object } = await generateObject({
        model: openai('gpt-4o'),
        schema: z.object({
          questions: z.array(z.object({
            question: z.string(),
            options: z.array(z.string()).length(4),
            correctAnswerIndex: z.number().min(0).max(3),
            explanation: z.string()
          }))
        }),
        system: 'Create a 3-question multiple-choice quiz based on the provided content. Each question must have 4 options and one correct answer.',
        prompt: content,
      });
      return NextResponse.json({ result: object.questions });
    }

    return NextResponse.json({ error: 'Invalid generation type' }, { status: 400 });

  } catch (error: any) {
    console.error('AI Generate API Error:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
