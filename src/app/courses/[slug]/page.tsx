'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Clock, Award, Users, BookOpen, Star, Globe, 
  Calendar, CheckCircle, ChevronRight, Play, Lock, FileText, Check
} from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { getCourseById, getInstructorById, demoUser } from '@/lib/data';

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const course = getCourseById(slug);

  if (!course) {
    notFound();
  }

  const instructor = getInstructorById(course.instructorId);
  const isEnrolled = demoUser.enrolledCourseIds.includes(course.id);
  const progress = demoUser.courseProgress[course.id as keyof typeof demoUser.courseProgress] || 0;

  const handleEnroll = () => {
    // Simulate course enrollment
    if (!isEnrolled) {
      demoUser.enrolledCourseIds.push(course.id);
      (demoUser.courseProgress as any)[course.id] = 0;
    }
    
    // Go to first video lesson or quiz
    const firstSection = course.sections[0];
    if (firstSection && firstSection.lessons[0]) {
      router.push(`/courses/${course.slug}/learn/${firstSection.lessons[0].id}`);
    }
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8">
        {/* Back navigation */}
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </Link>

        {/* Course Header Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-surface-2)] text-[var(--text-secondary)]">
                  {course.level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
                {course.title}
              </h1>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                {course.shortDescription}
              </p>
            </div>

            {/* Quick Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-secondary)] py-4 border-y border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <Star className="text-amber-400 fill-amber-400" size={16} />
                <span className="font-bold text-[var(--text-primary)]">{course.rating}</span>
                <span>({course.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={16} />
                <span>{course.enrolledCount.toLocaleString()} learners</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={16} />
                <span>{course.language}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>Last updated {course.lastUpdated}</span>
              </div>
            </div>

            {/* Instructor Details */}
            {instructor && (
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-color)]">
                <img 
                  src={instructor.avatar} 
                  alt={instructor.name} 
                  className="w-12 h-12 rounded-full object-cover border border-[var(--border-color)]"
                />
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Created by {instructor.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 mb-2">{instructor.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">{instructor.bio}</p>
                </div>
              </div>
            )}

            {/* What you'll learn */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
                {course.whatYoullLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="text-emerald-400 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm text-[var(--text-secondary)] leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content / Syllabus Accordion */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Course curriculum</h2>
              <div className="space-y-4">
                {course.sections.map((section, sIdx) => (
                  <div key={section.id} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 bg-[var(--bg-surface-2)] border-b border-[var(--border-color)]">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">
                          Section {section.order}: {section.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">
                          {section.lessons.length} lessons • {Math.round(section.lessons.reduce((acc, l) => acc + (l.duration || 0), 0) / 60)} mins total
                        </p>
                      </div>
                    </div>

                    <div className="divide-y divide-[var(--border-color)]">
                      {section.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-[var(--bg-surface-2)]/40 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-[var(--text-secondary)]">
                              {lesson.type === 'video' ? <Play size={14} className="text-indigo-400" /> : <FileText size={14} />}
                            </span>
                            <span className="text-sm font-medium text-[var(--text-primary)]">
                              {lesson.title}
                            </span>
                            {lesson.isFreePreview && !isEnrolled && (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Free Preview
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                            {lesson.duration ? (
                              <span>{Math.round(lesson.duration / 60)} mins</span>
                            ) : null}
                            {!isEnrolled && !lesson.isFreePreview ? (
                              <Lock size={12} className="text-[var(--text-secondary)]" />
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 pl-2">
                {course.requirements.map((req, idx) => (
                  <li key={idx} className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Enrollment Sticky Sidebar */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-2xl shadow-black/40">
              <div className="relative aspect-[16/9] bg-slate-900">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white cursor-pointer transition-all border border-white/40">
                    <Play size={20} fill="white" className="ml-1" />
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-baseline gap-3">
                  {course.isFree ? (
                    <span className="text-3xl font-extrabold text-emerald-400">Free</span>
                  ) : (
                    <>
                      <span className="text-3xl font-extrabold text-[var(--text-primary)]">₹{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-sm text-[var(--text-secondary)] line-through">₹{course.originalPrice}</span>
                      )}
                    </>
                  )}
                </div>

                {isEnrolled ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-indigo-400">Enrolled</span>
                      <span className="text-[var(--text-primary)]">{progress}% Completed</span>
                    </div>
                    <div className="progress-track" style={{ height: 6 }}>
                      <div className="progress-fill primary" style={{ width: `${progress}%` }} />
                    </div>
                    <button 
                      onClick={handleEnroll}
                      className="w-full btn btn-primary py-3 font-bold text-sm tracking-wide shadow-lg shadow-indigo-500/20"
                    >
                      {progress === 100 ? 'Review Course' : 'Resume Learning'}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleEnroll}
                    className="w-full btn btn-primary py-3 font-bold text-sm tracking-wide shadow-lg shadow-indigo-500/20"
                  >
                    Enroll Now
                  </button>
                )}

                <div className="space-y-3 pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-medium">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-indigo-400" />
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-indigo-400" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-indigo-400" />
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
