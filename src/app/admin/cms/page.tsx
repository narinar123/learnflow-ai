'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PermissionGuard from '@/components/admin/PermissionGuard';

interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  lastUpdated: string;
  views: number;
}

export default function CmsPage() {
  const pages: PageItem[] = [
    { id: '1', title: 'Landing Page v2.0', slug: '/', status: 'published', lastUpdated: '2026-07-01', views: 24500 },
    { id: '2', title: 'Privacy Policy', slug: '/privacy', status: 'published', lastUpdated: '2025-12-15', views: 1890 },
    { id: '3', title: 'Enterprise Plans Landing', slug: '/enterprise', status: 'published', lastUpdated: '2026-06-28', views: 8900 },
    { id: '4', title: 'Black Friday Campaign Page', slug: '/blackfriday', status: 'draft', lastUpdated: '2026-07-06', views: 0 },
    { id: '5', title: 'Terms of Service', slug: '/terms', status: 'published', lastUpdated: '2025-12-15', views: 1400 },
  ];

  return (
    <PermissionGuard permission="cms:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="CMS Page Builder"
          description="Build, configure, publish, and edit platform landing pages and compliance policies."
          badge="CMS"
          actions={
            <button
              onClick={() => alert('Launching page designer...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Page
            </button>
          }
        />

        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(108,71,255,0.15)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b" style={{ borderColor: 'rgba(108,71,255,0.1)' }}>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Page Name</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Slug</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Views</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Last Updated</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-white/[0.01] transition-colors" style={{ borderColor: 'rgba(108,71,255,0.05)' }}>
                    <td className="px-6 py-4 font-semibold text-white">{p.title}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{p.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                        p.status === 'published' ? 'bg-positive/10 text-positive' : 'bg-warning/10 text-warning'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-300">{p.views.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-400">{p.lastUpdated}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => alert(`Launching designer for: ${p.title}`)}
                        className="btn-ghost px-3 py-1.5 rounded-lg border border-purple-500/20 text-purple-400 text-xs font-semibold hover:bg-purple-500/10"
                      >
                        Designer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
}
