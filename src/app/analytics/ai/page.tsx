'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { FilterBar } from '@/components/analytics/FilterBar';
import { KPIGrid } from '@/components/analytics/KPIGrid';
import { ChartCard } from '@/components/analytics/ChartCard';
import { AnalyticsAreaChart } from '@/components/analytics/AreaChart';
import { AnalyticsBarChart } from '@/components/analytics/BarChart';
import { AnalyticsPieChart } from '@/components/analytics/PieChart';
import { AnalyticsLineChart } from '@/components/analytics/LineChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import {
  aiKPIs,
  aiQueryVolume,
  aiTopics,
  aiQuality,
  aiCostROI
} from '@/lib/analytics/mock-data';

export default function AIAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="AI & Model Insights"
        subtitle="Review AI session volumes, prompt responses latency, topic categories, accuracy indexes and cost ROI values"
        actions={<ExportButton data={aiQuality} filename="ai_quality_performance" pdfTitle="AI Insights Report" />}
      />

      <div className="px-6 space-y-6">
        <FilterBar dateRange={dateRange} setDateRange={setDateRange} />

        <InsightCard
          insight="AI Tutor accuracy index rose to 94.2% while model costs dropped 12.4% following the migration of vector database indices onto cached edge schemas."
          color="primary"
        />

        <KPIGrid items={aiKPIs} cols={3} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Query Volume Trend */}
          <ChartCard 
            title="AI Query Volumes & Resolutions" 
            subtitle="Comparing total incoming chatbot queries against successfully resolved sessions"
          >
            <AnalyticsAreaChart
              data={aiQueryVolume}
              xKey="month"
              series={[
                { key: 'queries', label: 'Chatbot Queries', color: '#6C47FF' },
                { key: 'resolved', label: 'Resolved (No escalation)', color: '#00C9A7' }
              ]}
            />
          </ChartCard>

          {/* AI Cost vs ROI */}
          <ChartCard 
            title="AI Operational Cost vs Saved Support Cost" 
            subtitle="Comparing direct token consumption expenses against estimated support ticket costs saved"
          >
            <AnalyticsBarChart
              data={aiCostROI}
              xKey="month"
              series={[
                { key: 'cost', label: 'Token Expenses ($)', color: '#EF4444' },
                { key: 'roi', label: 'Support Savings ($x10)', color: '#00C9A7' }
              ]}
            />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* AI Topics */}
          <ChartCard 
            title="Chatbot Topic Distribution" 
            subtitle="Most frequent prompt category clusters processed by AI"
            className="xl:col-span-1"
          >
            <AnalyticsPieChart
              data={aiTopics}
              donut={true}
              innerLabel="Topic Mix"
              innerSubLabel="Chat Queries"
            />
          </ChartCard>

          {/* AI Quality / Satisfaction */}
          <ChartCard 
            title="Chatbot Response Quality & Accuracy" 
            subtitle="Evaluation rate vs user satisfaction surveys compared to benchmark"
            className="xl:col-span-2"
          >
            <AnalyticsLineChart
              data={aiQuality}
              xKey="month"
              series={[
                { key: 'accuracy', label: 'Accuracy Index (%)', color: '#6C47FF' },
                { key: 'satisfaction', label: 'User Satisfaction (%)', color: '#00C9A7' }
              ]}
              referenceLines={[{ y: 92, label: 'Quality Goal', color: '#EF4444' }]}
            />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
