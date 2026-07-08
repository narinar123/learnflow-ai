'use client';

import React, { useState } from 'react';
import { type CourseModule, type CourseLesson, type LessonType } from '@/lib/course-data';

interface StepCurriculumProps {
  modules: CourseModule[];
  onChange: (modules: CourseModule[]) => void;
}

const lessonTypeConfig: Record<LessonType, { label: string; color: string; icon: React.ReactNode }> = {
  video: {
    label: 'Video',
    color: 'bg-primary/10 text-primary',
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>,
  },
  pdf: {
    label: 'PDF',
    color: 'bg-danger/10 text-danger',
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
  },
  text: {
    label: 'Article',
    color: 'bg-info/10 text-info',
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg>,
  },
  quiz: {
    label: 'Quiz',
    color: 'bg-warning/10 text-warning',
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
  },
  assignment: {
    label: 'Assignment',
    color: 'bg-positive/10 text-positive',
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
  },
  lab: {
    label: 'Lab',
    color: 'bg-purple-500/10 text-purple-400',
    icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0a7 7 0 1 0 14 0M9 14H5" /></svg>,
  },
};

const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}h ${m % 60}m`;
  return `${m}m`;
};

const genId = () => `id_${Math.random().toString(36).slice(2, 9)}`;

export default function StepCurriculum({ modules, onChange }: StepCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(modules.map(m => m.id)));
  const [editingLesson, setEditingLesson] = useState<CourseLesson | null>(null);
  const [editingModule, setEditingModule] = useState<string | null>(null);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalDuration = modules.reduce((acc, m) => acc + m.lessons.reduce((la, l) => la + l.duration, 0), 0);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addModule = () => {
    const newMod: CourseModule = {
      id: genId(),
      courseId: 'current',
      title: `Module ${modules.length + 1}: New Section`,
      order: modules.length + 1,
      lessons: [],
    };
    const updated = [...modules, newMod];
    onChange(updated);
    setExpandedModules(prev => new Set([...prev, newMod.id]));
    setEditingModule(newMod.id);
  };

  const updateModuleTitle = (id: string, title: string) => {
    onChange(modules.map(m => m.id === id ? { ...m, title } : m));
  };

  const deleteModule = (id: string) => {
    onChange(modules.filter(m => m.id !== id));
  };

  const addLesson = (moduleId: string, type: LessonType) => {
    const mod = modules.find(m => m.id === moduleId);
    if (!mod) return;
    const newLesson: CourseLesson = {
      id: genId(),
      moduleId,
      title: `New ${lessonTypeConfig[type].label}`,
      type,
      duration: 600,
      isFreePreview: false,
      order: mod.lessons.length + 1,
    };
    onChange(modules.map(m =>
      m.id === moduleId ? { ...m, lessons: [...m.lessons, newLesson] } : m
    ));
    setEditingLesson(newLesson);
  };

  const updateLesson = (lesson: CourseLesson) => {
    onChange(modules.map(m =>
      m.id === lesson.moduleId
        ? { ...m, lessons: m.lessons.map(l => l.id === lesson.id ? lesson : l) }
        : m
    ));
    setEditingLesson(null);
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    onChange(modules.map(m =>
      m.id === moduleId ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) } : m
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Curriculum</h2>
          <p className="text-sm text-muted-foreground">Build your course structure with modules and lessons.</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span><strong className="text-foreground">{modules.length}</strong> modules</span>
          <span><strong className="text-foreground">{totalLessons}</strong> lessons</span>
          <span><strong className="text-foreground">{formatDuration(totalDuration)}</strong> total</span>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-3">
        {modules.map((mod, modIndex) => {
          const isExpanded = expandedModules.has(mod.id);
          const modDuration = mod.lessons.reduce((acc, l) => acc + l.duration, 0);

          return (
            <div key={mod.id} className="card-base overflow-hidden">
              {/* Module Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                {/* Drag handle */}
                <div className="text-muted-foreground/40 cursor-grab">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="7" r="1" /><circle cx="15" cy="7" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="9" cy="17" r="1" /><circle cx="15" cy="17" r="1" />
                  </svg>
                </div>

                {/* Module number */}
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                  {modIndex + 1}
                </span>

                {/* Title (editable) */}
                {editingModule === mod.id ? (
                  <input
                    type="text"
                    value={mod.title}
                    onChange={(e) => updateModuleTitle(mod.id, e.target.value)}
                    onBlur={() => setEditingModule(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingModule(null)}
                    autoFocus
                    className="input-field py-1.5 text-sm font-semibold flex-1"
                  />
                ) : (
                  <button
                    onClick={() => setEditingModule(mod.id)}
                    className="flex-1 text-left text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {mod.title}
                  </button>
                )}

                {/* Meta */}
                <div className="flex items-center gap-3 ml-2 shrink-0">
                  <span className="text-xs text-muted-foreground">{mod.lessons.length} lessons · {formatDuration(modDuration)}</span>
                  <button onClick={() => deleteModule(mod.id)} className="btn-ghost p-1.5 text-muted-foreground hover:text-danger">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                  <button onClick={() => toggleModule(mod.id)} className="btn-ghost p-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Lessons */}
              {isExpanded && (
                <div>
                  {mod.lessons.map((lesson, lessonIndex) => {
                    const typeConf = lessonTypeConfig[lesson.type];
                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-3 px-4 py-3 border-b border-border/60 hover:bg-muted/40 group transition-colors"
                      >
                        <div className="text-muted-foreground/30 cursor-grab">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="7" r="1" /><circle cx="15" cy="7" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="9" cy="17" r="1" /><circle cx="15" cy="17" r="1" />
                          </svg>
                        </div>

                        <span className="text-xs text-muted-foreground w-4 text-right shrink-0">{lessonIndex + 1}</span>

                        {/* Type badge */}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${typeConf.color} shrink-0`}>
                          {typeConf.icon}
                          {typeConf.label}
                        </span>

                        <span className="flex-1 text-sm text-foreground truncate">{lesson.title}</span>

                        {lesson.isFreePreview && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-positive/10 text-positive font-medium shrink-0">Preview</span>
                        )}

                        <span className="text-xs text-muted-foreground shrink-0">{formatDuration(lesson.duration)}</span>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingLesson(lesson)}
                            className="btn-ghost p-1.5"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteLesson(mod.id, lesson.id)}
                            className="btn-ghost p-1.5 hover:text-danger"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Add Lesson */}
                  <div className="p-3 flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-muted-foreground mr-1">Add lesson:</span>
                    {(Object.keys(lessonTypeConfig) as LessonType[]).map((type) => {
                      const conf = lessonTypeConfig[type];
                      return (
                        <button
                          key={type}
                          onClick={() => addLesson(mod.id, type)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all hover:scale-105 ${conf.color} border-current/20`}
                        >
                          {conf.icon}
                          {conf.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Module Button */}
      <button
        onClick={addModule}
        className="w-full border-2 border-dashed border-border rounded-xl p-5 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200 group"
      >
        <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
        Add New Module
      </button>

      {/* Edit Lesson Drawer */}
      {editingLesson && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setEditingLesson(null)} />
          <div className="w-full max-w-lg bg-card border-l border-border h-full overflow-y-auto p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Edit Lesson</h3>
              <button onClick={() => setEditingLesson(null)} className="btn-ghost p-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div>
              <label className="label-text">Lesson Title</label>
              <input
                type="text"
                value={editingLesson.title}
                onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text">Type</label>
                <select
                  value={editingLesson.type}
                  onChange={(e) => setEditingLesson({ ...editingLesson, type: e.target.value as LessonType })}
                  className="input-field"
                >
                  {(Object.keys(lessonTypeConfig) as LessonType[]).map((t) => (
                    <option key={t} value={t}>{lessonTypeConfig[t].label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text">Duration (minutes)</label>
                <input
                  type="number"
                  value={Math.floor(editingLesson.duration / 60)}
                  onChange={(e) => setEditingLesson({ ...editingLesson, duration: Number(e.target.value) * 60 })}
                  className="input-field"
                  min={0}
                />
              </div>
            </div>

            <div>
              <label className="label-text">Description</label>
              <textarea
                value={editingLesson.description || ''}
                onChange={(e) => setEditingLesson({ ...editingLesson, description: e.target.value })}
                className="input-field resize-none"
                rows={3}
              />
            </div>

            {editingLesson.type === 'video' && (
              <div>
                <label className="label-text">Video URL</label>
                <input
                  type="text"
                  value={editingLesson.videoUrl || ''}
                  onChange={(e) => setEditingLesson({ ...editingLesson, videoUrl: e.target.value })}
                  placeholder="YouTube or Vimeo URL..."
                  className="input-field"
                />
              </div>
            )}

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/60">
              <div>
                <p className="text-sm font-medium text-foreground">Free Preview</p>
                <p className="text-xs text-muted-foreground">Non-enrolled users can watch this</p>
              </div>
              <button
                onClick={() => setEditingLesson({ ...editingLesson, isFreePreview: !editingLesson.isFreePreview })}
                className={`w-11 h-6 rounded-full relative transition-colors ${editingLesson.isFreePreview ? 'bg-primary' : 'bg-border'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${editingLesson.isFreePreview ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => updateLesson(editingLesson)} className="btn-primary flex-1">Save Lesson</button>
              <button onClick={() => setEditingLesson(null)} className="btn-outline flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
