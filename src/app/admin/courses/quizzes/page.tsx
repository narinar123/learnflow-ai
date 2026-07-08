'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockQuizzes, Quiz } from '@/lib/admin-data';

export default function QuizzesPage() {
  const columns: Column<Quiz>[] = [
    {
      key: 'title',
      header: 'Quiz Name',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white truncate max-w-xs">{String(val)}</p>
          <p className="text-xs text-slate-400 mt-0.5">{row.course}</p>
        </div>
      ),
    },
    {
      key: 'questions',
      header: 'Questions',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{String(val)} items</span>,
    },
    {
      key: 'attempts',
      header: 'Attempts',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{Number(val).toLocaleString()}</span>,
    },
    {
      key: 'avgScore',
      header: 'Average Score',
      sortable: true,
      render: (val) => <span className="font-semibold text-white">{String(val)}%</span>,
    },
    {
      key: 'passRate',
      header: 'Pass Rate',
      sortable: true,
      render: (val) => <span className="font-semibold text-positive">{String(val)}%</span>,
    },
    {
      key: 'timeLimit',
      header: 'Time Limit',
      sortable: true,
      render: (val) => <span className="text-slate-400">{String(val)} mins</span>,
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
    <PermissionGuard permission="quizzes:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Assessments & Quizzes"
          description="Design multiple choice quizzes, track scores, audit pass rates, and set grading criteria."
          badge="Assessments"
          actions={
            <button
              onClick={() => alert('Creating new quiz...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Quiz
            </button>
          }
        />

        <AdminDataTable
          data={mockQuizzes}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search quizzes..."
          searchKeys={['title', 'course']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Review quiz questions for: ${row.title}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Questions editor"
              >
                ✏️
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
