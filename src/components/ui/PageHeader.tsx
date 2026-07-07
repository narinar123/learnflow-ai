import React from 'react';
import Link from 'next/link';

interface Crumb { label: string; href?: string }

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  actions?: React.ReactNode;
  showBack?: boolean;
  backHref?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, breadcrumbs, actions, showBack, backHref = '/', className = '' }: PageHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-2">
          <ol className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>}
                {crumb.href && i < breadcrumbs.length - 1
                  ? <Link href={crumb.href} className="hover:text-primary transition-colors">{crumb.label}</Link>
                  : <span style={i === breadcrumbs.length - 1 ? { color: 'var(--foreground)', fontWeight: 500 } : {}}>{crumb.label}</span>
                }
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          {/* Back button */}
          {showBack && (
            <Link
              href={backHref}
              className="shrink-0 mt-0.5 btn-ghost p-1.5 rounded-lg"
              aria-label="Go back"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>
          )}
          <div className="min-w-0">
            <h1 className="font-display font-bold truncate" style={{ fontSize: '1.625rem', letterSpacing: '-0.02em', color: 'var(--foreground)' }}>
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>{subtitle}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
