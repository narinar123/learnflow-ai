'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { 
  Calendar as CalendarIcon, Clock, CheckSquare, Square, Plus, 
  Trash2, BookOpen, AlertCircle, ChevronLeft, ChevronRight, Sparkles 
} from 'lucide-react';
import { toast } from 'sonner';

interface StudyTask {
  id: string;
  title: string;
  courseTitle: string;
  completed: boolean;
  dueDate: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  type: 'deadline' | 'session' | 'study';
  date: string; // YYYY-MM-DD
  time?: string;
}

const DEFAULT_TASKS: StudyTask[] = [
  { id: 'tsk_001', title: 'Complete Section 3 Lesson 11: Defining Functions', courseTitle: 'Python for Beginners', completed: false, dueDate: '2026-07-08' },
  { id: 'tsk_002', title: 'Practice Figma Auto-Layout constraints mockup', courseTitle: 'UI/UX Design Masterclass', completed: true, dueDate: '2026-07-06' },
  { id: 'tsk_003', title: 'Draft Cover Letter responding to Opening', courseTitle: 'English Communication', completed: false, dueDate: '2026-07-10' },
  { id: 'tsk_004', title: 'Review AWS Lambda function deployment triggers', courseTitle: 'AWS Cloud DevOps Engineering', completed: false, dueDate: '2026-07-12' }
];

const DEFAULT_EVENTS: CalendarEvent[] = [
  { id: 'ev_001', title: 'Python OOP Banking System Due', type: 'deadline', date: '2026-07-15' },
  { id: 'ev_002', title: 'Auto-Layout Dashboard UI Challenge Due', type: 'deadline', date: '2026-07-18' },
  { id: 'ev_003', title: 'Live Q&A: Full-Stack React scaling tips', type: 'session', date: '2026-07-20', time: '18:00' },
  { id: 'ev_004', title: 'AWS Cloud Solutions Certification Due', type: 'deadline', date: '2026-07-30' },
  { id: 'ev_005', title: 'Study session: Python loops', type: 'study', date: '2026-07-08', time: '16:00' }
];

