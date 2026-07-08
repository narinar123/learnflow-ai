import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const { userGoals, currentLevel } = await req.json();

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        pathName: z.string(),
        description: z.string(),
        modules: z.array(z.object({
          moduleName: z.string(),
          topics: z.array(z.string()),
          estimatedHours: z.number()
        }))
      }),
      system: 'You are an expert curriculum designer. Generate a personalized learning path based on the user\'s goals and current skill level.',
      prompt: `User Goals: ${userGoals}\nCurrent Level: ${currentLevel}`,
    });

    return NextResponse.json({ result: object });
  } catch (error) {
    console.error('Learning Path API Error:', error);
    return NextResponse.json({ error: 'Failed to generate learning path' }, { status: 500 });
  }
}
