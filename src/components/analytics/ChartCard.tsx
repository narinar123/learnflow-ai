'use client';

import React, { useState } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  badge?: string;
  badgeColor?: 'primary' | 'accent' | 'warning' | 'danger' | 'info';
  height?: number;
  noPadding?: boolean;
}

const badgeColors = {
  primary: { bg: 'rgba(108,71,255,0.12)', text: '#6C47FF' },
  accent:  { bg: 'rgba(0,201,167,0.12)',  text: '#00C9A7' },
  warning: { bg: 'rgba(245,158,11,0.12)', text: '#F59E0B' },
  danger:  { bg: 'rgba(239,68,68,0.12)',  text: '#EF4444' },
  info:    { bg: 'rgba(59,130,246,0.12)', text: '#3B82F6' },
};

export function ChartCard({
  title, subtitle, children, className = '',
  actions, badge, badgeColor = 'primary', height, noPadding = false,
}: ChartCardProps) {
  return (
    <div
      className={`rounded-2xl border flex flex-col ${className}`}
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 p-5 pb-4 shrink-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{title}</h3>
            {badge && (
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                style={{ background: badgeColors[badgeColor].bg, color: badgeColors[badgeColor].text }}
              >
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-0.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-1.5 shrink-0">{actions}</div>}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border)', margin: '0 20px' }} />

      {/* Chart body */}
      <div
        className={`flex-1 ${noPadding ? '' : 'p-5 pt-4'}`}
        style={height ? { height } : { minHeight: 240 }}
      >
        {children}
      </div>
    </div>
  );
}
