'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockRecruiters, Recruiter } from '@/lib/admin-data';

export default function RecruitersPage() {
  const columns: Column<Recruiter>[] = [
    {
      key: 'name',
      header: 'Recruiter',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800" />
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-white">{row.name}</p>
              {row.verified && <span className="text-xs" title="Verified Recruiter">🛡️</span>}
            </div>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'company',
      header: 'Company / Employer',
      sortable: true,
      render: (val, row) => (
        <div>
          <span className="font-semibold text-white">{String(val)}</span>
          <p className="text-xs text-slate-500 mt-0.5">{row.industry}</p>
        </div>
      ),
    },
    {
      key: 'jobPostings',
      header: 'Active Jobs',
      sortable: true,
      render: (val) => <span className="font-medium text-slate-300">{String(val)} postings</span>,
    },
    {
      key: 'hiresCount',
      header: 'Total Hires',
      sortable: true,
      render: (val) => <span className="font-medium text-slate-300">{String(val)} candidates</span>,
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
    {
      key: 'joinedAt',
      header: 'Joined Date',
      sortable: true,
    },
  ];

  return (
    <PermissionGuard permission="users:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Recruiter Accounts"
          description="Manage talent acquisition partners, audit hiring activity, and verify corporate emails."
          badge="Recruiters"
          actions={
            <button
              onClick={() => alert('Add recruiter functionality...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
              Add Recruiter
            </button>
          }
        />

        <AdminDataTable
          data={mockRecruiters}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search recruiters..."
          searchKeys={['name', 'email', 'company', 'industry']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Review job listings for: ${row.company}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Job Postings"
              >
                💼
              </button>
              <button
                onClick={() => alert(`Review candidates hired by ${row.name}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Hires Audit"
              >
                📊
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
