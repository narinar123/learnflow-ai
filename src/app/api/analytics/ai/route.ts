import { NextResponse } from 'next/server';
import {
  aiKPIs,
  aiQueryVolume,
  aiTopics,
  aiQuality,
  aiCostROI
} from '@/lib/analytics/mock-data';

export async function GET() {
  return NextResponse.json({
    kpis: aiKPIs,
    volume: aiQueryVolume,
    topics: aiTopics,
    quality: aiQuality,
    costROI: aiCostROI
  });
}
