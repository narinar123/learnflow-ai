'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Advanced Analytics" 
        description="Deep dive into academic and operational performance."
        icon={BarChart3}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6 flex flex-col items-center justify-center min-h-[400px]">
        <BarChart3 className="h-16 w-16 text-indigo-500 mb-4 opacity-50" />
        <h3 className="text-xl font-medium text-white mb-2">Connect Data Sources</h3>
        <p className="text-gray-400 max-w-md text-center">
          Comprehensive charts and predictions will be generated once enough historical data is gathered.
        </p>
      </div>
    </div>
  );
}
