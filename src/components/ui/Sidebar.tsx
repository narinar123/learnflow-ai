'use client';

import React from 'react';
import Link from 'next/link';
import { AppLogo } from './AppLogo';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number | string;
  badgeType?: 'primary' | 'danger' | 'warning' | 'success';
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onMobileClose: () => void;
  currentPath: string;
  isMobile: boolean;
}

const navGroups: NavGroup[] = [
  {
    id: 'main',
    label: 'Learning',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
        ),
      },
      {
        id: 'my-courses',
        label: 'My Courses',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        ),
        badge: 4,
        badgeType: 'primary',
      },
      {
        id: 'learning-paths',
        label: 'Learning Paths',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
        ),
      },
      {
        id: 'assignments',
        label: 'Assignments',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        ),
        badge: 2,
        badgeType: 'danger',
      },
      {
        id: 'quiz',
        label: 'Quizzes',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
          </svg>
        ),
      },
      {
        id: 'live-class',
        label: 'Live Classes',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" /><rect width="15" height="14" x="1" y="5" rx="2" ry="2" />
          </svg>
        ),
        badge: 'Live',
        badgeType: 'danger',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI Tools',
    items: [
      {
        id: 'ai-tutor',
        label: 'AI Tutor',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
          </svg>
        ),
        badge: 'New',
        badgeType: 'success',
      },
      {
        id: 'career-coach',
        label: 'Career Coach',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
          </svg>
        ),
      },
      {
        id: 'skill-gap',
        label: 'Skill Gap Analysis',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        ),
      },
      {
        id: 'mock-interview',
        label: 'Mock Interview',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'progress',
    label: 'Progress',
    items: [
      {
        id: 'analytics',
        label: 'My Analytics',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        ),
      },
      {
        id: 'certificates',
        label: 'Certificates',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
          </svg>
        ),
        badge: 3,
        badgeType: 'warning',
      },
      {
        id: 'leaderboard',
        label: 'Leaderboard',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    items: [
      {
        id: 'membership',
        label: 'Membership',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ),
      },
      {
        id: 'messages',
        label: 'Messages',
        href: '/student-dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ),
        badge: 5,
        badgeType: 'primary',
      },
    ],
  },
];

const badgeColorMap = {
  primary: 'bg-primary/10 text-primary',
  danger: 'bg-danger/10 text-danger',
  warning: 'bg-warning/10 text-warning',
  success: 'bg-positive/10 text-accent-foreground',
};

export default function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onMobileClose,
  currentPath,
  isMobile,
}: SidebarProps) {
  const isVisible = isMobile ? mobileOpen : true;
  const showLabels = isMobile ? true : !collapsed;

  const sidebarWidth = isMobile ? 280 : collapsed ? 64 : 240;

  return (
    <aside
      className="fixed top-0 left-0 h-full bg-card border-r border-border z-50 flex flex-col sidebar-transition overflow-hidden"
      style={{
        width: sidebarWidth,
        transform: isMobile && !mobileOpen ? 'translateX(-100%)' : 'translateX(0)',
      }}
      aria-label="Main navigation"
    >
      {/* Logo area */}
      <div className={`flex items-center h-16 border-b border-border shrink-0 ${collapsed && !isMobile ? 'justify-center px-3' : 'px-4 gap-3'}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <AppLogo size="md" />
          {showLabels && (
            <span className="font-bold text-lg text-foreground tracking-tight truncate">
              EduAI
            </span>
          )}
        </div>
        {isMobile && (
          <button
            onClick={onMobileClose}
            className="btn-ghost p-1.5 ml-auto shrink-0"
            aria-label="Close navigation"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        )}
        {!isMobile && showLabels && (
          <button
            onClick={onToggleCollapse}
            className="btn-ghost p-1.5 ml-auto shrink-0"
            aria-label="Collapse sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {navGroups.map((group) => (
          <div key={`group-${group.id}`} className="mb-4">
            {showLabels && (
              <p className="px-3 mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                {group.label}
              </p>
            )}
            {!showLabels && <div className="mx-3 mb-2 border-t border-border" />}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = currentPath === item.href && item.id === 'dashboard';
                return (
                  <li key={`nav-${item.id}`}>
                    <Link
                      href={item.href}
                      className={isActive ? 'nav-item-active' : 'nav-item'}
                      title={!showLabels ? item.label : undefined}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      {showLabels && (
                        <>
                          <span className="truncate flex-1">{item.label}</span>
                          {item.badge !== undefined && (
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-semibold ${badgeColorMap[item.badgeType || 'primary']}`}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {!showLabels && item.badge !== undefined && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom: collapse toggle (desktop) + profile */}
      {!isMobile && collapsed && (
        <div className="p-2 border-t border-border">
          <button
            onClick={onToggleCollapse}
            className="w-full btn-ghost p-2 flex justify-center"
            aria-label="Expand sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {showLabels && (
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-muted transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
              M
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">Marcus Chen</p>
              <p className="text-xs text-muted-foreground truncate">Pro Plan · Level 12</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0">
              <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
            </svg>
          </div>
        </div>
      )}
    </aside>
  );
}