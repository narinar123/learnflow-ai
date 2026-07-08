'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { 
  Award, Sparkles, Download, Linkedin, Copy, Check, Lock, 
  Trophy, Flame, Zap, Star, ShieldAlert, Calendar, Share2 
} from 'lucide-react';
import { badges, Badge, demoUser } from '@/lib/data';
import { toast } from 'sonner';

interface Certificate {
  id: string;
  courseTitle: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  instructorName: string;
}

const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: 'cert_001',
    courseTitle: 'Professional English Communication for Indian Professionals',
    issueDate: '2026-07-04',
    credentialId: 'LF-ENG-98716A',
    verificationUrl: 'https://gsdev.guideitsol.com/verify/LF-ENG-98716A',
    instructorName: 'Priya Nair'
  },
  {
    id: 'cert_002',
    courseTitle: 'Python for Beginners: Zero to Job-Ready',
    issueDate: '2026-06-28',
    credentialId: 'LF-PY-44129B',
    verificationUrl: 'https://gsdev.guideitsol.com/verify/LF-PY-44129B',
    instructorName: 'Dr. Rajan Mehta'
  },
  {
    id: 'cert_003',
    courseTitle: 'UI/UX Design Masterclass with Figma',
    issueDate: '2026-06-15',
    credentialId: 'LF-UIUX-08994X',
    verificationUrl: 'https://gsdev.guideitsol.com/verify/LF-UIUX-08994X',
    instructorName: 'Priya Nair'
  }
];

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState<'certificates' | 'badges'>('certificates');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Verification URL copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = (title: string) => {
    toast.info(`Generating verified PDF download for "${title}"...`);
    setTimeout(() => {
      toast.success('Certificate PDF download completed.');
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-6xl mx-auto pb-10">
        
        {/* Banner with Profile Quick stats */}
        <div 
          className="rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[var(--border-color)]"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)',
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <span className="badge badge-primary flex items-center gap-1.5 w-fit" style={{ fontSize: '0.7rem' }}>
                <Sparkles size={12} />
                Student Credentials Portal
              </span>
              <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">
                Achievements & Verified Credentials
              </h1>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Review your course graduation credentials, track gamified badges checkpoints, and share verified achievements on LinkedIn.
              </p>
            </div>

            {/* Quick Metrics grid */}
            <div className="grid grid-cols-3 gap-3 md:max-w-sm shrink-0">
              <div className="bg-[var(--bg-surface)] p-3 rounded-2xl border border-[var(--border-color)] text-center space-y-1">
                <Trophy size={16} className="text-amber-500 mx-auto" />
                <p className="text-[9px] text-[var(--text-secondary)] uppercase">Level</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">Level {demoUser.level}</p>
              </div>
              <div className="bg-[var(--bg-surface)] p-3 rounded-2xl border border-[var(--border-color)] text-center space-y-1">
                <Flame size={16} className="text-orange-500 mx-auto" />
                <p className="text-[9px] text-[var(--text-secondary)] uppercase">Streak</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">{demoUser.streak} Days</p>
              </div>
              <div className="bg-[var(--bg-surface)] p-3 rounded-2xl border border-[var(--border-color)] text-center space-y-1">
                <Award size={16} className="text-emerald-500 mx-auto" />
                <p className="text-[9px] text-[var(--text-secondary)] uppercase">Earned</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">{DEFAULT_CERTIFICATES.length} Certs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex gap-2 border-b border-[var(--border-color)] pb-px" role="tablist">
          {[
            { id: 'certificates', label: 'Verified Certificates', count: DEFAULT_CERTIFICATES.length },
            { id: 'badges', label: 'Gamified Badges', count: badges.length }
          ].map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSelectedCert(null);
              }}
              className={`pb-3 px-4 font-semibold text-xs border-b-2 transition-all duration-200 -mb-px flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-400 font-bold'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${activeTab === tab.id ? 'bg-indigo-500/15 text-indigo-400' : 'bg-muted text-muted-foreground'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab content panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          <div className="lg:col-span-2">
            {activeTab === 'certificates' ? (
              // CERTIFICATES TAB GRID
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DEFAULT_CERTIFICATES.map(cert => (
                  <div 
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between hover:scale-[1.005] ${
                      selectedCert?.id === cert.id
                        ? 'border-indigo-500 bg-indigo-500/[0.01]'
                        : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-slate-400'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                        <Award size={18} />
                      </div>
                      
                      <div>
                        <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase font-mono tracking-wider">Credential ID: {cert.credentialId}</p>
                        <h3 className="text-xs font-bold text-[var(--text-primary)] mt-1 line-clamp-2 h-8 leading-tight">{cert.courseTitle}</h3>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-3 border-t border-[var(--border-color)] text-[10px] text-[var(--text-secondary)]">
                      <span>Issued {cert.issueDate}</span>
                      <span className="text-indigo-400 font-bold hover:underline">View Cert</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // BADGES TAB GRID
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {badges.map(badge => {
                  const isUnlocked = demoUser.badges.includes(badge.id);
                  return (
                    <div 
                      key={badge.id}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between group relative ${
                        isUnlocked
                          ? 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-indigo-500/30 hover:scale-105'
                          : 'border-[var(--border-color)] bg-[var(--bg-surface)]/40 opacity-40 hover:opacity-60'
                      }`}
                      title={`${badge.name}: ${badge.description}`}
                    >
                      <div className="text-2xl pt-1 select-none">{badge.icon}</div>
                      
                      <div className="mt-2.5">
                        <h4 className="text-[10px] font-bold text-[var(--text-primary)] truncate max-w-[80px]">{badge.name}</h4>
                        <p className="text-[8px] text-indigo-400 font-bold mt-0.5">+{badge.xpReward} XP</p>
                      </div>

                      {!isUnlocked && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-slate-950/60 flex items-center justify-center text-slate-400">
                          <Lock size={8} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* SIDE PANEL DETAILS (e.g. sharing modal frame) */}
          <div className="lg:col-span-1">
            {selectedCert ? (
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-xl shadow-black/25 space-y-6 sticky top-24 animate-slide-up">
                
                {/* Visual mock certificate frame */}
                <div 
                  className="p-5 border-b border-[var(--border-color)] text-center space-y-3 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(140deg, #131130 0%, #1e1b4b 100%)',
                  }}
                >
                  {/* Decorative stamp watermark */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full border border-white/5 flex items-center justify-center text-white/5 font-extrabold text-2xl rotate-12">
                    LFAI
                  </div>
                  
                  <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest block">LearnFlow Academy</span>
                  <div className="w-14 h-0.5 bg-indigo-500 mx-auto" />
                  <p className="text-[8px] text-slate-300 font-mono">Verified Graduation Certificate</p>
                  
                  <h4 className="text-xs font-bold text-white max-w-[200px] mx-auto mt-2 leading-tight">{selectedCert.courseTitle}</h4>
                  
                  <div className="text-[9px] text-slate-400 pt-3">
                    <p className="font-semibold text-white">{demoUser.name}</p>
                    <p className="text-[8px]">on {selectedCert.issueDate}</p>
                  </div>
                </div>

                {/* Operations options */}
                <div className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">Share Credentials</h5>
                    <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                      Add this verified certificate to your LinkedIn profile details under the Licences & Certifications folder.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleDownloadPdf(selectedCert.courseTitle)}
                      className="w-full btn btn-outline py-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold"
                    >
                      <Download size={14} />
                      Download Certificate PDF
                    </button>

                    <button
                      onClick={() => {
                        window.open('https://linkedin.com', '_blank');
                        toast.success('Opened LinkedIn Profile editor.');
                      }}
                      className="w-full btn btn-primary py-2.5 flex items-center justify-center gap-1.5 text-xs font-semibold"
                    >
                      <Linkedin size={14} />
                      Add to LinkedIn Profile
                    </button>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-color)] flex justify-between items-center gap-3">
                    <div className="min-w-0">
                      <p className="text-[8px] text-[var(--text-secondary)] font-bold uppercase">Public Verification ID</p>
                      <p className="text-[10px] font-mono text-[var(--text-primary)] truncate font-semibold">{selectedCert.credentialId}</p>
                    </div>

                    <button
                      onClick={() => handleCopyLink(selectedCert.verificationUrl)}
                      className="btn btn-secondary px-3 py-2 min-h-[32px] text-[10px] flex items-center gap-1 shrink-0"
                    >
                      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      Copy Link
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] p-6 text-center text-[var(--text-secondary)] space-y-3 sticky top-24">
                <Trophy className="mx-auto" size={32} />
                <h3 className="text-xs font-bold text-[var(--text-primary)]">Credential Inspector</h3>
                <p className="text-[10px] max-w-[200px] mx-auto leading-relaxed">
                  Click on any earned certificate card to inspect its details, export PDF files, or copy LinkedIn validation links.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
