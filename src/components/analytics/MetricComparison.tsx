'use client';

import React from 'react';

interface MetricComparisonProps {
  label: string;
  currentValue: string | number;
  previousValue: string | number;
  percentageChange: number;
  trend: 'up' | 'down' | 'neutral';
  format?: 'currency' | 'number' | 'percent';
}

export function MetricComparison({
  label,
  currentValue,
  previousValue,
  percentageChange,
  trend,
  format = 'number'
}: MetricComparisonProps) {
  const isUp = trend === 'up';
  const isDown = trend === 'down';
  
  const trendColor = isUp ? 'text-accent' : isDown ? 'text-danger' : 'text-muted-foreground';
  const trendBg = isUp ? 'bg-accent/10' : isDown ? 'bg-danger/10' : 'bg-secondary';

  return (
    <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-xl border border-border/40 select-none">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-base font-bold font-mono text-foreground">
            {currentValue}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            {previousValue}
          </span>
        </div>
      </div>

      <div className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${trendBg}`}>
        <svg 
          width="10" 
          height="10" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          className={trendColor}
        >
          {isUp ? (
            <polyline points="18 15 12 9 6 15" />
          ) : isDown ? (
            <polyline points="6 9 12 15 18 9" />
          ) : (
            <line x1="5" y1="12" x2="19" y2="12" />
          )}
        </svg>
        <span className={`text-[10px] font-bold font-mono ${trendColor}`}>
          {isUp ? '+' : ''}
          {percentageChange}%
        </span>
      </div>
    </div>
  );
}
