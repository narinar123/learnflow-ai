import { NextResponse } from 'next/server';
import {
  institutionKPIs,
  licenseUsage,
  engagementByInstitution,
  renewalFunnel
} from '@/lib/analytics/mock-data';

export async function GET() {
  return NextResponse.json({
    kpis: institutionKPIs,
    license: licenseUsage,
    engagement: engagementByInstitution,
    funnel: renewalFunnel
  });
}
