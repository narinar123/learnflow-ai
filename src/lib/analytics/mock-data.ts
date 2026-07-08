// ─── Enterprise Analytics — Mock Data ─────────────────────────────────────────

// ── Shared helpers ────────────────────────────────────────────────────────────
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const shortMonths = months.map(m => m.slice(0,3));

function range(n: number) { return Array.from({ length: n }, (_, i) => i); }
function rand(min: number, max: number) { return Math.round(Math.random() * (max - min) + min); }
function randF(min: number, max: number, dec = 1) { return parseFloat((Math.random() * (max - min) + min).toFixed(dec)); }

// ── Executive ─────────────────────────────────────────────────────────────────
export const executiveKPIs = [
  { id: 'mrr',       label: 'Monthly Recurring Revenue', value: '$284,920', trend: 'up'   as const, trendValue: '+18.4%', color: 'primary'  as const, icon: 'currency', sparkline: range(12).map(i => ({ value: 180000 + i * 9000 + rand(-5000, 5000) })) },
  { id: 'users',     label: 'Active Users (30d)',         value: '48,291',   trend: 'up'   as const, trendValue: '+12.7%', color: 'accent'   as const, icon: 'users',    sparkline: range(12).map(i => ({ value: 32000 + i * 1400 + rand(-800, 800) })) },
  { id: 'completed', label: 'Courses Completed',          value: '12,840',   trend: 'up'   as const, trendValue: '+9.2%',  color: 'info'     as const, icon: 'check',    sparkline: range(12).map(i => ({ value: 8000 + i * 420 + rand(-200, 200) })) },
  { id: 'nps',       label: 'NPS Score',                  value: '72',       trend: 'up'   as const, trendValue: '+4 pts', color: 'warning'  as const, icon: 'star',     sparkline: range(12).map(i => ({ value: 58 + i * 1.2 + rand(-2, 2) })) },
  { id: 'arr',       label: 'Annual Recurring Revenue',   value: '$3.41M',   trend: 'up'   as const, trendValue: '+21.3%', color: 'primary'  as const, icon: 'trending', sparkline: range(12).map(i => ({ value: 2400000 + i * 85000 + rand(-20000, 20000) })) },
  { id: 'churn',     label: 'Monthly Churn Rate',         value: '2.1%',     trend: 'down' as const, trendValue: '-0.4%',  color: 'danger'   as const, icon: 'alert',    sparkline: range(12).map(i => ({ value: 3.2 - i * 0.09 + rand(-5, 5) / 100 })) },
];

export const revenueAreaData = months.map((m, i) => ({
  month: m,
  thisYear:  120000 + i * 14000 + rand(-8000, 8000),
  lastYear:  90000  + i * 8000  + rand(-6000, 6000),
  forecast:  i >= 9 ? 220000 + (i - 9) * 18000 : null,
}));

export const activityHeatmap = range(52).map(week => ({
  week,
  days: range(7).map(day => ({ day, count: rand(0, 25) })),
}));

export const forecastData = [
  ...months.slice(0, 9).map((m, i) => ({ month: m, actual: 180000 + i * 12000 + rand(-6000, 6000), forecast: null, upper: null, lower: null })),
  ...months.slice(9).map((m, i) => ({ month: m, actual: null, forecast: 290000 + i * 18000, upper: 310000 + i * 20000, lower: 270000 + i * 16000 })),
];

export const geoData = [
  { country: 'United States', users: 14280, share: '29.6%', flag: '🇺🇸' },
  { country: 'India',         users: 8940,  share: '18.5%', flag: '🇮🇳' },
  { country: 'United Kingdom',users: 4820,  share: '10.0%', flag: '🇬🇧' },
  { country: 'Germany',       users: 3210,  share: '6.6%',  flag: '🇩🇪' },
  { country: 'Canada',        users: 2890,  share: '6.0%',  flag: '🇨🇦' },
  { country: 'Australia',     users: 2140,  share: '4.4%',  flag: '🇦🇺' },
  { country: 'France',        users: 1980,  share: '4.1%',  flag: '🇫🇷' },
  { country: 'Brazil',        users: 1750,  share: '3.6%',  flag: '🇧🇷' },
  { country: 'Singapore',     users: 1420,  share: '2.9%',  flag: '🇸🇬' },
  { country: 'Japan',         users: 1180,  share: '2.4%',  flag: '🇯🇵' },
];

