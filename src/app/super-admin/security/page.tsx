'use client';

import React, { useState } from 'react';

const mockThreats = [
  { ip: '198.51.100.42', location: 'Frankfurt, DE', type: 'SQL Injection attempt', severity: 'Critical', action: 'IP Blocked', time: '14m ago' },
  { ip: '203.0.113.89', location: 'Mumbai, IN', type: 'Brute-force auth scan', severity: 'High', action: 'Challenged (CAPTCHA)', time: '38m ago' },
  { ip: '192.0.2.14', location: 'Unknown', type: 'Excessive API Rate limits', severity: 'Medium', action: 'Throttled to 10%', time: '1h ago' },
];

export default function SecurityCenterPage() {
  const [wafActive, setWafActive] = useState(true);

  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Security Center</h1>
          <p className="text-sm text-white/40 mt-0.5">WAF configurations, threat monitoring, SSL/TLS checks, tenant access audits</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/45">WAF Shield Status:</span>
          <button
            onClick={() => setWafActive(!wafActive)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              wafActive ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {wafActive ? '🔒 Active Protection' : '🔓 Suspended'}
          </button>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Security Score', value: 'A+ Class', sub: 'WAF rules fully synchronized', color: 'text-emerald-400' },
          { label: 'Threats Blocked (24h)', value: '3,842 requests', sub: 'Top target: /api/v1/auth', color: 'text-violet-400' },
          { label: 'SSL Certificates', value: '247 Valid', sub: '0 expiring within 30 days', color: 'text-emerald-400' },
          { label: 'Unusual Logins', value: '3 challenged', sub: 'MFA prompt enforced successfully', color: 'text-amber-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/25 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Threat log listing */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.05]">
            <h2 className="text-sm font-semibold text-white">Blocked Threats & IP Pools</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {['IP Address', 'Threat Type', 'Geo / Location', 'Severity', 'Trigger Time', 'Applied Action'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-white/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockThreats.map((threat, i) => (
                <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5 font-mono text-xs text-white/70">{threat.ip}</td>
                  <td className="px-5 py-3.5 font-semibold text-white/80">{threat.type}</td>
                  <td className="px-5 py-3.5 text-xs text-white/40">{threat.location}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      threat.severity === 'Critical' ? 'bg-red-500/15 text-red-400 animate-pulse' :
                      threat.severity === 'High' ? 'bg-amber-500/15 text-amber-400' :
                      'bg-blue-500/15 text-blue-400'
                    }`}>{threat.severity}</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-white/40">{threat.time}</td>
                  <td className="px-5 py-3.5 text-xs text-emerald-400 font-mono font-medium">{threat.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Security Compliance checklist */}
        <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">Compliance Checklist</h2>
          <div className="space-y-3">
            {[
              { check: 'SOC2 Type II certification', ok: true, note: 'Renewal audit scheduled for Oct' },
              { check: 'ISO 27001 standard verified', ok: true, note: 'Next cycle alignment active' },
              { check: 'GDPR / HIPAA audit criteria', ok: true, note: 'EU tenant database strictly isolated' },
              { check: 'Penetration audit benchmark', ok: false, note: 'Last scan 184 days ago · Warning' },
            ].map((c, i) => (
              <div key={i} className="border border-white/[0.05] bg-white/[0.01] rounded-xl p-3 flex items-start gap-3">
                <span className={`w-2.5 h-2.5 rounded-full mt-1 ${c.ok ? 'bg-emerald-400' : 'bg-red-400 animate-pulse'}`} />
                <div>
                  <p className="text-xs font-semibold text-white">{c.check}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
