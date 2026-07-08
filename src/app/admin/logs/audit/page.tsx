'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockAuditLogs, AuditLog } from '@/lib/admin-data';

export default function AuditLogsPage() {
  const columns: Column<AuditLog>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (val) => <span className="text-slate-400 font-mono text-xs">{new Date(String(val)).toLocaleString()}</span>,
    },
    {
      key: 'actor',
      header: 'Actor',
      sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-semibold text-white">{row.actor}</p>
          <p className="text-[10px] text-slate-500 font-mono capitalize">Role: {row.actorRole.replace('_', ' ')}</p>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Event Name',
      sortable: true,
      render: (val) => <span className="font-mono text-xs text-purple-400 font-semibold">{String(val)}</span>,
    },
    {
      key: 'details',
      header: 'Operational Details',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="text-xs text-slate-300 leading-relaxed truncate max-w-sm" title={String(val)}>{String(val)}</p>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{row.resource} #{row.resourceId}</p>
        </div>
      ),
    },
    {
      key: 'severity',
      header: 'Severity',
      sortable: true,
      render: (val) => {
        const severity = String(val);
        const color = severity === 'critical' ? 'bg-danger/10 text-danger border-danger/20' : severity === 'warning' ? 'bg-warning/10 text-warning border-warning/20' : 'bg-slate-500/10 text-slate-400 border-slate-700/20';
        return <span className={`px-2 py-0.5 rounded border text-[10px] uppercase font-bold ${color}`}>{severity}</span>;
      },
    },
    {
      key: 'ipAddress',
      header: 'IP / Network',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-mono text-xs text-slate-400">{String(val)}</p>
          <p className="text-[9px] text-slate-600 truncate max-w-[100px]" title={row.userAgent}>{row.userAgent}</p>
        </div>
      ),
    },
  ];

  return (
    <PermissionGuard permission="audit_logs:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="System Audit Trail"
          description="Tamper-proof chronological records showing structural modifications, role modifications, and admin actions."
          badge="Compliance Logs"
        />

        <AdminDataTable
          data={mockAuditLogs}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search audit events by actor, action, details..."
          searchKeys={['actor', 'action', 'details', 'resource']}
        />
      </div>
    </PermissionGuard>
  );
}
