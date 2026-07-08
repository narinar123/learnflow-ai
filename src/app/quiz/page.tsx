'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { 
  Award, CheckCircle, AlertTriangle, Clock, HelpCircle, ArrowLeft, 
  Sparkles, Check, X, RefreshCw, Bookmark, ChevronRight, Play 
} from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'true_false' | 'fill_blank';
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  courseTitle: string;
  durationMinutes: number;
  xpValue: number;
  questions: Question[];
}

const QUIZZES: Quiz[] = [
  {
    id: 'qz_py_01',
    title: 'Python Fundamentals & Loops Quiz',
    courseTitle: 'Python for Beginners: Zero to Job-Ready',
    durationMinutes: 5,
    xpValue: 100,
    questions: [
      {
        id: 'q1',
        text: 'What is the correct syntax to output the type of a variable `x` in Python?',
        type: 'mcq',
        options: ['print(typeof(x))', 'print(type(x))', 'print(x.type())', 'print(typeof x)'],
        correctAnswer: 'print(type(x))',
        explanation: 'The built-in `type()` function returns the class category of the object variable.'
      },
      {
        id: 'q2',
        text: 'Which python constructor is used to create a block scope dictionary mapping?',
        type: 'mcq',
        options: ['[]', '()', '{}', 'set()'],
        correctAnswer: '{}',
        explanation: 'Curly braces `{}` are used to define key-value dictionary mappings in Python.'
      },
      {
        id: 'q3',
        text: 'In Python, strings are mutable structures that can be index-swapped directly.',
        type: 'true_false',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Python strings are immutable. Any replace operations instantiate completely new string memory allocations.'
      },
      {
        id: 'q4',
        text: 'Which operator is used for floor division in Python?',
        type: 'mcq',
        options: ['/', '//', '%', '\\'],
        correctAnswer: '//',
        explanation: 'Double slashes `//` divide numbers and truncate/round down to the nearest integer.'
      }
    ]
  },
  {
    id: 'qz_ux_01',
    title: 'UI Design Principles & Figma Constraints',
    courseTitle: 'UI/UX Design Masterclass with Figma',
    durationMinutes: 8,
    xpValue: 150,
    questions: [
      {
        id: 'q2_1',
        text: 'Which Figma layout tool is best suited for designing lists and menus that auto-resize?',
        type: 'mcq',
        options: ['Group folders', 'Constraints snapping', 'Auto-Layout', 'Vector networks'],
        correctAnswer: 'Auto-Layout',
        explanation: 'Auto-Layout allows dynamic components to resize automatically as text changes or items flow.'
      },
      {
        id: 'q2_2',
        text: 'Backdrop blur effects in Figma require backdrop-filter variables in CSS.',
        type: 'true_false',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Backdrop blur renders a glassmorphic filter backdrop on browser rendering cards.'
      }
    ]
  },
  {
    id: 'qz_dev_01',
    title: 'AWS Foundations & Cloud Architecture Exam',
    courseTitle: 'AWS Cloud & DevOps Engineering',
    durationMinutes: 10,
    xpValue: 200,
    questions: [
      {
        id: 'q3_1',
        text: 'Which AWS service is designed for serverless compute execution scripts?',
        type: 'mcq',
        options: ['Amazon EC2', 'AWS Lambda', 'Amazon ECS', 'Amazon RDS'],
        correctAnswer: 'AWS Lambda',
        explanation: 'AWS Lambda runs serverless code blocks in response to API Gateways, S3 events, or DynamoDB updates.'
      },
      {
        id: 'q3_2',
        text: 'Amazon S3 is a structured relational database framework.',
        type: 'true_false',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Amazon S3 is a secure object storage service built for unstructured data objects, file backups, and assets.'
      }
    ]
  }
];

