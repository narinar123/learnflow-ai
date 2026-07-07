'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Play, BookOpen, FileText, CheckCircle, 
  ChevronRight, Sparkles, Send, FileDown, Clock, Save, Edit3
} from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { courses } from '@/lib/data';
import { toast } from 'sonner';

interface PageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function LessonPlayerPage({ params }: PageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'ai' | 'notes' | 'resources'>('ai');
  const [noteText, setNoteText] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([]);

  const course = useMemo(() => {
    return courses.find(c => c.id === params.courseId || c.slug === params.courseId);
  }, [params.courseId]);

  const currentLesson = useMemo(() => {
    if (!course) return null;
    for (const section of course.sections) {
      const found = section.lessons.find(l => l.id === params.lessonId);
      if (found) return found;
    }
    return null;
  }, [course, params.lessonId]);

  const currentSection = useMemo(() => {
    if (!course || !currentLesson) return null;
    return course.sections.find(s => s.id === currentLesson.sectionId);
  }, [course, currentLesson]);

  // Next and Previous lesson calculations
  const { prevLesson, nextLesson } = useMemo(() => {
    if (!course || !currentLesson) return { prevLesson: null, nextLesson: null };
    const allLessons = course.sections.flatMap(s => s.lessons);
    const idx = allLessons.findIndex(l => l.id === currentLesson.id);
    return {
      prevLesson: idx > 0 ? allLessons[idx - 1] : null,
      nextLesson: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
    };
  }, [course, currentLesson]);

  // Load saved notes from local storage
  useEffect(() => {
    if (currentLesson) {
      const saved = localStorage.getItem(`note_${course?.id}_${currentLesson.id}`);
      setNoteText(saved || '');
      
      // Reset chat history with a welcome message relevant to the current lesson
      setChatHistory([
        {
          sender: 'ai',
          text: `Hello Priya! I've loaded the context for "${currentLesson.title}". Ask me any questions, or say "Summarize this lesson" to get started.`
        }
      ]);
    }
  }, [currentLesson, course?.id]);

  const handleSaveNote = () => {
    if (currentLesson) {
      localStorage.setItem(`note_${course?.id}_${currentLesson.id}`, noteText);
      toast.success('Notes auto-saved successfully.');
    }
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiThinking) return;

    const userMessage = chatInput;
    setChatHistory(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');
    setIsAiThinking(true);

    // Simulate RAG lesson response
    await new Promise(resolve => setTimeout(resolve, 1400));
    
    let aiResponse = `I would be happy to explain that! Based on the lesson materials for "${currentLesson?.title}", we are focusing on key practices. Do you want me to write a quick code example or elaborate further on any specific part of it?`;
    
    if (userMessage.toLowerCase().includes('summarize')) {
      aiResponse = `Here is a summary of "${currentLesson?.title}":\n\n1. **Core Concept**: We cover the primary setup and architectural principles.\n2. **Best Practices**: Focus on writing modular, self-contained units of code.\n3. **Application**: Using these constructs allows for much faster execution and better performance scaling under load.`;
    }

    setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    setIsAiThinking(false);
  };

  const handleAddTimestamp = () => {
    const timestamp = `[04:22] `;
    setNoteText(prev => prev + timestamp);
  };

  if (!course || !currentLesson) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Lesson Not Found</h1>
          <p className="max-w-md text-[var(--text-secondary)] text-sm mb-6">
            The lesson page you are trying to reach is not available.
          </p>
          <Link href="/courses" className="btn btn-primary">
            Back to Catalog
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-10">
        
        {/* Left Column: Player & Metadata & Help Tab */}
        <div className="lg:col-span-2 space-y-6">
          {/* Back button */}
          <div className="flex items-center justify-between">
            <Link 
              href={`/courses/${course.id}`} 
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Course Details
            </Link>
            <span className="badge badge-primary text-[10px]">
              {course.title}
            </span>
          </div>

          {/* Immersive Video Player */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-[var(--border-color)]">
            {currentLesson.type === 'video' && currentLesson.videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${currentLesson.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={currentLesson.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-[var(--bg-surface-2)]">
                <FileText size={48} className="text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Reading Assignment: {currentLesson.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-sm">
                  This is a document-based lesson. Review the summary details below or download resources in the tab below.
                </p>
              </div>
            )}
          </div>

          {/* Navigation & Header below player */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[var(--color-primary-400)]">
                  {currentSection?.title}
                </span>
                <h1 className="text-xl font-bold text-[var(--text-primary)] mt-1">
                  {currentLesson.title}
                </h1>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => prevLesson && router.push(`/learn/${course.id}/${prevLesson.id}`)}
                  disabled={!prevLesson}
                  className="btn btn-secondary px-3 py-1.5 min-h-[36px] text-xs disabled:opacity-30 disabled:pointer-events-none"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => nextLesson && router.push(`/learn/${course.id}/${nextLesson.id}`)}
                  disabled={!nextLesson}
                  className="btn btn-primary px-3 py-1.5 min-h-[36px] text-xs disabled:opacity-30 disabled:pointer-events-none"
                >
                  Next Lesson
                </button>
              </div>
            </div>

            {currentLesson.description && (
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {currentLesson.description}
              </p>
            )}
          </div>

          {/* Player Tabbed Section (AI Help, Notes, Resources) */}
          <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
            <div className="flex gap-4 border-b border-[var(--border-color)]">
              {[
                { id: 'ai', label: 'Ask AI Tutor', icon: <Sparkles size={14} /> },
                { id: 'notes', label: 'Lesson Notes', icon: <Edit3 size={14} /> },
                { id: 'resources', label: 'Resources', icon: <FileDown size={14} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 pb-2.5 font-semibold text-xs border-b-2 transition-all duration-200 -mb-px ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div className="min-h-[220px]">
              {activeTab === 'ai' && (
                <div className="space-y-4">
                  {/* Chat message thread */}
                  <div 
                    className="max-h-[300px] overflow-y-auto space-y-3 p-3 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-color)]"
                    role="log"
                    aria-label="AI Tutor Chat History"
                  >
                    {chatHistory.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'items-start'}`}
                      >
                        <div 
                          className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-indigo-500 text-white'
                              : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-color)]'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isAiThinking && (
                      <div className="flex gap-1 items-center p-2 text-xs text-[var(--text-secondary)]">
                        <span className="animate-pulse">Thinking...</span>
                      </div>
                    )}
                  </div>

                  {/* Chat Form */}
                  <form onSubmit={handleSendChatMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask the AI Tutor to explain a concept or write code..."
                      className="input-field flex-1"
                      style={{ minHeight: '40px', fontSize: '0.8rem', padding: '8px 12px' }}
                      aria-label="Ask AI Tutor"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim() || isAiThinking}
                      className="btn btn-primary px-4 py-2 shrink-0 min-h-[40px] text-xs"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[var(--text-secondary)]">
                      Notes are saved locally to your device.
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleAddTimestamp}
                        className="btn btn-secondary px-2.5 py-1 min-h-[28px] text-[10px] rounded-lg"
                      >
                        Add Timestamp
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveNote}
                        className="btn btn-primary px-2.5 py-1 min-h-[28px] text-[10px] rounded-lg flex items-center gap-1"
                      >
                        <Save size={12} />
                        Save Note
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Write down key takeaways, code fragments, or ideas. Use the Add Timestamp button to tag spots in the video."
                    className="input-field w-full min-h-[160px] text-xs leading-relaxed"
                    style={{ padding: '12px' }}
                    aria-label="Lesson notes editor"
                  />
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">Downloadable Resource Attachments</h3>
                  <ul className="space-y-3" role="list">
                    {[
                      { name: 'Summary Cheat Sheet & Syntax Reference', type: 'PDF', size: '2.4 MB' },
                      { name: 'Lesson Practice Lab Source Code Repository', type: 'ZIP', size: '4.8 MB' },
                      { name: 'Self-guided Workbook Exercise Exercises', type: 'PDF', size: '1.2 MB' },
                    ].map((res, idx) => (
                      <li key={idx} className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-indigo-500/30 transition-all">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <FileDown size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-[var(--text-primary)] truncate">{res.name}</p>
                            <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{res.type} · {res.size}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toast.success(`Downloading ${res.name}...`)}
                          className="text-xs font-bold text-indigo-400 hover:underline"
                        >
                          Download
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Course Playlist Sidebar */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Course Curriculum
            </h2>

            <div className="space-y-3" role="navigation" aria-label="Course lessons playlist">
              {course.sections.map((section, sIdx) => (
                <div key={section.id} className="space-y-1">
                  <h3 className="text-xs font-bold text-[var(--text-primary)] px-2 py-1 bg-[var(--bg-surface-2)] rounded-lg">
                    Section {sIdx + 1}: {section.title}
                  </h3>
                  
                  <ul className="space-y-0.5" role="list">
                    {section.lessons.map((lesson) => {
                      const isActive = lesson.id === params.lessonId;
                      
                      return (
                        <li key={lesson.id}>
                          <Link
                            href={`/learn/${course.id}/${lesson.id}`}
                            className={`flex items-center justify-between gap-2 p-2 rounded-xl text-xs transition-all ${
                              isActive
                                ? 'bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/25'
                                : 'hover:bg-[var(--bg-surface-2)]/60 text-[var(--text-secondary)]'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {lesson.type === 'video' ? (
                                <Play size={12} className={isActive ? 'text-indigo-400' : 'text-slate-400'} />
                              ) : (
                                <BookOpen size={12} className="text-emerald-400" />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </div>
                            <span className="text-[10px] shrink-0 text-slate-500">
                              {Math.round(lesson.duration / 60)}m
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
