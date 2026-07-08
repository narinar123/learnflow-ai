'use client';

import React, { useState } from 'react';

const tenants = [
  { id: 'T-001', org: 'TechCorp Global', subdomain: 'techcorp.learnflow.ai', dbSchema: 'tenant_techcorp', region: 'us-east-1', isolated: true, tier: 'Enterprise', users: 12400, maxUsers: 20000, storage: '2.4 TB', maxStorage: '5 TB', apiRpm: 4200, maxRpm: 10000, status: 'Running', health: 98, version: 'v3.2.1', lastDeploy: '2h ago' },
  { id: 'T-002', org: 'EduMatrix Ltd', subdomain: 'edumatrix.learnflow.ai', dbSchema: 'tenant_edumatrix', region: 'eu-west-1', isolated: false, tier: 'Professional', users: 3820, maxUsers: 5000, storage: '680 GB', maxStorage: '1 TB', apiRpm: 980, maxRpm: 3000, status: 'Running', health: 100, version: 'v3.2.1', lastDeploy: '6h ago' },
  { id: 'T-003', org: 'SkillBridge Inc', subdomain: 'skillbridge.learnflow.ai', dbSchema: 'tenant_skillbridge', region: 'us-east-1', isolated: true, tier: 'Enterprise', users: 9100, maxUsers: 15000, storage: '1.8 TB', maxStorage: '3 TB', apiRpm: 3100, maxRpm: 8000, status: 'Running', health: 97, version: 'v3.1.9', lastDeploy: '1d ago' },
  { id: 'T-004', org: 'LearnHub Africa', subdomain: 'learnhub.learnflow.ai', dbSchema: 'tenant_learnhub', region: 'eu-west-2', isolated: false, tier: 'Starter', users: 820, maxUsers: 1000, storage: '92 GB', maxStorage: '100 GB', apiRpm: 120, maxRpm: 500, status: 'Suspended', health: 0, version: 'v3.1.8', lastDeploy: '5d ago' },
  { id: 'T-005', org: 'MindForge EU', subdomain: 'mindforge.learnflow.ai', dbSchema: 'tenant_mindforge', region: 'eu-west-1', isolated: true, tier: 'Enterprise', users: 15200, maxUsers: 25000, storage: '3.1 TB', maxStorage: '10 TB', apiRpm: 6800, maxRpm: 15000, status: 'Running', health: 99, version: 'v3.2.1', lastDeploy: '3h ago' },
];

