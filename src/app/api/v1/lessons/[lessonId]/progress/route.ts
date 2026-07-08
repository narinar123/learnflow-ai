import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';
import { z } from 'zod';

const progressSchema = z.object({
  watchedSeconds: z.number().min(0).optional(),
  completed: z.boolean().optional(),
});

/** POST /api/v1/lessons/[lessonId]/progress — Save lesson progress for a user */
export async function POST(req: NextRequest, { params }: { params: Promise<{ lessonId: string }> }) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return NextResponse.json({ success: false, error: { code: 'AUTH_REQUIRED', message: 'Unauthorized' } }, { status: 401 });

    const claims = verifyAccessToken(token);
    if (!claims) return NextResponse.json({ success: false, error: { code: 'AUTH_INVALID_TOKEN', message: 'Invalid or expired token' } }, { status: 401 });

    const body = await req.json();
    const parseResult = progressSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: parseResult.error.issues } }, { status: 400 });
    }

    const { watchedSeconds, completed } = parseResult.data;
    const { lessonId } = await params;

    // Verify the lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { section: { include: { course: true } } },
    });
    if (!lesson) return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Lesson not found' } }, { status: 404 });

    // Verify user is enrolled
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: claims.id, courseId: lesson.section.course.id } },
    });
    if (!enrollment && !lesson.isFreePreview) {
      return NextResponse.json({ success: false, error: { code: 'NOT_ENROLLED', message: 'You must be enrolled to track progress' } }, { status: 403 });
    }

    // Upsert progress
    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: claims.id, lessonId } },
      update: {
        ...(watchedSeconds !== undefined && { lastPosition: watchedSeconds }),
        ...(completed !== undefined && { completed }),
        ...(completed && { completedAt: new Date() }),
        updatedAt: new Date(),
      },
      create: {
        userId: claims.id,
        lessonId,
        lastPosition: watchedSeconds ?? 0,
        completed: completed ?? false,
        ...(completed && { completedAt: new Date() }),
      },
    });

    // Update enrollment progress percentage if enrolled
    if (enrollment) {
      const [totalLessons, completedLessons] = await Promise.all([
        prisma.lesson.count({ where: { section: { courseId: lesson.section.course.id } } }),
        prisma.lessonProgress.count({
          where: { userId: claims.id, completed: true, lesson: { section: { courseId: lesson.section.course.id } } },
        }),
      ]);
      const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: {
          progress: progressPct,
          ...(progressPct === 100 && !enrollment.completedAt && { completedAt: new Date() }),
        },
      });
    }

    return NextResponse.json({ success: true, data: { progress } });
  } catch (error) {
    console.error('POST /api/v1/lessons/[lessonId]/progress error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to save progress' } }, { status: 500 });
  }
}

