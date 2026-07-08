'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { BookOpen, Zap, HelpCircle, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

export default function AIMaterialsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('summary');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generateContent = async () => {
    if (!content.trim()) {
      toast.error('Please paste some course content first.');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');

      setResult(data.result);
      toast.success(`Successfully generated ${activeTab}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 h-full">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">AI Course Materials</h1>
        <p className="text-[var(--text-secondary)] mb-8">Generate study aids instantly from your course transcripts or notes.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: Input */}
          <div className="flex flex-col h-full bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)]">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4">Source Material</h2>
            <textarea
              className="flex-1 w-full p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] min-h-[300px] resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="Paste lesson transcript, text, or concepts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {[
                { id: 'summary', icon: FileText, label: 'Summary' },
                { id: 'notes', icon: BookOpen, label: 'Detailed Notes' },
                { id: 'flashcards', icon: Zap, label: 'Flashcards' },
                { id: 'quiz', icon: HelpCircle, label: 'Practice Quiz' },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      isActive ? 'bg-indigo-600 text-white' : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-indigo-500/10'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={generateContent}
              disabled={isLoading || !content.trim()}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl disabled:opacity-50 transition-all hover:scale-[0.98]"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
              Generate AI {activeTab}
            </button>
          </div>

          {/* Right: Output */}
          <div className="flex flex-col h-full bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] overflow-y-auto max-h-[600px] min-h-[400px]">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4">Generated Output</h2>
            
            {!result && !isLoading && (
              <div className="flex-1 flex items-center justify-center text-[var(--text-secondary)] text-sm">
                Your generated materials will appear here.
              </div>
            )}

            {isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center text-indigo-400 gap-4">
                <Loader2 size={32} className="animate-spin" />
                <p className="text-sm">AI is thinking...</p>
              </div>
            )}

            {result && !isLoading && (
              <div className="space-y-4">
                {(activeTab === 'summary' || activeTab === 'notes') && (
                  <div className="prose prose-invert max-w-none text-sm leading-relaxed text-[var(--text-primary)] whitespace-pre-line">
                    {result}
                  </div>
                )}

                {activeTab === 'flashcards' && (
                  <div className="grid gap-4">
                    {result.map((card: any, i: number) => (
                      <div key={i} className="group perspective-1000">
                        <div className="relative w-full p-6 bg-[var(--bg-surface-2)] rounded-xl border border-[var(--border-color)] hover:border-indigo-500/50 transition-colors">
                          <p className="font-semibold text-indigo-400 mb-2 text-xs uppercase">Card {i + 1} - Front</p>
                          <p className="font-medium text-[var(--text-primary)]">{card.front}</p>
                          
                          <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                            <p className="font-semibold text-purple-400 mb-2 text-xs uppercase">Back</p>
                            <p className="text-[var(--text-secondary)]">{card.back}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'quiz' && (
                  <div className="space-y-6">
                    {result.map((q: any, i: number) => (
                      <div key={i} className="p-5 bg-[var(--bg-surface-2)] rounded-xl border border-[var(--border-color)]">
                        <h3 className="font-semibold text-[var(--text-primary)] mb-4">{i + 1}. {q.question}</h3>
                        <div className="space-y-2">
                          {q.options.map((opt: string, optIndex: number) => (
                            <div key={optIndex} className={`p-3 rounded-lg border text-sm ${optIndex === q.correctAnswerIndex ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'border-[var(--border-color)] text-[var(--text-secondary)]'}`}>
                              {opt}
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 text-xs text-[var(--text-secondary)] bg-indigo-500/10 p-3 rounded-lg">
                          <span className="font-semibold text-indigo-400">Explanation:</span> {q.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
