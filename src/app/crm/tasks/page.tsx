'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';

export default function TasksPage() {
  const { tasks, toggleTask, addTask } = useCRM();
  
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('Pending');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [relatedTo, setRelatedTo] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter === 'All' || task.status === filter;
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addTask({
      title,
      description,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      priority,
      relatedTo: relatedTo || 'General CRM Operations',
      assignedTo: 'Super Admin'
    });
    setAddModalOpen(false);
    // Reset Form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
    setRelatedTo('');
  };

  const totalCompleted = tasks.filter(t => t.status === 'Completed').length;
  const totalPending = tasks.filter(t => t.status === 'Pending').length;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white font-display">Tasks Dashboard</h1>
          <p className="text-slate-400 text-xs mt-1">
            Manage day-to-day client actions, proposal timelines, and lead follow-up queues.
          </p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-indigo-600/10"
        >
          📝 Add Task
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Tasks</p>
          <h4 className="text-xl font-black text-white mt-1">{tasks.length}</h4>
        </div>
        <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Completed</p>
          <h4 className="text-xl font-black text-emerald-400 mt-1">{totalCompleted}</h4>
        </div>
        <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Pending</p>
          <h4 className="text-xl font-black text-amber-400 mt-1">{totalPending}</h4>
        </div>
        <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Completion Rate</p>
          <h4 className="text-xl font-black text-indigo-400 mt-1">
            {tasks.length > 0 ? Math.round((totalCompleted / tasks.length) * 100) : 0}%
          </h4>
        </div>
      </div>

      {/* Filters row */}
      <div className="bg-[#0A0D16] border border-slate-800/60 p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-between">
        
        {/* Status Toggle Tabs */}
        <div className="flex bg-[#111625] p-1 border border-slate-800 rounded-xl">
          {(['Pending', 'Completed', 'All'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all
                ${filter === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#111625] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl bg-[#0A0D16] border transition-all flex items-start justify-between gap-4
                ${task.status === 'Completed' ? 'border-slate-850/60 opacity-60' : 'border-slate-800 hover:border-slate-700/80'}`}
            >
              <div className="flex items-start gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={task.status === 'Completed'}
                  onChange={() => toggleTask(task.id)}
                  className="mt-1 w-4.5 h-4.5 rounded border-slate-800 bg-slate-900 text-indigo-650 focus:ring-indigo-500 focus:ring-offset-slate-950"
                />
                <div>
                  <h4 className={`text-xs font-bold text-slate-200 ${task.status === 'Completed' ? 'line-through text-slate-500' : ''}`}>
                    {task.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {task.description || 'No description provided.'}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
                    <span>📅 Due: {task.dueDate}</span>
                    <span>·</span>
                    <span>🔗 Ref: <span className="font-semibold text-indigo-400">{task.relatedTo}</span></span>
                  </div>
                </div>
              </div>

              {/* Priority badge */}
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider
                ${task.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/25' : 
                  task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25' : 
                  'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                {task.priority}
              </span>
            </div>
          ))
        ) : (
          <div className="py-12 bg-[#0A0D16] border border-slate-800/60 rounded-2xl text-center text-slate-500 text-xs">
            No tasks found in current list.
          </div>
        )}
      </div>

      {/* ─── ADD TASK DIALOG ─── */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">📝 Create Follow-up Task</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <form onSubmit={handleAddTask} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Task Description *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., Call Rohan Sharma to review proposal"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Action Details</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="E.g., Rohan needs 20 additional seats on computer science..."
                  rows={3}
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Related Lead/Company</label>
                <input
                  type="text"
                  value={relatedTo}
                  onChange={(e) => setRelatedTo(e.target.value)}
                  placeholder="E.g., Tata Consultancy Services"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-855 text-slate-400 hover:text-white rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
