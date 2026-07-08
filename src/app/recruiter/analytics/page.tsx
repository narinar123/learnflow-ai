'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { getJobApplications, getJobPostings } from '@/lib/recruiterData';

export default function RecruiterAnalyticsDashboard() {
  const [appsCount, setAppsCount] = useState(0);
  const [jobsCount, setJobsCount] = useState(0);

  useEffect(() => {
    setAppsCount(getJobApplications().length);
    setJobsCount(getJobPostings().length);
  }, []);

  // Conversion funnel data
  const funnelData = [
    { stage: 'Screening', count: 7, percentage: 100 },
    { stage: 'Interviewing', count: 3, percentage: 42.8 },
    { stage: 'Offer Stage', count: 2, percentage: 28.5 },
    { stage: 'Hired', count: 1, percentage: 14.2 },
  ];

  // Application Trend over last weeks
  const trendData = [
    { week: 'Week 1', applications: 2, hires: 0 },
    { week: 'Week 2', applications: 4, hires: 1 },
    { week: 'Week 3', applications: 8, hires: 0 },
    { week: 'Week 4', applications: 12, hires: 1 },
    { week: 'Week 5', applications: 7, hires: 0 },
  ];

  // Hires by Department
  const deptHiresData = [
    { name: 'Engineering', activeJobs: 2, applicants: 5, hires: 1 },
    { name: 'AI Research', activeJobs: 1, applicants: 2, hires: 0 },
    { name: 'Product Design', activeJobs: 1, applicants: 2, hires: 0 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Hiring Analytics</h1>
        <p className="text-slate-400 text-sm mt-1">Review candidate pipeline conversions, job posting effectiveness, and average time-to-hire reports.</p>
      </div>

      {/* Overview Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26]">
          <span className="text-xs font-bold text-slate-500 uppercase">Average Time-to-Hire</span>
          <div className="text-3xl font-black text-white mt-3">18.5 days</div>
          <div className="text-[10px] text-emerald-400 mt-2">⏱️ 2.4 days faster than average</div>
        </div>

        <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26]">
          <span className="text-xs font-bold text-slate-500 uppercase">Interview-to-Offer Ratio</span>
          <div className="text-3xl font-black text-white mt-3">41.2%</div>
          <div className="text-[10px] text-indigo-400 mt-2">📊 High candidate quality match</div>
        </div>

        <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26]">
          <span className="text-xs font-bold text-slate-500 uppercase">AI Recommendation Success</span>
          <div className="text-3xl font-black text-white mt-3">92.6%</div>
          <div className="text-[10px] text-emerald-400 mt-2">✔️ Hired candidates match AI profiles</div>
        </div>
      </div>

      {/* Recharts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Funnel chart */}
        <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Pipeline Conversion Funnel</h3>
            <p className="text-slate-500 text-[10px] mt-0.5">Summary of candidate progress ratios.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={funnelData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis type="number" stroke="#94A3B8" />
                <YAxis dataKey="stage" type="category" stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F0B26', borderColor: '#1E293B', color: '#FFF' }} 
                  itemStyle={{ color: '#818CF8' }}
                />
                <Bar dataKey="count" fill="#6C47FF" radius={[0, 8, 8, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Trend chart */}
        <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Weekly Application Trends</h3>
            <p className="text-slate-500 text-[10px] mt-0.5">Track submission velocity over time.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trendData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C47FF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6C47FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="week" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F0B26', borderColor: '#1E293B', color: '#FFF' }}
                  itemStyle={{ color: '#6C47FF' }}
                />
                <Area type="monotone" dataKey="applications" stroke="#6C47FF" fillOpacity={1} fill="url(#colorApps)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department chart */}
        <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4 xl:col-span-2">
          <div>
            <h3 className="text-base font-bold text-white">Department Performance Metrics</h3>
            <p className="text-slate-500 text-[10px] mt-0.5">Comparison of active openings vs candidate yield.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deptHiresData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F0B26', borderColor: '#1E293B', color: '#FFF' }}
                  itemStyle={{ color: '#FFF' }}
                />
                <Legend />
                <Bar dataKey="activeJobs" fill="#3B82F6" name="Active Openings" radius={[8, 8, 0, 0]} />
                <Bar dataKey="applicants" fill="#6C47FF" name="Applicants Yield" radius={[8, 8, 0, 0]} />
                <Bar dataKey="hires" fill="#10B981" name="Successful Hires" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