export const platformHealth = [
  { label: 'System Uptime',        value: 99.97, max: 100,  color: '#00C9A7' },
  { label: 'AI Accuracy',          value: 94.2,  max: 100,  color: '#6C47FF' },
  { label: 'Support Resolution',   value: 88.5,  max: 100,  color: '#F59E0B' },
  { label: 'Delivery Success',     value: 97.1,  max: 100,  color: '#3B82F6' },
];

// ── Students ──────────────────────────────────────────────────────────────────
export const studentKPIs = [
  { id: 'total',      label: 'Total Students',      value: '96,482',  trend: 'up'   as const, trendValue: '+14.2%', color: 'primary' as const },
  { id: 'active',     label: 'Active (30d)',         value: '48,291',  trend: 'up'   as const, trendValue: '+12.7%', color: 'accent'  as const },
  { id: 'newMonth',   label: 'New This Month',       value: '3,841',   trend: 'up'   as const, trendValue: '+8.3%',  color: 'info'    as const },
  { id: 'avgSession', label: 'Avg Session Time',     value: '42 min',  trend: 'up'   as const, trendValue: '+5 min', color: 'warning' as const },
  { id: 'completion', label: 'Completion Rate',      value: '68.4%',   trend: 'up'   as const, trendValue: '+3.1%',  color: 'primary' as const },
  { id: 'dropout',    label: 'Dropout Rate',         value: '8.2%',    trend: 'down' as const, trendValue: '-1.4%',  color: 'danger'  as const },
];

export const enrollmentTrend = months.map((m, i) => ({
  month: m,
  new:       2000 + i * 150 + rand(-200, 200),
  returning: 1400 + i * 80  + rand(-150, 150),
}));

export const completionHistogram = [
  { range: '0–10%',  count: 1820 },
  { range: '11–25%', count: 2940 },
  { range: '26–50%', count: 4120 },
  { range: '51–75%', count: 6840 },
  { range: '76–90%', count: 5390 },
  { range: '91–100%',count: 8420 },
];

export const cohortRetention = range(8).map(w => ({
  week: `Wk ${w + 1}`,
  retained: Math.round(100 * Math.pow(0.87, w)),
  churned:  Math.round(100 * (1 - Math.pow(0.87, w))),
}));

export const topStudents = range(10).map(i => ({
  rank: i + 1,
  name:       ['Aria Chen','Ravi Patel','Sofia M.','Jake Liu','Mia Torres','Sam Park','Lily R.','Omar A.','Priya S.','Tom B.'][i],
  xp:         rand(12000, 28000),
  completions:rand(8, 32),
  badges:     rand(5, 24),
  streak:     rand(10, 180),
  plan:       ['Pro','Enterprise','Pro','Free','Enterprise','Pro','Pro','Free','Enterprise','Pro'][i],
}));

// ── Trainers ──────────────────────────────────────────────────────────────────
export const trainerKPIs = [
  { id: 'trainers',  label: 'Total Trainers',       value: '1,284',  trend: 'up' as const, trendValue: '+42', color: 'primary' as const },
  { id: 'avgRating', label: 'Avg Rating',            value: '4.7',    trend: 'up' as const, trendValue: '+0.2', color: 'warning' as const },
  { id: 'courses',   label: 'Courses Published',     value: '8,941',  trend: 'up' as const, trendValue: '+318', color: 'accent'  as const },
  { id: 'students',  label: 'Total Students Taught', value: '284K',   trend: 'up' as const, trendValue: '+12.4%', color: 'info'  as const },
  { id: 'revenue',   label: 'Revenue Generated',     value: '$1.82M', trend: 'up' as const, trendValue: '+22.1%', color: 'primary' as const },
];

export const trainerLeaderboard = range(10).map(i => ({
  rank: i + 1,
  name:     ['Dr. Sarah K.','Alex Rivera','Prof. Chen','Maya D.','Raj Singh','Emma Liu','Carlos M.','Aisha O.','Yuki T.','Finn B.'][i],
  category: ['Data Science','Design','Engineering','Business','AI/ML','Marketing','DevOps','Security','Mobile','Cloud'][i],
  rating:   randF(4.2, 5.0),
  students: rand(1200, 8400),
  courses:  rand(4, 28),
  revenue:  `$${rand(18, 180)}K`,
}));

export const contentOutput = months.map((m, i) => ({
  month: m,
  courses: rand(60, 140),
  hours:   rand(400, 900),
}));

