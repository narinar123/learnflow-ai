'use client';
import React from 'react';

export default function AILearningEcosystem() {
  const recommendations = [
    { title: 'System Design Interview Prep', reason: 'You scored 90% in Data Structures', difficulty: 'Advanced', time: '4h 30m' },
    { title: 'Docker for Beginners', reason: 'You recently completed Node.js Backend', difficulty: 'Intermediate', time: '2h 15m' },
    { title: 'GraphQL Fundamentals', reason: 'Trending among your peers', difficulty: 'Intermediate', time: '3h 45m' },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            AI Learning Ecosystem
          </h1>
          <p className="text-slate-400 mt-1">Your hyper-personalized learning path, powered by GuideSoft AI.</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(108,71,255,0.4)]">
          ✨ Generate Custom Study Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core feature 1: AI Tutor Chat */}
        <div className="lg:col-span-2 bg-[#0A0D16] border border-slate-800 rounded-2xl p-6 flex flex-col min-h-[400px]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-6 bg-purple-500 rounded-full inline-block"></span>
            AI Tutor Chat
          </h2>
          <div className="flex-1 bg-slate-900/50 rounded-xl p-4 border border-slate-800/50 overflow-y-auto space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs shadow-lg shadow-indigo-600/20">AI</div>
              <div className="bg-[#151926] border border-slate-800 rounded-2xl rounded-tl-none p-3 max-w-[85%] text-sm text-slate-300">
                Hi there! I noticed you struggled slightly with Binary Search Trees yesterday. Want me to generate a 10-minute visual practice session to reinforce the concepts?
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">Me</div>
              <div className="bg-indigo-600 rounded-2xl rounded-tr-none p-3 max-w-[85%] text-sm text-white shadow-lg shadow-indigo-600/10">
                Yes, that would be great. But can we relate it to database indexing?
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs shadow-lg shadow-indigo-600/20">AI</div>
              <div className="bg-[#151926] border border-slate-800 rounded-2xl rounded-tl-none p-3 max-w-[85%] text-sm text-slate-300">
                Absolutely! Database indexes, like B-Trees, are basically highly optimized versions of Binary Search Trees. Here is an interactive snippet showing how a query traverses an index tree...
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <input type="text" placeholder="Ask your AI tutor anything..." className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all" />
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl font-bold transition-colors">Send</button>
          </div>
        </div>

        {/* Dynamic Curriculum */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0A0D16] to-[#111625] border border-slate-800 p-6 rounded-2xl">
            <h3 className="font-bold text-white mb-4">Recommended Next Steps</h3>
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition-colors cursor-pointer">
                  <h4 className="text-sm font-bold text-slate-200">{rec.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-1">{rec.reason}</p>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-800">
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-medium">{rec.difficulty}</span>
                    <span className="text-[10px] text-slate-400">⏱️ {rec.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0A0D16] border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-white mb-2">Smart Coding Lab</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Jump into your cloud IDE. The AI has pre-configured a sandbox with the Next.js and Tailwind setup you were practicing yesterday.
              </p>
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 rounded-lg text-sm font-bold transition-colors">
                Launch Environment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
