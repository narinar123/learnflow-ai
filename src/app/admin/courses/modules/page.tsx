'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockModules, Module } from '@/lib/admin-data';

export default function ModulesPage() {
  const columns: Column<Module>[] = [
    {
      key: 'title',
      header: 'Module Name',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white truncate max-w-xs">{String(val)}</p>
          <p className="text-xs text-slate-400 mt-0.5">{row.course}</p>
        </div>
      ),
    },
    {
      key: 'lessonsCount',
      header: 'Lessons Count',
      sortable: true,
      render: (val) => <span className="font-medium text-slate-300">{String(val)} lessons</span>,
    },
    {
      key: 'duration',
      header: 'Estimated Duration',
      sortable: true,
    },
    {
      key: 'completionRate',
      header: 'Avg. Completion Rate',
      sortable: true,
      render: (val) => <span className="font-semibold text-positive">{String(val)}%</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'published' ? 'bg-positive/10 text-positive' : 'bg-warning/10 text-warning';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
  ];

  return (
    <PermissionGuard permission="modules:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Curriculum Modules"
          description="Structure course chapters, assign lesson sequences, and track chapter completion metrics."
          badge="Modules"
          actions={
            <button
              onClick={() => alert('Creating new module...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Module
            </button>
          }
        />

        <AdminDataTable
          data={mockModules}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search modules..."
          searchKeys={['title', 'course']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Reorder lessons in: ${row.title}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Reorder Sequence"
              >
                ↕️
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
