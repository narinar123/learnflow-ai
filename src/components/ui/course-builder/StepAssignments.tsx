'use client';

import React, { useState } from 'react';
import { type Assignment, type Project, type RubricCriteria, type ProjectMilestone } from '@/lib/course-data';

interface StepAssignmentsProps {
  assignments: Assignment[];
  projects: Project[];
  onAssignmentsChange: (a: Assignment[]) => void;
  onProjectsChange: (p: Project[]) => void;
}

const genId = () => `id_${Math.random().toString(36).slice(2, 9)}`;

export default function StepAssignments({
  assignments,
  projects,
  onAssignmentsChange,
  onProjectsChange,
}: StepAssignmentsProps) {
  const [activeTab, setActiveTab] = useState<'assignments' | 'projects'>('assignments');
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showNewAssignment, setShowNewAssignment] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);

  const createAssignment = () => {
    const a: Assignment = {
      id: genId(),
      courseId: 'current',
      title: 'New Assignment',
      description: '',
      type: 'text',
      maxPoints: 100,
      instructions: '',
      isRequired: true,
      createdAt: new Date().toISOString().split('T')[0],
      rubric: [
        { id: genId(), name: 'Content Quality', description: 'Accuracy and depth of content', maxPoints: 40, weight: 40 },
        { id: genId(), name: 'Presentation', description: 'Clarity and organization', maxPoints: 30, weight: 30 },
        { id: genId(), name: 'Effort', description: 'Evidence of effort and learning', maxPoints: 30, weight: 30 },
      ],
    };
    onAssignmentsChange([...assignments, a]);
    setEditingAssignment(a);
    setShowNewAssignment(false);
  };

  const createProject = () => {
    const p: Project = {
      id: genId(),
      courseId: 'current',
      title: 'Capstone Project',
      description: '',
      overview: '',
      objectives: [''],
      milestones: [],
      skills: [],
      maxPoints: 200,
      estimatedHours: 20,
      isCapstone: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    onProjectsChange([...projects, p]);
    setEditingProject(p);
    setShowNewProject(false);
  };

  const saveAssignment = (a: Assignment) => {
    onAssignmentsChange(assignments.map((x) => (x.id === a.id ? a : x)));
    setEditingAssignment(null);
  };

  const saveProject = (p: Project) => {
    onProjectsChange(projects.map((x) => (x.id === p.id ? x : p)));
    setEditingProject(null);
  };

  const deleteAssignment = (id: string) => onAssignmentsChange(assignments.filter((a) => a.id !== id));
  const deleteProject = (id: string) => onProjectsChange(projects.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Assignments & Projects</h2>
        <p className="text-sm text-muted-foreground">Create graded assignments with rubrics and capstone projects with milestones.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit">
        {(['assignments', 'projects'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {tab}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-primary/10 text-primary' : 'bg-border text-muted-foreground'}`}>
              {tab === 'assignments' ? assignments.length : projects.length}
            </span>
          </button>
        ))}
      </div>

      {/* ASSIGNMENTS TAB */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={createAssignment} className="btn-primary text-sm py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Assignment
            </button>
          </div>

          {assignments.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3 opacity-40">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <p className="text-sm">No assignments yet. Create your first assignment.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {assignments.map((a) => (
                <div key={a.id} className="card-base p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-positive/10 text-positive flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{a.title}</p>
                      {a.isRequired && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-danger/10 text-danger font-medium">Required</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground capitalize">{a.type} submission</span>
                      <span className="text-xs text-muted-foreground">Max: {a.maxPoints} pts</span>
                      {a.dueInDays && <span className="text-xs text-muted-foreground">Due in {a.dueInDays} days</span>}
                      <span className="text-xs text-muted-foreground">{a.rubric.length} rubric criteria</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setEditingAssignment(a)} className="btn-ghost text-xs py-1.5 px-3">Edit</button>
                    <button onClick={() => deleteAssignment(a.id)} className="btn-ghost text-xs py-1.5 px-3 hover:text-danger">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={createProject} className="btn-primary text-sm py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              New Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3 opacity-40">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <p className="text-sm">No projects yet. Add a capstone project.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="card-base p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                        {p.isCapstone && <span className="text-[10px] px-2 py-0.5 rounded-full bg-warning/10 text-warning font-semibold">⭐ Capstone</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{p.description || 'No description'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingProject(p)} className="btn-ghost text-xs py-1.5 px-3">Edit</button>
                      <button onClick={() => deleteProject(p.id)} className="btn-ghost text-xs py-1.5 px-3 hover:text-danger">Delete</button>
                    </div>
                  </div>

                  {/* Milestones Timeline */}
                  {p.milestones.length > 0 && (
                    <div className="border-t border-border pt-3 mt-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Milestones</p>
                      <div className="space-y-2">
                        {p.milestones.map((ms, idx) => (
                          <div key={ms.id} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">{idx + 1}</div>
                            <p className="text-xs text-foreground">{ms.title}</p>
                            <span className="text-[10px] text-muted-foreground ml-auto">Day {ms.dueInDays}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">Max: {p.maxPoints} pts</span>
                    <span className="text-xs text-muted-foreground">~{p.estimatedHours}h</span>
                    <span className="text-xs text-muted-foreground">{p.milestones.length} milestones</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Assignment Edit Drawer */}
      {editingAssignment && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setEditingAssignment(null)} />
          <div className="w-full max-w-xl bg-card border-l border-border h-full overflow-y-auto p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Edit Assignment</h3>
              <button onClick={() => setEditingAssignment(null)} className="btn-ghost p-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div>
              <label className="label-text">Title</label>
              <input type="text" value={editingAssignment.title} onChange={(e) => setEditingAssignment({ ...editingAssignment, title: e.target.value })} className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text">Submission Type</label>
                <select value={editingAssignment.type} onChange={(e) => setEditingAssignment({ ...editingAssignment, type: e.target.value as Assignment['type'] })} className="input-field">
                  {['text', 'file', 'url', 'code'].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="label-text">Max Points</label>
                <input type="number" value={editingAssignment.maxPoints} onChange={(e) => setEditingAssignment({ ...editingAssignment, maxPoints: Number(e.target.value) })} className="input-field" />
              </div>
            </div>
            <div>
              <label className="label-text">Instructions</label>
              <textarea value={editingAssignment.instructions} onChange={(e) => setEditingAssignment({ ...editingAssignment, instructions: e.target.value })} className="input-field resize-none" rows={4} />
            </div>

            {/* Rubric */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="label-text mb-0">Rubric Criteria</label>
                <button
                  onClick={() => {
                    const newCriteria: RubricCriteria = { id: genId(), name: 'New Criteria', description: '', maxPoints: 20, weight: 20 };
                    setEditingAssignment({ ...editingAssignment, rubric: [...editingAssignment.rubric, newCriteria] });
                  }}
                  className="text-xs text-primary hover:underline"
                >+ Add Criteria</button>
              </div>
              <div className="space-y-2">
                {editingAssignment.rubric.map((r, idx) => (
                  <div key={r.id} className="flex items-center gap-2 p-3 rounded-xl bg-muted/60">
                    <input type="text" value={r.name} onChange={(e) => { const rubric = [...editingAssignment.rubric]; rubric[idx] = { ...r, name: e.target.value }; setEditingAssignment({ ...editingAssignment, rubric }); }} className="input-field py-1.5 text-xs flex-1" />
                    <input type="number" value={r.maxPoints} onChange={(e) => { const rubric = [...editingAssignment.rubric]; rubric[idx] = { ...r, maxPoints: Number(e.target.value) }; setEditingAssignment({ ...editingAssignment, rubric }); }} className="input-field py-1.5 text-xs w-20" />
                    <span className="text-xs text-muted-foreground">pts</span>
                    <button onClick={() => setEditingAssignment({ ...editingAssignment, rubric: editingAssignment.rubric.filter((_, i) => i !== idx) })} className="text-danger/70 hover:text-danger">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => saveAssignment(editingAssignment)} className="btn-primary flex-1">Save Assignment</button>
              <button onClick={() => setEditingAssignment(null)} className="btn-outline flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Project Edit Drawer */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setEditingProject(null)} />
          <div className="w-full max-w-xl bg-card border-l border-border h-full overflow-y-auto p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Edit Project</h3>
              <button onClick={() => setEditingProject(null)} className="btn-ghost p-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div>
              <label className="label-text">Project Title</label>
              <input type="text" value={editingProject.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-text">Description</label>
              <textarea value={editingProject.description} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} className="input-field resize-none" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text">Max Points</label>
                <input type="number" value={editingProject.maxPoints} onChange={(e) => setEditingProject({ ...editingProject, maxPoints: Number(e.target.value) })} className="input-field" />
              </div>
              <div>
                <label className="label-text">Est. Hours</label>
                <input type="number" value={editingProject.estimatedHours} onChange={(e) => setEditingProject({ ...editingProject, estimatedHours: Number(e.target.value) })} className="input-field" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="label-text mb-0">Milestones</label>
                <button
                  onClick={() => {
                    const ms: ProjectMilestone = { id: genId(), title: 'New Milestone', description: '', dueInDays: 7, deliverables: [] };
                    setEditingProject({ ...editingProject, milestones: [...editingProject.milestones, ms] });
                  }}
                  className="text-xs text-primary hover:underline"
                >+ Add</button>
              </div>
              <div className="space-y-2">
                {editingProject.milestones.map((ms, idx) => (
                  <div key={ms.id} className="flex items-center gap-2 p-3 rounded-xl bg-muted/60">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">{idx + 1}</span>
                    <input type="text" value={ms.title} onChange={(e) => { const mls = [...editingProject.milestones]; mls[idx] = { ...ms, title: e.target.value }; setEditingProject({ ...editingProject, milestones: mls }); }} className="input-field py-1.5 text-xs flex-1" />
                    <input type="number" value={ms.dueInDays} onChange={(e) => { const mls = [...editingProject.milestones]; mls[idx] = { ...ms, dueInDays: Number(e.target.value) }; setEditingProject({ ...editingProject, milestones: mls }); }} className="input-field py-1.5 text-xs w-20" />
                    <span className="text-xs text-muted-foreground">days</span>
                    <button onClick={() => setEditingProject({ ...editingProject, milestones: editingProject.milestones.filter((_, i) => i !== idx) })} className="text-danger/70 hover:text-danger">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => saveProject(editingProject)} className="btn-primary flex-1">Save Project</button>
              <button onClick={() => setEditingProject(null)} className="btn-outline flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
