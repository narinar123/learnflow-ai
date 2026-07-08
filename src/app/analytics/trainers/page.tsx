'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { FilterBar } from '@/components/analytics/FilterBar';
import { KPIGrid } from '@/components/analytics/KPIGrid';
import { ChartCard } from '@/components/analytics/ChartCard';
import { AnalyticsBarChart } from '@/components/analytics/BarChart';
import { AnalyticsPieChart } from '@/components/analytics/PieChart';
import { AnalyticsLineChart } from '@/components/analytics/LineChart';
import { AnalyticsRadarChart } from '@/components/analytics/RadarChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import {
  trainerKPIs,
  trainerLeaderboard,
  contentOutput,
  ratingDistribution,
  responseTimeTrend,
  trainerRadar
} from '@/lib/analytics/mock-data';

export default function TrainerAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Trainer Analytics"
        subtitle="Manage author distributions, response times, published chapters, ratings and satisfaction metrics"
        actions={<ExportButton data={trainerLeaderboard} filename="trainer_analytics" pdfTitle="Trainer Analytics Report" />}
      />

      <div className="px-6 space-y-6">
        <FilterBar dateRange={dateRange} setDateRange={setDateRange} />

        <InsightCard
          insight="Avg trainer rating remains strong at 4.7/5. Average response time for course questions dropped by 1.2 hours, matching support SLA targets."
          color="warning"
        />

        <KPIGrid items={trainerKPIs} cols={3} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Content Output */}
          <ChartCard 
            title="Course Creation & Learning Hours" 
            subtitle="Monthly distribution of courses created vs lecture hours added"
          >
            <AnalyticsBarChart
              data={contentOutput}
              xKey="month"
              series={[
                { key: 'courses', label: 'Courses Created', color: '#6C47FF' },
                { key: 'hours', label: 'Lecture Hours (x10)', color: '#00C9A7' }
              ]}
            />
          </ChartCard>

          {/* Response Time Trend */}
          <ChartCard 
            title="Avg Student Support Response Time" 
            subtitle="Trainer average response time (hours) to student questions"
          >
            <AnalyticsLineChart
              data={responseTimeTrend}
              xKey="month"
              series={[{ key: 'avgHours', label: 'Response Time (Hours)', color: '#F59E0B' }]}
            />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Radar Rating Metrics */}
          <ChartCard 
            title="Performance Dimension Evaluation" 
            subtitle="Comparing top vs average trainers across key indicators"
            className="xl:col-span-1"
          >
            <AnalyticsRadarChart
              data={trainerRadar}
              angleKey="subject"
              series={[
                { key: 'A', label: 'Top Tier Trainers', color: '#6C47FF' },
                { key: 'B', label: 'Average Trainers', color: '#00C9A7' }
              ]}
            />
          </ChartCard>

          {/* Rating Distribution Donut */}
          <ChartCard 
            title="Trainer Rating Distribution" 
            subtitle="Percentage share of ratings left by students"
            className="xl:col-span-1"
          >
            <AnalyticsPieChart
              data={ratingDistribution}
              donut={true}
              innerLabel="4.7"
              innerSubLabel="Out of 5 Stars"
            />
          </ChartCard>

          {/* Top Trainers Table */}
          <ChartCard 
            title="Featured Trainer Leaderboard" 
            subtitle="Top authors ranked by total active students and rating score"
            className="xl:col-span-1"
          >
            <div className="overflow-y-auto max-h-[260px] scrollbar-thin">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-[10px] text-muted-foreground font-semibold">
                    <th className="py-2 px-1">Trainer</th>
                    <th className="py-2 px-1 text-center">Rating</th>
                    <th className="py-2 px-1 text-right">Students</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-xs">
                  {trainerLeaderboard.slice(0, 5).map((tr) => (
                    <tr key={tr.rank} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-2 px-1">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{tr.name}</span>
                          <span className="text-[9px] text-muted-foreground">{tr.category}</span>
                        </div>
                      </td>
                      <td className="py-2 px-1 text-center font-mono font-bold text-warning">
                        ★ {tr.rating}
                      </td>
                      <td className="py-2 px-1 text-right font-mono font-semibold text-foreground">
                        {tr.students.toLocaleString()}
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
