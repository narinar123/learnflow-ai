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
 * AppLogo — GUIDESOFT IT SOLUTIONS brand logo with downloaded gsgroups-logo.png.
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
      aria-label="GUIDESOFT IT SOLUTIONS — Home"
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
 * AppIcon — Standalone icon mark displaying downloaded gsgroups-logo.png.
 */
export function AppIcon({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/assets/images/app_logo.png"
      alt="GUIDESOFT IT SOLUTIONS Logo"
      width={size}
      height={size}
      className={`object-contain rounded-lg ${className}`}
    />
  );
}
