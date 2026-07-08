'use client';

import React from 'react';
import { AnalyticsSidebar } from './AnalyticsSidebar';

interface AnalyticsLayoutProps {
  children: React.ReactNode;
}

export function AnalyticsLayout({ children }: AnalyticsLayoutProps) {
  return (
    <div className="flex-1 flex overflow-hidden bg-background h-full">
      {/* Analytics Sub-navigation sidebar */}
      <AnalyticsSidebar />

      {/* Analytics Main Workspace view */}
      <main className="flex-1 flex flex-col overflow-y-auto scrollbar-thin">
        {children}
      </main>
    </div>
  );
}
