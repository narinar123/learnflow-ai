'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { Recruiter, Student } from '@/lib/crmData';

export default function RecruitersPage() {
  const { recruiters, addRecruiter, students } = useCRM();
  
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  
  const [selectedRec, setSelectedRec] = useState<Recruiter | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [matchingCandidates, setMatchingCandidates] = useState<Student[]>([]);

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [activeJobs, setActiveJobs] = useState('5');
  const [focusInput, setFocusInput] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update matched candidates when recruiter selection changes
  useEffect(() => {
    if (selectedRec) {
      // Find students whose plan is PRO/PREMIUM/ENTERPRISE and have high engagement
      // We simulate matching based on recruiters focus area vs students
      // Let's filter students who completed courses or have high engagement score (> 70)
      const matched = students.filter(s => s.engagementScore > 65);
      setMatchingCandidates(matched);
    } else {
      setMatchingCandidates([]);
    }
  }, [selectedRec, students]);

  if (!mounted) return null;

  // Filter recruiters
  const filteredRecruiters = recruiters.filter(rec => {
    const matchesSearch = rec.name.toLowerCase().includes(search.toLowerCase()) || 
                          rec.company.toLowerCase().includes(search.toLowerCase()) ||
                          rec.focusArea.some(f => f.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch;
  });

  const handleAddRecruiter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company) return;
    const focusArr = focusInput ? focusInput.split(',').map(f => f.trim()) : ['General Development'];
    
    addRecruiter({
      name,
      company,
      email,
      phone,
      activeJobs: Number(activeJobs),
      hireRate: 75,
      rating: 4.5,
      focusArea: focusArr
    });
    setAddModalOpen(false);
    // Reset Form
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setActiveJobs('5');
    setFocusInput('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto flex relative h-full">
      
      {/* ─── MAIN RECRUITERS LIST ─── */}
      <div className="flex-1 space-y-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-white font-display">Recruiters Pool</h1>
            <p className="text-slate-400 text-xs mt-1">
              Review recruiter partner relations, active hiring campaigns, and match student candidates.
            </p>
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-indigo-600/10"
          >
            👔 Add Recruiter
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Registered Recruiters</p>
            <h4 className="text-xl font-black text-white mt-1">{recruiters.length}</h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Job Posts</p>
            <h4 className="text-xl font-black text-indigo-400 mt-1">
              {recruiters.reduce((s, r) => s + r.activeJobs, 0)}
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Avg Hiring Rate</p>
            <h4 className="text-xl font-black text-emerald-400 mt-1">
              {Math.round(recruiters.reduce((s, r) => s + r.hireRate, 0) / recruiters.length)}%
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Partner Satisfaction</p>
            <h4 className="text-xl font-black text-white mt-1">
              ⭐ {(recruiters.reduce((s, r) => s + r.rating, 0) / recruiters.length).toFixed(1)}/5
            </h4>
          </div>
        </div>

        {/* Search */}
        <div className="bg-[#0A0D16] border border-slate-800/60 p-4 rounded-2xl">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search by recruiter name, hiring company, or focus tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111625] border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecruiters.map(rec => (
            <div
              key={rec.id}
              onClick={() => setSelectedRec(rec)}
              className={`p-5 rounded-2xl bg-[#0A0D16] border transition-all cursor-pointer hover:border-slate-700/80
                ${selectedRec?.id === rec.id ? 'border-indigo-500/50 shadow-md shadow-indigo-500/5' : 'border-slate-800/80'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-200">{rec.name}</h3>
                  <p className="text-[10px] text-indigo-400 font-bold mt-0.5">{rec.company}</p>
                </div>
                <div className="text-[10px] text-amber-400 font-bold">
                  ★ {rec.rating}
                </div>
              </div>

              {/* Focus tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {rec.focusArea.map((area, idx) => (
                  <span key={idx} className="text-[9px] px-2 py-0.5 bg-[#111524] text-slate-400 border border-slate-850 rounded">
                    {area}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 py-2 border-t border-slate-850/60 text-[10px] text-slate-500 mt-2 pt-3">
                <div>
                  <span>Hiring Velocity:</span>
                  <span className="block font-bold text-slate-300">{rec.hireRate}% conversion</span>
                </div>
                <div>
                  <span>Open Positions:</span>
                  <span className="block font-bold text-slate-300">{rec.activeJobs} jobs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── CANDIDATE MATCHING PANEL ─── */}
      {selectedRec && (
        <div className="w-80 ml-6 flex-shrink-0 bg-[#0A0D16] border border-slate-800/80 rounded-2xl p-5 space-y-5 flex flex-col h-fit animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hiring Matcher</h3>
              <p className="text-[10px] text-indigo-400 font-semibold mt-0.5">{selectedRec.company}</p>
            </div>
            <button onClick={() => setSelectedRec(null)} className="text-slate-500 hover:text-slate-300">✕ Close</button>
          </div>

          <div className="space-y-4">
            <div className="bg-indigo-500/5 border border-indigo-500/15 rounded-xl p-3 text-xs text-indigo-300 leading-normal">
              <strong>Recruiter Focus:</strong> {selectedRec.focusArea.join(', ')}
            </div>

            <div className="space-y-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Matched Students</span>
              
              <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
                {matchingCandidates.length > 0 ? (
                  matchingCandidates.map(student => (
                    <div key={student.id} className="p-3 bg-[#111625] border border-slate-850 rounded-xl space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-200">{student.name}</span>
                        <span className="text-[10px] text-indigo-400 font-mono font-bold">{student.engagementScore}% XP</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Completed: {student.coursesCompleted} courses</span>
                        <span className="px-1.5 py-0.2 bg-indigo-500/10 text-indigo-300 rounded font-semibold text-[8px]">
                          {student.planType}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          alert(`📩 Forwarded candidate profile of ${student.name} to ${selectedRec.name} (${selectedRec.email}).`);
                        }}
                        className="w-full mt-1.5 py-1 text-center bg-slate-800 hover:bg-slate-750 text-slate-300 rounded font-semibold text-[10px] transition-colors"
                      >
                        📬 Forward Profile
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic">No candidates match focus areas right now.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── ADD RECRUITER DIALOG ─── */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">👔 Register Recruiter</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <form onSubmit={handleAddRecruiter} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Recruiter Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Priya Sinha"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Hiring Company *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="E.g., Zomato"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Active Job Posts</label>
                  <input
                    type="number"
                    value={activeJobs}
                    onChange={(e) => setActiveJobs(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Work Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99999 99999"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Hiring focus tech (Comma-separated)</label>
                <input
                  type="text"
                  value={focusInput}
                  onChange={(e) => setFocusInput(e.target.value)}
                  placeholder="E.g., React, Node, ML Specialist"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-855 text-slate-400 hover:text-white rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold"
                >
                  Add Recruiter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
