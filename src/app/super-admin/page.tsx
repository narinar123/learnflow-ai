'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/* ── Shared primitives ─────────────────────────────────── */
const StatCard = ({
  label, value, delta, deltaUp, icon, color,
}: {
  label: string; value: string; delta: string; deltaUp: boolean;
  icon: React.ReactNode; color: string;
}) => (
  <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5 flex flex-col gap-4 hover:border-white/10 transition-colors">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{label}</span>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
    </div>
    <div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className={`text-xs mt-1 flex items-center gap-1 ${deltaUp ? 'text-emerald-400' : 'text-red-400'}`}>
        {deltaUp ? '▲' : '▼'} {delta} vs last month
      </p>
    </div>
  </div>
);

const tenantAlerts = [
  { id: 1, org: 'TechCorp Global', type: 'Quota Exceeded', level: 'critical', time: '2m ago' },
  { id: 2, org: 'EduMatrix Ltd', type: 'Payment Failed', level: 'warning', time: '14m ago' },
  { id: 3, org: 'SkillBridge Inc', type: 'API Rate Limit', level: 'warning', time: '31m ago' },
  { id: 4, org: 'LearnHub Africa', type: 'License Expired', level: 'critical', time: '1h ago' },
  { id: 5, org: 'Cognify AI', type: 'Signup Spike +340%', level: 'info', time: '2h ago' },
];

const recentTenants = [
  { name: 'TechCorp Global', plan: 'Enterprise', users: '12,400', status: 'Active', mrr: '$8,200', country: '🇺🇸' },
  { name: 'EduMatrix Ltd', plan: 'Professional', users: '3,820', status: 'Active', mrr: '$2,100', country: '🇬🇧' },
  { name: 'SkillBridge Inc', plan: 'Enterprise', users: '9,100', status: 'Active', mrr: '$6,500', country: '🇨🇦' },
  { name: 'LearnHub Africa', plan: 'Starter', users: '820', status: 'Suspended', mrr: '$490', country: '🇳🇬' },
  { name: 'Cognify AI', plan: 'Professional', users: '2,300', status: 'Trial', mrr: '$0', country: '🇩🇪' },
  { name: 'MindForge EU', plan: 'Enterprise', users: '15,200', status: 'Active', mrr: '$11,400', country: '🇳🇱' },
];

const systemServices = [
  { name: 'API Gateway', status: 'healthy', latency: '12ms', uptime: '99.99%' },
  { name: 'Auth Service', status: 'healthy', latency: '8ms', uptime: '100%' },
  { name: 'AI Engine', status: 'healthy', latency: '340ms', uptime: '99.95%' },
  { name: 'Database Cluster', status: 'degraded', latency: '95ms', uptime: '99.82%' },
  { name: 'CDN Edge', status: 'healthy', latency: '4ms', uptime: '100%' },
  { name: 'Job Queue', status: 'healthy', latency: '22ms', uptime: '99.97%' },
];

const activityFeed = [
  { action: 'New tenant onboarded', detail: 'Cognify AI joined on Enterprise Trial', time: '5m', type: 'success' },
  { action: 'Subscription upgraded', detail: 'SkillBridge Inc → Enterprise Plus', time: '22m', type: 'info' },
  { action: 'Security alert', detail: 'Unusual login pattern detected — TechCorp', time: '45m', type: 'warning' },
  { action: 'Backup completed', detail: 'Full snapshot saved — us-east-1', time: '1h', type: 'success' },
  { action: 'License expired', detail: 'LearnHub Africa — 5 seats lapsed', time: '2h', type: 'error' },
  { action: 'Feature flag enabled', detail: 'AI Tutor v2 → rolled to 30% tenants', time: '3h', type: 'info' },
];

