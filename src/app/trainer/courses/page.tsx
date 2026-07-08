'use client';

import React from 'react';
import Link from 'next/link';
import { mockTrainerCourses } from '@/lib/trainer-data';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';

export default function TrainerCoursesPage() {
  const columns: Column<typeof mockTrainerCourses[0]>[] = [
    {
      key: 'title',
      header: 'Course Title',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white truncate max-w-xs">{String(val)}</p>
          <p className="text-xs text-slate-400 mt-0.5">{row.category} · Created: {row.createdAt}</p>
        </div>
      ),
    },
    {
      key: 'lessonsCount',
      header: 'Lessons',
      sortable: true,
    },
    {
      key: 'studentsCount',
      header: 'Students Enrolled',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{Number(val).toLocaleString()}</span>,
    },
    {
      key: 'rating',
      header: 'Avg Rating',
      sortable: true,
      render: (val) => <span className="font-semibold text-warning">⭐ {Number(val) > 0 ? Number(val).toFixed(1) : 'No reviews'}</span>,
    },
    {
      key: 'revenue',
      header: 'Net Earnings',
      sortable: true,
      render: (val) => <span className="font-semibold text-emerald-400">${Number(val).toLocaleString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : status === 'review' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-slate-800 text-slate-400 border-slate-700';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color} border`}>{status}</span>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-white">Course Manager</h1>
          <p className="text-sm text-slate-400">Design course structures, edit lesson details, and launch new content batches.</p>
        </div>
        <Link href="/trainer/courses/create" className="btn-primary">
          Create Course
        </Link>
      </div>

      <AdminDataTable
        data={mockTrainerCourses}
        columns={columns}
        keyField="id"
        searchPlaceholder="Search your courses..."
        searchKeys={['title', 'category']}
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <Link
              href={`/trainer/courses/create?id=${row.id}`}
              className="btn-ghost p-1 rounded hover:bg-white/10"
              title="Edit Curriculum"
            >
              🛠️
            </Link>
          </div>
        )}
      />
    </div>
  );
}
