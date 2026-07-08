import { NextResponse } from 'next/server';
import {
  crmKPIs,
  crmActivity,
  dealStages,
  topAccounts,
  churnRiskRadar
} from '@/lib/analytics/mock-data';

export async function GET() {
  return NextResponse.json({
    kpis: crmKPIs,
    activities: crmActivity,
    stages: dealStages,
    accounts: topAccounts,
    risk: churnRiskRadar
  });
}
