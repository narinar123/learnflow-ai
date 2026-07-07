import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { message, courseName, lessonName } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your-gemini-api-key') {
      // Mock fallback assistant responses with context when Gemini Key is absent
      let fallbackText = `[Demo Mode - Configure GEMINI_API_KEY for real live responses]\n\n`;
      if (courseName && lessonName) {
        fallbackText += `Regarding your question about "${message}" in the lesson "${lessonName}" of "${courseName}":\n\nThis concept represents a foundational block of modern development. Loops repeat code block tasks, Figma auto-layouts control nested spacing, and React hooks manage reactive state changes locally.`;
      } else {
        fallbackText += `Regarding "${message}":\n\nThat is an excellent topic. In programming, design, and analytics, proper structuring and continuous validation ensures optimal system behavior.`;
      }
      return NextResponse.json({ reply: fallbackText });
    }

    // Initialize Gemini AI Client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are a helpful, advanced, educational AI Tutor on the LearnFlow AI platform.
Your task is to explain concepts clearly, provide simple real-world analogies, code snippets, or practice quiz questions based on the user's inquiry.
Context: The user is currently learning about "${lessonName || 'General Topics'}" in the course "${courseName || 'General Skills'}".
Respond using clear markdown formatting. Be encouraging and concise (limit response to under 300 words).`;

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I will act as a helpful AI tutor for LearnFlow AI, providing clear, concise, markdown-formatted explanations with analogies or code samples based on user request.' }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const replyText = response.text();

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response', details: error.message },
      { status: 500 }
    );
  }
}
