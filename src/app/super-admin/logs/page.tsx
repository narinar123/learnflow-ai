'use client';

import React, { useState } from 'react';

const mockLogs = [
  { timestamp: '2026-07-07T21:18:14.992Z', level: 'INFO', tenant: 'T-001', service: 'auth-service', message: 'User verification completed successfully for token hash _a7f1...' },
  { timestamp: '2026-07-07T21:18:12.441Z', level: 'WARN', tenant: 'T-003', service: 'db-pool', message: 'Connection acquisition time exceeded warning threshold (95ms)' },
  { timestamp: '2026-07-07T21:18:10.120Z', level: 'ERROR', tenant: 'T-004', service: 'billing-engine', message: 'Dunning auto-retry failed to invoke payment validation webhook' },
  { timestamp: '2026-07-07T21:18:08.552Z', level: 'INFO', tenant: 'T-001', service: 'ai-tutor', message: 'Generated structured response validation token completed in 340ms' },
  { timestamp: '2026-07-07T21:18:05.109Z', level: 'INFO', tenant: 'T-002', service: 'cdn-edge', message: 'Cache MISS for path /assets/avatar-default.png' },
  { timestamp: '2026-07-07T21:18:01.001Z', level: 'ERROR', tenant: 'T-004', service: 'license-validator', message: 'Lapsed license token rejection for incoming request header' },
];

export default function LogsPage() {
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full flex flex-col">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white">System Log Stream</h1>
          <p className="text-sm text-white/40 mt-0.5">Live tail log explorer with full-text search, service filter and level markers</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
          <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
          Live Tailing...
        </button>
      </div>

      {/* Filter panel */}
      <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-4 flex gap-4 flex-shrink-0">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search system logs or grep messages..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div className="flex gap-2">
          {['ALL', 'INFO', 'WARN', 'ERROR'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                levelFilter === lvl ? 'bg-violet-500 text-white' : 'bg-white/[0.05] text-white/50 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal log window */}
      <div className="flex-1 bg-[#05070A] border border-white/[0.08] rounded-2xl p-5 font-mono text-xs overflow-y-auto space-y-2.5">
        {mockLogs
          .filter((l) => levelFilter === 'ALL' || l.level === levelFilter)
          .filter((l) => !search || l.message.toLowerCase().includes(search.toLowerCase()) || l.service.toLowerCase().includes(search.toLowerCase()))
          .map((log, i) => (
            <div key={i} className="flex items-start gap-4 py-1.5 border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
              <span className="text-white/20 flex-shrink-0">{log.timestamp}</span>
              <span className={`font-bold flex-shrink-0 w-12 ${
                log.level === 'ERROR' ? 'text-red-400' :
                log.level === 'WARN' ? 'text-amber-400' : 'text-blue-400'
              }`}>[{log.level}]</span>
              <span className="text-violet-400 font-bold flex-shrink-0">{log.service}</span>
              <span className="text-white/30 flex-shrink-0">tenant:{log.tenant}</span>
              <span className="text-white/80">{log.message}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
