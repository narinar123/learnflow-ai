import { NextResponse } from 'next/server';
import {
  revenueKPIs,
  revenueBreakdown,
  paymentMethods,
  revenuePlan,
  mrrMovement
} from '@/lib/analytics/mock-data';

export async function GET() {
  return NextResponse.json({
    kpis: revenueKPIs,
    breakdown: revenueBreakdown,
    paymentRatios: paymentMethods,
    plans: revenuePlan,
    waterfall: mrrMovement
  });
}
