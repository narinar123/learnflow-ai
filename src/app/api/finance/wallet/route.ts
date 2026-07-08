import { NextResponse } from 'next/server';
import { mockWallet } from '@/lib/finance/mock-finance';

export async function GET() {
  return NextResponse.json({ success: true, wallet: mockWallet });
}

export async function POST(req: Request) {
  try {
    const { amount, description, type } = await req.json();

    if (!amount || !type) {
      return NextResponse.json({ success: false, error: 'Missing parameter entries' }, { status: 400 });
    }

    const newLedgerItem = {
      id: `w-ledger-${Math.floor(100 + Math.random() * 900)}`,
      type: type as any,
      amount,
      description: description || 'Wallet adjustment credit',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    return NextResponse.json({
      success: true,
      ledger: newLedgerItem,
      newBalance: mockWallet.balance + (type === 'deposit' || type === 'refund' ? amount : -amount)
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
