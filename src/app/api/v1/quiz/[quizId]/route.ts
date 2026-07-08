// Phase 4: Quiz API — GET quiz, POST submit attempt
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ quizId: string }> }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { quizId } = await params;
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId, isPublished: true },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          select: {
            id: true, type: true, questionText: true, questionImageUrl: true,
            options: true, points: true, order: true,
            // Never send correctAnswer to client
          },
        },
        _count: { select: { attempts: true } },
      },
    });

    if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });

    // Check attempt count for this user
    const userAttempts = await prisma.quizAttempt.count({
      where: { quizId, userId: user.id },
    });

    // Randomize questions if enabled
    const questions = quiz.isRandomized
      ? [...quiz.questions].sort(() => Math.random() - 0.5)
      : quiz.questions;

    return NextResponse.json({
      ...quiz,
      questions,
      userAttempts,
      canAttempt: userAttempts < quiz.maxAttempts,
    });
  } catch (err) {
    console.error('[GET /quiz]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