export default function SuperAdminDashboard() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="p-6 space-y-6 min-h-full bg-[#080C14]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Dashboard</h1>
          <p className="text-sm text-white/40 mt-0.5">Full platform overview across all tenants · July 7, 2026</p>
        </div>
        <div className="flex items-center gap-2">
          {['24h', '7d', '30d', '90d'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                timeRange === r
                  ? 'bg-violet-500 text-white'
                  : 'bg-white/[0.05] text-white/50 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {r}
            </button>
          ))}
          <button className="ml-2 px-3 py-1.5 text-xs font-medium bg-white/[0.05] text-white/70 rounded-lg hover:bg-white/[0.09] transition-all flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Tenants"
          value="247"
          delta="+18 (7.8%)"
          deltaUp
          color="bg-violet-500/10 text-violet-400"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
        />
        <StatCard
          label="Monthly Revenue"
          value="$342K"
          delta="+$28K (8.9%)"
          deltaUp
          color="bg-emerald-500/10 text-emerald-400"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
        />
        <StatCard
          label="Active Users"
          value="1.84M"
          delta="+104K (6.0%)"
          deltaUp
          color="bg-blue-500/10 text-blue-400"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        />
        <StatCard
          label="System Uptime"
          value="99.97%"
          delta="+0.02%"
          deltaUp
          color="bg-amber-500/10 text-amber-400"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
        />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'AI Requests Today', value: '4.2M', sub: '↑ 340K from yesterday', color: 'text-violet-400' },
          { label: 'Active Trials', value: '34', sub: '12 expiring this week', color: 'text-amber-400' },
          { label: 'Avg Response Time', value: '43ms', sub: 'Target: <100ms ✓', color: 'text-emerald-400' },
          { label: 'Open Alerts', value: '7', sub: '2 critical, 5 warning', color: 'text-red-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-xl p-4">
            <p className="text-xs text-white/40 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-5">
        {/* Tenant Table */}
        <div className="col-span-2 bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
            <h2 className="text-sm font-semibold text-white">Top Tenants</h2>
            <Link href="/super-admin/tenants" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">View all →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {['Organization', 'Plan', 'Users', 'MRR', 'Status'].map((h) => (
                    <th key={h} className="text-left px-5 py-2.5 text-xs font-medium text-white/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentTenants.map((t, i) => (
                  <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{t.country}</span>
                        <span className="font-medium text-white/80">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        t.plan === 'Enterprise' ? 'bg-violet-500/15 text-violet-300' :
                        t.plan === 'Professional' ? 'bg-blue-500/15 text-blue-300' :
                        'bg-white/5 text-white/50'
                      }`}>{t.plan}</span>
                    </td>
                    <td className="px-5 py-3 text-white/60">{t.users}</td>
                    <td className="px-5 py-3 text-emerald-400 font-medium">{t.mrr}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        t.status === 'Active' ? 'bg-emerald-500/15 text-emerald-400' :
                        t.status === 'Suspended' ? 'bg-red-500/15 text-red-400' :
                        'bg-amber-500/15 text-amber-400'
                      }`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alert feed */}
        <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
            <h2 className="text-sm font-semibold text-white">Active Alerts</h2>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">7 open</span>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {tenantAlerts.map((a) => (
              <div key={a.id} className="px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start gap-2.5">
                  <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                    a.level === 'critical' ? 'bg-red-500 animate-pulse' :
                    a.level === 'warning' ? 'bg-amber-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/80">{a.type}</p>
                    <p className="text-xs text-white/40 mt-0.5 truncate">{a.org}</p>
                  </div>
                  <span className="text-[10px] text-white/30 flex-shrink-0">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-white/[0.04]">
            <Link href="/super-admin/monitoring" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">View monitoring →</Link>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-5">
        {/* System services */}
        <div className="col-span-1 bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
            <h2 className="text-sm font-semibold text-white">System Services</h2>
            <Link href="/super-admin/system-health" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Health →</Link>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {systemServices.map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  s.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white/80">{s.name}</p>
                  <p className="text-[10px] text-white/30">{s.uptime} uptime</p>
                </div>
                <span className={`text-xs font-mono ${
                  s.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400'
                }`}>{s.latency}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="col-span-2 bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
            <h2 className="text-sm font-semibold text-white">Activity Feed</h2>
            <Link href="/super-admin/logs" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">All logs →</Link>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {activityFeed.map((a, i) => (
              <div key={i} className="flex items-start gap-3.5 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  a.type === 'success' ? 'bg-emerald-400' :
                  a.type === 'warning' ? 'bg-amber-400' :
                  a.type === 'error' ? 'bg-red-400' :
                  'bg-blue-400'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white/80">{a.action}</p>
                  <p className="text-xs text-white/40 mt-0.5">{a.detail}</p>
                </div>
                <span className="text-[11px] text-white/30 flex-shrink-0">{a.time} ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue bands */}
      <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-white">MRR by Plan Tier</h2>
          <Link href="/super-admin/billing" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Billing details →</Link>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Enterprise', value: 238400, total: 342000, color: 'bg-violet-500', count: '62 orgs' },
            { label: 'Professional', value: 78600, total: 342000, color: 'bg-blue-500', count: '118 orgs' },
            { label: 'Starter', value: 25000, total: 342000, color: 'bg-emerald-500', count: '67 orgs' },
          ].map((tier) => (
            <div key={tier.label} className="flex items-center gap-4">
              <div className="w-28 flex-shrink-0">
                <p className="text-xs font-medium text-white/70">{tier.label}</p>
                <p className="text-[10px] text-white/30">{tier.count}</p>
              </div>
              <div className="flex-1 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className={`h-full ${tier.color} rounded-full`}
                  style={{ width: `${(tier.value / tier.total) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-white/80 w-20 text-right">
                ${(tier.value / 1000).toFixed(0)}K
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
