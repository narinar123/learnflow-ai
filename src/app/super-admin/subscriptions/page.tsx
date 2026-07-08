'use client';

import React, { useState } from 'react';

const plans = [
  {
    id: 'starter', name: 'Starter', price: 49, currency: 'USD', billing: 'month',
    features: ['Up to 1,000 users', '100 GB storage', '500 API RPM', 'Basic AI (5K calls/day)', 'Email support'],
    limits: { users: 1000, storage: 100, apiRpm: 500, aiCalls: 5000 },
    tenants: 67, mrr: 25000, color: 'border-slate-600/40',
  },
  {
    id: 'professional', name: 'Professional', price: 199, currency: 'USD', billing: 'month',
    features: ['Up to 5,000 users', '1 TB storage', '3,000 API RPM', 'Advanced AI (25K calls/day)', 'Priority support', 'SSO', 'Custom domain'],
    limits: { users: 5000, storage: 1000, apiRpm: 3000, aiCalls: 25000 },
    tenants: 118, mrr: 78600, color: 'border-blue-600/40',
  },
  {
    id: 'enterprise', name: 'Enterprise', price: 799, currency: 'USD', billing: 'month',
    features: ['Unlimited users', '10 TB storage', 'Unlimited API', 'Premium AI (unlimited)', 'Dedicated infra', 'SLA 99.99%', 'White-label', 'Custom integrations'],
    limits: { users: -1, storage: 10000, apiRpm: -1, aiCalls: -1 },
    tenants: 62, mrr: 238400, color: 'border-violet-600/50',
    popular: true,
  },
];

