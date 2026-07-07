'use client';

import { Sparkles, Award, Flame, Zap, CheckCircle, Share2, Shield, Calendar } from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { demoUser, badges, courses } from '@/lib/data';
import { toast } from 'sonner';

export default function ProfilePage() {
  const userBadges = badges.filter(b => demoUser.badges.includes(b.id));
  const lockedBadges = badges.filter(b => !demoUser.badges.includes(b.id));

  // Mock share certificate handler
  const handleShareCertificate = (courseTitle: string) => {
    toast.success(`Shared certificate for "${courseTitle}" to LinkedIn!`);
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-5xl mx-auto">
        
        {/* Profile Card Banner */}
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
          {/* Accent orbs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <img 
            src={demoUser.avatar} 
            alt={demoUser.name} 
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500/50 shadow-lg shadow-indigo-500/10"
          />

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">{demoUser.name}</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 self-center md:self-auto">
                <Shield size={10} className="fill-indigo-400/20" />
                <span>{demoUser.plan} Member</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">Member since July 2026</p>

            {/* Profile KPI badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-semibold">
                <Flame size={16} className="text-amber-500 fill-amber-500/25" />
                <span>{demoUser.streak} Day Streak</span>
              </div>
              <span className="text-slate-700 hidden sm:block">•</span>
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-semibold">
                <Zap size={16} className="text-indigo-400 fill-indigo-400/25" />
                <span>{demoUser.xp.toLocaleString()} Total XP</span>
              </div>
              <span className="text-slate-700 hidden sm:block">•</span>
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-semibold">
                <Award size={16} className="text-purple-400 fill-purple-400/25" />
                <span>Level {demoUser.level}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Grid: Left (Badges), Right (Certificates) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Badges Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[var(--text-primary)]">Badges ({userBadges.length}/{badges.length})</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Unlocked Badges */}
              {userBadges.map((badge) => (
                <div 
                  key={badge.id} 
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 flex flex-col items-center text-center relative group hover:scale-[1.02] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-indigo-500/10 mb-3 border border-indigo-500/20">
                    {badge.icon}
                  </div>
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">{badge.name}</h3>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-1">{badge.description}</p>
                  <span className="mt-2 text-[9px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                    +{badge.xpReward} XP
                  </span>
                </div>
              ))}

              {/* Locked Badges (Semi-transparent) */}
              {lockedBadges.slice(0, 3).map((badge) => (
                <div 
                  key={badge.id} 
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]/40 p-4 flex flex-col items-center text-center opacity-50 select-none relative"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-[var(--bg-surface-2)] mb-3 border border-transparent grayscale">
                    🔒
                  </div>
                  <h3 className="text-xs font-bold text-[var(--text-secondary)]">{badge.name}</h3>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-1">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates Section */}
          <div className="space-y-6">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Earned Certificates</h2>

            <div className="space-y-4">
              {courses.filter(c => demoUser.courseProgress[c.id as keyof typeof demoUser.courseProgress] === 100).map((course) => (
                <div 
                  key={course.id} 
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-4 hover:scale-[1.02] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-[var(--text-primary)] line-clamp-2">{course.title}</h3>
                      <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Completed July 2026</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <CheckCircle size={16} />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); handleShareCertificate(course.title); }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[var(--border-color)] text-[10px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface-2)]"
                    >
                      <Share2 size={12} />
                      <span>Share on LinkedIn</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
