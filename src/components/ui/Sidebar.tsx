'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppLogo } from './AppLogo';
import { demoUser } from '@/lib/data';

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
        href: '/dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
        ),
      },
      {
        id: 'my-courses',
        label: 'Courses',
        href: '/courses',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          </svg>
        ),
        badge: 8,
        badgeType: 'primary',
      },
      {
        id: 'course-builder',
        label: 'Course Builder',
        href: '/courses/manage',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        ),
        badge: 'New',
        badgeType: 'primary',
      },
    ],
  },
  {
    id: 'practice',
    label: 'Practice Lab',
    items: [
      {
        id: 'coding-lab',
        label: 'Coding Lab',
        href: '/coding-lab',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
          </svg>
        ),
        badge: 'New',
        badgeType: 'warning',
      },
      {
        id: 'assignments',
        label: 'Assignments',
        href: '/assignments',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        ),
      },
      {
        id: 'quiz',
        label: 'Quizzes & Exams',
        href: '/quiz',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
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
        href: '/ai-assistant',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
          </svg>
        ),
        badge: 'Live',
        badgeType: 'success',
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
        href: '/progress',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        ),
      },
      {
        id: 'enterprise-analytics',
        label: 'Enterprise Analytics',
        href: '/analytics/executive',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
          </svg>
        ),
      },
      {
        id: 'enterprise-finance',
        label: 'Enterprise Finance',
        href: '/finance/dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        ),
      },
      {
        id: 'planner',
        label: 'Study Planner',
        href: '/planner',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        ),
      },
      {
        id: 'leaderboard',
        label: 'Leaderboard',
        href: '/leaderboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        ),
      },
      {
        id: 'achievements',
        label: 'Achievements',
        href: '/achievements',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'communication',
    label: 'Community',
    items: [
      {
        id: 'messages',
        label: 'Messages',
        href: '/messages',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        ),
        badge: 3,
        badgeType: 'danger',
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
        href: '/membership',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ),
      },
      {
        id: 'wallet',
        label: 'Wallet & Billing',
        href: '/wallet',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><path d="M16 14h2" />
          </svg>
        ),
      },
      {
        id: 'settings',
        label: 'Settings',
        href: '/settings',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        ),
      },
      {
        id: 'support',
        label: 'Support Tickets',
        href: '/support',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ),
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
  const pathname = usePathname();

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
        <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
          <AppLogo size="md" showWordmark={showLabels} />
        </Link>
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
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
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
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-semibold ${badgeColorMap[item.badgeType || 'primary']}`}>
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

      {/* Bottom Profile card */}
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
          <Link href="/profile" className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-muted transition-colors cursor-pointer">
            <img 
              src={demoUser.avatar}
              alt={demoUser.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-border"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground truncate">{demoUser.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{demoUser.plan} Plan · Level {demoUser.level}</p>
            </div>
          </Link>
        </div>
      )}
    </aside>
  );
}