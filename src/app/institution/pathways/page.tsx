'use client';

import React from 'react';
import { mockPrograms, mockCourses } from '@/lib/institution-data';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';

export default function PathwaysPage() {
  const programColumns: Column<typeof mockPrograms[0]>[] = [
    {
      key: 'name',
      header: 'Program Title',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white">{String(val)}</p>
          <p className="text-xs text-slate-400 mt-0.5">{row.level} · {row.durationYears} Years</p>
        </div>
      ),
    },
    {
      key: 'totalCredits',
      header: 'Total Credits',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{String(val)} credits</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'Active' ? 'bg-positive/10 text-positive border-positive/20' : 'bg-slate-800 text-slate-500 border-slate-700';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color} border`}>{status}</span>;
      },
    },
  ];

  const courseColumns: Column<typeof mockCourses[0]>[] = [
    {
      key: 'code',
      header: 'Course Code',
      sortable: true,
      render: (val) => <span className="font-mono text-xs text-slate-400 font-bold">{String(val)}</span>,
    },
    {
      key: 'title',
      header: 'Course Name',
      sortable: true,
    },
    {
      key: 'credits',
      header: 'Credits',
      sortable: true,
    },
    {
      key: 'currentEnrollment',
      header: 'Current Enrollment',
      sortable: true,
      render: (_, row) => (
        <span className="font-mono text-slate-300">
          {row.currentEnrollment} / {row.maxCapacity} Seats
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'Active' ? 'bg-positive/10 text-positive border-positive/20' : 'bg-slate-800 text-slate-500 border-slate-700';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color} border`}>{status}</span>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-white">Programs & Academic Pathways</h1>
          <p className="text-sm text-slate-400">Configure degree structures, select courses modules capacities, and outline credits targets.</p>
        </div>
        <button
          onClick={() => alert('Creating program course track...')}
          className="btn-primary"
        >
          Add Program
        </button>
      </div>

      {/* Programs List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold text-white">Offered Degree Programs</h3>
        <AdminDataTable
          data={mockPrograms}
          columns={programColumns}
          keyField="id"
          searchPlaceholder="Search programs..."
          searchKeys={['name', 'level']}
        />
      </div>

      {/* Courses list */}
      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-base font-bold text-white">Active Classroom Courses</h3>
        <AdminDataTable
          data={mockCourses}
          columns={courseColumns}
          keyField="id"
          searchPlaceholder="Search courses..."
          searchKeys={['code', 'title']}
        />
      </div>
    </div>
  );
}
