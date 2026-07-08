'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';

export default function SMSPage() {
  const { logActivity } = useCRM();
  const [mounted, setMounted] = useState(false);
  
  const [message, setMessage] = useState("Hey {Name}! Grab 20% off on your LearnFlow Pro subscription update today. Valid for 24 hours. Click: learnflow.ai/pro-offer");
  const [targetSegment, setTargetSegment] = useState('All Registered Students');
  
  const [isSending, setIsSending] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [sentStats, setSentStats] = useState<{ total: number; delivered: number } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const charCount = message.length;
  const smsCount = Math.ceil(charCount / 160);

  const handleSendSMS = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setLogs(['Initiating bulk DLT approved SMS gateway connection...', 'Resolving target segment numbers...']);
    setSentStats(null);

    const targetCount = targetSegment === 'All Registered Students' ? 4850 : targetSegment === 'Leads In Proposal' ? 320 : 1240;

    setTimeout(() => {
      setLogs(prev => [...prev, `Found ${targetCount} verified phone numbers matching criteria.`]);
    }, 400);

    setTimeout(() => {
      setLogs(prev => [...prev, 'Encoding SMS packets... DLT Header: LRNFLW.']);
    }, 800);

    setTimeout(() => {
      setLogs(prev => [...prev, 'Dispatching SMS streams through DND routing filter...']);
    }, 1200);

    setTimeout(() => {
      setLogs(prev => [...prev, 'Gateway Response: SUCCESS. Dispatch stream finalized.']);
      setIsSending(false);
      const deliveredCount = Math.round(targetCount * 0.965); // 96.5% delivery rate
      setSentStats({
        total: targetCount,
        delivered: deliveredCount
      });
      logActivity('SMS', 'SMS Bulk Dispatch Dispatched 💬', `Sent [LRNFLW] SMS drive to ${targetSegment}. (Dispatched: ${targetCount}, Delivered: ${deliveredCount})`);
    }, 1700);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white font-display">SMS Marketing Suite</h1>
        <p className="text-slate-400 text-xs mt-1">
          Compose DLT-compliant text message updates, monitor character credits, and simulate carrier delivery logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Composer Form */}
        <div className="md:col-span-2 bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">SMS Blast Composer</h3>
          
          <form onSubmit={handleSendSMS} className="space-y-4">
            
            {/* Target Segment */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Target Phone Segment</label>
              <select
                value={targetSegment}
                onChange={(e) => setTargetSegment(e.target.value)}
                className="w-full bg-[#111625] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
              >
                <option value="All Registered Students">All Students (India region) ({smsCount * 4850} credits)</option>
                <option value="Leads In Proposal">Pipeline Leads in Proposal Stage ({smsCount * 320} credits)</option>
                <option value="At-Risk Pro Subscribers">At-Risk Pro Subscribers ({smsCount * 1240} credits)</option>
              </select>
            </div>

            {/* Message Body */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">SMS Text (DLT Format)</label>
                <span className={`text-[10px] font-bold ${charCount > 160 ? 'text-amber-500' : 'text-slate-500'}`}>
                  {charCount} / 160 chars ({smsCount} SMS credit)
                </span>
              </div>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                maxLength={480}
                className="w-full bg-[#111625] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-indigo-850 disabled:to-purple-850 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-650/15"
              >
                {isSending ? '💬 Broadcasting Carrier Signals...' : '💬 Dispatch SMS Broadcast'}
              </button>
            </div>

          </form>
        </div>

        {/* Live Terminal Log Panel */}
        <div className="md:col-span-1 bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5 flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">Carrier Outbox Console</h3>
            
            <div className="bg-slate-950 border border-slate-900 rounded-xl p-3.5 font-mono text-[10px] leading-relaxed text-indigo-400 min-h-[160px] max-h-[220px] overflow-y-auto">
              {logs.length > 0 ? (
                logs.map((log, idx) => (
                  <div key={idx} className="border-b border-slate-900/50 py-0.5 last:border-0">
                    <span className="text-slate-600 font-bold">&gt;</span> {log}
                  </div>
                ))
              ) : (
                <div className="text-slate-700 italic py-12 text-center">
                  Outbox terminal idle. Ready for dispatch queue...
                </div>
              )}
            </div>

            {sentStats && (
              <div className="mt-4 p-3 bg-emerald-500/5 border border-emerald-500/25 rounded-xl text-center animate-in fade-in duration-200">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">SMS Dispatched 🎉</span>
                <span className="text-base font-black text-white block mt-1">{sentStats.delivered.toLocaleString()} delivered</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Out of {sentStats.total} total targets (96.5% reach)</span>
              </div>
            )}
          </div>
          
          <div className="text-[10px] text-slate-600 border-t border-slate-850/60 pt-3">
            ℹ️ Carrier simulations check target region codes and automatically apply local timezone rules.
          </div>
        </div>

      </div>

    </div>
  );
}
