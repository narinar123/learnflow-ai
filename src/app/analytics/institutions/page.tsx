'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { FilterBar } from '@/components/analytics/FilterBar';
import { KPIGrid } from '@/components/analytics/KPIGrid';
import { ChartCard } from '@/components/analytics/ChartCard';
import { AnalyticsBarChart } from '@/components/analytics/BarChart';
import { FunnelChart } from '@/components/analytics/FunnelChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import {
  institutionKPIs,
  licenseUsage,
  engagementByInstitution,
  renewalFunnel
} from '@/lib/analytics/mock-data';

export default function InstitutionAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Institution Analytics"
        subtitle="Review multi-tenant licenses, seat utilization, campus renewals, and student engagement indexes"
        actions={<ExportButton data={licenseUsage} filename="institution_contracts" pdfTitle="Institution Analytics Report" />}
      />

      <div className="px-6 space-y-6">
        <FilterBar dateRange={dateRange} setDateRange={setDateRange} />

        <InsightCard
          insight="Seat utilization reached a high of 87.4%, led by TechCorp Inc. and Apex University activations. Contracts pipeline remains solid with a 94.1% renewal forecast."
          color="info"
        />

        <KPIGrid items={institutionKPIs} cols={4} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* License Usage Allocated vs Used */}
          <ChartCard 
            title="Seat Licenses Utilization" 
            subtitle="Comparing allocated seat count vs active student log-ins"
          >
            <AnalyticsBarChart
              data={licenseUsage}
              xKey="name"
              series={[
                { key: 'allocated', label: 'Allocated Seats', color: '#6C47FF' },
                { key: 'used', label: 'Used Seats', color: '#00C9A7' }
              ]}
            />
          </ChartCard>

          {/* Engagement index by Institution */}
          <ChartCard 
            title="Institution Engagement Index" 
            subtitle="Ranked score based on weekly quiz completions and platform hours"
          >
            <AnalyticsBarChart
              data={engagementByInstitution}
              xKey="name"
              series={[{ key: 'score', label: 'Engagement Score (1-100)', color: '#3B82F6' }]}
              layout="vertical"
            />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Contract Renewal Funnel */}
          <ChartCard 
            title="Contract Renewal Funnel" 
            subtitle="Stages of current institutional accounts up for contract extensions"
            className="xl:col-span-1"
          >
            <FunnelChart data={renewalFunnel} />
          </ChartCard>

          {/* Active Licenses List */}
          <ChartCard 
            title="Campus Accounts & Seats Overview" 
            subtitle="SaaS tenant license scopes and expiration status"
            className="xl:col-span-2"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">Institution</th>
                    <th className="py-2.5 px-3 text-right">Allocated</th>
                    <th className="py-2.5 px-3 text-right">Used</th>
                    <th className="py-2.5 px-3 text-right">Utilization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-xs">
                  {licenseUsage.map((inst) => {
                    const ratio = Math.round((inst.used / inst.allocated) * 100);
                    return (
                      <tr key={inst.name} className="hover:bg-secondary/20 transition-colors">
                        <td className="py-3 px-3 font-semibold text-foreground">
                          {inst.name}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-medium text-foreground">
                          {inst.allocated.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-medium text-foreground">
                          {inst.used.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-accent">
                          {ratio}%
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
    </div>
  );
}
