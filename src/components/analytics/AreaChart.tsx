'use client';

import React from 'react';
import {
  AreaChart as RechartsArea,
  Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { CHART_STYLE } from '@/lib/analytics/chart-themes';

interface SeriesConfig {
  key: string;
  label?: string;
  color: string;
  fillOpacity?: number;
  dashed?: boolean;
}

interface AnalyticsAreaChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: SeriesConfig[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  yTickFormatter?: (v: number) => string;
  tooltipFormatter?: (v: number, name: string) => string;
}

const CustomTooltip = ({ active, payload, label, formatter }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
  formatter?: (v: number, n: string) => string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border px-3 py-2.5 shadow-lg" style={{ background: 'var(--card)', borderColor: 'var(--border)', minWidth: 140 }}>
      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--muted-foreground)' }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center justify-between gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span style={{ color: 'var(--muted-foreground)' }}>{p.name}</span>
          </span>
          <span className="font-bold tabular-nums" style={{ color: 'var(--foreground)' }}>
            {formatter ? formatter(p.value, p.name) : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export function AnalyticsAreaChart({
  data, xKey, series, height = 280,
  showGrid = true, showLegend = true,
  yTickFormatter, tooltipFormatter,
}: AnalyticsAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsArea data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          {series.map(s => (
            <linearGradient key={s.key} id={`areaGrad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={s.color} stopOpacity={s.fillOpacity ?? 0.25} />
              <stop offset="95%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_STYLE.gridColor} vertical={false} />
        )}
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 11, fill: CHART_STYLE.tickColor, fontFamily: CHART_STYLE.fontFamily }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: CHART_STYLE.tickColor, fontFamily: CHART_STYLE.fontFamily }}
          axisLine={false} tickLine={false} width={48}
          tickFormatter={yTickFormatter}
        />
        <Tooltip content={<CustomTooltip formatter={tooltipFormatter} />} />
        {showLegend && (
          <Legend
            iconType="circle" iconSize={8}
            wrapperStyle={{ fontSize: 11, fontFamily: CHART_STYLE.fontFamily, color: CHART_STYLE.tickColor, paddingTop: 8 }}
          />
        )}
        {series.map(s => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label ?? s.key}
            stroke={s.color}
            strokeWidth={2}
            strokeDasharray={s.dashed ? '5 4' : undefined}
            fill={`url(#areaGrad-${s.key})`}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </RechartsArea>
    </ResponsiveContainer>
  );
}
