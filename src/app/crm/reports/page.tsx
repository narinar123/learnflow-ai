'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';

export default function ReportsPage() {
  const { logActivity } = useCRM();
  const [mounted, setMounted] = useState(false);
  
  const [reportType, setReportType] = useState('Leads & Pipeline Valuation');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  
  // Compilation States
  const [compiling, setCompiling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compiledReport, setCompiledReport] = useState<{ filename: string; size: string } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleCompile = (e: React.FormEvent) => {
    e.preventDefault();
    setCompiling(true);
    setProgress(0);
    setCompiledReport(null);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCompiling(false);
            const prefix = reportType.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 15);
            setCompiledReport({
              filename: `learnflow_crm_${prefix}_${new Date().toISOString().split('T')[0]}.csv`,
              size: '42.8 KB'
            });
            logActivity('System', 'CRM Report Compiled 📁', `Compiled custom report: "${reportType}" for period: ${dateRange}.`);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const handleDownload = () => {
    if (!compiledReport) return;
    alert(`📥 Downloading mock file: ${compiledReport.filename} (${compiledReport.size})`);
    logActivity('System', 'Report Downloaded', `Downloaded spreadsheet: ${compiledReport.filename}`);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white font-display">Reports Generator</h1>
        <p className="text-slate-400 text-xs mt-1">
          Extract structured spreadsheets of CRM records, user conversion funnels, and billing transaction ledgers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Compiler form */}
        <div className="md:col-span-2 bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Report Configurator</h3>
          
          <form onSubmit={handleCompile} className="space-y-4">
            
            {/* Report Type */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Select Target Dataset</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-[#111625] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                <option value="Leads & Pipeline Valuation">Leads Directory & Pipeline Valuation</option>
                <option value="Billing & Overdue Invoices">Billing, Overdue Invoices & Collections</option>
                <option value="Marketing Campaigns Performance">Marketing Campaigns Performance logs</option>
                <option value="Student Cohorts & Upgrades">Student Learning Progress & Upgrades</option>
                <option value="Partner Recruiter Accounts">Partner Recruiter Active Jobs & Rating</option>
              </select>
            </div>

            {/* Date range selection */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Report Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-[#111625] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Current Quarter (Q3 FY 22)">Current Quarter (Q3 FY 2026)</option>
                <option value="Year to Date">Year to Date (YTD)</option>
              </select>
            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={compiling}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-650 to-purple-650 hover:from-indigo-550 hover:to-purple-550 disabled:from-indigo-850 disabled:to-purple-850 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-650/15"
              >
                {compiling ? '📁 Compiling Spreadsheet Rows...' : '⚙️ Compile Report Spreadsheet'}
              </button>
            </div>

          </form>
        </div>

        {/* Telemetry panel */}
        <div className="md:col-span-1 bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5 flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Export Status</h3>
            
            {compiling && (
              <div className="space-y-4 py-8">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Exporting rows...</span>
                  <span className="text-indigo-400 font-bold">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-900 border border-slate-850 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Querying client-side memory cache. Formatting row headers to RFC 4180 standard.
                </p>
              </div>
            )}

            {!compiling && !compiledReport && (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-600">
                <span className="text-2xl">📁</span>
                <p className="text-[10px] mt-2 font-bold uppercase tracking-wider">No exports generated</p>
                <p className="text-[10px] text-slate-500 mt-1 max-w-[150px]">Choose a target dataset to compile.</p>
              </div>
            )}

            {compiledReport && (
              <div className="space-y-4 py-2 animate-in fade-in duration-200">
                <div className="p-3 bg-[#10B981]/5 border border-[#10B981]/25 rounded-xl text-center">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">Compilation Complete 🎉</span>
                  <span className="text-xs font-black text-slate-200 block mt-1.5 truncate">{compiledReport.filename}</span>
                  <span className="text-[9px] text-slate-500 block mt-0.5">Size: {compiledReport.size}</span>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-550 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  📥 Download CSV File
                </button>
              </div>
            )}
          </div>
          
          <div className="text-[10px] text-slate-600 border-t border-slate-850/60 pt-3">
            ℹ️ Extracted reports are simulated locally and downloaded directly.
          </div>
        </div>

      </div>

    </div>
  );
}
