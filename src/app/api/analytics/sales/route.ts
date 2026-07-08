import { NextResponse } from 'next/server';
import {
  salesKPIs,
  salesFunnel,
  conversionTrend,
  leadSources,
  salesReps
} from '@/lib/analytics/mock-data';

export async function GET() {
  return NextResponse.json({
    kpis: salesKPIs,
    funnel: salesFunnel,
    conversions: conversionTrend,
    sources: leadSources,
    agents: salesReps
  });
}
