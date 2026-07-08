'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockCourses, Course } from '@/lib/admin-data';

export default function CoursesPage() {
  const columns: Column<Course>[] = [
    {
      key: 'title',
      header: 'Course Title',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white truncate max-w-xs">{String(val)}</p>
          <p className="text-xs text-slate-400 mt-0.5">{row.category} · Lvl: {row.level}</p>
        </div>
      ),
    },
    {
      key: 'trainer',
      header: 'Instructor',
      sortable: true,
    },
    {
      key: 'students',
      header: 'Enrolled Students',
      sortable: true,
      render: (val) => <span className="font-medium text-slate-300">{Number(val).toLocaleString()}</span>,
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      render: (val) => <span className="font-semibold text-warning">⭐ {Number(val) > 0 ? Number(val).toFixed(1) : 'No reviews'}</span>,
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      render: (val, row) => <span className="font-semibold text-white">{row.isFree ? 'Free' : `$${val}`}</span>,
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
        const color = status === 'published' ? 'bg-positive/10 text-positive' : status === 'review' ? 'bg-info/10 text-info' : status === 'draft' ? 'bg-warning/10 text-warning' : 'bg-slate-500/10 text-slate-400';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
  ];

  return (
    <PermissionGuard permission="courses:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Courses Directory"
          description="Manage, review, publish, and audit courses. Set monetization configurations."
          badge="Courses"
          actions={
            <button
              onClick={() => alert('Creating a new course...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Course
            </button>
          }
        />

        <AdminDataTable
          data={mockCourses}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search courses..."
          searchKeys={['title', 'category', 'trainer']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Reviewing syllabus for: ${row.title}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Syllabus Builder"
              >
                🛠️
              </button>
              <button
                onClick={() => alert(`Publish/Unpublish action: ${row.title}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Publish status"
              >
                🌐
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
