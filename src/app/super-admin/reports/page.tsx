'use client';

import React from 'react';

const mockReports = [
  { name: 'MRR Growth Analysis', type: 'Financial Analytics', format: 'PDF · CSV', size: '2.4 MB', created: 'July 1, 2026', author: 'System Job scheduler' },
  { name: 'Resource Allocation and Elastic Scaling', type: 'Infrastructure Auditing', format: 'PDF', size: '4.8 MB', created: 'July 1, 2026', author: 'Prometheus Collector' },
  { name: 'AI Tutor Performance metrics', type: 'Usage Analytics', format: 'PDF · CSV · XLSX', size: '12.4 MB', created: 'July 1, 2026', author: 'Gemini Usage agent' },
  { name: 'Compliance WAF logs report', type: 'Security Auditing', format: 'ZIP', size: '42.1 MB', created: 'July 1, 2026', author: 'Security Center scheduler' },
];

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Reports</h1>
          <p className="text-sm text-white/40 mt-0.5">Automated batch analytics, SOC2 audit reports, and consolidated data exports</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Run Batch Report
        </button>
      </div>

      {/* Main Grid for Reports and download streams */}
      <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <h2 className="text-sm font-semibold text-white">Consolidated Platform Analytics Packages</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {['Report Name', 'Analysis Type', 'Export File Format', 'File Size', 'Generation Date', 'Triggered By', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium text-white/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockReports.map((r, i) => (
              <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                <td className="px-5 py-3.5 font-semibold text-white/85">{r.name}</td>
                <td className="px-5 py-3.5 text-xs text-white/60">{r.type}</td>
                <td className="px-5 py-3.5 text-xs text-violet-300 font-mono">{r.format}</td>
                <td className="px-5 py-3.5 text-xs text-white/50">{r.size}</td>
                <td className="px-5 py-3.5 text-xs text-white/45">{r.created}</td>
                <td className="px-5 py-3.5 text-xs text-white/50 font-mono">{r.author}</td>
                <td className="px-5 py-3.5">
                  <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Download Package</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
