// Phase 4: Quiz Submit — POST answers, returns score + XP
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ quizId: string }> }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { answers, timeTakenSeconds } = await req.json();
    // answers: [{ questionId, selectedOptionIds?: string[], textAnswer?: string }]
    const { quizId } = await params;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });
    if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });

    // Check attempt limit
    const attemptCount = await prisma.quizAttempt.count({
      where: { quizId, userId: user.id },
    });
    if (attemptCount >= quiz.maxAttempts) {
      return NextResponse.json({ error: 'Maximum attempts reached' }, { status: 400 });
    }

    // Grade answers
    let totalPoints = 0;
    let earnedPoints = 0;
    const gradedAnswers = answers.map((ans: any) => {
      const question = quiz.questions.find(q => q.id === ans.questionId);
      if (!question) return { ...ans, isCorrect: false, points: 0 };

      totalPoints += question.points;
      let isCorrect = false;

      if (question.type === 'MCQ_SINGLE' || question.type === 'TRUE_FALSE') {
        const opts = question.options as any[];
        const correctOpt = opts?.find(o => o.isCorrect);
        isCorrect = ans.selectedOptionIds?.[0] === correctOpt?.id;
      } else if (question.type === 'MCQ_MULTI') {
        const opts = question.options as any[];
        const correctIds = opts?.filter(o => o.isCorrect).map(o => o.id).sort();
        const selectedIds = [...(ans.selectedOptionIds || [])].sort();
        isCorrect = JSON.stringify(correctIds) === JSON.stringify(selectedIds);
      } else if (question.type === 'FILL_BLANK') {
        isCorrect = ans.textAnswer?.trim().toLowerCase() === question.correctAnswer?.trim().toLowerCase();
      }

      if (isCorrect) earnedPoints += question.points;
      return { ...ans, isCorrect, points: isCorrect ? question.points : 0 };
    });

    const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed = score >= quiz.passingScore;
    const xpAwarded = passed ? Math.round(score / 10) * 5 : 0; // 5 XP per 10% score if passed

    // Save attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId,
        score,
        maxScore: totalPoints,
        passed,
        timeTakenSeconds: timeTakenSeconds ?? 0,
        answers: gradedAnswers,
        xpAwarded,
        completedAt: new Date(),
      },
    });

    // Award XP if passed
    if (xpAwarded > 0) {
      await prisma.$transaction([
        prisma.xPTransaction.create({
          data: { userId: user.id, amount: xpAwarded, action: 'quiz_passed', referenceId: attempt.id },
        }),
        prisma.gamificationProfile.upsert({
          where: { userId: user.id },
          update: { xp: { increment: xpAwarded }, totalXpEarned: { increment: xpAwarded } },
          create: { userId: user.id, xp: xpAwarded, totalXpEarned: xpAwarded, level: 1 },
        }),
      ]);
    }

    return NextResponse.json({
      attemptId: attempt.id,
      score: Number(score.toFixed(2)),
      maxScore: totalPoints,
      passed,
      xpAwarded,
      passingScore: quiz.passingScore,
      gradedAnswers,
    });
  } catch (err) {
    console.error('[POST /quiz/submit]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
