'use client';

import React from 'react';

interface HeatmapDay {
  day: number;
  count: number;
}

interface HeatmapWeek {
  week: number;
  days: HeatmapDay[];
}

interface HeatmapChartProps {
  data: HeatmapWeek[];
  className?: string;
}

export function HeatmapChart({ data, className = '' }: HeatmapChartProps) {
  // Determine color based on count
  const getColor = (count: number) => {
    if (count === 0) return 'var(--muted)';
    if (count < 5) return 'rgba(108,71,255,0.2)';   // Light primary
    if (count < 10) return 'rgba(108,71,255,0.4)';  // Medium light primary
    if (count < 18) return 'rgba(108,71,255,0.7)';  // Medium dark primary
    return 'var(--primary)';                        // Deep primary
  };

  const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className={`flex flex-col select-none overflow-x-auto scrollbar-thin ${className}`}>
      {/* Month Headers */}
      <div className="flex text-[10px] text-muted-foreground mb-1 ml-8 gap-x-[14.5px]">
        {monthLabels.map((month) => (
          <div key={month} className="w-8 text-left">
            {month}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {/* Day Labels */}
        <div className="flex flex-col justify-between text-[10px] text-muted-foreground pr-2 h-[84px] py-0.5 w-6 shrink-0">
          {dayLabels.map((label, index) => (
            <span key={index} className="h-[9px] flex items-center">
              {label}
            </span>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="flex gap-[3px]">
          {data.map((week) => (
            <div key={week.week} className="flex flex-col gap-[3px]">
              {week.days.map((day) => (
                <div
                  key={day.day}
                  className="w-[9px] h-[9px] rounded-sm transition-colors duration-150 hover:ring-1 hover:ring-primary/50 relative group cursor-pointer"
                  style={{ backgroundColor: getColor(day.count) }}
                >
                  {/* Tooltip */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-30 bg-foreground text-background text-[9px] font-semibold px-2 py-0.5 rounded shadow-md whitespace-nowrap">
                    {day.count} sessions
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end text-[10px] text-muted-foreground gap-1.5 mt-3 pr-2">
        <span>Less</span>
        <div className="w-[9px] h-[9px] rounded-sm bg-muted" />
        <div className="w-[9px] h-[9px] rounded-sm bg-primary/20" />
        <div className="w-[9px] h-[9px] rounded-sm bg-primary/40" />
        <div className="w-[9px] h-[9px] rounded-sm bg-primary/70" />
        <div className="w-[9px] h-[9px] rounded-sm bg-primary" />
        <span>More</span>
      </div>
    </div>
  );
}
