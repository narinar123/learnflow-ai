'use client';

import React, { useState } from 'react';

const alertRules = [
  { id: 'RULE-01', trigger: 'Avg Latency > 200ms for 5m', severity: 'High', service: 'API Gateway', status: 'Enabled' },
  { id: 'RULE-02', trigger: 'Memory usage > 90% continuous', severity: 'Critical', service: 'Db Core Pool', status: 'Enabled' },
  { id: 'RULE-03', trigger: 'Failed logins > 500 in 1m', severity: 'Critical', service: 'Auth Pool', status: 'Enabled' },
  { id: 'RULE-04', trigger: 'Rate limits hit > 5% of requests', severity: 'Medium', service: 'Rate Limiter', status: 'Enabled' },
];

export default function MonitoringPage() {
  const [activeAlerts, setActiveAlerts] = useState([
    { service: 'Database Cluster', title: 'Latency Degraded', details: 'us-east-1 replica lag exceeded 2.1s', time: '14m ago', status: 'investigating' },
    { service: 'AI Engine API', title: 'Gemini Rate Limiting', details: 'Quota limits reached on sandbox organization keys', time: '38m ago', status: 'resolved' },
  ]);

  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Monitoring</h1>
          <p className="text-sm text-white/40 mt-0.5">Real-time application execution monitoring, alerts and rule engines</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 text-xs bg-white/[0.05] text-white/60 rounded-xl hover:bg-white/[0.09] transition-all">Configure Prometheus</button>
          <button className="px-3 py-2 text-xs bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all">Create Alert Rule</button>
        </div>
      </div>

      {/* Resource metrics breakdown */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">Global Ingestion rate</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/40">
              <span>Telemetry flow rate</span>
              <span className="font-mono text-white/80">42,800 events/sec</span>
            </div>
            <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full" style={{ width: '68%' }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs pt-2">
            <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl">
              <span className="text-white/40">Metrics collected</span>
              <p className="text-sm font-bold text-white mt-1">4.2 Billion</p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl">
              <span className="text-white/40">Storage usage</span>
              <p className="text-sm font-bold text-white mt-1">1.8 TB</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Active Alert Stream</h2>
          <div className="space-y-3">
            {activeAlerts.map((a, i) => (
              <div key={i} className="border border-white/[0.05] bg-white/[0.01] rounded-xl p-4 flex items-start gap-4 justify-between">
                <div className="flex items-start gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full mt-1 ${a.status === 'investigating' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                  <div>
                    <h3 className="text-sm font-semibold text-white/85">{a.title} · <span className="text-xs font-normal text-white/40">{a.service}</span></h3>
                    <p className="text-xs text-white/50 mt-1">{a.details}</p>
                    <span className="text-[10px] text-white/30 mt-2 block">Triggered {a.time}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {a.status === 'investigating' && (
                    <button className="px-2 py-1 text-[10px] bg-violet-600/20 text-violet-300 border border-violet-500/30 rounded hover:bg-violet-600/30">Acknowledge</button>
                  )}
                  <button className="px-2 py-1 text-[10px] bg-white/[0.05] text-white/50 rounded hover:bg-white/[0.08]">View Logs</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rules list */}
      <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <h2 className="text-sm font-semibold text-white">Monitoring Alert Rules</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {['Rule ID', 'Target Service', 'Expression', 'Severity', 'State', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium text-white/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alertRules.map((rule, i) => (
              <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                <td className="px-5 py-3.5 font-mono text-xs text-white/60">{rule.id}</td>
                <td className="px-5 py-3.5 font-semibold text-white/85">{rule.service}</td>
                <td className="px-5 py-3.5 font-mono text-xs text-white/55">{rule.trigger}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    rule.severity === 'Critical' ? 'bg-red-500/15 text-red-400' :
                    rule.severity === 'High' ? 'bg-amber-500/15 text-amber-400' :
                    'bg-blue-500/15 text-blue-400'
                  }`}>{rule.severity}</span>
                </td>
                <td className="px-5 py-3.5 text-xs text-emerald-400 font-medium">● {rule.status}</td>
                <td className="px-5 py-3.5">
                  <button className="text-xs text-white/40 hover:text-white mr-3">Edit</button>
                  <button className="text-xs text-red-400/70 hover:text-red-400">Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
