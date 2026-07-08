'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { Student } from '@/lib/crmData';

export default function StudentsPage() {
  const { students, updateStudentPlan } = useCRM();
  
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) || 
                          student.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesPlan = planFilter === 'All' || student.planType === planFilter;
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto flex relative h-full">
      
      {/* ─── STUDENTS GRID ─── */}
      <div className="flex-1 space-y-6 overflow-x-auto">
        <div>
          <h1 className="text-xl font-extrabold text-white font-display">Students List</h1>
          <p className="text-slate-400 text-xs mt-1">
            Track student learning progress, engagement indices, certifications, and subscription tiers.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Registrations</p>
            <h4 className="text-xl font-black text-white mt-1">{students.length}</h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Pro Subscribers</p>
            <h4 className="text-xl font-black text-indigo-400 mt-1">
              {students.filter(s => s.planType === 'PRO' || s.planType === 'PREMIUM').length}
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Avg Engagement</p>
            <h4 className="text-xl font-black text-emerald-400 mt-1">
              {Math.round(students.reduce((s, st) => s + st.engagementScore, 0) / students.length)}%
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">At-Risk Learners</p>
            <h4 className="text-xl font-black text-red-400 mt-1">
              {students.filter(s => s.status === 'At-Risk').length}
            </h4>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#0A0D16] border border-slate-800/60 p-4 rounded-2xl flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search by student name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111625] border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plan:</span>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="bg-[#111625] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Plans</option>
              <option value="FREE">FREE</option>
              <option value="BASIC">BASIC</option>
              <option value="PRO">PRO</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="ENTERPRISE">ENTERPRISE</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#111625] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="At-Risk">At-Risk</option>
            </select>
          </div>
        </div>

        {/* Grid Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`p-5 rounded-2xl bg-[#0A0D16] border transition-all cursor-pointer hover:border-slate-700/80
                  ${selectedStudent?.id === student.id ? 'border-indigo-500/50 shadow-md shadow-indigo-500/5' : 'border-slate-800/80'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">{student.name}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">{student.email}</p>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold
                    ${student.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      student.status === 'At-Risk' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                    {student.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Engagement Index</span>
                    <span className="font-bold text-slate-300">{student.engagementScore}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-900 border border-slate-850 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${student.engagementScore > 75 ? 'from-emerald-500 to-teal-500' : student.engagementScore > 40 ? 'from-indigo-500 to-purple-500' : 'from-red-500 to-orange-500'} rounded-full`}
                      style={{ width: `${student.engagementScore}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-slate-850/60 pt-3 text-[10px] text-slate-500">
                  <div>
                    <span>Enrolled</span>
                    <span className="block font-bold text-slate-300">{student.coursesEnrolled} courses</span>
                  </div>
                  <div>
                    <span>Completed</span>
                    <span className="block font-bold text-slate-300">{student.coursesCompleted} courses</span>
                  </div>
                  <div>
                    <span>Subscription</span>
                    <span className="block font-bold text-indigo-400">{student.planType}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-10 bg-[#0A0D16] border border-slate-800/60 rounded-2xl text-center text-slate-500 text-xs">
              No students matched your search criteria.
            </div>
          )}
        </div>
      </div>

      {/* ─── SIDE DETAIL PANEL ─── */}
      {selectedStudent && (
        <div className="w-80 ml-6 flex-shrink-0 bg-[#0A0D16] border border-slate-800/80 rounded-2xl p-5 space-y-5 flex flex-col h-fit animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Student Profile</h3>
            <button onClick={() => setSelectedStudent(null)} className="text-slate-500 hover:text-slate-300">✕ Close</button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-extrabold text-white">{selectedStudent.name}</h4>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{selectedStudent.id}</p>
            </div>

            <div className="space-y-2 text-xs border-y border-slate-850/60 py-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Subscription Tier:</span>
                <span className="text-indigo-400 font-bold">{selectedStudent.planType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Learning Engagement:</span>
                <span className="text-slate-300 font-semibold">{selectedStudent.engagementScore}% XP Velocity</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Courses Enrolled:</span>
                <span className="text-slate-300 font-semibold">{selectedStudent.coursesEnrolled} courses</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Courses Completed:</span>
                <span className="text-slate-300 font-semibold">{selectedStudent.coursesCompleted} courses</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Certificates Issued:</span>
                <span className="text-emerald-400 font-bold">{selectedStudent.certificatesEarned} verifications</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Joined Platform:</span>
                <span className="text-slate-400">{new Date(selectedStudent.joinedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Quick tier upgrade */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Manage Plan Access</label>
              <select
                value={selectedStudent.planType}
                onChange={(e) => updateStudentPlan(selectedStudent.id, e.target.value as any)}
                className="w-full bg-[#111625] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="FREE">FREE</option>
                <option value="BASIC">BASIC</option>
                <option value="PRO">PRO</option>
                <option value="PREMIUM">PREMIUM</option>
                <option value="ENTERPRISE">ENTERPRISE</option>
              </select>
              <p className="text-[10px] text-slate-500 leading-normal pt-1">
                Upgrading or downgrading plans automatically updates their portal permissions and logs billing adjustments.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
