'use client';

import React, { useState } from 'react';

const licenses = [
  { id: 'LIC-2024-001', org: 'TechCorp Global', type: 'Enterprise Suite', seats: 20000, used: 12400, issued: '2024-01-15', expires: '2027-01-15', status: 'Active', features: ['AI Tutor', 'Analytics Pro', 'White-label', 'API Access', 'SSO'], key: 'LFAI-ENT-7X4K-2024-TECH', daysLeft: 557, country: '🇺🇸' },
  { id: 'LIC-2024-002', org: 'EduMatrix Ltd', type: 'Professional', seats: 5000, used: 3820, issued: '2024-03-22', expires: '2026-09-22', status: 'Active', features: ['AI Tutor', 'SSO', 'Custom Domain'], key: 'LFAI-PRO-9M2L-2024-EDU', daysLeft: 77, country: '🇬🇧' },
  { id: 'LIC-2023-003', org: 'SkillBridge Inc', type: 'Enterprise Suite', seats: 15000, used: 9100, issued: '2023-11-08', expires: '2026-11-08', status: 'Active', features: ['AI Tutor', 'Analytics Pro', 'API Access', 'SSO'], key: 'LFAI-ENT-4R8P-2023-SKB', daysLeft: 124, country: '🇨🇦' },
  { id: 'LIC-2025-004', org: 'LearnHub Africa', type: 'Starter', seats: 1000, used: 820, issued: '2025-02-14', expires: '2026-07-14', status: 'Expired', features: ['Basic AI'], key: 'LFAI-STR-2X6N-2025-LHA', daysLeft: -7, country: '🇳🇬' },
  { id: 'LIC-2026-005', org: 'MindForge EU', type: 'Enterprise Suite', seats: 25000, used: 15200, issued: '2023-07-20', expires: '2028-07-20', status: 'Active', features: ['AI Tutor', 'Analytics Pro', 'White-label', 'API Access', 'SSO', 'Dedicated Infra'], key: 'LFAI-ENT-1Q9W-2023-MFG', daysLeft: 744, country: '🇳🇱' },
];

export default function LicensesPage() {
  const [selected, setSelected] = useState<typeof licenses[0] | null>(null);
  const [showIssue, setShowIssue] = useState(false);

  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">License Management</h1>
          <p className="text-sm text-white/40 mt-0.5">Issue, revoke, and track software licenses across all tenants</p>
        </div>
        <button onClick={() => setShowIssue(true)} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Issue License
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Total Licenses', value: '247', color: 'text-white' },
          { label: 'Active', value: '228', color: 'text-emerald-400' },
          { label: 'Expiring (30d)', value: '18', color: 'text-amber-400' },
          { label: 'Expired', value: '11', color: 'text-red-400' },
          { label: 'Total Seats', value: '2.1M', color: 'text-violet-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-xl p-4">
            <p className="text-xs text-white/40">{s.label}</p>
            <p className={`text-xl font-bold mt-0.5 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Expiry timeline */}
      <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-white mb-4">License Expiry Timeline</h2>
        <div className="flex items-end gap-2 h-16">
          {[
            { label: 'Jul', count: 3, max: 10 },
            { label: 'Aug', count: 7, max: 10 },
            { label: 'Sep', count: 2, max: 10 },
            { label: 'Oct', count: 5, max: 10 },
            { label: 'Nov', count: 1, max: 10 },
            { label: 'Dec', count: 4, max: 10 },
            { label: 'Jan', count: 9, max: 10 },
            { label: 'Feb', count: 6, max: 10 },
          ].map((m) => (
            <div key={m.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col justify-end" style={{ height: '48px' }}>
                <div
                  className={`w-full rounded-t-lg transition-all ${m.count >= 7 ? 'bg-red-500/60' : m.count >= 4 ? 'bg-amber-500/60' : 'bg-violet-500/40'}`}
                  style={{ height: `${(m.count / m.max) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-white/30">{m.label}</span>
              <span className="text-[10px] text-white/50 font-bold">{m.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Licenses table */}
      <div className="grid grid-cols-5 gap-5">
        <div className={`${selected ? 'col-span-3' : 'col-span-5'} bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden transition-all`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {['Organization', 'Type', 'Seats', 'Expires', 'Days Left', 'Status'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-white/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {licenses.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => setSelected(selected?.id === l.id ? null : l)}
                  className={`border-b border-white/[0.03] cursor-pointer transition-colors ${
                    selected?.id === l.id ? 'bg-violet-500/10' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span>{l.country}</span>
                      <div>
                        <p className="font-medium text-white/85 text-sm">{l.org}</p>
                        <p className="text-[10px] font-mono text-white/25">{l.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      l.type === 'Enterprise Suite' ? 'bg-violet-500/15 text-violet-300' :
                      l.type === 'Professional' ? 'bg-blue-500/15 text-blue-300' : 'bg-slate-500/15 text-slate-400'
                    }`}>{l.type}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-white/70">{l.used.toLocaleString()} / {l.seats.toLocaleString()}</p>
                    <div className="w-20 h-1 bg-white/[0.07] rounded-full mt-1">
                      <div className={`h-full rounded-full ${l.used / l.seats > 0.85 ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style={{ width: `${(l.used / l.seats) * 100}%` }} />
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-white/50 text-xs">{l.expires}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-bold ${l.daysLeft < 0 ? 'text-red-400' : l.daysLeft < 90 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {l.daysLeft < 0 ? `${Math.abs(l.daysLeft)}d overdue` : `${l.daysLeft}d`}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      l.status === 'Active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                    }`}>{l.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="col-span-2 bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">License Details</h3>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="bg-white/[0.03] rounded-xl p-4">
              <p className="text-[10px] text-white/30 mb-1 uppercase tracking-wide">License Key</p>
              <p className="font-mono text-xs text-violet-300 break-all">{selected.key}</p>
            </div>

            <div className="space-y-2.5">
              {[
                { label: 'Organization', value: selected.org },
                { label: 'License ID', value: selected.id },
                { label: 'Type', value: selected.type },
                { label: 'Issued', value: selected.issued },
                { label: 'Expires', value: selected.expires },
                { label: 'Seats', value: `${selected.used.toLocaleString()} / ${selected.seats.toLocaleString()} used` },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-xs py-2 border-b border-white/[0.04]">
                  <span className="text-white/40">{row.label}</span>
                  <span className="text-white/70 font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs text-white/30 mb-2 uppercase tracking-wide">Enabled Features</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.features.map((f) => (
                  <span key={f} className="text-[11px] px-2 py-1 bg-violet-500/10 text-violet-300 rounded-lg">{f}</span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button className="w-full py-2 text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all">Renew License</button>
              <button className="w-full py-2 text-xs font-medium bg-white/[0.05] text-white/60 rounded-xl hover:bg-white/[0.09] transition-all">Add Seats</button>
              <button className="w-full py-2 text-xs font-medium bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all">Revoke License</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