export default function QuizPage() {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(0);
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [scoreCount, setScoreCount] = useState(0);

  useEffect(() => {
    if (activeQuiz && timeLeft > 0 && !isExamCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (activeQuiz && timeLeft === 0 && !isExamCompleted) {
      handleForceSubmit();
    }
  }, [timeLeft, activeQuiz, isExamCompleted]);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedForReview([]);
    setIsExamCompleted(false);
    setTimeLeft(quiz.durationMinutes * 60);
    toast.success(`Exam started: ${quiz.title}. Good luck!`);
  };

  const handleSelectAnswer = (qId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleToggleReview = (qId: string) => {
    setMarkedForReview(prev => 
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const handleForceSubmit = () => {
    toast.warning('Time expired! Auto-submitting details.');
    handleSubmitQuiz();
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    
    let correctCount = 0;
    activeQuiz.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    setScoreCount(correctCount);
    setIsExamCompleted(true);
    toast.success(`Exam submitted successfully! Score: ${correctCount}/${activeQuiz.questions.length}`);

    // Update wallet coins
    const isPass = correctCount === activeQuiz.questions.length;
    const coins = localStorage.getItem('student_wallet_coins') || '250';
    const bonus = isPass ? activeQuiz.xpValue + 50 : activeQuiz.xpValue;
    localStorage.setItem('student_wallet_coins', (parseInt(coins) + bonus).toString());
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeQuestion = activeQuiz?.questions[currentQuestionIndex];

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
        
        {activeQuiz === null ? (
          // HOME PORTAL LIST VIEW
          <div className="space-y-6">
            <div 
              className="rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-[var(--border-color)]"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(0, 201, 167, 0.1) 100%)',
              }}
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-xl space-y-3">
                  <span className="badge badge-primary flex items-center gap-1.5 w-fit" style={{ fontSize: '0.7rem' }}>
                    <Sparkles size={12} />
                    Certified Assessments Core
                  </span>
                  <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">
                    Quiz & Certified Exams
                  </h1>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    Test your understanding across curriculum blocks. Get detailed analytics reports, study targets, and earn wallet bonus coins on perfect scores!
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wide">Available Assessments</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUIZZES.map(quiz => (
                  <div 
                    key={quiz.id}
                    className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div>
                        <p className="text-[10px] font-bold text-indigo-400 uppercase">{quiz.courseTitle}</p>
                        <h3 className="text-sm font-bold text-[var(--text-primary)] mt-0.5">{quiz.title}</h3>
                      </div>
                      
                      <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {quiz.durationMinutes} mins
                        </span>
                        <span className="flex items-center gap-1">
                          <HelpCircle size={12} /> {quiz.questions.length} Questions
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-3 border-t border-[var(--border-color)]">
                      <span className="text-[10px] text-[var(--text-secondary)] font-semibold">Reward: {quiz.xpValue} XP</span>
                      <button
                        onClick={() => handleStartQuiz(quiz)}
                        className="btn btn-primary px-3 py-1.5 min-h-[36px] text-xs flex items-center gap-1.5"
                      >
                        <Play size={12} />
                        Start Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // ACTIVE EXAM OR SCORE DETAILS
          <div className="space-y-6">
            
            {/* Header bar */}
            <div className="flex justify-between items-center bg-[var(--bg-surface)] border border-[var(--border-color)] p-4 rounded-2xl">
              <button
                onClick={() => {
                  if (confirm('Exit exam? Unsaved answers will be lost.')) {
                    setActiveQuiz(null);
                  }
                }}
                className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
              >
                <ArrowLeft size={14} /> Exit
              </button>
              
              <h3 className="text-xs font-bold text-[var(--text-primary)] truncate max-w-[200px]">{activeQuiz.title}</h3>

              {!isExamCompleted && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono font-bold rounded-lg">
                  <Clock size={12} />
                  {formatTime(timeLeft)}
                </div>
              )}
            </div>

            {isExamCompleted ? (
              // RESULT VIEW & REVIEW
              <div className="space-y-6 animate-slide-up">
                
                {/* Result Card */}
                <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 text-center space-y-4">
                  <Award className="mx-auto text-indigo-400" size={48} />
                  
                  <div>
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">Assessment Finished</h2>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">Review your results and explanation key below.</p>
                  </div>

                  <div className="flex justify-center items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[var(--text-primary)]">{scoreCount}</span>
                    <span className="text-[var(--text-secondary)] text-sm">/ {activeQuiz.questions.length} Correct</span>
                  </div>

                  {scoreCount === activeQuiz.questions.length ? (
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold">
                      🏆 Perfect Score! Bonus Wallet Coins Dispatched (+50 Coins).
                    </div>
                  ) : (
                    <div className="p-3 bg-indigo-500/5 text-indigo-400 border border-indigo-500/10 rounded-xl text-xs">
                      Study the AI guidelines to fill in remaining gaps.
                    </div>
                  )}

                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="btn btn-secondary px-6 py-2.5 text-xs font-semibold"
                  >
                    Back to Hub
                  </button>
                </div>

                {/* AI Review list */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Detailed Analysis Key</h3>
                  
                  <div className="space-y-4">
                    {activeQuiz.questions.map((q, idx) => {
                      const userAns = answers[q.id];
                      const isCorrect = userAns === q.correctAnswer;
                      
                      return (
                        <div 
                          key={q.id}
                          className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4"
                        >
                          <div className="flex gap-3">
                            <span className="font-bold text-xs text-indigo-400 mt-0.5">Q{idx + 1}.</span>
                            <h4 className="text-xs font-semibold text-[var(--text-primary)]">{q.text}</h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-6">
                            {q.options?.map(opt => {
                              const isOptionCorrect = opt === q.correctAnswer;
                              const isOptionSelected = opt === userAns;
                              
                              return (
                                <div 
                                  key={opt}
                                  className={`p-2.5 rounded-xl border text-xs flex justify-between items-center ${
                                    isOptionCorrect
                                      ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400'
                                      : isOptionSelected
                                        ? 'border-rose-500/30 bg-rose-500/5 text-rose-400'
                                        : 'border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {isOptionCorrect && <Check size={12} />}
                                  {isOptionSelected && !isOptionCorrect && <X size={12} />}
                                </div>
                              );
                            })}
                          </div>

                          <div className="p-3.5 pl-4 rounded-xl border-l-4 border-indigo-500 bg-[var(--bg-surface-2)] text-[10px] text-[var(--text-secondary)] leading-relaxed font-medium">
                            <span className="font-bold text-[var(--text-primary)] block mb-1">Explanation</span>
                            {q.explanation}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : (
              // ACTIVE TEST PANEL
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start animate-slide-up">
                
                {/* Question panel - left */}
                <div className="lg:col-span-3 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">
                      Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                    </span>
                    
                    <button
                      onClick={() => activeQuestion && handleToggleReview(activeQuestion.id)}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-wide transition ${
                        activeQuestion && markedForReview.includes(activeQuestion.id)
                          ? 'text-yellow-500'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <Bookmark size={12} fill={activeQuestion && markedForReview.includes(activeQuestion.id) ? 'currentColor' : 'none'} />
                      Flag Review
                    </button>
                  </div>

                  {activeQuestion && (
                    <div className="space-y-6">
                      <h2 className="text-sm font-bold text-[var(--text-primary)] leading-relaxed">{activeQuestion.text}</h2>
                      
                      <div className="space-y-2">
                        {activeQuestion.options?.map(opt => (
                          <div 
                            key={opt}
                            onClick={() => handleSelectAnswer(activeQuestion.id, opt)}
                            className={`p-3.5 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                              answers[activeQuestion.id] === opt
                                ? 'border-indigo-500 bg-indigo-500/[0.03] text-indigo-400 font-semibold'
                                : 'border-[var(--border-color)] bg-[var(--bg-surface-2)] hover:border-slate-400 text-[var(--text-secondary)]'
                            }`}
                          >
                            <span>{opt}</span>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${answers[activeQuestion.id] === opt ? 'border-indigo-500 bg-indigo-500' : 'border-slate-400'}`}>
                              {answers[activeQuestion.id] === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation controls */}
                  <div className="flex justify-between items-center pt-6 border-t border-[var(--border-color)]">
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="btn btn-secondary px-4 py-2 min-h-[36px] text-xs disabled:opacity-30"
                    >
                      Previous
                    </button>

                    {currentQuestionIndex === activeQuiz.questions.length - 1 ? (
                      <button
                        onClick={handleSubmitQuiz}
                        className="btn btn-primary px-5 py-2 min-h-[36px] text-xs font-bold"
                      >
                        Submit Quiz
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.min(activeQuiz.questions.length - 1, prev + 1))}
                        className="btn btn-primary px-4 py-2 min-h-[36px] text-xs"
                      >
                        Next Question
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress navigator sidebar - right */}
                <div className="lg:col-span-1 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 space-y-4">
                  <h4 className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wide">Test Progress</h4>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {activeQuiz.questions.map((q, idx) => {
                      const isAnswered = !!answers[q.id];
                      const isFlagged = markedForReview.includes(q.id);
                      const isActive = idx === currentQuestionIndex;

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`h-8 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                            isActive
                              ? 'ring-2 ring-indigo-500 text-indigo-400 bg-indigo-500/10'
                              : isFlagged
                                ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                : isAnswered
                                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                  : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-[var(--border-color)] text-[10px] text-[var(--text-secondary)]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded bg-indigo-500/10 border border-indigo-500/20" /> Answered
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded bg-yellow-500/10 border border-yellow-500/20" /> Flagged Review
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded bg-[var(--bg-surface-2)] border border-[var(--border-color)]" /> Unanswered
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </AppLayout>
  );
}
