'use client';

import React from 'react';
import {
  PieChart as RechartsPie, Pie, Cell,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { CHART_STYLE } from '@/lib/analytics/chart-themes';

interface PieDataItem {
  name: string;
  value: number;
  color: string;
}

interface AnalyticsPieChartProps {
  data: PieDataItem[];
  height?: number;
  donut?: boolean;
  showLegend?: boolean;
  showLabels?: boolean;
  innerLabel?: string;
  innerSubLabel?: string;
  tooltipFormatter?: (v: number, name: string) => string;
}

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
  cx: number; cy: number; midAngle: number;
  innerRadius: number; outerRadius: number; percent: number;
}) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#FFFFFF" textAnchor="middle" dominantBaseline="central"
      fontSize={11} fontFamily={CHART_STYLE.fontFamily} fontWeight="600">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload, formatter }: {
  active?: boolean;
  payload?: { name: string; value: number; payload: PieDataItem }[];
  formatter?: (v: number, n: string) => string;
}) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl border px-3 py-2.5 shadow-lg" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2 text-xs">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.payload.color }} />
        <span style={{ color: 'var(--muted-foreground)' }}>{item.name}</span>
        <span className="font-bold tabular-nums ml-2" style={{ color: 'var(--foreground)' }}>
          {formatter ? formatter(item.value, item.name) : item.value.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export function AnalyticsPieChart({
  data, height = 280, donut = false,
  showLegend = true, showLabels = true,
  innerLabel, innerSubLabel, tooltipFormatter,
}: AnalyticsPieChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const innerRadius = donut ? '55%' : 0;
  const outerRadius = donut ? '80%' : '75%';

  return (
    <div style={{ height, position: 'relative' }}>
      <ResponsiveContainer width="100%" height={showLegend ? '75%' : '100%'}>
        <RechartsPie margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={donut ? 2 : 1}
            dataKey="value"
            labelLine={false}
            label={showLabels ? renderCustomLabel : undefined}
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip formatter={tooltipFormatter} />} />
        </RechartsPie>
      </ResponsiveContainer>

      {/* Donut center label */}
      {donut && innerLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ top: showLegend ? 0 : 0, height: showLegend ? '75%' : '100%' }}>
          <span className="text-xl font-bold tabular-nums" style={{ color: 'var(--foreground)', fontFamily: "'Inter', monospace" }}>
            {innerLabel}
          </span>
          {innerSubLabel && (
            <span className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{innerSubLabel}</span>
          )}
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 pt-2">
          {data.map(item => {
            const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';
            return (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                <span style={{ color: 'var(--muted-foreground)' }}>{item.name}</span>
                <span className="font-semibold tabular-nums" style={{ color: 'var(--foreground)' }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
