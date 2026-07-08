'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { FilterBar } from '@/components/analytics/FilterBar';
import { KPIGrid } from '@/components/analytics/KPIGrid';
import { ChartCard } from '@/components/analytics/ChartCard';
import { AnalyticsPieChart } from '@/components/analytics/PieChart';
import { AnalyticsLineChart } from '@/components/analytics/LineChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import {
  courseKPIs,
  topCourses,
  courseCategories,
  ratingTrend
} from '@/lib/analytics/mock-data';

export default function CourseAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Course Performance Analytics"
        subtitle="Analyze course ratings, average completion ratios, class catalogs, and top-performing courses"
        actions={<ExportButton data={topCourses} filename="course_performance" pdfTitle="Course Analytics Report" />}
      />

      <div className="px-6 space-y-6">
        <FilterBar dateRange={dateRange} setDateRange={setDateRange} />

        <InsightCard
          insight="Engineering and Data & AI categories combined represent 50% of our catalog and drive 68% of the platform's course completions."
          color="accent"
        />

        <KPIGrid items={courseKPIs} cols={3} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Categories Donut */}
          <ChartCard 
            title="Course Catalog Categories" 
            subtitle="Percentage share of courses by learning category"
            className="xl:col-span-1"
          >
            <AnalyticsPieChart
              data={courseCategories}
              donut={true}
              innerLabel="8.9K"
              innerSubLabel="Total Classes"
            />
          </ChartCard>

          {/* Rating Trend line chart */}
          <ChartCard 
            title="Average Course Rating Trends" 
            subtitle="Evaluating course ratings across primary fields over past 12 months"
            className="xl:col-span-2"
          >
            <AnalyticsLineChart
              data={ratingTrend}
              xKey="month"
              series={[
                { key: 'engineering', label: 'Engineering field', color: '#6C47FF' },
                { key: 'business', label: 'Business field', color: '#F59E0B' },
                { key: 'design', label: 'Design field', color: '#00C9A7' }
              ]}
            />
          </ChartCard>
        </div>

        {/* Top Courses Table */}
        <ChartCard 
          title="Top Performing Courses Overview" 
          subtitle="Ranked by total enrollments, completion ratios, ratings, and revenue scale"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground font-semibold">
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Course Title</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">Enrollments</th>
                  <th className="py-2.5 px-3 text-center">Avg Rating</th>
                  <th className="py-2.5 px-3 text-right">Completion</th>
                  <th className="py-2.5 px-3 text-right">Booked Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {topCourses.map((c) => (
                  <tr key={c.rank} className="hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-muted-foreground">
                      #{c.rank}
                    </td>
                    <td className="py-3 px-3 font-semibold text-foreground">
                      {c.title}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground font-medium">
                      {c.category}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-medium text-foreground">
                      {c.enrollments.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-warning">
                      ★ {c.rating}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-accent">
                      {c.completion}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-extrabold text-primary">
                      {c.revenue}
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
