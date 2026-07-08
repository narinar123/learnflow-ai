'use client';

import React from 'react';
import { builderSteps } from '@/lib/course-data';

interface BuilderSidebarProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
  courseTitle?: string;
  lastSaved?: string;
  onPublish?: () => void;
}

export default function BuilderSidebar({
  currentStep,
  completedSteps,
  onStepClick,
  courseTitle,
  lastSaved,
  onPublish,
}: BuilderSidebarProps) {
  const totalSteps = builderSteps.length;
  const completedCount = completedSteps.length;
  const progressPct = Math.round((completedCount / totalSteps) * 100);

  return (
    <aside className="w-72 shrink-0 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Course Builder</span>
        </div>
        <h2 className="text-sm font-semibold text-foreground mt-2 line-clamp-2 leading-snug">
          {courseTitle || 'Untitled Course'}
        </h2>

        {/* Progress */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-muted-foreground">{completedCount}/{totalSteps} steps</span>
            <span className="text-xs font-semibold text-primary">{progressPct}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full xp-bar-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {lastSaved && (
          <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
            </svg>
            Saved {lastSaved}
          </p>
        )}
      </div>

      {/* Steps Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin p-3">
        <ul className="space-y-0.5">
          {builderSteps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = completedSteps.includes(step.id);
            const isAccessible = step.id <= Math.max(...completedSteps, 1) + 1;

            return (
              <li key={step.id}>
                <button
                  onClick={() => isAccessible && onStepClick(step.id)}
                  disabled={!isAccessible}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group
                    ${isActive ? 'bg-primary/10 text-primary' : ''}
                    ${!isActive && isCompleted ? 'text-foreground hover:bg-muted' : ''}
                    ${!isActive && !isCompleted && isAccessible ? 'text-muted-foreground hover:bg-muted hover:text-foreground' : ''}
                    ${!isAccessible ? 'text-muted-foreground/40 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {/* Step indicator */}
                  <span className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold transition-all
                    ${isActive ? 'bg-primary text-white' : ''}
                    ${!isActive && isCompleted ? 'bg-positive text-white' : ''}
                    ${!isActive && !isCompleted ? 'bg-muted text-muted-foreground border border-border' : ''}
                  `}>
                    {isCompleted && !isActive ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-semibold truncate ${isActive ? 'text-primary' : ''}`}>
                      {step.label}
                    </p>
                  </div>

                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <button
          onClick={onPublish}
          className="btn-primary w-full text-xs py-2.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          Publish Course
        </button>
        <button className="btn-outline w-full text-xs py-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
          </svg>
          Preview Course
        </button>
      </div>
    </aside>
  );
}
