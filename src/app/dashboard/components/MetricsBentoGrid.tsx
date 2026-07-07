'use client';

import { BookOpen, Clock, Award, Flame, TrendingUp, Zap } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  iconBg: string;
  trend?: { value: number; label: string };
  accent?: string;
  wide?: boolean;
}

const metrics: MetricCardProps[] = [
  {
    label: 'Courses Enrolled',
    value: 8,
    subValue: '3 in progress',
    icon: <BookOpen size={22} />,
    iconBg: 'rgba(99, 102, 241, 0.2)',
    accent: 'var(--color-primary-500)',
    trend: { value: 2, label: 'this month' },
  },
  {
    label: 'Hours Learned',
    value: '47.5h',
    subValue: 'This month',
    icon: <Clock size={22} />,
    iconBg: 'rgba(16, 185, 129, 0.2)',
    accent: 'var(--color-accent-emerald)',
    trend: { value: 18, label: 'vs last month' },
  },
  {
    label: 'Certificates Earned',
    value: 5,
    subValue: '2 shared on LinkedIn',
    icon: <Award size={22} />,
    iconBg: 'rgba(168, 85, 247, 0.2)',
    accent: 'var(--color-secondary-500)',
  },
  {
    label: 'Day Streak',
    value: 7,
    subValue: 'Best: 23 days',
    icon: <Flame size={22} />,
    iconBg: 'rgba(245, 158, 11, 0.2)',
    accent: 'var(--color-accent-amber)',
  },
  {
    label: 'Total XP',
    value: '12,450',
    subValue: 'Level 12 · 550 to next',
    icon: <Zap size={22} />,
    iconBg: 'rgba(99, 102, 241, 0.15)',
    accent: 'var(--color-primary-400)',
    wide: true,
  },
  {
    label: 'Weekly Rank',
    value: '#24',
    subValue: 'Top 15% on leaderboard',
    icon: <TrendingUp size={22} />,
    iconBg: 'rgba(16, 185, 129, 0.15)',
    accent: 'var(--color-accent-emerald)',
    trend: { value: 6, label: 'rank up' },
  },
];

/**
 * MetricsBentoGrid — A responsive bento-grid of KPI metric cards.
 * Features: trend arrows, XP bar, streak flame, glassmorphism cards.
 */
export function MetricsBentoGrid() {
  return (
    <section aria-labelledby="metrics-heading">
      <h2 id="metrics-heading" className="sr-only">Learning metrics</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* XP Progress Bar — spans full width below */}
      <div
        className="mt-4 p-4 rounded-xl"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
        }}
        aria-label="XP progress: Level 12, 550 XP to next level"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
              style={{ background: 'rgba(99,102,241,0.2)', color: 'var(--color-primary-400)' }}
              aria-hidden="true"
            >
              12
            </span>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Level 12
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              12,450 / 13,000 XP
            </span>
            <span
              className="badge badge-primary"
              style={{ fontSize: '0.7rem' }}
            >
              550 to Level 13
            </span>
          </div>
        </div>
        <div className="progress-track" style={{ height: 8 }}>
          <div
            className="progress-fill primary"
            style={{ width: '95.8%' }}
            role="progressbar"
            aria-valuenow={12450}
            aria-valuemin={12000}
            aria-valuemax={13000}
            aria-label="XP progress"
          />
        </div>
      </div>
    </section>
  );
}

function MetricCard({ label, value, subValue, icon, iconBg, trend, accent, wide }: MetricCardProps) {
  return (
    <div
      className={`card p-4 flex flex-col gap-3 ${wide ? 'col-span-2 sm:col-span-1' : ''}`}
      style={{ minHeight: '110px' }}
      aria-label={`${label}: ${value}${subValue ? `, ${subValue}` : ''}`}
    >
      {/* Icon + Trend */}
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg, color: accent }}
          aria-hidden="true"
        >
          {icon}
        </div>
        {trend && (
          <span
            className="flex items-center gap-0.5 text-xs font-semibold"
            style={{ color: trend.value >= 0 ? 'var(--color-accent-emerald)' : 'var(--color-error)' }}
            aria-label={`${trend.value > 0 ? '+' : ''}${trend.value} ${trend.label}`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ transform: trend.value >= 0 ? 'none' : 'rotate(180deg)' }}
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            {Math.abs(trend.value)}
          </span>
        )}
      </div>

      {/* Value */}
      <div>
        <div
          className="font-display font-bold leading-none"
          style={{ fontSize: '1.5rem', color: accent ?? 'var(--text-primary)' }}
          aria-hidden="true"
        >
          {value}
        </div>
        <div className="text-xs font-semibold mt-1" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </div>
        {subValue && (
          <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
            {subValue}
          </div>
        )}
      </div>
    </div>
  );
}
