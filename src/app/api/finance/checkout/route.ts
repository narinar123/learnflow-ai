import { NextResponse } from 'next/server';
import { mockTransactions } from '@/lib/finance/mock-finance';

export async function POST(req: Request) {
  try {
    const { amount, gateway, email, name, description } = await req.json();
    
    if (!amount || !gateway || !email || !name) {
      return NextResponse.json({ success: false, error: 'Missing required parameters' }, { status: 400 });
    }

    const mockId = `tx_${gateway}_${Math.floor(10000 + Math.random() * 90000)}`;
    const tax = amount * 0.18;
    const fee = amount * 0.03;

    const newTx = {
      id: mockId,
      amount,
      currency: 'USD',
      status: 'succeeded' as const,
      gateway: gateway as any,
      method: 'card' as const,
      customerName: name,
      customerEmail: email,
      description: description || 'Payment received',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      tax,
      fee
    };

    return NextResponse.json({ success: true, transaction: newTx });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: true, transactions: mockTransactions });
}
