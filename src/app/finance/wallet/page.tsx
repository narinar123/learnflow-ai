'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { WalletBalance } from '@/components/finance/WalletBalance';
import { ChartCard } from '@/components/analytics/ChartCard';
import { mockWallet as initialWallet } from '@/lib/finance/mock-finance';

export default function FinanceWalletPage() {
  const [wallet, setWallet] = useState(initialWallet);

  const handleDeposit = (amount: number, description: string) => {
    const newEntry = {
      id: `w-ledger-${Math.floor(100 + Math.random() * 900)}`,
      type: 'deposit' as const,
      amount,
      description,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setWallet({
      ...wallet,
      balance: wallet.balance + amount,
      ledger: [newEntry, ...wallet.ledger]
    });
  };

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Virtual Wallet Dashboard"
        subtitle="Manage virtual wallets balances, local deposits, and audit withdrawals"
      />

      <div className="px-6 space-y-6">
        <WalletBalance wallet={wallet} onDeposit={handleDeposit} />

        {/* Ledger */}
        <ChartCard
          title="Wallet Audit Ledger"
          subtitle="Chronological transaction ledger events"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse select-none">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground font-semibold">
                  <th className="py-2.5 px-3">Ledger ID</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3 text-center">Type</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {wallet.ledger.map((log) => {
                  const isCredit = log.type === 'deposit' || log.type === 'refund';
                  
                  return (
                    <tr key={log.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-mono text-foreground font-semibold">{log.id}</span>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{log.createdAt}</p>
                      </td>
                      <td className="py-3 px-3 font-semibold text-foreground">
                        {log.description}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          isCredit ? 'bg-accent/15 text-accent' : 'bg-danger/15 text-danger'
                        }`}>
                          {log.type}
                        </span>
                      </td>
                      <td className={`py-3 px-3 text-right font-mono font-bold ${
                        isCredit ? 'text-accent' : 'text-danger'
                      }`}>
                        {isCredit ? '+' : ''}${log.amount.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
