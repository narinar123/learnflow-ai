import { NextResponse } from 'next/server';
import {
  studentKPIs,
  enrollmentTrend,
  completionHistogram,
  cohortRetention,
  topStudents
} from '@/lib/analytics/mock-data';

export async function GET() {
  return NextResponse.json({
    kpis: studentKPIs,
    enrollment: enrollmentTrend,
    completion: completionHistogram,
    retention: cohortRetention,
    leaderboard: topStudents
  });
}
