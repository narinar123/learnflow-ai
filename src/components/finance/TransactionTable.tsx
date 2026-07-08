'use client';

import React, { useState } from 'react';
import { Transaction } from '@/lib/finance/mock-finance';

interface TransactionTableProps {
  transactions: Transaction[];
  onRefundRequest?: (id: string) => void;
  onInvoiceDownload?: (tx: Transaction) => void;
}

export function TransactionTable({
  transactions,
  onRefundRequest,
  onInvoiceDownload
}: TransactionTableProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = transactions.filter(t => {
    if (filterStatus === 'all') return true;
    return t.status === filterStatus;
  });

  return (
    <div className="card-base p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Transaction Ledger</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Comprehensive list of processing records</p>
        </div>
        
        {/* Filter controls */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-card border border-border rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-foreground"
        >
          <option value="all">All Statuses</option>
          <option value="succeeded">Succeeded</option>
          <option value="refunded">Refunded</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse select-none">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground font-semibold">
              <th className="py-2.5 px-3">Transaction ID</th>
              <th className="py-2.5 px-3">Customer</th>
              <th className="py-2.5 px-3">Gateway</th>
              <th className="py-2.5 px-3 text-right">Amount</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-xs">
            {filtered.map((tx) => {
              const isSucceeded = tx.status === 'succeeded';
              const isRefunded = tx.status === 'refunded';
              const isFailed = tx.status === 'failed';

              return (
                <tr key={tx.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-mono text-foreground font-semibold">{tx.id}</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{tx.createdAt}</p>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-foreground">{tx.customerName}</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5 truncate max-w-xs">{tx.customerEmail}</p>
                  </td>
                  <td className="py-3 px-3 uppercase font-semibold text-[10px] tracking-wide text-muted-foreground">
                    {tx.gateway} ({tx.method})
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-foreground">
                    ${tx.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                      isSucceeded
                        ? 'bg-accent/15 text-accent'
                        : isRefunded
                        ? 'bg-warning/15 text-warning'
                        : 'bg-danger/15 text-danger'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                    {onInvoiceDownload && isSucceeded && (
                      <button
                        onClick={() => onInvoiceDownload(tx)}
                        className="btn-outline px-2 py-1 rounded text-[10px] font-bold"
                      >
                        Invoice
                      </button>
                    )}
                    {onRefundRequest && isSucceeded && (
                      <button
                        onClick={() => onRefundRequest(tx.id)}
                        className="bg-danger/10 hover:bg-danger/20 text-danger px-2 py-1 rounded text-[10px] font-bold transition-colors"
                      >
                        Refund
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
