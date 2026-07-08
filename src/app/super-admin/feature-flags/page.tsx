'use client';

import React, { useState } from 'react';

const mockFlags = [
  { id: 'FLAG-01', key: 'ai-tutor-v2', description: 'Enable advanced multi-modal learning tutor agent interactions', rollOut: 30, rules: 'Plan matches Enterprise', status: 'Active', updated: '2h ago' },
  { id: 'FLAG-02', key: 'global-reports-mrr', description: 'Enable MRR prediction modeling dashboard views', rollOut: 100, rules: 'Super admin role required', status: 'Active', updated: '1d ago' },
  { id: 'FLAG-03', key: 'cohort-auto-sync', description: 'Automated Canvas / Moodle LMS background sync processing', rollOut: 0, rules: 'None', status: 'Paused', updated: '5d ago' },
  { id: 'FLAG-04', key: 'custom-smtp-gateway', description: 'Allow tenants to define external email SMTP relay servers', rollOut: 50, rules: 'Plan matches Professional | Enterprise', status: 'Active', updated: '1w ago' },
];

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState(mockFlags);

  const toggleFlag = (id: string) => {
    setFlags(flags.map(f => {
      if (f.id === id) {
        const nextStatus = f.status === 'Active' ? 'Paused' : 'Active';
        return { ...f, status: nextStatus, rollOut: nextStatus === 'Active' ? 100 : 0 };
      }
      return f;
    }));
  };

  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Feature Flags</h1>
          <p className="text-sm text-white/40 mt-0.5">Toggle new system modules, canary rollout thresholds, and tenant scope rule matching</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Create Feature Flag
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active Flags', value: '18 Flags', sub: 'Active evaluation in logic', color: 'text-white' },
          { label: 'Canary Rollouts active', value: '3 Modules', sub: 'Targeted percent rules active', color: 'text-violet-400' },
          { label: 'Client evaluations today', value: '42.8 Million', sub: 'Avg response speed: <1.2ms', color: 'text-emerald-400' },
          { label: 'Targeting rules compiled', value: '12 Rules', sub: 'SQL criteria matching valid', color: 'text-blue-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/25 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Feature Flags table */}
      <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <h2 className="text-sm font-semibold text-white">System Feature Flag Scope</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {['Flag Key', 'Description', 'Rollout State', 'Targeting Logic Criteria', 'State', 'Last Evaluated', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium text-white/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flags.map((flag) => (
              <tr key={flag.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                <td className="px-5 py-3.5">
                  <div>
                    <span className="font-mono text-xs text-violet-300 font-bold">{flag.key}</span>
                    <p className="text-[10px] text-white/20 font-mono mt-0.5">{flag.id}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-white/60 max-w-xs">{flag.description}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/70 font-mono w-8">{flag.rollOut}%</span>
                    <div className="w-16 h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${flag.rollOut}%` }} />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-white/50 font-mono">{flag.rules}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    flag.status === 'Active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-white/30'
                  }`}>{flag.status}</span>
                </td>
                <td className="px-5 py-3.5 text-xs text-white/30">{flag.updated}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleFlag(flag.id)}
                      className={`text-xs px-2 py-1 rounded transition-all ${
                        flag.status === 'Active' ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      }`}
                    >
                      {flag.status === 'Active' ? 'Pause' : 'Activate'}
                    </button>
                    <button className="text-xs text-white/30 hover:text-white">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
