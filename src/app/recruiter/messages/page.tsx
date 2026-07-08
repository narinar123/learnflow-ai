'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getMessageThreads, saveMessageThreads, MessageThread } from '@/lib/recruiterData';

export default function RecruiterMessagesInbox() {
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string>('');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const data = getMessageThreads();
    setThreads(data);
    if (data.length > 0) {
      setActiveThreadId(data[0].studentId);
      // Mark first thread as read
      const updated = data.map((t, i) => i === 0 ? { ...t, unread: false } : t);
      saveMessageThreads(updated);
      setThreads(updated);
    }
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThreadId, threads, isTyping]);

  const activeThread = threads.find(t => t.studentId === activeThreadId);

  const handleThreadSelect = (id: string) => {
    setActiveThreadId(id);
    const updated = threads.map(t => {
      if (t.studentId === id) {
        return { ...t, unread: false };
      }
      return t;
    });
    saveMessageThreads(updated);
    setThreads(updated);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThreadId) return;

    const newMsg = {
      id: `m_rec_${Date.now()}`,
      sender: 'recruiter' as const,
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedThreads = threads.map(t => {
      if (t.studentId === activeThreadId) {
        return {
          ...t,
          lastMessage: inputText.trim(),
          lastActive: new Date().toISOString(),
          messages: [...t.messages, newMsg],
        };
      }
      return t;
    });

    saveMessageThreads(updatedThreads);
    setThreads(updatedThreads);
    setInputText('');

    // Trigger Simulated Candidate Reply
    setIsTyping(true);
    setTimeout(() => {
      let replyText = 'Thanks for the message. I will review this and get back to you shortly.';
      if (activeThreadId === 's3') {
        replyText = 'Hi Jennifer! That is perfect. I have reviewed the calendar slot and it matches my availability. I will see you in the Meet room tomorrow.';
      } else if (activeThreadId === 's5') {
        replyText = 'Thank you for reaching out! I would love to walk you through my Figma components portfolio. Thursday afternoon works great for me.';
      }

      const replyMsg = {
        id: `m_cand_${Date.now()}`,
        sender: 'candidate' as const,
        text: replyText,
        timestamp: new Date().toISOString(),
      };

      const withReply = updatedThreads.map(t => {
        if (t.studentId === activeThreadId) {
          return {
            ...t,
            lastMessage: replyText,
            lastActive: new Date().toISOString(),
            messages: [...t.messages, replyMsg],
          };
        }
        return t;
      });

      saveMessageThreads(withReply);
      setThreads(withReply);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-[75vh] flex rounded-3xl border border-slate-800 bg-[#0F0B26] overflow-hidden animate-fade-in">
      {/* Left sidebar threads */}
      <div className="w-72 border-r border-slate-800 flex flex-col bg-slate-900/10">
        <div className="p-4 border-b border-slate-800/80">
          <h3 className="text-sm font-black text-white">Candidates Inbox</h3>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
          {threads.map(t => {
            const isActive = t.studentId === activeThreadId;
            return (
              <button
                key={t.studentId}
                onClick={() => handleThreadSelect(t.studentId)}
                className={`w-full p-3 rounded-2xl flex gap-3 text-left transition-colors items-start relative ${
                  isActive 
                    ? 'bg-indigo-600/10 text-white border border-indigo-500/20' 
                    : 'text-slate-400 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <img 
                  src={t.studentAvatar} 
                  alt={t.studentName} 
                  className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 mt-0.5 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-white truncate">{t.studentName}</span>
                    {t.unread && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-1 leading-snug">{t.lastMessage}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat screen */}
      <div className="flex-1 flex flex-col justify-between bg-slate-950/20">
        {activeThread ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-slate-800/80 flex items-center gap-3 bg-slate-900/10">
              <img 
                src={activeThread.studentAvatar} 
                alt={activeThread.studentName} 
                className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800"
              />
              <div>
                <span className="text-xs font-bold text-white block leading-none">{activeThread.studentName}</span>
                <span className="text-[9px] text-emerald-400 font-bold mt-1 inline-block">● Online</span>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
              {activeThread.messages.map(msg => {
                const isRec = msg.sender === 'recruiter';
                return (
                  <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isRec ? 'ml-auto flex-row-reverse' : ''}`}>
                    {!isRec && (
                      <img 
                        src={activeThread.studentAvatar} 
                        alt={activeThread.studentName} 
                        className="w-7 h-7 rounded-full border border-slate-700 bg-slate-800 mt-1 shrink-0"
                      />
                    )}
                    <div className="space-y-1">
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isRec 
                          ? 'bg-indigo-600 text-white rounded-tr-none' 
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className={`text-[8px] text-slate-500 block ${isRec ? 'text-right' : ''}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-3 max-w-[80%]">
                  <img 
                    src={activeThread.studentAvatar} 
                    alt={activeThread.studentName} 
                    className="w-7 h-7 rounded-full border border-slate-700 bg-slate-800 mt-1 shrink-0"
                  />
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 text-xs font-bold rounded-tl-none flex items-center gap-1">
                    <span>Typing</span>
                    <span className="animate-bounce font-black">.</span>
                    <span className="animate-bounce font-black [animation-delay:0.2s]">.</span>
                    <span className="animate-bounce font-black [animation-delay:0.4s]">.</span>
                  </div>
                </div>
              )}
              <div ref={messageEndRef} />
            </div>

            {/* Input field */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/20 flex gap-2">
              <input 
                type="text" 
                placeholder="Type your message to applicant..." 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all duration-150 active:scale-95 shadow-md shadow-indigo-600/10 flex items-center gap-1"
              >
                Send 🚀
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
            Select a conversation thread to view messages.
          </div>
        )}
      </div>
    </div>
  );
}
