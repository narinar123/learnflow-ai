'use client';

import React from 'react';

const coreServices = [
  { name: 'API Server Cluster', type: 'Compute Node Pool', status: 'Healthy', latency: '18ms', usage: '48% CPU', uptime: '99.99%', message: 'Active pods: 24/24 scaling window healthy' },
  { name: 'Aurora PostgreSQL Cluster', type: 'Database Pool', status: 'Degraded', latency: '95ms', usage: '72% Memory', uptime: '99.82%', message: 'Primary storage cluster read replica 3 recovery lag > 2.1s' },
  { name: 'Redis Cache Layer', type: 'InMemory Storage', status: 'Healthy', latency: '1ms', usage: '31% Memory', uptime: '100%', message: 'Cache Hit Rate avg 94.2% optimized' },
  { name: 'AI Tutor Worker Agent', type: 'Inference Queue Pool', status: 'Healthy', latency: '340ms', usage: '64% GPU VRAM', uptime: '99.95%', message: 'Concurrency executor limit 50/50 instances running' },
  { name: 'CDN Edge Delivery Network', type: 'Static Assets Route', status: 'Healthy', latency: '4ms', usage: '1.2 Gbps out', uptime: '100%', message: 'Egress compression GZip/Brotli fully active' },
];

export default function SystemHealthPage() {
  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">System Health</h1>
          <p className="text-sm text-white/40 mt-0.5">Real-time status check, memory buffers, process queue lags, and disk limits</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 4v6h-6M1 20v-6h6"/></svg>
          Refresh State
        </button>
      </div>

      {/* Main KPI Status */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Overall Status', value: 'Degraded', sub: 'Aurora cluster lag detected', color: 'text-amber-400' },
          { label: 'Global Latency', value: '43 ms', sub: 'Target threshold: <100ms', color: 'text-emerald-400' },
          { label: 'Active Webhook Queues', value: '0 lag', sub: 'Retry workers fully empty', color: 'text-emerald-400' },
          { label: 'Ingested Telemetry Today', value: '4.2 Billion', sub: 'Elastic pool usage: 48%', color: 'text-violet-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/25 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Core services statuses */}
      <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <h2 className="text-sm font-semibold text-white">Core Microservices Status</h2>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {coreServices.map((service, i) => (
            <div key={i} className="p-5 flex items-start justify-between hover:bg-white/[0.01] transition-colors">
              <div className="flex items-start gap-4">
                <span className={`w-3 h-3 rounded-full mt-1 ${service.status === 'Healthy' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                <div>
                  <h3 className="text-sm font-semibold text-white">{service.name} <span className="text-xs font-normal text-white/35">({service.type})</span></h3>
                  <p className="text-xs text-white/50 mt-1">{service.message}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-6">
                <div className="text-xs">
                  <span className="text-white/30 block">LATENCY</span>
                  <span className="font-mono text-white/80">{service.latency}</span>
                </div>
                <div className="text-xs">
                  <span className="text-white/30 block">UPTIME</span>
                  <span className="font-mono text-white/80">{service.uptime}</span>
                </div>
                <div className="text-xs w-24">
                  <span className="text-white/30 block">USAGE</span>
                  <span className="font-mono text-white/80">{service.usage}</span>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded font-medium ${service.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
