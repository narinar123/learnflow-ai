'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Star, Clock, Users } from 'lucide-react';

interface RecommendedCourse {
  id: string;
  title: string;
  instructor: string;
  category: string;
  thumbnail: string;
  rating: number;
  students: number;
  duration: string;
  reason: string;
  price: string;
  isPro: boolean;
  accentColor: string;
}

const recommendations: RecommendedCourse[] = [
  {
    id: 'r1',
    title: 'TypeScript — The Complete Developer Guide',
    instructor: 'Stephen Grider',
    category: 'Web Dev',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop',
    rating: 4.8,
    students: 12400,
    duration: '24h',
    reason: 'Pairs well with your React skills',
    price: '₹999',
    isPro: true,
    accentColor: 'var(--color-primary-500)',
  },
  {
    id: 'r2',
    title: 'Deep Learning A–Z: Neural Networks & ChatGPT',
    instructor: 'Kirill Eremenko',
    category: 'AI & ML',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=225&fit=crop',
    rating: 4.7,
    students: 8200,
    duration: '36h',
    reason: 'Next step in your ML journey',
    price: '₹1,499',
    isPro: false,
    accentColor: 'var(--color-secondary-500)',
  },
  {
    id: 'r3',
    title: 'Figma Mastery — From Components to Design Systems',
    instructor: 'Courtney Price',
    category: 'Design',
    thumbnail: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=225&fit=crop',
    rating: 4.9,
    students: 5600,
    duration: '18h',
    reason: 'Complements your UI/UX progress',
    price: 'Free',
    isPro: false,
    accentColor: 'var(--color-accent-emerald)',
  },
  {
    id: 'r4',
    title: 'System Design Interview — Mastering Scale',
    instructor: 'Alex Xu',
    category: 'Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop',
    rating: 4.6,
    students: 19800,
    duration: '28h',
    reason: 'Trending in your cohort',
    price: '₹799',
    isPro: true,
    accentColor: 'var(--color-accent-amber)',
  },
];

/**
 * AIRecommendations — Horizontally scrollable course cards
 * recommended by the AI based on learner history and goals.
 */
export function AIRecommendations() {
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
          Based on your progress in <strong style={{ color: 'var(--text-primary)' }}>React & Next.js</strong> and{' '}
          <strong style={{ color: 'var(--text-primary)' }}>UI/UX Design</strong>, these courses will advance your skills
          the most. Personalized for your 2h/day study goal.
        </p>
      </div>

      {/* Scrollable Cards */}
      <div
        className="scroll-x-hidden"
        style={{ paddingBottom: '8px' }}
        role="list"
        aria-label="AI recommended courses"
      >
        <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
          {recommendations.map((course) => (
            <RecommendedCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RecommendedCourseCard({ course }: { course: RecommendedCourse }) {
  return (
    <article
      className="card p-0 overflow-hidden course-card flex flex-col"
      style={{ width: 260, minWidth: 260 }}
      role="listitem"
      aria-label={`${course.title} by ${course.instructor} — rated ${course.rating} stars`}
    >
      {/* Thumbnail */}
      <div className="relative" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.thumbnail}
          alt={`${course.title} course thumbnail`}
          className="course-card-thumbnail w-full h-full"
        />
        {/* Overlay badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between">
          <span
            className="badge text-white"
            style={{
              fontSize: '0.65rem',
              background: course.accentColor,
              border: 'none',
            }}
          >
            {course.category}
          </span>
          {course.isPro && (
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
          {course.instructor}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <span className="flex items-center gap-0.5" aria-label={`${course.rating} stars`}>
            <Star size={11} fill="var(--color-accent-amber)" color="var(--color-accent-amber)" aria-hidden="true" />
            <span style={{ color: 'var(--color-accent-amber)', fontWeight: 600 }}>{course.rating}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-0.5" aria-label={`${course.students.toLocaleString()} students`}>
            <Users size={11} aria-hidden="true" />
            {(course.students / 1000).toFixed(1)}k
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
            className="font-bold"
            style={{
              fontSize: '0.9375rem',
              color: course.price === 'Free' ? 'var(--color-accent-emerald)' : 'var(--text-primary)',
            }}
            aria-label={`Price: ${course.price}`}
          >
            {course.price}
          </span>
          <Link
            href={`/courses/${course.id}`}
            className="btn"
            style={{
              background: course.accentColor,
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
