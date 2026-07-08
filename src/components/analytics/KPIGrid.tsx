'use client';

import React from 'react';
import { KPICard } from './KPICard';

type KPIColor = 'primary' | 'accent' | 'warning' | 'danger' | 'info';
type KPITrend = 'up' | 'down' | 'neutral';

interface KPIItem {
  id: string;
  label: string;
  value: string | number;
  trend?: KPITrend;
  trendValue?: string;
  color?: KPIColor;
  sparkline?: { value: number }[];
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  description?: string;
}

interface KPIGridProps {
  items: KPIItem[];
  cols?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const colsMap: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
};

export function KPIGrid({ items, cols = 4, className = '' }: KPIGridProps) {
  return (
    <div className={`grid gap-4 ${colsMap[cols]} ${className}`}>
      {items.map(item => (
        <KPICard key={item.id} {...item} />
      ))}
    </div>
  );
}
