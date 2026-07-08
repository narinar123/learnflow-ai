'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { FilterBar } from '@/components/analytics/FilterBar';
import { KPIGrid } from '@/components/analytics/KPIGrid';
import { ChartCard } from '@/components/analytics/ChartCard';
import { AnalyticsAreaChart } from '@/components/analytics/AreaChart';
import { AnalyticsBarChart } from '@/components/analytics/BarChart';
import { AnalyticsRadarChart } from '@/components/analytics/RadarChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import {
  crmKPIs,
  crmActivity,
  dealStages,
  topAccounts,
  churnRiskRadar
} from '@/lib/analytics/mock-data';

export default function CRMAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="CRM & Pipeline Analytics"
        subtitle="Manage customer relations, deal pipeline health, support log activity, and churn warning signs"
        actions={<ExportButton data={topAccounts} filename="crm_top_accounts" pdfTitle="CRM Analytics Report" />}
      />

      <div className="px-6 space-y-6">
        <FilterBar dateRange={dateRange} setDateRange={setDateRange} />

        <InsightCard
          insight="Pipeline health is strong at 82%. CRM Activity logs reflect a 24% increase in outbound customer interactions (emails/meetings) leading up to summer contract renewals."
          color="warning"
        />

        <KPIGrid items={crmKPIs} cols={3} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* CRM Activity multi-series AreaChart */}
          <ChartCard 
            title="CRM Activity Timeline" 
            subtitle="Volume of outbound sales communications (calls, emails, meetings) per month"
          >
            <AnalyticsAreaChart
              data={crmActivity}
              xKey="month"
              series={[
                { key: 'calls', label: 'Phone Calls', color: '#6C47FF' },
                { key: 'emails', label: 'Outbound Emails', color: '#00C9A7' },
                { key: 'meetings', label: 'Scheduled Meetings', color: '#F59E0B' }
              ]}
            />
          </ChartCard>

          {/* Deal age distribution */}
          <ChartCard 
            title="Deal Age Distribution" 
            subtitle="Number of active sales deals grouped by velocity/age (days in pipeline)"
          >
            <AnalyticsBarChart
              data={dealStages}
              xKey="stage"
              series={[{ key: 'deals', label: 'Deals in Stage', color: '#3B82F6' }]}
            />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Churn Risk Profile Radar */}
          <ChartCard 
            title="Account Churn Risk Profile" 
            subtitle="Evaluating accounts at risk vs healthy benchmarks across indicators"
            className="xl:col-span-1"
          >
            <AnalyticsRadarChart
              data={churnRiskRadar}
              angleKey="subject"
              series={[
                { key: 'risk', label: 'High Risk Cohort', color: '#EF4444' },
                { key: 'safe', label: 'Healthy Target', color: '#00C9A7' }
              ]}
            />
          </ChartCard>

          {/* Top Accounts */}
          <ChartCard 
            title="Top Active CRM Enterprise Accounts" 
            subtitle="Contract scale and health summary"
            className="xl:col-span-2"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">Account</th>
                    <th className="py-2.5 px-3 text-right">ARR</th>
                    <th className="py-2.5 px-3 text-center">Health Score</th>
                    <th className="py-2.5 px-3 text-right">Last Contact</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-xs">
                  {topAccounts.map((acc) => {
                    const isDanger = acc.health < 70 || acc.status === 'Churning' || acc.status === 'At Risk';
                    return (
                      <tr key={acc.name} className="hover:bg-secondary/20 transition-colors">
                        <td className="py-3 px-3 font-semibold text-foreground">
                          {acc.name}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-medium text-foreground">
                          {acc.arr}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`font-mono font-bold ${isDanger ? 'text-danger' : 'text-accent'}`}>
                            {acc.health}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right text-muted-foreground font-medium">
                          {acc.lastContact}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            acc.status === 'Active' || acc.status === 'Healthy'
                              ? 'bg-accent/15 text-accent'
                              : acc.status === 'At Risk'
                              ? 'bg-warning/15 text-warning'
                              : 'bg-danger/15 text-danger'
                          }`}>
                            {acc.status}
                          </span>
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