function ProgressBar({ value, max, color = 'bg-violet-500' }: { value: number; max: number; color?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  const warn = pct > 85;
  return (
    <div className="w-full h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all ${warn ? 'bg-red-500' : color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function TenantsPage() {
  const [selected, setSelected] = useState<typeof tenants[0] | null>(null);
  const [tab, setTab] = useState<'overview' | 'config' | 'resources'>('overview');

  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tenant Management</h1>
          <p className="text-sm text-white/40 mt-0.5">Per-tenant isolation, resources, deployment status</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 text-sm bg-white/[0.05] text-white/60 rounded-xl hover:bg-white/[0.09] transition-all flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Monitor All
          </button>
          <button className="px-3 py-2 text-sm bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Provision Tenant
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Total Tenants', value: '247', sub: 'across 4 regions', color: 'text-white' },
          { label: 'Isolated', value: '62', sub: 'dedicated DB+infra', color: 'text-violet-400' },
          { label: 'Shared Pool', value: '185', sub: 'multi-tenant pool', color: 'text-blue-400' },
          { label: 'Suspended', value: '11', sub: 'pending review', color: 'text-red-400' },
          { label: 'Avg Health', value: '98.4%', sub: 'all running tenants', color: 'text-emerald-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-xl p-4">
            <p className="text-xs text-white/40">{s.label}</p>
            <p className={`text-xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-white/25 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tenant cards */}
      <div className="grid grid-cols-1 gap-3">
        {tenants.map((t) => (
          <div
            key={t.id}
            onClick={() => setSelected(selected?.id === t.id ? null : t)}
            className={`bg-[#0D1117] border rounded-2xl p-5 cursor-pointer transition-all ${
              selected?.id === t.id ? 'border-violet-500/40 bg-violet-500/5' : 'border-white/[0.06] hover:border-white/10'
            }`}
          >
            <div className="flex items-start gap-5">
              {/* Identity */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    t.status === 'Running' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                  }`}>{t.status}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    t.isolated ? 'bg-violet-500/15 text-violet-300' : 'bg-slate-500/15 text-slate-400'
                  }`}>{t.isolated ? '🔒 Isolated' : '🏊 Shared Pool'}</span>
                  <span className="text-[10px] font-mono text-white/20">{t.id}</span>
                </div>
                <p className="font-semibold text-white">{t.org}</p>
                <p className="text-xs font-mono text-white/35 mt-0.5">{t.subdomain}</p>
              </div>

              {/* Resources */}
              <div className="grid grid-cols-3 gap-6 flex-shrink-0">
                {/* Users */}
                <div className="w-32">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-white/40">Users</span>
                    <span className="text-white/70 font-mono">{t.users.toLocaleString()} / {(t.maxUsers / 1000).toFixed(0)}K</span>
                  </div>
                  <ProgressBar value={t.users} max={t.maxUsers} color="bg-blue-500" />
                </div>
                {/* API */}
                <div className="w-32">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-white/40">API RPM</span>
                    <span className="text-white/70 font-mono">{t.apiRpm.toLocaleString()} / {(t.maxRpm / 1000).toFixed(0)}K</span>
                  </div>
                  <ProgressBar value={t.apiRpm} max={t.maxRpm} color="bg-violet-500" />
                </div>
                {/* Storage */}
                <div className="w-32">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-white/40">Storage</span>
                    <span className="text-white/70 font-mono">{t.storage}</span>
                  </div>
                  <ProgressBar value={parseFloat(t.storage)} max={parseFloat(t.maxStorage)} color="bg-emerald-500" />
                </div>
              </div>

              {/* Health + meta */}
              <div className="text-right flex-shrink-0 w-28">
                <div className={`text-2xl font-bold ${t.health >= 99 ? 'text-emerald-400' : t.health > 95 ? 'text-amber-400' : 'text-red-400'}`}>
                  {t.health}%
                </div>
                <p className="text-[11px] text-white/30 mt-0.5">Health score</p>
                <p className="text-[10px] text-white/20 mt-2">v{t.version}</p>
                <p className="text-[10px] text-white/20">deployed {t.lastDeploy}</p>
              </div>
            </div>

            {/* Expanded */}
            {selected?.id === t.id && (
              <div className="mt-5 pt-5 border-t border-white/[0.06]">
                <div className="flex gap-2 mb-4">
                  {(['overview', 'config', 'resources'] as const).map((tb) => (
                    <button
                      key={tb}
                      onClick={(e) => { e.stopPropagation(); setTab(tb); }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${
                        tab === tb ? 'bg-violet-500 text-white' : 'bg-white/[0.05] text-white/50 hover:text-white'
                      }`}
                    >
                      {tb}
                    </button>
                  ))}
                  <div className="ml-auto flex gap-2">
                    <button className="px-3 py-1.5 text-xs bg-white/[0.05] text-white/60 rounded-lg hover:bg-white/[0.09] transition-all">Restart</button>
                    <button className="px-3 py-1.5 text-xs bg-white/[0.05] text-white/60 rounded-lg hover:bg-white/[0.09] transition-all">SSH Access</button>
                    <button className="px-3 py-1.5 text-xs bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20 transition-all">Force Migrate</button>
                    <button className="px-3 py-1.5 text-xs bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all">Suspend</button>
                  </div>
                </div>

                {tab === 'overview' && (
                  <div className="grid grid-cols-6 gap-3">
                    {[
                      { label: 'DB Schema', value: t.dbSchema },
                      { label: 'Region', value: t.region },
                      { label: 'Isolation', value: t.isolated ? 'Dedicated' : 'Shared' },
                      { label: 'Tier', value: t.tier },
                      { label: 'Version', value: `v${t.version}` },
                      { label: 'Last Deploy', value: t.lastDeploy },
                    ].map((row) => (
                      <div key={row.label} className="bg-white/[0.03] rounded-xl p-3">
                        <p className="text-[10px] text-white/30 uppercase tracking-wide">{row.label}</p>
                        <p className="text-xs font-mono text-white/70 mt-1 truncate">{row.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {tab === 'config' && (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'SSO_ENABLED', val: 'true' },
                      { key: 'MFA_REQUIRED', val: 'false' },
                      { key: 'AI_QUOTA_DAILY', val: '50000' },
                      { key: 'STORAGE_LIMIT', val: t.maxStorage },
                      { key: 'USER_LIMIT', val: t.maxUsers.toString() },
                      { key: 'CUSTOM_DOMAIN', val: 'enabled' },
                    ].map((c) => (
                      <div key={c.key} className="flex items-center justify-between bg-white/[0.03] rounded-xl p-3">
                        <span className="text-xs font-mono text-white/40">{c.key}</span>
                        <span className="text-xs font-mono text-emerald-400">{c.val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {tab === 'resources' && (
                  <div className="space-y-3">
                    {[
                      { label: 'CPU Usage', value: 42, color: 'bg-blue-500' },
                      { label: 'Memory', value: 67, color: 'bg-violet-500' },
                      { label: 'DB Connections', value: 31, color: 'bg-emerald-500' },
                      { label: 'Cache Hit Rate', value: 94, color: 'bg-amber-500', inverse: true },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center gap-4">
                        <span className="w-32 text-xs text-white/50">{r.label}</span>
                        <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                          <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.value}%` }} />
                        </div>
                        <span className="text-xs font-mono text-white/60 w-10 text-right">{r.value}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
