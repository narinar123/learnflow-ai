'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { UserPlus } from 'lucide-react';

export default function EnrollmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Enrollments" 
        description="Manage student enrollments in courses."
        icon={UserPlus}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6">
        <p className="text-gray-400">Course enrollment tools and lists will go here.</p>
      </div>
    </div>
  );
}
