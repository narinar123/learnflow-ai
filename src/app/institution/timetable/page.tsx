'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { Calendar } from 'lucide-react';

export default function TimetablePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Timetable & Scheduling" 
        description="Manage classes, exams, and event schedules."
        icon={Calendar}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6 flex flex-col items-center justify-center min-h-[400px]">
        <Calendar className="h-16 w-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">Schedule empty</h3>
        <p className="text-gray-400 max-w-md text-center">
          Configure semesters, working days, and automatically generate timetables.
        </p>
      </div>
    </div>
  );
}
