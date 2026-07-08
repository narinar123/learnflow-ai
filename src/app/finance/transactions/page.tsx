'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { TransactionTable } from '@/components/finance/TransactionTable';
import { InvoiceRenderer } from '@/components/finance/InvoiceRenderer';
import { mockTransactions as initialTransactions, Transaction } from '@/lib/finance/mock-finance';

export default function FinanceTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedInvoiceTx, setSelectedInvoiceTx] = useState<Transaction | null>(null);

  const handleRefund = (id: string) => {
    if (window.confirm(`Are you sure you want to request a full refund for transaction ${id}?`)) {
      setTransactions(prev =>
        prev.map(t =>
          t.id === id ? { ...t, status: 'refunded' as const } : t
        )
      );
      alert(`Transaction ${id} refunded successfully.`);
    }
  };

  const handleInvoiceDownload = (tx: Transaction) => {
    setSelectedInvoiceTx(tx);
  };

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Transaction Ledger Hub"
        subtitle="Manage payments history, trigger refunds and render customer invoice receipts"
      />

      <div className="px-6 space-y-6">
        <TransactionTable
          transactions={transactions}
          onRefundRequest={handleRefund}
          onInvoiceDownload={handleInvoiceDownload}
        />

        {/* Invoice Modal Renderer */}
        <InvoiceRenderer
          transaction={selectedInvoiceTx}
          onClose={() => setSelectedInvoiceTx(null)}
        />
      </div>
    </div>
  );
}
