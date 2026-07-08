// Phase 5: Razorpay — Create Order
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/prisma';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { type, referenceId, couponCode } = await req.json();
    // type: 'COURSE_PURCHASE' | 'SUBSCRIPTION'

    let amount = 0;
    let currency = 'INR';
    let description = '';

    if (type === 'COURSE_PURCHASE') {
      const course = await prisma.course.findUnique({ where: { id: referenceId } });
      if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      amount = Number(course.price) * 100; // Razorpay uses paise
      currency = course.currency;
      description = `Purchase: ${course.title}`;
    } else if (type === 'SUBSCRIPTION') {
      const plan = await prisma.membershipPlan.findUnique({ where: { id: referenceId } });
      if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
      amount = Number(plan.monthlyPrice) * 100;
      currency = plan.currency;
      description = `Subscription: ${plan.name}`;
    }

    // Apply coupon
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: couponCode, isActive: true } });
      if (coupon) {
        const now = new Date();
        if (!coupon.expiresAt || coupon.expiresAt > now) {
          if (coupon.discountType === 'PERCENTAGE') {
            amount = amount * (1 - Number(coupon.discountValue) / 100);
          } else {
            amount = Math.max(0, amount - Number(coupon.discountValue) * 100);
          }
        }
      }
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency,
      notes: { userId: user.id, type, referenceId, description },
    });

    // Create pending payment record
    await prisma.payment.create({
      data: {
        userId: user.id,
        type: type as any,
        referenceId,
        amount: amount / 100,
        currency,
        status: 'PENDING',
        gateway: 'RAZORPAY',
        gatewayOrderId: order.id,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('[POST /payments/razorpay/create-order]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
