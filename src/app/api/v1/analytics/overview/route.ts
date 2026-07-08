// Phase 6: Analytics API — Platform-wide stats for Admin dashboard
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user || !['ADMIN', 'CONTENT_MANAGER'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
      totalUsers, newUsersThisMonth, totalCourses, publishedCourses,
      totalEnrollments, enrollmentsThisMonth, totalRevenue, revenueThisMonth,
      activeSubscriptions, completedLessons, totalQuizAttempts, passedQuizAttempts,
    ] = await Promise.all([
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo }, deletedAt: null } }),
      prisma.course.count({ where: { deletedAt: null } }),
      prisma.course.count({ where: { status: 'PUBLISHED', deletedAt: null } }),
      prisma.enrollment.count(),
      prisma.enrollment.count({ where: { enrolledAt: { gte: thirtyDaysAgo } } }),
      prisma.payment.aggregate({ where: { status: 'COMPLETED' }, _sum: { amount: true } }),
      prisma.payment.aggregate({ where: { status: 'COMPLETED', createdAt: { gte: thirtyDaysAgo } }, _sum: { amount: true } }),
      prisma.subscription.count({ where: { status: 'ACTIVE' } }),
      prisma.lessonProgress.count({ where: { completed: true } }),
      prisma.quizAttempt.count(),
      prisma.quizAttempt.count({ where: { passed: true } }),
    ]);

    // Top courses by enrollment
    const topCourses = await prisma.course.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { enrolledCount: 'desc' },
      take: 5,
      select: { id: true, title: true, enrolledCount: true, averageRating: true, thumbnailUrl: true },
    });

    // Daily enrollments for last 7 days
    const dailyEnrollments = await prisma.$queryRaw<{ date: string; count: number }[]>`
      SELECT DATE(enrolled_at)::text as date, COUNT(*)::int as count
      FROM enrollments
      WHERE enrolled_at >= ${sevenDaysAgo}
      GROUP BY DATE(enrolled_at)
      ORDER BY DATE(enrolled_at)
    `;

    return NextResponse.json({
      users: { total: totalUsers, newThisMonth: newUsersThisMonth },
      courses: { total: totalCourses, published: publishedCourses },
      enrollments: { total: totalEnrollments, thisMonth: enrollmentsThisMonth },
      revenue: {
        total: Number(totalRevenue._sum.amount ?? 0),
        thisMonth: Number(revenueThisMonth._sum.amount ?? 0),
      },
      subscriptions: { active: activeSubscriptions },
      learning: {
        lessonsCompleted: completedLessons,
        quizAttempts: totalQuizAttempts,
        quizPassRate: totalQuizAttempts > 0 ? Math.round((passedQuizAttempts / totalQuizAttempts) * 100) : 0,
      },
      topCourses,
      dailyEnrollments,
    });
  } catch (err) {
    console.error('[GET /analytics/overview]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
