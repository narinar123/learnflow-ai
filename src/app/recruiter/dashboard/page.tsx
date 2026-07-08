'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getJobPostings, 
  getJobApplications, 
  getInterviewEvents, 
  getJobOffers,
  JobPosting,
  JobApplication,
  InterviewEvent
} from '@/lib/recruiterData';
import { mockStudents } from '@/lib/admin-data';

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [interviews, setInterviews] = useState<InterviewEvent[]>([]);
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    setJobs(getJobPostings());
    setApps(getJobApplications());
    setInterviews(getInterviewEvents());
    setOffers(getJobOffers());
  }, []);

  const stats = [
    { title: 'Active Openings', value: jobs.filter(j => j.status === 'Active').length, icon: '💼', color: 'border-indigo-500/20 text-indigo-400 bg-indigo-500/5', href: '/recruiter/jobs' },
    { title: 'Total Applicants', value: apps.length, icon: '👥', color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5', href: '/recruiter/applicants' },
    { title: 'Scheduled Interviews', value: interviews.filter(i => i.status === 'Scheduled').length, icon: '📅', color: 'border-amber-500/20 text-amber-400 bg-amber-500/5', href: '/recruiter/scheduler' },
    { title: 'Offers Extended', value: offers.length, icon: '✍️', color: 'border-rose-500/20 text-rose-400 bg-rose-500/5', href: '/recruiter/offers' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Hiring Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Monitor job vacancies, review matching metrics, and manage interview pipelines.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/recruiter/jobs" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all duration-150 active:scale-95 flex items-center gap-2">
            <span>➕</span> Post a Job
          </Link>
          <Link href="/recruiter/search" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 rounded-xl transition-all duration-150">
            🔍 Search Talent
          </Link>
        </div>
      </div>

      {/* ─── Stats Bento Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.href} className={`block p-6 rounded-2xl border ${stat.color} hover:scale-[1.02] transition-all duration-200`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-400">{stat.title}</span>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <div className="text-3xl font-black text-white mt-4">{stat.value}</div>
            <div className="text-[10px] text-slate-500 font-semibold mt-2 uppercase tracking-wider">Click to view detail →</div>
          </Link>
        ))}
      </div>

      {/* ─── Main Grid Layout ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Columns (Spans 2) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Upcoming Interviews panel */}
          <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Upcoming Interviews</h3>
                <p className="text-slate-400 text-xs mt-0.5">Track interview agendas scheduled for this week.</p>
              </div>
              <Link href="/recruiter/scheduler" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                View all scheduler →
              </Link>
            </div>

            {interviews.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-800 rounded-2xl">
                <span className="text-2xl">📅</span>
                <p className="text-slate-400 text-sm mt-2">No interviews scheduled yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {interviews.map(meet => {
                  const matchingApp = apps.find(a => a.id === meet.applicationId);
                  const matchingStudent = matchingApp ? mockStudents.find(s => s.id === matchingApp.studentId) : null;
                  const jobName = matchingApp ? (jobs.find(j => j.id === matchingApp.jobId)?.title || 'Job Opening') : 'Job Opening';
                  
                  return (
                    <div key={meet.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={matchingStudent?.avatar || 'https://api.dicebear.com/9.x/avataaars/svg?seed=Demo'} 
                          alt={matchingStudent?.name} 
                          className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800"
                        />
                        <div>
                          <p className="font-bold text-white text-sm">{matchingStudent?.name || 'Applicant'}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{jobName} · {meet.type} Round</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right sm:text-right">
                          <p className="text-xs font-bold text-slate-300">📅 {meet.date}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">⏱️ {meet.time}</p>
                        </div>
                        <a 
                          href={meet.meetingLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="px-3.5 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 text-xs font-bold rounded-lg transition-colors"
                        >
                          Join Meet
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Core Matching Pipeline highlights */}
          <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26]">
            <h3 className="text-lg font-bold text-white mb-2">Hiring Pipeline Conversion</h3>
            <p className="text-slate-400 text-xs mb-6">Visual progress of total candidates flowing through recruitment stages.</p>
            
            <div className="space-y-4">
              {[
                { stage: 'Screening', count: apps.filter(a => a.stage === 'Screening').length, pct: 100, color: 'bg-indigo-500' },
                { stage: 'Interviewing', count: apps.filter(a => a.stage === 'Interviewing').length, pct: 75, color: 'bg-emerald-500' },
                { stage: 'Offer Extended', count: apps.filter(a => a.stage === 'Offer').length, pct: 40, color: 'bg-amber-500' },
                { stage: 'Hired / Closed', count: apps.filter(a => a.stage === 'Hired').length, pct: 15, color: 'bg-rose-500' },
              ].map((pipe, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300">{pipe.stage}</span>
                    <span className="text-slate-400">{pipe.count} candidate{pipe.count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${pipe.color} rounded-full`} style={{ width: `${Math.max(10, (pipe.count / (apps.length || 1)) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Applications Feed */}
          <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Recent Applications</h3>
                <p className="text-slate-400 text-xs mt-0.5">Top candidate match updates.</p>
              </div>
              <Link href="/recruiter/applicants" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                All applicants →
              </Link>
            </div>

            <div className="space-y-4">
              {apps.slice(0, 4).map(app => {
                const student = mockStudents.find(s => s.id === app.studentId);
                const jobTitle = jobs.find(j => j.id === app.jobId)?.title || 'Job vacancy';
                
                // Color mapping for match score
                const scoreColor = app.matchScore > 90 
                  ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' 
                  : app.matchScore > 70 
                  ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' 
                  : 'text-slate-400 border-slate-700 bg-slate-800/40';

                return (
                  <div key={app.id} className="flex items-start justify-between gap-3 p-3 rounded-2xl border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 transition-colors">
                    <div className="flex gap-3 min-w-0">
                      <img 
                        src={student?.avatar || 'https://api.dicebear.com/9.x/avataaars/svg?seed=Demo'} 
                        alt={student?.name} 
                        className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 mt-0.5 shrink-0"
                      />
                      <div className="min-w-0">
                        <Link href={`/recruiter/resume-viewer/${app.studentId}`} className="text-xs font-bold text-white hover:underline truncate block">
                          {student?.name || 'Applicant'}
                        </Link>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{jobTitle}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 text-[9px] font-bold rounded">
                          {app.stage}
                        </span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-lg border text-center shrink-0 ${scoreColor}`}>
                      <div className="text-xs font-black">{app.matchScore}%</div>
                      <div className="text-[8px] font-bold uppercase tracking-wider mt-0.5">AI Match</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick AI Resume matching shortcut */}
          <div className="p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 via-[#0F0B26] to-[#0F0B26] relative overflow-hidden">
            {/* Background design glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-base font-bold text-white">Generative AI Matching</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Verify candidate technical alignments, analyze CV profiles against descriptions using Gemini, and fetch recommendation reports instantly.
            </p>
            <Link href="/recruiter/search" className="mt-5 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors active:scale-95 shadow-md shadow-indigo-500/10">
              ⚡ Start Resume Scan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
