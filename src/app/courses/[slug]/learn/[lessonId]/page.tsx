'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Play, FileText, CheckCircle, ChevronRight, 
  ChevronLeft, Sparkles, Send, BookOpen, Clock, Award, Star
} from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { getCourseById, demoUser } from '@/lib/data';
import { toast } from 'sonner';

interface LessonPlayerPageProps {
  params: Promise<{ slug: string; lessonId: string }>;
}

export default function LessonPlayerPage({ params }: LessonPlayerPageProps) {
  const router = useRouter();
  const { slug, lessonId } = use(params);
  const course = getCourseById(slug);

  const [activeTab, setActiveTab] = useState<'info' | 'notes' | 'ai'>('info');
  const [aiMessage, setAiMessage] = useState('');
  const [aiChat, setAiChat] = useState<{ sender: 'user' | 'assistant'; text: string }[]>([
    { sender: 'assistant', text: 'Hello Priya! I am your course AI assistant. You can ask me to explain topics, give real-world analogies, or write quiz practice questions based on this lesson!' }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">Course Not Found</h2>
          <Link href="/courses" className="text-indigo-400 underline">Return to courses</Link>
        </div>
      </div>
    );
  }

  // Find active section and lesson
  let activeSection = course.sections[0];
  let activeLesson = activeSection?.lessons[0];

  for (const sec of course.sections) {
    const found = sec.lessons.find(l => l.id === lessonId);
    if (found) {
      activeSection = sec;
      activeLesson = found;
      break;
    }
  }

  if (!activeLesson) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">Lesson Not Found</h2>
          <Link href={`/courses/${course.slug}`} className="text-indigo-400 underline">Back to course overview</Link>
        </div>
      </div>
    );
  }

  // Find next/prev lesson
  const allLessons = course.sections.flatMap(s => s.lessons);
  const activeIdx = allLessons.findIndex(l => l.id === activeLesson.id);
  const prevLesson = activeIdx > 0 ? allLessons[activeIdx - 1] : null;
  const nextLesson = activeIdx < allLessons.length - 1 ? allLessons[activeIdx + 1] : null;

  // Complete lesson handler
  const handleMarkComplete = () => {
    toast.success('Lesson completed! +25 XP');
    
    // Add XP to user
    demoUser.xp += 25;
    
    // Update progress percentage
    const lessonsCompletedCount = Math.min(course.lessonsCount, (demoUser.courseProgress[course.id as keyof typeof demoUser.courseProgress] || 0) + 10);
    (demoUser.courseProgress as any)[course.id] = Math.min(100, lessonsCompletedCount);

    if (nextLesson) {
      router.push(`/courses/${course.slug}/learn/${nextLesson.id}`);
    } else {
      toast.success('🎉 Congratulations! You have completed the course!');
      router.push(`/courses/${course.slug}`);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim() || isAiLoading) return;

    const userText = aiMessage;
    setAiChat(prev => [...prev, { sender: 'user', text: userText }]);
    setAiMessage('');
    setIsAiLoading(true);

    try {
      // Direct call to standard Next.js route or local client-side response
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          courseName: course.title,
          lessonName: activeLesson.title
        })
      });
      
      const data = await response.json();
      setAiChat(prev => [...prev, { sender: 'assistant', text: data.reply || "Sorry, I'm having difficulty connecting right now." }]);
    } catch {
      // Fallback local mock simulation
      setTimeout(() => {
        setAiChat(prev => [...prev, {
          sender: 'assistant',
          text: `In "${course.title}" (${activeLesson.title}), that concept refers to an optimized method of design or development. Would you like a code snippet or simple real-world analogy?`
        }]);
      }, 1000);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="animate-fade-in flex flex-col xl:flex-row gap-6 h-[calc(100vh-120px)] overflow-hidden">
        
        {/* Left Side: Video Player & Tabs */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Link 
                href={`/courses/${course.slug}`} 
                className="p-2 rounded-lg bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-color)]"
              >
                <ArrowLeft size={16} />
              </Link>
              <div>
                <h1 className="text-base font-bold text-[var(--text-primary)] line-clamp-1">
                  {activeLesson.title}
                </h1>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-0.5">
                  {course.title}
                </p>
              </div>
            </div>
          </div>

          {/* Player Container */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-[var(--border-color)] flex-shrink-0 shadow-lg">
            {activeLesson.type === 'video' && activeLesson.videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${activeLesson.videoId}?autoplay=1&modestbranding=1&rel=0`}
                title={activeLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900">
                <FileText className="text-indigo-400 mb-3" size={48} />
                <h3 className="text-lg font-bold text-white mb-2">Lesson Document View</h3>
                <p className="text-sm text-slate-400 max-w-md">
                  This lesson contains written documentation and reference sheets. Read the resources tab below.
                </p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between py-4 border-b border-[var(--border-color)] flex-shrink-0">
            <button
              onClick={() => prevLesson && router.push(`/courses/${course.slug}/learn/${prevLesson.id}`)}
              disabled={!prevLesson}
              className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <button
              onClick={handleMarkComplete}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg transition-all"
            >
              <CheckCircle size={16} />
              <span>Mark Complete & Next</span>
            </button>

            <button
              onClick={() => nextLesson && router.push(`/courses/${course.slug}/learn/${nextLesson.id}`)}
              disabled={!nextLesson}
              className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Bottom Tabs Info Panel */}
          <div className="flex-1 min-h-0 flex flex-col mt-4">
            <div className="flex border-b border-[var(--border-color)] flex-shrink-0" role="tablist">
              {[
                { id: 'info', label: 'About Lesson' },
                { id: 'notes', label: 'Notes' },
                { id: 'ai', label: 'AI Tutor Helpers' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
                    activeTab === t.id 
                      ? 'border-indigo-500 text-indigo-400' 
                      : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin py-4 pr-1">
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Lesson Overview</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {activeLesson.description || 'No detailed overview provided for this lesson yet. Watch the video above to master this concept.'}
                  </p>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <textarea
                    placeholder="Write down key takeaways from this lesson. Notes are automatically saved..."
                    className="w-full h-32 p-3 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={() => toast.success('Notes saved successfully!')}
                      className="btn btn-primary text-xs px-4 py-2"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="flex flex-col h-full min-h-[220px]">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto space-y-3 mb-3 max-h-[140px] pr-2">
                    {aiChat.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                          msg.sender === 'user' 
                            ? 'bg-indigo-600 text-white rounded-tr-none' 
                            : 'bg-[var(--bg-surface-2)] text-[var(--text-primary)] rounded-tl-none border border-[var(--border-color)]'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask the AI Tutor to explain..."
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                    />
                    <button type="submit" className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500">
                      <Send size={14} />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Syllabus Navigation Sidebar */}
        <div className="w-full xl:w-80 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col h-full">
          <div className="px-5 py-4 border-b border-[var(--border-color)] flex-shrink-0">
            <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <BookOpen size={16} className="text-indigo-400" />
              <span>Syllabus</span>
            </h2>
            <div className="progress-track mt-3" style={{ height: 4 }}>
              <div className="progress-fill primary" style={{ width: `${demoUser.courseProgress[course.id as keyof typeof demoUser.courseProgress] || 0}%` }} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-4">
            {course.sections.map((section) => (
              <div key={section.id} className="space-y-1.5">
                <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider px-2 py-1">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => router.push(`/courses/${course.slug}/learn/${lesson.id}`)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
                          isActive
                            ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/30'
                            : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2 max-w-[85%]">
                          <span className="flex-shrink-0">
                            {lesson.type === 'video' ? <Play size={12} /> : <FileText size={12} />}
                          </span>
                          <span className="line-clamp-1">{lesson.title}</span>
                        </div>
                        {lesson.duration ? (
                          <span className="text-[10px] opacity-75">{Math.round(lesson.duration / 60)}m</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
