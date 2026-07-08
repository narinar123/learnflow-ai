'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { CheckSquare } from 'lucide-react';

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Attendance" 
        description="Track and manage student and faculty attendance."
        icon={CheckSquare}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6">
        <p className="text-gray-400">Attendance tracking interface will go here.</p>
      </div>
    </div>
  );
}
