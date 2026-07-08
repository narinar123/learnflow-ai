'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockIntegrations } from '@/lib/admin-data';

export default function IntegrationsPage() {
  return (
    <PermissionGuard permission="integrations:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Integrations Portal"
          description="Provision and sync APIs for payment, storage, storage, analytics and CRM utilities."
          badge="APIs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockIntegrations.map((app) => (
            <div
              key={app.id}
              className="rounded-2xl border p-5 flex flex-col justify-between gap-5 transition-all duration-200 hover:border-purple-500/30 bg-slate-900/30"
              style={{ borderColor: 'rgba(108,71,255,0.12)' }}
            >
              <div>
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl bg-slate-800 p-2.5 rounded-xl border border-slate-700">{app.icon}</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">{app.name}</h4>
                      <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                        {app.category}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    app.status === 'connected' ? 'bg-positive/10 text-positive' : app.status === 'error' ? 'bg-danger/10 text-danger animate-pulse' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed">{app.description}</p>
              </div>

              <div className="border-t pt-4" style={{ borderColor: 'rgba(108,71,255,0.08)' }}>
                {app.status === 'connected' ? (
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Events processed</span>
                      <span className="font-mono text-slate-300 font-semibold">{app.eventsProcessed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Last sync</span>
                      <span className="text-slate-300">{new Date(app.lastSync).toLocaleTimeString()}</span>
                    </div>
                    <button
                      onClick={() => alert(`Configuring: ${app.name}`)}
                      className="btn-outline w-full py-1.5 text-xs mt-2"
                    >
                      Configure App
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => alert(`Connecting: ${app.name}`)}
                    className="btn-primary w-full py-1.5 text-xs"
                  >
                    Connect API
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PermissionGuard>
  );
}
