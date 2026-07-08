'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockStudents } from '@/lib/admin-data';
import { getJobPostings, JobPosting, localResumeMatcher, initialResumes } from '@/lib/recruiterData';

export default function RecruiterCandidateSearch() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [selectedJobId, setSelectedJobId] = useState('None');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [minLevel, setMinLevel] = useState(1);

  useEffect(() => {
    setJobs(getJobPostings());
  }, []);

  const allSkills = [
    'React', 'Next.js', 'TypeScript', 'Python', 'Machine Learning', 
    'TensorFlow', 'NLP', 'UI/UX Design', 'Figma', 'AWS', 'Docker', 'Kubernetes'
  ];

  const processedStudents = mockStudents.map(student => {
    let score = 0;
    let matchInfo = null;

    if (selectedJobId !== 'None') {
      const job = jobs.find(j => j.id === selectedJobId);
      const resume = initialResumes[student.id];
      if (job && resume) {
        matchInfo = localResumeMatcher(resume.skills, job.skills, student);
        score = matchInfo.score;
      }
    }

    return {
      ...student,
      score,
      matchInfo
    };
  });

  // Filter students
  const filteredStudents = processedStudents.filter(student => {
    const resume = initialResumes[student.id];
    const candidateSkills = resume ? resume.skills : [];
    
    const matchSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        candidateSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchSkill = selectedSkill === 'All' || 
                       candidateSkills.some(s => s.toLowerCase() === selectedSkill.toLowerCase());
    
    const matchLevel = student.level >= minLevel;

    return matchSearch && matchSkill && matchLevel;
  });

  // Sort students: if job selected, sort by score descending. Else sort by level descending.
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (selectedJobId !== 'None') {
      return b.score - a.score;
    }
    return b.level - a.level;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Student Directory Search</h1>
        <p className="text-slate-400 text-sm mt-1">Directly query student profiles. Map technical skills against active requisitions to run AI Match scoring.</p>
      </div>

      {/* Filter panel */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Search Candidates</label>
            <input 
              type="text" 
              placeholder="Search by name, skills, location..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Core Skill</label>
            <select 
              value={selectedSkill} 
              onChange={e => setSelectedSkill(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Skills</option>
              {allSkills.map(sk => (
                <option key={sk} value={sk}>{sk}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Min Student Level</label>
            <select 
              value={minLevel} 
              onChange={e => setMinLevel(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {[1, 2, 4, 6, 8, 10, 12, 15].map(lvl => (
                <option key={lvl} value={lvl}>Level {lvl}+</option>
              ))}
            </select>
          </div>
        </div>

        {/* AI Scanner Option Selector */}
        <div className="pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs">🤖</span>
            <span className="text-xs font-bold text-indigo-400">AI Match Scanner:</span>
            <select 
              value={selectedJobId} 
              onChange={e => setSelectedJobId(e.target.value)}
              className="px-3 py-1.5 bg-indigo-950/30 text-indigo-300 border border-indigo-500/20 rounded-xl text-xs focus:outline-none font-bold"
            >
              <option value="None">Disabled (No Job Match)</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id}>Match with: {j.title}</option>
              ))}
            </select>
          </div>

          {selectedJobId !== 'None' && (
            <div className="text-xs text-slate-400">
              ⚡ Sorted by matching score against <span className="text-white font-bold">{jobs.find(j => j.id === selectedJobId)?.title}</span>.
            </div>
          )}
        </div>
      </div>

      {/* Directory Table list */}
      <div className="rounded-3xl border border-slate-800 bg-[#0F0B26] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/10 text-[10px] font-bold text-slate-400 uppercase">
                <th className="p-4">Student Profile</th>
                <th className="p-4">Location</th>
                <th className="p-4">Lvl & XP</th>
                <th className="p-4">Courses Completed</th>
                <th className="p-4">Certificates</th>
                {selectedJobId !== 'None' && <th className="p-4">AI Score</th>}
                <th className="p-4 text-right">Resume Match</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {sortedStudents.length === 0 ? (
                <tr>
                  <td colSpan={selectedJobId !== 'None' ? 7 : 6} className="p-10 text-center text-slate-500">No candidates match search queries.</td>
                </tr>
              ) : (
                sortedStudents.map(student => {
                  const resume = initialResumes[student.id];
                  const skills = resume ? resume.skills.slice(0, 3) : [];
                  
                  return (
                    <tr key={student.id} className="hover:bg-slate-900/10 transition-colors">
                      {/* Student details */}
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center gap-3">
                          <img 
                            src={student.avatar} 
                            alt={student.name} 
                            className="w-9 h-9 rounded-full border border-slate-700 bg-slate-800"
                          />
                          <div>
                            <span>{student.name}</span>
                            <div className="flex gap-1 mt-1">
                              {skills.map((skill, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 bg-slate-800 text-slate-400 text-[8px] font-bold rounded">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-slate-400">{student.country || 'India'}</td>
                      
                      <td className="p-4">
                        <div className="font-bold text-slate-200">Lvl {student.level}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{student.xpPoints} XP</div>
                      </td>

                      <td className="p-4 text-slate-300 font-bold">{student.coursesCompleted} courses</td>
                      
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          📜 {student.certificates} verified
                        </span>
                      </td>

                      {selectedJobId !== 'None' && (
                        <td className="p-4">
                          <div className={`inline-block px-2.5 py-1 rounded-xl border text-center font-bold ${
                            student.score > 90 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : student.score > 70 
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                              : 'bg-slate-500/10 text-slate-400 border-slate-700'
                          }`}>
                            {student.score}%
                          </div>
                        </td>
                      )}

                      <td className="p-4 text-right">
                        <Link 
                          href={`/recruiter/resume-viewer/${student.id}`} 
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded-lg transition-colors inline-block"
                        >
                          Scan & View CV
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
