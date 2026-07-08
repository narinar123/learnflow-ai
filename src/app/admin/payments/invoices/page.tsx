'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockInvoices, Invoice } from '@/lib/admin-data';

export default function InvoicesPage() {
  const columns: Column<Invoice>[] = [
    {
      key: 'invoiceNumber',
      header: 'Invoice Number',
      sortable: true,
      render: (val) => <span className="font-mono font-bold text-white">{String(val)}</span>,
    },
    {
      key: 'customerName',
      header: 'Customer',
      sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-semibold text-white">{row.customerName}</p>
          <p className="text-xs text-slate-400">{row.customerEmail}</p>
        </div>
      ),
    },
    {
      key: 'total',
      header: 'Total Amount',
      sortable: true,
      render: (val) => <span className="font-semibold text-white">${Number(val).toFixed(2)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'paid' ? 'bg-positive/10 text-positive' : status === 'pending' ? 'bg-info/10 text-info' : status === 'overdue' ? 'bg-danger/10 text-danger' : 'bg-slate-500/10 text-slate-400';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
    {
      key: 'issuedAt',
      header: 'Issued Date',
      sortable: true,
    },
    {
      key: 'dueAt',
      header: 'Due Date',
      sortable: true,
    },
  ];

  return (
    <PermissionGuard permission="invoices:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Invoices Manager"
          description="Oversee enterprise and individual receipts. Download, issue, or mark unpaid invoices."
          badge="Invoices"
          actions={
            <button
              onClick={() => alert('Generating new custom invoice...')}
              className="btn-primary"
            >
              Generate Invoice
            </button>
          }
        />

        <AdminDataTable
          data={mockInvoices}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search invoices..."
          searchKeys={['invoiceNumber', 'customerName', 'customerEmail']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Downloading PDF for invoice: ${row.invoiceNumber}`)}
                className="btn-ghost p-1.5 rounded hover:bg-white/10"
                title="Download PDF"
              >
                📥
              </button>
            </div>
          )}
        />
      </div>
    </PermissionGuard>
  );
}
