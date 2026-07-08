'use client';

import React, { useState } from 'react';
import { type Lab, type LabEnvironment } from '@/lib/course-data';

interface StepLabsProps {
  labs: Lab[];
  onChange: (labs: Lab[]) => void;
}

const genId = () => `lab_${Math.random().toString(36).slice(2, 9)}`;

const environmentConfig: Record<LabEnvironment, { label: string; icon: string; color: string }> = {
  jupyter: { label: 'Jupyter Notebook', icon: '🪐', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  codesandbox: { label: 'CodeSandbox', icon: '📦', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  terminal: { label: 'Terminal / CLI', icon: '💻', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  browser: { label: 'Web Browser', icon: '🌐', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  vscode: { label: 'VS Code Web', icon: '📝', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
};

export default function StepLabs({ labs, onChange }: StepLabsProps) {
  const [editingLab, setEditingLab] = useState<Lab | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLab, setNewLab] = useState<Partial<Lab>>({
    title: '',
    description: '',
    environment: 'codesandbox',
    difficulty: 'Medium',
    estimatedMinutes: 45,
    instructions: '',
    hints: [''],
  });

  const addLab = () => {
    if (!newLab.title || !newLab.instructions) return;
    const lab: Lab = {
      id: genId(),
      courseId: 'current',
      title: newLab.title,
      description: newLab.description || '',
      environment: newLab.environment as LabEnvironment,
      difficulty: newLab.difficulty as 'Easy' | 'Medium' | 'Hard',
      estimatedMinutes: Number(newLab.estimatedMinutes) || 30,
      instructions: newLab.instructions,
      hints: (newLab.hints || []).filter(h => h.trim() !== ''),
      createdAt: new Date().toISOString().split('T')[0],
      starterFiles: [],
    };
    onChange([...labs, lab]);
    setNewLab({
      title: '',
      description: '',
      environment: 'codesandbox',
      difficulty: 'Medium',
      estimatedMinutes: 45,
      instructions: '',
      hints: [''],
    });
    setShowAddForm(false);
  };

  const deleteLab = (id: string) => {
    onChange(labs.filter((l) => l.id !== id));
  };

  const saveLabEdit = (updatedLab: Lab) => {
    onChange(labs.map((l) => (l.id === updatedLab.id ? updatedLab : l)));
    setEditingLab(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Interactive Labs</h2>
          <p className="text-sm text-muted-foreground">Setup interactive code/terminal/notebook execution environments for practical exercises.</p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="btn-primary text-sm py-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Lab
        </button>
      </div>

      {/* Labs list or empty state */}
      {labs.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground card-base border-dashed bg-muted/20">
          <span className="text-3xl block mb-3">🧪</span>
          <p className="text-sm font-semibold">No interactive labs created yet</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">Create coding playgrounds, Jupyter notebooks, or terminal simulations to give students hands-on practice.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labs.map((lab) => {
            const config = environmentConfig[lab.environment];
            return (
              <div key={lab.id} className="card-base p-5 flex flex-col justify-between group relative">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1.5 ${config.color}`}>
                      <span>{config.icon}</span>
                      <span>{config.label}</span>
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      lab.difficulty === 'Easy' ? 'bg-positive/10 text-positive border-positive/20' :
                      lab.difficulty === 'Medium' ? 'bg-warning/10 text-warning border-warning/20' :
                      'bg-danger/10 text-danger border-danger/20'
                    }`}>
                      {lab.difficulty}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-foreground mb-1.5">{lab.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{lab.description || 'No description provided.'}</p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3 border-t border-border/60">
                  <span className="text-xs text-muted-foreground font-medium">⏱️ {lab.estimatedMinutes} mins</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditingLab(lab)} className="btn-ghost text-[11px] py-1 px-2.5">Edit</button>
                    <button onClick={() => deleteLab(lab.id)} className="btn-ghost text-[11px] py-1 px-2.5 hover:text-danger">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Lab Form */}
      {showAddForm && (
        <div className="card-base p-5 space-y-4 border-primary/30">
          <h3 className="text-sm font-bold text-foreground">Create Lab Environment</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="label-text">Lab Title</label>
              <input
                type="text"
                value={newLab.title}
                onChange={(e) => setNewLab({ ...newLab, title: e.target.value })}
                placeholder="e.g., Implementing Custom Hooks"
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">Environment Type</label>
              <select
                value={newLab.environment}
                onChange={(e) => setNewLab({ ...newLab, environment: e.target.value as LabEnvironment })}
                className="input-field"
              >
                {(Object.keys(environmentConfig) as LabEnvironment[]).map((env) => (
                  <option key={env} value={env}>{environmentConfig[env].label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-text">Difficulty</label>
              <select
                value={newLab.difficulty}
                onChange={(e) => setNewLab({ ...newLab, difficulty: e.target.value as Lab['difficulty'] })}
                className="input-field"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="label-text">Estimated Time (Minutes)</label>
              <input
                type="number"
                value={newLab.estimatedMinutes}
                onChange={(e) => setNewLab({ ...newLab, estimatedMinutes: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="label-text">Short Description</label>
            <input
              type="text"
              value={newLab.description}
              onChange={(e) => setNewLab({ ...newLab, description: e.target.value })}
              placeholder="What will students accomplish in this lab?"
              className="input-field"
            />
          </div>

          <div>
            <label className="label-text">Instructions (Markdown Supported)</label>
            <textarea
              value={newLab.instructions}
              onChange={(e) => setNewLab({ ...newLab, instructions: e.target.value })}
              placeholder="Detailed step-by-step instructions for the student..."
              className="input-field resize-none font-mono text-xs"
              rows={5}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setShowAddForm(false)} className="btn-outline text-xs py-2 px-4">Cancel</button>
            <button onClick={addLab} className="btn-primary text-xs py-2 px-4">Create Lab</button>
          </div>
        </div>
      )}

      {/* Edit Lab Drawer */}
      {editingLab && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setEditingLab(null)} />
          <div className="w-full max-w-xl bg-card border-l border-border h-full overflow-y-auto p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Edit Lab: {editingLab.title}</h3>
              <button onClick={() => setEditingLab(null)} className="btn-ghost p-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div>
              <label className="label-text">Title</label>
              <input
                type="text"
                value={editingLab.title}
                onChange={(e) => setEditingLab({ ...editingLab, title: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text">Environment</label>
                <select
                  value={editingLab.environment}
                  onChange={(e) => setEditingLab({ ...editingLab, environment: e.target.value as LabEnvironment })}
                  className="input-field"
                >
                  {(Object.keys(environmentConfig) as LabEnvironment[]).map((env) => (
                    <option key={env} value={env}>{environmentConfig[env].label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text">Difficulty</label>
                <select
                  value={editingLab.difficulty}
                  onChange={(e) => setEditingLab({ ...editingLab, difficulty: e.target.value as Lab['difficulty'] })}
                  className="input-field"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label-text">Estimated Time (mins)</label>
              <input
                type="number"
                value={editingLab.estimatedMinutes}
                onChange={(e) => setEditingLab({ ...editingLab, estimatedMinutes: Number(e.target.value) })}
                className="input-field"
              />
            </div>

            <div>
              <label className="label-text">Description</label>
              <input
                type="text"
                value={editingLab.description}
                onChange={(e) => setEditingLab({ ...editingLab, description: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="label-text">Instructions</label>
              <textarea
                value={editingLab.instructions}
                onChange={(e) => setEditingLab({ ...editingLab, instructions: e.target.value })}
                className="input-field font-mono text-xs"
                rows={8}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => saveLabEdit(editingLab)} className="btn-primary flex-1">Save Lab</button>
              <button onClick={() => setEditingLab(null)} className="btn-outline flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
