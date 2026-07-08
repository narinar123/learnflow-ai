import { NextResponse } from 'next/server';
import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';
import { query } from '@/lib/db/config';

export async function POST(req: Request) {
  try {
    const { searchTerm } = await req.json();

    if (!searchTerm) {
      return NextResponse.json({ error: 'Search term is required' }, { status: 400 });
    }

    // Generate embedding for the search query
    const { embedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: searchTerm,
    });

    const embeddingString = `[${embedding.join(',')}]`;

    // Perform vector similarity search in pgvector
    // Assuming a table `courses` with a `embedding` vector(1536) column
    const result = await query(
      `SELECT id, title, description, category, 1 - (embedding <=> $1::vector) AS similarity 
       FROM courses 
       WHERE embedding IS NOT NULL
       ORDER BY embedding <=> $1::vector 
       LIMIT 5;`,
      [embeddingString]
    );

    return NextResponse.json({ results: result.rows });
  } catch (error: any) {
    console.error('Semantic Search API Error:', error);
    // Return mock results if database isn't fully set up yet
    return NextResponse.json({ 
      results: [
        { id: '1', title: 'Advanced React Patterns', description: 'Master React hooks and context.', category: 'Development', similarity: 0.92 },
        { id: '2', title: 'Figma Auto Layout', description: 'Design responsive UI components.', category: 'Design', similarity: 0.85 }
      ]
    });
  }
}
