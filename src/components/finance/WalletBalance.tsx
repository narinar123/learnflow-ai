'use client';

import React, { useState } from 'react';
import { Wallet } from '@/lib/finance/mock-finance';

interface WalletBalanceProps {
  wallet: Wallet;
  onDeposit: (amount: number, description: string) => void;
}

export function WalletBalance({ wallet, onDeposit }: WalletBalanceProps) {
  const [depositAmount, setDepositAmount] = useState('');
  const [description, setDescription] = useState('Deposit via secure bank transfer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(depositAmount);
    if (!isNaN(val) && val > 0) {
      onDeposit(val, description);
      setDepositAmount('');
      alert(`Deposited $${val.toLocaleString()} to wallet!`);
    } else {
      alert('Invalid deposit amount');
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Wallet Balance Info */}
      <div className="card-base p-6 flex flex-col justify-between relative overflow-hidden xl:col-span-1">
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none bg-primary/25" />
        
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
            Wallet Balance
          </span>
          <h2 className="text-3xl font-extrabold font-mono tracking-tight text-foreground mt-1">
            ${wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h2>
          <p className="text-[10px] text-muted-foreground mt-2">
            Base currency: {wallet.currency} (All conversions apply at daily gateway spot rate)
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-border/60">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Last transaction:</span>
            <span className="font-mono text-foreground font-semibold">
              {wallet.ledger[0]?.createdAt || 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Deposit Quick Actions Form */}
      <div className="card-base p-6 xl:col-span-2">
        <h3 className="text-sm font-semibold text-foreground mb-3">Deposit Funds to Wallet</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Deposit Amount (USD)
              </label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="input-field text-xs py-2.5"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Source Description
              </label>
              <input
                type="text"
                placeholder="e.g. Bank wire credit"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field text-xs py-2.5"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary text-xs py-2 px-6 rounded-xl"
          >
            Fund Wallet
          </button>
        </form>
      </div>
    </div>
  );
}
