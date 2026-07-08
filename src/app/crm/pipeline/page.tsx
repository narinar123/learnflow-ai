'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { Lead } from '@/lib/crmData';

const stages: Array<Lead['status']> = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

export default function PipelinePage() {
  const { leads, updateLeadStatus } = useCRM();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Move lead left/right in pipeline
  const shiftStage = (leadId: string, currentStatus: Lead['status'], direction: 'prev' | 'next') => {
    const currentIndex = stages.indexOf(currentStatus);
    if (direction === 'prev' && currentIndex > 0) {
      updateLeadStatus(leadId, stages[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < stages.length - 1) {
      updateLeadStatus(leadId, stages[currentIndex + 1]);
    }
  };

  return (
    <div className="p-6 space-y-6 h-full flex flex-col min-w-[1200px]">
      
      {/* Header */}
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-xl font-extrabold text-white font-display">Sales Pipeline</h1>
          <p className="text-slate-400 text-xs mt-1">
            Drag-and-drop workflow simulation to progress leads from discovery to contract closed.
          </p>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span>Active Pipeline:</span>
          <span className="font-bold text-indigo-400 bg-slate-900 px-2.5 py-1 border border-slate-800 rounded-lg">
            ₹{(leads.filter(l => l.status !== 'Lost' && l.status !== 'Won').reduce((s, l) => s + l.value, 0) / 100000).toFixed(1)}L
          </span>
        </div>
      </div>

      {/* Kanban Scroll Board */}
      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-800">
        {stages.map(stage => {
          const stageLeads = leads.filter(l => l.status === stage);
          const stageTotalValue = stageLeads.reduce((sum, l) => sum + l.value, 0);
          
          return (
            <div
              key={stage}
              className="w-80 flex-shrink-0 bg-[#0A0D16]/60 border border-slate-850 rounded-2xl flex flex-col max-h-[70vh] overflow-hidden"
            >
              {/* Column Header */}
              <div className="p-4 border-b border-slate-850/60 bg-[#0B0F19]/40 flex justify-between items-center flex-shrink-0">
                <div>
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{stage}</h3>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{stageLeads.length} deals</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-slate-900 text-indigo-300 font-bold border border-slate-800 rounded-md">
                  ₹{(stageTotalValue / 100000).toFixed(1)}L
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
                {stageLeads.length > 0 ? (
                  stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-xl bg-[#0F1322] border border-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-indigo-500/2 hover:-translate-y-0.5 transition-all space-y-3 group"
                    >
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-200 group-hover:text-indigo-300 transition-colors">
                          {lead.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">{lead.company}</p>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-slate-500">
                        <span>Source: {lead.source}</span>
                        <span className="text-slate-300 font-extrabold">₹{lead.value.toLocaleString('en-IN')}</span>
                      </div>

                      {/* Move Stage Toggles */}
                      <div className="flex justify-between items-center pt-2.5 border-t border-slate-850/60 text-[9px] text-slate-400">
                        <button
                          onClick={() => shiftStage(lead.id, stage, 'prev')}
                          disabled={stages.indexOf(stage) === 0}
                          className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 font-bold"
                        >
                          ◀ Left
                        </button>
                        <span className="text-[8px] text-slate-600 uppercase font-bold tracking-widest">Shift</span>
                        <button
                          onClick={() => shiftStage(lead.id, stage, 'next')}
                          disabled={stages.indexOf(stage) === stages.length - 1}
                          className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 font-bold"
                        >
                          Right ▶
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-slate-600 text-[10px] border border-dashed border-slate-850 rounded-xl">
                    No deals in stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
