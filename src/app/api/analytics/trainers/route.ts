import { NextResponse } from 'next/server';
import {
  trainerKPIs,
  trainerLeaderboard,
  contentOutput,
  ratingDistribution,
  responseTimeTrend,
  trainerRadar
} from '@/lib/analytics/mock-data';

export async function GET() {
  return NextResponse.json({
    kpis: trainerKPIs,
    leaderboard: trainerLeaderboard,
    content: contentOutput,
    ratings: ratingDistribution,
    responseTime: responseTimeTrend,
    radar: trainerRadar
  });
}
