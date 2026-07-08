'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PermissionGuard from '@/components/admin/PermissionGuard';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'announcement' | 'notification';
  recipientsCount: number;
  status: 'sent' | 'scheduled' | 'draft';
  sentAt: string | null;
  scheduledFor: string | null;
  opens: number;
  clicks: number;
}

export default function MarketingPage() {
  const campaigns: Campaign[] = [
    { id: '1', name: 'July Platform Updates', type: 'email', recipientsCount: 42180, status: 'sent', sentAt: '2026-07-01 10:00', scheduledFor: null, opens: 14890, clicks: 3210 },
    { id: '2', name: 'New AI Features Launch Announcement', type: 'announcement', recipientsCount: 42180, status: 'sent', sentAt: '2026-06-15 14:00', scheduledFor: null, opens: 28400, clicks: 12000 },
    { id: '3', name: 'Stanford Corporate Cohort Welcome', type: 'email', recipientsCount: 4230, status: 'sent', sentAt: '2026-07-03 09:00', scheduledFor: null, opens: 3900, clicks: 2800 },
    { id: '4', name: 'August Promotion Campaign', type: 'email', recipientsCount: 15000, status: 'scheduled', sentAt: null, scheduledFor: '2026-08-01 09:00', opens: 0, clicks: 0 },
    { id: '5', name: 'Retargeting inactive students list', type: 'notification', recipientsCount: 8900, status: 'draft', sentAt: null, scheduledFor: null, opens: 0, clicks: 0 },
  ];

  return (
    <PermissionGuard permission="marketing:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Marketing Campaigns"
          description="Send global newsletter broadcasts, manage mailing lists, and audit email campaign engagement metrics."
          badge="Marketing"
          actions={
            <button
              onClick={() => alert('Launching campaign designer...')}
              className="btn-primary"
            >
              New Campaign
            </button>
          }
        />

        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(108,71,255,0.15)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b" style={{ borderColor: 'rgba(108,71,255,0.1)' }}>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Campaign Name</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Channel</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Recipients</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Timeline</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Performance</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => {
                  const openRate = c.recipientsCount > 0 && c.opens > 0 ? Math.round((c.opens / c.recipientsCount) * 100) : 0;
                  const clickRate = c.opens > 0 && c.clicks > 0 ? Math.round((c.clicks / c.opens) * 100) : 0;

                  return (
                    <tr key={c.id} className="border-b hover:bg-white/[0.01] transition-colors" style={{ borderColor: 'rgba(108,71,255,0.05)' }}>
                      <td className="px-6 py-4 font-semibold text-white">{c.name}</td>
                      <td className="px-6 py-4 capitalize text-slate-300">{c.type}</td>
                      <td className="px-6 py-4 font-mono text-slate-300">{c.recipientsCount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                          c.status === 'sent' ? 'bg-positive/10 text-positive' : c.status === 'scheduled' ? 'bg-info/10 text-info' : 'bg-slate-500/10 text-slate-400'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {c.status === 'sent' ? `Sent: ${c.sentAt}` : c.status === 'scheduled' ? `Sched: ${c.scheduledFor}` : 'Draft'}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {c.status === 'sent' ? (
                          <div className="flex gap-4">
                            <div>
                              <p className="text-[10px] text-slate-500 uppercase font-semibold">Opens</p>
                              <p className="font-bold text-white mt-0.5">{openRate}%</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-500 uppercase font-semibold">Clicks</p>
                              <p className="font-bold text-white mt-0.5">{clickRate}%</p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
}
