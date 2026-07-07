import React from 'react';
import Link from 'next/link';
import { Avatar } from './Avatar';
import { Badge } from './Badge';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar?: string;
  category: string;
  thumbnail?: string;
  rating?: number;
  reviewCount?: number;
  duration?: string;
  lessonCount?: number;
  price?: number;
  originalPrice?: number;
  isFree?: boolean;
  isEnrolled?: boolean;
  progress?: number; // 0-100
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  isNew?: boolean;
  isBestseller?: boolean;
  color?: string;
}

interface CourseCardProps {
  course: Course;
  href?: string;
  compact?: boolean;
  className?: string;
}

const levelColors = {
  Beginner:     { bg: 'rgba(0,201,167,0.12)',  color: '#00C9A7' },
  Intermediate: { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  Advanced:     { bg: 'rgba(239,68,68,0.12)',  color: '#EF4444' },
};

const gradients = [
  'linear-gradient(135deg,#6C47FF,#8B6FFF)',
  'linear-gradient(135deg,#00C9A7,#0EABF4)',
  'linear-gradient(135deg,#F59E0B,#EF4444)',
  'linear-gradient(135deg,#EC4899,#8B5CF6)',
  'linear-gradient(135deg,#3B82F6,#06B6D4)',
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Rating: ${rating} stars`}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="1.5" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

export function CourseCard({ course, href, compact = false, className = '' }: CourseCardProps) {
  const bgGrad = gradients[course.id.charCodeAt(0) % gradients.length];
  const lvl = course.level ? levelColors[course.level] : null;

  const card = (
    <div
      className={`card-base card-hover overflow-hidden flex flex-col h-full ${className}`}
      style={{ background: 'var(--card)' }}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: compact ? 120 : 160, background: bgGrad, flexShrink: 0 }}
      >
        {course.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
        )}
        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex gap-1">
          {course.isNew && <Badge variant="new">New</Badge>}
          {course.isBestseller && <Badge variant="warning">Bestseller</Badge>}
        </div>
        {course.isEnrolled && (
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-6" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}>
            <div className="flex items-center justify-between text-white text-xs font-medium mb-1">
              <span>{course.progress ?? 0}% complete</span>
            </div>
            <div className="w-full h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }}>
              <div className="h-full rounded-full" style={{ width: `${course.progress ?? 0}%`, background: '#00C9A7' }} />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-2">
        {/* Category + Level */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>{course.category}</span>
          {lvl && (
            <span className="text-xs font-medium px-1.5 py-0.5 rounded-md" style={{ background: lvl.bg, color: lvl.color }}>
              {course.level}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: 'var(--foreground)' }}>
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <Avatar src={course.instructorAvatar} name={course.instructor} size="xs" />
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{course.instructor}</span>
        </div>

        {/* Rating */}
        {course.rating !== undefined && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold" style={{ color: '#F59E0B' }}>{course.rating.toFixed(1)}</span>
            <StarRating rating={course.rating} />
            {course.reviewCount !== undefined && (
              <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>({course.reviewCount.toLocaleString()})</span>
            )}
          </div>
        )}

        {/* Meta */}
        {!compact && (
          <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>
            {course.duration && (
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                {course.duration}
              </span>
            )}
            {course.lessonCount !== undefined && (
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7" /><rect width="15" height="14" x="1" y="5" rx="2" /></svg>
                {course.lessonCount} lessons
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          {course.isEnrolled ? (
            <span className="text-xs font-semibold" style={{ color: '#00C9A7' }}>Enrolled ✓</span>
          ) : course.isFree ? (
            <span className="text-sm font-bold" style={{ color: '#00C9A7' }}>Free</span>
          ) : (
            <div className="flex items-center gap-2">
              {course.price !== undefined && (
                <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>${course.price}</span>
              )}
              {course.originalPrice !== undefined && (
                <span className="text-xs line-through" style={{ color: 'var(--muted-foreground)' }}>${course.originalPrice}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (href) return <Link href={href} className="block h-full" tabIndex={-1}>{card}</Link>;
  return card;
}
