import { NextResponse } from 'next/server';
import { mockTransactions } from '@/lib/finance/mock-finance';

export async function GET() {
  return NextResponse.json({ success: true, transactions: mockTransactions });
}

export async function POST(req: Request) {
  try {
    const { transactionId, status } = await req.json();
    if (!transactionId || !status) {
      return NextResponse.json({ success: false, error: 'Missing parameter entries' }, { status: 400 });
    }

    const updatedTx = mockTransactions.find(t => t.id === transactionId);
    if (!updatedTx) {
      return NextResponse.json({ success: false, error: 'Transaction ID not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      transaction: { ...updatedTx, status }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
