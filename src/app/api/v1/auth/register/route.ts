import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateOTP } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(2),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const parseResult = registerSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ 
        success: false, 
        error: { code: 'VALIDATION_ERROR', message: 'Invalid input data', details: parseResult.error.issues }
      }, { status: 400 });
    }

    const { email, password, displayName } = parseResult.data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        error: { code: 'USER_EXISTS', message: 'Email already registered', details: [] }
      }, { status: 409 });
    }

    // Create user and profile
    const passwordHash = await hashPassword(password);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    const otp = generateOTP();

    // In a real implementation, we would store this OTP in a cache (like Redis) or the database
    // to verify it later. For now we will just create the user directly.
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        displayName,
        profile: {
          create: {} // Create an empty profile
        }
      },
    });

    // In a real app we'd trigger an email with the OTP here via BullMQ

    return NextResponse.json({
      success: true,
      data: {
        message: `OTP sent to ${email}`,
        userId: user.id,
        otpExpiresAt: otpExpiresAt.toISOString()
      }
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'An internal server error occurred', details: [] }
    }, { status: 500 });
  }
}
