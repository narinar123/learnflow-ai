'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockPayments, Payment } from '@/lib/admin-data';

export default function PaymentsPage() {
  const columns: Column<Payment>[] = [
    {
      key: 'id',
      header: 'Transaction ID',
      sortable: true,
      render: (val) => <span className="font-mono text-xs text-slate-400">{String(val)}</span>,
    },
    {
      key: 'studentName',
      header: 'Customer',
      sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-semibold text-white">{row.studentName}</p>
          <p className="text-xs text-slate-400">{row.studentEmail}</p>
        </div>
      ),
    },
    {
      key: 'item',
      header: 'Item Purchased',
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (val, row) => <span className="font-semibold text-white">${Number(val).toFixed(2)} {row.currency}</span>,
    },
    {
      key: 'method',
      header: 'Method',
      sortable: true,
      render: (val) => <span className="capitalize text-slate-300 font-medium">{String(val).replace('_', ' ')}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'succeeded' ? 'bg-positive/10 text-positive' : status === 'refunded' ? 'bg-warning/10 text-warning' : status === 'pending' ? 'bg-info/10 text-info' : 'bg-danger/10 text-danger';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
    {
      key: 'createdAt',
      header: 'Date / Time',
      sortable: true,
      render: (val) => <span className="text-slate-400 text-xs">{new Date(String(val)).toLocaleString()}</span>,
    },
  ];

  return (
    <PermissionGuard permission="payments:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Payment Transactions"
          description="Track incoming credit card and Paypal gateway collections. Action refunds."
          badge="Commerce"
        />

        <AdminDataTable
          data={mockPayments}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search transactions by ID, customer, item..."
          searchKeys={['id', 'studentName', 'studentEmail', 'item']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              {row.status === 'succeeded' && (
                <button
                  onClick={() => alert(`Refunding payment: ${row.id}`)}
                  className="btn-ghost px-2.5 py-1 rounded text-warning border border-warning/20 bg-warning/5 text-xs hover:bg-warning/10 font-semibold"
                >
                  Refund
                </button>
              )}
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
