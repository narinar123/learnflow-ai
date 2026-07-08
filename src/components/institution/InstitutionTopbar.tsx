'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useInstitution } from './InstitutionShell';
import { mockBranches } from '@/lib/institution-data';

interface InstitutionTopbarProps {
  onMobileMenuToggle: () => void;
}

const BREADCRUMB_MAP: Record<string, string> = {
  institution: 'Campus Admin',
  dashboard: 'Dashboard',
  members: 'Faculty & Students',
  pathways: 'Programs & Pathways',
};

export default function InstitutionTopbar({ onMobileMenuToggle }: InstitutionTopbarProps) {
  const pathname = usePathname();
  const { selectedBranch, setSelectedBranch } = useInstitution();
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((seg, idx) => ({
    label: BREADCRUMB_MAP[seg] || seg,
    href: '/' + segments.slice(0, idx + 1).join('/'),
    isLast: idx === segments.length - 1,
  }));

  return (
    <header className="h-16 flex items-center gap-4 px-6 border-b sticky top-0 z-30 bg-slate-950/85 backdrop-blur-md"
      style={{ borderColor: 'rgba(59,130,246,0.15)' }}
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
            <span className={`text-sm font-medium truncate ${crumb.isLast ? 'text-blue-400 font-semibold' : 'text-slate-400'}`}>
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Branch selector */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-400 hidden md:inline">Branch:</label>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-blue-500"
        >
          {mockBranches.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      {/* User profile details */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold text-white">Dr. Sarah Connor</p>
          <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 font-medium">
            Campus Executive
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
          SC
        </div>
      </div>
    </header>
  );
}
