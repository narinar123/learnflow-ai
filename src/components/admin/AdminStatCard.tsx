import React from 'react';

interface AdminStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  accent?: string;
}

export default function AdminStatCard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon,
  iconBg = 'rgba(108,71,255,0.15)',
  accent = '#6C47FF',
}: AdminStatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div
      className="rounded-2xl p-5 border flex flex-col gap-4 transition-all duration-200 hover:border-purple-500/30"
      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(108,71,255,0.12)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider truncate">{title}</p>
          <p className="text-3xl font-bold text-white mt-1.5 tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {value}
          </p>
          {subtitle && <p className="text-xs text-slate-500 mt-1 truncate">{subtitle}</p>}
        </div>
        {icon && (
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconBg }}>
            <span style={{ color: accent }}>{icon}</span>
          </div>
        )}
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-1.5">
          <span
            className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: isPositive ? 'rgba(0,201,167,0.15)' : 'rgba(239,68,68,0.15)',
              color: isPositive ? '#00C9A7' : '#EF4444',
            }}
          >
            {isPositive ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m18 15-6-6-6 6" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m6 9 6 6 6-6" />
              </svg>
            )}
            {Math.abs(trend)}%
          </span>
          {trendLabel && <span className="text-xs text-slate-500">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
