'use client';

import React, { useState } from 'react';

const backupHistory = [
  { id: 'SNAP-20260707-001', region: 'us-east-1', target: 'Full DB Cluster Snapshot', size: '1.24 TB', duration: '14m 22s', status: 'Completed', timestamp: 'Today, 04:00 AM', storage: 'S3 Standard-IA' },
  { id: 'SNAP-20260706-001', region: 'us-east-1', target: 'Full DB Cluster Snapshot', size: '1.23 TB', duration: '12m 45s', status: 'Completed', timestamp: 'Yesterday, 04:00 AM', storage: 'S3 Standard-IA' },
  { id: 'SNAP-20260705-001', region: 'us-east-1', target: 'Full DB Cluster Snapshot', size: '1.21 TB', duration: '15m 11s', status: 'Completed', timestamp: 'Jul 5, 2026', storage: 'S3 Standard-IA' },
  { id: 'SNAP-20260704-001', region: 'us-east-1', target: 'Full DB Cluster Snapshot', size: '1.20 TB', duration: '11m 58s', status: 'Completed', timestamp: 'Jul 4, 2026', storage: 'S3 Standard-IA' },
];

export default function BackupsPage() {
  const [retentionDays, setRetentionDays] = useState(30);

  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">System Backups</h1>
          <p className="text-sm text-white/40 mt-0.5">Automated database snaps, S3 archival storage, recovery verification loops</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
          Trigger Snapshot
        </button>
      </div>

      {/* Snapshot metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Backups Policy status', value: 'Active', sub: 'Daily snapshot schedule operational', color: 'text-emerald-400' },
          { label: 'Recovery Point (RPO)', value: '< 24 Hours', sub: 'Last snapshot completed 17h ago', color: 'text-white' },
          { label: 'Estimated Recovery (RTO)', value: '35 Minutes', sub: 'S3 parallel stream restoration latency', color: 'text-white' },
          { label: 'Total Snap Storage', value: '38.4 TB', sub: 'Calculated across Glacier/Standard', color: 'text-violet-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/25 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Backups Policy Settings */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.05]">
            <h2 className="text-sm font-semibold text-white">Daily Snapshots History</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {['Snapshot ID', 'Target / Cluster', 'Size', 'Execution Time', 'Storage Target', 'Status', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-white/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {backupHistory.map((snap, i) => (
                <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5 font-mono text-xs text-white/60">{snap.id}</td>
                  <td className="px-5 py-3.5 font-semibold text-white/80">{snap.target}</td>
                  <td className="px-5 py-3.5 text-xs text-white/65">{snap.size}</td>
                  <td className="px-5 py-3.5 text-xs text-white/40">{snap.timestamp} ({snap.duration})</td>
                  <td className="px-5 py-3.5 text-xs text-white/55 font-mono">{snap.storage}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold uppercase">{snap.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs text-violet-400 hover:text-violet-300">Restore</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Configuration rules */}
        <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">Archiving Policy</h2>
          <div>
            <label className="text-xs text-white/40 block mb-2">Active retention window: <span className="text-violet-400 font-bold">{retentionDays} days</span></label>
            <input
              type="range"
              min="7"
              max="90"
              value={retentionDays}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              className="w-full h-1 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
          </div>

          <div className="pt-2 space-y-3">
            {[
              { rule: 'Continuous Point-in-time recovery (PITR)', active: true, desc: 'Aurora transaction log tailing valid for 7 days' },
              { rule: 'Glacier Deep Archive strategy', active: true, desc: 'Migrate snapshots older than 30 days to S3 Glacier Deep' },
              { rule: 'Cross-Region replication loop', active: false, desc: 'Copy backup sets to eu-west-1 secondary bucket' },
            ].map((r, i) => (
              <div key={i} className="border border-white/[0.05] bg-white/[0.01] rounded-xl p-3 flex items-start gap-3 justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">{r.rule}</p>
                  <p className="text-[10px] text-white/35 mt-0.5">{r.desc}</p>
                </div>
                <span className={`w-2 h-2 rounded-full ${r.active ? 'bg-emerald-400 animate-pulse' : 'bg-white/10'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
