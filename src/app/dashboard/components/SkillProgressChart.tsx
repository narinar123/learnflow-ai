'use client';

interface Skill {
  name: string;
  level: number; // 0-100
  xp: number;
  color: string;
  badge: string;
}

const skills: Skill[] = [
  { name: 'React & Next.js', level: 72, xp: 3240, color: 'var(--color-primary-500)', badge: '⚛️' },
  { name: 'Python & ML', level: 45, xp: 2010, color: 'var(--color-secondary-500)', badge: '🐍' },
  { name: 'UI/UX Design', level: 88, xp: 3960, color: 'var(--color-accent-emerald)', badge: '🎨' },
  { name: 'Data Analysis', level: 31, xp: 1400, color: 'var(--color-accent-amber)', badge: '📊' },
  { name: 'Node.js & API', level: 60, xp: 2700, color: 'var(--color-accent-blue)', badge: '🔧' },
];

const levelLabels = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
function getLevelLabel(level: number): string {
  if (level < 20) return levelLabels[0];
  if (level < 40) return levelLabels[1];
  if (level < 60) return levelLabels[2];
  if (level < 80) return levelLabels[3];
  return levelLabels[4];
}

/**
 * SkillProgressChart — Horizontal bar chart showing skill progression
 * by topic area, with XP values and level labels.
 */
export function SkillProgressChart() {
  return (
    <section className="card" aria-labelledby="skills-heading">
      <div className="flex items-center justify-between mb-5">
        <h2 id="skills-heading" className="section-title" style={{ marginBottom: 0 }}>
          Skill Progress
        </h2>
        <span className="badge badge-primary">5 skills tracked</span>
      </div>

      <div className="space-y-4" role="list" aria-label="Skill progress bars">
        {skills.map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </div>

      {/* Legend */}
      <div
        className="mt-5 pt-4 flex flex-wrap gap-3"
        style={{ borderTop: '1px solid var(--border-color)' }}
        aria-hidden="true"
      >
        {levelLabels.map((label, idx) => (
          <div key={label} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: `hsl(${220 + idx * 15}, 70%, ${40 + idx * 8}%)` }}
            />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {label} ({idx * 20}–{idx * 20 + 19}%)
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  const label = getLevelLabel(skill.level);
  return (
    <div
      role="listitem"
      aria-label={`${skill.name}: ${label} — ${skill.level}% mastered, ${skill.xp.toLocaleString()} XP`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" style={{ fontSize: '1rem' }}>{skill.badge}</span>
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {skill.name}
          </span>
          <span
            className="badge"
            style={{
              fontSize: '0.65rem',
              background: `${skill.color}22`,
              color: skill.color,
              border: `1px solid ${skill.color}44`,
            }}
          >
            {label}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {skill.xp.toLocaleString()} XP
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: skill.color, minWidth: '36px', textAlign: 'right' }}
            aria-hidden="true"
          >
            {skill.level}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-track" style={{ height: 8 }}>
        <div
          className="progress-fill"
          style={{
            width: `${skill.level}%`,
            background: skill.color,
            transition: 'width 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          role="progressbar"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} progress`}
        />
      </div>
    </div>
  );
}
