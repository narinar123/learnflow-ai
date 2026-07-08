'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { DataTable } from '@/components/institution/DataTable';
import { Users } from 'lucide-react';
import { mockStudents } from '@/lib/institution-data';

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Students Directory" 
        description="Manage enrolled students and view their records."
        icon={Users}
        action={
          <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400">
            Import Students
          </button>
        }
      />
      <DataTable 
        data={mockStudents}
        columns={[
          { key: 'enrollmentNo', header: 'Enrollment No' },
          { 
            key: 'name', 
            header: 'Student Info',
            render: (item) => (
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-xs text-gray-400">{item.email}</p>
              </div>
            )
          },
          { key: 'admissionDate', header: 'Joined' },
          { 
            key: 'cgpa', 
            header: 'CGPA',
            render: (item) => <span className="font-semibold text-indigo-400">{item.cgpa}</span>
          },
          { 
            key: 'attendancePercentage', 
            header: 'Attendance',
            render: (item) => `${item.attendancePercentage}%`
          },
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
