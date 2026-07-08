'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  initialResumes, 
  getJobPostings, 
  localResumeMatcher, 
  JobPosting, 
  CandidateResume,
  ResumeMatchResult
} from '@/lib/recruiterData';
import { mockStudents } from '@/lib/admin-data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RecruiterResumeViewer({ params }: PageProps) {
  const resolvedParams = use(params);
  const studentId = resolvedParams.id;

  const [student, setStudent] = useState<any>(null);
  const [resume, setResume] = useState<CandidateResume | null>(null);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  
  // Matching States
  const [matchResult, setMatchResult] = useState<ResumeMatchResult | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [isLiveAI, setIsLiveAI] = useState(false);

  useEffect(() => {
    const studentData = mockStudents.find(s => s.id === studentId);
    setStudent(studentData);
    setResume(initialResumes[studentId] || null);

    const jobsData = getJobPostings();
    setJobs(jobsData);
    if (jobsData.length > 0) {
      setSelectedJobId(jobsData[0].id);
    }
  }, [studentId]);

  // Update match score using local matcher when selected job changes
  useEffect(() => {
    if (student && resume && selectedJobId) {
      const job = jobs.find(j => j.id === selectedJobId);
      if (job) {
        const localResult = localResumeMatcher(resume.skills, job.skills, student);
        setMatchResult(localResult);
        setIsLiveAI(false);
      }
    }
  }, [selectedJobId, student, resume, jobs]);

  if (!student || !resume) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p className="text-sm">Candidate profile or resume not found.</p>
        <Link href="/recruiter/search" className="text-xs text-indigo-400 hover:underline mt-4 inline-block">
          ← Back to Candidate Search
        </Link>
      </div>
    );
  }

  const handleRunGeminiAI = async () => {
    const job = jobs.find(j => j.id === selectedJobId);
    if (!job) return;

    setLoadingAI(true);
    try {
      const response = await fetch('/api/ai/resume-matching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student.id,
          jobId: job.id,
        })
      });

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      
      setMatchResult({
        score: data.score,
        technicalFit: data.technicalFit,
        experienceFit: data.experienceFit,
        skillGaps: data.skillGaps || ['None'],
        courseRecommendations: data.courseRecommendations || [],
      });
      setIsLiveAI(!data.isDemoMode);
    } catch (err) {
      console.error(err);
      alert('Error running AI Match analysis. Using local calculations instead.');
    } finally {
      setLoadingAI(false);
    }
  };

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <Link href="/recruiter/search" className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5">
          <span>←</span> Back to Talent directory
        </Link>

        {/* Selected Job dropdown comparison */}
        <div className="flex items-center gap-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Compare Vacancy:</label>
          <select 
            value={selectedJobId} 
            onChange={e => setSelectedJobId(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
          >
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Splitscreen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* LEFT SIDE: Resume mock viewer (Col span 3) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-8 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800/80 pb-6">
              <div>
                <h2 className="text-2xl font-black text-white">{resume.name}</h2>
                <p className="text-xs text-slate-400 mt-1">📍 {resume.location}</p>
                <div className="flex gap-4 text-[10px] text-slate-500 font-mono mt-3">
                  <span>📧 {resume.email}</span>
                  <span>📱 {resume.phone}</span>
                </div>
              </div>
              <div className="p-3 bg-indigo-950/20 border border-indigo-500/10 rounded-2xl text-center shrink-0">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Platform Rank</span>
                <span className="text-base font-black text-indigo-400 mt-1 block">Level {student.level}</span>
                <span className="text-[8px] text-slate-500 font-mono mt-0.5 block">{student.xpPoints} XP</span>
              </div>
            </div>

            {/* Profile summary */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Candidate Summary</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{resume.summary}</p>
            </div>

            {/* Work history */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Professional Experience</h4>
              <div className="space-y-4">
                {resume.experience.map((exp, idx) => (
                  <div key={idx} className="space-y-2 relative pl-4 border-l border-slate-800">
                    <div className="absolute w-2 h-2 rounded-full bg-indigo-500 -left-[5px] top-1" />
                    <div className="flex justify-between items-baseline text-xs font-bold">
                      <span className="text-white">{exp.role} @ {exp.company}</span>
                      <span className="text-slate-500 font-mono">{exp.period}</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-400">
                      {exp.details.map((det, i) => <li key={i}>{det}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Personal Projects</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resume.projects.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/20 space-y-2">
                    <span className="text-xs font-bold text-white block">{proj.name}</span>
                    <p className="text-[10px] text-slate-400 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1.5">
                      {proj.techStack.map((tech, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-slate-800 text-slate-500 text-[8px] font-bold rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic Record</h4>
              {resume.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs font-semibold text-slate-300">
                  <div>
                    <p className="text-white font-bold">{edu.degree}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{edu.school}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono">{edu.year}</p>
                    {edu.gpa && <p className="text-[10px] text-indigo-400 mt-0.5">{edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Skills Pool</h4>
              <div className="flex flex-wrap gap-1.5">
                {resume.skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-[10px] font-bold rounded-lg text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: AI matching details (Col span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-6 relative overflow-hidden">
            {/* Design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="border-b border-slate-800/80 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>🤖</span> AI Matching Assistant
              </h3>
              <p className="text-slate-500 text-[10px] mt-0.5">Calculated score comparing CV tags against vacancy description.</p>
            </div>

            {matchResult && (
              <div className="space-y-6">
                {/* Score Indicator */}
                <div className="flex items-center gap-6">
                  {/* Circular Dial using SVG */}
                  <div className="relative w-20 h-20 shrink-0">
                    <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={matchResult.score > 90 ? 'text-emerald-400' : matchResult.score > 70 ? 'text-amber-400' : 'text-indigo-500'}
                        strokeDasharray={`${matchResult.score}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-base font-black text-white leading-none">{matchResult.score}%</span>
                      <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Score</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-300">Matching Quality:</span>
                    <p className={`text-sm font-black uppercase ${
                      matchResult.score > 90 ? 'text-emerald-400' : matchResult.score > 70 ? 'text-amber-400' : 'text-indigo-400'
                    }`}>
                      {matchResult.score > 90 ? 'Excellent Fit 🌟' : matchResult.score > 70 ? 'Good Fit 👍' : 'Fair Alignment'}
                    </p>
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[8px] font-bold text-slate-400 mt-1">
                      {isLiveAI ? 'Model: Gemini 1.5 Flash' : 'Mode: Local Index Match'}
                    </span>
                  </div>
                </div>

                {/* Technical Alignment details */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Technical Fit</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{matchResult.technicalFit}</p>
                </div>

                {/* Experience Fit details */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Experience Alignment</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{matchResult.experienceFit}</p>
                </div>

                {/* Skill Gaps details */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identified Gaps</h4>
                  <div className="flex flex-wrap gap-1">
                    {matchResult.skillGaps.map((gap, i) => (
                      <span key={i} className="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] font-bold rounded">
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggested course training links */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended Training</h4>
                  <div className="space-y-2">
                    {matchResult.courseRecommendations.map((course, i) => (
                      <Link 
                        key={i} 
                        href={course.link} 
                        className="block p-3 rounded-2xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/60 transition-colors flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-slate-300">📖 {course.title}</span>
                        <span className="text-[10px] font-bold text-indigo-400">View Course →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Run Gemini AI button */}
            <div className="pt-4 border-t border-slate-800/60 space-y-3">
              <button
                onClick={handleRunGeminiAI}
                disabled={loadingAI}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-indigo-600/10"
              >
                {loadingAI ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                    <span>Gemini is scanning resume components...</span>
                  </>
                ) : (
                  <>
                    <span>⚡ Run Advanced Gemini AI Analysis</span>
                  </>
                )}
              </button>
              <p className="text-[9px] text-slate-500 text-center leading-normal">
                Generates in-depth reports by submitting job specs and candidate CV to the Gemini model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
