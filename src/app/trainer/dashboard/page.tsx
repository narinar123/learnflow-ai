'use client';

import React from 'react';
import { trainerKPIs, mockTrainerCourses } from '@/lib/trainer-data';
import AdminStatCard from '@/components/admin/AdminStatCard';

export default function TrainerDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">Trainer Dashboard</h1>
        <p className="text-sm text-slate-400">Welcome back, Dr. Webb. Monitor course enrollment, ratings, and revenue payouts.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          title="Total Students"
          value={trainerKPIs.totalStudents.toLocaleString()}
          iconBg="rgba(16, 185, 129, 0.1)"
          accent="#10B981"
          icon={<span>👥</span>}
        />
        <AdminStatCard
          title="Average Rating"
          value={`⭐ ${trainerKPIs.averageRating}`}
          iconBg="rgba(245, 158, 11, 0.1)"
          accent="#F59E0B"
          icon={<span>⭐</span>}
        />
        <AdminStatCard
          title="Total Revenue"
          value={`$${trainerKPIs.totalRevenue.toLocaleString()}`}
          iconBg="rgba(108, 71, 255, 0.1)"
          accent="#6C47FF"
          icon={<span>💰</span>}
        />
        <AdminStatCard
          title="Next Payout"
          value={`$${trainerKPIs.payoutProgress}`}
          subtitle="Scheduled: July 31"
          iconBg="rgba(59, 130, 246, 0.1)"
          accent="#3B82F6"
          icon={<span>💳</span>}
        />
      </div>

      {/* Courses List */}
      <div className="rounded-2xl border p-5 flex flex-col gap-4 bg-slate-900/30" style={{ borderColor: 'rgba(16,185,129,0.15)' }}>
        <div>
          <h3 className="text-base font-bold text-white">Active Courses Overview</h3>
          <p className="text-xs text-slate-400 mt-0.5">Summary performance stats of your current curriculum</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockTrainerCourses.map((c) => (
            <div key={c.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-bold text-white text-sm">{c.title}</h4>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    c.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{c.category} · {c.lessonsCount} lessons</p>
              </div>

              <div className="flex justify-between text-xs text-slate-500 border-t border-slate-900 pt-3">
                <span>{c.studentsCount.toLocaleString()} Students</span>
                <span className="font-semibold text-emerald-400">${c.revenue.toLocaleString()} earned</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
