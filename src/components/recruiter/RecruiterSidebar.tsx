'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

function Icon({ d }: { d: string | string[] }) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/recruiter/dashboard',
    icon: <Icon d={['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10']} />,
  },
  {
    id: 'jobs',
    label: 'Job Openings',
    href: '/recruiter/jobs',
    icon: <Icon d={['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z']} />,
  },
  {
    id: 'candidates',
    label: 'Candidate Search',
    href: '/recruiter/candidates',
    icon: <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  },
];

interface RecruiterSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onMobileClose: () => void;
}

export default function RecruiterSidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onMobileClose,
}: RecruiterSidebarProps) {
  const pathname = usePathname();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const showLabels = mobileOpen ? true : !collapsed;
  const sidebarWidth = collapsed && !mobileOpen ? 64 : 256;

  return (
    <aside
      className="fixed top-0 left-0 h-full z-50 flex flex-col sidebar-transition overflow-hidden"
      style={{
        width: sidebarWidth,
        background: 'linear-gradient(180deg, #1e1b4b 0%, #311042 100%)', // Indigo/Purple dark theme for Recruiter
        borderRight: '1px solid rgba(99,102,241,0.15)',
        transform: mobileOpen ? 'translateX(0)' : (isMobile ? 'translateX(-100%)' : 'translateX(0)'),
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center h-16 shrink-0 border-b"
        style={{ borderColor: 'rgba(99,102,241,0.15)', padding: showLabels ? '0 16px' : '0 12px', justifyContent: showLabels ? 'space-between' : 'center' }}
      >
        {showLabels ? (
          <Link href="/recruiter/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">GUIDESOFT IT SOLUTIONS</p>
              <p className="text-[10px] text-indigo-300 font-medium tracking-wider uppercase">Recruit Portal</p>
            </div>
          </Link>
        ) : (
          <Link href="/recruiter/dashboard">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </Link>
        )}
        {showLabels && (
          <button
            onClick={mobileOpen ? onMobileClose : onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <li key={item.id} className="list-none">
              <Link
                href={item.href}
                title={!showLabels ? item.label : undefined}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative group"
                style={{
                  background: isActive ? 'rgba(99,102,241,0.2)' : 'transparent',
                  color: isActive ? '#818cf8' : 'rgba(224,231,255,0.8)',
                  borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
                }}
              >
                <span className="shrink-0">{item.icon}</span>
                {showLabels && <span className="truncate flex-1">{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </nav>

      {/* Profile */}
      {showLabels && (
        <div className="p-3 border-t" style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 text-white font-bold text-xs">
              JP
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">Jennifer Park</p>
              <p className="text-[10px] text-indigo-400 font-medium truncate">Google Talent Partner</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
