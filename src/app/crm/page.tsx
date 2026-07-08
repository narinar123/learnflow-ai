'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCRM } from './context/CRMContext';

export default function CRMDashboard() {
  const {
    leads,
    tasks,
    meetings,
    activities,
    invoices,
    toggleTask,
    completeMeeting
  } = useCRM();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh] text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-xs font-semibold">Loading CRM Intelligence...</p>
        </div>
      </div>
    );
  }

  // Calculations
  const activeLeads = leads.filter(l => l.status !== 'Won' && l.status !== 'Lost');
  const pipelineValue = leads
    .filter(l => l.status !== 'Lost')
    .reduce((sum, l) => sum + l.value, 0);

  const wonLeads = leads.filter(l => l.status === 'Won');
  const wonValue = wonLeads.reduce((sum, l) => sum + l.value, 0);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const paidInvoiced = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const pendingTasks = tasks.filter(t => t.status === 'Pending');
  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  const targetRevenue = 5000000; // 50 Lakhs Target
  const targetProgressPercent = Math.min(Math.round((wonValue / targetRevenue) * 100), 100);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* ─── TITLE & OVERVIEW CHIP ─── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-display">
            Global CRM Overview
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Real-time pipeline intelligence, client billing lifecycle, and operational activities.
          </p>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span>Target Period:</span>
          <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-lg">
            Q3 FY 2026
          </span>
        </div>
      </div>

      {/* ─── BENTO GRID STATS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Stat 1 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1322] to-[#0A0D16] border border-slate-800/80 p-5 shadow-lg shadow-indigo-500/5 group hover:border-slate-700/80 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Pipeline</span>
            <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-sm">💼</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white font-display">
              ₹{(pipelineValue / 100000).toFixed(1)}L
            </h3>
            <p className="text-[10px] text-slate-500">
              Across {leads.filter(l => l.status !== 'Lost').length} active opportunities
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1322] to-[#0A0D16] border border-slate-800/80 p-5 shadow-lg shadow-purple-500/5 group hover:border-slate-700/80 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Deals</span>
            <span className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-sm">⚡</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white font-display">
              {activeLeads.length} Leads
            </h3>
            <p className="text-[10px] text-indigo-400 font-semibold">
              ₹{(leads.filter(l => l.status === 'Proposal' || l.status === 'Negotiation').reduce((s, l) => s + l.value, 0) / 100000).toFixed(1)}L in negotiation
            </p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1322] to-[#0A0D16] border border-slate-800/80 p-5 shadow-lg shadow-emerald-500/5 group hover:border-slate-700/80 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Collections</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm">🧾</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-emerald-400 font-display">
              ₹{(paidInvoiced / 100000).toFixed(1)}L
            </h3>
            <p className="text-[10px] text-slate-500">
              Out of ₹{(totalInvoiced / 100000).toFixed(1)}L generated invoices
            </p>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F1322] to-[#0A0D16] border border-slate-800/80 p-5 shadow-lg shadow-amber-500/5 group hover:border-slate-700/80 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Ops Completion</span>
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-sm">📝</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white font-display">
              {taskCompletionRate}%
            </h3>
            <p className="text-[10px] text-slate-500">
              {completedTasksCount} done, {pendingTasks.length} tasks outstanding
            </p>
          </div>
        </div>

      </div>

      {/* ─── CHARTS & PERFORMANCE ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Target Progress Card */}
        <div className="lg:col-span-1 rounded-2xl bg-[#0A0D16] border border-slate-800/60 p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-6 w-full text-left">
            Sales Target Progress
          </h3>
          
          {/* Progress Ring Widget */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* SVG circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                strokeWidth="6"
                stroke="rgba(99,102,241,0.06)"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                strokeWidth="7"
                stroke="url(#indigoGrad)"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - targetProgressPercent / 100)}`}
                strokeLinecap="round"
                fill="transparent"
              />
              <defs>
                <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white">{targetProgressPercent}%</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Achieved</span>
            </div>
          </div>

          <div className="mt-6 space-y-1">
            <p className="text-xs text-slate-400">
              Deals Won: <span className="text-white font-bold">₹{(wonValue / 100000).toFixed(1)}L</span>
            </p>
            <p className="text-[10px] text-slate-500">
              Target Quota: ₹{(targetRevenue / 100000).toFixed(1)}L (50 Lakhs)
            </p>
          </div>
        </div>

        {/* Pipeline Funnel Visual */}
        <div className="lg:col-span-2 rounded-2xl bg-[#0A0D16] border border-slate-800/60 p-6">
          <h3 className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-6">
            Sales Stage Funnel (Deal Weights)
          </h3>
          
          <div className="space-y-4">
            {[
              { stage: 'New', count: leads.filter(l => l.status === 'New').length, color: 'bg-slate-700' },
              { stage: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length, color: 'bg-indigo-600' },
              { stage: 'Qualified', count: leads.filter(l => l.status === 'Qualified').length, color: 'bg-violet-600' },
              { stage: 'Proposal / Negotiation', count: leads.filter(l => l.status === 'Proposal' || l.status === 'Negotiation').length, color: 'bg-purple-600' },
              { stage: 'Closed Won 🎉', count: leads.filter(l => l.status === 'Won').length, color: 'bg-emerald-600' }
            ].map((item, idx) => {
              const maxCount = Math.max(...[
                leads.filter(l => l.status === 'New').length,
                leads.filter(l => l.status === 'Contacted').length,
                leads.filter(l => l.status === 'Qualified').length,
                leads.filter(l => l.status === 'Proposal' || l.status === 'Negotiation').length,
                leads.filter(l => l.status === 'Won').length
              ]);
              const widthPct = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
              
              return (
                <div key={item.stage} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.stage}</span>
                    <span className="text-slate-400 font-bold">{item.count} deals</span>
                  </div>
                  <div className="h-4 bg-slate-900 border border-slate-850 rounded-lg overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-r-lg transition-all duration-500`}
                      style={{ width: `${Math.max(widthPct, 6)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ─── RECENT ACTIVITIES, MEETINGS, TASKS ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tasks Section */}
        <div className="rounded-2xl bg-[#0A0D16] border border-slate-800/60 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800/60 pb-3">
            <h3 className="text-slate-300 text-xs font-bold uppercase tracking-wider">
              Pending Follow-ups
            </h3>
            <Link href="/crm/tasks" className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold">
              View All
            </Link>
          </div>
          
          <div className="flex-1 space-y-3.5">
            {pendingTasks.slice(0, 4).length > 0 ? (
              pendingTasks.slice(0, 4).map(task => (
                <div key={task.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 transition-colors border border-transparent hover:border-slate-800">
                  <input
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-4 h-4 rounded border-slate-800 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-200 font-medium leading-snug">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold
                        ${task.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/25' : 
                          task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25' : 
                          'bg-slate-800 text-slate-400'}`}>
                        {task.priority}
                      </span>
                      <span className="text-[10px] text-slate-500">Due: {task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <span>🎉 All caught up!</span>
                <span className="text-[10px] mt-1">No pending tasks remaining.</span>
              </div>
            )}
          </div>
        </div>

        {/* Meetings Section */}
        <div className="rounded-2xl bg-[#0A0D16] border border-slate-800/60 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800/60 pb-3">
            <h3 className="text-slate-300 text-xs font-bold uppercase tracking-wider">
              Upcoming Meetings
            </h3>
            <Link href="/crm/meetings" className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold">
              Calendar
            </Link>
          </div>
          
          <div className="flex-1 space-y-3.5">
            {meetings.filter(m => m.status === 'Scheduled').slice(0, 3).length > 0 ? (
              meetings.filter(m => m.status === 'Scheduled').slice(0, 3).map(mtg => (
                <div key={mtg.id} className="p-3 bg-slate-900/40 border border-slate-850 hover:border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-200">{mtg.title}</h4>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {mtg.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>📅 {mtg.date} at {mtg.time}</span>
                    <span>⏱️ {mtg.duration}m</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
                    <a
                      href={mtg.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-1 bg-indigo-650 hover:bg-indigo-550 text-white font-bold rounded-lg text-[10px] transition-colors"
                    >
                      🎥 Launch Call
                    </a>
                    <button
                      onClick={() => completeMeeting(mtg.id)}
                      className="px-2 py-1 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-[10px]"
                    >
                      ✓ Mark Completed
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <span>📅 No meetings scheduled</span>
                <span className="text-[10px] mt-1">Ready for focus time.</span>
              </div>
            )}
          </div>
        </div>

        {/* Audit Log / Activities */}
        <div className="rounded-2xl bg-[#0A0D16] border border-slate-800/60 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800/60 pb-3">
            <h3 className="text-slate-300 text-xs font-bold uppercase tracking-wider">
              Recent Touchpoints
            </h3>
            <Link href="/crm/activities" className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold">
              Full Log
            </Link>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 max-h-[300px] scrollbar-thin scrollbar-thumb-slate-850">
            {activities.slice(0, 5).map((act, index) => (
              <div key={act.id} className="relative flex gap-3 items-start group">
                {index < activities.slice(0, 5).length - 1 && (
                  <span className="absolute left-3.5 top-7 bottom-0 w-[1px] bg-slate-800 group-hover:bg-slate-700" />
                )}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0
                  ${act.type === 'Call' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                    act.type === 'Email' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                    act.type === 'Meeting' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                    act.type === 'Workflow' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                    'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                  {act.type === 'Call' ? '📞' : act.type === 'Email' ? '✉️' : act.type === 'Meeting' ? '🎥' : act.type === 'Workflow' ? '⚡' : '📜'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-300 truncate">{act.title}</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">{act.description}</p>
                  <p className="text-[9px] text-slate-500 mt-1">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {act.relatedTo || 'General'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
