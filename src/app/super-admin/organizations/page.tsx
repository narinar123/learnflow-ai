'use client';

import React, { useState } from 'react';

const orgs = [
  { id: 'ORG-001', name: 'TechCorp Global', domain: 'techcorp.com', plan: 'Enterprise', users: 12400, admins: 24, status: 'Active', mrr: 8200, created: '2024-01-15', country: '🇺🇸', region: 'us-east-1', storage: '2.4 TB', aiCalls: '1.2M' },
  { id: 'ORG-002', name: 'EduMatrix Ltd', domain: 'edumatrix.io', plan: 'Professional', users: 3820, admins: 8, status: 'Active', mrr: 2100, created: '2024-03-22', country: '🇬🇧', region: 'eu-west-1', storage: '680 GB', aiCalls: '340K' },
  { id: 'ORG-003', name: 'SkillBridge Inc', domain: 'skillbridge.co', plan: 'Enterprise', users: 9100, admins: 18, status: 'Active', mrr: 6500, created: '2023-11-08', country: '🇨🇦', region: 'us-east-1', storage: '1.8 TB', aiCalls: '890K' },
  { id: 'ORG-004', name: 'LearnHub Africa', domain: 'learnhub.ng', plan: 'Starter', users: 820, admins: 3, status: 'Suspended', mrr: 490, created: '2025-02-14', country: '🇳🇬', region: 'eu-west-2', storage: '92 GB', aiCalls: '48K' },
  { id: 'ORG-005', name: 'Cognify AI', domain: 'cognify.ai', plan: 'Professional', users: 2300, admins: 5, status: 'Trial', mrr: 0, created: '2026-06-30', country: '🇩🇪', region: 'eu-central-1', storage: '210 GB', aiCalls: '98K' },
  { id: 'ORG-006', name: 'MindForge EU', domain: 'mindforge.eu', plan: 'Enterprise', users: 15200, admins: 31, status: 'Active', mrr: 11400, created: '2023-07-20', country: '🇳🇱', region: 'eu-west-1', storage: '3.1 TB', aiCalls: '2.1M' },
  { id: 'ORG-007', name: 'AcademyX APAC', domain: 'academyx.sg', plan: 'Professional', users: 5600, admins: 12, status: 'Active', mrr: 3200, created: '2024-09-01', country: '🇸🇬', region: 'ap-southeast-1', storage: '980 GB', aiCalls: '620K' },
  { id: 'ORG-008', name: 'FutureLearn Pro', domain: 'futurelearn.pro', plan: 'Enterprise', users: 21300, admins: 44, status: 'Active', mrr: 14800, created: '2023-04-12', country: '🇦🇺', region: 'ap-southeast-2', storage: '4.2 TB', aiCalls: '3.4M' },
];

const planColors: Record<string, string> = {
  Enterprise: 'bg-violet-500/15 text-violet-300',
  Professional: 'bg-blue-500/15 text-blue-300',
  Starter: 'bg-slate-500/15 text-slate-300',
};
const statusColors: Record<string, string> = {
  Active: 'bg-emerald-500/15 text-emerald-400',
  Suspended: 'bg-red-500/15 text-red-400',
  Trial: 'bg-amber-500/15 text-amber-400',
};

export default function OrganizationsPage() {
  const [search, setSearch] = useState('');
  const [plan, setPlan] = useState('all');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const filtered = orgs.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch = !q || o.name.toLowerCase().includes(q) || o.domain.toLowerCase().includes(q);
    const matchPlan = plan === 'all' || o.plan === plan;
    const matchStatus = status === 'all' || o.status === status;
    return matchSearch && matchPlan && matchStatus;
  });

  const selectedOrg = orgs.find((o) => o.id === selected);

  return (
    <div className="flex h-full bg-[#080C14]">
      {/* Left panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Organizations</h1>
              <p className="text-sm text-white/40 mt-0.5">Manage all registered tenant organizations</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              New Organization
            </button>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Total', value: '247', color: 'text-white' },
              { label: 'Enterprise', value: '62', color: 'text-violet-400' },
              { label: 'Professional', value: '118', color: 'text-blue-400' },
              { label: 'Suspended', value: '11', color: 'text-red-400' },
            ].map((s) => (
              <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-xl p-3">
                <p className="text-xs text-white/40">{s.label}</p>
                <p className={`text-xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search organizations..."
                className="w-full bg-[#0D1117] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all"
              />
            </div>
            {['all', 'Enterprise', 'Professional', 'Starter'].map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  plan === p ? 'bg-violet-500 text-white' : 'bg-white/[0.05] text-white/50 hover:text-white'
                }`}
              >
                {p === 'all' ? 'All Plans' : p}
              </button>
            ))}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-[#0D1117] border border-white/[0.08] text-white/60 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-violet-500/50"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Trial">Trial</option>
            </select>
          </div>

          {/* Table */}
          <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {['Organization', 'Plan', 'Users', 'MRR', 'Region', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-white/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((org) => (
                  <tr
                    key={org.id}
                    onClick={() => setSelected(org.id === selected ? null : org.id)}
                    className={`border-b border-white/[0.03] cursor-pointer transition-colors ${
                      selected === org.id ? 'bg-violet-500/10' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span>{org.country}</span>
                        <div>
                          <p className="font-medium text-white/90 text-sm">{org.name}</p>
                          <p className="text-[11px] text-white/35">{org.domain}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${planColors[org.plan]}`}>{org.plan}</span></td>
                    <td className="px-4 py-3 text-white/60 text-sm">{org.users.toLocaleString()}</td>
                    <td className="px-4 py-3 text-emerald-400 font-semibold text-sm">${org.mrr.toLocaleString()}</td>
                    <td className="px-4 py-3 text-white/40 text-xs font-mono">{org.region}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[org.status]}`}>{org.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-all" title="View">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                        <button className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-all" title="Edit">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Suspend">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selectedOrg && (
        <div className="w-80 border-l border-white/[0.06] bg-[#0D1117] flex flex-col overflow-y-auto">
          <div className="p-5 border-b border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/30 font-mono">{selectedOrg.id}</span>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/30 to-indigo-500/30 border border-violet-500/20 flex items-center justify-center text-2xl">
                {selectedOrg.country}
              </div>
              <div>
                <p className="font-bold text-white">{selectedOrg.name}</p>
                <p className="text-xs text-white/40">{selectedOrg.domain}</p>
              </div>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Users', value: selectedOrg.users.toLocaleString() },
                { label: 'Admins', value: selectedOrg.admins },
                { label: 'Storage', value: selectedOrg.storage },
                { label: 'AI Calls', value: selectedOrg.aiCalls },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.03] rounded-xl p-3">
                  <p className="text-[10px] text-white/30 uppercase">{s.label}</p>
                  <p className="text-sm font-semibold text-white/80 mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Plan', value: selectedOrg.plan },
                { label: 'Status', value: selectedOrg.status },
                { label: 'MRR', value: `$${selectedOrg.mrr.toLocaleString()}` },
                { label: 'Region', value: selectedOrg.region },
                { label: 'Created', value: selectedOrg.created },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm py-2 border-b border-white/[0.04]">
                  <span className="text-white/40">{row.label}</span>
                  <span className="text-white/80 font-medium">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-1">
              <button className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all">Manage Organization</button>
              <button className="w-full py-2 bg-white/[0.05] hover:bg-white/[0.09] text-white/70 text-sm font-medium rounded-xl transition-all">Impersonate Admin</button>
              <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-xl transition-all">Suspend Tenant</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
