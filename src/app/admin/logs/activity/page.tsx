'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockActivityLogs, ActivityLog } from '@/lib/admin-data';

export default function ActivityLogsPage() {
  const columns: Column<ActivityLog>[] = [
    {
      key: 'timestamp',
      header: 'Time',
      sortable: true,
      render: (val) => <span className="text-slate-400 font-mono text-xs">{new Date(String(val)).toLocaleTimeString()}</span>,
    },
    {
      key: 'user',
      header: 'User',
      sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-semibold text-white">{row.user}</p>
          <span className="text-[10px] font-semibold text-slate-500 uppercase">{row.userType}</span>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      sortable: true,
      render: (val) => {
        const action = String(val);
        const color = action.includes('COMPLETE') ? 'text-positive' : action.includes('UPLOAD') ? 'text-info' : 'text-slate-300';
        return <span className={`font-mono text-xs font-semibold ${color}`}>{action}</span>;
      },
    },
    {
      key: 'page',
      header: 'Viewed Path',
      sortable: true,
      render: (val) => <span className="font-mono text-xs text-slate-400">{String(val)}</span>,
    },
    {
      key: 'duration',
      header: 'Time Spent',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{String(val)}s</span>,
    },
    {
      key: 'device',
      header: 'Client Platform',
      sortable: true,
    },
  ];

  return (
    <PermissionGuard permission="activity_logs:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="User Activity Feed"
          description="Live stream tracking student navigations, lesson duration, quiz attempts, and sessions."
          badge="Activity Stream"
        />

        <AdminDataTable
          data={mockActivityLogs}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search activity stream by user, page path, action..."
          searchKeys={['user', 'page', 'action', 'device']}
        />
      </div>
    </PermissionGuard>
  );
}
