import React from 'react';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted' | 'live' | 'new';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  primary: { bg: 'rgba(108,71,255,0.12)', color: '#6C47FF',   border: 'rgba(108,71,255,0.2)' },
  success: { bg: 'rgba(0,201,167,0.12)',  color: '#00C9A7',   border: 'rgba(0,201,167,0.2)' },
  warning: { bg: 'rgba(245,158,11,0.12)', color: '#D97706',   border: 'rgba(245,158,11,0.2)' },
  danger:  { bg: 'rgba(239,68,68,0.12)',  color: '#DC2626',   border: 'rgba(239,68,68,0.2)' },
  info:    { bg: 'rgba(59,130,246,0.12)', color: '#2563EB',   border: 'rgba(59,130,246,0.2)' },
  muted:   { bg: 'var(--muted)',          color: 'var(--muted-foreground)', border: 'var(--border)' },
  live:    { bg: 'rgba(239,68,68,0.12)',  color: '#DC2626',   border: 'rgba(239,68,68,0.2)' },
  new:     { bg: 'rgba(0,201,167,0.12)',  color: '#00C9A7',   border: 'rgba(0,201,167,0.2)' },
};

export function Badge({ variant = 'muted', children, dot = false, pulse = false, className = '' }: BadgeProps) {
  const s = variantStyles[variant];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${className}`}
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${pulse ? 'badge-pulse' : ''}`}
          style={{ background: s.color }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
