'use client';

import React from 'react';

interface AnalyticsTopbarProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  actions?: React.ReactNode;
}

export function AnalyticsTopbar({ title, subtitle, onRefresh, actions }: AnalyticsTopbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-border bg-card shrink-0 select-none">
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-bold text-foreground leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="btn-outline p-2 rounded-lg hover:bg-secondary transition-colors"
            title="Refresh statistics"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        )}
        {actions}
      </div>
    </div>
  );
}