export const ratingDistribution = [
  { name: '5 Stars', value: 48, color: '#00C9A7' },
  { name: '4 Stars', value: 32, color: '#6C47FF' },
  { name: '3 Stars', value: 12, color: '#F59E0B' },
  { name: '2 Stars', value: 5,  color: '#F97316' },
  { name: '1 Star',  value: 3,  color: '#EF4444' },
];

export const responseTimeTrend = months.map((m, i) => ({
  month: m,
  avgHours: randF(1.2, 6.8),
}));

export const trainerRadar = [
  { subject: 'Content Quality', A: 88, B: 92 },
  { subject: 'Engagement',      A: 82, B: 78 },
  { subject: 'Clarity',         A: 90, B: 85 },
  { subject: 'Responsiveness',  A: 75, B: 88 },
  { subject: 'Assessment',      A: 86, B: 80 },
  { subject: 'Community',       A: 70, B: 76 },
];

// ── Institutions ──────────────────────────────────────────────────────────────
export const institutionKPIs = [
  { id: 'institutions', label: 'Total Institutions', value: '284',   trend: 'up' as const, trendValue: '+18', color: 'primary' as const },
  { id: 'seats',        label: 'Active Seats',       value: '42,800',trend: 'up' as const, trendValue: '+8.4%', color: 'accent' as const },
  { id: 'utilization',  label: 'License Utilization',value: '87.4%', trend: 'up' as const, trendValue: '+4.2%', color: 'warning' as const },
  { id: 'renewal',      label: 'Renewal Rate',       value: '94.1%', trend: 'up' as const, trendValue: '+1.8%', color: 'info'  as const },
];

export const licenseUsage = [
  { name: 'Apex University',    allocated: 500, used: 482 },
  { name: 'Meridian College',   allocated: 300, used: 241 },
  { name: 'TechCorp Inc.',      allocated: 800, used: 762 },
  { name: 'Global Academy',     allocated: 200, used: 184 },
  { name: 'Future Skills Ltd',  allocated: 400, used: 328 },
  { name: 'DataPath Institute', allocated: 150, used: 142 },
];

export const engagementByInstitution = [
  { name: 'TechCorp Inc.',      score: 94 },
  { name: 'Apex University',    score: 88 },
  { name: 'DataPath Institute', score: 85 },
  { name: 'Future Skills Ltd',  score: 79 },
  { name: 'Global Academy',     score: 74 },
  { name: 'Meridian College',   score: 68 },
];

export const renewalFunnel = [
  { stage: 'Active Contracts', value: 284, color: '#6C47FF' },
  { stage: 'Up for Renewal',   value: 142, color: '#F59E0B' },
  { stage: 'Renewal Started',  value: 118, color: '#3B82F6' },
  { stage: 'Renewed',          value: 106, color: '#00C9A7' },
];

// ── Revenue ───────────────────────────────────────────────────────────────────
export const revenueKPIs = [
  { id: 'mrr',     label: 'MRR',           value: '$284,920', trend: 'up'   as const, trendValue: '+18.4%', color: 'primary' as const },
  { id: 'arr',     label: 'ARR',           value: '$3.41M',   trend: 'up'   as const, trendValue: '+21.3%', color: 'accent'  as const },
  { id: 'ltv',     label: 'Avg LTV',       value: '$2,840',   trend: 'up'   as const, trendValue: '+11.2%', color: 'info'    as const },
  { id: 'arpu',    label: 'ARPU',          value: '$58.40',   trend: 'up'   as const, trendValue: '+4.8%',  color: 'warning' as const },
  { id: 'margin',  label: 'Gross Margin',  value: '71.2%',    trend: 'up'   as const, trendValue: '+2.1%',  color: 'primary' as const },
  { id: 'net',     label: 'Net Revenue',   value: '$202,863', trend: 'up'   as const, trendValue: '+16.9%', color: 'accent'  as const },
];

export const revenueBreakdown = months.map((m, i) => ({
  month: m,
  subscriptions: 120000 + i * 8000  + rand(-5000, 5000),
  enterprise:    60000  + i * 5000  + rand(-3000, 3000),
  oneTime:       20000  + i * 1000  + rand(-2000, 2000),
}));

export const paymentMethods = [
  { name: 'Stripe',    value: 58, color: '#6C47FF' },
  { name: 'PayPal',    value: 27, color: '#009CDE' },
  { name: 'Razorpay',  value: 15, color: '#3395FF' },
];

export const revenuePlan = [
  { plan: 'Enterprise', revenue: 148000, users: 2840 },
  { plan: 'Pro',        revenue: 96000,  users: 18400 },
  { plan: 'Basic',      revenue: 28000,  users: 24200 },
  { plan: 'Free',       revenue: 0,      users: 51000 },
];

