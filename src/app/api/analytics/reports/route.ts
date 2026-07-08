import { NextResponse } from 'next/server';
import {
  geoData,
  topCourses,
  topStudents,
  trainerLeaderboard
} from '@/lib/analytics/mock-data';

export async function GET() {
  return NextResponse.json({
    templates: [
      { id: 'revenue', name: 'Geographical Revenue distribution', rows: geoData.length },
      { id: 'courses', name: 'Catalog Course Performance', rows: topCourses.length },
      { id: 'students', name: 'Active Students Leaderboard', rows: topStudents.length },
      { id: 'trainers', name: 'Authors Performance Ratings', rows: trainerLeaderboard.length }
    ]
  });
}
export async function POST(req: Request) {
  try {
    const { templateId } = await req.json();
    let data: unknown[] = [];
    if (templateId === 'revenue') data = geoData;
    else if (templateId === 'courses') data = topCourses;
    else if (templateId === 'students') data = topStudents;
    else if (templateId === 'trainers') data = trainerLeaderboard;
    
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
