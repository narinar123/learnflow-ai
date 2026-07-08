'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PermissionGuard from '@/components/admin/PermissionGuard';

interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'pdf' | 'audio';
  size: string;
  dimensions?: string;
  uploadedAt: string;
  url: string;
}

export default function MediaPage() {
  const assets: MediaAsset[] = [
    { id: '1', name: 'landing_hero_background.jpg', type: 'image', size: '1.2 MB', dimensions: '1920x1080', uploadedAt: '2026-07-01', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400' },
    { id: '2', name: 'welcome_onboarding_video.mp4', type: 'video', size: '42.5 MB', uploadedAt: '2026-06-20', url: '' },
    { id: '3', name: 'python_cheatsheet_v3.pdf', type: 'pdf', size: '820 KB', uploadedAt: '2026-07-05', url: '' },
    { id: '4', name: 'ai_tutor_voice_demo.mp3', type: 'audio', size: '3.4 MB', uploadedAt: '2026-07-06', url: '' },
    { id: '5', name: 'brand_logo_white.png', type: 'image', size: '45 KB', dimensions: '512x512', uploadedAt: '2026-01-10', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400' },
    { id: '6', name: 'ml_course_thumbnail.jpg', type: 'image', size: '280 KB', dimensions: '800x600', uploadedAt: '2023-03-15', url: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=400' },
  ];

  return (
    <PermissionGuard permission="media:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Media & File Asset Library"
          description="Centralized cloud repository for course assets, compliance docs, logo resources, and audio demos."
          badge="Media"
          actions={
            <button
              onClick={() => alert('Uploading media files...')}
              className="btn-primary"
            >
              Upload Asset
            </button>
          }
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-purple-500/30 group bg-slate-900/40"
              style={{ borderColor: 'rgba(108,71,255,0.12)' }}
            >
              <div className="aspect-video relative bg-slate-950 flex items-center justify-center overflow-hidden">
                {asset.type === 'image' && asset.url ? (
                  <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <span className="text-3xl">
                    {asset.type === 'video' ? '🎥' : asset.type === 'pdf' ? '📄' : asset.type === 'audio' ? '🎵' : '📁'}
                  </span>
                )}
                <div className="absolute top-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-slate-300">
                  {asset.type}
                </div>
              </div>

              <div className="p-3">
                <p className="text-xs font-semibold text-white truncate" title={asset.name}>
                  {asset.name}
                </p>
                <div className="flex justify-between items-center mt-2 text-[10px] text-slate-500">
                  <span>{asset.size}</span>
                  {asset.dimensions && <span>{asset.dimensions}</span>}
                </div>
                <div className="flex gap-1.5 mt-3 pt-2.5 border-t border-slate-800">
                  <button
                    onClick={() => alert(`Copy URL: ${asset.name}`)}
                    className="btn-ghost flex-1 py-1 text-[10px] border border-slate-800 rounded bg-slate-950/20"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => alert(`Delete asset: ${asset.name}`)}
                    className="p-1 rounded text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PermissionGuard>
  );
}
