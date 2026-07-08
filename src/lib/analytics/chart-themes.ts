// ─── Chart Theme Tokens ──────────────────────────────────────────────────────
// Synced to src/styles/tailwind.css design tokens

export const CHART_COLORS = {
  primary:  '#6C47FF',
  accent:   '#00C9A7',
  warning:  '#F59E0B',
  danger:   '#EF4444',
  info:     '#3B82F6',
  purple:   '#A855F7',
  pink:     '#EC4899',
  orange:   '#F97316',
  teal:     '#14B8A6',
  indigo:   '#6366F1',
  cyan:     '#06B6D4',
  lime:     '#84CC16',
};

export const PALETTE_6 = [
  CHART_COLORS.primary,
  CHART_COLORS.accent,
  CHART_COLORS.warning,
  CHART_COLORS.info,
  CHART_COLORS.purple,
  CHART_COLORS.pink,
];

export const PALETTE_10 = [
  CHART_COLORS.primary,
  CHART_COLORS.accent,
  CHART_COLORS.warning,
  CHART_COLORS.danger,
  CHART_COLORS.info,
  CHART_COLORS.purple,
  CHART_COLORS.pink,
  CHART_COLORS.orange,
  CHART_COLORS.teal,
  CHART_COLORS.indigo,
];

export const GRADIENT_DEFS = [
  { id: 'gradPrimary', color: '#6C47FF' },
  { id: 'gradAccent',  color: '#00C9A7' },
  { id: 'gradWarning', color: '#F59E0B' },
  { id: 'gradDanger',  color: '#EF4444' },
  { id: 'gradInfo',    color: '#3B82F6' },
];

export const CHART_STYLE = {
  fontFamily: "'Inter', 'Outfit', sans-serif",
  fontSize: 12,
  gridColor: 'rgba(228,224,245,0.5)',
  tickColor: '#6B6880',
  tooltipBg: '#FFFFFF',
  tooltipBorder: '#E4E0F5',
  tooltipText: '#0F0A1E',
};
