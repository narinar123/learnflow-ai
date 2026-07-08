'use client';

import React from 'react';

const mockUsage = [
  { id: 'T-001', org: 'TechCorp Global', model: 'Gemini 1.5 Pro', tokens: '142.4M', cost: '$1,242.00', requests: '1.2M', rateLimitHit: '0.01%' },
  { id: 'T-003', org: 'SkillBridge Inc', model: 'Gemini 1.5 Flash', tokens: '98.2M', cost: '$148.50', requests: '890K', rateLimitHit: '0.00%' },
  { id: 'T-002', org: 'EduMatrix Ltd', model: 'Gemini 1.5 Flash', tokens: '38.1M', cost: '$57.15', requests: '340K', rateLimitHit: '0.04%' },
  { id: 'T-005', org: 'Cognify AI', model: 'Gemini 1.5 Pro', tokens: '12.8M', cost: '$112.40', requests: '98K', rateLimitHit: '0.00%' },
];

export default function AiUsagePage() {
  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Engine Usage</h1>
          <p className="text-sm text-white/40 mt-0.5">Token consumption tracking, gateway latencies, API billing cost summaries</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Configure LLM Keys
        </button>
      </div>

      {/* Usage statistics cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total API Requests Today', value: '4.2 Million', sub: 'Peak concurrent: 340 req/s', color: 'text-white' },
          { label: 'Token Volumetrics', value: '480.2 Million', sub: 'Gemini models cluster total', color: 'text-violet-400' },
          { label: 'Average Latency', value: '340 ms', sub: 'Inference context return speed', color: 'text-emerald-400' },
          { label: 'Calculated Provider Cost', value: '$2,148.95', sub: 'Accrued month-to-date', color: 'text-blue-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/25 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Breakdown per Tenant organization */}
      <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <h2 className="text-sm font-semibold text-white">LLM API Token Consumption per Tenant</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {['Tenant ID', 'Organization', 'Primary Model', 'Token Volume', 'Inference Calls', 'Wasted (Rate Limits)', 'Total Cost'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium text-white/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockUsage.map((item, i) => (
              <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                <td className="px-5 py-3.5 font-mono text-xs text-white/50">{item.id}</td>
                <td className="px-5 py-3.5 font-semibold text-white/85">{item.org}</td>
                <td className="px-5 py-3.5 text-xs text-white/60 font-mono">{item.model}</td>
                <td className="px-5 py-3.5 text-xs font-semibold text-white/80">{item.tokens}</td>
                <td className="px-5 py-3.5 text-xs text-white/65">{item.requests}</td>
                <td className="px-5 py-3.5 text-xs text-red-400 font-mono">{item.rateLimitHit}</td>
                <td className="px-5 py-3.5 text-emerald-400 font-semibold text-sm">{item.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
