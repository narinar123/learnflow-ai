'use client';

import Link from 'next/link';
import { Play, BookOpen, ArrowRight } from 'lucide-react';
import { demoUser, courses } from '@/lib/data';

/**
 * ActiveCourses — Shows in-progress courses with progress bars,
 * last-lesson info, and quick-continue CTA.
 */
export function ActiveCourses() {
  // Fetch actual enrolled courses from the data layer
  const enrolledCourses = courses
    .filter((c) => demoUser.enrolledCourseIds.includes(c.id))
    .map((course) => {
      const progress = demoUser.courseProgress[course.id as keyof typeof demoUser.courseProgress] || 0;
      const completedCount = Math.round((progress / 100) * course.lessonsCount);
      return {
        ...course,
        progress,
        completedCount,
      };
    })
    .filter((c) => c.progress < 100); // Only show in-progress courses

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
          href="/courses"
          className="flex items-center gap-1 text-sm font-medium hover:underline"
          style={{ color: 'var(--color-primary-400)' }}
          aria-label="View all my courses"
        >
          View all
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="space-y-4" role="list" aria-label="Active courses">
        {enrolledCourses.length === 0 ? (
          <div className="p-8 text-center border border-[var(--border-color)] rounded-2xl bg-[var(--bg-surface-2)]">
            <p className="text-xs text-[var(--text-secondary)]">No courses in progress. Explore our catalog to start learning!</p>
          </div>
        ) : (
          enrolledCourses.map((course) => (
            <CourseProgressCard key={course.id} course={course} />
          ))
        )}
      </div>
    </section>
  );
}

function CourseProgressCard({ course }: { course: any }) {
  const isAlmostDone = course.progress >= 80;
  const accentColor = 'var(--color-primary-500)';

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

          {/* Progress */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1">
              <div className="progress-track" style={{ height: 6 }}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${course.progress}%`,
                    background: accentColor,
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
            <span className="text-xs font-semibold flex-shrink-0" style={{ color: accentColor }}>
              {course.progress}%
            </span>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--border-color)]">
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {course.completedCount}/{course.lessonsCount} lessons • {course.duration}
            </span>
            <Link
              href={`/courses/${course.slug}`}
              className="btn"
              style={{
                background: accentColor,
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
