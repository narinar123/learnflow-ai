'use client';

import React from 'react';
import {
  Radar, RadarChart as RechartsRadar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import { CHART_STYLE } from '@/lib/analytics/chart-themes';

interface RadarSeriesConfig {
  key: string;
  label?: string;
  color: string;
  fillOpacity?: number;
}

interface AnalyticsRadarChartProps {
  data: Record<string, unknown>[];
  angleKey: string;
  series: RadarSeriesConfig[];
  height?: number;
  showLegend?: boolean;
}

export function AnalyticsRadarChart({
  data, angleKey, series, height = 280, showLegend = true
}: AnalyticsRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsRadar cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke={CHART_STYLE.gridColor} />
        <PolarAngleAxis
          dataKey={angleKey}
          tick={{ fontSize: 10, fill: CHART_STYLE.tickColor, fontFamily: CHART_STYLE.fontFamily }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 'auto']}
          tick={{ fontSize: 9, fill: CHART_STYLE.tickColor }}
          axisLine={false}
        />
        {series.map(s => (
          <Radar
            key={s.key}
            name={s.label ?? s.key}
            dataKey={s.key}
            stroke={s.color}
            fill={s.color}
            fillOpacity={s.fillOpacity ?? 0.3}
          />
        ))}
        <Tooltip
          contentStyle={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            fontSize: '11px',
            fontFamily: CHART_STYLE.fontFamily,
            color: 'var(--foreground)',
            borderRadius: '8px'
          }}
        />
        {showLegend && (
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, fontFamily: CHART_STYLE.fontFamily, color: CHART_STYLE.tickColor, paddingTop: 8 }}
          />
        )}
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
