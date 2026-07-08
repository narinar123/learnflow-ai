'use client';

import React, { useState } from 'react';

export default function SystemSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowSignups, setAllowSignups] = useState(true);

  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">System Settings</h1>
          <p className="text-sm text-white/40 mt-0.5">Global environment configs, signup flags, network proxy settings, CORS configuration</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
          Save Settings
        </button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-3 gap-5">
        {/* Environment controllers */}
        <div className="col-span-2 space-y-4">
          <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Global Execution Controls</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
                <div>
                  <p className="text-xs font-semibold text-white/95">Maintenance Window Mode</p>
                  <p className="text-[10px] text-white/35 mt-0.5">Route incoming requests to status.learnflow.ai</p>
                </div>
                <button
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-all ${maintenanceMode ? 'bg-violet-500 flex justify-end' : 'bg-white/10 flex justify-start'}`}
                >
                  <span className="w-4 h-4 bg-white rounded-full block" />
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
                <div>
                  <p className="text-xs font-semibold text-white/95">Allow New Tenant Signups</p>
                  <p className="text-[10px] text-white/35 mt-0.5">Enable or disable registration endpoint router</p>
                </div>
                <button
                  onClick={() => setAllowSignups(!allowSignups)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-all ${allowSignups ? 'bg-violet-500 flex justify-end' : 'bg-white/10 flex justify-start'}`}
                >
                  <span className="w-4 h-4 bg-white rounded-full block" />
                </button>
              </div>
            </div>
          </div>

          {/* CORS and proxy networks */}
          <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Proxy & Header Configurations</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-white/40 block mb-1.5">Allowed Origins (CORS CORS_ALLOWED_ORIGINS)</label>
                <input
                  type="text"
                  defaultValue="*.learnflow.ai, localhost:3000, learnflow-app-hosting.vercel.app"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white/80 focus:outline-none focus:border-violet-500/50"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-1.5">Security Response Headers (JSON format)</label>
                <textarea
                  rows={4}
                  defaultValue={`{\n  "X-Frame-Options": "DENY",\n  "X-Content-Type-Options": "nosniff",\n  "Referrer-Policy": "strict-origin-when-cross-origin"\n}`}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white/80 font-mono focus:outline-none focus:border-violet-500/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Keys */}
        <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">Provider Credentials</h2>
          <div className="space-y-3">
            {[
              { key: 'AWS_ACCESS_KEY_ID', val: 'AKIAIOSFODNN7EXAMPLE' },
              { key: 'GEMINI_API_KEY', val: 'AIzaSyD-7X4K9M2L...' },
              { key: 'STRIPE_SECRET_KEY', val: 'sk_live_51H2...' },
              { key: 'SENDGRID_API_KEY', val: 'SG.2x6n9w1q...' },
            ].map((c) => (
              <div key={c.key} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                <span className="text-[10px] font-mono text-white/35 block mb-1">{c.key}</span>
                <span className="text-xs font-mono text-violet-300 font-bold">{c.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
