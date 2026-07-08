// Phase 5: Razorpay — Verify Payment & Webhook
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, type, referenceId } = body;

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Update payment record
    await prisma.payment.updateMany({
      where: { gatewayOrderId: razorpay_order_id },
      data: {
        status: 'COMPLETED',
        gatewayPaymentId: razorpay_payment_id,
        gatewaySignature: razorpay_signature,
      },
    });

    // Fulfill based on type
    if (type === 'COURSE_PURCHASE') {
      await prisma.enrollment.upsert({
        where: { userId_courseId: { userId, courseId: referenceId } },
        update: {},
        create: { userId, courseId: referenceId, source: 'direct' },
      });
    } else if (type === 'SUBSCRIPTION') {
      const plan = await prisma.membershipPlan.findUnique({ where: { id: referenceId } });
      if (plan) {
        const now = new Date();
        const end = new Date(now);
        end.setMonth(end.getMonth() + 1);
        await prisma.subscription.upsert({
          where: { userId },
          update: {
            planId: referenceId,
            status: 'ACTIVE',
            currentPeriodStart: now,
            currentPeriodEnd: end,
            cancelAtPeriodEnd: false,
          },
          create: {
            userId,
            planId: referenceId,
            status: 'ACTIVE',
            billingCycle: 'MONTHLY',
            currentPeriodStart: now,
            currentPeriodEnd: end,
          },
        });
      }
    }

    return NextResponse.json({ success: true, paymentId: razorpay_payment_id });
  } catch (err) {
    console.error('[POST /payments/razorpay/verify]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
