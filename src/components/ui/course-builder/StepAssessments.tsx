'use client';

import React, { useState } from 'react';
import { type Quiz, type Exam, type QuizQuestion, type QuestionType } from '@/lib/course-data';

interface StepAssessmentsProps {
  quizzes: Quiz[];
  exams: Exam[];
  onQuizzesChange: (quizzes: Quiz[]) => void;
  onExamsChange: (exams: Exam[]) => void;
}

const genId = () => `asmt_${Math.random().toString(36).slice(2, 9)}`;

export default function StepAssessments({
  quizzes,
  exams,
  onQuizzesChange,
  onExamsChange,
}: StepAssessmentsProps) {
  const [activeTab, setActiveTab] = useState<'quizzes' | 'exams'>('quizzes');
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const [showAddExam, setShowAddExam] = useState(false);

  // New item templates
  const createQuiz = () => {
    const q: Quiz = {
      id: genId(),
      courseId: 'current',
      title: 'New Chapter Quiz',
      description: 'Quick check of your understanding of this module.',
      questions: [],
      timeLimit: 15,
      shuffleQuestions: true,
      shuffleOptions: true,
      showExplanations: true,
      passingScore: 70,
      maxAttempts: 3,
      createdAt: new Date().toISOString().split('T')[0],
    };
    onQuizzesChange([...quizzes, q]);
    setEditingQuiz(q);
    setShowAddQuiz(false);
  };

  const createExam = () => {
    const e: Exam = {
      id: genId(),
      courseId: 'current',
      title: 'Final Certification Exam',
      description: 'Comprehensive evaluation of course material.',
      questions: [],
      timeLimit: 60,
      passingScore: 80,
      maxAttempts: 2,
      isProctored: true,
      shuffleQuestions: true,
      showResults: 'after_review',
      createdAt: new Date().toISOString().split('T')[0],
    };
    onExamsChange([...exams, e]);
    setEditingExam(e);
    setShowAddExam(false);
  };

  const addQuestion = (type: 'quiz' | 'exam') => {
    const qId = genId();
    const newQ: QuizQuestion = {
      id: qId,
      type: 'mcq',
      question: 'Enter question text here?',
      options: [
        { id: genId(), text: 'Option A', isCorrect: true },
        { id: genId(), text: 'Option B', isCorrect: false },
        { id: genId(), text: 'Option C', isCorrect: false },
        { id: genId(), text: 'Option D', isCorrect: false },
      ],
      points: 10,
      difficulty: 'Medium',
      tags: [],
      explanation: 'Explanation for the correct answer.',
    };

    if (type === 'quiz' && editingQuiz) {
      setEditingQuiz({ ...editingQuiz, questions: [...editingQuiz.questions, newQ] });
    } else if (type === 'exam' && editingExam) {
      setEditingExam({ ...editingExam, questions: [...editingExam.questions, newQ] });
    }
  };

  const saveQuiz = (q: Quiz) => {
    onQuizzesChange(quizzes.map((x) => (x.id === q.id ? q : x)));
    setEditingQuiz(null);
  };

  const saveExam = (e: Exam) => {
    onExamsChange(exams.map((x) => (x.id === e.id ? e : x)));
    setEditingExam(null);
  };

  const deleteQuiz = (id: string) => onQuizzesChange(quizzes.filter((q) => q.id !== id));
  const deleteExam = (id: string) => onExamsChange(exams.filter((e) => e.id !== id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Quizzes & Exams</h2>
        <p className="text-sm text-muted-foreground">Build chapter quizzes, configure timers, question banks, and proctored certification exams.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
        {(['quizzes', 'exams'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {tab}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-primary/10 text-primary' : 'bg-border text-muted-foreground'}`}>
              {tab === 'quizzes' ? quizzes.length : exams.length}
            </span>
          </button>
        ))}
      </div>

      {/* QUIZZES TAB */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={createQuiz} className="btn-primary text-sm py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Quiz
            </button>
          </div>

          {quizzes.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground card-base border-dashed bg-muted/10">
              <span className="text-3xl block mb-3">📝</span>
              <p className="text-sm font-semibold">No quizzes created yet</p>
              <p className="text-xs text-muted-foreground mt-1">Add check-on-learning quizzes inside your modules.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {quizzes.map((q) => (
                <div key={q.id} className="card-base p-4 flex items-center justify-between group">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{q.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span>❓ {q.questions.length} questions</span>
                      <span>⏱️ {q.timeLimit ? `${q.timeLimit} mins` : 'No limit'}</span>
                      <span>🎯 Passing: {q.passingScore}%</span>
                      <span>🔄 Attempts: {q.maxAttempts}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingQuiz(q)} className="btn-ghost text-xs py-1.5 px-3">Edit Questions</button>
                    <button onClick={() => deleteQuiz(q.id)} className="btn-ghost text-xs py-1.5 px-3 hover:text-danger">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EXAMS TAB */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={createExam} className="btn-primary text-sm py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Exam
            </button>
          </div>

          {exams.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground card-base border-dashed bg-muted/10">
              <span className="text-3xl block mb-3">🎓</span>
              <p className="text-sm font-semibold">No final exams created yet</p>
              <p className="text-xs text-muted-foreground mt-1">Exams are required for courses that grant verified certificates.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {exams.map((e) => (
                <div key={e.id} className="card-base p-4 flex items-center justify-between group">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-foreground">{e.title}</h3>
                      {e.isProctored && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-danger/10 text-danger font-semibold">Proctored</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span>❓ {e.questions.length} questions</span>
                      <span>⏱️ {e.timeLimit} mins</span>
                      <span>🎯 Passing: {e.passingScore}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingExam(e)} className="btn-ghost text-xs py-1.5 px-3">Edit Questions</button>
                    <button onClick={() => deleteExam(e.id)} className="btn-ghost text-xs py-1.5 px-3 hover:text-danger">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quiz Editor Drawer */}
      {editingQuiz && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setEditingQuiz(null)} />
          <div className="w-full max-w-2xl bg-card border-l border-border h-full overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Edit Quiz: {editingQuiz.title}</h3>
              <button onClick={() => setEditingQuiz(null)} className="btn-ghost p-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text">Quiz Title</label>
                <input type="text" value={editingQuiz.title} onChange={(e) => setEditingQuiz({ ...editingQuiz, title: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="label-text">Time Limit (mins, 0 = no limit)</label>
                <input type="number" value={editingQuiz.timeLimit || 0} onChange={(e) => setEditingQuiz({ ...editingQuiz, timeLimit: Number(e.target.value) || undefined })} className="input-field" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label-text">Passing Score (%)</label>
                <input type="number" value={editingQuiz.passingScore} onChange={(e) => setEditingQuiz({ ...editingQuiz, passingScore: Number(e.target.value) })} className="input-field" />
              </div>
              <div>
                <label className="label-text">Max Attempts</label>
                <input type="number" value={editingQuiz.maxAttempts} onChange={(e) => setEditingQuiz({ ...editingQuiz, maxAttempts: Number(e.target.value) })} className="input-field" />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" checked={editingQuiz.shuffleQuestions} onChange={(e) => setEditingQuiz({ ...editingQuiz, shuffleQuestions: e.target.checked })} className="w-4 h-4 accent-primary" />
                  Shuffle Questions
                </label>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">Questions ({editingQuiz.questions.length})</h4>
                <button onClick={() => addQuestion('quiz')} className="btn-secondary text-xs py-1.5 px-3">+ Add MCQ Question</button>
              </div>

              <div className="space-y-4">
                {editingQuiz.questions.map((q, idx) => (
                  <div key={q.id} className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs font-bold text-primary">Q{idx + 1}</span>
                      <textarea
                        value={q.question}
                        onChange={(e) => {
                          const updated = [...editingQuiz.questions];
                          updated[idx] = { ...q, question: e.target.value };
                          setEditingQuiz({ ...editingQuiz, questions: updated });
                        }}
                        className="input-field text-xs py-1.5 flex-1 resize-none"
                        rows={2}
                      />
                      <button onClick={() => setEditingQuiz({ ...editingQuiz, questions: editingQuiz.questions.filter((x) => x.id !== q.id) })} className="text-danger hover:opacity-80 p-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
                      </button>
                    </div>

                    {/* Options list */}
                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                        {q.options.map((opt, optIdx) => (
                          <div key={opt.id} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`correct_${q.id}`}
                              checked={opt.isCorrect}
                              onChange={() => {
                                const updatedQs = [...editingQuiz.questions];
                                const options = q.options!.map((o) => ({ ...o, isCorrect: o.id === opt.id }));
                                updatedQs[idx] = { ...q, options };
                                setEditingQuiz({ ...editingQuiz, questions: updatedQs });
                              }}
                              className="accent-primary"
                            />
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) => {
                                const updatedQs = [...editingQuiz.questions];
                                const options = [...q.options!];
                                options[optIdx] = { ...opt, text: e.target.value };
                                updatedQs[idx] = { ...q, options };
                                setEditingQuiz({ ...editingQuiz, questions: updatedQs });
                              }}
                              className="input-field py-1 text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button onClick={() => saveQuiz(editingQuiz)} className="btn-primary flex-1">Save Quiz Settings</button>
              <button onClick={() => setEditingQuiz(null)} className="btn-outline flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Exam Editor Drawer */}
      {editingExam && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setEditingExam(null)} />
          <div className="w-full max-w-2xl bg-card border-l border-border h-full overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Edit Exam: {editingExam.title}</h3>
              <button onClick={() => setEditingExam(null)} className="btn-ghost p-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text">Exam Title</label>
                <input type="text" value={editingExam.title} onChange={(e) => setEditingExam({ ...editingExam, title: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="label-text">Time Limit (mins)</label>
                <input type="number" value={editingExam.timeLimit} onChange={(e) => setEditingExam({ ...editingExam, timeLimit: Number(e.target.value) })} className="input-field" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label-text">Passing Score (%)</label>
                <input type="number" value={editingExam.passingScore} onChange={(e) => setEditingExam({ ...editingExam, passingScore: Number(e.target.value) })} className="input-field" />
              </div>
              <div>
                <label className="label-text">Max Attempts</label>
                <input type="number" value={editingExam.maxAttempts} onChange={(e) => setEditingExam({ ...editingExam, maxAttempts: Number(e.target.value) })} className="input-field" />
              </div>
              <div className="flex items-end pb-2 gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" checked={editingExam.isProctored} onChange={(e) => setEditingExam({ ...editingExam, isProctored: e.target.checked })} className="w-4 h-4 accent-primary" />
                  Proctoring Enabled
                </label>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">Questions ({editingExam.questions.length})</h4>
                <button onClick={() => addQuestion('exam')} className="btn-secondary text-xs py-1.5 px-3">+ Add Exam MCQ</button>
              </div>

              <div className="space-y-4">
                {editingExam.questions.map((q, idx) => (
                  <div key={q.id} className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs font-bold text-primary">Q{idx + 1}</span>
                      <textarea
                        value={q.question}
                        onChange={(e) => {
                          const updated = [...editingExam.questions];
                          updated[idx] = { ...q, question: e.target.value };
                          setEditingExam({ ...editingExam, questions: updated });
                        }}
                        className="input-field text-xs py-1.5 flex-1 resize-none"
                        rows={2}
                      />
                      <button onClick={() => setEditingExam({ ...editingExam, questions: editingExam.questions.filter((x) => x.id !== q.id) })} className="text-danger hover:opacity-80 p-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
                      </button>
                    </div>

                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                        {q.options.map((opt, optIdx) => (
                          <div key={opt.id} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`exam_correct_${q.id}`}
                              checked={opt.isCorrect}
                              onChange={() => {
                                const updatedQs = [...editingExam.questions];
                                const options = q.options!.map((o) => ({ ...o, isCorrect: o.id === opt.id }));
                                updatedQs[idx] = { ...q, options };
                                setEditingExam({ ...editingExam, questions: updatedQs });
                              }}
                              className="accent-primary"
                            />
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) => {
                                const updatedQs = [...editingExam.questions];
                                const options = [...q.options!];
                                options[optIdx] = { ...opt, text: e.target.value };
                                updatedQs[idx] = { ...q, options };
                                setEditingExam({ ...editingExam, questions: updatedQs });
                              }}
                              className="input-field py-1 text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button onClick={() => saveExam(editingExam)} className="btn-primary flex-1">Save Exam Settings</button>
              <button onClick={() => setEditingExam(null)} className="btn-outline flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
