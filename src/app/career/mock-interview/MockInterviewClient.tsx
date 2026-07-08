// @ts-nocheck
'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { useChat } from '@ai-sdk/react';
import { Mic, Send, StopCircle, Video, Play, RefreshCw, MessageSquare } from 'lucide-react';

export default function MockInterviewPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/ai/mock-interview',
    body: { jobTitle },
  });

  const startInterview = () => {
    if (!jobTitle.trim()) return;
    setIsStarted(true);
    setMessages([{ id: 'start', role: 'assistant', content: `Welcome to your mock interview for the ${jobTitle} position. I will be your interviewer. Let's start with the first question: Could you tell me a little bit about yourself and your background?` }]);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-100px)] flex flex-col">
        {!isStarted ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] p-8">
            <Video size={48} className="text-indigo-400 mb-6" />
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Mock Interview Simulator</h1>
            <p className="text-[var(--text-secondary)] mb-8 text-center max-w-md">Practice your interviewing skills with our AI hiring manager. Get real-time feedback on your answers.</p>
            
            <div className="w-full max-w-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Frontend Developer"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                onClick={startInterview}
                disabled={!jobTitle.trim()}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold disabled:opacity-50"
              >
                Start Interview
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
            <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-surface-2)]/30">
              <div className="font-semibold text-[var(--text-primary)]">Interview: {jobTitle}</div>
              <div className="flex items-center gap-2 text-sm text-red-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Recording
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-2)]/50">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your answer here..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-6 bg-indigo-600 text-white rounded-xl disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
