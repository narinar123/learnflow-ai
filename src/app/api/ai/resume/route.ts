import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { resumeContent } = await req.json();

    if (!resumeContent) {
      return NextResponse.json({ error: 'Resume content is required' }, { status: 400 });
    }

    const systemPrompt = `You are an expert Resume Reviewer. 
Review the provided resume content and provide constructive feedback. 
Highlight strengths, point out weaknesses, and suggest specific actionable improvements (e.g., using stronger action verbs, quantifying achievements).
Format your response with clear markdown headings and bullet points.`;

    const { text } = await generateText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      prompt: resumeContent,
    });

    return NextResponse.json({ result: text });
  } catch (error: any) {
    console.error('Resume Analysis API Error:', error);
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 });
  }
}
