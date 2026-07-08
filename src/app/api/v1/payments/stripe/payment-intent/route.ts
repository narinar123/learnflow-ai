// Phase 5: Stripe — Create Payment Intent
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' });

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { type, referenceId } = await req.json();

    let amount = 0;
    let currency = 'usd';
    let description = '';

    if (type === 'COURSE_PURCHASE') {
      const course = await prisma.course.findUnique({ where: { id: referenceId } });
      if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      // Convert INR to USD cents roughly (or store USD price separately)
      amount = Math.round(Number(course.price) * 100);
      currency = 'usd';
      description = `Purchase: ${course.title}`;
    } else if (type === 'SUBSCRIPTION') {
      const plan = await prisma.membershipPlan.findUnique({ where: { id: referenceId } });
      if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
      amount = Math.round(Number(plan.monthlyPrice) * 100);
      currency = 'usd';
      description = `Subscription: ${plan.name}`;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { userId: user.id, type, referenceId },
      description,
    });

    await prisma.payment.create({
      data: {
        userId: user.id,
        type: type as any,
        referenceId,
        amount: amount / 100,
        currency: currency.toUpperCase(),
        status: 'PENDING',
        gateway: 'STRIPE',
        gatewayOrderId: paymentIntent.id,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('[POST /payments/stripe/payment-intent]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
