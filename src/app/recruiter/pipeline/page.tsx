'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getJobApplications, saveJobApplications, getJobPostings, JobPosting, JobApplication } from '@/lib/recruiterData';
import { mockStudents } from '@/lib/admin-data';

const STAGES: JobApplication['stage'][] = ['Screening', 'Interviewing', 'Offer', 'Hired', 'Rejected'];

const STAGE_LABELS: Record<JobApplication['stage'], string> = {
  Screening: 'Screening 📋',
  Interviewing: 'Interviewing 💬',
  Offer: 'Offer Stage ✍️',
  Hired: 'Hired 🎉',
  Rejected: 'Rejected ❌',
};

const STAGE_COLORS: Record<JobApplication['stage'], string> = {
  Screening: 'border-indigo-500/20 bg-indigo-500/5 text-indigo-400',
  Interviewing: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
  Offer: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400',
  Hired: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
  Rejected: 'border-rose-500/20 bg-rose-500/5 text-rose-400',
};

export default function RecruiterHiringPipeline() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [selectedJobId, setSelectedJobId] = useState('All');

  useEffect(() => {
    setApps(getJobApplications());
    setJobs(getJobPostings());
  }, []);

  const handleMoveCandidate = (appId: string, direction: 'forward' | 'backward' | 'reject') => {
    const updated = apps.map(a => {
      if (a.id === appId) {
        let nextStage: JobApplication['stage'] = a.stage;
        if (direction === 'reject') {
          nextStage = 'Rejected';
        } else {
          const currentIndex = STAGES.indexOf(a.stage);
          if (direction === 'forward' && currentIndex < STAGES.length - 2) { // Hired is second to last before Rejected
            nextStage = STAGES[currentIndex + 1];
          } else if (direction === 'backward' && currentIndex > 0 && a.stage !== 'Rejected') {
            nextStage = STAGES[currentIndex - 1];
          }
        }
        
        const comments = [...a.comments, `Moved ${direction} to ${nextStage} in Kanban`];
        return { ...a, stage: nextStage, comments } as JobApplication;
      }
      return a;
    });
    saveJobApplications(updated);
    setApps(updated);
  };

  const filteredApps = apps.filter(a => selectedJobId === 'All' || a.jobId === selectedJobId);

  return (
    <div className="space-y-6 animate-fade-in max-w-[100vw] overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Hiring Pipeline</h1>
          <p className="text-slate-400 text-sm mt-1">Track recruitment progression visually. Click controls on candidate cards to progress stages.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Filter Job:</label>
          <select 
            value={selectedJobId} 
            onChange={e => setSelectedJobId(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
          >
            <option value="All">All Job Vacancies</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Board Columns Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const stageApps = filteredApps.filter(a => a.stage === stage);
          const colStyle = STAGE_COLORS[stage];

          return (
            <div key={stage} className="p-4 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4 min-w-[220px]">
              {/* Column Header */}
              <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-between ${colStyle}`}>
                <span>{STAGE_LABELS[stage]}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px]">
                  {stageApps.length}
                </span>
              </div>

              {/* Candidate Cards List */}
              <div className="space-y-3 min-h-[300px]">
                {stageApps.length === 0 ? (
                  <div className="text-center py-16 text-slate-600 text-[11px] border border-dashed border-slate-850 rounded-2xl">
                    No candidates
                  </div>
                ) : (
                  stageApps.map(app => {
                    const student = mockStudents.find(s => s.id === app.studentId);
                    const job = jobs.find(j => j.id === app.jobId);
                    const matchColor = app.matchScore > 90 
                      ? 'text-emerald-400' 
                      : app.matchScore > 70 
                      ? 'text-amber-400' 
                      : 'text-slate-400';

                    return (
                      <div key={app.id} className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/60 transition-colors space-y-3">
                        <div className="flex gap-2">
                          <img 
                            src={student?.avatar || 'https://api.dicebear.com/9.x/avataaars/svg?seed=Demo'} 
                            alt={student?.name} 
                            className="w-7 h-7 rounded-full border border-slate-700 bg-slate-800 shrink-0"
                          />
                          <div className="min-w-0">
                            <Link href={`/recruiter/resume-viewer/${app.studentId}`} className="text-xs font-bold text-white hover:underline truncate block">
                              {student?.name || 'Applicant'}
                            </Link>
                            <p className="text-[9px] text-slate-500 truncate mt-0.5">{job?.title}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-bold py-1.5 border-t border-slate-800/60">
                          <span className="text-slate-400">Match score:</span>
                          <span className={matchColor}>{app.matchScore}%</span>
                        </div>

                        {/* Stage transition controls */}
                        <div className="flex justify-between items-center gap-1.5 pt-1.5 border-t border-slate-850">
                          {stage !== 'Screening' && stage !== 'Rejected' ? (
                            <button 
                              onClick={() => handleMoveCandidate(app.id, 'backward')}
                              className="px-2 py-1 bg-slate-850 hover:bg-slate-800 text-[9px] font-bold rounded text-slate-400 border border-slate-800"
                              title="Move back one stage"
                            >
                              ◀ Back
                            </button>
                          ) : <div />}

                          {stage !== 'Rejected' && stage !== 'Hired' && (
                            <button 
                              onClick={() => handleMoveCandidate(app.id, 'reject')}
                              className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-[9px] font-bold rounded text-rose-400 border border-rose-500/20"
                              title="Reject candidate"
                            >
                              Reject
                            </button>
                          )}

                          {stage !== 'Hired' && stage !== 'Rejected' ? (
                            <button 
                              onClick={() => handleMoveCandidate(app.id, 'forward')}
                              className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-[9px] font-bold rounded text-white ml-auto"
                              title="Progress stage forward"
                            >
                              Next ▶
                            </button>
                          ) : <div />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
