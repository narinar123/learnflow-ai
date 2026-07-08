'use client';

import { useState, useEffect, useRef } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { 
  Send, Search, Users, ShieldAlert, Circle, User, 
  MessageSquare, Sparkles, Phone, Video, Info, Paperclip 
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  senderId: 'usr_demo' | string;
  senderName: string;
  senderAvatar: string;
  text: string;
  time: string;
}

interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  role: string;
  online: boolean;
  unreadCount: number;
  messages: Message[];
}

const DEFAULT_THREADS: ChatThread[] = [
  {
    id: 'th_001',
    name: 'Dr. Rajan Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
    role: 'Senior Python Instructor',
    online: true,
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'th_001', senderName: 'Dr. Rajan Mehta', senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face', text: 'Hello Priya, I reviewed your class implementation mockup. Excellent OOP design patterns.', time: 'Yesterday 14:10' },
      { id: 'm2', senderId: 'usr_demo', senderName: 'Priya Sharma', senderAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=face', text: 'Thank you! I was wondering if my method parameters should protected under custom getters.', time: 'Yesterday 14:15' },
      { id: 'm3', senderId: 'th_001', senderName: 'Dr. Rajan Mehta', senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face', text: 'Yes, using proper private variable prefixes in Python keeps objects encapsulated. Try importing properties.', time: 'Today 10:32' }
    ]
  },
  {
    id: 'th_002',
    name: 'Full Stack Peer Study Group',
    avatar: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=96&h=96&fit=crop',
    role: '12 Active Peers',
    online: true,
    unreadCount: 2,
    messages: [
      { id: 'm2_1', senderId: 'usr_a02', senderName: 'Sneha Reddy', senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face', text: 'Is anyone working on the Section 2 e-commerce API project?', time: 'Today 12:05' },
      { id: 'm2_2', senderId: 'usr_a05', senderName: 'Rahul Gupta', senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=48&h=48&fit=crop&crop=face', text: 'Yeah, I just finished routing controller structures. Stuck on handling razorpay webhook requests.', time: 'Today 12:12' }
    ]
  },
  {
    id: 'th_003',
    name: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612f7f3?w=96&h=96&fit=crop&crop=face',
    role: 'UI/UX Design Lead',
    online: false,
    unreadCount: 0,
    messages: [
      { id: 'm3_1', senderId: 'th_003', senderName: 'Priya Nair', senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612f7f3?w=96&h=96&fit=crop&crop=face', text: 'Your Figma layout variants look very polished. Try spacing items using 8px multipliers.', time: '2 days ago' }
    ]
  },
  {
    id: 'th_004',
    name: 'LearnFlow Help Desk',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop&crop=face',
    role: 'Support Desk Agent',
    online: true,
    unreadCount: 0,
    messages: [
      { id: 'm4_1', senderId: 'th_004', senderName: 'LearnFlow Help Desk', senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop&crop=face', text: 'Ticket LFAI-9817 has been updated: Your certificate verification verification link is verified.', time: '3 days ago' }
    ]
  }
];

export default function MessagesPage() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync state with localstorage
  useEffect(() => {
    const saved = localStorage.getItem('chat_threads');
    if (saved) {
      const parsed = JSON.parse(saved);
      setThreads(parsed);
      setActiveThread(parsed[0]);
    } else {
      setThreads(DEFAULT_THREADS);
      setActiveThread(DEFAULT_THREADS[0]);
      localStorage.setItem('chat_threads', JSON.stringify(DEFAULT_THREADS));
    }
  }, []);

  useEffect(() => {
    // Scroll chat window to bottom
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeThread?.messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeThread) return;

    const inputMsg = chatInput.trim();
    setChatInput('');

    const newMsg: Message = {
      id: `m_${Date.now()}`,
      senderId: 'usr_demo',
      senderName: 'Priya Sharma',
      senderAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=face',
      text: inputMsg,
      time: 'Just now'
    };

    const updatedMessages = [...activeThread.messages, newMsg];
    
    const updatedThreads = threads.map(t => {
      if (t.id === activeThread.id) {
        return { ...t, unreadCount: 0, messages: updatedMessages };
      }
      return t;
    });

    setThreads(updatedThreads);
    setActiveThread({ ...activeThread, messages: updatedMessages });
    localStorage.setItem('chat_threads', JSON.stringify(updatedThreads));

    // Simulate mock reply
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1400));
    setIsTyping(false);

    let replyText = `Thanks for writing back! I am currently away from my desk, but I'll check my notes and reply shortly.`;
    
    if (activeThread.id === 'th_001') {
      replyText = `That makes sense. Go ahead and write a helper script to validate class definitions. I will review it in our next live code review!`;
    } else if (activeThread.id === 'th_002') {
      replyText = `Agreed! Let's organize a group call today at 8 PM to fix index scaling.`;
    } else if (activeThread.id === 'th_004') {
      replyText = `LFAI Desk: Your ticket details have been updated. Is there anything else we can help you with?`;
    }

    const replyMsg: Message = {
      id: `m_${Date.now() + 1}`,
      senderId: activeThread.id,
      senderName: activeThread.name,
      senderAvatar: activeThread.avatar,
      text: replyText,
      time: 'Just now'
    };

    const threadWithReply = [...updatedMessages, replyMsg];
    const finalThreads = threads.map(t => {
      if (t.id === activeThread.id) {
        return { ...t, messages: threadWithReply };
      }
      return t;
    });

    setThreads(finalThreads);
    setActiveThread({ ...activeThread, messages: threadWithReply });
    localStorage.setItem('chat_threads', JSON.stringify(finalThreads));
  };

  const handleSelectThread = (thread: ChatThread) => {
    // Clear unread count on select
    const updatedThreads = threads.map(t => t.id === thread.id ? { ...t, unreadCount: 0 } : t);
    setThreads(updatedThreads);
    setActiveThread({ ...thread, unreadCount: 0 });
    localStorage.setItem('chat_threads', JSON.stringify(updatedThreads));
  };

  const filteredThreads = threads.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="animate-fade-in flex gap-6 max-w-6xl mx-auto h-[calc(100vh-var(--topbar-height)-5rem)]">
        
        {/* Sidebar Conversations Panel - left */}
        <div className="w-full md:w-80 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col overflow-hidden shrink-0">
          {/* Search Header */}
          <div className="p-4 border-b border-[var(--border-color)] space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Discussions</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="input-field pl-9 py-1.5 text-xs"
                style={{ minHeight: '36px' }}
              />
            </div>
          </div>

          {/* Conversations Thread list */}
          <div className="flex-1 overflow-y-auto scrollbar-thin divide-y divide-[var(--border-color)]/60">
            {filteredThreads.length === 0 ? (
              <div className="p-8 text-center text-xs text-[var(--text-secondary)]">No conversations found.</div>
            ) : (
              filteredThreads.map(t => {
                const isSelected = activeThread?.id === t.id;
                const lastMsg = t.messages[t.messages.length - 1];

                return (
                  <div
                    key={t.id}
                    onClick={() => handleSelectThread(t)}
                    className={`p-3.5 flex gap-3 cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-indigo-500/5 border-l-4 border-indigo-500' 
                        : 'hover:bg-muted/10'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        className="w-10 h-10 rounded-full object-cover border border-[var(--border-color)]"
                      />
                      {t.online && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[var(--bg-surface)]" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{t.name}</h4>
                        <span className="text-[8px] text-[var(--text-secondary)] shrink-0">
                          {lastMsg ? lastMsg.time.split(' ').pop() : ''}
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--text-secondary)] truncate">{t.role}</p>
                      {lastMsg && (
                        <p className={`text-[10px] truncate mt-1 ${t.unreadCount > 0 ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-secondary)]'}`}>
                          {lastMsg.senderId === 'usr_demo' ? 'You: ' : ''}{lastMsg.text}
                        </p>
                      )}
                    </div>

                    {t.unreadCount > 0 && (
                      <div className="shrink-0 flex items-center justify-center">
                        <span className="w-4 h-4 bg-rose-500 text-white rounded-full text-[8px] font-extrabold flex items-center justify-center">
                          {t.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Window Panel - right */}
        <div className="flex-1 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col overflow-hidden h-full">
          {activeThread ? (
            <>
              {/* Active Header */}
              <div className="px-5 py-3 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-surface-2)]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={activeThread.avatar} 
                      alt={activeThread.name} 
                      className="w-9 h-9 rounded-full object-cover border border-[var(--border-color)]"
                    />
                    {activeThread.online && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-[var(--bg-surface-2)]" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-bold text-[var(--text-primary)]">{activeThread.name}</h3>
                    <p className="text-[10px] text-[var(--text-secondary)]">{activeThread.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toast.info('Starting audio conference session...')}
                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/5 rounded-xl transition"
                    title="Audio call"
                  >
                    <Phone size={14} />
                  </button>
                  <button 
                    onClick={() => toast.info('Initializing video conference framework...')}
                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/5 rounded-xl transition"
                    title="Video Call"
                  >
                    <Video size={14} />
                  </button>
                </div>
              </div>

              {/* Message Feed Area */}
              <div className="flex-1 p-5 overflow-y-auto scrollbar-thin space-y-4 bg-slate-900/5">
                {activeThread.messages.map((msg) => {
                  const isMe = msg.senderId === 'usr_demo';
                  
                  return (
                    <div 
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                      <img 
                        src={msg.senderAvatar} 
                        alt={msg.senderName} 
                        className="w-7 h-7 rounded-full object-cover border border-[var(--border-color)] shrink-0 self-end"
                      />
                      
                      <div className="space-y-1">
                        <div 
                          className={`p-3 rounded-2xl text-xs leading-relaxed ${
                            isMe 
                              ? 'bg-indigo-500 text-white rounded-br-none' 
                              : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-bl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="block text-[8px] text-[var(--text-secondary)] font-medium text-right px-1">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
                
                {isTyping && (
                  <div className="flex gap-3 max-w-[80%]">
                    <img 
                      src={activeThread.avatar} 
                      alt="Typing avatar" 
                      className="w-7 h-7 rounded-full object-cover shrink-0 self-end"
                    />
                    <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl rounded-bl-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-surface-2)] flex gap-2">
                <button
                  type="button"
                  onClick={() => toast.info('Attaching mock assets...')}
                  className="p-2 text-slate-400 hover:text-indigo-400 rounded-xl"
                  title="Attach File"
                >
                  <Paperclip size={16} />
                </button>
                
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message or drop code block..."
                  className="input-field flex-1 text-xs py-2"
                  style={{ minHeight: '38px' }}
                />
                
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="btn btn-primary px-4 py-2 min-h-[38px] text-xs font-bold"
                >
                  <Send size={14} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[var(--text-secondary)] space-y-3">
              <MessageSquare size={48} className="text-slate-400" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Select a Conversation</h3>
              <p className="text-xs max-w-[250px] leading-relaxed">
                Click on any thread in the sidebar discussions grid to open an interactive chat channel.
              </p>
            </div>
          )}
        </div>

      </div>
    </AppLayout>
  );
}