export const mrrMovement = [
  { label: 'Previous MRR', value: 241000,  type: 'base' },
  { label: 'New MRR',      value: 28400,   type: 'positive' },
  { label: 'Expansion',    value: 18200,   type: 'positive' },
  { label: 'Reactivation', value: 4100,    type: 'positive' },
  { label: 'Contraction',  value: -6800,   type: 'negative' },
  { label: 'Churn',        value: -5980,   type: 'negative' },
  { label: 'Current MRR',  value: 284920,  type: 'total' },
];

// ── Sales ─────────────────────────────────────────────────────────────────────
export const salesKPIs = [
  { id: 'leads',       label: 'Total Leads',      value: '8,421',  trend: 'up'   as const, trendValue: '+24.1%', color: 'primary' as const },
  { id: 'conversions', label: 'Conversions',       value: '1,284',  trend: 'up'   as const, trendValue: '+18.4%', color: 'accent'  as const },
  { id: 'pipeline',    label: 'Pipeline Value',    value: '$2.1M',  trend: 'up'   as const, trendValue: '+31.2%', color: 'warning' as const },
  { id: 'closeRate',   label: 'Close Rate',        value: '15.2%',  trend: 'up'   as const, trendValue: '+2.4%',  color: 'info'    as const },
  { id: 'dealSize',    label: 'Avg Deal Size',     value: '$4,820', trend: 'up'   as const, trendValue: '+8.1%',  color: 'primary' as const },
  { id: 'cycle',       label: 'Avg Sales Cycle',   value: '18 days',trend: 'down' as const, trendValue: '-3 days',color: 'accent'  as const },
];

export const salesFunnel = [
  { stage: 'Visitors',    value: 84210, color: '#6C47FF' },
  { stage: 'Leads',       value: 8421,  color: '#8B6FFF' },
  { stage: 'Trials',      value: 2842,  color: '#F59E0B' },
  { stage: 'Paid',        value: 1284,  color: '#00C9A7' },
];

export const conversionTrend = months.map((m, i) => ({
  month: m,
  rate: 12.4 + i * 0.24 + rand(-8, 8) / 10,
}));

export const leadSources = [
  { source: 'Organic Search', leads: 3210, color: '#6C47FF' },
  { source: 'Paid Ads',       leads: 2140, color: '#F59E0B' },
  { source: 'Referral',       leads: 1480, color: '#00C9A7' },
  { source: 'Social Media',   leads: 980,  color: '#3B82F6' },
  { source: 'Direct',         leads: 611,  color: '#A855F7' },
];

export const salesReps = range(8).map(i => ({
  name:     ['Alex M.','Priya R.','Tom S.','Sarah K.','Omar H.','Liu W.','Emma B.','Raj P.'][i],
  leads:    rand(280, 980),
  won:      rand(40, 180),
  revenue:  `$${rand(80, 420)}K`,
  rate:     `${randF(12, 28)}%`,
}));

// ── CRM ───────────────────────────────────────────────────────────────────────
export const crmKPIs = [
  { id: 'contacts',  label: 'Total Contacts',  value: '24,810', trend: 'up'   as const, trendValue: '+841',  color: 'primary' as const },
  { id: 'qualified', label: 'Qualified Leads',  value: '3,284',  trend: 'up'   as const, trendValue: '+12.1%',color: 'accent'  as const },
  { id: 'open',      label: 'Open Deals',       value: '482',    trend: 'up'   as const, trendValue: '+48',   color: 'warning' as const },
  { id: 'won',       label: 'Won Deals',        value: '1,284',  trend: 'up'   as const, trendValue: '+18.4%',color: 'info'    as const },
  { id: 'lost',      label: 'Lost Deals',       value: '284',    trend: 'down' as const, trendValue: '-12.1%',color: 'danger'  as const },
  { id: 'health',    label: 'Pipeline Health',  value: '82%',    trend: 'up'   as const, trendValue: '+4%',   color: 'primary' as const },
];

export const crmActivity = months.map((m, i) => ({
  month: m,
  calls:    rand(180, 420),
  emails:   rand(380, 840),
  meetings: rand(60, 180),
}));

export const dealStages = [
  { stage: '0–7 days',   deals: 142, color: '#00C9A7' },
  { stage: '8–14 days',  deals: 98,  color: '#6C47FF' },
  { stage: '15–30 days', deals: 84,  color: '#F59E0B' },
  { stage: '30–60 days', deals: 62,  color: '#F97316' },
  { stage: '60+ days',   deals: 40,  color: '#EF4444' },
];

