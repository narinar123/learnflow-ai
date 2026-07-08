'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminStatCard from '@/components/admin/AdminStatCard';
import PermissionGuard from '@/components/admin/PermissionGuard';
import {
  dashboardStats,
  revenueChartData,
  userGrowthData,
  topCoursesData,
  mockAuditLogs,
} from '@/lib/admin-data';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export default function DashboardPage() {
  const recentActivities = mockAuditLogs.slice(0, 5);

  return (
    <PermissionGuard permission="dashboard:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Admin Dashboard"
          description="Real-time operations, core metrics, analytics, and platform status."
          badge="Enterprise"
          actions={
            <button
              onClick={() => alert('Exporting dashboard data...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export Report
            </button>
          }
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminStatCard
            title="Total Users"
            value={dashboardStats.totalUsers.toLocaleString()}
            trend={dashboardStats.totalUsersGrowth}
            trendLabel="vs last month"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            iconBg="rgba(108, 71, 255, 0.15)"
            accent="#6C47FF"
          />

          <AdminStatCard
            title="Active Students"
            value={dashboardStats.activeStudents.toLocaleString()}
            trend={dashboardStats.activeStudentsGrowth}
            trendLabel="vs last month"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12.5V16a6 6 0 0 0 12 0v-3.5" />
              </svg>
            }
            iconBg="rgba(0, 201, 167, 0.15)"
            accent="#00C9A7"
          />

          <AdminStatCard
            title="Monthly Revenue"
            value={`$${dashboardStats.monthlyRevenue.toLocaleString()}`}
            trend={dashboardStats.monthlyRevenueGrowth}
            trendLabel="vs last month"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
            iconBg="rgba(16, 185, 129, 0.15)"
            accent="#10B981"
          />

          <AdminStatCard
            title="Total Courses"
            value={dashboardStats.totalCourses}
            trend={dashboardStats.totalCoursesGrowth}
            trendLabel="vs last month"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            }
            iconBg="rgba(245, 158, 11, 0.15)"
            accent="#F59E0B"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(108,71,255,0.12)' }}>
            <div>
              <h3 className="text-base font-bold text-white">Revenue Performance</h3>
              <p className="text-xs text-slate-400 mt-0.5">Overview of course sales and membership subscriptions</p>
            </div>
            <div className="h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6C47FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6C47FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="rgba(148,163,184,0.5)" fontSize={12} tickLine={false} />
                  <YAxis stroke="rgba(148,163,184,0.5)" fontSize={12} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip
                    contentStyle={{ background: '#161227', borderColor: 'rgba(108,71,255,0.2)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                    itemStyle={{ color: '#a78bfa' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6C47FF" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="Total Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(108,71,255,0.12)' }}>
            <div>
              <h3 className="text-base font-bold text-white">Acquisition Growth</h3>
              <p className="text-xs text-slate-400 mt-0.5">Distribution of student registrations and active institutions</p>
            </div>
            <div className="h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <XAxis dataKey="month" stroke="rgba(148,163,184,0.5)" fontSize={12} tickLine={false} />
                  <YAxis stroke="rgba(148,163,184,0.5)" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#161227', borderColor: 'rgba(108,71,255,0.2)', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar dataKey="students" fill="#00C9A7" radius={[4, 4, 0, 0]} name="Students" />
                  <Bar dataKey="trainers" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Trainers" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Lower Grid: Top Courses & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Courses */}
          <div className="lg:col-span-2 rounded-2xl border p-5 flex flex-col gap-4" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(108,71,255,0.12)' }}>
            <div>
              <h3 className="text-base font-bold text-white">Top Performing Courses</h3>
              <p className="text-xs text-slate-400 mt-0.5">Courses generating the highest registration volume and revenue</p>
            </div>
            <div className="flex flex-col gap-3.5 mt-2">
              {topCoursesData.map((course) => (
                <div key={course.id} className="flex items-center justify-between gap-4 p-3 rounded-xl border border-slate-800 bg-white/[0.01]">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">{course.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{course.category} · By {course.trainer}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-positive">${course.revenue.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{course.students.toLocaleString()} students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Activity Feed */}
          <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(108,71,255,0.12)' }}>
            <div>
              <h3 className="text-base font-bold text-white">System Logs</h3>
              <p className="text-xs text-slate-400 mt-0.5">Recent system actions and audit operations</p>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <span className="text-base mt-0.5">
                    {act.severity === 'critical' ? '🔴' : act.severity === 'warning' ? '🟡' : '🟢'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white leading-relaxed">
                      {act.actor} performed <span className="text-purple-400">{act.action}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{act.details}</p>
                    <p className="text-[9px] text-slate-500 mt-1">{new Date(act.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
}
