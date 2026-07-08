'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { ChartCard } from '@/components/analytics/ChartCard';
import { ExportButton } from '@/components/analytics/ExportButton';
import { exportToPDF, exportToCSV, exportToExcel } from '@/lib/analytics/export-utils';
import {
  topCourses,
  geoData,
  topStudents,
  trainerLeaderboard
} from '@/lib/analytics/mock-data';

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  sourceData: Record<string, unknown>[];
  filename: string;
}

export default function ReportsHubPage() {
  const [selectedReportId, setSelectedReportId] = useState('revenue');
  const [format, setFormat] = useState<'csv' | 'xls' | 'pdf'>('csv');

  const reports: ReportTemplate[] = [
    {
      id: 'revenue',
      title: 'Geographical Revenue and User Share',
      description: 'Review active global student distribution, regional log-ins, and regional percentages.',
      sourceData: geoData as unknown as Record<string, unknown>[],
      filename: 'geographical_revenue_distribution'
    },
    {
      id: 'courses',
      title: 'Catalog Course Performance',
      description: 'Detailing courses ratings, total student enrollments, completion ratios and revenue generated.',
      sourceData: topCourses as unknown as Record<string, unknown>[],
      filename: 'course_catalog_performance'
    },
    {
      id: 'students',
      title: 'Active Students Leaderboard',
      description: 'List of top active student accounts ranked by XP, finished classes, and active daily streaks.',
      sourceData: topStudents as unknown as Record<string, unknown>[],
      filename: 'top_active_students'
    },
    {
      id: 'trainers',
      title: 'Authors Performance Ratings',
      description: 'Review teacher leaderboard stats, total students taught, and class ratings.',
      sourceData: trainerLeaderboard as unknown as Record<string, unknown>[],
      filename: 'trainer_performances'
    }
  ];

  const activeReport = reports.find(r => r.id === selectedReportId) || reports[0];

  const handleGenerate = () => {
    if (format === 'pdf') {
      exportToPDF(activeReport.title);
    } else if (format === 'csv') {
      exportToCSV(activeReport.sourceData, `${activeReport.filename}.csv`);
    } else if (format === 'xls') {
      exportToExcel(activeReport.sourceData, `${activeReport.filename}.xls`);
    }
  };

  const reportHistory = [
    { name: 'Geographical Revenue Share', date: '2026-07-07 15:42', format: 'PDF', status: 'Completed', size: '284 KB' },
    { name: 'Course Catalog performance', date: '2026-07-06 18:21', format: 'Excel', status: 'Completed', size: '42 KB' },
    { name: 'Active Students Leaderboard', date: '2026-07-05 09:12', format: 'CSV', status: 'Completed', size: '12 KB' },
    { name: 'Authors Performance Ratings', date: '2026-07-04 11:30', format: 'PDF', status: 'Completed', size: '318 KB' }
  ];

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Reports Hub"
        subtitle="Generate client-side accounting spreadsheets, print invoices metrics, and customize PDF templates"
      />

      <div className="px-6 space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Custom Report Builder Controls */}
          <ChartCard 
            title="Custom Report Builder" 
            subtitle="Configure report templates and export formats"
            className="xl:col-span-1"
          >
            <div className="space-y-4 pt-2 select-none">
              {/* Select Report Template */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select Template
                </label>
                <select
                  value={selectedReportId}
                  onChange={(e) => setSelectedReportId(e.target.value)}
                  className="bg-card border border-border rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-foreground"
                >
                  {reports.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Format selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Export Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['csv', 'xls', 'pdf'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFormat(fmt)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 border ${
                        format === fmt
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleGenerate}
                  className="w-full btn-primary py-2.5 rounded-xl font-bold text-xs"
                >
                  Generate & Download
                </button>
              </div>
            </div>
          </ChartCard>

          {/* Selected Report Preview Details */}
          <ChartCard 
            title="Report Details & Scope" 
            subtitle="Parameters of the selected export template"
            className="xl:col-span-2"
          >
            <div className="space-y-4 pt-2">
              <div>
                <h4 className="text-sm font-bold text-foreground">
                  {activeReport.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {activeReport.description}
                </p>
              </div>

              <div className="border border-border/60 bg-secondary/10 rounded-xl p-4">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Data Rows Count:</span>
                  <span className="font-mono text-foreground font-bold">{activeReport.sourceData.length} records</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Columns Structure:</span>
                  <span className="font-mono text-foreground font-semibold truncate max-w-xs">
                    {activeReport.sourceData.length > 0 ? Object.keys(activeReport.sourceData[0]).join(', ') : 'n/a'}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Target Export Filename:</span>
                  <span className="font-mono text-primary font-bold">{activeReport.filename}.{format}</span>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Report History */}
        <ChartCard 
          title="Generated Reports History Logs" 
          subtitle="List of recently requested or scheduled reports downloads"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground font-semibold">
                  <th className="py-2.5 px-3">Report Name</th>
                  <th className="py-2.5 px-3">Generated Date</th>
                  <th className="py-2.5 px-3 text-center">Format</th>
                  <th className="py-2.5 px-3 text-right">Size</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {reportHistory.map((hist, index) => (
                  <tr key={index} className="hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-3 font-semibold text-foreground">
                      {hist.name}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground font-mono">
                      {hist.date}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex px-2 py-0.5 rounded bg-secondary text-[10px] font-bold text-foreground">
                        {hist.format}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-muted-foreground">
                      {hist.size}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-accent">
                      {hist.status}
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
