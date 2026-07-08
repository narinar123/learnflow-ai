import { NextResponse } from 'next/server';
import { mockTaxRates, mockTransactions } from '@/lib/finance/mock-finance';

export async function GET() {
  return NextResponse.json({
    success: true,
    taxes: mockTaxRates,
    totalRevenue: mockTransactions.reduce((acc, curr) => acc + (curr.status === 'succeeded' ? curr.amount : 0), 0),
    totalTaxVolume: mockTransactions.reduce((acc, curr) => acc + (curr.status === 'succeeded' ? curr.tax : 0), 0)
  });
}
export async function POST(req: Request) {
  try {
    const { taxId, active } = await req.json();

    if (!taxId) {
      return NextResponse.json({ success: false, error: 'Missing tax ID' }, { status: 400 });
    }

    const targetTax = mockTaxRates.find(t => t.id === taxId);
    if (!targetTax) {
      return NextResponse.json({ success: false, error: 'Tax ID not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      taxRate: { ...targetTax, active }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
