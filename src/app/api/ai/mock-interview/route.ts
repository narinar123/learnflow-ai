import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  try {
    const { messages, jobTitle } = await req.json();

    const systemPrompt = `You are a professional Hiring Manager conducting an interview for the role of "${jobTitle}".
Ask one relevant interview question at a time. Wait for the user's answer.
After their answer, provide brief constructive feedback, and then ask the next question.
Keep it professional, challenging, but encouraging.`;

    const result = await streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Mock Interview API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), { status: 500 });
  }
}
