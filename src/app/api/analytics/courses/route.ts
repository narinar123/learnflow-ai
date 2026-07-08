import { NextResponse } from 'next/server';
import {
  courseKPIs,
  topCourses,
  courseCategories,
  ratingTrend
} from '@/lib/analytics/mock-data';

export async function GET() {
  return NextResponse.json({
    kpis: courseKPIs,
    top: topCourses,
    categories: courseCategories,
    ratings: ratingTrend
  });
}
