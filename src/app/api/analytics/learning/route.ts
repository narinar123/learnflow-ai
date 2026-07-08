import { NextResponse } from 'next/server';
import {
  learningKPIs,
  learningByHour,
  skillMastery,
  lessonDropoff,
  learningPaths
} from '@/lib/analytics/mock-data';

export async function GET() {
  return NextResponse.json({
    kpis: learningKPIs,
    hourly: learningByHour,
    skills: skillMastery,
    dropoff: lessonDropoff,
    paths: learningPaths
  });
}
