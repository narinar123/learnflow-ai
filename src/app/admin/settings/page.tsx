'use client';

import React, { useState } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PermissionGuard from '@/components/admin/PermissionGuard';

export default function SettingsPage() {
  const [platformName, setPlatformName] = useState('GUIDESOFT IT SOLUTIONS');
  const [supportEmail, setSupportEmail] = useState('support@learnflow.ai');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <PermissionGuard permission="settings:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Platform Settings"
          description="Global metadata settings, support email routing, system maintenance switches."
          badge="System Settings"
          actions={
            <button
              onClick={() => alert('Platform Settings Saved successfully...')}
              className="btn-primary"
            >
              Save Settings
            </button>
          }
        />

        <div className="rounded-2xl border p-6 flex flex-col gap-6 max-w-2xl" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(108,71,255,0.12)' }}>
          <h3 className="text-base font-bold text-white">General Parameters</h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-400">Platform Brand Name</label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-400">Customer Support Email</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary"
            />
          </div>

          <div className="border-t border-slate-800 my-2 pt-6">
            <div className="flex justify-between items-center gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">System Maintenance Mode</h4>
                <p className="text-xs text-slate-400 mt-1">If enabled, standard users will see a maintenance page.</p>
              </div>
              <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors relative focus:outline-none ${maintenanceMode ? 'bg-danger' : 'bg-slate-800'}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${maintenanceMode ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
}
