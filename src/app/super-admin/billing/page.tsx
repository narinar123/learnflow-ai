'use client';

import React, { useState } from 'react';

const invoices = [
  { id: 'INV-2026-081', tenant: 'TechCorp Global', amount: 8200, status: 'Paid', date: '2026-07-01', dueDate: '2026-07-15', method: 'Stripe (Credit Card ···· 4242)' },
  { id: 'INV-2026-082', tenant: 'MindForge EU', amount: 11400, status: 'Paid', date: '2026-07-01', dueDate: '2026-07-15', method: 'Stripe (Credit Card ···· 9812)' },
  { id: 'INV-2026-083', tenant: 'SkillBridge Inc', amount: 6500, status: 'Paid', date: '2026-07-01', dueDate: '2026-07-15', method: 'ACH (Bank Transfer ···· 0991)' },
  { id: 'INV-2026-084', tenant: 'AcademyX APAC', amount: 3200, status: 'Paid', date: '2026-07-01', dueDate: '2026-07-15', method: 'Stripe (Credit Card ···· 5543)' },
  { id: 'INV-2026-085', tenant: 'EduMatrix Ltd', amount: 2100, status: 'Pending', date: '2026-07-01', dueDate: '2026-07-15', method: 'Stripe (Credit Card ···· 1211)' },
  { id: 'INV-2026-086', tenant: 'LearnHub Africa', amount: 490, status: 'Overdue', date: '2026-06-14', dueDate: '2026-06-28', method: 'Stripe (Credit Card ···· 4900)' },
];

export default function BillingPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="p-6 space-y-5 bg-[#080C14] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Billing & Financials</h1>
          <p className="text-sm text-white/40 mt-0.5">Collect invoices, trace stripe payments, and configure custom discount rules</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Configure Gateway
        </button>
      </div>

      {/* KPI block */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Outstanding Balance', value: '$2,590.00', sub: 'From 2 invoices past due', color: 'text-red-400' },
          { label: 'LTV Average', value: '$18,400.00', sub: 'Lifetime value per tenant average', color: 'text-white' },
          { label: 'Payment Success Rate', value: '98.92%', sub: 'Failed payment retry logic active', color: 'text-emerald-400' },
          { label: 'Billing Run Status', value: 'Completed', sub: 'July invoices generated', color: 'text-emerald-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-bold mt-1.5 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/25 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Billing Config Section */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 bg-[#0D1117] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Recent Invoices</h2>
            <div className="flex gap-2">
              {['all', 'Paid', 'Pending', 'Overdue'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-2.5 py-1 text-xs rounded transition-all ${
                    filter === status ? 'bg-violet-500 text-white' : 'bg-white/[0.05] text-white/50 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {['Invoice ID', 'Tenant / Org', 'Amount', 'Date', 'Payment Method', 'Status', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-white/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices
                .filter((inv) => filter === 'all' || inv.status === filter)
                .map((inv) => (
                  <tr key={inv.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-white/60">{inv.id}</td>
                    <td className="px-5 py-3.5 font-semibold text-white/80">{inv.tenant}</td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">${inv.amount.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-xs text-white/40">{inv.date}</td>
                    <td className="px-5 py-3.5 text-xs text-white/50">{inv.method}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        inv.status === 'Paid' ? 'bg-emerald-500/15 text-emerald-400' :
                        inv.status === 'Pending' ? 'bg-amber-500/15 text-amber-400' :
                        'bg-red-500/15 text-red-400 animate-pulse'
                      }`}>{inv.status}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="text-xs text-violet-400 hover:text-violet-300">View PDF</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pricing tier metrics */}
        <div className="bg-[#0D1117] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">Integrations & Gateways</h2>
          <div className="space-y-3">
            {[
              { name: 'Stripe Connect', active: true, desc: 'Primary card capture processor', logs: 'Optimal (2ms)' },
              { name: 'Adyen Checkout', active: false, desc: 'Fallback processor pool', logs: 'Inactive' },
              { name: 'Plaid ACH Integration', active: true, desc: 'Direct corporate invoice clearing', logs: 'Optimal (23ms)' },
            ].map((g, i) => (
              <div key={i} className="border border-white/[0.05] bg-white/[0.01] rounded-xl p-3 flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">{g.name}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{g.desc}</p>
                  <p className="text-[10px] font-mono text-white/40 mt-2">📊 Status: {g.logs}</p>
                </div>
                <span className={`w-2 h-2 rounded-full ${g.active ? 'bg-emerald-400 animate-pulse' : 'bg-white/10'}`} />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-semibold text-white/60 mb-2">Automated Billing Rules</h3>
            <div className="space-y-2 text-xs text-white/50">
              <div className="flex items-center justify-between border-b border-white/[0.04] py-1.5">
                <span>Dunning Cycle</span>
                <span className="text-violet-300">Retry 3x over 14 days</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.04] py-1.5">
                <span>Late Fee Auto-charge</span>
                <span className="text-violet-300">1.5% at 30 days overdue</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span>Auto-suspension Grace</span>
                <span className="text-violet-300">Enabled (7 days max)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
