'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { DataTable } from '@/components/institution/DataTable';
import { Network } from 'lucide-react';
import { mockBranches } from '@/lib/institution-data';

export default function BranchesPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Branches / Campuses" 
        description="Manage multiple locations and campuses for the institution."
        icon={Network}
        action={
          <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400">
            Add Branch
          </button>
        }
      />
      <DataTable 
        data={mockBranches}
        columns={[
          { key: 'name', header: 'Branch Name' },
          { key: 'location', header: 'Location' },
          { key: 'head', header: 'Head / Director' },
          { key: 'totalStudents', header: 'Total Students' },
          { key: 'totalFaculty', header: 'Total Faculty' },
          { 
            key: 'status', 
            header: 'Status',
            render: (item) => (
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20' : 'bg-rose-500/10 text-rose-400 ring-rose-500/20'}`}>
                {item.status}
              </span>
            )
          },
        ]}
      />
    </div>
  );
}
