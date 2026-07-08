'use client';

import React from 'react';

interface FunnelItem {
  stage: string;
  value: number;
  color?: string;
}

interface FunnelChartProps {
  data: FunnelItem[];
  height?: number;
}

export function FunnelChart({ data, height = 280 }: FunnelChartProps) {
  const maxValue = Math.max(...data.map(d => d.value)) || 1;
  const defaultColors = ['#6C47FF', '#8B6FFF', '#F59E0B', '#00C9A7', '#3B82F6', '#EF4444'];

  return (
    <div className="flex flex-col justify-center space-y-4 py-2" style={{ height }}>
      {data.map((item, index) => {
        const percentage = Math.round((item.value / maxValue) * 100);
        const color = item.color || defaultColors[index % defaultColors.length];
        
        // Calculate relative drop-off from previous step
        const prevValue = index > 0 ? data[index - 1].value : maxValue;
        const retentionRate = Math.round((item.value / prevValue) * 100);

        return (
          <div key={item.stage} className="relative flex flex-col">
            <div className="flex items-center justify-between text-xs font-semibold mb-1 text-muted-foreground">
              <span>{item.stage}</span>
              <span className="tabular-nums font-mono text-foreground">
                {item.value.toLocaleString()} 
                {index > 0 && <span className="text-[10px] text-muted-foreground ml-2">({retentionRate}% rent.)</span>}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 h-7 bg-secondary/30 rounded-lg overflow-hidden relative border border-border/40">
                <div 
                  className="h-full rounded-r-md transition-all duration-500 ease-out flex items-center pl-3"
                  style={{ 
                    width: `${percentage}%`, 
                    backgroundColor: color,
                    opacity: 0.85
                  }}
                >
                  <span className="text-[10px] font-bold text-white drop-shadow-sm select-none">
                    {percentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
