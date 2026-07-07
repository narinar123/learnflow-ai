import React from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: AvatarSize;
  online?: boolean;
  className?: string;
}

const sizeMap: Record<AvatarSize, { dim: number; text: string; dot: number; dotOffset: string }> = {
  xs: { dim: 24, text: 'text-xs',  dot: 6,  dotOffset: '-bottom-0.5 -right-0.5' },
  sm: { dim: 32, text: 'text-xs',  dot: 8,  dotOffset: '-bottom-0.5 -right-0.5' },
  md: { dim: 40, text: 'text-sm',  dot: 10, dotOffset: 'bottom-0 right-0' },
  lg: { dim: 48, text: 'text-base',dot: 12, dotOffset: 'bottom-0 right-0' },
  xl: { dim: 64, text: 'text-lg',  dot: 14, dotOffset: 'bottom-1 right-1' },
};

function getInitials(name?: string) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
}

function stringToColor(str: string) {
  const colors = [
    '#6C47FF','#00C9A7','#F59E0B','#EF4444','#3B82F6',
    '#8B5CF6','#EC4899','#10B981','#F97316','#06B6D4',
  ];
  let hash = 0;
  for (const c of str) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ src, name = '', size = 'md', online, className = '' }: AvatarProps) {
  const s = sizeMap[size];
  const initials = getInitials(name);
  const bg = stringToColor(name || '?');

  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden ${className}`}
      style={{ width: s.dim, height: s.dim }}
      aria-label={name || 'Avatar'}
      role="img"
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span
          className={`flex items-center justify-center w-full h-full font-bold uppercase ${s.text}`}
          style={{ background: bg, color: '#fff' }}
          aria-hidden="true"
        >
          {initials}
        </span>
      )}
      {online !== undefined && (
        <span
          className={`absolute ${s.dotOffset} rounded-full border-2`}
          style={{
            width: s.dot,
            height: s.dot,
            background: online ? '#00C9A7' : '#94A3B8',
            borderColor: 'var(--card)',
          }}
          aria-label={online ? 'Online' : 'Offline'}
        />
      )}
    </span>
  );
}

interface AvatarGroupProps {
  avatars: Array<{ src?: string | null; name?: string }>;
  max?: number;
  size?: AvatarSize;
}

export function AvatarGroup({ avatars, max = 4, size = 'sm' }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  const s = sizeMap[size];

  return (
    <div className="flex items-center" style={{ gap: -(s.dim / 3) }}>
      {visible.map((a, i) => (
        <span key={i} style={{ '--tw-ring-color': 'var(--card)' } as React.CSSProperties}>
          <Avatar
            src={a.src}
            name={a.name}
            size={size}
            className="ring-2"
          />
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={`inline-flex items-center justify-center rounded-full font-bold ring-2 ${s.text}`}
          style={{ width: s.dim, height: s.dim, background: 'var(--muted)', color: 'var(--muted-foreground)', ['--tw-ring-color' as string]: 'var(--card)' }}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
