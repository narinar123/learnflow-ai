'use client';

import React, { useState, useEffect } from 'react';
import { getJobPostings, saveJobPostings, JobPosting, getJobApplications } from '@/lib/recruiterData';

export default function RecruiterJobsBoard() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  
  // Form fields
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Internship'>('Full-time');
  const [experienceLevel, setExperienceLevel] = useState<'Entry' | 'Mid' | 'Senior' | 'Lead'>('Mid');
  const [salaryRange, setSalaryRange] = useState('');
  const [description, setDescription] = useState('');
  const [reqsText, setReqsText] = useState('');
  const [skillsText, setSkillsText] = useState('');

  useEffect(() => {
    setJobs(getJobPostings());
    setApps(getJobApplications());
  }, []);

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();

    const requirements = reqsText.split('\n').map(line => line.trim()).filter(Boolean);
    const skills = skillsText.split(',').map(tag => tag.trim()).filter(Boolean);

    const newJob: JobPosting = {
      id: `job_${Date.now()}`,
      title,
      department,
      location,
      type,
      experienceLevel,
      salaryRange,
      description,
      requirements,
      skills,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
    };

    const updatedJobs = [newJob, ...jobs];
    saveJobPostings(updatedJobs);
    setJobs(updatedJobs);
    
    // Reset Form & Close Modal
    setTitle('');
    setDepartment('Engineering');
    setLocation('');
    setType('Full-time');
    setExperienceLevel('Mid');
    setSalaryRange('');
    setDescription('');
    setReqsText('');
    setSkillsText('');
    setShowPostModal(false);
  };

  const handleToggleStatus = (jobId: string) => {
    const updated = jobs.map(j => {
      if (j.id === jobId) {
        return { ...j, status: j.status === 'Active' ? 'Closed' : 'Active' } as JobPosting;
      }
      return j;
    });
    saveJobPostings(updated);
    setJobs(updated);
  };

  const handleDeleteJob = (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;
    const updated = jobs.filter(j => j.id !== jobId);
    saveJobPostings(updated);
    setJobs(updated);
  };

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchDept = deptFilter === 'All' || job.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Jobs Board</h1>
          <p className="text-slate-400 text-sm mt-1">Manage active vacancies, add new requisitions, and review applicant responses.</p>
        </div>
        <button 
          onClick={() => setShowPostModal(true)} 
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all duration-150 active:scale-95 shadow-lg shadow-indigo-600/15"
        >
          <span>💼</span> Post a Position
        </button>
      </div>

      {/* Filters Hub */}
      <div className="p-4 rounded-3xl border border-slate-800 bg-[#0F0B26] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search by role or skills..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <span className="absolute left-3 top-2.5 text-xs text-slate-500">🔍</span>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Department:</label>
          <select 
            value={deptFilter} 
            onChange={e => setDeptFilter(e.target.value)}
            className="w-full md:w-44 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="AI Research">AI Research</option>
            <option value="Product Design">Product Design</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>
        </div>
      </div>

      {/* Jobs Table list */}
      <div className="rounded-3xl border border-slate-800 bg-[#0F0B26] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/10 text-[10px] font-bold text-slate-400 uppercase">
                <th className="p-4">Position Title</th>
                <th className="p-4">Department</th>
                <th className="p-4">Location & Type</th>
                <th className="p-4">Applicants</th>
                <th className="p-4">Salary Scope</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-slate-500">No jobs matching criteria found.</td>
                </tr>
              ) : (
                filteredJobs.map(job => {
                  const applicantCount = apps.filter(a => a.jobId === job.id).length;
                  return (
                    <tr key={job.id} className="hover:bg-slate-900/10 transition-colors">
                      <td className="p-4 font-bold text-white">
                        <div>
                          {job.title}
                          <div className="flex gap-1.5 mt-1.5">
                            {job.skills.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 text-[9px] font-bold rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-300 font-semibold">{job.department}</td>
                      <td className="p-4 text-slate-400">
                        <div>{job.location}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{job.type} · {job.experienceLevel}</div>
                      </td>
                      <td className="p-4 font-black text-indigo-400">{applicantCount} candidates</td>
                      <td className="p-4 text-slate-300 font-mono">{job.salaryRange || 'NDA'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                          job.status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-slate-500/10 text-slate-400 border border-slate-700'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleToggleStatus(job.id)}
                            className="text-xs text-slate-400 hover:text-indigo-400 px-2 py-1 rounded bg-slate-900 border border-slate-800"
                            title="Toggle Active/Closed"
                          >
                            {job.status === 'Active' ? 'Close' : 'Activate'}
                          </button>
                          <button 
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-xs text-rose-500 hover:text-rose-400 p-1 rounded"
                            title="Delete vacancy"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── POST A JOB MODAL ─── */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#0F0B26] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
              <div>
                <h3 className="text-base font-bold text-white">Create New Requisition</h3>
                <p className="text-slate-500 text-[10px] mt-0.5">Define core parameters and match targets.</p>
              </div>
              <button 
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handlePostJob} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Position Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Lead Backend Architect" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Department</label>
                  <select 
                    value={department} 
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="AI Research">AI Research</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Salary Range</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹20,00,000 - ₹25,00,000 / year"
                    value={salaryRange} 
                    onChange={e => setSalaryRange(e.target.value)} 
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Bangalore (Hybrid)"
                    value={location} 
                    onChange={e => setLocation(e.target.value)} 
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Employment Type</label>
                  <select 
                    value={type} 
                    onChange={e => setType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Experience Level</label>
                  <select 
                    value={experienceLevel} 
                    onChange={e => setExperienceLevel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Entry">Entry</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Required Skills (Comma-separated)</label>
                  <input 
                    type="text" 
                    placeholder="React, TypeScript, Next.js"
                    value={skillsText} 
                    onChange={e => setSkillsText(e.target.value)} 
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Job Description Summary</label>
                <textarea 
                  rows={3} 
                  placeholder="Summarize the vacancy scope and target tasks..."
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Job Requirements (One per line)</label>
                <textarea 
                  rows={4} 
                  placeholder="Requirement details..."
                  value={reqsText} 
                  onChange={e => setReqsText(e.target.value)} 
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setShowPostModal(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors">Publish Requisition</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
