'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { FilterBar } from '@/components/analytics/FilterBar';
import { KPIGrid } from '@/components/analytics/KPIGrid';
import { ChartCard } from '@/components/analytics/ChartCard';
import { AnalyticsAreaChart } from '@/components/analytics/AreaChart';
import { AnalyticsBarChart } from '@/components/analytics/BarChart';
import { AnalyticsPieChart } from '@/components/analytics/PieChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import {
  revenueKPIs,
  revenueBreakdown,
  paymentMethods,
  revenuePlan,
  mrrMovement
} from '@/lib/analytics/mock-data';

export default function RevenueAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const currencyFormatter = (value: number) => `$${value.toLocaleString()}`;

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Revenue & Finance Analytics"
        subtitle="Manage recurring metrics (MRR/ARR), checkout volumes, gateway breakdowns and transaction distributions"
        actions={<ExportButton data={revenuePlan} filename="revenue_by_tier" pdfTitle="Revenue Analytics Report" />}
      />

      <div className="px-6 space-y-6">
        <FilterBar dateRange={dateRange} setDateRange={setDateRange} />

        <InsightCard
          insight="MRR waterfall shows strong Expansion MRR ($18.2K) offsetting contraction and churn. Stripe continues to process the majority of transaction volumes (58%)."
          color="primary"
        />

        <KPIGrid items={revenueKPIs} cols={3} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Revenue Breakdown */}
          <ChartCard 
            title="Monthly Revenue Streams" 
            subtitle="Comparing enterprise contracts, subscriptions and course checkout purchases"
          >
            <AnalyticsAreaChart
              data={revenueBreakdown}
              xKey="month"
              series={[
                { key: 'subscriptions', label: 'Pro Subscriptions', color: '#6C47FF' },
                { key: 'enterprise', label: 'Enterprise Contracts', color: '#00C9A7' },
                { key: 'oneTime', label: 'One-time Checkouts', color: '#3B82F6' }
              ]}
              yTickFormatter={currencyFormatter}
            />
          </ChartCard>

          {/* MRR Movement Waterfall */}
          <ChartCard 
            title="Monthly MRR Movement" 
            subtitle="Detailed breakdown of additions, expansions, contractions and churn"
          >
            <AnalyticsBarChart
              data={mrrMovement}
              xKey="label"
              series={[
                { key: 'value', label: 'USD Value', color: '#6C47FF' }
              ]}
              yTickFormatter={currencyFormatter}
            />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Gateway Share Donut */}
          <ChartCard 
            title="Payment Gateway Volume Split" 
            subtitle="Processing ratios between integration providers"
            className="xl:col-span-1"
          >
            <AnalyticsPieChart
              data={paymentMethods}
              donut={true}
              innerLabel="$284.9K"
              innerSubLabel="Processed Volume"
            />
          </ChartCard>

          {/* Revenue Tier distribution */}
          <ChartCard 
            title="Revenue Tiers vs Active Members" 
            subtitle="Financial contribution compared to student headcount per tier"
            className="xl:col-span-2"
          >
            <AnalyticsBarChart
              data={revenuePlan}
              xKey="plan"
              series={[
                { key: 'revenue', label: 'Revenue ($)', color: '#6C47FF' },
                { key: 'users', label: 'Users (scaled x10)', color: '#00C9A7' }
              ]}
            />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
