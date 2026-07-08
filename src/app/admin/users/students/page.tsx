'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockStudents, Student } from '@/lib/admin-data';

export default function StudentsPage() {
  const columns: Column<Student>[] = [
    {
      key: 'name',
      header: 'Student',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800" />
          <div>
            <p className="font-semibold text-white">{row.name}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'level',
      header: 'Level',
      sortable: true,
      render: (val, row) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-white">Lvl {String(val)}</span>
          <span className="text-[10px] text-slate-500">{row.xpPoints} XP</span>
        </div>
      ),
    },
    {
      key: 'coursesEnrolled',
      header: 'Courses',
      sortable: true,
      render: (_, row) => (
        <span className="font-medium text-slate-300">
          {row.coursesCompleted} / {row.coursesEnrolled} Completed
        </span>
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      sortable: true,
      render: (val) => {
        const plan = String(val);
        const color = plan === 'Enterprise' ? 'bg-amber-500/10 text-amber-400' : plan === 'Pro' ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-500/10 text-slate-400';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>{plan}</span>;
      },
    },
    {
      key: 'country',
      header: 'Country',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'active' ? 'bg-positive/10 text-positive' : status === 'suspended' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning';
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
          title="Students Directory"
          description="View, manage, and audit student accounts, course progress, and membership tiers."
          badge="Students"
          actions={
            <button
              onClick={() => alert('Add student functionality...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
              Add Student
            </button>
          }
        />

        <AdminDataTable
          data={mockStudents}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search students by name or email..."
          searchKeys={['name', 'email', 'country']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Editing student: ${row.name}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
              >
                📝
              </button>
              <button
                onClick={() => alert(`Suspending/Activating: ${row.name}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
              >
                🔒
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
