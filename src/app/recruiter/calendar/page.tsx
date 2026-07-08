'use client';

import React, { useState, useEffect } from 'react';
import { getInterviewEvents, getJobApplications, getJobPostings, InterviewEvent, JobApplication } from '@/lib/recruiterData';
import { mockStudents } from '@/lib/admin-data';

export default function RecruiterCalendarGrid() {
  const [interviews, setInterviews] = useState<InterviewEvent[]>([]);
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    setInterviews(getInterviewEvents());
    setApps(getJobApplications());
    setJobs(getJobPostings());
    // Auto select today's date number (e.g. 7 or 8)
    setSelectedDay(new Date().getDate());
  }, []);

  const daysInMonth = 31;
  const startDayOffset = 2; // July 2026 starts on Wednesday (offset 2 if Mon=0, Tue=1, Wed=2)
  const currentMonthYear = 'July 2026';

  const getInterviewsForDay = (dayNum: number): InterviewEvent[] => {
    const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const dateStr = `2026-07-${formattedDay}`;
    return interviews.filter(i => i.date === dateStr);
  };

  const calendarCells = [];
  // Fill empty cells before the 1st of the month
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push({ type: 'empty', label: '' });
  }
  // Fill actual day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dayInterviews = getInterviewsForDay(day);
    calendarCells.push({
      type: 'day',
      label: day,
      interviews: dayInterviews,
      hasEvent: dayInterviews.length > 0,
    });
  }

  const selectedDayEvents = selectedDay ? getInterviewsForDay(selectedDay) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Hiring Calendar</h1>
        <p className="text-slate-400 text-sm mt-1">View scheduled interview blocks, application deadlines, and candidate start dates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid (Left Column Spans 2) */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white">{currentMonthYear}</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => alert('Calendar navigating is disabled in preview.')} 
                className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] font-bold rounded-lg text-slate-400 hover:text-white"
              >
                ◀ Prev
              </button>
              <button 
                onClick={() => alert('Calendar navigating is disabled in preview.')} 
                className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] font-bold rounded-lg text-slate-400 hover:text-white"
              >
                Next ▶
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider py-2">
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((cell, index) => {
              if (cell.type === 'empty') {
                return <div key={index} className="h-16 sm:h-20" />;
              }

              const isSelected = cell.label === selectedDay;
              const hasEvents = cell.hasEvent;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDay(cell.label as number)}
                  className={`h-16 sm:h-20 p-2 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-600/10 text-white'
                      : 'border-slate-800 bg-slate-900/10 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-bold">{cell.label}</span>
                  {hasEvents && (
                    <div className="w-full space-y-1">
                      {cell.interviews?.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="px-1 py-0.5 rounded bg-indigo-600 text-[8px] font-bold text-white truncate leading-none">
                          ⏱️ {item.time} - {item.type}
                        </div>
                      ))}
                      {cell.interviews && cell.interviews.length > 2 && (
                        <div className="text-[8px] text-indigo-400 font-bold pl-1">+{cell.interviews.length - 2} more</div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Events Sidebar (Right Column Spans 1) */}
        <div className="lg:col-span-1 p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
          <h3 className="text-base font-bold text-white">
            Agenda for July {selectedDay}, 2026
          </h3>

          {selectedDayEvents.length === 0 ? (
            <div className="text-center py-20 text-slate-500 text-xs">No interviews scheduled for this date.</div>
          ) : (
            <div className="space-y-3">
              {selectedDayEvents.map(meet => {
                const app = apps.find(a => a.id === meet.applicationId);
                const student = app ? mockStudents.find(s => s.id === app.studentId) : null;
                const job = app ? jobs.find(j => j.id === app.jobId) : null;

                return (
                  <div key={meet.id} className="p-4 rounded-2xl border border-slate-850 bg-slate-900/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <img 
                        src={student?.avatar || 'https://api.dicebear.com/9.x/avataaars/svg?seed=Demo'} 
                        alt={student?.name} 
                        className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800"
                      />
                      <div>
                        <span className="font-bold text-white text-xs block">{student?.name}</span>
                        <span className="text-[9px] text-slate-400">⏱️ Time slot: {meet.time}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-300 font-semibold leading-normal">
                      <p>💼 Role: {job?.title}</p>
                      <p className="mt-1">👨‍💻 Interviewer: {meet.interviewer}</p>
                      <p className="mt-1">⚙️ Round: {meet.type}</p>
                    </div>
                    <a 
                      href={meet.meetingLink} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-full py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      Join Meeting Link
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
