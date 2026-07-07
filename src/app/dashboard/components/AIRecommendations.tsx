'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Star, Clock, Users } from 'lucide-react';
import { courses, instructors } from '@/lib/data';

/**
 * AIRecommendations — Horizontally scrollable course cards
 * recommended by the AI based on learner history and goals.
 */
export function AIRecommendations() {
  // Pull a subset of courses as recommended ones
  const recommendedCourses = courses
    .filter((c) => c.featured || c.trending)
    .slice(1, 5) // Skip first, grab next 4
    .map((course) => {
      const instructor = instructors.find((i) => i.id === course.instructorId);
      const reasons = [
        'Complements your coding progress',
        'Next step in your analytics journey',
        'Complements your design progress',
        'Trending in your cohort',
      ];
      
      const idx = courses.indexOf(course) % reasons.length;
      return {
        ...course,
        instructorName: instructor?.name || 'Expert Instructor',
        reason: reasons[idx],
      };
    });

  return (
    <section aria-labelledby="ai-recs-heading">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(99, 102, 241, 0.15)' }}
            aria-hidden="true"
          >
            <Sparkles size={16} style={{ color: 'var(--color-primary-400)' }} />
          </div>
          <div>
            <h2
              id="ai-recs-heading"
              className="section-title"
              style={{ marginBottom: 0 }}
            >
              AI Recommendations for You
            </h2>
          </div>
        </div>
        <Link
          href="/courses"
          className="flex items-center gap-1 text-sm font-medium hover:underline"
          style={{ color: 'var(--color-primary-400)' }}
          aria-label="Explore all courses"
        >
          Explore all
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      {/* AI reasoning chip */}
      <div
        className="flex items-start gap-2 p-3 mb-4 rounded-xl text-xs"
        style={{
          background: 'rgba(99, 102, 241, 0.06)',
          border: '1px solid rgba(99, 102, 241, 0.15)',
          color: 'var(--text-secondary)',
        }}
        role="note"
        aria-label="AI recommendation rationale"
      >
        <Sparkles size={14} style={{ color: 'var(--color-primary-400)', flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
        <p>
          Based on your progress in <strong style={{ color: 'var(--text-primary)' }}>Python for Beginners</strong> and{' '}
          <strong style={{ color: 'var(--text-primary)' }}>UI/UX Design Masterclass</strong>, these courses will advance your skills
          the most. Personalized for your 45-minute daily study goal.
        </p>
      </div>

      {/* Scrollable Cards */}
      <div
        className="overflow-x-auto scrollbar-thin"
        style={{ paddingBottom: '8px' }}
        role="list"
        aria-label="AI recommended courses"
      >
        <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
          {recommendedCourses.map((course) => (
            <RecommendedCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RecommendedCourseCard({ course }: { course: any }) {
  const accentColor = 'var(--color-primary-500)';

  return (
    <article
      className="card p-0 overflow-hidden course-card flex flex-col"
      style={{ width: 260, minWidth: 260 }}
      role="listitem"
      aria-label={`${course.title} by ${course.instructorName} — rated ${course.rating} stars`}
    >
      {/* Thumbnail */}
      <div className="relative" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.thumbnail}
          alt={`${course.title} course thumbnail`}
          className="course-card-thumbnail w-full h-full object-cover"
        />
        {/* Overlay badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between">
          <span
            className="badge text-white"
            style={{
              fontSize: '0.65rem',
              background: accentColor,
              border: 'none',
            }}
          >
            {course.category}
          </span>
          {course.includedInPro && (
            <span
              className="badge text-white"
              style={{
                fontSize: '0.65rem',
                background: 'linear-gradient(135deg, var(--color-accent-amber), #f97316)',
                border: 'none',
              }}
            >
              ⚡ Pro
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-3 flex flex-col gap-2">
        {/* AI Reason chip */}
        <div
          className="flex items-center gap-1 text-xs"
          style={{ color: 'var(--color-primary-400)' }}
          aria-label={`AI reason: ${course.reason}`}
        >
          <Sparkles size={10} aria-hidden="true" />
          <span className="truncate">{course.reason}</span>
        </div>

        <h3
          className="font-semibold line-clamp-2"
          style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.35 }}
        >
          {course.title}
        </h3>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {course.instructorName}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <span className="flex items-center gap-0.5" aria-label={`${course.rating} stars`}>
            <Star size={11} fill="var(--color-accent-amber)" color="var(--color-accent-amber)" aria-hidden="true" />
            <span style={{ color: 'var(--color-accent-amber)', fontWeight: 600 }}>{course.rating}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-0.5" aria-label={`${course.enrolledCount.toLocaleString()} students`}>
            <Users size={11} aria-hidden="true" />
            {(course.enrolledCount / 1000).toFixed(1)}k
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-0.5" aria-label={`${course.duration} total`}>
            <Clock size={11} aria-hidden="true" />
            {course.duration}
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid var(--border-color)' }}>
          <span
            className="font-bold text-xs"
            style={{
              color: course.isFree ? 'var(--color-accent-emerald)' : 'var(--text-primary)',
            }}
            aria-label={`Price: ${course.isFree ? 'Free' : `₹${course.price}`}`}
          >
            {course.isFree ? 'Free' : `₹${course.price.toLocaleString()}`}
          </span>
          <Link
            href={`/courses/${course.slug}`}
            className="btn"
            style={{
              background: accentColor,
              color: '#fff',
              fontSize: '0.75rem',
              padding: '5px 12px',
              minHeight: 'auto',
              borderRadius: 'var(--radius-sm)',
            }}
            aria-label={`View ${course.title}`}
          >
            View Course
          </Link>
        </div>
      </div>
    </article>
  );
}
