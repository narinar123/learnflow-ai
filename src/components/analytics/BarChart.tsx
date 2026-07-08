'use client';

import React from 'react';
import {
  BarChart as RechartsBar, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from 'recharts';
import { CHART_STYLE } from '@/lib/analytics/chart-themes';

interface BarSeriesConfig {
  key: string;
  label?: string;
  color: string;
  radius?: number;
}

interface AnalyticsBarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: BarSeriesConfig[];
  height?: number;
  layout?: 'vertical' | 'horizontal';
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  yTickFormatter?: (v: number) => string;
  xTickFormatter?: (v: string) => string;
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

export function AnalyticsBarChart({
  data, xKey, series, height = 280, layout = 'horizontal',
  stacked = false, showGrid = true, showLegend = true,
  yTickFormatter, xTickFormatter, tooltipFormatter,
}: AnalyticsBarChartProps) {
  const isVertical = layout === 'vertical';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar
        data={data}
        layout={layout}
        margin={{ top: 4, right: 4, left: isVertical ? 80 : 0, bottom: 0 }}
      >
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={CHART_STYLE.gridColor}
            horizontal={!isVertical}
            vertical={isVertical}
          />
        )}
        {isVertical ? (
          <>
            <YAxis
              type="category"
              dataKey={xKey}
              tick={{ fontSize: 11, fill: CHART_STYLE.tickColor, fontFamily: CHART_STYLE.fontFamily }}
              axisLine={false} tickLine={false} width={76}
              tickFormatter={xTickFormatter}
            />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: CHART_STYLE.tickColor, fontFamily: CHART_STYLE.fontFamily }}
              axisLine={false} tickLine={false}
              tickFormatter={yTickFormatter}
            />
          </>
        ) : (
          <>
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 11, fill: CHART_STYLE.tickColor, fontFamily: CHART_STYLE.fontFamily }}
              axisLine={false} tickLine={false}
              tickFormatter={xTickFormatter}
            />
            <YAxis
              tick={{ fontSize: 11, fill: CHART_STYLE.tickColor, fontFamily: CHART_STYLE.fontFamily }}
              axisLine={false} tickLine={false} width={48}
              tickFormatter={yTickFormatter}
            />
          </>
        )}
        <Tooltip content={<CustomTooltip formatter={tooltipFormatter} />} cursor={{ fill: 'rgba(108,71,255,0.06)' }} />
        {showLegend && (
          <Legend
            iconType="circle" iconSize={8}
            wrapperStyle={{ fontSize: 11, fontFamily: CHART_STYLE.fontFamily, color: CHART_STYLE.tickColor, paddingTop: 8 }}
          />
        )}
        {series.map((s, idx) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label ?? s.key}
            fill={s.color}
            stackId={stacked ? 'stack' : undefined}
            radius={s.radius ?? (stacked ? (idx === series.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]) : [4, 4, 0, 0])}
            maxBarSize={40}
          />
        ))}
      </RechartsBar>
    </ResponsiveContainer>
  );
}
