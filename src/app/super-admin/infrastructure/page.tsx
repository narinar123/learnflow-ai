'use client';

import React, { useState } from 'react';

const servers = [
  { name: 'us-east-core-db-01', region: 'us-east-1', provider: 'AWS', type: 'Database (Primary)', status: 'Online', cpu: 42, memory: 67, storage: '2.4TB / 5TB', network: '240 Mbps', temp: '42°C', uptime: '312d 4h' },
  { name: 'us-east-core-db-02', region: 'us-east-1', provider: 'AWS', type: 'Database (Replica)', status: 'Online', cpu: 12, memory: 58, storage: '2.4TB / 5TB', network: '180 Mbps', temp: '39°C', uptime: '124d 18h' },
  { name: 'eu-west-core-db-01', region: 'eu-west-1', provider: 'AWS', type: 'Database (Primary)', status: 'Online', cpu: 31, memory: 62, storage: '3.1TB / 10TB', network: '190 Mbps', temp: '45°C', uptime: '89d 12h' },
  { name: 'ap-sec-core-db-01', region: 'ap-southeast-1', provider: 'AWS', type: 'Database (Primary)', status: 'Online', cpu: 55, memory: 72, storage: '980GB / 3TB', network: '95 Mbps', temp: '48°C', uptime: '45d 6h' },
  { name: 'k8s-cluster-us-east-prod', region: 'us-east-1', provider: 'AWS', type: 'K8s Cluster', status: 'Online', cpu: 64, memory: 78, storage: 'N/A', network: '1.2 Gbps', temp: 'N/A', uptime: '18d 2h' },
  { name: 'k8s-cluster-eu-west-prod', region: 'eu-west-1', provider: 'AWS', type: 'K8s Cluster', status: 'Online', cpu: 48, memory: 61, storage: 'N/A', network: '840 Mbps', temp: 'N/A', uptime: '89d 12h' },
];

const regions = [
  { id: 'us-east-1', name: 'US East (N. Virginia)', provider: 'AWS', latency: '12ms', status: 'Optimal', tenants: 129 },
  { id: 'eu-west-1', name: 'Europe (Ireland)', provider: 'AWS', latency: '18ms', status: 'Optimal', tenants: 78 },
  { id: 'eu-central-1', name: 'Europe (Frankfurt)', provider: 'AWS', latency: '24ms', status: 'Optimal', tenants: 24 },
  { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', provider: 'AWS', latency: '38ms', status: 'Optimal', tenants: 16 },
];

export default function InfrastructurePage() {
  const [selectedRegion, setSelectedRegion] = useState('all');

  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Infrastructure</h1>
          <p className="text-sm text-white/40 mt-0.5">Database clusters, compute pools, network configurations, regions</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Deploy Cluster
        </button>
      </div>

      {/* Cluster Overview Grid */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Clusters', value: '4 Clusters', sub: 'Kubernetes active', color: 'text-white' },
          { label: 'Database Nodes', value: '12 Instances', sub: 'PostgreSQL Aurora', color: 'text-violet-400' },
          { label: 'Avg Latency', value: '23 ms', sub: 'Global CDN edge', color: 'text-emerald-400' },
          { label: 'Network Outflow', value: '4.2 TB / day', sub: 'CDN Egress bandwidth', color: 'text-blue-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/25 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Region Statuses */}
      <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Global Cloud Regions</h2>
        <div className="grid grid-cols-4 gap-4">
          {regions.map((r) => (
            <div key={r.id} className="border border-white/[0.05] bg-white/[0.02] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/40">{r.id}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">{r.status}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white/80">{r.name}</p>
                <p className="text-xs text-white/30 mt-0.5">{r.provider} Cloud Platform</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-xs">
                <span className="text-white/40">{r.tenants} tenants</span>
                <span className="text-white/60 font-mono">⚡ {r.latency} latency</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Servers list */}
      <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Database & K8s Node Pool</h2>
          <div className="flex gap-2">
            <button className="px-2.5 py-1 text-xs bg-white/[0.05] hover:bg-white/[0.08] text-white/60 rounded-lg transition-all">All Nodes</button>
            <button className="px-2.5 py-1 text-xs bg-white/[0.05] hover:bg-white/[0.08] text-white/60 rounded-lg transition-all">Databases</button>
            <button className="px-2.5 py-1 text-xs bg-white/[0.05] hover:bg-white/[0.08] text-white/60 rounded-lg transition-all">K8s Clusters</button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {['Server Name', 'Type', 'CPU', 'Memory', 'Storage Capacity', 'Network Activity', 'Uptime', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium text-white/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {servers.map((s, i) => (
              <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3.5">
                  <div>
                    <p className="font-semibold text-white/85">{s.name}</p>
                    <p className="text-[10px] text-white/30 font-mono">{s.region} · {s.provider}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-white/60">{s.type}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/70 font-mono w-8">{s.cpu}%</span>
                    <div className="w-16 h-1 bg-white/[0.07] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.cpu}%` }} />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/70 font-mono w-8">{s.memory}%</span>
                    <div className="w-16 h-1 bg-white/[0.07] rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${s.memory}%` }} />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-xs text-white/50">{s.storage}</td>
                <td className="px-5 py-3.5 text-xs text-white/50">{s.network}</td>
                <td className="px-5 py-3.5 text-xs font-mono text-emerald-400">{s.uptime}</td>
                <td className="px-5 py-3.5">
                  <button className="text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors">Console</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
