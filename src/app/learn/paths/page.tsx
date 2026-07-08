'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { Map, Loader2, Play } from 'lucide-react';
import { toast } from 'sonner';

export default function LearningPathsPage() {
  const [userGoals, setUserGoals] = useState('');
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [path, setPath] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePath = async () => {
    if (!userGoals.trim()) {
      toast.error('Please enter your learning goals.');
      return;
    }
    
    setIsLoading(true);
    setPath(null);

    try {
      const res = await fetch('/api/ai/learning-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userGoals, currentLevel }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPath(data.result);
      toast.success('Learning path generated!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate path');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Map size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">AI Learning Path Generator</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Get a custom curriculum tailored to your specific goals.</p>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">What do you want to learn or achieve?</label>
              <textarea
                placeholder="e.g., I want to become a full-stack Next.js developer and build SaaS apps."
                value={userGoals}
                onChange={(e) => setUserGoals(e.target.value)}
                className="w-full px-4 py-3 h-24 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Current Skill Level</label>
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 mb-4"
              >
                <option value="beginner">Beginner (No prior experience)</option>
                <option value="intermediate">Intermediate (Some experience)</option>
                <option value="advanced">Advanced (Looking for deep dives)</option>
              </select>
              <button
                onClick={generatePath}
                disabled={isLoading || !userGoals.trim()}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Map size={18} />}
                Generate Path
              </button>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="h-64 flex flex-col items-center justify-center text-indigo-400">
            <Loader2 size={40} className="animate-spin mb-4" />
            <p>Designing your custom curriculum...</p>
          </div>
        )}

        {path && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">{path.pathName}</h2>
              <p className="text-[var(--text-secondary)]">{path.description}</p>
            </div>

            <div className="space-y-6">
              {path.modules.map((mod: any, index: number) => (
                <div key={index} className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 rounded-2xl relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">Module {index + 1}: {mod.moduleName}</h3>
                    <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                      ~{mod.estimatedHours} Hours
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {mod.topics.map((topic: string, tIdx: number) => (
                      <li key={tIdx} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <button className="flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                    <Play size={16} /> Start Module
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
