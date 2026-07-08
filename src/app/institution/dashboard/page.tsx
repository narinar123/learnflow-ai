'use client';

import React from 'react';
import { metrics, mockBranches, mockDepartments } from '@/lib/institution-data';
import AdminStatCard from '@/components/admin/AdminStatCard';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function InstitutionDashboard() {
  const branchColumns: Column<typeof mockBranches[0]>[] = [
    {
      key: 'name',
      header: 'Branch Campus',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold text-white">{String(val)}</p>
          <p className="text-xs text-slate-400">{row.location}</p>
        </div>
      ),
    },
    {
      key: 'head',
      header: 'Campus Head',
      sortable: true,
    },
    {
      key: 'totalStudents',
      header: 'Students',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{Number(val).toLocaleString()}</span>,
    },
    {
      key: 'totalFaculty',
      header: 'Faculty',
      sortable: true,
      render: (val) => <span className="font-mono text-slate-300">{Number(val).toLocaleString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => {
        const status = String(val);
        const color = status === 'Active' ? 'bg-positive/10 text-positive' : 'bg-slate-800 text-slate-500';
        return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${color}`}>{status}</span>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-white">Campus Executive Dashboard</h1>
          <p className="text-sm text-slate-400">Stanford University Workspace. Overview of academic programs, branches capacity, and departmental budgets.</p>
        </div>
        <button
          onClick={() => alert('Generating academic performance report...')}
          className="btn-primary"
        >
          Export Report
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          title="Active Students"
          value={metrics.activeStudents.toLocaleString()}
          trend={metrics.studentGrowth}
          trendLabel="vs last year"
          iconBg="rgba(59, 130, 246, 0.1)"
          accent="#3B82F6"
          icon={<span>🎓</span>}
        />
        <AdminStatCard
          title="Campus Uptime Attendance"
          value={`${metrics.averageAttendance}%`}
          subtitle="Weekly average"
          iconBg="rgba(16, 185, 129, 0.1)"
          accent="#10B981"
          icon={<span>📊</span>}
        />
        <AdminStatCard
          title="Total Budget Allocation"
          value={`$${(metrics.totalRevenue/1000000).toFixed(1)}M`}
          trend={metrics.revenueGrowth}
          trendLabel="vs last quarter"
          iconBg="rgba(108, 71, 255, 0.1)"
          accent="#6C47FF"
          icon={<span>💰</span>}
        />
        <AdminStatCard
          title="Active Courses"
          value={metrics.coursesActive}
          iconBg="rgba(245, 158, 11, 0.1)"
          accent="#F59E0B"
          icon={<span>📚</span>}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Budgets Bar Chart */}
        <div className="lg:col-span-2 rounded-2xl border p-5 flex flex-col gap-4 bg-slate-900/30" style={{ borderColor: 'rgba(59,130,246,0.15)' }}>
          <div>
            <h3 className="text-base font-bold text-white">Department Budgets</h3>
            <p className="text-xs text-slate-400 mt-0.5">Budget allocations ($) across major departments</p>
          </div>
          <div className="h-64 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockDepartments}>
                <XAxis dataKey="name" stroke="rgba(148,163,184,0.5)" fontSize={11} tickLine={false} />
                <YAxis stroke="rgba(148,163,184,0.5)" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', borderColor: 'rgba(59,130,246,0.2)', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Bar dataKey="budget" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Allocated Budget" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Departments Summary list */}
        <div className="rounded-2xl border p-5 flex flex-col gap-4 bg-slate-900/30" style={{ borderColor: 'rgba(59,130,246,0.15)' }}>
          <div>
            <h3 className="text-base font-bold text-white">Departments Directory</h3>
            <p className="text-xs text-slate-400 mt-0.5">Summary overview of courses per department</p>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            {mockDepartments.map((dept) => (
              <div key={dept.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-800 bg-slate-950/40">
                <div>
                  <p className="text-xs font-semibold text-white">{dept.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Head: {dept.headOfDepartment}</p>
                </div>
                <span className="text-xs font-semibold text-blue-400">{dept.coursesCount} courses</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Branches Table */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold text-white">University Campus Branches</h3>
        <AdminDataTable
          data={mockBranches}
          columns={branchColumns}
          keyField="id"
          searchPlaceholder="Search branch campus..."
          searchKeys={['name', 'location', 'head']}
        />
      </div>
    </div>
  );
}
