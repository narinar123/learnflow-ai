'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockLessons, Lesson } from '@/lib/admin-data';

export default function LessonsPage() {
  const columns: Column<Lesson>[] = [
    {
      key: 'title',
      header: 'Lesson Title',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white truncate max-w-xs">{String(val)}</p>
          <p className="text-xs text-slate-400 mt-0.5">{row.course} · {row.module}</p>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
      render: (val) => {
        const type = String(val);
        const icon = type === 'video' ? '🎥' : type === 'article' ? '📄' : type === 'quiz' ? '❓' : type === 'live' ? '🔴' : '📁';
        return (
          <span className="flex items-center gap-1 text-xs capitalize text-slate-300">
            <span>{icon}</span> {type}
          </span>
        );
      },
    },
    {
      key: 'duration',
      header: 'Duration',
      sortable: true,
    },
    {
      key: 'views',
      header: 'Views',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{Number(val).toLocaleString()}</span>,
    },
    {
      key: 'completionRate',
      header: 'Completion Rate',
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
    <PermissionGuard permission="lessons:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Lessons Directory"
          description="Manage, schedule, and review video, article, live, and quiz lessons."
          badge="Lessons"
          actions={
            <button
              onClick={() => alert('Creating new lesson...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Lesson
            </button>
          }
        />

        <AdminDataTable
          data={mockLessons}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search lessons..."
          searchKeys={['title', 'course', 'module', 'type']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Edit lesson content: ${row.title}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Edit Content"
              >
                📝
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
