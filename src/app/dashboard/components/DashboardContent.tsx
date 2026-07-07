'use client';

import { MetricsBentoGrid } from './MetricsBentoGrid';
import { ActiveCourses } from './ActiveCourses';
import { WeeklyHoursChart } from './WeeklyHoursChart';
import { AIRecommendations } from './AIRecommendations';
import { RecentActivity } from './RecentActivity';
import { UpcomingDeadlines } from './UpcomingDeadlines';
import { SkillProgressChart } from './SkillProgressChart';
import { AITutorCard } from './AITutorCard';

/**
 * DashboardContent — Main learner dashboard layout using a 3-column grid.
 * Left col (wide): Metrics bento, active courses, weekly chart, skills chart
 * Right col (narrow): AI tutor, deadlines, recent activity
 * Full width: AI recommendations row
 */
export function DashboardContent() {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const emoji = hour < 12 ? '🌅' : hour < 17 ? '☀️' : '🌙';

  return (
    <div className="space-y-6">
      {/* ─── Header ─── */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="font-display font-bold"
            style={{ fontSize: '1.75rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            {greeting}, Priya {emoji}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.9375rem' }}>
            You're on a{' '}
            <span style={{ color: 'var(--color-accent-amber)', fontWeight: 600 }}>7-day streak</span>
            ! Keep it up — 2 lessons away from your daily goal.
          </p>
        </div>

        {/* Quick AI Action */}
        <button
          type="button"
          className="btn btn-primary hidden sm:flex items-center gap-2"
          style={{ flexShrink: 0 }}
          aria-label="Open AI Tutor"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Ask AI Tutor
        </button>
      </div>

      {/* ─── Metrics Bento Grid ─── */}
      <MetricsBentoGrid />

      {/* ─── Main Content Grid ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column (spans 2) */}
        <div className="xl:col-span-2 space-y-6">
          <ActiveCourses />
          <WeeklyHoursChart />
          <SkillProgressChart />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <AITutorCard />
          <UpcomingDeadlines />
          <RecentActivity />
        </div>
      </div>

      {/* ─── AI Recommendations (full width) ─── */}
      <AIRecommendations />
    </div>
  );
}
