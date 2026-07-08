// @ts-nocheck
'use client';
export const dynamic = 'force-dynamic';

import { useRef, useEffect } from 'react';
import { Send, Sparkles, Plus, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { demoUser } from '@/lib/data';
import { toast } from 'sonner';
import { useChat } from '@ai-sdk/react';

const SUGGESTED_PROMPTS = [
  { text: 'Explain recursion with a real-world analogy', category: 'Coding' },
  { text: 'Explain auto layout constraints in Figma', category: 'UI/UX' },
  { text: 'Give me 3 practice quiz questions on React Hooks', category: 'Practice' },
  { text: 'Create a study plan for financial literacy', category: 'Study' },
];

export default function AITutorPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/ai/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hello Priya! I am your GUIDESOFT IT SOLUTIONS Tutor. 🤖\n\nI can help you understand complex concepts, write code snippets, test your knowledge with quizzes, or create personalized study schedules. What would you like to learn today?`,
      }
    ],
    onError: (err) => {
      toast.error('Error connecting to AI Tutor.');
      console.error(err);
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hello Priya! I am your GUIDESOFT IT SOLUTIONS Tutor. 🤖\n\nI can help you understand complex concepts, write code snippets, test your knowledge with quizzes, or create personalized study schedules. What would you like to learn today?`,
      }
    ]);
  };

  return (
    <AppLayout>
      <div className="animate-fade-in flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)] overflow-hidden">
        
        {/* Left Side: Sidebar with prompts and stats */}
        <div className="w-full lg:w-80 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between flex-shrink-0">
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">AI Assistant</h1>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Your personal RAG-grounded tutor, active 24/7.
              </p>
            </div>

            {/* Daily Limits card */}
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-400">
                <span className="flex items-center gap-1.5">
                  <Zap size={14} className="fill-indigo-400" />
                  <span>Pro Plan Active</span>
                </span>
                <span>Unlimited</span>
              </div>
              <div className="progress-track" style={{ height: 4 }}>
                <div className="progress-fill primary" style={{ width: '100%' }} />
              </div>
              <p className="text-[10px] text-[var(--text-secondary)]">
                You have unlimited questions. Start chatting to clear your doubts!
              </p>
            </div>

            {/* Quick-start prompts */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider px-1">
                Suggested Prompts
              </h3>
              <div className="space-y-2">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p.text}
                    onClick={() => handleInputChange({ target: { value: p.text } } as any)}
                    className="w-full text-left p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface-2)]/60 text-xs font-semibold text-[var(--text-primary)] hover:border-indigo-500 hover:bg-[var(--bg-surface-2)] transition-all flex items-start justify-between group"
                  >
                    <span className="max-w-[85%]">{p.text}</span>
                    <ArrowRight size={14} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={handleResetChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all"
          >
            <RefreshCw size={14} />
            <span>Reset Conversation</span>
          </button>
        </div>

        {/* Right Side: Chat Window */}
        <div className="flex-1 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-[var(--border-color)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Sparkles size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[var(--text-primary)]">Personal AI Tutor</h2>
                <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Chat Messages scroll area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-purple-600/20 text-purple-400 border border-purple-500/25'
                  }`}>
                    {msg.role === 'user' ? 'PS' : '🤖'}
                  </div>

                  {/* Message bubble */}
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
            
            {/* Thinking state */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/25 flex items-center justify-center font-bold text-xs">
                    🤖
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] rounded-tl-none flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat input box */}
          <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-2)]/40">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask your AI tutor anything..."
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!(input || "").trim() || isLoading}
                className="btn btn-primary px-5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
