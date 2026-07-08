'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockCategories, Category } from '@/lib/admin-data';

export default function CategoriesPage() {
  const columns: Column<Category>[] = [
    {
      key: 'name',
      header: 'Category Name',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <span className="text-xl bg-slate-800 p-2 rounded-xl border border-slate-700">{row.icon}</span>
          <div>
            <p className="font-semibold text-white">{row.name}</p>
            <p className="text-xs text-slate-400 font-mono">/{row.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'coursesCount',
      header: 'Courses Count',
      sortable: true,
      render: (val) => <span className="font-medium text-slate-300">{String(val)} courses</span>,
    },
    {
      key: 'studentsCount',
      header: 'Enrolled Students',
      sortable: true,
      render: (val) => <span className="font-medium text-slate-300">{Number(val).toLocaleString()} students</span>,
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
    <PermissionGuard permission="categories:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Course Categories"
          description="Create, structure, and categorize curricula areas. Organize pathways."
          badge="Categories"
          actions={
            <button
              onClick={() => alert('Creating new category...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Category
            </button>
          }
        />

        <AdminDataTable
          data={mockCategories}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search categories..."
          searchKeys={['name', 'slug']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Edit category: ${row.name}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Edit"
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
