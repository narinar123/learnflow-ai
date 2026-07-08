import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/auth';

/** GET /api/v1/users/me — Fetch the authenticated user's own profile */
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return NextResponse.json({ success: false, error: { code: 'AUTH_REQUIRED', message: 'Unauthorized' } }, { status: 401 });

    const claims = verifyAccessToken(token);
    if (!claims) return NextResponse.json({ success: false, error: { code: 'AUTH_INVALID_TOKEN', message: 'Invalid or expired token' } }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: claims.id },
      include: {
        profile: true,
        subscription: { include: { plan: true } },
        _count: { select: { enrollments: true, certificates: true } },
      },
    });

    if (!user) return NextResponse.json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } }, { status: 404 });

    // Strip sensitive fields
    const { passwordHash, ...safeUser } = user;

    return NextResponse.json({ success: true, data: { user: safeUser } });
  } catch (error) {
    console.error('GET /api/v1/users/me error:', error);
    return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch user profile' } }, { status: 500 });
  }
}
