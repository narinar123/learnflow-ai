'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockApiKeys, ApiKey } from '@/lib/admin-data';

export default function ApiKeysPage() {
  const columns: Column<ApiKey>[] = [
    {
      key: 'name',
      header: 'Key Name',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white">{String(val)}</p>
          <div className="flex gap-1 mt-1">
            {row.scopes.map((sc) => (
              <span key={sc} className="text-[9px] font-mono bg-slate-800 text-slate-400 px-1 py-0.5 rounded border border-slate-700">
                {sc}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'key',
      header: 'API Token',
      sortable: true,
      render: (val) => <span className="font-mono text-xs text-slate-400">{String(val)}</span>,
    },
    {
      key: 'requestCount',
      header: 'Total Calls',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{Number(val).toLocaleString()} requests</span>,
    },
    {
      key: 'createdAt',
      header: 'Created On',
      sortable: true,
    },
    {
      key: 'lastUsed',
      header: 'Last Used',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'active' ? 'bg-positive/10 text-positive' : status === 'expired' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
  ];

  return (
    <PermissionGuard permission="api_keys:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Developer API Keys"
          description="Provision cryptographic secrets to query courses and user profiles from external services."
          badge="Credentials"
          actions={
            <button
              onClick={() => alert('Generating new API secret...')}
              className="btn-primary"
            >
              Generate Secret Key
            </button>
          }
        />

        <AdminDataTable
          data={mockApiKeys}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search keys..."
          searchKeys={['name', 'key']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              {row.status === 'active' && (
                <button
                  onClick={() => alert(`Revoking key: ${row.name}`)}
                  className="btn-ghost p-1.5 rounded text-danger hover:bg-danger/10"
                  title="Revoke Key"
                >
                  🚫
                </button>
              )}
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
