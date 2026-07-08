'use client';

import React from 'react';
import {
  LineChart as RechartsLine, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from 'recharts';
import { CHART_STYLE } from '@/lib/analytics/chart-themes';

interface LineSeriesConfig {
  key: string;
  label?: string;
  color: string;
  dashed?: boolean;
  dot?: boolean;
  strokeWidth?: number;
}

interface ReferenceLineConfig {
  y: number;
  label?: string;
  color?: string;
}

interface AnalyticsLineChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: LineSeriesConfig[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  referenceLines?: ReferenceLineConfig[];
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
            {formatter ? formatter(p.value, p.name) : p.value?.toLocaleString?.() ?? p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export function AnalyticsLineChart({
  data, xKey, series, height = 280,
  showGrid = true, showLegend = true,
  referenceLines, yTickFormatter, tooltipFormatter,
}: AnalyticsLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLine data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={CHART_STYLE.gridColor} vertical={false} />}
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
        {referenceLines?.map((rl, i) => (
          <ReferenceLine
            key={i} y={rl.y} stroke={rl.color ?? '#6B6880'}
            strokeDasharray="4 3"
            label={{ value: rl.label, fontSize: 10, fill: rl.color ?? '#6B6880', position: 'right' }}
          />
        ))}
        {series.map(s => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label ?? s.key}
            stroke={s.color}
            strokeWidth={s.strokeWidth ?? 2}
            strokeDasharray={s.dashed ? '5 4' : undefined}
            dot={s.dot !== false ? { r: 3, fill: s.color, strokeWidth: 0 } : false}
            activeDot={{ r: 5, strokeWidth: 0 }}
            connectNulls={false}
          />
        ))}
      </RechartsLine>
    </ResponsiveContainer>
  );
}
