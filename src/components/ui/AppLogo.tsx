import Image from 'next/image';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light' | 'dark';
  showWordmark?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: '1rem' },
  md: { icon: 36, text: '1.25rem' },
  lg: { icon: 48, text: '1.5rem' },
};

/**
 * AppLogo — LearnFlow AI brand logo with icon + wordmark.
 * Renders an SVG icon with gradient and the app name.
 */
export function AppLogo({
  size = 'md',
  variant = 'default',
  showWordmark = true,
  className = '',
}: AppLogoProps) {
  const { icon, text } = sizes[size];
  const textColor = variant === 'light' ? '#fff' : 'var(--text-primary)';
  const subTextColor = variant === 'light' ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)';

  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="LearnFlow AI — Home"
    >
      {/* Icon Mark */}
      <div
        className="relative flex-shrink-0"
        style={{ width: icon, height: icon }}
        aria-hidden="true"
      >
        <AppIcon size={icon} />
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="leading-none">
          <div
            className="font-display font-bold leading-none"
            style={{ fontSize: text, color: textColor, letterSpacing: '-0.02em' }}
          >
            LearnFlow{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-primary-400), var(--color-secondary-400))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AI
            </span>
          </div>
          {size === 'lg' && (
            <div
              className="font-body"
              style={{ fontSize: '0.65rem', color: subTextColor, marginTop: '2px', letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              Learn · Grow · Achieve
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * AppIcon — Standalone icon mark (SVG gradient).
 */
export function AppIcon({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="logo-spark" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <rect width="48" height="48" rx="14" fill="url(#logo-gradient)" />

      {/* Book/flow shape */}
      <path
        d="M12 34V16C12 14.9 12.9 14 14 14H26C27.1 14 28 14.9 28 16V34L20 30L12 34Z"
        fill="url(#logo-spark)"
        opacity="0.9"
      />

      {/* AI spark lines */}
      <path
        d="M30 18L33 15M30 24H36M30 30L33 33"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Lines inside book */}
      <line x1="16" y1="20" x2="24" y2="20" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="16" y1="24" x2="24" y2="24" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="16" y1="28" x2="21" y2="28" stroke="url(#logo-gradient)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
