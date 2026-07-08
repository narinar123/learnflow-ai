'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminStatCard from '@/components/admin/AdminStatCard';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { revenueChartData } from '@/lib/admin-data';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export default function RevenuePage() {
  return (
    <PermissionGuard permission="revenue:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Revenue Analytics"
          description="Monetization statistics, recurring plans breakdown, and sales conversion analytics."
          badge="Revenue"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AdminStatCard
            title="Total Revenue"
            value="$1,248,500"
            trend={14.8}
            trendLabel="vs last quarter"
            iconBg="rgba(16, 185, 129, 0.15)"
            accent="#10B981"
          />

          <AdminStatCard
            title="Monthly Recur (MRR)"
            value="$184,200"
            trend={8.2}
            trendLabel="vs last month"
            iconBg="rgba(108, 71, 255, 0.15)"
            accent="#6C47FF"
          />

          <AdminStatCard
            title="Avg. Ticket Size"
            value="$124.50"
            trend={3.1}
            trendLabel="vs last month"
            iconBg="rgba(245, 158, 11, 0.15)"
            accent="#F59E0B"
          />
        </div>

        {/* Big Chart Area */}
        <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(108,71,255,0.12)' }}>
          <div>
            <h3 className="text-base font-bold text-white">Income Channels Breakdown</h3>
            <p className="text-xs text-slate-400 mt-0.5">Historical breakdown comparing courses sales vs subscriptions</p>
          </div>
          <div className="h-96 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(148,163,184,0.5)" fontSize={12} tickLine={false} />
                <YAxis stroke="rgba(148,163,184,0.5)" fontSize={12} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip
                  contentStyle={{ background: '#161227', borderColor: 'rgba(108,71,255,0.2)', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" dataKey="revenue" stroke="#6C47FF" strokeWidth={2} fill="rgba(108, 71, 255, 0.1)" name="Total Revenue" />
                <Area type="monotone" dataKey="subscriptions" stroke="#00C9A7" strokeWidth={2} fill="rgba(0, 201, 167, 0.05)" name="Subscriptions" />
                <Area type="monotone" dataKey="courses" stroke="#F59E0B" strokeWidth={2} fill="rgba(245, 158, 11, 0.05)" name="Course Sales" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
}
