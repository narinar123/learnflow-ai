'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { FilterBar } from '@/components/analytics/FilterBar';
import { KPIGrid } from '@/components/analytics/KPIGrid';
import { ChartCard } from '@/components/analytics/ChartCard';
import { AnalyticsLineChart } from '@/components/analytics/LineChart';
import { AnalyticsBarChart } from '@/components/analytics/BarChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import {
  studentKPIs,
  enrollmentTrend,
  completionHistogram,
  cohortRetention,
  topStudents
} from '@/lib/analytics/mock-data';

export default function StudentAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [segment, setSegment] = useState('all');

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Student Analytics"
        subtitle="Track platform enrollment, graduation rates, engagement cycles, and leaderboard metrics"
        actions={<ExportButton data={topStudents} filename="student_leaderboard" pdfTitle="Student Analytics Report" />}
      />

      <div className="px-6 space-y-6">
        <FilterBar
          dateRange={dateRange}
          setDateRange={setDateRange}
          segment={segment}
          setSegment={setSegment}
        />

        <InsightCard
          insight="Cohort week-over-week retention shows a stable 87% rate, while course completion ratios increased by 3.1% after the release of the dynamic AI Flashcards module."
          color="accent"
        />

        <KPIGrid items={studentKPIs} cols={3} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Enrollment Line Chart */}
          <ChartCard 
            title="Enrollment Over Time" 
            subtitle="Comparing new registrations vs returning user logins"
          >
            <AnalyticsLineChart
              data={enrollmentTrend}
              xKey="month"
              series={[
                { key: 'new', label: 'New Students', color: '#6C47FF' },
                { key: 'returning', label: 'Returning Students', color: '#00C9A7' }
              ]}
            />
          </ChartCard>

          {/* Retention Stacked Bar */}
          <ChartCard 
            title="Weekly Cohort Retention" 
            subtitle="Percentage of users active week-over-week (Week 1–8)"
          >
            <AnalyticsBarChart
              data={cohortRetention}
              xKey="week"
              series={[
                { key: 'retained', label: 'Retained (%)', color: '#00C9A7' },
                { key: 'churned', label: 'Inactive (%)', color: '#EF4444' }
              ]}
              stacked={true}
              yTickFormatter={(v) => `${v}%`}
            />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Progress Distribution Histogram */}
          <ChartCard 
            title="Course Completion Distribution" 
            subtitle="Total student count bucketed by syllabus completion percentage"
            className="xl:col-span-1"
          >
            <AnalyticsBarChart
              data={completionHistogram}
              xKey="range"
              series={[{ key: 'count', label: 'Students', color: '#3B82F6' }]}
            />
          </ChartCard>

          {/* Leaderboard Table */}
          <ChartCard 
            title="Top Performing Students Leaderboard" 
            subtitle="Ranked by total experience points (XP), courses and active streaks"
            className="xl:col-span-2"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Student</th>
                    <th className="py-2.5 px-3 text-right">Completions</th>
                    <th className="py-2.5 px-3 text-right">Active Streak</th>
                    <th className="py-2.5 px-3 text-right">Total XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-xs">
                  {topStudents.map((st) => (
                    <tr key={st.rank} className="hover:bg-secondary/20 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-muted-foreground">
                        #{st.rank}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{st.name}</span>
                          <span className="text-[10px] text-muted-foreground">{st.plan} Plan</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-medium text-foreground">
                        {st.completions}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-warning">
                        🔥 {st.streak} days
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-extrabold text-primary">
                        {st.xp.toLocaleString()}
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
