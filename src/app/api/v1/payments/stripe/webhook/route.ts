// Phase 5: Stripe Webhook Handler
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' });

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object as Stripe.PaymentIntent;
      const { userId, type, referenceId } = pi.metadata;

      await prisma.payment.updateMany({
        where: { gatewayOrderId: pi.id },
        data: { status: 'COMPLETED', gatewayPaymentId: pi.id },
      });

      if (type === 'COURSE_PURCHASE') {
        await prisma.enrollment.upsert({
          where: { userId_courseId: { userId, courseId: referenceId } },
          update: {},
          create: { userId, courseId: referenceId, source: 'direct' },
        });
      } else if (type === 'SUBSCRIPTION') {
        const now = new Date();
        const end = new Date(now);
        end.setMonth(end.getMonth() + 1);
        const plan = await prisma.membershipPlan.findUnique({ where: { id: referenceId } });
        if (plan) {
          await prisma.subscription.upsert({
            where: { userId },
            update: { planId: referenceId, status: 'ACTIVE', currentPeriodStart: now, currentPeriodEnd: end },
            create: { userId, planId: referenceId, status: 'ACTIVE', billingCycle: 'MONTHLY', currentPeriodStart: now, currentPeriodEnd: end },
          });
        }
      }
    }

    if (event.type === 'payment_intent.payment_failed') {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.payment.updateMany({
        where: { gatewayOrderId: pi.id },
        data: { status: 'FAILED', failureReason: pi.last_payment_error?.message },
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[Stripe Webhook]', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
