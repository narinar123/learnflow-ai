'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

export default function AnalyticsPage() {
  const { leads, students } = useCRM();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh] text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-xs font-semibold">Loading Charts & Graphs...</p>
        </div>
      </div>
    );
  }

  // 1. Data Preparation: Lead sources
  const sourceCountMap = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sourceData = Object.entries(sourceCountMap).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#6366F1', '#A855F7', '#10B981', '#F59E0B', '#3B82F6', '#F43F5E'];

  // 2. Data Preparation: Sales Stage Values
  const stageMap = leads.reduce((acc, lead) => {
    if (lead.status !== 'Lost') {
      acc[lead.status] = (acc[lead.status] || 0) + lead.value;
    }
    return acc;
  }, {} as Record<string, number>);

  const stageData = Object.entries(stageMap).map(([stage, value]) => ({
    stage,
    value: value / 1000 // In thousands
  }));

  // 3. Data Preparation: Signups over time (simulated registration velocity)
  const registrationData = [
    { month: 'Jan', signups: 120 },
    { month: 'Feb', signups: 180 },
    { month: 'Mar', signups: 240 },
    { month: 'Apr', signups: 310 },
    { month: 'May', signups: 420 },
    { month: 'Jun', signups: 580 },
    { month: 'Jul', signups: 690 + students.length } // Dynamic boost
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white font-display">Analytics Suite</h1>
        <p className="text-slate-400 text-xs mt-1">
          Perform cohort analysis, track conversion ratios, and evaluate sales performance charts.
        </p>
      </div>

      {/* Grid of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Lead Sources (Pie) */}
        <div className="bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Lead Acquisition Channels</h3>
          <div className="h-64 flex items-center justify-center">
            {sourceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0D1222', borderColor: '#1E293B', borderRadius: '12px' }}
                    itemStyle={{ color: '#F1F5F9', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-slate-500">No lead sources available.</p>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-[10px] text-slate-400">
            {sourceData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Pipeline Deal Weight (Bar) */}
        <div className="bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Pipeline Weighted Value (in ₹k)</h3>
          <div className="h-64">
            {stageData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stageData}>
                  <XAxis dataKey="stage" stroke="#64748B" fontSize={9} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={9} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0D1222', borderColor: '#1E293B', borderRadius: '12px' }}
                    itemStyle={{ color: '#6366F1', fontSize: '11px' }}
                  />
                  <Bar dataKey="value" fill="#6366F1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-slate-500 py-12 text-center">No stage details available.</p>
            )}
          </div>
        </div>

        {/* Chart 3: Registration Velocity (Line) */}
        <div className="bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5 space-y-4 lg:col-span-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Registration Volume Velocity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationData}>
                <XAxis dataKey="month" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1222', borderColor: '#1E293B', borderRadius: '12px' }}
                  itemStyle={{ color: '#A855F7', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="signups" stroke="#A855F7" strokeWidth={3} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
