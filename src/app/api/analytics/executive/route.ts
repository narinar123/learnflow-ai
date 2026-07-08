import { NextResponse } from 'next/server';
import {
  executiveKPIs,
  revenueAreaData,
  forecastData,
  activityHeatmap,
  geoData,
  platformHealth
} from '@/lib/analytics/mock-data';

export async function GET() {
  return NextResponse.json({
    kpis: executiveKPIs,
    revenueTrend: revenueAreaData,
    forecast: forecastData,
    activity: activityHeatmap,
    geo: geoData,
    health: platformHealth
  });
}
