import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';
import { z } from 'zod';

const createCourseSchema = z.object({
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  categoryId: z.string().uuid(),
  description: z.string().optional(),
  shortDescription: z.string().max(300).optional(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  price: z.number().min(0).optional(),
  language: z.string().optional(),
  thumbnailUrl: z.string().url().optional(),
});

/** GET /api/v1/courses — Browse all published courses with optional filters */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '20')));
    const skip = (page - 1) * limit;
    const search = searchParams.get('search') ?? '';
    const level = searchParams.get('level');
    const categoryId = searchParams.get('categoryId');

    const where: any = { status: 'PUBLISHED' };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (level) where.level = level;
    if (categoryId) where.categoryId = categoryId;

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          thumbnailUrl: true,
          level: true,
          price: true,
          language: true,
          totalLessons: true,
          totalDuration: true,
          averageRating: true,
          reviewsCount: true,
          enrolledCount: true,
          category: { select: { id: true, name: true } },
          trainer: { select: { id: true, displayName: true } },
        },
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: { courses, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
    });
  } catch (error) {
    console.error('GET /api/v1/courses error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch courses' } }, { status: 500 });
  }
}

/** POST /api/v1/courses — Create a new course (TRAINER or ADMIN only) */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return NextResponse.json({ success: false, error: { code: 'AUTH_REQUIRED', message: 'Unauthorized' } }, { status: 401 });

    const claims = verifyAccessToken(token);
    if (!claims) return NextResponse.json({ success: false, error: { code: 'AUTH_INVALID_TOKEN', message: 'Invalid or expired token' } }, { status: 401 });
    if (!['TRAINER', 'ADMIN', 'SUPER_ADMIN'].includes(claims.role)) {
      return NextResponse.json({ success: false, error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, { status: 403 });
    }

    const body = await req.json();
    const parseResult = createCourseSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: parseResult.error.issues } }, { status: 400 });
    }

    const { title, slug, categoryId, description, shortDescription, level, price, language, thumbnailUrl } = parseResult.data;

    // Check slug uniqueness
    const existingSlug = await prisma.course.findUnique({ where: { slug } });
    if (existingSlug) {
      return NextResponse.json({ success: false, error: { code: 'SLUG_EXISTS', message: 'A course with this slug already exists' } }, { status: 409 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        trainerId: claims.id,
        categoryId,
        description: description ?? '',
        shortDescription,
        level: level ?? 'BEGINNER',
        price: price ?? 0,
        language: language ?? 'English',
        thumbnailUrl,
        status: 'DRAFT',
      },
    });

    return NextResponse.json({ success: true, data: { course } }, { status: 201 });
  } catch (error) {
    console.error('POST /api/v1/courses error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create course' } }, { status: 500 });
  }
}
