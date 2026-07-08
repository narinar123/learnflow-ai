'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockInstitutions, Institution } from '@/lib/admin-data';

export default function InstitutionsPage() {
  const columns: Column<Institution>[] = [
    {
      key: 'name',
      header: 'Institution',
      sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-semibold text-white">{row.name}</p>
          <p className="text-xs text-slate-400">{row.domain}</p>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
    },
    {
      key: 'seats',
      header: 'Seats (Used / Total)',
      sortable: true,
      render: (_, row) => {
        const pct = Math.round((row.usedSeats / row.seats) * 100);
        return (
          <div className="flex flex-col gap-1 w-32">
            <span className="font-medium text-slate-300">{row.usedSeats} / {row.seats} ({pct}%)</span>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      },
    },
    {
      key: 'plan',
      header: 'Plan',
      sortable: true,
      render: (val) => {
        const plan = String(val);
        const color = plan === 'Enterprise' ? 'bg-amber-500/10 text-amber-400' : plan === 'Growth' ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-500/10 text-slate-400';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>{plan}</span>;
      },
    },
    {
      key: 'revenue',
      header: 'Revenue',
      sortable: true,
      render: (val) => <span className="font-semibold text-positive">${Number(val).toLocaleString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'active' ? 'bg-positive/10 text-positive' : status === 'trial' ? 'bg-info/10 text-info' : 'bg-slate-500/10 text-slate-400';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
  ];

  return (
    <PermissionGuard permission="users:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Multi-Campus Institutions"
          description="Provision corporate academies, bootcamps, and universities. Manage user seat limits."
          badge="Institutions"
          actions={
            <button
              onClick={() => alert('Provision institution functionality...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Add Institution
            </button>
          }
        />

        <AdminDataTable
          data={mockInstitutions}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search institutions..."
          searchKeys={['name', 'domain', 'type']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Billing dashboard for ${row.name}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Billing"
              >
                💳
              </button>
              <button
                onClick={() => alert(`Allocating additional seats for ${row.name}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Manage seats"
              >
                🎟️
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
