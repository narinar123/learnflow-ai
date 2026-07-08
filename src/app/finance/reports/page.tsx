'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { ChartCard } from '@/components/analytics/ChartCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import { mockTaxRates, TaxRate, mockTransactions } from '@/lib/finance/mock-finance';

export default function FinanceReportsPage() {
  const [taxes, setTaxes] = useState<TaxRate[]>(mockTaxRates);

  const toggleTax = (id: string) => {
    setTaxes(prev =>
      prev.map(t => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Reports & Tax Configuration"
        subtitle="Manage multitenant tax rates (VAT/GST/Sales Tax) and export clean accounting records spreadsheets"
      />

      <div className="px-6 space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Tax Rates Configuration */}
          <ChartCard
            title="SaaS Tax Rates Configuration"
            subtitle="Define VAT/GST brackets automatically applied during customer checkouts"
            className="xl:col-span-2"
          >
            <div className="overflow-x-auto select-none">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">Tax Rules</th>
                    <th className="py-2.5 px-3">Country</th>
                    <th className="py-2.5 px-3 text-center">Type</th>
                    <th className="py-2.5 px-3 text-right">Rate</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {taxes.map((t) => (
                    <tr key={t.id} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-3 px-3 font-semibold text-foreground">
                        {t.name}
                      </td>
                      <td className="py-3 px-3 text-muted-foreground">
                        {t.country}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-primary text-[10px]">
                        {t.type}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-foreground">
                        {t.rate.toFixed(1)}%
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => toggleTax(t.id)}
                          className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            t.active
                              ? 'bg-accent/15 text-accent'
                              : 'bg-secondary text-muted-foreground'
                          }`}
                        >
                          {t.active ? 'ACTIVE' : 'INACTIVE'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>

          {/* Accounting API Exports */}
          <ChartCard
            title="Accounting Ledger Export"
            subtitle="Secure accounting spreadsheet export utility for reconciliation"
            className="xl:col-span-1"
          >
            <div className="space-y-4 pt-2 select-none">
              <div className="border border-border/60 bg-secondary/15 rounded-xl p-4 text-xs space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Ledger Records:</span>
                  <span className="font-mono text-foreground font-semibold">
                    {mockTransactions.length} items
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax entries:</span>
                  <span className="font-mono text-foreground font-semibold">
                    {taxes.filter(tx => tx.active).length} active brackets
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-medium">Export Ledger:</span>
                <ExportButton
                  data={mockTransactions as unknown as Record<string, unknown>[]}
                  filename="finance_accounting_ledger"
                  pdfTitle="Accounting Finance Ledger Report"
                />
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
