import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { currentSkills, targetRole } = await req.json();

    if (!currentSkills || !targetRole) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        summary: z.string().describe('A brief encouraging summary of the gap between their current skills and the target role.'),
        roadmap: z.array(z.object({
          title: z.string().describe('Title of the learning phase'),
          description: z.string().describe('What needs to be learned and why'),
          skillsToLearn: z.array(z.string()).describe('Specific skills/tools to acquire in this phase')
        })).length(4).describe('Exactly 4 sequential steps to reach the goal')
      }),
      system: 'You are an expert career advisor. Analyze the user\'s current skills against their target role and provide a structured learning roadmap to bridge the gap.',
      prompt: `Current Skills: ${currentSkills}\nTarget Role: ${targetRole}`,
    });

    return NextResponse.json({ result: object });
  } catch (error: any) {
    console.error('Skill Gap API Error:', error);
    return NextResponse.json({ error: 'Failed to generate roadmap' }, { status: 500 });
  }
}
