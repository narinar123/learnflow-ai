'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getJobApplications, saveJobApplications, getJobPostings, JobPosting, JobApplication } from '@/lib/recruiterData';
import { mockStudents } from '@/lib/admin-data';

export default function RecruiterApplicantsManager() {
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [jobFilter, setJobFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');

  useEffect(() => {
    setApps(getJobApplications());
    setJobs(getJobPostings());
  }, []);

  const handleUpdateStage = (appId: string, newStage: JobApplication['stage']) => {
    const updated = apps.map(a => {
      if (a.id === appId) {
        const comments = [...a.comments, `Stage updated to ${newStage} on ${new Date().toISOString().split('T')[0]}`];
        return { ...a, stage: newStage, comments } as JobApplication;
      }
      return a;
    });
    saveJobApplications(updated);
    setApps(updated);
  };

  const filteredApps = apps.filter(a => {
    const matchJob = jobFilter === 'All' || a.jobId === jobFilter;
    const matchStage = stageFilter === 'All' || a.stage === stageFilter;
    return matchJob && matchStage;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Applicants Manager</h1>
        <p className="text-slate-400 text-sm mt-1">Review profiles, sort applicants by AI match score, and change pipeline status.</p>
      </div>

      {/* Filter panel */}
      <div className="p-4 rounded-3xl border border-slate-800 bg-[#0F0B26] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Filter Job:</label>
          <select 
            value={jobFilter} 
            onChange={e => setJobFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Jobs</option>
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Filter Stage:</label>
          <select 
            value={stageFilter} 
            onChange={e => setStageFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Stages</option>
            <option value="Screening">Screening</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applicants List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredApps.length === 0 ? (
          <div className="col-span-full text-center py-20 border border-slate-800 bg-[#0F0B26] rounded-3xl text-slate-500 text-sm">
            No applicants matching selected filters.
          </div>
        ) : (
          filteredApps.map(app => {
            const student = mockStudents.find(s => s.id === app.studentId);
            const job = jobs.find(j => j.id === app.jobId);
            const scoreColor = app.matchScore > 90 
              ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' 
              : app.matchScore > 70 
              ? 'border-amber-500/20 text-amber-400 bg-amber-500/5' 
              : 'border-slate-800 text-slate-400 bg-slate-900/40';

            return (
              <div key={app.id} className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] flex flex-col justify-between gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={student?.avatar || 'https://api.dicebear.com/9.x/avataaars/svg?seed=Demo'} 
                      alt={student?.name} 
                      className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800"
                    />
                    <div>
                      <h3 className="font-bold text-white text-base leading-snug">{student?.name || 'Applicant'}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{student?.email}</p>
                      <p className="text-xs text-indigo-300 font-semibold mt-1">💼 Applied: {job?.title || 'Open Role'}</p>
                    </div>
                  </div>

                  <div className={`px-2.5 py-1.5 rounded-xl border text-center shrink-0 ${scoreColor}`}>
                    <div className="text-sm font-black leading-none">{app.matchScore}%</div>
                    <span className="text-[8px] font-extrabold uppercase tracking-wider block mt-0.5">Match</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 py-2 border-y border-slate-800/60 my-1 text-[11px] font-medium text-slate-400">
                  <span>📅 Date: {app.appliedDate}</span>
                  <span>·</span>
                  <span className="text-slate-300 font-bold uppercase">Stage: {app.stage}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-1">
                  {/* Pipeline Stage Select Box */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Move:</span>
                    <select 
                      value={app.stage}
                      onChange={e => handleUpdateStage(app.id, e.target.value as any)}
                      className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-white focus:outline-none focus:border-indigo-500 font-bold"
                    >
                      <option value="Screening">Screening</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer">Offer</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2 justify-end">
                    <Link 
                      href={`/recruiter/scheduler?appId=${app.id}`}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold rounded-lg text-slate-300"
                    >
                      📅 Schedule
                    </Link>
                    <Link 
                      href={`/recruiter/resume-viewer/${app.studentId}`}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-[10px] font-bold rounded-lg text-white"
                    >
                      📄 View Resume
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
