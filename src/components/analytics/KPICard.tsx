'use client';

import React from 'react';

interface SparkPoint { value: number }

type KPIColor = 'primary' | 'accent' | 'warning' | 'danger' | 'info';
type KPITrend = 'up' | 'down' | 'neutral';

interface KPICardProps {
  label: string;
  value: string | number;
  trend?: KPITrend;
  trendValue?: string;
  color?: KPIColor;
  sparkline?: SparkPoint[];
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

const colorMap: Record<KPIColor, { bg: string; icon: string; glow: string; text: string }> = {
  primary: { bg: 'rgba(108,71,255,0.12)',  icon: '#6C47FF', glow: 'rgba(108,71,255,0.2)',  text: '#6C47FF' },
  accent:  { bg: 'rgba(0,201,167,0.12)',   icon: '#00C9A7', glow: 'rgba(0,201,167,0.2)',   text: '#00C9A7' },
  warning: { bg: 'rgba(245,158,11,0.12)',  icon: '#F59E0B', glow: 'rgba(245,158,11,0.2)',  text: '#F59E0B' },
  danger:  { bg: 'rgba(239,68,68,0.12)',   icon: '#EF4444', glow: 'rgba(239,68,68,0.2)',   text: '#EF4444' },
  info:    { bg: 'rgba(59,130,246,0.12)',  icon: '#3B82F6', glow: 'rgba(59,130,246,0.2)',  text: '#3B82F6' },
};

function MiniSparkline({ points, color }: { points: SparkPoint[]; color: string }) {
  if (points.length < 2) return null;
  const vals = points.map(p => p.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const w = 88, h = 36, pad = 3;
  const coords = vals.map((v, i) => {
    const x = pad + (i / (vals.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return { x, y };
  });
  const d = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const fillD = `${d} L ${coords[coords.length - 1].x} ${h} L ${coords[0].x} ${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`spark-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#spark-${color.replace('#','')})`} />
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KPICard({
  label, value, trend, trendValue, color = 'primary',
  sparkline, prefix, suffix, icon, description, className = '',
}: KPICardProps) {
  const c = colorMap[color];
  const trendColor = trend === 'up' ? '#00C9A7' : trend === 'down' ? '#EF4444' : '#6B6880';
  const trendBg    = trend === 'up' ? 'rgba(0,201,167,0.1)' : trend === 'down' ? 'rgba(239,68,68,0.1)' : 'rgba(107,104,128,0.1)';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 card-hover ${className}`}
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {/* Glow */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl pointer-events-none"
        style={{ background: c.glow }}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Icon */}
          {icon && (
            <div
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 shrink-0"
              style={{ background: c.bg }}
            >
              <span style={{ color: c.icon }}>{icon}</span>
            </div>
          )}

          {/* Value */}
          <p className="font-bold tabular-nums" style={{ fontSize: '1.75rem', color: 'var(--foreground)', lineHeight: 1.1, fontFamily: "'Inter', monospace" }}>
            <span style={{ fontSize: '1rem', color: c.text, marginRight: '2px' }}>{prefix}</span>
            {value}
            {suffix && <span style={{ fontSize: '1rem', color: 'var(--muted-foreground)', marginLeft: '2px' }}>{suffix}</span>}
          </p>

          {/* Label */}
          <p className="mt-1 text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--muted-foreground)' }}>
            {label}
          </p>

          {/* Trend */}
          {trend && trendValue && (
            <div className="flex items-center gap-1.5 mt-2.5">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: trendBg, color: trendColor }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={trendColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {trend === 'up'
                    ? <polyline points="18 15 12 9 6 15" />
                    : trend === 'down'
                    ? <polyline points="6 9 12 15 18 9" />
                    : <line x1="5" y1="12" x2="19" y2="12" />}
                </svg>
                {trendValue}
              </span>
              {description && (
                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{description}</span>
              )}
            </div>
          )}
        </div>

        {/* Sparkline */}
        {sparkline && sparkline.length >= 2 && (
          <div className="shrink-0 opacity-75 mt-1">
            <MiniSparkline points={sparkline} color={c.icon} />
          </div>
        )}
      </div>
    </div>
  );
}
