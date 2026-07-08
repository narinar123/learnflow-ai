'use client';

import React, { useState } from 'react';
import { mockTrainerStudents, TrainerStudent } from '@/lib/trainer-data';
import AdminDataTable, { Column } from '@/components/admin/AdminDataTable';

// Try loading helper mock data
let studentsData = mockTrainerStudents;
try {
  const modData = require('@/lib/trainer-data');
  studentsData = modData.mockTrainerStudents;
} catch (e) {}

export default function TrainerStudentsPage() {
  const [students, setStudents] = useState<TrainerStudent[]>(studentsData);
  const [selectedStudent, setSelectedStudent] = useState<TrainerStudent | null>(null);
  const [gradeInput, setGradeInput] = useState('');

  const handleGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !gradeInput) return;

    setStudents(prev =>
      prev.map(s =>
        s.id === selectedStudent.id
          ? { ...s, grade: gradeInput, assignmentStatus: 'graded' }
          : s
      )
    );
    alert(`Successfully graded ${selectedStudent.name} assignment with: ${gradeInput}`);
    setSelectedStudent(null);
    setGradeInput('');
  };

  const columns: Column<TrainerStudent>[] = [
    {
      key: 'name',
      header: 'Student',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 shrink-0" />
          <div>
            <p className="font-semibold text-white">{row.name}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'courseTitle',
      header: 'Enrolled Course',
      sortable: true,
    },
    {
      key: 'progress',
      header: 'Progress',
      sortable: true,
      render: (val) => (
        <div className="flex items-center gap-2 w-28">
          <span className="text-xs text-slate-300 font-mono">{String(val)}%</span>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${val}%` }} />
          </div>
        </div>
      ),
    },
    {
      key: 'assignmentStatus',
      header: 'Assignment',
      sortable: true,
      render: (val, row) => {
        const status = String(val);
        if (status === 'none') return <span className="text-slate-500">—</span>;
        const color = status === 'graded' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        return (
          <div className="flex flex-col gap-0.5">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold text-center border ${color}`}>
              {status === 'graded' ? `Graded: ${row.grade}` : 'Pending Review'}
            </span>
            {row.assignmentFile && (
              <span className="text-[9px] text-slate-400 font-mono truncate max-w-[120px]">{row.assignmentFile}</span>
            )}
          </div>
        );
      },
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      sortable: true,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">Students & Grading</h1>
        <p className="text-sm text-slate-400">Review student completion progress, grade pending project files and notebook submissions.</p>
      </div>

      <AdminDataTable
        data={students}
        columns={columns}
        keyField="id"
        searchPlaceholder="Search student by name or email..."
        searchKeys={['name', 'email', 'courseTitle']}
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            {row.assignmentStatus === 'pending' && (
              <button
                onClick={() => { setSelectedStudent(row); setGradeInput(''); }}
                className="btn-ghost px-2.5 py-1 rounded text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 text-xs hover:bg-emerald-500/10 font-semibold"
              >
                Grade
              </button>
            )}
          </div>
        )}
      />

      {/* Grading dialog */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <form onSubmit={handleGrade} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full flex flex-col gap-4 shadow-2xl">
            <div>
              <h3 className="font-bold text-white text-base">Grade Assignment</h3>
              <p className="text-xs text-slate-400 mt-1">Reviewing submission from {selectedStudent.name} in {selectedStudent.courseTitle}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Submitted File</span>
              <span className="text-xs text-emerald-400 font-mono truncate">{selectedStudent.assignmentFile}</span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-400">Grade Score (e.g. A+, B, 95/100)</label>
              <input
                type="text"
                placeholder="Enter score grade"
                value={gradeInput}
                onChange={e => setGradeInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="flex gap-2 justify-end mt-2">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="btn-outline py-2 px-4 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary py-2 px-4 text-xs bg-emerald-500 hover:bg-emerald-600 border-none"
              >
                Submit Grade
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
