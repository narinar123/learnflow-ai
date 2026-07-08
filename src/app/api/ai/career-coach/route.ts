import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `You are a highly experienced Career Coach on the GUIDESOFT IT SOLUTIONS platform.
Your task is to provide personalized career advice, resume tips, interview strategies, and skill gap analyses.
Always be encouraging, professional, and actionable. Structure your advice using markdown lists or bolded text.`;

    const result = await streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Career Coach API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), { status: 500 });
  }
}