export const topAccounts = range(8).map(i => ({
  name:        ['TechCorp Inc.','Apex Uni','Meridian','FuturePath','DataSkills','CloudBase','LearnPro','EduNation'][i],
  arr:         `$${rand(80, 480)}K`,
  health:      rand(62, 98),
  lastContact: `${rand(1, 14)} days ago`,
  status:      ['Active','At Risk','Active','Healthy','Active','Churning','Active','Healthy'][i],
}));

export const churnRiskRadar = [
  { subject: 'Engagement',    risk: 72,  safe: 90 },
  { subject: 'NPS',           risk: 58,  safe: 85 },
  { subject: 'Usage',         risk: 65,  safe: 92 },
  { subject: 'Renewal Intent',risk: 48,  safe: 88 },
  { subject: 'Support Calls', risk: 82,  safe: 70 },
  { subject: 'Feature Adopt', risk: 55,  safe: 80 },
];

// ── AI Analytics ──────────────────────────────────────────────────────────────
export const aiKPIs = [
  { id: 'sessions',   label: 'AI Sessions',         value: '284,920', trend: 'up' as const, trendValue: '+42.1%', color: 'primary' as const },
  { id: 'respTime',   label: 'Avg Response Time',   value: '1.24s',   trend: 'down' as const, trendValue: '-0.18s', color: 'accent' as const },
  { id: 'accuracy',   label: 'Accuracy Score',      value: '94.2%',   trend: 'up' as const, trendValue: '+2.1%',  color: 'info'    as const },
  { id: 'satisfaction',label: 'User Satisfaction',  value: '4.8/5',   trend: 'up' as const, trendValue: '+0.3',   color: 'warning' as const },
  { id: 'queries',    label: 'Queries / Day',        value: '9,482',   trend: 'up' as const, trendValue: '+18.4%', color: 'primary' as const },
  { id: 'cost',       label: 'Model Cost / Month',  value: '$4,820',  trend: 'down' as const, trendValue: '-12.4%', color: 'danger'  as const },
];

export const aiQueryVolume = months.map((m, i) => ({
  month: m,
  queries: 120000 + i * 14000 + rand(-8000, 8000),
  resolved: 110000 + i * 13000 + rand(-7000, 7000),
}));

export const aiTopics = [
  { name: 'Course Help',      value: 34, color: '#6C47FF' },
  { name: 'Quiz Assistance',  value: 22, color: '#00C9A7' },
  { name: 'Career Guidance',  value: 18, color: '#F59E0B' },
  { name: 'Code Debugging',   value: 14, color: '#3B82F6' },
  { name: 'Concept Explain',  value: 12, color: '#A855F7' },
];

export const aiQuality = months.map((m, i) => ({
  month: m,
  accuracy:     90 + i * 0.35 + rand(-5, 5) / 10,
  satisfaction: 88 + i * 0.28 + rand(-4, 4) / 10,
  benchmark:    92,
}));

export const aiCostROI = months.map((m, i) => ({
  month: m,
  cost:  3200 + i * 140 + rand(-200, 200),
  roi:   280  + i * 18  + rand(-20, 20),
}));

// ── Courses ───────────────────────────────────────────────────────────────────
export const courseKPIs = [
  { id: 'total',       label: 'Total Courses',    value: '8,941',  trend: 'up' as const, trendValue: '+318',  color: 'primary' as const },
  { id: 'avgRating',   label: 'Avg Rating',       value: '4.68',   trend: 'up' as const, trendValue: '+0.12', color: 'warning' as const },
  { id: 'completion',  label: 'Completion Rate',  value: '68.4%',  trend: 'up' as const, trendValue: '+3.1%', color: 'accent'  as const },
  { id: 'enrollments', label: 'Total Enrollments',value: '284K',   trend: 'up' as const, trendValue: '+14.2%',color: 'info'    as const },
  { id: 'watchTime',   label: 'Total Watch Hours',value: '1.84M',  trend: 'up' as const, trendValue: '+28.4%',color: 'primary' as const },
  { id: 'passRate',    label: 'Quiz Pass Rate',   value: '78.2%',  trend: 'up' as const, trendValue: '+4.8%', color: 'accent'  as const },
];

