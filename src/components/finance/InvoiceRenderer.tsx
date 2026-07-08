'use client';

import React from 'react';
import { Transaction } from '@/lib/finance/mock-finance';
import { exportToPDF } from '@/lib/analytics/export-utils';

interface InvoiceRendererProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export function InvoiceRenderer({ transaction, onClose }: InvoiceRendererProps) {
  if (!transaction) return null;

  const handlePrint = () => {
    exportToPDF(`Invoice-${transaction.id}`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <div className="bg-card border border-border w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/10 shrink-0">
          <span className="text-xs font-bold text-foreground">Invoice Document</span>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="btn-outline px-3 py-1.5 rounded-lg text-xs font-bold"
            >
              Print PDF
            </button>
            <button
              onClick={onClose}
              className="btn-ghost p-1.5 rounded-lg"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Invoice Body Content */}
        <div id="invoice-print-area" className="flex-1 overflow-y-auto p-8 space-y-8 bg-card text-foreground">
          {/* Top segment */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-sm font-bold">L</div>
              <h2 className="text-sm font-bold text-foreground mt-2">GUIDESOFT IT SOLUTIONS, Inc.</h2>
              <p className="text-[10px] text-muted-foreground mt-0.5">100 Pine Street, Suite 2400</p>
              <p className="text-[10px] text-muted-foreground">San Francisco, CA 94111</p>
            </div>
            <div className="text-right">
              <h1 className="text-lg font-black text-primary tracking-tight">INVOICE</h1>
              <p className="text-[10px] text-muted-foreground mt-1">Invoice ID: <span className="font-mono font-bold text-foreground">{transaction.id}</span></p>
              <p className="text-[10px] text-muted-foreground">Date: {transaction.createdAt}</p>
            </div>
          </div>

          <div className="border-t border-border/80 pt-6 grid grid-cols-2 gap-6 text-[10px]">
            <div>
              <span className="uppercase font-bold text-muted-foreground block mb-1">Billed To</span>
              <p className="font-bold text-foreground">{transaction.customerName}</p>
              <p className="text-muted-foreground mt-0.5">{transaction.customerEmail}</p>
            </div>
            <div>
              <span className="uppercase font-bold text-muted-foreground block mb-1">Payment Method</span>
              <p className="font-bold text-foreground uppercase">{transaction.gateway} ({transaction.method})</p>
              <p className="text-muted-foreground mt-0.5">Status: Succeeded</p>
            </div>
          </div>

          {/* Table */}
          <div className="border border-border rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/20 border-b border-border font-bold">
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-foreground">{transaction.description}</span>
                    <p className="text-[9px] text-muted-foreground mt-0.5">GUIDESOFT IT SOLUTIONS Annual Portal Membership Seat</p>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-foreground">
                    ${(transaction.amount - transaction.tax).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals breakdown */}
          <div className="flex justify-end pt-4">
            <div className="w-48 text-[10px] space-y-1.5 border-t border-border/60 pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal:</span>
                <span className="font-mono">${(transaction.amount - transaction.tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Tax (18%):</span>
                <span className="font-mono">${transaction.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Transaction fee:</span>
                <span className="font-mono">${transaction.fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-foreground border-t border-border/60 pt-2">
                <span>Total Paid:</span>
                <span className="font-mono text-primary">${transaction.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
