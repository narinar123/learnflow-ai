'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { PayoutManager } from '@/components/finance/PayoutManager';
import { mockPayouts as initialPayouts } from '@/lib/finance/mock-finance';

export default function FinancePayoutsPage() {
  const [payouts, setPayouts] = useState(initialPayouts);

  const handleTriggerPayout = (
    recipientName: string,
    recipientEmail: string,
    amount: number,
    gateway: string
  ) => {
    const newPayout = {
      id: `pay_${Math.floor(100 + Math.random() * 900)}`,
      amount,
      currency: 'USD',
      status: 'pending' as const,
      recipientName,
      recipientEmail,
      gateway: gateway as any,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      referenceNumber: `REF-${gateway.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`
    };

    setPayouts(prev => [newPayout, ...prev]);
  };

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Trainer Payouts Manager"
        subtitle="Manage and release earnings distributions to instructors via Stripe Connect, PayPal or Bank Transfer"
      />

      <div className="px-6 space-y-6">
        <PayoutManager payouts={payouts} onTriggerPayout={handleTriggerPayout} />
      </div>
    </div>
  );
}
