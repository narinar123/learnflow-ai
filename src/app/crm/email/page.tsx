'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preview: string;
}

const templates: EmailTemplate[] = [
  {
    id: 'tpl_welcome',
    name: 'Day 0: Onboarding Welcome Sequence',
    subject: "Welcome to GUIDESOFT IT SOLUTIONS! 🎉 Let's start your first course",
    preview: "Hey {Name}! Thanks for signing up. Here is a curated guide of 3 hot courses matching your profile to kickstart your study streak..."
  },
  {
    id: 'tpl_streak',
    name: 'At-Risk: Daily Learning Streak Nudge',
    subject: '🔥 {Name}, save your learning streak! (5 mins remaining)',
    preview: "Don't let your streak break today! Just complete one short lesson in computer science. 15 minutes is all it takes to build a coding habit..."
  },
  {
    id: 'tpl_winback',
    name: 'Win-Back: 50% Off Pro Subscription Offer',
    subject: 'We miss you, {Name}! Come back with 50% off Pro this week',
    preview: "It has been 14 days since your last log in. We saved your progress! Upgrade to Pro this week for unlimited AI queries at half the price..."
  }
];

export default function EmailPage() {
  const { logActivity } = useCRM();
  const [mounted, setMounted] = useState(false);
  
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [targetSegment, setTargetSegment] = useState('Free Active Users');
  const [subject, setSubject] = useState(templates[0].subject);
  
  // Simulation State
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [sentStats, setSentStats] = useState<{ sent: number; opens: number; clicks: number } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update subject automatically when template changes
  useEffect(() => {
    const tpl = templates.find(t => t.id === selectedTemplate);
    if (tpl) {
      setSubject(tpl.subject);
    }
  }, [selectedTemplate]);

  if (!mounted) return null;

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendProgress(0);
    setSentStats(null);

    // Simulate sending progress
    const interval = setInterval(() => {
      setSendProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSending(false);
            const totalSent = targetSegment === 'Free Active Users' ? 12400 : targetSegment === 'At-Risk Learners' ? 4500 : 18000;
            const opens = Math.round(totalSent * 0.285);
            const clicks = Math.round(opens * 0.162);
            setSentStats({
              sent: totalSent,
              opens,
              clicks
            });
            logActivity('Email', 'Email Broadcast Dispatched ✉️', `Dispatched template [${templates.find(t => t.id === selectedTemplate)?.name}] to segment: ${targetSegment}. (Sent: ${totalSent.toLocaleString()})`);
          }, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white font-display">Email Marketing Suite</h1>
        <p className="text-slate-400 text-xs mt-1">
          Draft email campaigns, segment active learners, and launch simulated broadcasts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Designer Form */}
        <div className="md:col-span-2 bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Broadcast Composer</h3>
          
          <form onSubmit={handleSendBroadcast} className="space-y-4">
            
            {/* Template Selection */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Select Campaign Template</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full bg-[#111625] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Target Segment */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Target Recipient Segment</label>
              <select
                value={targetSegment}
                onChange={(e) => setTargetSegment(e.target.value)}
                className="w-full bg-[#111625] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                <option value="Free Active Users">Free Plan (Active, &gt;3 days activity)</option>
                <option value="At-Risk Learners">At-Risk Cohorts (7-14 days inactive)</option>
                <option value="Pro Subscribers">Pro & Premium (Anniversary rewards)</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Subject Line</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#111625] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            {/* Body Preview */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email HTML/Text Preview</label>
              <div className="bg-[#111625] border border-slate-850 rounded-xl p-4 text-xs text-slate-400 font-mono leading-relaxed min-h-[120px]">
                {templates.find(t => t.id === selectedTemplate)?.preview}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-indigo-850 disabled:to-purple-850 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-650/15"
              >
                {isSending ? '✉️ Dispatching Outbound Emails...' : '🚀 Launch Email Broadcast'}
              </button>
            </div>

          </form>
        </div>

        {/* Live Simulation feedback card */}
        <div className="md:col-span-1 bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5 flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Outbox Telemetry</h3>
            
            {isSending && (
              <div className="space-y-4 py-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">SMTP Dispatch Progress</span>
                  <span className="text-indigo-400 font-bold">{sendProgress}%</span>
                </div>
                <div className="h-2 bg-slate-900 border border-slate-850 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-150"
                    style={{ width: `${sendProgress}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  SMTP servers allocating connections. Pushing packets to Firebase Cloud/SendGrid APIs...
                </p>
              </div>
            )}

            {!isSending && !sentStats && (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 text-slate-600">
                <span className="text-2xl">📪</span>
                <p className="text-[10px] mt-2 font-bold uppercase tracking-wider">No active broadcasts</p>
                <p className="text-[10px] text-slate-500 mt-1 max-w-[150px]">Configure the composer and click Launch to test.</p>
              </div>
            )}

            {sentStats && (
              <div className="space-y-4 py-2 animate-in fade-in duration-200">
                <div className="p-3 bg-[#10B981]/5 border border-[#10B981]/25 rounded-xl text-center">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">Broadcast Success 🎉</span>
                  <span className="text-lg font-black text-white block mt-1">{sentStats.sent.toLocaleString()} sent</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-850/60 py-1.5">
                    <span className="text-slate-500">Simulated Opens:</span>
                    <span className="text-slate-300 font-bold">{sentStats.opens.toLocaleString()} (28.5%)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-850/60 py-1.5">
                    <span className="text-slate-500">Simulated Clicks:</span>
                    <span className="text-slate-300 font-bold">{sentStats.clicks.toLocaleString()} (4.6%)</span>
                  </div>
                </div>

                <p className="text-[9px] text-slate-500 leading-normal bg-slate-900 border border-slate-850 p-2 rounded-lg font-mono">
                  SMTP logs: code=250 status=OK message=Dispatched queue items successfully.
                </p>
              </div>
            )}
          </div>
          
          <div className="text-[10px] text-slate-600 border-t border-slate-850/60 pt-3">
            ℹ️ Email broadcasts are simulated in real-time. Results are immediately logged to the activities audit trail.
          </div>
        </div>

      </div>

    </div>
  );
}
