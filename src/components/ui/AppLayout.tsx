'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { AppLogo } from './AppLogo';

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * AppLayout — Main authenticated layout with sidebar (desktop) and
 * top navigation bar. Sidebar collapses to bottom nav on mobile.
 */
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div
      className="flex min-h-screen"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ─── Desktop Sidebar ─── */}
      <Sidebar />

      {/* ─── Main Content Area ─── */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-60">
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
          {/* Mobile logo */}
          <div className="lg:hidden">
            <AppLogo size="sm" />
          </div>

          {/* Desktop: page breadcrumb placeholder */}
          <div className="hidden lg:block" />

          {/* Right side: notifications + avatar */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              type="button"
              aria-label="Notifications"
              className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors interactive"
              style={{ background: 'var(--bg-surface-2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {/* Unread dot */}
              <span
                className="absolute top-2 right-2.5 w-2 h-2 rounded-full"
                style={{ background: 'var(--color-accent-rose)' }}
                aria-label="3 unread notifications"
              />
            </button>

            {/* AI Query Count */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
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
              38/50 AI
            </div>

            {/* User Avatar */}
            <button
              type="button"
              aria-label="Open user menu"
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 interactive"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
                color: '#fff',
              }}
            >
              PS
            </button>
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
