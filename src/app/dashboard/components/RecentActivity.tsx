'use client';

import { BookOpen, Award, Zap, Trophy, CheckCircle2, Star } from 'lucide-react';
import { demoUser } from '@/lib/data';

const iconColors: Record<string, string> = {
  lesson: 'var(--color-accent-emerald)',
  quiz: 'var(--color-accent-amber)',
  badge: 'var(--color-secondary-500)',
  certificate: 'var(--color-accent-amber)',
  xp: 'var(--color-primary-400)',
  course: 'var(--color-primary-500)',
};

const iconMap: Record<string, React.ReactNode> = {
  lesson: <CheckCircle2 size={16} />,
  quiz: <Star size={16} />,
  badge: <Trophy size={16} />,
  certificate: <Award size={16} />,
  course: <BookOpen size={16} />,
};

const iconBgMap: Record<string, string> = {
  lesson: 'rgba(16, 185, 129, 0.2)',
  quiz: 'rgba(245, 158, 11, 0.2)',
  badge: 'rgba(168, 85, 247, 0.2)',
  certificate: 'rgba(245, 158, 11, 0.2)',
  course: 'rgba(99, 102, 241, 0.2)',
};

/**
 * RecentActivity — Vertical timeline of recent learning events
 * loaded dynamically from the user profile data.
 */
export function RecentActivity() {
  const activities = demoUser.recentActivity;

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
          <li key={idx} className="flex gap-3 relative">
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
                background: iconBgMap[activity.type] || 'rgba(255,255,255,0.05)',
                color: iconColors[activity.type] || 'var(--text-primary)',
              }}
              aria-hidden="true"
            >
              {iconMap[activity.type] || <CheckCircle2 size={16} />}
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
                    {activity.text}
                  </p>
                  {activity.course && (
                    <p
                      className="text-xs mt-0.5 line-clamp-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {activity.course}
                    </p>
                  )}
                </div>
                {activity.xp && (
                  <span
                    className="xp-pill flex-shrink-0 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded"
                    style={{ fontSize: '0.7rem' }}
                    aria-label={`+${activity.xp} XP earned`}
                  >
                    +{activity.xp}
                  </span>
                )}
              </div>
              <span
                className="text-xs mt-1 block"
                style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
              >
                {activity.time}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
