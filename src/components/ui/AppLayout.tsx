'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Sidebar from './Sidebar';
import { AppLogo } from './AppLogo';
import { demoUser } from '@/lib/data';

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * AppLayout — Main authenticated layout with sidebar (desktop) and
 * top navigation bar. Sidebar collapses to bottom nav on mobile.
 */
export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint is 1024px
      setIsMobile(mobile);
      if (!mobile) {
        setMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div
      className="flex min-h-screen animate-fade-in"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ─── Sidebar ─── */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onMobileClose={() => setMobileOpen(false)}
        currentPath={pathname}
        isMobile={isMobile}
      />

      {/* Backdrop overlay for mobile sidebar */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          role="presentation"
        />
      )}

      {/* ─── Main Content Area ─── */}
      <div
        className="flex-1 flex flex-col min-w-0 sidebar-transition"
        style={{
          paddingLeft: isMobile ? 0 : collapsed ? '64px' : '240px',
          transition: 'padding-left 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Top Bar (mobile + desktop header) */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 h-16 border-b"
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            borderColor: 'var(--border-color)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {/* Mobile menu trigger and logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground interactive"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
            <AppLogo size="sm" />
          </div>

          {/* Desktop: page breadcrumb placeholder */}
          <div className="hidden lg:block" />

          {/* Right side: notifications + avatar */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <Link
              href="/notifications"
              aria-label="Notifications"
              className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-white/[0.04] border border-[var(--border-color)] bg-[var(--bg-surface-2)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {/* Unread dot */}
              <span
                className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-rose-500"
                aria-label="New notifications"
              />
            </Link>

            {/* AI Query Count */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                color: 'var(--color-primary-400)',
              }}
              title="AI queries remaining today"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>{demoUser.aiQueriesRemaining}/50 AI</span>
            </div>

            {/* User Avatar */}
            <Link
              href="/profile"
              aria-label="Open user profile"
              className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border border-[var(--border-color)] flex-shrink-0"
            >
              <img 
                src={demoUser.avatar}
                alt={demoUser.name}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main
          id="main-content"
          className="flex-1 p-4 sm:p-6 lg:p-8"
          style={{ maxWidth: '1400px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
