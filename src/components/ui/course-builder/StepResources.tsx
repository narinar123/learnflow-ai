'use client';

import React, { useState } from 'react';
import { sampleResources, type Resource, type ResourceType } from '@/lib/course-data';

interface StepResourcesProps {
  resources: Resource[];
  onChange: (resources: Resource[]) => void;
}

const typeConfig: Record<ResourceType, { label: string; icon: React.ReactNode; color: string }> = {
  pdf: { label: 'PDF', color: 'text-red-400 bg-red-500/10', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
  video: { label: 'Video', color: 'text-primary bg-primary/10', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg> },
  zip: { label: 'ZIP', color: 'text-amber-400 bg-amber-500/10', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg> },
  link: { label: 'Link', color: 'text-positive bg-positive/10', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg> },
  image: { label: 'Image', color: 'text-pink-400 bg-pink-500/10', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg> },
  code: { label: 'Code', color: 'text-cyan-400 bg-cyan-500/10', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg> },
  spreadsheet: { label: 'Sheet', color: 'text-green-400 bg-green-500/10', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg> },
};

const genId = () => `res_${Math.random().toString(36).slice(2, 9)}`;

export default function StepResources({ resources, onChange }: StepResourcesProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRes, setNewRes] = useState<Partial<Resource>>({
    type: 'pdf',
    title: '',
    url: '',
    description: '',
    downloadable: true,
  });
  const [filterType, setFilterType] = useState<ResourceType | 'all'>('all');

  const filteredResources = filterType === 'all'
    ? resources
    : resources.filter((r) => r.type === filterType);

  const addResource = () => {
    if (!newRes.title || !newRes.url) return;
    const resource: Resource = {
      id: genId(),
      courseId: 'current',
      title: newRes.title!,
      url: newRes.url!,
      type: newRes.type as ResourceType,
      description: newRes.description,
      downloadable: newRes.downloadable!,
      createdAt: new Date().toISOString().split('T')[0],
    };
    onChange([...resources, resource]);
    setNewRes({ type: 'pdf', title: '', url: '', description: '', downloadable: true });
    setShowAddForm(false);
  };

  const deleteResource = (id: string) => {
    onChange(resources.filter((r) => r.id !== id));
  };

  const toggleDownloadable = (id: string) => {
    onChange(resources.map((r) => r.id === id ? { ...r, downloadable: !r.downloadable } : r));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Resources</h2>
          <p className="text-sm text-muted-foreground">Attach files, links, and downloadable materials for your students.</p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="btn-primary text-sm py-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Resource
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total', value: resources.length, color: 'text-foreground' },
          { label: 'Downloadable', value: resources.filter(r => r.downloadable).length, color: 'text-primary' },
          { label: 'External Links', value: resources.filter(r => r.type === 'link').length, color: 'text-positive' },
          { label: 'Files', value: resources.filter(r => r.type !== 'link').length, color: 'text-warning' },
        ].map((stat) => (
          <div key={stat.label} className="card-base p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Type filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilterType('all')}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filterType === 'all' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
        >
          All
        </button>
        {(Object.keys(typeConfig) as ResourceType[]).map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filterType === t ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
          >
            {typeConfig[t].label}
          </button>
        ))}
      </div>

      {/* Add Resource Form */}
      {showAddForm && (
        <div className="card-base p-5 space-y-4 border-primary/30">
          <h3 className="text-sm font-semibold text-foreground">New Resource</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-text">Title</label>
              <input type="text" value={newRes.title} onChange={(e) => setNewRes({ ...newRes, title: e.target.value })} placeholder="Resource title..." className="input-field" />
            </div>
            <div>
              <label className="label-text">Type</label>
              <select value={newRes.type} onChange={(e) => setNewRes({ ...newRes, type: e.target.value as ResourceType })} className="input-field">
                {(Object.keys(typeConfig) as ResourceType[]).map((t) => <option key={t} value={t}>{typeConfig[t].label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label-text">URL / File Path</label>
            <input type="text" value={newRes.url} onChange={(e) => setNewRes({ ...newRes, url: e.target.value })} placeholder="https://... or /files/..." className="input-field" />
          </div>
          <div>
            <label className="label-text">Description (optional)</label>
            <textarea value={newRes.description} onChange={(e) => setNewRes({ ...newRes, description: e.target.value })} placeholder="Brief description of this resource..." className="input-field resize-none" rows={2} />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input type="checkbox" checked={newRes.downloadable} onChange={(e) => setNewRes({ ...newRes, downloadable: e.target.checked })} className="w-4 h-4 accent-primary" />
              Allow students to download
            </label>
            <div className="flex gap-2">
              <button onClick={() => setShowAddForm(false)} className="btn-outline text-xs py-2 px-4">Cancel</button>
              <button onClick={addResource} className="btn-primary text-xs py-2 px-4">Add Resource</button>
            </div>
          </div>
        </div>
      )}

      {/* Resources List */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 opacity-40">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-sm">No resources yet. Add files, PDFs, or links.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredResources.map((res) => {
            const conf = typeConfig[res.type];
            return (
              <div key={res.id} className="card-base p-4 flex items-center gap-4 group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${conf.color} shrink-0`}>
                  {conf.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{res.title}</p>
                  {res.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{res.description}</p>}
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${conf.color}`}>{conf.label}</span>
                    {res.size && <span className="text-[10px] text-muted-foreground">{res.size}</span>}
                    <span className="text-[10px] text-muted-foreground truncate">{res.url}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleDownloadable(res.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${res.downloadable ? 'bg-positive/10 text-positive' : 'bg-muted text-muted-foreground'}`}
                    title={res.downloadable ? 'Downloadable' : 'Not downloadable'}
                  >
                    {res.downloadable ? '⬇ Download' : '🔒 View Only'}
                  </button>
                  <button onClick={() => deleteResource(res.id)} className="btn-ghost p-1.5 opacity-0 group-hover:opacity-100 hover:text-danger transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
