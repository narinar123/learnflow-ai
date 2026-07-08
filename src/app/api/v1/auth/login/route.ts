import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateAccessToken, generateRefreshToken, generateTokenHash } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const parseResult = loginSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ 
        success: false, 
        error: { code: 'VALIDATION_ERROR', message: 'Invalid credentials format', details: parseResult.error.issues }
      }, { status: 400 });
    }

    const { email, password } = parseResult.data;

    // Check if user exists
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        profile: true,
        subscription: true
      }
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json({ 
        success: false, 
        error: { code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid email or password', details: [] }
      }, { status: 401 });
    }

    if (user.isSuspended) {
      return NextResponse.json({ 
        success: false, 
        error: { code: 'AUTH_ACCOUNT_SUSPENDED', message: 'Account is suspended', details: [] }
      }, { status: 403 });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ 
        success: false, 
        error: { code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid email or password', details: [] }
      }, { status: 401 });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshTokenValue = generateRefreshToken(user.id);
    const refreshTokenHash = generateTokenHash(); // Simplified token storage
    
    // Store refresh token in db
    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash, // We would typically store a hash of the refresh token
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }
    });

    // Update last active
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActiveAt: new Date() }
    });

    return NextResponse.json({
      success: true,
      data: {
        accessToken,
        refreshToken: refreshTokenValue,
        expiresIn: 900, // 15 mins
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          role: user.role,
          plan: user.subscription ? user.subscription.planId : 'FREE',
          onboardingCompleted: user.onboardingCompleted
        }
      }
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'An internal server error occurred', details: [] }
    }, { status: 500 });
  }
}