export default function PlannerPage() {
  const [activeTab, setActiveTab] = useState<'planner' | 'calendar'>('planner');
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Task creation state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCourse, setNewTaskCourse] = useState('Python for Beginners');
  const [newTaskDate, setNewTaskDate] = useState('2026-07-08');

  // Study scheduling state
  const [scheduleCourse, setScheduleCourse] = useState('Python for Beginners');
  const [scheduleDate, setScheduleDate] = useState('2026-07-08');
  const [scheduleTime, setScheduleTime] = useState('16:00');

  // Calendar states
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 0-indexed, so 6 is July

  useEffect(() => {
    const savedTasks = localStorage.getItem('student_tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(DEFAULT_TASKS);
      localStorage.setItem('student_tasks', JSON.stringify(DEFAULT_TASKS));
    }

    const savedEvents = localStorage.getItem('student_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      setEvents(DEFAULT_EVENTS);
      localStorage.setItem('student_events', JSON.stringify(DEFAULT_EVENTS));
    }
  }, []);

  const saveTasks = (updated: StudyTask[]) => {
    setTasks(updated);
    localStorage.setItem('student_tasks', JSON.stringify(updated));
  };

  const saveEvents = (updated: CalendarEvent[]) => {
    setEvents(updated);
    localStorage.setItem('student_events', JSON.stringify(updated));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: StudyTask = {
      id: `tsk_${Date.now()}`,
      title: newTaskTitle.trim(),
      courseTitle: newTaskCourse,
      completed: false,
      dueDate: newTaskDate
    };

    const updated = [...tasks, newTask];
    saveTasks(updated);
    setNewTaskTitle('');
    toast.success('Study task created successfully.');
  };

  const handleToggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks(updated);
    toast.success('Task status updated.');
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    saveTasks(updated);
    toast.info('Task deleted.');
  };

  const handleScheduleStudySlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: CalendarEvent = {
      id: `ev_${Date.now()}`,
      title: `Study: ${scheduleCourse}`,
      type: 'study',
      date: scheduleDate,
      time: scheduleTime
    };

    const updatedEvents = [...events, newEvent];
    saveEvents(updatedEvents);
    
    // Also create a task for it
    const newTask: StudyTask = {
      id: `tsk_${Date.now()}`,
      title: `Review ${scheduleCourse} concepts`,
      courseTitle: scheduleCourse,
      completed: false,
      dueDate: scheduleDate
    };
    saveTasks([...tasks, newTask]);

    toast.success(`Study session slot scheduled for ${scheduleDate} at ${scheduleTime}`);
  };

  // Calendar rendering helpers
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay(); // 0 is Sunday
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(currentYear, currentMonth);
    const offsetDays = startDayOfMonth(currentYear, currentMonth);
    const dayElements = [];

    // Offset blank slots
    for (let i = 0; i < offsetDays; i++) {
      dayElements.push(<div key={`blank-${i}`} className="min-h-[80px] bg-slate-900/10 border border-slate-900/5" />);
    }

    // Days slots
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);

      dayElements.push(
        <div 
          key={`day-${d}`} 
          className="min-h-[80px] p-2 bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between hover:bg-muted/10 transition group"
        >
          <span className="text-[10px] font-bold text-[var(--text-primary)]">{d}</span>
          
          <div className="space-y-1 mt-1 overflow-y-auto max-h-[50px] scrollbar-thin">
            {dayEvents.map(e => {
              const bgClass = 
                e.type === 'deadline' 
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                  : e.type === 'session' 
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
              
              return (
                <div 
                  key={e.id}
                  className={`text-[8px] font-bold px-1 py-0.5 rounded truncate leading-tight ${bgClass}`}
                  title={`${e.title} ${e.time ? `@ ${e.time}` : ''}`}
                >
                  {e.time ? `${e.time} ` : ''}{e.title}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return dayElements;
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-6xl mx-auto pb-10">
        
        {/* Banner */}
        <div 
          className="rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[var(--border-color)]"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.08) 100%)',
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <span className="badge badge-primary flex items-center gap-1.5 w-fit" style={{ fontSize: '0.7rem' }}>
                <Sparkles size={12} />
                Student Calendar Suite
              </span>
              <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">
                Study Planner & Calendar
              </h1>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Organize your study goals, block focused study hours, set targets, and track course assignment submission deadlines in a visual monthly view.
              </p>
            </div>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex gap-2 border-b border-[var(--border-color)] pb-px" role="tablist">
          {[
            { id: 'planner', label: 'Study Planner Dashboard', icon: <CheckSquare size={14} /> },
            { id: 'calendar', label: 'Learning Calendar', icon: <CalendarIcon size={14} /> }
          ].map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 font-semibold text-xs border-b-2 transition-all duration-200 -mb-px flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-400 font-bold'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'planner' ? (
          // PLANNER VIEW (Tasks Checklist + Schedule Forms)
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Task list Column */}
            <div className="lg:col-span-2 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-5">
              <div>
                <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase">Study Checklist</h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Custom tasks created by you or auto-generated by the AI tutor.</p>
              </div>

              <div className="space-y-2 max-h-[350px] overflow-y-auto scrollbar-thin pr-1">
                {tasks.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[var(--text-secondary)]">Checklist is empty. Add tasks to get started.</div>
                ) : (
                  tasks.map(t => (
                    <div 
                      key={t.id}
                      className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          type="button"
                          onClick={() => handleToggleTask(t.id)}
                          className="text-indigo-400 shrink-0"
                          aria-label="Toggle task completion"
                        >
                          {t.completed ? <CheckSquare size={16} /> : <Square size={16} />}
                        </button>
                        
                        <div className="min-w-0">
                          <p className={`font-semibold truncate ${t.completed ? 'line-through text-slate-500' : 'text-[var(--text-primary)]'}`}>{t.title}</p>
                          <p className="text-[9px] text-[var(--text-secondary)] mt-0.5">{t.courseTitle} · Due {t.dueDate}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteTask(t.id)}
                        className="text-slate-400 hover:text-rose-500 transition shrink-0"
                        aria-label="Delete task"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Task Creation Form */}
              <form onSubmit={handleAddTask} className="pt-4 border-t border-[var(--border-color)] space-y-3">
                <h4 className="text-[10px] font-bold text-[var(--text-secondary)] uppercase">Add custom study task</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Task details e.g., Read variables chapter"
                    className="input-field text-xs sm:col-span-1"
                    style={{ minHeight: '36px' }}
                    required
                  />
                  <select
                    value={newTaskCourse}
                    onChange={(e) => setNewTaskCourse(e.target.value)}
                    className="input-field text-xs sm:col-span-1"
                    style={{ minHeight: '36px' }}
                  >
                    <option value="Python for Beginners">Python for Beginners</option>
                    <option value="UI/UX Figma Design">UI/UX Figma Design</option>
                    <option value="DevOps Engineering">DevOps Engineering</option>
                    <option value="English communication">English Communication</option>
                  </select>
                  
                  <div className="flex gap-2 sm:col-span-1">
                    <input
                      type="date"
                      value={newTaskDate}
                      onChange={(e) => setNewTaskDate(e.target.value)}
                      className="input-field text-xs flex-1"
                      style={{ minHeight: '36px' }}
                      required
                    />
                    
                    <button
                      type="submit"
                      className="btn btn-primary px-3 text-xs font-bold shrink-0 min-h-[36px]"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Time Slot Scheduler - right */}
            <div className="lg:col-span-1 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-5">
              <div>
                <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase flex items-center gap-1">
                  <Clock size={16} className="text-indigo-400" /> Block Study Hours
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Commit to focused learning slots. We'll send push notifications.</p>
              </div>

              <form onSubmit={handleScheduleStudySlot} className="space-y-4 pt-2">
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 block">Select Course Focus</label>
                  <select
                    value={scheduleCourse}
                    onChange={(e) => setScheduleCourse(e.target.value)}
                    className="input-field text-xs"
                    style={{ minHeight: '38px' }}
                  >
                    <option value="Python for Beginners">Python for Beginners</option>
                    <option value="UI/UX Figma Design">UI/UX Figma Design</option>
                    <option value="DevOps Engineering">AWS DevOps Engineering</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 block">Date</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="input-field text-xs"
                      style={{ minHeight: '38px' }}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-1.5 block">Start Time</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="input-field text-xs"
                      style={{ minHeight: '38px' }}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn btn-primary py-2.5 text-xs font-semibold"
                >
                  Schedule Slot
                </button>
              </form>
            </div>

          </div>
        ) : (
          // CALENDAR VIEW (Interactive Grid)
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-6 animate-slide-up">
            
            {/* Calendar Controls */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <CalendarIcon size={18} className="text-indigo-400" />
                <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 border border-[var(--border-color)] rounded-xl bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 border border-[var(--border-color)] rounded-xl bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  aria-label="Next month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Grid days layout */}
            <div>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px] text-[var(--text-secondary)] uppercase tracking-wide pb-2 border-b border-[var(--border-color)]">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-7 gap-1 mt-1.5">
                {renderCalendarDays()}
              </div>
            </div>

            {/* Calendar Legend */}
            <div className="flex flex-wrap items-center gap-4 text-[9px] text-[var(--text-secondary)] font-semibold pt-4 border-t border-[var(--border-color)]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-rose-500/10 border border-rose-500/20" /> Course Deadlines
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-indigo-500/10 border border-indigo-500/20" /> Live Interactive Q&As
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/10 border border-emerald-500/20" /> Scheduled Study Blocks
              </span>
            </div>

          </div>
        )}

      </div>
    </AppLayout>
  );
}
