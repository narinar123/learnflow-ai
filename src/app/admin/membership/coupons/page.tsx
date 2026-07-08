'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockCoupons, Coupon } from '@/lib/admin-data';

export default function CouponsPage() {
  const columns: Column<Coupon>[] = [
    {
      key: 'code',
      header: 'Promo Code',
      sortable: true,
      render: (val) => <span className="font-mono font-bold text-white bg-slate-800 px-2.5 py-1 rounded border border-slate-700">{String(val)}</span>,
    },
    {
      key: 'type',
      header: 'Discount Value',
      sortable: true,
      render: (_, row) => {
        const valueStr = row.type === 'percentage' ? `${row.value}% OFF` : `$${row.value} OFF`;
        return <span className="font-semibold text-positive">{valueStr}</span>;
      },
    },
    {
      key: 'usedCount',
      header: 'Redemptions',
      sortable: true,
      render: (_, row) => (
        <span className="font-mono text-slate-300">
          {row.usedCount} / {row.usageLimit} used
        </span>
      ),
    },
    {
      key: 'minPurchase',
      header: 'Min Purchase',
      sortable: true,
      render: (val) => <span className="text-slate-400">{Number(val) > 0 ? `$${val}` : 'No minimum'}</span>,
    },
    {
      key: 'applicableTo',
      header: 'Applies To',
      sortable: true,
      render: (val) => <span className="capitalize text-slate-300">{String(val)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'active' ? 'bg-positive/10 text-positive' : status === 'expired' ? 'bg-danger/10 text-danger' : 'bg-slate-500/10 text-slate-400';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
    {
      key: 'expiresAt',
      header: 'Expiration Date',
      sortable: true,
    },
  ];

  return (
    <PermissionGuard permission="coupons:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Promo Coupons"
          description="Create marketing campaigns, set discount rules, limit redemptions, and schedule validity window."
          badge="Commerce"
          actions={
            <button
              onClick={() => alert('Creating new coupon...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Coupon
            </button>
          }
        />

        <AdminDataTable
          data={mockCoupons}
          columns={columns}
          keyField="id"
          searchPlaceholder="Search coupons by code..."
          searchKeys={['code', 'applicableTo']}
          actions={(row) => (
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => alert(`Disable/Delete coupon: ${row.code}`)}
                className="btn-ghost p-1.5 rounded text-danger hover:bg-danger/10"
                title="Disable Coupon"
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
