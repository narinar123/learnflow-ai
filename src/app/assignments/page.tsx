'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { 
  FileText, Calendar, Award, CheckCircle, Clock, AlertCircle, 
  ExternalLink, Upload, GitBranch, Play, Sparkles, ChevronRight, HelpCircle 
} from 'lucide-react';
import { toast } from 'sonner';

interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  dueDate: string;
  points: number;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  type: 'assignment' | 'project';
  description: string;
  requirements: string[];
  submissionNotes?: string;
  githubUrl?: string;
  fileName?: string;
  aiFeedback?: string;
}

const DEFAULT_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg_001',
    title: 'Python OOP: Banking System Simulator',
    courseId: 'crs_001',
    courseTitle: 'Python for Beginners: Zero to Job-Ready',
    dueDate: '2026-07-15',
    points: 100,
    status: 'pending',
    type: 'assignment',
    description: 'Implement a complete Banking System simulator using Object-Oriented Programming concepts in Python. Create classes for User, Account, SavingsAccount, and Transaction.',
    requirements: [
      'Implement encapsulation: protect account balance from direct modification.',
      'Use inheritance for SavingsAccount (with interest calculation rate).',
      'Implement transaction logging to a local text file.',
      'Write basic unit tests validating deposit/withdrawal logic.'
    ]
  },
  {
    id: 'asg_002',
    title: 'Auto-Layout Dashboard UI Challenge',
    courseId: 'crs_002',
    courseTitle: 'UI/UX Design Masterclass with Figma',
    dueDate: '2026-07-18',
    points: 100,
    status: 'submitted',
    type: 'assignment',
    description: 'Design a responsive landing page or dashboard inside Figma using strict Auto-Layout 5.0 constraints. Make sure component variants exist for mobile, tablet, and desktop viewports.',
    requirements: [
      'Create 3 responsive views (Desktop 1440px, Tablet 768px, Mobile 375px).',
      'Use nested components with variables/modes.',
      'Submit the Figma public link with exportable assets enabled.'
    ],
    submissionNotes: 'Completed the dashboard views, including dark mode variables.',
    fileName: 'learnflow_dashboard_v2.fig'
  },
  {
    id: 'prj_001',
    title: 'Full-Stack E-commerce API & Client',
    courseId: 'crs_003',
    courseTitle: 'Full Stack Web Development: React & Node.js',
    dueDate: '2026-07-30',
    points: 300,
    status: 'graded',
    grade: '95/100',
    type: 'project',
    description: 'Build a production-ready e-commerce web application. The API must handle authentication (JWT), payments (Razorpay/Stripe), product catalouges, and order logs. Renders product galleries and shopping carts in React.',
    requirements: [
      'Create Node/Express backend with Prisma and PostgreSQL schema.',
      'Integrate real payment gateway webhook handling.',
      'Build fully typed UI with React Router and state management.',
      'Deploy to Vercel/Render and attach active URLs.'
    ],
    submissionNotes: 'Deployed live on Vercel and Render. Added mock gateway checkouts.',
    githubUrl: 'https://github.com/priyasharma-dev/learnflow-ecommerce',
    fileName: 'project_submission_notes.txt',
    aiFeedback: 'Excellent architectural split between routers and controllers. JWT validation middleware functions correctly. Suggest caching product listings via Redis for production scale. Security audit: 100/100.'
  },
  {
    id: 'asg_003',
    title: 'Professional Resume & Cover Letter Draft',
    courseId: 'crs_006',
    courseTitle: 'English Communication for Indian Professionals',
    dueDate: '2026-07-10',
    points: 50,
    status: 'graded',
    grade: '48/50',
    type: 'assignment',
    description: 'Draft a professional resume and a tailored cover letter responding to a junior software developer job description. Apply vocabulary techniques and structure learned in Section 2.',
    requirements: [
      'Include a professional profile statement with actionable verbs.',
      'Format experiences focusing on impact rather than responsibilities.',
      'Align cover letter with specific corporate values.'
    ],
    submissionNotes: 'Tailored resume for a frontend opening.',
    fileName: 'priya_sharma_resume.pdf',
    aiFeedback: 'Action verbs are powerful and match industry standards. Resume layout is highly clean and parsable by ATS systems. Cover letter could emphasize team collaboration more. Good spelling and tone consistency.'
  }
];

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activeTab, setActiveTab] = useState<'assignments' | 'projects'>('assignments');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  
  // Submit state variables
  const [notes, setNotes] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);
  const [tempGrade, setTempGrade] = useState<string | null>(null);

  // Load from localstorage or use default
  useEffect(() => {
    const saved = localStorage.getItem('student_assignments');
    if (saved) {
      setAssignments(JSON.parse(saved));
    } else {
      setAssignments(DEFAULT_ASSIGNMENTS);
      localStorage.setItem('student_assignments', JSON.stringify(DEFAULT_ASSIGNMENTS));
    }
  }, []);

  const saveAssignmentsState = (updatedList: Assignment[]) => {
    setAssignments(updatedList);
    localStorage.setItem('student_assignments', JSON.stringify(updatedList));
  };

  const handleOpenSubmit = (asg: Assignment) => {
    setSelectedAssignment(asg);
    setNotes(asg.submissionNotes || '');
    setGithubUrl(asg.githubUrl || '');
    setFileName(asg.fileName || '');
    setSubmissionFeedback(asg.aiFeedback || null);
    setTempGrade(asg.grade || null);
  };

  const simulateAiReview = async (asgId: string) => {
    setIsSubmitting(true);
    setSubmissionFeedback(null);
    
    // Simulate multi-step compilation/testing logs
    toast.info('Submitting application files to GUIDESOFT IT SOLUTIONS Grading core...');
    await new Promise(r => setTimeout(r, 1200));
    toast.info('Executing check suites: Linting & syntax validations...');
    await new Promise(r => setTimeout(r, 1000));
    toast.info('Running unit testing assertions on submitted code/notes...');
    await new Promise(r => setTimeout(r, 1500));
    
    // Create random review results
    const score = Math.floor(Math.random() * 15) + 85; // 85 to 99
    const maxPoints = selectedAssignment?.points || 100;
    const finalScore = Math.round((score / 100) * maxPoints);
    
    const feedbackText = `GUIDESOFT IT SOLUTIONS Evaluator Report:\n\n1. **Functional Completeness**: Verified all core requirements. Implementation passes 8/8 automated test hooks.\n2. **Code Quality**: Code matches clean architecture guidelines. Variable styling is highly consistent. Notes are clear and actionable.\n3. **Optimization Tip**: Make sure to check memory profiles during continuous executions.\n\nFinal Marks: ${finalScore}/${maxPoints}. XP and Wallet Coins dispatched!`;
    
    const updated = assignments.map(a => {
      if (a.id === asgId) {
        return {
          ...a,
          status: 'graded' as const,
          grade: `${finalScore}/${maxPoints}`,
          submissionNotes: notes,
          githubUrl: githubUrl,
          fileName: fileName || 'submission_bundle.zip',
          aiFeedback: feedbackText
        };
      }
      return a;
    });

    saveAssignmentsState(updated);
    
    // Update local modal state
    setTempGrade(`${finalScore}/${maxPoints}`);
    setSubmissionFeedback(feedbackText);
    setIsSubmitting(false);
    toast.success('Assignment graded by AI tutor! Core status updated.');

    // Add virtual coins to local storage
    const coins = localStorage.getItem('student_wallet_coins') || '250';
    localStorage.setItem('student_wallet_coins', (parseInt(coins) + 50).toString());
  };

  const activeList = assignments.filter(a => 
    activeTab === 'assignments' ? a.type === 'assignment' : a.type === 'project'
  );

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-6xl mx-auto">
        
        {/* Banner */}
        <div 
          className="rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[var(--border-color)]"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)',
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <span className="badge badge-primary flex items-center gap-1.5 w-fit" style={{ fontSize: '0.7rem' }}>
                <Sparkles size={12} />
                Autograding Suite Enabled
              </span>
              <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">
                Assignments & Projects Lab
              </h1>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Track your active course work, complete curriculum challenges, build your production portfolio, and get immediate feedback from the AI Evaluator.
              </p>
            </div>
            
            <div className="flex gap-3 bg-[var(--bg-surface)] border border-[var(--border-color)] px-4 py-3 rounded-2xl md:max-w-xs shrink-0 items-center">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                <Award size={20} />
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Average Portfolio Score</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">94.5% Grade</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs & Metrics */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1" role="tablist">
            {[
              { id: 'assignments', label: 'Active Assignments', count: assignments.filter(a => a.type === 'assignment' && a.status !== 'graded').length },
              { id: 'projects', label: 'Portfolio Projects', count: assignments.filter(a => a.type === 'project').length }
            ].map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedAssignment(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-400'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-surface)] px-4 py-2 rounded-xl border border-[var(--border-color)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Pending Approval
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Graded & Completed
            </span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* List of items */}
          <div className="lg:col-span-2 space-y-4">
            {activeList.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
                <FileText className="mx-auto text-[var(--text-secondary)] mb-4" size={40} />
                <h3 className="text-sm font-bold text-[var(--text-primary)]">No items found</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  You are all caught up! Select other categories or explore new courses.
                </p>
              </div>
            ) : (
              activeList.map(asg => {
                const isPending = asg.status === 'pending';
                const isSubmitted = asg.status === 'submitted';
                const isGraded = asg.status === 'graded';
                
                return (
                  <div 
                    key={asg.id}
                    onClick={() => handleOpenSubmit(asg)}
                    className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:scale-[1.005] ${
                      selectedAssignment?.id === asg.id
                        ? 'border-indigo-500 bg-indigo-500/[0.02] shadow-md shadow-indigo-500/[0.04]'
                        : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-indigo-500/30'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">{asg.courseTitle}</p>
                          <h3 className="text-sm font-bold text-[var(--text-primary)] mt-0.5">{asg.title}</h3>
                        </div>
                        
                        <div className="shrink-0 flex items-center gap-1.5">
                          {isPending && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
                              <Clock size={10} /> Pending
                            </span>
                          )}
                          {isSubmitted && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1">
                              <AlertCircle size={10} /> Under Review
                            </span>
                          )}
                          {isGraded && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                              <CheckCircle size={10} /> Graded
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{asg.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-[var(--border-color)] text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        Due {asg.dueDate}
                      </span>
                      
                      <div className="flex items-center gap-3 font-semibold">
                        <span>Weight: {asg.points} XP</span>
                        {isGraded && (
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                            Score: {asg.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Details & Submission Panel */}
          <div className="lg:col-span-1">
            {selectedAssignment ? (
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-6 animate-slide-up sticky top-24">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase">{selectedAssignment.type} Brief</span>
                  <h2 className="text-sm font-bold text-[var(--text-primary)] mt-1">{selectedAssignment.title}</h2>
                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">{selectedAssignment.description}</p>
                </div>

                {/* Requirements Checklist */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase">Key Requirements</h4>
                  <ul className="space-y-1.5">
                    {selectedAssignment.requirements.map((req, idx) => (
                      <li key={idx} className="flex gap-2 text-[11px] text-[var(--text-secondary)]">
                        <span className="text-indigo-400 font-semibold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submission status or editor */}
                <div className="pt-4 border-t border-[var(--border-color)] space-y-4">
                  {selectedAssignment.status === 'graded' ? (
                    // Graded state
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                        <h4 className="text-xs font-bold text-emerald-400">Graded Complete</h4>
                        <div className="text-lg font-bold text-emerald-300 mt-1">{tempGrade}</div>
                      </div>

                      {submissionFeedback && (
                        <div className="p-4 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] space-y-2">
                          <h5 className="text-[10px] font-bold text-indigo-400 flex items-center gap-1">
                            <Sparkles size={12} /> AI Tutor Evaluator Report
                          </h5>
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed whitespace-pre-line font-mono-data text-[10px]">
                            {submissionFeedback}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Submission fields
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase">Complete Submission</h4>
                      
                      <div className="space-y-3">
                        {/* Notes input */}
                        <div>
                          <label className="text-[10px] font-bold text-[var(--text-secondary)] mb-1 block">Submission Notes</label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Describe your implementation details, challenges faced, or general notes..."
                            className="input-field min-h-[80px] text-xs"
                            disabled={isSubmitting}
                          />
                        </div>

                        {/* Git url */}
                        <div>
                          <label className="text-[10px] font-bold text-[var(--text-secondary)] mb-1 block">GitHub Repository Link</label>
                          <div className="relative">
                            <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input
                              type="url"
                              value={githubUrl}
                              onChange={(e) => setGithubUrl(e.target.value)}
                              placeholder="https://github.com/.../repo"
                              className="input-field pl-9 text-xs"
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>

                        {/* Mock File upload */}
                        <div>
                          <label className="text-[10px] font-bold text-[var(--text-secondary)] mb-1 block">Upload ZIP / Design Archive</label>
                          <div 
                            className="border border-dashed border-[var(--border-color)] bg-[var(--bg-surface-2)] rounded-xl p-3 text-center cursor-pointer hover:bg-muted/30 transition"
                            onClick={() => {
                              if (!isSubmitting) {
                                const mockName = `submission_${selectedAssignment.id}.zip`;
                                setFileName(mockName);
                                toast.success(`Attached archive: ${mockName}`);
                              }
                            }}
                          >
                            <Upload className="mx-auto text-slate-400 mb-1" size={16} />
                            <span className="text-[10px] text-[var(--text-secondary)] font-medium">
                              {fileName ? fileName : 'Click to attach ZIP package (Max 15MB)'}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => simulateAiReview(selectedAssignment.id)}
                          disabled={isSubmitting || (!notes && !githubUrl && !fileName)}
                          className="w-full btn btn-primary flex items-center justify-center gap-2 mt-4 text-xs"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                              Running AI Evaluation...
                            </>
                          ) : (
                            <>
                              <Sparkles size={14} />
                              Submit for AI Grading
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] p-6 text-center text-[var(--text-secondary)] space-y-3 sticky top-24">
                <HelpCircle className="mx-auto" size={32} />
                <h3 className="text-xs font-bold text-[var(--text-primary)]">Select an Item</h3>
                <p className="text-[10px] max-w-[200px] mx-auto leading-relaxed">
                  Click on any assignment or project in the grid to view instructions and open the submission panel.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
