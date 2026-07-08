'use client';

import React from 'react';
import StudentLayout from '@/components/layouts/StudentLayout';
import { FinanceSidebar } from '@/components/finance/FinanceSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootFinanceLayout({ children }: LayoutProps) {
  return (
    <StudentLayout>
      <div className="flex-1 flex overflow-hidden bg-background h-full">
        {/* Submodule sidebar */}
        <FinanceSidebar />
        
        {/* Main finance workspace */}
        <main className="flex-1 flex flex-col overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </StudentLayout>
  );
}
