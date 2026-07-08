'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockPrompts, Prompt } from '@/lib/admin-data';

export default function PromptsPage() {
  const columns: Column<Prompt>[] = [
    {
      key: 'name',
      header: 'Template Name',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white truncate max-w-xs">{String(val)}</p>
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {row.tags.map((tag) => (
              <span key={tag} className="text-[9px] font-mono bg-slate-800 text-slate-400 border border-slate-700 px-1 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
    },
    {
      key: 'model',
      header: 'Target Model',
      sortable: true,
      render: (val) => <span className="font-mono text-xs text-purple-400 font-semibold">{String(val)}</span>,
    },
    {
      key: 'usageCount',
      header: 'API Invocations',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{Number(val).toLocaleString()}</span>,
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
    <PermissionGuard permission="prompts:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Prompt Template Library"
          description="Build, test, and release system guidelines and template patterns for LLM tasks."
          badge="AI Prompts"
          actions={
            <button
              onClick={() => alert('Creating prompt template...')}
              className="btn-primary"
            >
              Add Template
            </button>
          }
        />

        <AdminDataTable
          data={mockPrompts}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search templates by title or tags..."
          searchKeys={['name', 'category']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Sytem prompt content:\n\n${row.prompt}`)}
                className="btn-ghost p-1.5 rounded border border-slate-800 bg-slate-900/50 text-xs font-semibold hover:bg-slate-800"
              >
                Inspect
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
