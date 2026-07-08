'use client';
import React, { useState } from 'react';

export default function FinanceDashboard() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white">Enterprise Finance</h1>
          <p className="text-slate-400 mt-1">Manage multi-tenant billing, invoices, and payment gateways.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold">Generate Invoice</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue (MTD)', value: '₹4,52,000', change: '+12.5%' },
          { label: 'Outstanding Dues', value: '₹1,24,500', change: '-5.2%' },
          { label: 'Active Subscriptions', value: '1,432', change: '+18.1%' },
          { label: 'Failed Payments', value: '23', change: '-2.4%' }
        ].map((stat, i) => (
          <div key={i} className="bg-[#0A0D16] border border-slate-800 p-6 rounded-2xl">
            <p className="text-slate-400 text-sm font-semibold">{stat.label}</p>
            <h3 className="text-2xl font-black text-white mt-2">{stat.value}</h3>
            <span className={`text-xs font-bold mt-2 inline-block ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{stat.change}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#0A0D16] border border-slate-800 rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Invoices</h2>
        <table className="w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500">
              <th className="pb-3 font-semibold">Invoice #</th>
              <th className="pb-3 font-semibold">Client / Campus</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'INV-2026-001', client: 'IIT Bombay', amount: '₹12,00,000', status: 'Paid', date: 'Jul 01, 2026' },
              { id: 'INV-2026-002', client: 'TCS Enterprise', amount: '₹4,50,000', status: 'Pending', date: 'Jul 05, 2026' },
              { id: 'INV-2026-003', client: 'Apollo Group', amount: '₹9,50,000', status: 'Overdue', date: 'Jun 15, 2026' },
            ].map((inv, i) => (
              <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-900/50">
                <td className="py-4 font-mono text-indigo-400">{inv.id}</td>
                <td className="py-4 text-white font-medium">{inv.client}</td>
                <td className="py-4">{inv.amount}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' :
                    inv.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="py-4">{inv.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
