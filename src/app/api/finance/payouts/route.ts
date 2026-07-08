import { NextResponse } from 'next/server';
import { mockPayouts } from '@/lib/finance/mock-finance';

export async function GET() {
  return NextResponse.json({ success: true, payouts: mockPayouts });
}

export async function POST(req: Request) {
  try {
    const { name, email, amount, gateway } = await req.json();

    if (!name || !email || !amount || !gateway) {
      return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
    }

    const mockReference = `REF-${gateway.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newPayout = {
      id: `pay_${Math.floor(100 + Math.random() * 900)}`,
      amount,
      currency: 'USD',
      status: 'pending' as const,
      recipientName: name,
      recipientEmail: email,
      gateway: gateway as any,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      referenceNumber: mockReference
    };

    return NextResponse.json({ success: true, payout: newPayout });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
