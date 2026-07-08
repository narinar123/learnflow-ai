import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    assignments: [
      {
        id: 'asg_001',
        title: 'Python OOP: Banking System Simulator',
        dueDate: '2026-07-15',
        points: 100,
        status: 'pending'
      },
      {
        id: 'asg_002',
        title: 'Auto-Layout Dashboard UI Challenge',
        dueDate: '2026-07-18',
        points: 100,
        status: 'submitted'
      }
    ]
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, githubUrl, notes } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Assignment ID is required.'
      }, { status: 400 });
    }

    // Return immediate AI feedback simulation
    const score = Math.floor(Math.random() * 15) + 85; // 85 to 99
    
    return NextResponse.json({
      success: true,
      grade: `${score}/100`,
      feedback: `AI Evaluator check completed: Verified core deliverables. Passing 8/8 assertions. Custom parameters properly protected under private attributes. Recommended upgrade: Add error checks on negative transaction inputs.`,
      xpEarned: 100,
      coinsEarned: 50
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to process assignment review.'
    }, { status: 500 });
  }
}
