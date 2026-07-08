// @ts-nocheck
'use client';

import { useRef, useEffect } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { useChat } from '@ai-sdk/react';
import { Send, Briefcase, User } from 'lucide-react';

export default function CareerCoachClient() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/career-coach',
    initialMessages: [{
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your AI Career Coach. Are you looking to improve your resume, prepare for an interview, or plan your next career move?'
    }]
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8 h-[calc(100vh-100px)] flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Briefcase size={20} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Career Coach</h1>
        </div>

        <div className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-purple-600/20 text-purple-400'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : '💼'}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed border ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white border-indigo-600 rounded-tr-none'
                      : 'bg-[var(--bg-surface-2)] text-[var(--text-primary)] border-[var(--border-color)] rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center text-xs">💼</div>
                  <div className="p-4 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] rounded-tl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-150" />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-2)]/50">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about interview tips, career paths, etc..."
                value={input ?? ''}
                onChange={handleInputChange}
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!(input ?? '').trim() || isLoading}
                className="px-6 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
