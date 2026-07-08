'use client';

import React from 'react';
import StudentLayout from '@/components/layouts/StudentLayout';
import { AnalyticsLayout } from '@/components/analytics/AnalyticsLayout';

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootAnalyticsLayout({ children }: LayoutProps) {
  return (
    <StudentLayout>
      <AnalyticsLayout>{children}</AnalyticsLayout>
    </StudentLayout>
  );
}
