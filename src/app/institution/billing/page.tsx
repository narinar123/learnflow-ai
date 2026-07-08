'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { CreditCard } from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Billing & Invoicing" 
        description="Manage fee structures, invoices, and automated billing."
        icon={CreditCard}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6">
        <p className="text-gray-400">Billing rules and active invoices will go here.</p>
      </div>
    </div>
  );
}
