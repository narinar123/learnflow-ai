import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    coins: 350,
    subscription: {
      plan: 'Pro Plan',
      status: 'active',
      renewsAt: '2027-05-15'
    },
    ledger: [
      { id: 'tx_001', type: 'coin_credit', title: 'Solved Two Sum Problem in Coding Lab', amount: 100, date: '2026-07-07 15:44' },
      { id: 'tx_002', type: 'coin_credit', title: 'Finished Section 2 Quiz: Python loops', amount: 50, date: '2026-07-06 18:22' },
      { id: 'tx_003', type: 'cash_debit', title: 'LearnFlow Pro Plan Annual Renewal', amount: 5990, date: '2026-07-01 10:00' }
    ]
  });
}

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const cleanCode = code?.trim().toUpperCase();

    if (cleanCode === 'STUDENT50') {
      return NextResponse.json({
        success: true,
        bonusCoins: 200,
        message: 'Coupon code STUDENT50 verified! +200 LearnFlow coins added to wallet.'
      });
    }

    if (cleanCode === 'PROFREE') {
      return NextResponse.json({
        success: true,
        message: 'Free 30-day Pro membership upgrade token generated.'
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid or expired coupon code.'
    }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to process coupon validation.'
    }, { status: 500 });
  }
}