export const topCourses = range(10).map(i => ({
  rank: i + 1,
  title:      ['Python Mastery','React Advanced','Data Science Pro','AI Fundamentals','Cloud Architecture','DevSecOps','Mobile Dev','UX Design','Machine Learning','Blockchain Dev'][i],
  category:   ['Engineering','Engineering','Data','AI/ML','Cloud','Security','Mobile','Design','AI/ML','Blockchain'][i],
  enrollments:rand(8400, 28400),
  rating:     randF(4.2, 5.0),
  completion: `${rand(58, 94)}%`,
  revenue:    `$${rand(48, 284)}K`,
}));

export const courseCategories = [
  { name: 'Engineering',  value: 28, color: '#6C47FF' },
  { name: 'Data & AI',    value: 22, color: '#00C9A7' },
  { name: 'Business',     value: 18, color: '#F59E0B' },
  { name: 'Design',       value: 12, color: '#3B82F6' },
  { name: 'Security',     value: 10, color: '#A855F7' },
  { name: 'Other',        value: 10, color: '#6B6880' },
];

export const courseEngagementHeatmap = range(7).map(day => ({
  day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][day],
  hours: range(24).map(h => ({ hour: h, engagement: rand(0, 100) })),
}));

export const ratingTrend = months.map((m, i) => ({
  month: m,
  engineering: randF(4.2, 4.9),
  business:    randF(4.0, 4.8),
  design:      randF(4.3, 5.0),
}));

// ── Learning ──────────────────────────────────────────────────────────────────
export const learningKPIs = [
  { id: 'avgTime',    label: 'Avg Learning Time/Day', value: '42 min',  trend: 'up' as const, trendValue: '+8 min',  color: 'primary' as const },
  { id: 'streaks',    label: 'Active Streaks',         value: '18,240',  trend: 'up' as const, trendValue: '+12.4%', color: 'warning' as const },
  { id: 'skills',     label: 'Skills Mastered',        value: '284,920', trend: 'up' as const, trendValue: '+28.1%', color: 'accent'  as const },
  { id: 'assessments',label: 'Assessments Taken',      value: '94,820',  trend: 'up' as const, trendValue: '+18.4%', color: 'info'    as const },
  { id: 'notes',      label: 'Notes Created',          value: '142,840', trend: 'up' as const, trendValue: '+34.2%', color: 'primary' as const },
];

export const learningByHour = range(24).map(h => ({
  hour: `${h.toString().padStart(2,'0')}:00`,
  sessions: h >= 6 && h <= 22
    ? rand(200, 1800) * (h >= 18 && h <= 21 ? 1.8 : h >= 8 && h <= 11 ? 1.4 : 1)
    : rand(10, 80),
}));

export const skillMastery = [
  { subject: 'Programming',  value: 84 },
  { subject: 'Data Analysis',value: 72 },
  { subject: 'Design',       value: 68 },
  { subject: 'AI/ML',        value: 58 },
  { subject: 'Cloud',        value: 74 },
  { subject: 'Security',     value: 62 },
];

export const lessonDropoff = [
  { stage: 'Enrolled',      value: 10000, color: '#6C47FF' },
  { stage: 'Intro Watched', value: 8200,  color: '#8B6FFF' },
  { stage: '25% Complete',  value: 6400,  color: '#F59E0B' },
  { stage: '50% Complete',  value: 4800,  color: '#F97316' },
  { stage: '75% Complete',  value: 3200,  color: '#EF4444' },
  { stage: 'Completed',     value: 2100,  color: '#00C9A7' },
];

export const assessmentPerf = [
  { category: 'Quizzes',       min: 42, avg: 74, max: 98 },
  { category: 'Assignments',   min: 38, avg: 68, max: 96 },
  { category: 'Projects',      min: 54, avg: 78, max: 100 },
  { category: 'Peer Reviews',  min: 60, avg: 82, max: 99 },
  { category: 'Final Exams',   min: 40, avg: 71, max: 97 },
];

export const learningPaths = [
  { path: 'Full Stack Dev',  enrolled: 8420, completed: 5840, pct: 69 },
  { path: 'Data Science',    enrolled: 6280, completed: 4120, pct: 66 },
  { path: 'AI Engineer',     enrolled: 4820, completed: 2840, pct: 59 },
  { path: 'Cloud Architect', enrolled: 3940, completed: 2980, pct: 76 },
  { path: 'Cybersecurity',   enrolled: 3120, completed: 2180, pct: 70 },
  { path: 'UX Design',       enrolled: 2840, completed: 2210, pct: 78 },
];
