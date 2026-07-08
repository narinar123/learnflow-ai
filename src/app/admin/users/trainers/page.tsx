'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockTrainers, Trainer } from '@/lib/admin-data';

export default function TrainersPage() {
  const columns: Column<Trainer>[] = [
    {
      key: 'name',
      header: 'Trainer',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800" />
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-white">{row.name}</p>
              {row.verified && <span className="text-xs" title="Verified Creator">🛡️</span>}
            </div>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'specialty',
      header: 'Specialty',
      sortable: true,
    },
    {
      key: 'coursesCreated',
      header: 'Courses',
      sortable: true,
      render: (val) => <span className="font-medium text-slate-300">{String(val)} created</span>,
    },
    {
      key: 'totalStudents',
      header: 'Students',
      sortable: true,
      render: (val) => <span className="font-medium text-slate-300">{Number(val).toLocaleString()}</span>,
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      render: (val) => <span className="font-semibold text-warning">⭐ {Number(val).toFixed(1)}</span>,
    },
    {
      key: 'revenue',
      header: 'Revenue Generated',
      sortable: true,
      render: (val) => <span className="font-semibold text-positive">${Number(val).toLocaleString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'active' ? 'bg-positive/10 text-positive' : 'bg-slate-500/10 text-slate-400';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
  ];

  return (
    <PermissionGuard permission="users:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Trainers Directory"
          description="Manage course instructors, verify profiles, audit reviews, and oversee payouts."
          badge="Trainers"
          actions={
            <button
              onClick={() => alert('Invite trainer functionality...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
              Invite Trainer
            </button>
          }
        />

        <AdminDataTable
          data={mockTrainers}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search trainers..."
          searchKeys={['name', 'email', 'specialty']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Payout settings for ${row.name}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Payout details"
              >
                💳
              </button>
              <button
                onClick={() => alert(`Reviewing courses for ${row.name}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Manage Courses"
              >
                📚
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
