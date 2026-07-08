'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { KPIGrid } from '@/components/analytics/KPIGrid';
import { ChartCard } from '@/components/analytics/ChartCard';
import { AnalyticsAreaChart } from '@/components/analytics/AreaChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { MetricComparison } from '@/components/analytics/MetricComparison';
import { mockTransactions, mockWallet, mockPayouts } from '@/lib/finance/mock-finance';

export default function FinanceDashboardPage() {
  const [stripeConnected, setStripeConnected] = useState(true);
  const [paypalConnected, setPaypalConnected] = useState(true);
  const [razorpayConnected, setRazorpayConnected] = useState(false);

  // Compute metrics from mock
  const totalVolume = mockTransactions.reduce((acc, curr) => acc + (curr.status === 'succeeded' ? curr.amount : 0), 0);
  const totalTaxes = mockTransactions.reduce((acc, curr) => acc + (curr.status === 'succeeded' ? curr.tax : 0), 0);
  const pendingPayouts = mockPayouts.reduce((acc, curr) => acc + (curr.status === 'pending' ? curr.amount : 0), 0);

  const kpis = [
    { id: 'wallet', label: 'Wallet Balance', value: `$${mockWallet.balance.toLocaleString()}`, color: 'primary' as const, sparkline: [{ value: 12000 }, { value: 14000 }, { value: 14820 }] },
    { id: 'volume', label: 'Net Processed Volume', value: `$${totalVolume.toLocaleString()}`, color: 'accent' as const, sparkline: [{ value: 300 }, { value: 450 }, { value: 537 }] },
    { id: 'payouts', label: 'Pending Payouts', value: `$${pendingPayouts.toLocaleString()}`, color: 'warning' as const, sparkline: [{ value: 500 }, { value: 800 }, { value: 950 }] },
    { id: 'taxes', label: 'Taxes Collected', value: `$${totalTaxes.toLocaleString()}`, color: 'info' as const, sparkline: [{ value: 40 }, { value: 70 }, { value: 84 }] }
  ];

  const monthlyRevData = [
    { month: 'Jan', revenue: 142000, refunds: 1200 },
    { month: 'Feb', revenue: 168000, refunds: 2400 },
    { month: 'Mar', revenue: 184000, refunds: 1800 },
    { month: 'Apr', revenue: 212000, refunds: 3100 },
    { month: 'May', revenue: 248000, refunds: 2200 },
    { month: 'Jun', revenue: 284000, refunds: 2900 }
  ];

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Finance Command Dashboard"
        subtitle="Manage multitenant checkouts, wallet balances, refund allocations and payouts accounting"
      />

      <div className="px-6 space-y-6">
        {/* Financial health report summary */}
        <InsightCard
          insight="Transaction volumes grew by 12.4% this week. Stripe processed 58% of global volume. Unified virtual wallets remain stable with active developer payouts released."
          color="primary"
        />

        {/* KPIs */}
        <KPIGrid items={kpis} cols={4} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Revenue and Refund Area Chart */}
          <ChartCard
            title="Revenue vs Refund Volume"
            subtitle="Comparing monthly checkout revenue with processed refund requests"
            className="xl:col-span-2"
          >
            <AnalyticsAreaChart
              data={monthlyRevData}
              xKey="month"
              series={[
                { key: 'revenue', label: 'Revenue ($)', color: '#6C47FF' },
                { key: 'refunds', label: 'Refunds ($)', color: '#EF4444' }
              ]}
              yTickFormatter={(v) => `$${(v/1000).toFixed(0)}K`}
            />
          </ChartCard>

          {/* Integration Gateways Status */}
          <ChartCard
            title="Payment Integrations Status"
            subtitle="Active gateway APIs sync monitoring"
            className="xl:col-span-1"
          >
            <div className="space-y-4 pt-2 select-none">
              {/* Stripe */}
              <div className="flex items-center justify-between p-3 border border-border rounded-xl bg-secondary/15">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">💳</span>
                  <div>
                    <span className="font-semibold text-foreground text-xs">Stripe integration</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Webhook endpoint active</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  stripeConnected ? 'bg-accent/15 text-accent' : 'bg-danger/15 text-danger'
                }`}>
                  {stripeConnected ? 'CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>

              {/* PayPal */}
              <div className="flex items-center justify-between p-3 border border-border rounded-xl bg-secondary/15">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🟪</span>
                  <div>
                    <span className="font-semibold text-foreground text-xs">PayPal Checkout SDK</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">REST API client synced</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  paypalConnected ? 'bg-accent/15 text-accent' : 'bg-danger/15 text-danger'
                }`}>
                  {paypalConnected ? 'CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>

              {/* Razorpay */}
              <div className="flex items-center justify-between p-3 border border-border rounded-xl bg-secondary/15">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">⚡</span>
                  <div>
                    <span className="font-semibold text-foreground text-xs">Razorpay Standard integration</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">India payments gateway API</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  razorpayConnected ? 'bg-accent/15 text-accent' : 'bg-warning/15 text-warning'
                }`}>
                  {razorpayConnected ? 'CONNECTED' : 'STANDBY'}
                </span>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Comparison and actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricComparison
            label="Gross Sales comparison"
            currentValue="$28,490"
            previousValue="$24,120"
            percentageChange={18.1}
            trend="up"
          />
          <MetricComparison
            label="Refund frequency comparison"
            currentValue="$1,820"
            previousValue="$2,490"
            percentageChange={26.9}
            trend="down"
          />
          <MetricComparison
            label="Average tax payouts"
            currentValue="$3,240"
            previousValue="$3,100"
            percentageChange={4.5}
            trend="up"
          />
        </div>
      </div>
    </div>
  );
}
