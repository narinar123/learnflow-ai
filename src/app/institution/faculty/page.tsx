'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { DataTable } from '@/components/institution/DataTable';
import { Users } from 'lucide-react';
import { mockFaculty } from '@/lib/institution-data';

export default function FacultyPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Faculty Directory" 
        description="Manage teaching staff and professors."
        icon={Users}
        action={
          <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400">
            Add Faculty
          </button>
        }
      />
      <DataTable 
        data={mockFaculty}
        columns={[
          { key: 'employeeId', header: 'Emp ID' },
          { 
            key: 'name', 
            header: 'Faculty Info',
            render: (item) => (
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-xs text-gray-400">{item.email}</p>
              </div>
            )
          },
          { key: 'designation', header: 'Designation' },
          { key: 'joinDate', header: 'Joined' },
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
