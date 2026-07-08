'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  getInterviewEvents, 
  saveInterviewEvents, 
  getJobApplications, 
  getJobPostings,
  InterviewEvent,
  JobApplication,
  JobPosting
} from '@/lib/recruiterData';
import { mockStudents } from '@/lib/admin-data';

function SchedulerContent() {
  const searchParams = useSearchParams();
  const appIdParam = searchParams.get('appId') || '';

  const [interviews, setInterviews] = useState<InterviewEvent[]>([]);
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  // Form Fields
  const [appId, setAppId] = useState(appIdParam);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<InterviewEvent['type']>('Technical');
  const [interviewer, setInterviewer] = useState('');

  useEffect(() => {
    setInterviews(getInterviewEvents());
    setApps(getJobApplications());
    setJobs(getJobPostings());
  }, []);

  useEffect(() => {
    if (appIdParam) {
      setAppId(appIdParam);
      const selectedApp = apps.find(a => a.id === appIdParam);
      if (selectedApp) {
        const student = mockStudents.find(s => s.id === selectedApp.studentId);
        const job = jobs.find(j => j.id === selectedApp.jobId);
        if (student && job) {
          setTitle(`Interview with ${student.name} for ${job.title}`);
        }
      }
    }
  }, [appIdParam, apps, jobs]);

  const handleAppChange = (selectedId: string) => {
    setAppId(selectedId);
    const selectedApp = apps.find(a => a.id === selectedId);
    if (selectedApp) {
      const student = mockStudents.find(s => s.id === selectedApp.studentId);
      const job = jobs.find(j => j.id === selectedApp.jobId);
      if (student && job) {
        setTitle(`Interview with ${student.name} for ${job.title}`);
      }
    }
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId) {
      alert('Please select an applicant.');
      return;
    }

    const newInterview: InterviewEvent = {
      id: `int_${Date.now()}`,
      applicationId: appId,
      title: title || 'Job Discussion',
      date,
      time,
      type,
      interviewer,
      meetingLink: `https://meet.google.com/mock-meet-${Math.random().toString(36).substring(2, 7)}`,
      status: 'Scheduled',
    };

    const updated = [newInterview, ...interviews];
    saveInterviewEvents(updated);
    setInterviews(updated);

    // Reset Form
    setAppId('');
    setTitle('');
    setDate('');
    setTime('');
    setType('Technical');
    setInterviewer('');
  };

  const handleCancelInterview = (id: string) => {
    if (!confirm('Are you sure you want to cancel this interview?')) return;
    const updated = interviews.map(i => {
      if (i.id === id) return { ...i, status: 'Cancelled' } as InterviewEvent;
      return i;
    });
    saveInterviewEvents(updated);
    setInterviews(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Interview Scheduler</h1>
        <p className="text-slate-400 text-sm mt-1">Book technical discussions, management interviews, and track calendar slots.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scheduler Form (Left Column Spans 1) */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSchedule} className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Book a Session</h3>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Applicant</label>
              <select
                value={appId}
                onChange={e => handleAppChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
                required
              >
                <option value="">Select Applicant...</option>
                {apps.map(app => {
                  const student = mockStudents.find(s => s.id === app.studentId);
                  const job = jobs.find(j => j.id === app.jobId);
                  return (
                    <option key={app.id} value={app.id}>
                      {student?.name} - {job?.title} ({app.stage})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Session Title</label>
              <input
                type="text"
                placeholder="e.g. System Design Round"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Round Type</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Technical">Technical</option>
                  <option value="HR">HR / General</option>
                  <option value="System Design">System Design</option>
                  <option value="Cultural">Cultural</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Interviewer</label>
                <input
                  type="text"
                  placeholder="Interviewer Name"
                  value={interviewer}
                  onChange={e => setInterviewer(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all duration-150 active:scale-95 shadow-md shadow-indigo-500/10"
            >
              📅 Schedule Session
            </button>
          </form>
        </div>

        {/* Scheduled List (Right Column Spans 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26]">
            <h3 className="text-base font-bold text-white mb-6">Upcoming Agenda</h3>

            {interviews.length === 0 ? (
              <div className="text-center py-20 text-slate-500">No scheduled sessions in agenda.</div>
            ) : (
              <div className="space-y-3">
                {interviews.map(meet => {
                  const app = apps.find(a => a.id === meet.applicationId);
                  const student = app ? mockStudents.find(s => s.id === app.studentId) : null;
                  const job = app ? jobs.find(j => j.id === app.jobId) : null;

                  return (
                    <div key={meet.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student?.avatar || 'https://api.dicebear.com/9.x/avataaars/svg?seed=Demo'}
                          alt={student?.name}
                          className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{student?.name || 'Applicant'}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold ${
                              meet.status === 'Scheduled' 
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-slate-500/15 text-slate-400 border border-slate-750'
                            }`}>
                              {meet.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">Role: {job?.title || 'Open Vacancy'}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Round: {meet.type} ({meet.interviewer})</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right sm:text-right">
                          <p className="text-xs font-bold text-slate-300">📅 {meet.date}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 font-mono">⏱️ {meet.time}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {meet.status === 'Scheduled' && (
                            <>
                              <a
                                href={meet.meetingLink}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 text-xs font-bold rounded-lg transition-colors"
                              >
                                Join
                              </a>
                              <button
                                onClick={() => handleCancelInterview(meet.id)}
                                className="text-xs text-rose-500 hover:text-rose-400 px-2 py-1.5"
                                title="Cancel interview"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecruiterInterviewScheduler() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading scheduler...</div>}>
      <SchedulerContent />
    </Suspense>
  );
}
