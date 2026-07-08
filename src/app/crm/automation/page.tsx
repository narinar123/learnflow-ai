'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';

export default function AutomationPage() {
  const { workflows, toggleWorkflow, triggerWorkflowLive } = useCRM();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSimulateTrigger = (wfId: string) => {
    triggerWorkflowLive(wfId);
    alert('⚡ Automation Trigger Mocked! Run count incremented and logged to Touchpoints Timeline.');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white font-display">Automation Workflows</h1>
        <p className="text-slate-400 text-xs mt-1">
          Define event-driven rules to trigger automated emails, SMS nudges, and tasks assignment.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Rules ledger */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Operational Automation Rules</h3>
          
          {workflows.map(wf => (
            <div
              key={wf.id}
              className={`p-5 rounded-2xl bg-[#0A0D16] border transition-all space-y-3.5
                ${wf.active ? 'border-slate-800 hover:border-slate-700/80' : 'border-slate-850/60 opacity-60'}`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-205">{wf.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{wf.description}</p>
                </div>
                
                {/* Active Switch */}
                <button
                  onClick={() => toggleWorkflow(wf.id)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center
                    ${wf.active ? 'bg-indigo-600 justify-end' : 'bg-slate-800 justify-start'}`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-md transition-transform" />
                </button>
              </div>

              {/* Node diagram mockup */}
              <div className="flex items-center gap-2 bg-[#111625]/40 border border-slate-850 p-2.5 rounded-xl text-[10px] text-slate-400 font-mono">
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded font-bold">IF</span>
                <span className="text-indigo-400">{wf.trigger}</span>
                <span className="text-slate-600">➔</span>
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded font-bold">THEN</span>
                <span className="text-emerald-400">{wf.action}</span>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-slate-850/60">
                <span>Runs: <span className="font-bold text-slate-300">{wf.runCount} times</span></span>
                <span>Last Fired: <span className="font-semibold text-slate-400">{wf.lastRun ? new Date(wf.lastRun).toLocaleString() : 'Never'}</span></span>
              </div>
            </div>
          ))}
        </div>

        {/* Trigger Simulator */}
        <div className="lg:col-span-1 bg-[#0A0D16] border border-slate-800/60 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-850 pb-2 mb-4">
              Event Trigger Simulator
            </h3>
            <p className="text-[11px] text-slate-400 leading-normal mb-4">
              Simulate events inside the student portal and watch active workflows respond instantly.
            </p>
            
            <div className="space-y-2.5">
              {workflows.map(wf => (
                <button
                  key={wf.id}
                  disabled={!wf.active}
                  onClick={() => handleSimulateTrigger(wf.id)}
                  className="w-full text-left p-2.5 bg-slate-900/50 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-300 hover:text-white rounded-xl text-[11px] font-semibold transition-all disabled:opacity-40 disabled:hover:bg-slate-900/50 flex justify-between items-center"
                >
                  <span>⚡ Fire: {wf.trigger}</span>
                  <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Test</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-slate-600 border-t border-slate-850/60 pt-3 mt-4">
            ℹ️ Workflow triggers automatically audit compliance logs and dispatch simulated alerts.
          </div>
        </div>

      </div>

    </div>
  );
}
