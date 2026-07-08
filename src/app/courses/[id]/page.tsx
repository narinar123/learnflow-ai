'use client';

import { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Star, Clock, BookOpen, Award, CheckCircle, 
  Play, Lock, Globe, MessageSquare, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { courses, instructors } from '@/lib/data';
import { toast } from 'sonner';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor'>('overview');

  const course = useMemo(() => {
    return courses.find(c => c.id === id || c.slug === id);
  }, [id]);

  const instructor = useMemo(() => {
    if (!course) return null;
    return instructors.find(i => i.id === course.instructorId);
  }, [course]);

  if (!course) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 mb-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Course Not Found</h1>
          <p className="max-w-md text-[var(--text-secondary)] text-sm mb-6">
            The course you are looking for does not exist or may have been removed.
          </p>
          <Link href="/courses" className="btn btn-primary">
            Back to Catalog
          </Link>
        </div>
      </AppLayout>
    );
  }

  // Get first lesson ID to allow instant start
  const firstLessonId = course.sections[0]?.lessons[0]?.id;

  const handleEnroll = () => {
    toast.success(`Successfully enrolled in ${course.title}!`);
    if (firstLessonId) {
      router.push(`/learn/${course.id}/${firstLessonId}`);
    }
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6 max-w-6xl mx-auto pb-10">
        
        {/* Back navigation */}
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Catalog
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="badge text-white" style={{ background: 'var(--color-primary-500)', border: 'none' }}>
                  {course.category}
                </span>
                <span className="badge badge-primary">
                  {course.level}
                </span>
                {course.featured && (
                  <span className="badge text-white font-bold" style={{ background: 'linear-gradient(135deg, var(--color-accent-amber), #f97316)', border: 'none' }}>
                    🔥 Top Rated
                  </span>
                )}
              </div>

              <h1 className="text-display font-bold text-[var(--text-primary)]" style={{ fontSize: '2.25rem', lineHeight: 1.25 }}>
                {course.title}
              </h1>

              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                {course.shortDescription}
              </p>

              {/* Course Meta Info */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span className="flex items-center gap-1">
                  <Star size={14} fill="var(--color-accent-amber)" color="var(--color-accent-amber)" />
                  <span className="font-bold text-[var(--text-primary)]">{course.rating}</span>
                  <span>({course.reviewsCount} reviews)</span>
                </span>
                <span>·</span>
                <span>{course.enrolledCount.toLocaleString()} students enrolled</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Globe size={14} />
                  {course.language}
                </span>
              </div>
            </div>

            {/* Interactive Tabs Menu */}
            <div className="border-b border-[var(--border-color)]">
              <div className="flex gap-6 -mb-px" role="tablist" aria-label="Course tabs">
                {(['overview', 'curriculum', 'instructor'] as const).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 font-semibold text-sm capitalize border-b-2 transition-all duration-200 ${
                      activeTab === tab
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Panels */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Long Description */}
                  <div className="space-y-3">
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">Course Description</h2>
                    <div 
                      className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-4 whitespace-pre-line"
                    >
                      {course.description}
                    </div>
                  </div>

                  {/* What you'll learn */}
                  <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
                    <h2 className="text-base font-bold text-[var(--text-primary)]">What You'll Learn</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" role="list">
                      {course.whatYoullLearn.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-3">
                    <h2 className="text-base font-bold text-[var(--text-primary)]">Prerequisites & Requirements</h2>
                    <ul className="list-disc pl-5 space-y-2 text-xs" style={{ color: 'var(--text-secondary)' }} role="list">
                      {course.requirements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span>{course.sections.length} sections · {course.lessonsCount} lessons</span>
                    <span>Total length: {course.duration}</span>
                  </div>

                  <div className="space-y-3" role="list" aria-label="Course curriculum sections">
                    {course.sections.map((section, sIdx) => (
                      <div 
                        key={section.id} 
                        className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden"
                      >
                        {/* Section Header */}
                        <div className="px-5 py-3.5 bg-[var(--bg-surface-2)] border-b border-[var(--border-color)] flex items-center justify-between gap-3">
                          <h3 className="font-semibold text-sm text-[var(--text-primary)]">
                            Section {sIdx + 1}: {section.title}
                          </h3>
                          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {section.lessons.length} lessons
                          </span>
                        </div>

                        {/* Lessons List */}
                        <ul className="divide-y divide-[var(--border-color)]" role="list">
                          {section.lessons.map((lesson) => (
                            <li key={lesson.id} className="px-5 py-3 flex items-center justify-between gap-3 hover:bg-[var(--bg-surface-2)]/50 transition-colors">
                              <div className="flex items-center gap-3 min-w-0">
                                {lesson.type === 'video' ? (
                                  <Play size={14} className="text-indigo-400 shrink-0" />
                                ) : (
                                  <BookOpen size={14} className="text-emerald-400 shrink-0" />
                                )}
                                <span className="text-xs font-medium text-[var(--text-primary)] truncate">
                                  {lesson.title}
                                </span>
                                {lesson.isFreePreview && (
                                  <span className="badge badge-success" style={{ fontSize: '9px', padding: '1px 6px' }}>
                                    Preview
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                <span>{Math.round(lesson.duration / 60)} min</span>
                                {lesson.isFreePreview ? (
                                  <Link 
                                    href={`/learn/${course.id}/${lesson.id}`}
                                    className="text-indigo-400 hover:underline font-bold text-xs"
                                  >
                                    Watch
                                  </Link>
                                ) : (
                                  <Lock size={12} />
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && instructor && (
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[var(--bg-surface-2)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={instructor.avatar} 
                        alt={instructor.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-[var(--text-primary)]">{instructor.name}</h3>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{instructor.title}</p>
                      
                      <div className="flex items-center gap-3 mt-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span className="flex items-center gap-0.5">
                          <Star size={12} fill="var(--color-accent-amber)" color="var(--color-accent-amber)" />
                          <span className="font-bold text-[var(--text-primary)]">{instructor.rating}</span>
                        </span>
                        <span>·</span>
                        <span>{instructor.courses} courses</span>
                        <span>·</span>
                        <span>{instructor.students.toLocaleString()} students</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                    {instructor.bio}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">Expertise & Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {instructor.expertise.map((skill) => (
                        <span key={skill} className="badge badge-primary text-[10px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Pricing & Quick Actions Panel */}
          <div className="space-y-6">
            <div 
              className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-6 shadow-xl sticky top-24"
            >
              {/* Media Preview Aspect ratio 16/9 */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[var(--bg-surface-2)] border border-[var(--border-color)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                    <Play size={18} fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Price Area */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[var(--text-primary)]">
                    {course.isFree ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`}
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm line-through text-[var(--text-secondary)]">
                      ₹{course.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck size={12} />
                  Includes lifetime access & verification QR code
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleEnroll}
                  className="btn btn-gradient w-full py-3 text-sm"
                >
                  Enroll Now
                </button>
                {course.includedInPro && (
                  <div className="text-center">
                    <span className="text-[11px] text-[var(--text-secondary)]">
                      Included with{' '}
                      <Link href="/membership" className="text-indigo-400 font-semibold hover:underline">
                        LearnFlow Pro subscription
                      </Link>
                    </span>
                  </div>
                )}
              </div>

              {/* What is included checklist */}
              <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
                <h4 className="text-xs font-bold text-[var(--text-primary)]">This course includes:</h4>
                <ul className="space-y-2.5" role="list">
                  {[
                    { label: `${course.duration} on-demand video tutorials`, icon: <Play size={14} className="text-indigo-400" /> },
                    { label: `${course.lessonsCount} lessons & resource files`, icon: <BookOpen size={14} className="text-indigo-400" /> },
                    { label: 'Access on mobile, tablet, and web app', icon: <Globe size={14} className="text-indigo-400" /> },
                    { label: 'Verified shareable QR Certificate', icon: <Award size={14} className="text-indigo-400" /> },
                    { label: 'RAG-powered AI chat assistant support', icon: <MessageSquare size={14} className="text-indigo-400" /> },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {item.icon}
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
