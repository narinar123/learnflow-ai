'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { DataTable } from '@/components/institution/DataTable';
import { BookOpen } from 'lucide-react';
import { mockCourses } from '@/lib/institution-data';

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Courses" 
        description="Manage institution courses and classes."
        icon={BookOpen}
        action={
          <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400">
            Add Course
          </button>
        }
      />
      <DataTable 
        data={mockCourses}
        columns={[
          { key: 'code', header: 'Code' },
          { key: 'title', header: 'Course Title' },
          { key: 'credits', header: 'Credits' },
          { key: 'currentEnrollment', header: 'Enrolled' },
          { key: 'maxCapacity', header: 'Capacity' },
          { 
            key: 'status', 
            header: 'Status',
            render: (item) => (
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20' : 'bg-amber-500/10 text-amber-400 ring-amber-500/20'}`}>
                {item.status}
              </span>
            )
          },
        ]}
      />
    </div>
  );
}
