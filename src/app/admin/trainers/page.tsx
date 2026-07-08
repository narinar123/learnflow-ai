'use client';
import React from 'react';

export default function TrainerPortal() {
  const batches = [
    { name: 'Advanced React patterns (TCS)', students: 45, progress: 80, nextSession: 'Tomorrow, 10:00 AM' },
    { name: 'Node.js Microservices (Wipro)', students: 120, progress: 35, nextSession: 'Today, 2:00 PM' },
    { name: 'Data Structures Bootcamp', students: 85, progress: 15, nextSession: 'Mon, 9:00 AM' },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Trainer Portal</h1>
          <p className="text-slate-400 mt-1">Manage your enterprise batches, track student performance, and host live sessions.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-bold transition-colors">
            Grade Assignments
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-600/20">
            🎙️ Go Live
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Batch List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-500 rounded-full inline-block"></span>
            Active Batches
          </h2>
          <div className="grid gap-4">
            {batches.map((batch, idx) => (
              <div key={idx} className="bg-[#0A0D16] border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{batch.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                    <span className="flex items-center gap-1">👥 {batch.students} Students</span>
                    <span className="flex items-center gap-1">📅 Next: {batch.nextSession}</span>
                  </div>
                </div>
                <div className="w-full sm:w-48">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Course Progress</span>
                    <span className="text-indigo-400 font-bold">{batch.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${batch.progress}%` }}></div>
                  </div>
                </div>
                <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                  View Batch
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar / Insights */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0A0D16] to-[#111625] border border-slate-800 p-6 rounded-2xl">
            <h3 className="font-bold text-white mb-4">Quick Insights</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                <span className="text-slate-400">Assignments to Grade</span>
                <span className="bg-red-500 text-white font-bold px-2 py-0.5 rounded-full text-xs">42</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                <span className="text-slate-400">Average Attendance</span>
                <span className="text-emerald-400 font-bold">88%</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                <span className="text-slate-400">Student Queries</span>
                <span className="text-amber-400 font-bold">14 Unresolved</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#0A0D16] border border-slate-800 p-6 rounded-2xl">
            <h3 className="font-bold text-white mb-2">Trainer Performance</h3>
            <div className="flex items-end gap-2 mt-4">
              <span className="text-4xl font-black text-amber-400">4.8</span>
              <span className="text-slate-400 text-sm mb-1">/ 5.0 Rating</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Based on 1,240 student reviews this month.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
