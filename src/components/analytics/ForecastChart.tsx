'use client';

import React from 'react';
import {
  Area, ComposedChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { CHART_STYLE } from '@/lib/analytics/chart-themes';

interface ForecastDataPoint {
  month: string;
  actual: number | null;
  forecast: number | null;
  upper: number | null;
  lower: number | null;
}

interface ForecastChartProps {
  data: ForecastDataPoint[];
  height?: number;
  yTickFormatter?: (v: number) => string;
}

const CustomTooltip = ({ active, payload, label, yTickFormatter }: {
  active?: boolean;
  payload?: any[];
  label?: string;
  yTickFormatter?: (v: number) => string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border px-3 py-2.5 shadow-lg" style={{ background: 'var(--card)', borderColor: 'var(--border)', minWidth: 165 }}>
      <p className="text-xs font-semibold mb-2 text-muted-foreground">{label}</p>
      {payload.map((p) => {
        if (p.dataKey === 'actual' && p.value !== null && p.value !== undefined) {
          return (
            <div key={p.name} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Actual Revenue</span>
              </span>
              <span className="font-bold font-mono text-foreground">
                {yTickFormatter ? yTickFormatter(p.value) : p.value.toLocaleString()}
              </span>
            </div>
          );
        }
        if (p.dataKey === 'forecast' && p.value !== null && p.value !== undefined) {
          return (
            <div key={p.name} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full border border-dashed border-accent bg-transparent" />
                <span className="text-muted-foreground">AI Forecast</span>
              </span>
              <span className="font-bold font-mono text-accent">
                {yTickFormatter ? yTickFormatter(p.value) : p.value.toLocaleString()}
              </span>
            </div>
          );
        }
        return null;
      })}
      
      {/* Range Display */}
      {payload.some(p => p.dataKey === 'forecast') && (
        <div className="border-t border-border mt-2 pt-1.5 text-[10px] text-muted-foreground">
          {(() => {
            const forecastItem = payload.find(p => p.dataKey === 'forecast');
            const payloadData = forecastItem?.payload;
            if (payloadData && payloadData.lower && payloadData.upper) {
              return (
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between">
                    <span>95% CI Range:</span>
                  </div>
                  <div className="font-mono text-foreground font-semibold">
                    {yTickFormatter ? yTickFormatter(payloadData.lower) : payloadData.lower.toLocaleString()} - {yTickFormatter ? yTickFormatter(payloadData.upper) : payloadData.upper.toLocaleString()}
                  </div>
                </div>
              );
            }
            return null;
          })()}
        </div>
      )}
    </div>
  );
};

export function ForecastChart({ data, height = 280, yTickFormatter }: ForecastChartProps) {
  const mappedData = data.map(d => ({
    ...d,
    range: d.lower !== null && d.upper !== null ? [d.lower, d.upper] : null
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={mappedData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="forecastBand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00C9A7" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#00C9A7" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_STYLE.gridColor} vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: CHART_STYLE.tickColor, fontFamily: CHART_STYLE.fontFamily }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: CHART_STYLE.tickColor, fontFamily: CHART_STYLE.fontFamily }}
          axisLine={false}
          tickLine={false}
          tickFormatter={yTickFormatter}
          width={45}
        />
        <Tooltip content={<CustomTooltip yTickFormatter={yTickFormatter} />} />
        
        {/* Confidence Band */}
        <Area
          dataKey="range"
          fill="url(#forecastBand)"
          stroke="none"
          name="95% Confidence Band"
        />
        
        {/* Actual Trend */}
        <Line
          type="monotone"
          dataKey="actual"
          name="Actual"
          stroke="#6C47FF"
          strokeWidth={3}
          dot={{ r: 4, fill: '#6C47FF', strokeWidth: 0 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />

        {/* Forecasted Line */}
        <Line
          type="monotone"
          dataKey="forecast"
          name="Forecast"
          stroke="#00C9A7"
          strokeWidth={2.5}
          strokeDasharray="5 4"
          dot={{ r: 3, fill: '#00C9A7', strokeWidth: 0 }}
          activeDot={{ r: 5, strokeWidth: 0 }}
        />
        
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, fontFamily: CHART_STYLE.fontFamily, color: CHART_STYLE.tickColor, paddingTop: 8 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
