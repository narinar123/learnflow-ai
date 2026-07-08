'use client';

import React, { useState } from 'react';
import { mockStudents, mockFaculty, Student, Faculty } from '@/lib/institution-data';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';

export default function MembersManager() {
  const [activeTab, setActiveTab] = useState<'students' | 'faculty'>('students');

  const studentColumns: Column<Student>[] = [
    {
      key: 'name',
      header: 'Student',
      sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-semibold text-white">{row.name}</p>
          <p className="text-xs text-slate-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'enrollmentNo',
      header: 'Enrollment No',
      sortable: true,
      render: (val) => <span className="font-mono text-xs text-slate-400">{String(val)}</span>,
    },
    {
      key: 'cgpa',
      header: 'CGPA Grade',
      sortable: true,
      render: (val) => <span className="font-semibold text-blue-400">📊 {Number(val).toFixed(2)}</span>,
    },
    {
      key: 'attendancePercentage',
      header: 'Attendance',
      sortable: true,
      render: (val) => <span className="font-semibold text-slate-300">{String(val)}%</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'Active' ? 'bg-positive/10 text-positive' : status === 'Graduated' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-danger/10 text-danger';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
    {
      key: 'admissionDate',
      header: 'Admission Date',
      sortable: true,
    },
  ];

  const facultyColumns: Column<Faculty>[] = [
    {
      key: 'name',
      header: 'Faculty Member',
      sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-semibold text-white">{row.name}</p>
          <p className="text-xs text-slate-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'employeeId',
      header: 'Employee ID',
      sortable: true,
      render: (val) => <span className="font-mono text-xs text-slate-400">{String(val)}</span>,
    },
    {
      key: 'designation',
      header: 'Designation',
      sortable: true,
    },
    {
      key: 'joinDate',
      header: 'Join Date',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'Active' ? 'bg-positive/10 text-positive' : 'bg-warning/10 text-warning';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-white">Campus Directories</h1>
          <p className="text-sm text-slate-400">Audit academic lists for student cohorts and faculty credentials across all branches.</p>
        </div>
        <button
          onClick={() => alert(`Inviting new user to Stanford academy...`)}
          className="btn-primary"
        >
          Add Member
        </button>
      </div>

      {/* Tabs selector */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab('students')}
          className="px-5 py-3 text-sm font-semibold transition-colors focus:outline-none"
          style={{
            borderBottom: activeTab === 'students' ? '2px solid #3B82F6' : '2px solid transparent',
            color: activeTab === 'students' ? '#60a5fa' : 'rgba(148,163,184,0.7)',
          }}
        >
          Students ({mockStudents.length})
        </button>
        <button
          onClick={() => setActiveTab('faculty')}
          className="px-5 py-3 text-sm font-semibold transition-colors focus:outline-none"
          style={{
            borderBottom: activeTab === 'faculty' ? '2px solid #3B82F6' : '2px solid transparent',
            color: activeTab === 'faculty' ? '#60a5fa' : 'rgba(148,163,184,0.7)',
          }}
        >
          Faculty ({mockFaculty.length})
        </button>
      </div>

      {/* Table grid */}
      {activeTab === 'students' ? (
        <AdminDataTable
          data={mockStudents}
          columns={studentColumns}
          keyField="id"
          searchPlaceholder="Search students by enrollment or email..."
          searchKeys={['name', 'email', 'enrollmentNo']}
        />
      ) : (
        <AdminDataTable
          data={mockFaculty}
          columns={facultyColumns}
          keyField="id"
          searchPlaceholder="Search faculty members..."
          searchKeys={['name', 'email', 'employeeId', 'designation']}
        />
      )}
    </div>
  );
}
