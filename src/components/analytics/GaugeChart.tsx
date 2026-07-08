'use client';

import React from 'react';

interface GaugeChartProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  height?: number;
}

export function GaugeChart({
  value,
  max = 100,
  label,
  color = '#6C47FF',
  height = 140
}: GaugeChartProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // SVG Parameters
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Half circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-2 relative" style={{ height }}>
      <svg 
        width={size} 
        height={size / 2 + 10} 
        viewBox={`0 0 ${size} ${size / 2 + 10}`} 
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`gauge-grad-${color.replace('#', '')}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} stopOpacity={1} />
          </linearGradient>
        </defs>

        {/* Background Arc */}
        <path
          d={`M ${strokeWidth/2} ${size/2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={0.4}
        />

        {/* Filled Arc */}
        <path
          d={`M ${strokeWidth/2} ${size/2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          fill="none"
          stroke={`url(#gauge-grad-${color.replace('#', '')})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Label and Value */}
      <div className="text-center mt-2">
        <p className="text-xl font-bold font-mono tracking-tight text-foreground">
          {value}%
        </p>
        {label && (
          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
