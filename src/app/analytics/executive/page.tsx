'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { FilterBar } from '@/components/analytics/FilterBar';
import { KPIGrid } from '@/components/analytics/KPIGrid';
import { ChartCard } from '@/components/analytics/ChartCard';
import { AnalyticsAreaChart } from '@/components/analytics/AreaChart';
import { ForecastChart } from '@/components/analytics/ForecastChart';
import { HeatmapChart } from '@/components/analytics/HeatmapChart';
import { GaugeChart } from '@/components/analytics/GaugeChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import {
  executiveKPIs,
  revenueAreaData,
  forecastData,
  activityHeatmap,
  geoData,
  platformHealth
} from '@/lib/analytics/mock-data';

export default function ExecutiveAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [segment, setSegment] = useState('all');
  const [granularity, setGranularity] = useState('monthly');

  // Format currency helper
  const currencyFormatter = (value: number) => `$${value.toLocaleString()}`;

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      {/* Top Header */}
      <AnalyticsTopbar
        title="Executive Command"
        subtitle="Real-time multi-tenant overview, platform health and revenue tracking"
        onRefresh={() => alert('Refreshing dashboard...')}
        actions={<ExportButton data={geoData} filename="executive_summary" pdfTitle="Executive Analytics Report" />}
      />

      <div className="px-6 space-y-6">
        {/* Filter Bar */}
        <FilterBar
          dateRange={dateRange}
          setDateRange={setDateRange}
          segment={segment}
          setSegment={setSegment}
          granularity={granularity}
          setGranularity={setGranularity}
        />

        {/* AI Insight */}
        <InsightCard 
          insight="SaaS Recurring Revenue (MRR) grew 18.4% YoY, driven primarily by enterprise seat activations. Platform uptime remained stable at 99.97% with active learning session spikes on Tuesdays."
          color="primary"
        />

        {/* KPI Grid */}
        <KPIGrid items={executiveKPIs} cols={3} />

        {/* Charts & Tables Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Revenue Trend Area Chart */}
          <ChartCard 
            title="Revenue Trend & YoY Comparison" 
            subtitle="Subscription vs enterprise income over past 12 months"
          >
            <AnalyticsAreaChart
              data={revenueAreaData}
              xKey="month"
              series={[
                { key: 'thisYear', label: 'This Year (USD)', color: '#6C47FF' },
                { key: 'lastYear', label: 'Last Year (USD)', color: '#00C9A7', fillOpacity: 0.1, dashed: true }
              ]}
              yTickFormatter={currencyFormatter}
            />
          </ChartCard>

          {/* AI Financial Forecasting */}
          <ChartCard 
            title="AI Revenue Forecasting" 
            subtitle="Machine learning model prediction with 95% confidence interval"
          >
            <ForecastChart 
              data={forecastData} 
              yTickFormatter={currencyFormatter} 
            />
          </ChartCard>
        </div>

        {/* Heatmap & Platform Gauges */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Calendar Activity Grid */}
          <ChartCard 
            title="Platform Activity Heatmap" 
            subtitle="Daily student and trainer interactions over past 52 weeks"
            className="xl:col-span-2"
          >
            <div className="overflow-x-auto pt-2">
              <HeatmapChart data={activityHeatmap} />
            </div>
          </ChartCard>

          {/* Health Gauge Circular Bars */}
          <ChartCard 
            title="Service Health Metrics" 
            subtitle="Core operational accuracy & uptime"
          >
            <div className="grid grid-cols-2 gap-4 justify-items-center">
              {platformHealth.map((health) => (
                <GaugeChart
                  key={health.label}
                  value={health.value}
                  max={health.max}
                  label={health.label}
                  color={health.color}
                  height={120}
                />
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Geographical Performance Table */}
        <ChartCard 
          title="Geographical Distribution & Engagement" 
          subtitle="Top countries ordered by active student count"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground font-semibold">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4 text-right">Active Students</th>
                  <th className="py-3 px-4 text-right">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {geoData.map((geo, index) => (
                  <tr key={geo.country} className="hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-muted-foreground">
                      #{index + 1}
                    </td>
                    <td className="py-3 px-4 font-semibold text-foreground flex items-center gap-2">
                      <span className="text-sm">{geo.flag}</span>
                      {geo.country}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium text-foreground">
                      {geo.users.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-accent">
                      {geo.share}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
