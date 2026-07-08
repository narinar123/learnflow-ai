'use client';

import React, { useState } from 'react';
import { Payout } from '@/lib/finance/mock-finance';

interface PayoutManagerProps {
  payouts: Payout[];
  onTriggerPayout: (recipient: string, email: string, amount: number, method: string) => void;
}

export function PayoutManager({ payouts, onTriggerPayout }: PayoutManagerProps) {
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('stripe_connect');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(payoutAmount);
    if (recipientName.trim() && recipientEmail.trim() && !isNaN(val) && val > 0) {
      onTriggerPayout(recipientName, recipientEmail, val, payoutMethod);
      setRecipientName('');
      setRecipientEmail('');
      setPayoutAmount('');
      alert(`Initiated payout of $${val.toLocaleString()} to ${recipientName}!`);
    } else {
      alert('Invalid payout input parameters');
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Payout Form */}
      <div className="card-base p-6 xl:col-span-1 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Distribute Payout</h3>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">Release balance to trainers or vendors</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Recipient Name</label>
            <input
              type="text"
              placeholder="e.g. Wei Chen"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="input-field text-xs py-2 px-3"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Recipient Email</label>
            <input
              type="email"
              placeholder="e.g. wei.c@learnflow.ai"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="input-field text-xs py-2 px-3"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Payout Amount ($)</label>
            <input
              type="number"
              placeholder="e.g. 500"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              className="input-field text-xs py-2 px-3"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Transfer Method</label>
            <select
              value={payoutMethod}
              onChange={(e) => setPayoutMethod(e.target.value)}
              className="bg-card border border-border rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-foreground"
            >
              <option value="stripe_connect">Stripe Connect Account</option>
              <option value="paypal">PayPal Email Transfer</option>
              <option value="bank_transfer">Direct Bank wire</option>
            </select>
          </div>

          <button type="submit" className="w-full btn-primary text-xs py-2.5">
            Process Payout Release
          </button>
        </form>
      </div>

      {/* Payout History Ledger */}
      <div className="card-base p-6 xl:col-span-2 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Payout Ledger History</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Audit log of payouts released from treasury balance</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse select-none">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground font-semibold">
                <th className="py-2.5 px-3">Reference Number</th>
                <th className="py-2.5 px-3">Recipient</th>
                <th className="py-2.5 px-3">Transfer Gateway</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              {payouts.map((pay) => {
                const isPaid = pay.status === 'paid';
                const isPending = pay.status === 'pending';

                return (
                  <tr key={pay.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-3">
                      <span className="font-mono text-foreground font-semibold">{pay.referenceNumber}</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{pay.createdAt}</p>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-foreground">{pay.recipientName}</span>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{pay.recipientEmail}</p>
                    </td>
                    <td className="py-3 px-3 uppercase text-[10px] font-semibold text-muted-foreground">
                      {pay.gateway.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-foreground">
                      ${pay.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                        isPaid
                          ? 'bg-accent/15 text-accent'
                          : isPending
                          ? 'bg-warning/15 text-warning'
                          : 'bg-danger/15 text-danger'
                      }`}>
                        {pay.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
