'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { FileText, Upload, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function ResumePage() {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      toast.error('Please paste your resume content first.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeContent: resumeText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAnalysis(data.result);
      toast.success('Resume analyzed successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to analyze resume');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 h-full">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Resume Builder & Analyzer</h1>
        <p className="text-[var(--text-secondary)] mb-8">Paste your resume content to get instant AI feedback on how to improve it.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col h-[600px] bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={18} className="text-indigo-400" />
              <h2 className="font-semibold text-[var(--text-primary)]">Your Resume</h2>
            </div>
            <textarea
              className="flex-1 w-full p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] resize-none focus:outline-none focus:border-indigo-500 text-sm"
              placeholder="Paste your resume text here (Experience, Education, Skills)..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            <button
              onClick={analyzeResume}
              disabled={isLoading || !resumeText.trim()}
              className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <span className="animate-pulse">Analyzing...</span> : <><Sparkles size={18} /> Analyze Resume</>}
            </button>
          </div>

          <div className="flex flex-col h-[600px] bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] overflow-y-auto">
            <h2 className="font-semibold text-[var(--text-primary)] mb-4">AI Feedback</h2>
            {!analysis && !isLoading && (
              <div className="flex-1 flex items-center justify-center text-[var(--text-secondary)] text-sm">
                Feedback will appear here after analysis.
              </div>
            )}
            {isLoading && (
              <div className="flex-1 flex items-center justify-center text-indigo-400">
                <Sparkles size={32} className="animate-spin" />
              </div>
            )}
            {analysis && !isLoading && (
              <div className="prose prose-invert max-w-none text-sm whitespace-pre-line text-[var(--text-primary)]">
                {analysis}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
