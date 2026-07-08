'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { Target, ArrowRight, Loader2, Compass } from 'lucide-react';
import { toast } from 'sonner';

export default function SkillGapPage() {
  const [currentSkills, setCurrentSkills] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeGap = async () => {
    if (!currentSkills.trim() || !targetRole.trim()) {
      toast.error('Please fill in both fields.');
      return;
    }
    
    setIsLoading(true);
    setAnalysis(null);

    try {
      const res = await fetch('/api/ai/skill-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentSkills, targetRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAnalysis(data.result);
      toast.success('Skill gap analysis complete!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to analyze skill gap');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Target size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Skill Gap Analysis & Roadmap</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Discover what you need to learn to land your dream role.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input form */}
          <div className="lg:col-span-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 h-fit">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Target Role</label>
                <input
                  type="text"
                  placeholder="e.g., Senior Full Stack Engineer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Current Skills</label>
                <textarea
                  placeholder="List your current skills (e.g., HTML, CSS, basic JS)..."
                  value={currentSkills}
                  onChange={(e) => setCurrentSkills(e.target.value)}
                  className="w-full h-32 px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] resize-none focus:outline-none focus:border-indigo-500"
                />
              </div>
              
              <button
                onClick={analyzeGap}
                disabled={isLoading || !currentSkills.trim() || !targetRole.trim()}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Compass size={18} />}
                Generate Roadmap
              </button>
            </div>
          </div>

          {/* Output visualization */}
          <div className="lg:col-span-2 space-y-6">
            {!analysis && !isLoading && (
              <div className="h-64 flex flex-col items-center justify-center border border-[var(--border-color)] border-dashed rounded-2xl text-[var(--text-secondary)]">
                <Compass size={40} className="mb-4 opacity-50" />
                <p>Fill out the form to generate your personalized learning roadmap.</p>
              </div>
            )}
            
            {isLoading && (
              <div className="h-64 flex flex-col items-center justify-center border border-[var(--border-color)] border-dashed rounded-2xl text-indigo-400">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p>Analyzing skills and generating roadmap...</p>
              </div>
            )}

            {analysis && (
              <>
                <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Summary</h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{analysis.summary}</p>
                </div>

                <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">Your Step-by-Step Roadmap</h2>
                  <div className="space-y-6">
                    {analysis.roadmap.map((step: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center mt-1">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">
                            {index + 1}
                          </div>
                          {index !== analysis.roadmap.length - 1 && (
                            <div className="w-px h-full bg-indigo-500/20 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 bg-[var(--bg-surface-2)] p-4 rounded-xl border border-[var(--border-color)]">
                          <h3 className="font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                          <p className="text-sm text-[var(--text-secondary)] mb-4">{step.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {step.skillsToLearn.map((skill: string, sIndex: number) => (
                              <span key={sIndex} className="px-2 py-1 bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs rounded-md text-indigo-300">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