const subscriptions = [
  { id: 'SUB-001', org: 'TechCorp Global', plan: 'Enterprise', status: 'Active', mrr: 8200, nextBilling: '2026-08-01', seats: 20000, usedSeats: 12400, addOns: ['AI+', 'White-label'], startDate: '2024-01-15', country: '🇺🇸' },
  { id: 'SUB-002', org: 'EduMatrix Ltd', plan: 'Professional', status: 'Active', mrr: 2100, nextBilling: '2026-08-22', seats: 5000, usedSeats: 3820, addOns: ['SSO'], startDate: '2024-03-22', country: '🇬🇧' },
  { id: 'SUB-003', org: 'SkillBridge Inc', plan: 'Enterprise', status: 'Active', mrr: 6500, nextBilling: '2026-08-08', seats: 15000, usedSeats: 9100, addOns: ['AI+', 'Analytics Pro'], startDate: '2023-11-08', country: '🇨🇦' },
  { id: 'SUB-004', org: 'LearnHub Africa', plan: 'Starter', status: 'Past Due', mrr: 490, nextBilling: '2026-07-14', seats: 1000, usedSeats: 820, addOns: [], startDate: '2025-02-14', country: '🇳🇬' },
  { id: 'SUB-005', org: 'Cognify AI', plan: 'Professional', status: 'Trial', mrr: 0, nextBilling: '2026-07-30', seats: 5000, usedSeats: 2300, addOns: [], startDate: '2026-06-30', country: '🇩🇪' },
  { id: 'SUB-006', org: 'MindForge EU', plan: 'Enterprise', status: 'Active', mrr: 11400, nextBilling: '2026-07-20', seats: 25000, usedSeats: 15200, addOns: ['AI+', 'White-label', 'Analytics Pro'], startDate: '2023-07-20', country: '🇳🇱' },
];

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'plans'>('subscriptions');
  const [search, setSearch] = useState('');

  const filtered = subscriptions.filter(
    (s) => !search || s.org.toLowerCase().includes(search.toLowerCase())
  );

  const totalMrr = subscriptions.reduce((a, s) => a + s.mrr, 0);

  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscription Management</h1>
          <p className="text-sm text-white/40 mt-0.5">Plans, billing cycles, add-ons and revenue overview</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Create Plan
        </button>
      </div>

      {/* MRR overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/20 rounded-2xl p-5">
          <p className="text-xs text-violet-300/60 uppercase tracking-wide">Total MRR</p>
          <p className="text-4xl font-bold text-white mt-1">${(totalMrr / 1000).toFixed(0)}K</p>
          <p className="text-xs text-emerald-400 mt-2">↑ $28K (8.9%) this month</p>
        </div>
        {[
          { label: 'ARR Projection', value: `$${((totalMrr * 12) / 1000000).toFixed(2)}M`, sub: 'Based on current MRR', color: 'text-emerald-400' },
          { label: 'Churn Rate', value: '2.1%', sub: '↓ 0.4% vs last month', color: 'text-emerald-400' },
          { label: 'Avg Revenue/Tenant', value: `$${(totalMrr / 247).toFixed(0)}`, sub: 'Per tenant per month', color: 'text-blue-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wide">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/30 mt-2">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/[0.03] p-1 rounded-xl w-fit">
        {(['subscriptions', 'plans'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-all ${
              activeTab === t ? 'bg-violet-600 text-white' : 'text-white/40 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'subscriptions' && (
        <>
          <div className="relative w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search subscriptions..." className="w-full bg-[#0D1117] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50" />
          </div>

          <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  {['Organization', 'Plan', 'MRR', 'Seats Used', 'Add-Ons', 'Next Billing', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-medium text-white/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const seatPct = Math.round((s.usedSeats / s.seats) * 100);
                  return (
                    <tr key={s.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span>{s.country}</span>
                          <div>
                            <p className="font-medium text-white/85">{s.org}</p>
                            <p className="text-[10px] text-white/30 font-mono">{s.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          s.plan === 'Enterprise' ? 'bg-violet-500/15 text-violet-300' :
                          s.plan === 'Professional' ? 'bg-blue-500/15 text-blue-300' :
                          'bg-slate-500/15 text-slate-400'
                        }`}>{s.plan}</span>
                      </td>
                      <td className="px-5 py-3.5 text-emerald-400 font-semibold">${s.mrr.toLocaleString()}</td>
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="text-xs text-white/70">{s.usedSeats.toLocaleString()} / {s.seats.toLocaleString()}</p>
                          <div className="w-20 h-1 bg-white/[0.07] rounded-full mt-1 overflow-hidden">
                            <div className={`h-full rounded-full ${seatPct > 85 ? 'bg-red-500' : 'bg-violet-500'}`} style={{ width: `${seatPct}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {s.addOns.length === 0 ? <span className="text-xs text-white/20">None</span> :
                            s.addOns.map((a) => (
                              <span key={a} className="text-[10px] px-1.5 py-0.5 bg-white/[0.06] text-white/50 rounded">{a}</span>
                            ))}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-white/50 text-xs">{s.nextBilling}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          s.status === 'Active' ? 'bg-emerald-500/15 text-emerald-400' :
                          s.status === 'Past Due' ? 'bg-red-500/15 text-red-400' :
                          'bg-amber-500/15 text-amber-400'
                        }`}>{s.status}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Manage</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'plans' && (
        <div className="grid grid-cols-3 gap-5">
          {plans.map((p) => (
            <div key={p.id} className={`bg-[#0D1117] border rounded-2xl p-6 relative ${p.color} ${p.popular ? 'ring-1 ring-violet-500/40' : ''}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-violet-600 text-white text-xs font-semibold rounded-full">Most Popular</div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <p className="text-3xl font-black text-white mt-1">${p.price}<span className="text-sm font-normal text-white/40">/mo</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/30">Tenants</p>
                  <p className="text-xl font-bold text-white/70">{p.tenants}</p>
                </div>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-3 mb-4">
                <p className="text-xs text-white/30 mb-1">Plan MRR</p>
                <p className="text-xl font-bold text-emerald-400">${(p.mrr / 1000).toFixed(0)}K</p>
              </div>
              <ul className="space-y-2 mb-5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button className="flex-1 py-2 text-xs font-medium bg-white/[0.06] text-white/60 rounded-xl hover:bg-white/[0.10] transition-all">Edit Plan</button>
                <button className="flex-1 py-2 text-xs font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-500 transition-all">Clone</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
