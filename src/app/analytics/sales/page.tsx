'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { FilterBar } from '@/components/analytics/FilterBar';
import { KPIGrid } from '@/components/analytics/KPIGrid';
import { ChartCard } from '@/components/analytics/ChartCard';
import { AnalyticsLineChart } from '@/components/analytics/LineChart';
import { AnalyticsBarChart } from '@/components/analytics/BarChart';
import { FunnelChart } from '@/components/analytics/FunnelChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import {
  salesKPIs,
  salesFunnel,
  conversionTrend,
  leadSources,
  salesReps
} from '@/lib/analytics/mock-data';

export default function SalesAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Sales & Pipeline Analytics"
        subtitle="Track inbound leads, checkout conversion funnels, close rates, and sales agent performances"
        actions={<ExportButton data={salesReps} filename="sales_performance" pdfTitle="Sales Analytics Report" />}
      />

      <div className="px-6 space-y-6">
        <FilterBar dateRange={dateRange} setDateRange={setDateRange} />

        <InsightCard
          insight="Organic search and referrals drive the highest lead conversions. Close rates reached 15.2% while average contract sales cycle improved to 18 days."
          color="accent"
        />

        <KPIGrid items={salesKPIs} cols={3} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Conversion Trend */}
          <ChartCard 
            title="Checkout Conversion Rate Trend" 
            subtitle="Percentage of visitors successfully completing subscription checkouts"
          >
            <AnalyticsLineChart
              data={conversionTrend}
              xKey="month"
              series={[{ key: 'rate', label: 'Conversion Rate (%)', color: '#00C9A7' }]}
              yTickFormatter={(v) => `${v}%`}
            />
          </ChartCard>

          {/* Lead Sources horizontal bar */}
          <ChartCard 
            title="Lead Source Distribution" 
            subtitle="Top channels bringing leads onto the platform"
          >
            <AnalyticsBarChart
              data={leadSources}
              xKey="source"
              series={[{ key: 'leads', label: 'Total Leads', color: '#6C47FF' }]}
              layout="vertical"
            />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Visitor to Buyer Funnel */}
          <ChartCard 
            title="Visitor to Buyer Conversion Funnel" 
            subtitle="Friction points and drop-offs along checkout pathway"
            className="xl:col-span-1"
          >
            <FunnelChart data={salesFunnel} />
          </ChartCard>

          {/* Sales reps leaderboard */}
          <ChartCard 
            title="Sales Reps Pipeline Overview" 
            subtitle="Quota tracking, leads worked, deals won, and revenue booked"
            className="xl:col-span-2"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">Agent</th>
                    <th className="py-2.5 px-3 text-right">Leads</th>
                    <th className="py-2.5 px-3 text-right">Deals Won</th>
                    <th className="py-2.5 px-3 text-right">Close Rate</th>
                    <th className="py-2.5 px-3 text-right">Booked Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-xs">
                  {salesReps.map((rep) => (
                    <tr key={rep.name} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-3 px-3 font-semibold text-foreground">
                        {rep.name}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-medium text-foreground">
                        {rep.leads.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-medium text-foreground">
                        {rep.won.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-accent">
                        {rep.rate}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-extrabold text-primary">
                        {rep.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
