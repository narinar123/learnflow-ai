'use client';

import { useState } from 'react';
import { User, Bell, Shield, Eye, HelpCircle } from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { demoUser } from '@/lib/data';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [name, setName] = useState(demoUser.name);
  const [email, setEmail] = useState(demoUser.email);
  const [notifications, setNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    demoUser.name = name;
    demoUser.email = email;
    toast.success('Settings updated successfully!');
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-2xl mx-auto">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Account Settings
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Manage your public profile, email notifications, privacy configurations, and credentials.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Profile Section */}
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
            <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5 border-b border-[var(--border-color)] pb-3 mb-4">
              <User size={16} className="text-indigo-400" />
              <span>Public Profile</span>
            </h2>

            <div className="space-y-3">
              <div>
                <label className="label-text">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label-text">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
            <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5 border-b border-[var(--border-color)] pb-3 mb-4">
              <Bell size={16} className="text-indigo-400" />
              <span>Notifications Preferences</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">Push Notifications</h4>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Receive streak alerts and leaderboard updates.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications} 
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-[var(--bg-surface-2)] border-[var(--border-color)]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">Marketing Emails</h4>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Receive newsletter tips and course launches.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={marketingEmails} 
                  onChange={(e) => setMarketingEmails(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-[var(--bg-surface-2)] border-[var(--border-color)]"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => { setName(demoUser.name); setEmail(demoUser.email); }}
              className="btn btn-outline text-xs px-5 py-2.5"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary text-xs px-5 py-2.5"
            >
              Save Changes
            </button>
          </div>

        </form>

      </div>
    </AppLayout>
  );
}
