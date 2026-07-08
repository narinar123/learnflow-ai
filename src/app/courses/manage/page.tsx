'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/ui/AppLayout';
import { managedCourses, type ManagedCourse } from '@/lib/course-data';

export default function CourseManagementDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<ManagedCourse[]>(managedCourses);
  const [search, setSearch] = useState('');

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: '📚', color: 'text-primary' },
    { label: 'Published', value: courses.filter(c => c.status === 'published').length, icon: '🌐', color: 'text-positive' },
    { label: 'Pending Review', value: courses.filter(c => c.status === 'review').length, icon: '⏳', color: 'text-warning' },
    { label: 'Total Enrolled', value: courses.reduce((acc, c) => acc + c.studentsEnrolled, 0), icon: '👥', color: 'text-info' },
  ];

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.instructorName.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors: Record<ManagedCourse['status'], string> = {
    draft: 'bg-muted text-muted-foreground',
    review: 'bg-warning/10 text-warning border-warning/20',
    published: 'bg-positive/10 text-positive border-positive/20',
    archived: 'bg-danger/10 text-danger border-danger/20',
  };

  const deleteCourse = (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const duplicateCourse = (course: ManagedCourse) => {
    const duplicated: ManagedCourse = {
      ...course,
      id: `mc_${Math.random().toString(36).slice(2, 9)}`,
      title: `${course.title} (Copy)`,
      slug: `${course.slug}-copy`,
      status: 'draft',
      studentsEnrolled: 0,
      completionRate: 0,
      rating: 0,
      reviewsCount: 0,
      revenue: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setCourses([...courses, duplicated]);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Course Management</h1>
            <p className="text-sm text-muted-foreground">Admin panel to create, publish, and moderate university course ecosystems.</p>
          </div>
          <Link href="/courses/builder/new" className="btn-primary text-sm py-2 px-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Course
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="card-base p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted/60 flex items-center justify-center text-2xl shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="stat-label">{s.label}</p>
                <p className="stat-value text-2xl mt-0.5">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Actions bar */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border">
          <div className="relative w-72">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="input-field pl-8 py-1.5 text-xs"
            />
          </div>
          <span className="text-xs text-muted-foreground">Total: {filteredCourses.length} courses</span>
        </div>

        {/* Data Table */}
        <div className="card-base overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border/80 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="p-4">Course Details</th>
                <th className="p-4">Instructor</th>
                <th className="p-4">Students Enrolled</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-muted/20 transition-colors text-sm">
                  <td className="p-4">
                    <div className="flex gap-3">
                      <img src={c.thumbnail} alt={c.title} className="w-16 h-10 object-cover rounded-lg border border-border shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">{c.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{c.level} · {c.tags.join(', ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium text-foreground">{c.instructorName}</td>
                  <td className="p-4 text-xs text-muted-foreground font-mono-data tabular-nums">
                    {c.studentsEnrolled.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right shrink-0">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => router.push(`/courses/builder/${c.id}`)} className="btn-ghost text-xs py-1 px-2.5">Edit</button>
                      <button onClick={() => duplicateCourse(c)} className="btn-ghost text-xs py-1 px-2.5">Duplicate</button>
                      <button onClick={() => deleteCourse(c.id)} className="btn-ghost text-xs py-1 px-2.5 hover:text-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
