'use client';

import React from 'react';

interface FilterBarProps {
  dateRange: string;
  setDateRange: (range: string) => void;
  segment?: string;
  setSegment?: (segment: string) => void;
  granularity?: string;
  setGranularity?: (granularity: string) => void;
  segmentsList?: { value: string; label: string }[];
}

export function FilterBar({
  dateRange,
  setDateRange,
  segment,
  setSegment,
  granularity,
  setGranularity,
  segmentsList = [
    { value: 'all', label: 'All Segments' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'pro', label: 'Pro Members' },
    { value: 'free', label: 'Free Tier' }
  ]
}: FilterBarProps) {
  const dateRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'ytd', label: 'Year to Date' },
    { value: '1y', label: 'Last 12 Months' }
  ];

  const granularities = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-card rounded-xl border border-border shrink-0 select-none">
      {/* Date Range Buttons */}
      <div className="flex flex-wrap gap-1.5">
        {dateRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => setDateRange(range.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
              dateRange === range.value
                ? 'bg-primary text-white shadow-sm'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Select Dropdowns (Segment & Granularity) */}
      <div className="flex flex-wrap items-center gap-3">
        {setSegment && segment !== undefined && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground font-medium">Segment:</span>
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className="bg-card border border-border rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            >
              {segmentsList.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {setGranularity && granularity !== undefined && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground font-medium">Granularity:</span>
            <div className="flex bg-secondary/50 p-1 rounded-lg border border-border/40">
              {granularities.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGranularity(g.value)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all duration-150 ${
                    granularity === g.value
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
