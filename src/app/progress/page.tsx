'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Award, Zap, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { demoUser } from '@/lib/data';

const SKILLS_DATA = [
  { subject: 'Python', progress: 45 },
  { subject: 'UI/UX Design', progress: 72 },
  { subject: 'English', progress: 100 },
  { subject: 'React', progress: 0 },
  { subject: 'Marketing', progress: 0 },
];

export default function ProgressPage() {
  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-5xl mx-auto">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Progress Analytics
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            View detailed stats about your study patterns, completed concepts, and learning consistency.
          </p>
        </div>

        {/* Quick Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Weekly Study Time', value: '3.3 hours', desc: 'Active this week', icon: <Clock className="text-indigo-400" size={18} /> },
            { label: 'Total Course Completion', value: '3 completed', desc: 'Over 47 lessons', icon: <BookOpen className="text-emerald-400" size={18} /> },
            { label: 'XP Multiplier', value: '1.5x active', desc: '7-day streak bonus', icon: <Zap className="text-amber-400" size={18} /> },
            { label: 'Weekly Level Target', value: 'Level 5', desc: 'Level up in 250 XP', icon: <Award className="text-purple-400" size={18} /> },
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">{item.label}</span>
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface-2)] flex items-center justify-center border border-[var(--border-color)]">
                  {item.icon}
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--text-primary)]">{item.value}</div>
                <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Study Time */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <TrendingUp size={16} className="text-indigo-400" />
                <span>Weekly Study Hours</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">Study minutes logged per day this week.</p>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demoUser.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a283e" vertical={false} />
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={11} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} unit="m" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#16142a', borderColor: '#2d2b45', borderRadius: '12px' }}
                    labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                    itemStyle={{ color: '#818cf8', fontSize: '11px' }}
                  />
                  <Bar dataKey="minutes" fill="#6c47ff" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Skills Radar/Bar representation */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <Sparkles size={16} className="text-purple-400" />
                <span>Subject Mastery</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">Progress rating across categories.</p>
            </div>

            <div className="space-y-4 h-64 overflow-y-auto pr-1">
              {SKILLS_DATA.map((skill) => (
                <div key={skill.subject} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[var(--text-primary)]">{skill.subject}</span>
                    <span className="text-indigo-400">{skill.progress}%</span>
                  </div>
                  <div className="progress-track" style={{ height: 6 }}>
                    <div className="progress-fill primary" style={{ width: `${skill.progress}%` }} />
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
