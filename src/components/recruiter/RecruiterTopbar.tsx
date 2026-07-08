'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface RecruiterTopbarProps {
  onMobileMenuToggle: () => void;
}

const BREADCRUMB_MAP: Record<string, string> = {
  recruiter: 'Recruiter Hub',
  dashboard: 'Dashboard',
  jobs: 'Job Openings',
  candidates: 'Candidate Search',
};

export default function RecruiterTopbar({ onMobileMenuToggle }: RecruiterTopbarProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((seg, idx) => ({
    label: BREADCRUMB_MAP[seg] || seg,
    href: '/' + segments.slice(0, idx + 1).join('/'),
    isLast: idx === segments.length - 1,
  }));

  return (
    <header className="h-16 flex items-center gap-4 px-6 border-b sticky top-0 z-30 bg-slate-950/85 backdrop-blur-md"
      style={{ borderColor: 'rgba(99,102,241,0.15)' }}
    >
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <nav className="flex items-center gap-1.5 flex-1 min-w-0">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={crumb.href}>
            {i > 0 && <span className="text-slate-600 text-xs">/</span>}
            <span className={`text-sm font-medium truncate ${crumb.isLast ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}>
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Right User Area */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold text-white">Jennifer Park</p>
          <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20 font-medium">
            Google
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
          JP
        </div>
      </div>
    </header>
  );
}
