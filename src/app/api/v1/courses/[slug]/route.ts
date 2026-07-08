import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';
import { z } from 'zod';

/** GET /api/v1/courses/[slug] — Fetch a single published course by slug */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const course = await prisma.course.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: {
        category: { select: { id: true, name: true } },
        trainer: { select: { id: true, displayName: true, avatarUrl: true, profile: { select: { bio: true } } } },
        sections: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                order: true,
                durationSeconds: true,
                isFreePreview: true,
                type: true,
              },
            },
          },
        },
        _count: { select: { enrollments: true, reviews: true } },
      },
    });

    if (!course) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Course not found' } }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { course } });
  } catch (error) {
    console.error('GET /api/v1/courses/[slug] error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch course' } }, { status: 500 });
  }
}

const updateCourseSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().optional(),
  shortDescription: z.string().max(300).optional(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  price: z.number().min(0).optional(),
  language: z.string().optional(),
  thumbnailUrl: z.string().url().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});

/** PATCH /api/v1/courses/[slug] — Update course (Instructor or Admin) */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return NextResponse.json({ success: false, error: { code: 'AUTH_REQUIRED', message: 'Unauthorized' } }, { status: 401 });

    const claims = verifyAccessToken(token);
    if (!claims) return NextResponse.json({ success: false, error: { code: 'AUTH_INVALID_TOKEN', message: 'Invalid or expired token' } }, { status: 401 });

    const { slug } = await params;
    const course = await prisma.course.findFirst({ where: { slug } });
    if (!course) return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Course not found' } }, { status: 404 });

    // Only the course instructor or admin can update
    const isOwner = course.trainerId === claims.id;
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(claims.role);
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'You do not have permission to edit this course' } }, { status: 403 });
    }

    const body = await req.json();
    const parseResult = updateCourseSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: parseResult.error.issues } }, { status: 400 });
    }

    const updated = await prisma.course.update({
      where: { id: course.id },
      data: { ...parseResult.data, updatedAt: new Date() },
    });

    return NextResponse.json({ success: true, data: { course: updated } });
  } catch (error) {
    console.error('PATCH /api/v1/courses/[slug] error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update course' } }, { status: 500 });
  }
}
