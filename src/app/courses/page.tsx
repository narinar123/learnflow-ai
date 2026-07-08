'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Star, Clock, BookOpen, Sparkles, Filter, Award } from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { courses, instructors } from '@/lib/data';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showOnlyPro, setShowOnlyPro] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(courses.map(c => c.category));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter courses based on selections
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchesPro = !showOnlyPro || course.includedInPro;

      return matchesSearch && matchesCategory && matchesLevel && matchesPro;
    });
  }, [searchQuery, selectedCategory, selectedLevel, showOnlyPro]);

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-6xl mx-auto">
        {/* Banner Section */}
        <div 
          className="rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[var(--border-color)]"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)',
          }}
        >
          {/* Decorative Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="orb orb-primary w-64 h-64 -top-20 -right-20 opacity-40" />
            <div className="orb orb-secondary w-48 h-48 -bottom-10 left-10 opacity-30" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <span className="badge badge-primary flex items-center gap-1.5 w-fit" style={{ fontSize: '0.7rem' }}>
                <Sparkles size={12} aria-hidden="true" />
                AI-Powered Recommendations Active
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <h1 className="text-display font-bold text-[var(--text-primary)]" style={{ fontSize: '2rem' }}>
                  Explore Course Catalog
                </h1>
                <Link
                  href="/courses/manage"
                  className="btn-secondary py-1.5 px-4 text-xs font-semibold rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 shrink-0 w-fit"
                >
                  ⚙️ Manage Courses
                </Link>
              </div>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                Unlock structured, high-impact learning paths. Complete modules, earn credentials, and test your knowledge with the help of your personal AI tutor.
              </p>
            </div>
            
            <div 
              className="flex items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-color)] px-4 py-3 rounded-2xl md:max-w-xs shrink-0"
              aria-label="AI summary status"
            >
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white text-lg font-bold">
                5k+
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Active Learners Today</p>
                <p className="text-sm font-bold text-[var(--text-primary)]">Personalized For You</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" 
                size={18} 
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programming, design, marketing or specific tags..."
                className="input-field pl-11"
                aria-label="Search courses"
              />
            </div>

            {/* Level & Pro Toggles */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-[var(--bg-surface-2)] border border-[var(--border-color)] px-3 py-1.5 rounded-xl">
                <Filter size={14} className="text-[var(--text-secondary)]" aria-hidden="true" />
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="bg-transparent text-sm font-medium text-[var(--text-primary)] outline-none cursor-pointer"
                  aria-label="Filter by level"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowOnlyPro(!showOnlyPro)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                  showOnlyPro 
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' 
                    : 'bg-[var(--bg-surface-2)] border-[var(--border-color)] text-[var(--text-secondary)]'
                }`}
                aria-pressed={showOnlyPro}
              >
                Included in Pro
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scroll-x-hidden pb-1" role="tablist" aria-label="Course categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
            <div className="w-16 h-16 mb-6 rounded-full bg-[rgba(99,102,241,0.1)] flex items-center justify-center text-[var(--color-primary-500)]">
              <Search size={32} aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No Courses Found</h2>
            <p className="max-w-md text-[var(--text-secondary)] text-sm mb-6">
              We couldn't find any courses matching your search criteria. Try modifying your filters or entering different terms.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
                setShowOnlyPro(false);
              }}
              className="btn btn-primary text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Available courses">
            {filteredCourses.map((course) => {
              const instructor = instructors.find(i => i.id === course.instructorId);
              return (
                <article
                  key={course.id}
                  className="card p-0 overflow-hidden course-card flex flex-col justify-between"
                  role="listitem"
                >
                  <div>
                    {/* Thumbnail area */}
                    <div className="relative aspect-video overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={course.thumbnail} 
                        alt={`${course.title} thumbnail`}
                        className="w-full h-full object-cover course-card-thumbnail"
                      />
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                        <span className="badge text-white" style={{ background: 'var(--color-primary-500)', border: 'none' }}>
                          {course.category}
                        </span>
                        {course.includedInPro && (
                          <span className="badge text-white font-bold" style={{ background: 'linear-gradient(135deg, var(--color-accent-amber), #f97316)', border: 'none' }}>
                            ⚡ PRO
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span className="flex items-center gap-1">
                          <Star size={12} fill="var(--color-accent-amber)" color="var(--color-accent-amber)" />
                          <span className="font-bold text-[var(--text-primary)]">{course.rating}</span>
                          <span>({course.reviewsCount})</span>
                        </span>
                        <span>{course.level}</span>
                      </div>

                      <h3 className="font-display font-bold text-base text-[var(--text-primary)] leading-snug line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                        {course.shortDescription}
                      </p>

                      {/* Info Row */}
                      <div className="flex items-center gap-3 pt-2 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {course.duration}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          {course.lessonsCount} lessons
                        </span>
                        {course.hasCertificate && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-0.5" title="Certificate provided on completion">
                              <Award size={12} className="text-emerald-400" />
                              Cert.
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer area */}
                  <div className="px-5 pb-5 pt-3 border-t border-[var(--border-color)] flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-[var(--bg-surface-2)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={instructor?.avatar} 
                          alt={instructor?.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <span className="text-xs font-medium text-[var(--text-primary)] truncate max-w-[100px]">
                        {instructor?.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[var(--text-primary)]">
                        {course.isFree ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`}
                      </span>
                      <Link 
                        href={`/courses/${course.id}`}
                        className="btn btn-primary"
                        style={{ minHeight: 'auto', padding: '6px 14px', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
