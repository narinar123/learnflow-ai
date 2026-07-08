'use client';

import React from 'react';

interface InsightCardProps {
  title?: string;
  insight: string;
  color?: 'primary' | 'accent' | 'warning' | 'danger' | 'info';
  className?: string;
}

const colorStyles = {
  primary: { border: 'border-primary/30', bg: 'bg-primary/5', text: 'text-primary' },
  accent:  { border: 'border-accent/30', bg: 'bg-accent/5', text: 'text-accent' },
  warning: { border: 'border-warning/30', bg: 'bg-warning/5', text: 'text-warning' },
  danger:  { border: 'border-danger/30', bg: 'bg-danger/5', text: 'text-danger' },
  info:    { border: 'border-info/30', bg: 'bg-info/5', text: 'text-info' }
};

export function InsightCard({
  title = 'AI Platform Insights',
  insight,
  color = 'primary',
  className = ''
}: InsightCardProps) {
  const styles = colorStyles[color];

  return (
    <div className={`p-4 rounded-xl border flex gap-3 ${styles.border} ${styles.bg} ${className}`}>
      {/* AI Icon */}
      <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-card border ${styles.border}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.text}>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </div>

      <div className="flex-1 text-xs">
        <h4 className="font-bold text-foreground mb-0.5">{title}</h4>
        <p className="text-muted-foreground leading-relaxed">{insight}</p>
      </div>
    </div>
  );
}
