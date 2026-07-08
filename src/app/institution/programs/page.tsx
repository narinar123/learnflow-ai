'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { DataTable } from '@/components/institution/DataTable';
import { GraduationCap } from 'lucide-react';
import { mockPrograms } from '@/lib/institution-data';

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Programs" 
        description="Manage degrees, diplomas, and academic programs."
        icon={GraduationCap}
        action={
          <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400">
            Add Program
          </button>
        }
      />
      <DataTable 
        data={mockPrograms}
        columns={[
          { key: 'name', header: 'Program Name' },
          { key: 'level', header: 'Level' },
          { key: 'durationYears', header: 'Duration (Years)' },
          { key: 'totalCredits', header: 'Required Credits' },
          { 
            key: 'status', 
            header: 'Status',
            render: (item) => (
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20' : 'bg-gray-500/10 text-gray-400 ring-gray-500/20'}`}>
                {item.status}
              </span>
            )
          },
        ]}
      />
    </div>
  );
}
