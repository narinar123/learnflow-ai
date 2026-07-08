'use client';

import React, { useState } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminStatCard from '@/components/admin/AdminStatCard';
import PermissionGuard from '@/components/admin/PermissionGuard';

export default function AiManagementPage() {
  const [model, setModel] = useState('gemini-1.5-pro');
  const [temperature, setTemperature] = useState(0.7);

  return (
    <PermissionGuard permission="ai:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="AI Tutor Settings"
          description="Configure default models, routing limits, context constraints, and monitor API costs."
          badge="AI Engine"
          actions={
            <button
              onClick={() => alert('AI Config Saved Successfully...')}
              className="btn-primary"
            >
              Save Configuration
            </button>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AdminStatCard
            title="Total API Calls"
            value="342,800"
            trend={18.4}
            trendLabel="vs last month"
            iconBg="rgba(108,71,255,0.15)"
            accent="#6C47FF"
          />

          <AdminStatCard
            title="Avg Response Latency"
            value="420 ms"
            trend={-12}
            trendLabel="vs last month (faster)"
            iconBg="rgba(0,201,167,0.15)"
            accent="#00C9A7"
          />

          <AdminStatCard
            title="Monthly Tokens Cost"
            value="$245.82"
            trend={28.1}
            trendLabel="vs last month"
            iconBg="rgba(245,158,11,0.15)"
            accent="#F59E0B"
          />
        </div>

        {/* Config Form */}
        <div className="rounded-2xl border p-6 flex flex-col gap-6 max-w-2xl" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(108,71,255,0.12)' }}>
          <h3 className="text-base font-bold text-white">Default Model Routing</h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-400">Primary AI Tutor Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary"
            >
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Recommended)</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Lower Latency)</option>
              <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-slate-400">Temperature (Creativity vs accuracy)</span>
              <span className="text-white">{temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-400">Max Token Output Limit</label>
            <input
              type="number"
              defaultValue={2048}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
}
