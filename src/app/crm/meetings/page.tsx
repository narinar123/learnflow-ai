'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { Meeting } from '@/lib/crmData';

export default function MeetingsPage() {
  const { meetings, addMeeting, completeMeeting } = useCRM();
  
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Scheduled' | 'Completed'>('Scheduled');
  
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('30');
  const [type, setType] = useState<'Demo' | 'Discovery' | 'Proposal Review' | 'Onboarding' | 'General'>('Discovery');
  const [relatedTo, setRelatedTo] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Filter meetings
  const filteredMeetings = meetings.filter(mtg => {
    return filter === 'All' || mtg.status === filter;
  });

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addMeeting({
      title,
      description,
      date: date || new Date().toISOString().split('T')[0],
      time: time || '10:00',
      duration: Number(duration),
      type,
      relatedTo: relatedTo || 'General Partner Lead',
      meetingLink: 'https://meet.google.com/crm-' + Math.random().toString(36).substring(2, 7)
    });
    setAddModalOpen(false);
    // Reset Form
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setDuration('30');
    setRelatedTo('');
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white font-display">Meetings Scheduler</h1>
          <p className="text-slate-400 text-xs mt-1">
            Book discovery calls, custom platform walkthroughs, and contract reviews.
          </p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-indigo-600/10"
        >
          📅 Schedule Meeting
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calendar visual (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Calendar Grid Simulation */}
          <div className="bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4 border-b border-slate-850 pb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">July 2026 Calendar Block</span>
              <span className="text-[10px] text-slate-500 font-bold">Standard Timezone (IST)</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-500 mb-2 uppercase">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
            
            <div className="grid grid-cols-7 gap-1 bg-[#111524]/40 border border-slate-850 p-2.5 rounded-xl">
              {/* Dummy days to pad start of July 2026 (Wednesday) */}
              <div className="h-10 text-slate-700 flex items-center justify-center">29</div>
              <div className="h-10 text-slate-700 flex items-center justify-center">30</div>
              
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const formattedDay = day < 10 ? `0${day}` : `${day}`;
                const dayMeetings = meetings.filter(m => m.date === `2026-07-${formattedDay}`);
                
                return (
                  <div
                    key={day}
                    className={`h-10 relative flex flex-col items-center justify-center rounded-lg border border-transparent hover:border-slate-800 transition-all
                      ${dayMeetings.length > 0 ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' : 'text-slate-400'}
                      ${day === 7 ? 'bg-slate-900 border-slate-700/80 font-extrabold text-white' : ''}`}
                  >
                    <span>{day}</span>
                    {dayMeetings.length > 0 && (
                      <span className="absolute bottom-1 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filter toggle */}
          <div className="bg-[#0A0D16] border border-slate-800/60 p-4 rounded-2xl flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scheduled Syncs</span>
            <div className="flex bg-[#111625] p-1 border border-slate-800 rounded-xl">
              {(['Scheduled', 'Completed', 'All'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all
                    ${filter === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Meetings List */}
          <div className="space-y-3.5">
            {filteredMeetings.length > 0 ? (
              filteredMeetings.map(mtg => (
                <div
                  key={mtg.id}
                  className={`p-4 rounded-2xl bg-[#0A0D16] border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all
                    ${mtg.status === 'Completed' ? 'border-slate-850/60 opacity-60' : 'border-slate-800 hover:border-slate-700/80'}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-200">{mtg.title}</h4>
                      <span className="text-[9px] px-2 py-0.5 bg-slate-900 border border-slate-850 rounded text-slate-400">
                        {mtg.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">{mtg.description}</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-1">
                      <span>📅 {mtg.date} at {mtg.time}</span>
                      <span>·</span>
                      <span>⏱️ Duration: {mtg.duration} mins</span>
                      <span>·</span>
                      <span>🔗 Ref: <span className="font-semibold text-indigo-400">{mtg.relatedTo}</span></span>
                    </div>
                  </div>

                  {mtg.status === 'Scheduled' && (
                    <div className="flex items-center gap-2 flex-shrink-0 pt-2 md:pt-0 border-t border-slate-850/60 md:border-t-0">
                      <a
                        href={mtg.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-550 text-white font-bold rounded-xl text-[10px] transition-colors"
                      >
                        🎥 Join Call
                      </a>
                      <button
                        onClick={() => {
                          completeMeeting(mtg.id);
                          alert(`Meeting "${mtg.title}" marked as completed.`);
                        }}
                        className="px-3 py-1.5 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-[10px]"
                      >
                        ✓ Done
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-8 bg-[#0A0D16] border border-slate-800/60 rounded-2xl text-center text-slate-500 text-xs">
                No meetings booked in this filter.
              </div>
            )}
          </div>

        </div>

        {/* Meeting metrics (Right 1 col) */}
        <div className="space-y-6">
          <div className="bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-850 pb-2">
              Monthly Analytics
            </h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-slate-850/40 pb-2">
                <span className="text-slate-500">Upcoming Syncs:</span>
                <span className="text-slate-200 font-bold">{meetings.filter(m => m.status === 'Scheduled').length} calls</span>
              </div>
              <div className="flex justify-between border-b border-slate-850/40 pb-2">
                <span className="text-slate-500">Completed Sessions:</span>
                <span className="text-slate-200 font-bold">{meetings.filter(m => m.status === 'Completed').length} calls</span>
              </div>
              <div className="flex justify-between border-b border-slate-850/40 pb-2">
                <span className="text-slate-500">Average Duration:</span>
                <span className="text-slate-200 font-bold">42 mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Meeting Hours:</span>
                <span className="text-indigo-400 font-bold">
                  {(meetings.reduce((sum, m) => sum + m.duration, 0) / 60).toFixed(1)} hrs
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ─── SCHEDULE MEETING DIALOG ─── */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">📅 Schedule Meeting</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <form onSubmit={handleCreateMeeting} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Meeting Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., Discovery sync with Zomato HR"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Agenda / Details</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="E.g., Brief review of candidate match features..."
                  rows={2}
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="15">15 mins</option>
                    <option value="30">30 mins</option>
                    <option value="45">45 mins</option>
                    <option value="60">60 mins</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Meeting Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="Discovery">Discovery</option>
                    <option value="Demo">Platform Demo</option>
                    <option value="Proposal Review">Proposal Review</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Onboarding">Onboarding</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Related Lead/Company</label>
                <input
                  type="text"
                  value={relatedTo}
                  onChange={(e) => setRelatedTo(e.target.value)}
                  placeholder="E.g., Zomato Media"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-855 text-slate-400 hover:text-white rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold"
                >
                  Schedule Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
