'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { UserPlus } from 'lucide-react';

export default function AdmissionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Admissions" 
        description="Manage new applications and admission workflows."
        icon={UserPlus}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6 flex flex-col items-center justify-center min-h-[400px]">
        <UserPlus className="h-16 w-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">No Active Admission Drives</h3>
        <p className="text-gray-400 max-w-md text-center mb-6">
          Start a new admission drive to accept applications across all your branches and programs.
        </p>
        <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400">
          Create Drive
        </button>
      </div>
    </div>
  );
}
