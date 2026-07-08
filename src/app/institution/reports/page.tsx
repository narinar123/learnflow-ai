'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Reports" 
        description="Generate, schedule, and export custom compliance reports."
        icon={FileText}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6">
        <p className="text-gray-400">Report generator and export history will go here.</p>
      </div>
    </div>
  );
}
