import React from 'react';

export default function BuilderSidebar() {
  return (
    <div className="w-64 border-r border-slate-800 bg-[#0A0D16] min-h-screen p-4 flex flex-col gap-4">
      <h3 className="text-white font-bold text-sm tracking-wide uppercase">Course Builder</h3>
      
      <div className="space-y-1 mt-4">
        <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-800 text-slate-300">
          Module Settings
        </button>
        <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-800 text-slate-300">
          Curriculum
        </button>
        <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-slate-800 text-slate-300">
          Pricing
        </button>
      </div>

      <div className="mt-auto">
        <button className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold">
          Publish Course
        </button>
      </div>
    </div>
  );
}
