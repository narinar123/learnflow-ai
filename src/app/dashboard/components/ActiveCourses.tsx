'use client';

import Link from 'next/link';
import { Play, BookOpen, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  thumbnail: string;
  lastLesson: string;
  timeLeft: string;
  accentColor: string;
}

const activeCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced React & Next.js 14 — App Router Mastery',
    instructor: 'Sarah Johnson',
    category: 'Web Development',
    progress: 68,
    totalLessons: 42,
    completedLessons: 29,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    lastLesson: 'Server Actions & Mutations',
    timeLeft: '4h 20m remaining',
    accentColor: 'var(--color-primary-500)',
  },
  {
    id: '2',
    title: 'Machine Learning with Python — Zero to Production',
    instructor: 'Dr. Arjun Mehta',
    category: 'AI & ML',
    progress: 34,
    totalLessons: 56,
    completedLessons: 19,
    thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=225&fit=crop',
    lastLesson: 'Linear Regression Deep Dive',
    timeLeft: '12h 15m remaining',
    accentColor: 'var(--color-secondary-500)',
  },
  {
    id: '3',
    title: 'UI/UX Design System Fundamentals',
    instructor: 'Meera Patel',
    category: 'Design',
    progress: 88,
    totalLessons: 24,
    completedLessons: 21,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
    lastLesson: 'Component Library Setup',
    timeLeft: '1h 10m remaining',
    accentColor: 'var(--color-accent-emerald)',
  },
];

/**
 * ActiveCourses — Shows in-progress courses with progress bars,
 * last-lesson info, and quick-continue CTA.
 */
export function ActiveCourses() {
  return (
    <section aria-labelledby="active-courses-heading">
      <div className="flex items-center justify-between mb-4">
        <h2
          id="active-courses-heading"
          className="section-title"
          style={{ marginBottom: 0 }}
        >
          Continue Learning
        </h2>
        <Link
          href="/courses/my-courses"
          className="flex items-center gap-1 text-sm font-medium hover:underline"
          style={{ color: 'var(--color-primary-400)' }}
          aria-label="View all my courses"
        >
          View all
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="space-y-4" role="list" aria-label="Active courses">
        {activeCourses.map((course) => (
          <CourseProgressCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

function CourseProgressCard({ course }: { course: Course }) {
  const isAlmostDone = course.progress >= 80;

  return (
    <article
      className="card p-0 overflow-hidden course-card"
      role="listitem"
      aria-label={`${course.title} — ${course.progress}% complete`}
    >
      <div className="flex gap-0">
        {/* Thumbnail */}
        <div
          className="relative flex-shrink-0 hidden sm:block"
          style={{ width: 120, aspectRatio: '4/3' }}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={course.thumbnail}
            alt=""
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'var(--color-primary-500)' }}
            >
              <Play size={16} fill="white" color="white" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <span
                className="badge badge-primary mb-1 inline-block"
                style={{ fontSize: '0.65rem' }}
              >
                {course.category}
              </span>
              <h3
                className="font-semibold line-clamp-1"
                style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}
              >
                {course.title}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                by {course.instructor}
              </p>
            </div>

            {isAlmostDone && (
              <span
                className="badge badge-success flex-shrink-0"
                style={{ fontSize: '0.65rem' }}
                aria-label="Almost complete"
              >
                Almost done!
              </span>
            )}
          </div>

          {/* Last lesson */}
          <p className="text-xs mt-2 mb-3 truncate" style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Next: </span>
            {course.lastLesson}
          </p>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="progress-track" style={{ height: 6 }}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${course.progress}%`,
                    background: course.accentColor,
                    transition: 'width 500ms ease',
                  }}
                  role="progressbar"
                  aria-valuenow={course.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${course.progress}% complete`}
                />
              </div>
            </div>
            <span className="text-xs font-semibold flex-shrink-0" style={{ color: course.accentColor }}>
              {course.progress}%
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {course.completedLessons}/{course.totalLessons} lessons · {course.timeLeft}
            </span>
            <Link
              href={`/courses/${course.id}/continue`}
              className="btn"
              style={{
                background: course.accentColor,
                color: '#fff',
                fontSize: '0.75rem',
                padding: '5px 14px',
                minHeight: 'auto',
                borderRadius: 'var(--radius-sm)',
              }}
              aria-label={`Continue ${course.title}`}
            >
              <Play size={12} fill="white" aria-hidden="true" />
              Continue
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
