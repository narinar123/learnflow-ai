'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockCertificates, Certificate } from '@/lib/admin-data';

export default function CertificatesPage() {
  const columns: Column<Certificate>[] = [
    {
      key: 'credentialId',
      header: 'Credential ID',
      sortable: true,
      render: (val) => <span className="font-mono text-xs text-slate-400">{String(val)}</span>,
    },
    {
      key: 'studentName',
      header: 'Recipient Student',
      sortable: true,
    },
    {
      key: 'courseName',
      header: 'Course Completed',
      sortable: true,
    },
    {
      key: 'issuedAt',
      header: 'Issued Date',
      sortable: true,
    },
    {
      key: 'expiresAt',
      header: 'Expiration Date',
      sortable: true,
      render: (val) => <span className="text-slate-500">{val ? String(val) : 'Never'}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'valid' ? 'bg-positive/10 text-positive' : status === 'expired' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
    {
      key: 'downloadCount',
      header: 'Downloads',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-400">{String(val)} times</span>,
    },
  ];

  return (
    <PermissionGuard permission="certificates:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Certificates Directory"
          description="Track issued credentials, verify digital signatures, or revoke certificates for violation."
          badge="Credentials"
          actions={
            <button
              onClick={() => alert('Issuing manual certificate...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M12 15l-2 5L12 18l2 2-2-5zM5 3H19a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
              </svg>
              Issue Certificate
            </button>
          }
        />

        <AdminDataTable
          data={mockCertificates}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search certificates by student, course, or credential id..."
          searchKeys={['studentName', 'courseName', 'credentialId']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Revoking certificate: ${row.credentialId}`)}
                className="btn-ghost p-1.5 rounded text-danger hover:bg-danger/10"
                title="Revoke Certificate"
              >
                🚫
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
