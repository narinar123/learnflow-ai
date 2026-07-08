'use client';

import { AppLayout } from '@/components/ui/AppLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { Brain, Clock, Zap, Target } from 'lucide-react';

const mockData = [
  { name: 'Mon', hours: 2.5, score: 85 },
  { name: 'Tue', hours: 3.8, score: 88 },
  { name: 'Wed', hours: 1.5, score: 82 },
  { name: 'Thu', hours: 4.2, score: 90 },
  { name: 'Fri', hours: 5.0, score: 95 },
  { name: 'Sat', hours: 6.5, score: 94 },
  { name: 'Sun', hours: 3.0, score: 91 },
];

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Learning Analytics</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Study Time', value: '124h', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { title: 'AI Queries Used', value: '842', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { title: 'Quizzes Passed', value: '47', icon: Target, color: 'text-green-400', bg: 'bg-green-500/10' },
            { title: 'Current Streak', value: '12 Days', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          ].map((stat, i) => (
            <div key={i} className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)]">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">{stat.title}</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Study Time Chart */}
          <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] h-96">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">Study Time (This Week)</h2>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quiz Scores Chart */}
          <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] h-96">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">Average Quiz Scores</h2>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
