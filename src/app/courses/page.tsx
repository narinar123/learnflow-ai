'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, Filter, Star, Clock, Award } from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { courses, categories, searchCourses, getCoursesByCategory, instructors } from '@/lib/data';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Filter and search logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory === 'all' || course.categorySlug === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Course Catalog
            </h1>
            <p className="mt-2 text-[var(--text-secondary)]">
              Explore and enroll in AI-curated learning paths tailored to your career goals.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-medium">
              {filteredCourses.length} Courses Found
            </span>
          </div>
        </div>

        {/* Search and Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
            <input
              type="text"
              placeholder="Search courses, skills, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all text-sm"
            />
          </div>

          {/* Level filter */}
          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all text-sm appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(156, 163, 175, 0.8)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundPosition: 'right 12px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Category Selector for Mobile / backup dropdown */}
          <div className="block md:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all text-sm appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(156, 163, 175, 0.8)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundPosition: 'right 12px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
            >
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sidebar + Main course grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar List (Hidden on mobile) */}
          <div className="hidden lg:block space-y-2">
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider px-3 mb-3">
              Categories
            </h3>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] border border-transparent'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === cat.slug ? 'bg-indigo-500/20 text-indigo-300' : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)]'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="lg:col-span-3">
            {filteredCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
                <BookOpen className="text-indigo-400/40 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">No Courses Found</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-sm">
                  We couldn't find any courses matching your search criteria. Try using different keywords or removing filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedLevel('all');
                  }}
                  className="mt-6 btn btn-secondary text-xs px-4 py-2"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const instructor = instructors.find((i) => i.id === course.instructorId);
                  return (
                    <div key={course.id} className="group rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className={`px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full ${
                            course.isFree
                              ? 'bg-emerald-500/90 text-white'
                              : course.includedInPro
                              ? 'bg-indigo-600/90 text-white'
                              : 'bg-amber-600/90 text-white'
                          }`}>
                            {course.isFree ? 'Free' : course.includedInPro ? 'Pro' : 'Premium'}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-black/60 backdrop-blur-md rounded-full text-white">
                            {course.level}
                          </span>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-[10px] text-indigo-400 font-semibold uppercase tracking-wider mb-2">
                            <span>{course.category}</span>
                            <span>•</span>
                            <span>{course.duration}</span>
                          </div>

                          <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug line-clamp-2 group-hover:text-indigo-400 transition-colors mb-2">
                            {course.title}
                          </h3>

                          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-4 leading-relaxed">
                            {course.shortDescription}
                          </p>
                        </div>

                        {/* Bottom Row info */}
                        <div>
                          <div className="flex items-center gap-2 mb-4 pt-3 border-t border-[var(--border-color)]">
                            <img
                              src={instructor?.avatar}
                              alt={instructor?.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-xs font-medium text-[var(--text-secondary)]">
                              {instructor?.name}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="text-amber-400 fill-amber-400" size={14} />
                              <span className="text-xs font-bold text-[var(--text-primary)]">{course.rating}</span>
                              <span className="text-[10px] text-[var(--text-secondary)]">({course.reviewsCount})</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {course.isFree ? (
                                <span className="text-sm font-bold text-emerald-400">Free</span>
                              ) : (
                                <>
                                  {course.originalPrice && (
                                    <span className="text-[10px] text-[var(--text-secondary)] line-through">
                                      ₹{course.originalPrice}
                                    </span>
                                  )}
                                  <span className="text-sm font-bold text-[var(--text-primary)]">
                                    ₹{course.price}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <Link
                            href={`/courses/${course.slug}`}
                            className="mt-4 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs border border-[var(--border-color)] text-[var(--text-primary)] hover:border-indigo-500 hover:text-indigo-400 transition-all bg-[var(--bg-surface-2)]"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
