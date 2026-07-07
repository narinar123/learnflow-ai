'use client';

import { formatDistanceToNow } from 'date-fns';
import { BookOpen, Award, Zap, Trophy, CheckCircle2, Star } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'lesson' | 'quiz' | 'badge' | 'certificate' | 'xp' | 'course';
  title: string;
  description: string;
  timestamp: Date;
  icon: React.ReactNode;
  iconBg: string;
  xp?: number;
}

const activities: ActivityItem[] = [
  {
    id: 'a1',
    type: 'lesson',
    title: 'Lesson Completed',
    description: 'Server Actions & Mutations — React & Next.js',
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 min ago
    icon: <CheckCircle2 size={16} />,
    iconBg: 'rgba(16, 185, 129, 0.2)',
    xp: 50,
  },
  {
    id: 'a2',
    type: 'quiz',
    title: 'Quiz Passed',
    description: 'React Hooks Mastery Quiz — Score: 92%',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    icon: <Star size={16} />,
    iconBg: 'rgba(245, 158, 11, 0.2)',
    xp: 150,
  },
  {
    id: 'a3',
    type: 'badge',
    title: '🏆 Badge Earned',
    description: '"Quiz Ace" — Scored 90%+ on 5 consecutive quizzes',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 - 5 * 60 * 1000),
    icon: <Trophy size={16} />,
    iconBg: 'rgba(168, 85, 247, 0.2)',
    xp: 200,
  },
  {
    id: 'a4',
    type: 'lesson',
    title: 'Lesson Completed',
    description: 'Parallel & Intercepting Routes — Next.js',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    icon: <CheckCircle2 size={16} />,
    iconBg: 'rgba(16, 185, 129, 0.2)',
    xp: 50,
  },
  {
    id: 'a5',
    type: 'course',
    title: 'Course Enrolled',
    description: 'Machine Learning with Python — Zero to Production',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    icon: <BookOpen size={16} />,
    iconBg: 'rgba(99, 102, 241, 0.2)',
  },
];

const iconColors: Record<string, string> = {
  lesson: 'var(--color-accent-emerald)',
  quiz: 'var(--color-accent-amber)',
  badge: 'var(--color-secondary-500)',
  certificate: 'var(--color-accent-amber)',
  xp: 'var(--color-primary-400)',
  course: 'var(--color-primary-500)',
};

/**
 * RecentActivity — Vertical timeline of recent learning events
 * with icons, timestamps, and XP badges.
 */
export function RecentActivity() {
  return (
    <section className="card" aria-labelledby="recent-activity-heading">
      <h2
        id="recent-activity-heading"
        className="section-title"
        style={{ marginBottom: '1rem' }}
      >
        Recent Activity
      </h2>

      <ol className="space-y-0" aria-label="Recent learning activity">
        {activities.map((activity, idx) => (
          <li key={activity.id} className="flex gap-3 relative">
            {/* Timeline line */}
            {idx < activities.length - 1 && (
              <div
                className="absolute left-4 top-10 bottom-0 w-px"
                style={{ background: 'var(--border-color)' }}
                aria-hidden="true"
              />
            )}

            {/* Icon */}
            <div
              className="relative w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
              style={{
                background: activity.iconBg,
                color: iconColors[activity.type],
              }}
              aria-hidden="true"
            >
              {activity.icon}
            </div>

            {/* Content */}
            <div
              className="flex-1 pb-4"
              style={{ minWidth: 0 }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}
                  >
                    {activity.title}
                  </p>
                  <p
                    className="text-xs mt-0.5 line-clamp-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {activity.description}
                  </p>
                </div>
                {activity.xp && (
                  <span
                    className="xp-pill flex-shrink-0 text-xs"
                    style={{ fontSize: '0.7rem', padding: '2px 8px' }}
                    aria-label={`+${activity.xp} XP earned`}
                  >
                    +{activity.xp}
                  </span>
                )}
              </div>
              <time
                dateTime={activity.timestamp.toISOString()}
                className="text-xs mt-1 block"
                style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
              >
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </time>
            </div>
          </li>
        ))}
      </ol>

      <button
        type="button"
        className="btn btn-ghost w-full mt-1 text-sm"
        style={{ justifyContent: 'center' }}
        aria-label="View full activity history"
      >
        View full history
      </button>
    </section>
  );
}
