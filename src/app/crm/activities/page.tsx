'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';

export default function ActivitiesPage() {
  const { activities, logActivity } = useCRM();
  
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Call' | 'Email' | 'Meeting' | 'Workflow' | 'System'>('All');
  
  // Custom manual logger state
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [type, setType] = useState<'Call' | 'Email' | 'Meeting' | 'Note'>('Note');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [related, setRelated] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Filter activities
  const filteredActivities = activities.filter(act => {
    return filter === 'All' || act.type === filter;
  });

  const handleManualLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) return;
    
    logActivity(
      type === 'Note' ? 'Note' : type,
      title,
      desc,
      related || undefined
    );
    setLogModalOpen(false);
    setTitle('');
    setDesc('');
    setRelated('');
    alert('📝 Custom CRM touchpoint logged successfully.');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white font-display">Touchpoints Log</h1>
          <p className="text-slate-400 text-xs mt-1">
            Chronological audit trail of all manual sales interactions and background automation triggers.
          </p>
        </div>
        <button
          onClick={() => setLogModalOpen(true)}
          className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-indigo-600/10"
        >
          📝 Log Activity
        </button>
      </div>

      {/* Filters row */}
      <div className="bg-[#0A0D16] border border-slate-800/60 p-4 rounded-2xl flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Touchpoint Filters</span>
        <div className="flex flex-wrap bg-[#111625] p-1 border border-slate-800 rounded-xl gap-1">
          {(['All', 'Call', 'Email', 'Meeting', 'Workflow', 'System'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                ${filter === tab ? 'bg-indigo-650 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="space-y-6 relative border-l border-slate-800 pl-6 ml-3 mt-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map(act => (
            <div key={act.id} className="relative group">
              {/* Floating dot indicator */}
              <div className={`absolute -left-9.5 top-0.5 w-7 h-7 rounded-lg flex items-center justify-center text-xs border
                ${act.type === 'Call' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                  act.type === 'Email' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                  act.type === 'Meeting' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                  act.type === 'Workflow' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                  'bg-slate-900 text-slate-400 border-slate-800'}`}>
                {act.type === 'Call' ? '📞' : act.type === 'Email' ? '✉️' : act.type === 'Meeting' ? '🎥' : act.type === 'Workflow' ? '⚡' : '📜'}
              </div>

              <div className="bg-[#0A0D16] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{act.title}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Logged by {act.user} · Ref: <span className="font-semibold text-indigo-400">{act.relatedTo || 'General'}</span></p>
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium">
                    {new Date(act.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-body">
                  {act.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 bg-[#0A0D16] border border-slate-800/60 rounded-2xl text-center text-slate-500 text-xs">
            No events found in this category log.
          </div>
        )}
      </div>

      {/* ─── LOG ACTIVITY DIALOG ─── */}
      {logModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">📝 Log Client Interaction</h3>
              <button onClick={() => setLogModalOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <form onSubmit={handleManualLog} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Action Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="Note">Note / Update</option>
                    <option value="Call">Phone Call</option>
                    <option value="Email">Email sent</option>
                    <option value="Meeting">Meeting completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Related Lead/Company</label>
                  <input
                    type="text"
                    value={related}
                    onChange={(e) => setRelated(e.target.value)}
                    placeholder="E.g., Infosys"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Action Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., Proposal review call"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Conversation Summary *</label>
                <textarea
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Summarize client feedback, follow-up decisions..."
                  rows={3}
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLogModalOpen(false)}
                  className="px-4 py-2 border border-slate-855 text-slate-400 hover:text-white rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold"
                >
                  Log Interaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
