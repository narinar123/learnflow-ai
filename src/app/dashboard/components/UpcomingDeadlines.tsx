'use client';

import { Calendar, Clock, AlertTriangle } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  course: string;
  type: 'quiz' | 'assignment' | 'live' | 'certificate';
  dueDate: Date;
  urgency: 'low' | 'medium' | 'high';
}

const deadlines: Deadline[] = [
  {
    id: 'd1',
    title: 'Module 4 Final Quiz',
    course: 'React & Next.js',
    type: 'quiz',
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
    urgency: 'high',
  },
  {
    id: 'd2',
    title: 'Week 3 Assignment',
    course: 'ML with Python',
    type: 'assignment',
    dueDate: new Date(Date.now() + 28 * 60 * 60 * 1000), // 28 hours
    urgency: 'medium',
  },
  {
    id: 'd3',
    title: 'Live Q&A Session',
    course: 'UI/UX Design',
    type: 'live',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    urgency: 'low',
  },
];

const typeEmoji: Record<Deadline['type'], string> = {
  quiz: '📝',
  assignment: '📋',
  live: '🎥',
  certificate: '🏆',
};

const urgencyConfig = {
  high: {
    badge: 'rgba(244, 63, 94, 0.2)',
    badgeColor: 'var(--color-error)',
    border: 'rgba(244, 63, 94, 0.3)',
    label: 'Due Soon!',
  },
  medium: {
    badge: 'rgba(245, 158, 11, 0.15)',
    badgeColor: 'var(--color-accent-amber)',
    border: 'rgba(245, 158, 11, 0.25)',
    label: 'This Week',
  },
  low: {
    badge: 'rgba(99, 102, 241, 0.1)',
    badgeColor: 'var(--color-primary-400)',
    border: 'rgba(99, 102, 241, 0.2)',
    label: 'Upcoming',
  },
};

function formatDueTime(date: Date): string {
  const diff = date.getTime() - Date.now();
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(hours / 24);
  if (hours < 24) return `${hours}h left`;
  return `${days}d left`;
}

/**
 * UpcomingDeadlines — Shows upcoming quiz, assignment, and live session
 * deadlines with urgency color-coding and countdown timers.
 */
export function UpcomingDeadlines() {
  return (
    <section className="card" aria-labelledby="deadlines-heading">
      <div className="flex items-center justify-between mb-4">
        <h2
          id="deadlines-heading"
          className="section-title"
          style={{ marginBottom: 0 }}
        >
          Upcoming Deadlines
        </h2>
        <Calendar size={16} style={{ color: 'var(--text-secondary)' }} aria-hidden="true" />
      </div>

      {deadlines.length === 0 ? (
        <div className="text-center py-6" role="status" aria-label="No upcoming deadlines">
          <span style={{ fontSize: '2rem' }} aria-hidden="true">🎉</span>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            You're all caught up!
          </p>
        </div>
      ) : (
        <ol className="space-y-3" aria-label="Upcoming deadlines list">
          {deadlines.map((deadline) => {
            const cfg = urgencyConfig[deadline.urgency];
            const timeLeft = formatDueTime(deadline.dueDate);

            return (
              <li
                key={deadline.id}
                className="p-3 rounded-xl"
                style={{
                  background: cfg.badge,
                  border: `1px solid ${cfg.border}`,
                }}
                aria-label={`${deadline.title} for ${deadline.course} — ${timeLeft} — ${cfg.label}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span aria-hidden="true">{typeEmoji[deadline.type]}</span>
                      <span
                        className="text-sm font-semibold truncate"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {deadline.title}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {deadline.course}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div
                      className="flex items-center gap-1 text-xs font-bold"
                      style={{ color: cfg.badgeColor }}
                      aria-hidden="true"
                    >
                      {deadline.urgency === 'high' && (
                        <AlertTriangle size={11} aria-hidden="true" />
                      )}
                      {timeLeft}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{
                        background: cfg.badge,
                        color: cfg.badgeColor,
                        padding: '1px 6px',
                        borderRadius: '999px',
                        fontWeight: 600,
                        fontSize: '0.65rem',
                      }}
                      aria-hidden="true"
                    >
                      {cfg.label}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-2" aria-hidden="true">
                  <Clock size={10} style={{ color: 'var(--text-secondary)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {deadline.dueDate.toLocaleString('en-IN', {
                      weekday: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      <button
        type="button"
        className="btn btn-ghost w-full mt-3 text-sm"
        style={{ justifyContent: 'center' }}
        aria-label="View full schedule"
      >
        View full schedule
      </button>
    </section>
  );
}
