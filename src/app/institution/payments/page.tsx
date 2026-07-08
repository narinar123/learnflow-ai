'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { Banknote } from 'lucide-react';

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Payments History" 
        description="Track incoming transactions, refunds, and gateway settings."
        icon={Banknote}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6">
        <p className="text-gray-400">Transaction ledger and payment gateways setup will go here.</p>
      </div>
    </div>
  );
}
