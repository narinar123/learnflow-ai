import React from 'react';

interface ProgressRingProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'warning' | 'danger';
  label?: string;
  strokeWidth?: number;
  className?: string;
}

const dimMap = { sm: 48, md: 80, lg: 120 };
const swMap  = { sm: 4,  md: 6,  lg: 8 };
const colorMap = {
  primary: '#6C47FF',
  accent:  '#00C9A7',
  warning: '#F59E0B',
  danger:  '#EF4444',
};

export function ProgressRing({ value, size = 'md', color = 'primary', label, strokeWidth, className = '' }: ProgressRingProps) {
  const dim = dimMap[size];
  const sw  = strokeWidth ?? swMap[size];
  const r   = (dim - sw) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(Math.max(value, 0), 100) / 100) * circ;
  const c = colorMap[color];
  const fontSize = size === 'sm' ? '0.6rem' : size === 'md' ? '0.875rem' : '1.125rem';

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: dim, height: dim }}>
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} aria-label={`${value}% ${label ?? ''}`} role="img">
        {/* Track */}
        <circle
          cx={dim / 2} cy={dim / 2} r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth={sw}
        />
        {/* Fill */}
        <circle
          cx={dim / 2} cy={dim / 2} r={r}
          fill="none"
          stroke={c}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
          style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      {/* Center label */}
      <span
        className="absolute font-bold tabular-nums"
        style={{ fontSize, color: 'var(--foreground)', lineHeight: 1 }}
        aria-hidden="true"
      >
        {label ?? `${Math.round(value)}%`}
      </span>
    </div>
  );
}
