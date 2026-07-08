'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockKnowledgeBase, KnowledgeBaseDoc } from '@/lib/admin-data';

export default function KnowledgeBasePage() {
  const columns: Column<KnowledgeBaseDoc>[] = [
    {
      key: 'title',
      header: 'Document Name',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white truncate max-w-xs">{String(val)}</p>
          <p className="text-xs text-slate-400 mt-0.5">Source: <span className="capitalize">{row.source}</span></p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
    },
    {
      key: 'tokens',
      header: 'Vector tokens',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{Number(val).toLocaleString()} tokens</span>,
    },
    {
      key: 'usedInChats',
      header: 'Retrievals',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{Number(val).toLocaleString()} times</span>,
    },
    {
      key: 'status',
      header: 'Index Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'indexed' ? 'bg-positive/10 text-positive' : status === 'processing' ? 'bg-info/10 text-info' : 'bg-danger/10 text-danger';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
  ];

  return (
    <PermissionGuard permission="knowledge_base:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="RAG Knowledge Base"
          description="Index local PDF/TXT documents, fetch remote URLs, and feed context models for AI Tutor Q&A sessions."
          badge="Vector Search"
          actions={
            <button
              onClick={() => alert('Uploading PDF vector document...')}
              className="btn-primary"
            >
              Add Document
            </button>
          }
        />

        <AdminDataTable
          data={mockKnowledgeBase}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search vector index..."
          searchKeys={['title', 'category', 'source']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Re-indexing document vectors for: ${row.title}`)}
                className="btn-ghost p-1 rounded hover:bg-white/10"
                title="Re-Index vectors"
              >
                🔄
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
