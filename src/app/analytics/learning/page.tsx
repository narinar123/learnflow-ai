'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { FilterBar } from '@/components/analytics/FilterBar';
import { KPIGrid } from '@/components/analytics/KPIGrid';
import { ChartCard } from '@/components/analytics/ChartCard';
import { AnalyticsBarChart } from '@/components/analytics/BarChart';
import { AnalyticsRadarChart } from '@/components/analytics/RadarChart';
import { FunnelChart } from '@/components/analytics/FunnelChart';
import { InsightCard } from '@/components/analytics/InsightCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import {
  learningKPIs,
  learningByHour,
  skillMastery,
  lessonDropoff,
  learningPaths
} from '@/lib/analytics/mock-data';

export default function LearningAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Learning Behavior Analytics"
        subtitle="Understand student study habits, active hourly peaks, curriculum completions and drop-off points"
        actions={<ExportButton data={learningPaths} filename="learning_paths" pdfTitle="Learning Analytics Report" />}
      />

      <div className="px-6 space-y-6">
        <FilterBar dateRange={dateRange} setDateRange={setDateRange} />

        <InsightCard
          insight="Hourly traffic reveals a significant study volume spike between 6:00 PM and 9:00 PM (1,800+ sessions). Curriculum completion is highest for the UX Design and Cloud Architect paths."
          color="primary"
        />

        <KPIGrid items={learningKPIs} cols={3} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Daily Learning hourly peaks */}
          <ChartCard 
            title="Hourly Study Session Activity" 
            subtitle="Total student platform sessions grouped by hour of the day"
          >
            <AnalyticsBarChart
              data={learningByHour}
              xKey="hour"
              series={[{ key: 'sessions', label: 'Sessions', color: '#6C47FF' }]}
            />
          </ChartCard>

          {/* Skill Mastery radar chart */}
          <ChartCard 
            title="Skill Area Strengths Profile" 
            subtitle="Aggregated evaluation score (%) showing platform mastery across key concepts"
          >
            <AnalyticsRadarChart
              data={skillMastery}
              angleKey="subject"
              series={[{ key: 'value', label: 'Mastery Index (%)', color: '#00C9A7' }]}
              showLegend={false}
            />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Dropoff Funnel */}
          <ChartCard 
            title="Curriculum Completion Funnel" 
            subtitle="Friction and drop-off points from course sign-ups to certificates issued"
            className="xl:col-span-1"
          >
            <FunnelChart data={lessonDropoff} />
          </ChartCard>

          {/* Learning path completion metrics */}
          <ChartCard 
            title="Learning Paths Performance Overview" 
            subtitle="Curriculum student numbers compared to final graduations"
            className="xl:col-span-2"
          >
            <div className="space-y-4 pt-2">
              {learningPaths.map((path) => (
                <div key={path.path} className="flex flex-col">
                  <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mb-1">
                    <span>{path.path}</span>
                    <span className="font-mono text-foreground font-bold">
                      {path.completed.toLocaleString()} / {path.enrolled.toLocaleString()} Graduated ({path.pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden border border-border/40">
                    <div 
                      className="h-full gradient-primary rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${path.pct}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
