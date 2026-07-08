import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';

/** POST /api/v1/courses/[slug]/enroll — Enroll authenticated user in a course */
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return NextResponse.json({ success: false, error: { code: 'AUTH_REQUIRED', message: 'Unauthorized' } }, { status: 401 });

    const claims = verifyAccessToken(token);
    if (!claims) return NextResponse.json({ success: false, error: { code: 'AUTH_INVALID_TOKEN', message: 'Invalid or expired token' } }, { status: 401 });

    const { slug } = await params;
    const course = await prisma.course.findFirst({
      where: { slug, status: 'PUBLISHED' },
    });
    if (!course) return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'Course not found' } }, { status: 404 });

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: claims.id, courseId: course.id } },
    });
    if (existing) {
      return NextResponse.json({ success: false, error: { code: 'ALREADY_ENROLLED', message: 'You are already enrolled in this course' } }, { status: 409 });
    }

    // Free course — enroll directly
    if (course.isFree || course.price.toNumber() === 0) {
      const enrollment = await prisma.enrollment.create({
        data: {
          userId: claims.id,
          courseId: course.id,
        },
      });
      // Increment enrolled count
      await prisma.course.update({ where: { id: course.id }, data: { enrolledCount: { increment: 1 } } });

      return NextResponse.json({ success: true, data: { enrollment } }, { status: 201 });
    }

    // Paid course — return checkout intent (payment handled separately)
    return NextResponse.json({
      success: true,
      data: {
        requiresPayment: true,
        price: course.price,
        courseId: course.id,
        message: 'Proceed to checkout to complete enrollment',
      },
    });
  } catch (error) {
    console.error('POST /api/v1/courses/[slug]/enroll error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to process enrollment' } }, { status: 500 });
  }
}

