'use client';

import React from 'react';

interface SparkPoint { value: number }

interface StatCardProps {
  value: string | number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'accent' | 'warning' | 'danger' | 'info';
  sparkline?: SparkPoint[];
  className?: string;
  prefix?: string;
  suffix?: string;
}

const colorMap = {
  primary: { bg: 'rgba(108,71,255,0.12)', icon: '#6C47FF', glow: 'rgba(108,71,255,0.25)' },
  accent:  { bg: 'rgba(0,201,167,0.12)',  icon: '#00C9A7', glow: 'rgba(0,201,167,0.25)' },
  warning: { bg: 'rgba(245,158,11,0.12)', icon: '#F59E0B', glow: 'rgba(245,158,11,0.25)' },
  danger:  { bg: 'rgba(239,68,68,0.12)',  icon: '#EF4444', glow: 'rgba(239,68,68,0.25)' },
  info:    { bg: 'rgba(59,130,246,0.12)', icon: '#3B82F6', glow: 'rgba(59,130,246,0.25)' },
};

function MiniSparkline({ points, color }: { points: SparkPoint[]; color: string }) {
  if (points.length < 2) return null;
  const vals = points.map(p => p.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const w = 80, h = 32, pad = 2;
  const coords = vals.map((v, i) => {
    const x = pad + (i / (vals.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const d = `M ${coords.join(' L ')}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatCard({
  value, label, trend, trendValue, icon, color = 'primary', sparkline, className = '', prefix, suffix,
}: StatCardProps) {
  const c = colorMap[color];
  const trendColor = trend === 'up' ? '#00C9A7' : trend === 'down' ? '#EF4444' : 'var(--muted-foreground)';

  return (
    <div
      className={`card-base p-5 card-hover relative overflow-hidden ${className}`}
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {/* Background glow */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none"
        style={{ background: c.glow }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between relative">
        <div className="flex-1 min-w-0">
          {/* Icon */}
          {icon && (
            <div
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
              style={{ background: c.bg }}
            >
              <span style={{ color: c.icon }}>{icon}</span>
            </div>
          )}

          {/* Value */}
          <p className="stat-value" style={{ color: 'var(--foreground)', fontSize: '1.875rem' }}>
            {prefix}<span>{value}</span>{suffix}
          </p>

          {/* Label */}
          <p className="stat-label mt-1">{label}</p>

          {/* Trend */}
          {trend && trendValue && (
            <div className="flex items-center gap-1 mt-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={trendColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {trend === 'up'
                  ? <><polyline points="18 15 12 9 6 15" /></>
                  : trend === 'down'
                  ? <><polyline points="6 9 12 15 18 9" /></>
                  : <><line x1="5" y1="12" x2="19" y2="12" /></>}
              </svg>
              <span className="text-xs font-semibold" style={{ color: trendColor }}>{trendValue}</span>
              <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>vs last period</span>
            </div>
          )}
        </div>

        {/* Sparkline */}
        {sparkline && sparkline.length >= 2 && (
          <div className="shrink-0 ml-3 opacity-70">
            <MiniSparkline points={sparkline} color={c.icon} />
          </div>
        )}
      </div>
    </div>
  );
}
