'use client';

import React from 'react';
import { mockPayouts, trainerKPIs } from '@/lib/trainer-data';
import AdminStatCard from '@/components/admin/AdminStatCard';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';

export default function TrainerPayoutsPage() {
  const columns: Column<typeof mockPayouts[0]>[] = [
    {
      key: 'id',
      header: 'Payout ID',
      sortable: true,
      render: (val) => <span className="font-mono text-xs text-slate-400">{String(val)}</span>,
    },
    {
      key: 'amount',
      header: 'Amount Paid',
      sortable: true,
      render: (val) => <span className="font-semibold text-emerald-400">${Number(val).toLocaleString()}</span>,
    },
    {
      key: 'date',
      header: 'Transfer Date',
      sortable: true,
    },
    {
      key: 'method',
      header: 'Billing Target',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color} border`}>{status}</span>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-white">Monetization & Payouts</h1>
          <p className="text-sm text-slate-400">Manage Stripe connections, review monthly royalty statements and earnings history.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">Stripe Connected</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminStatCard
          title="Gross Revenue share"
          value={`$${trainerKPIs.totalRevenue.toLocaleString()}`}
          iconBg="rgba(16, 185, 129, 0.1)"
          accent="#10B981"
          icon={<span>💰</span>}
        />
        <AdminStatCard
          title="Current Period Earnings"
          value={`$${trainerKPIs.monthlyRevenue.toLocaleString()}`}
          subtitle="July 1 — July 31"
          iconBg="rgba(108, 71, 255, 0.1)"
          accent="#6C47FF"
          icon={<span>📈</span>}
        />
        <AdminStatCard
          title="Scheduled payout"
          value={`$${trainerKPIs.payoutProgress}`}
          subtitle="Will transfer to Stripe automatically"
          iconBg="rgba(59, 130, 246, 0.1)"
          accent="#3B82F6"
          icon={<span>💳</span>}
        />
      </div>

      {/* Table */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold text-white">Royalty Transfer History</h3>
        <AdminDataTable
          data={mockPayouts}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search payouts..."
          searchKeys={['id', 'method']}
        />
      </div>
    </div>
  );
}
