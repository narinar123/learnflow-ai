'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const weeklyData = [
  { day: 'Mon', hours: 1.5, goal: 2 },
  { day: 'Tue', hours: 2.8, goal: 2 },
  { day: 'Wed', hours: 2.0, goal: 2 },
  { day: 'Thu', hours: 3.2, goal: 2 },
  { day: 'Fri', hours: 1.8, goal: 2 },
  { day: 'Sat', hours: 4.5, goal: 2 },
  { day: 'Sun', hours: 2.2, goal: 2 },
];

const today = new Date().getDay(); // 0 = Sunday
const dayIndexMap: Record<string, number> = {
  Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0,
};

const totalHours = weeklyData.reduce((sum, d) => sum + d.hours, 0);
const goalHours = 14; // 2h × 7 days
const goalProgress = Math.round((totalHours / goalHours) * 100);

/** Custom tooltip for the weekly chart */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const hours = payload[0].value as number;
  return (
    <div
      className="glass-card px-3 py-2 text-sm"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
      role="tooltip"
    >
      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
      <p style={{ color: 'var(--color-primary-400)' }}>
        {hours.toFixed(1)}h learned
      </p>
      {hours >= 2 ? (
        <p style={{ color: 'var(--color-accent-emerald)', fontSize: '0.75rem' }}>✓ Daily goal met</p>
      ) : (
        <p style={{ color: 'var(--color-accent-amber)', fontSize: '0.75rem' }}>
          {(2 - hours).toFixed(1)}h to goal
        </p>
      )}
    </div>
  );
}

/**
 * WeeklyHoursChart — Recharts bar chart of learning hours per day,
 * with goal line indicator and totals row.
 */
export function WeeklyHoursChart() {
  return (
    <section
      className="card"
      aria-labelledby="weekly-chart-heading"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2
            id="weekly-chart-heading"
            className="section-title"
            style={{ marginBottom: 4 }}
          >
            Weekly Learning Hours
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            7-day overview · {totalHours.toFixed(1)}h total
          </p>
        </div>

        <div className="text-right">
          <div
            className="font-display font-bold"
            style={{ fontSize: '1.25rem', color: 'var(--color-accent-emerald)' }}
            aria-label={`Weekly goal: ${goalProgress}% complete`}
          >
            {goalProgress}%
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            of weekly goal
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4" aria-hidden="true">
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ background: 'var(--color-primary-500)' }}
          />
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Hours learned
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5" style={{ background: 'var(--color-accent-amber)' }} />
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Daily goal (2h)
          </span>
        </div>
      </div>

      {/* Chart */}
      <div
        style={{ height: 180 }}
        role="img"
        aria-label="Bar chart: weekly learning hours. Mon 1.5h, Tue 2.8h, Wed 2h, Thu 3.2h, Fri 1.8h, Sat 4.5h, Sun 2.2h"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyData}
            margin={{ top: 4, right: 0, left: -20, bottom: 0 }}
            aria-hidden="true"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}h`}
              domain={[0, 5]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
            />
            <Bar dataKey="hours" radius={[6, 6, 0, 0]} maxBarSize={36}>
              {weeklyData.map((entry, index) => {
                const isToday = dayIndexMap[entry.day] === today;
                const metGoal = entry.hours >= entry.goal;
                return (
                  <Cell
                    key={entry.day}
                    fill={
                      isToday
                        ? 'var(--color-primary-500)'
                        : metGoal
                        ? 'var(--color-accent-emerald)'
                        : 'rgba(99, 102, 241, 0.4)'
                    }
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Goal line reference text */}
      <div
        className="mt-4 flex items-center gap-2 p-2.5 rounded-lg"
        style={{
          background: 'rgba(245, 158, 11, 0.05)',
          border: '1px solid rgba(245, 158, 11, 0.15)',
        }}
        role="note"
        aria-label="Goal line at 2 hours per day"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-amber)" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          The <span style={{ color: 'var(--color-accent-amber)', fontWeight: 600 }}>amber dashed line</span> represents your 2h daily goal.
          Green bars = goal met · Blue = today · Faded = below goal
        </p>
      </div>
    </section>
  );
}
