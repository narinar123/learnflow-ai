'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LessonItem {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz';
}

interface ModuleItem {
  id: string;
  name: string;
  lessons: LessonItem[];
}

export default function CourseBuilderPage() {
  const [courseTitle, setCourseTitle] = useState('Machine Learning Mastery');
  const [modules, setModules] = useState<ModuleItem[]>([
    {
      id: 'm1',
      name: 'Module 1: Foundations',
      lessons: [
        { id: 'l1', title: 'Introduction to Machine Learning', type: 'video' },
        { id: 'l2', title: 'Supervised vs Unsupervised Learning', type: 'video' },
        { id: 'l3', title: 'Python Setup Cheatsheet', type: 'pdf' },
      ],
    },
    {
      id: 'm2',
      name: 'Module 2: Linear Models',
      lessons: [
        { id: 'l4', title: 'Linear Regression Math', type: 'video' },
        { id: 'l5', title: 'Assessment: Foundations Quiz', type: 'quiz' },
      ],
    },
  ]);

  const handleAddModule = () => {
    const newMod: ModuleItem = {
      id: `m-${Date.now()}`,
      name: 'New Curriculum Module',
      lessons: [],
    };
    setModules(prev => [...prev, newMod]);
  };

  const handleAddLesson = (modId: string) => {
    setModules(prev =>
      prev.map(mod => {
        if (mod.id === modId) {
          return {
            ...mod,
            lessons: [
              ...mod.lessons,
              { id: `l-${Date.now()}`, title: 'New Lesson Resource', type: 'video' },
            ],
          };
        }
        return mod;
      })
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start gap-4 border-b border-slate-800 pb-4">
        <div className="flex flex-col gap-1">
          <Link href="/trainer/courses" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold mb-1 flex items-center gap-1">
            ← Back to Courses
          </Link>
          <input
            type="text"
            value={courseTitle}
            onChange={e => setCourseTitle(e.target.value)}
            className="text-2xl font-bold bg-transparent text-white outline-none border-b border-transparent hover:border-slate-700 focus:border-primary pb-1"
          />
        </div>
        <button
          onClick={() => alert('Syllabus layout saved successfully!')}
          className="btn-primary"
        >
          Save Syllabus
        </button>
      </div>

      <div className="flex flex-col gap-5 max-w-4xl">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white">Course Curriculum Structure</h3>
          <button
            onClick={handleAddModule}
            className="btn-outline py-1.5 px-3 text-xs"
          >
            + Add Module
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {modules.map((mod) => (
            <div key={mod.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center gap-4 border-b border-slate-800 pb-2">
                <input
                  type="text"
                  value={mod.name}
                  onChange={e => {
                    const val = e.target.value;
                    setModules(prev => prev.map(m => m.id === mod.id ? { ...m, name: val } : m));
                  }}
                  className="font-bold text-sm bg-transparent text-slate-200 outline-none border-b border-transparent hover:border-slate-800 focus:border-primary"
                />
                <button
                  onClick={() => handleAddLesson(mod.id)}
                  className="text-xs text-emerald-400 font-semibold hover:text-emerald-300"
                >
                  + Add Resource
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {mod.lessons.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 text-center">No lessons in this module. Click "+ Add Resource" above.</p>
                ) : (
                  mod.lessons.map((les) => (
                    <div key={les.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-800/80 bg-slate-950/60 hover:border-slate-700 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs">
                          {les.type === 'video' ? '🎥' : les.type === 'pdf' ? '📄' : '❓'}
                        </span>
                        <input
                          type="text"
                          value={les.title}
                          onChange={e => {
                            const val = e.target.value;
                            setModules(prev =>
                              prev.map(m =>
                                m.id === mod.id
                                  ? { ...m, lessons: m.lessons.map(l => l.id === les.id ? { ...l, title: val } : l) }
                                  : m
                              )
                            );
                          }}
                          className="text-xs bg-transparent text-slate-300 outline-none border-b border-transparent hover:border-slate-800 focus:border-primary min-w-[200px]"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={les.type}
                          onChange={e => {
                            const val = e.target.value as any;
                            setModules(prev =>
                              prev.map(m =>
                                m.id === mod.id
                                  ? { ...m, lessons: m.lessons.map(l => l.id === les.id ? { ...l, type: val } : l) }
                                  : m
                              )
                            );
                          }}
                          className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] text-slate-400 outline-none"
                        >
                          <option value="video">Video</option>
                          <option value="pdf">PDF File</option>
                          <option value="quiz">Quiz</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
