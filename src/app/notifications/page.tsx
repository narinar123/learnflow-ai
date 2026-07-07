'use client';

import { useState } from 'react';
import { Bell, Award, Flame, Zap, CheckCircle, Mail, MessageSquare, Info } from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { toast } from 'sonner';

interface AlertNotification {
  id: string;
  type: 'badge' | 'streak' | 'course' | 'info' | 'system';
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<AlertNotification[]>([
    { id: '1', type: 'badge', title: 'New Badge Unlocked!', desc: 'You earned the "Week Warrior" badge for maintaining a 7-day learning streak.', time: '2 hours ago', read: false },
    { id: '2', type: 'streak', title: 'Streak Safe 🔥', desc: 'You logged in today! Keep learning to maintain your streak.', time: '3 hours ago', read: false },
    { id: '3', type: 'course', title: 'Course Completed! 🎓', desc: 'Congratulations on completing "Professional English Communication". Your blockchain credential is ready.', time: '1 day ago', read: true },
    { id: '4', type: 'info', title: 'New Course Launch', desc: 'AWS Cloud & DevOps Engineering is now available in your Pro catalog.', time: '2 days ago', read: true },
  ]);

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
    toast.success('All notifications marked as read.');
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'badge':
        return <Award className="text-purple-400" size={16} />;
      case 'streak':
        return <Flame className="text-amber-500 fill-amber-500/25" size={16} />;
      case 'course':
        return <CheckCircle className="text-emerald-400" size={16} />;
      default:
        return <Info className="text-indigo-400" size={16} />;
    }
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-2">
            <Bell size={24} className="text-indigo-400" />
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Notifications</h1>
          </div>
          <button 
            onClick={markAllRead}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Mark all as read
          </button>
        </div>

        {/* List of alerts */}
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-2xl border flex items-start gap-4 transition-all ${
                alert.read 
                  ? 'border-[var(--border-color)] bg-[var(--bg-surface)] opacity-70' 
                  : 'border-indigo-500/30 bg-indigo-500/5'
              }`}
            >
              {/* Icon widget */}
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface-2)] flex items-center justify-center border border-[var(--border-color)] flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>

              {/* Text context */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">{alert.title}</h4>
                  <span className="text-[10px] text-[var(--text-secondary)]">{alert.time}</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AppLayout>
  );
}
