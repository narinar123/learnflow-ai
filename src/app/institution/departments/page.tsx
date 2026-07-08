'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { DataTable } from '@/components/institution/DataTable';
import { Users } from 'lucide-react';
import { mockDepartments } from '@/lib/institution-data';

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Departments" 
        description="Manage academic and administrative departments."
        icon={Users}
        action={
          <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400">
            Add Department
          </button>
        }
      />
      <DataTable 
        data={mockDepartments}
        columns={[
          { key: 'name', header: 'Department Name' },
          { key: 'headOfDepartment', header: 'HOD' },
          { key: 'coursesCount', header: 'Total Courses' },
          { 
            key: 'budget', 
            header: 'Budget Allocation',
            render: (item) => `$${item.budget.toLocaleString()}`
          },
        ]}
      />
    </div>
  );
}
