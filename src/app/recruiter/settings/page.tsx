'use client';

import React, { useState } from 'react';

export default function RecruiterSettingsPanel() {
  const [name, setName] = useState('Jennifer Park');
  const [email, setEmail] = useState('jpark@google.com');
  const [title, setTitle] = useState('Lead Technical Recruiter');
  const [slackWebhook, setSlackWebhook] = useState('');

  const [notifNewApp, setNotifNewApp] = useState(true);
  const [notifIntConfirm, setNotifIntConfirm] = useState(true);
  const [notifOfferReply, setNotifOfferReply] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings successfully updated!');
  };

  const handleGenToken = () => {
    alert('Generated new corporate API token: lf_rec_token_0x98124871249b291a');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Portal Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Configure recruiter accounts, manage Slack webhook integrations, and toggle email notification rules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forms (Left Column Spans 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal settings */}
          <form onSubmit={handleSave} className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Account Profile</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Recruiter Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Corporate Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Job Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                type="submit" 
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all duration-150 active:scale-95 shadow-md shadow-indigo-600/10"
              >
                Save Settings
              </button>
            </div>
          </form>

          {/* Webhook Integrations */}
          <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
            <h3 className="text-base font-bold text-white">Integrations & Webhooks</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Push new candidate profiles and pipeline stage changes directly to your corporate Slack channels.
            </p>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Slack Webhook URL</label>
                <input 
                  type="url" 
                  value={slackWebhook} 
                  onChange={e => setSlackWebhook(e.target.value)} 
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert('Test notification sent to Slack webhook!')} 
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold rounded-xl text-slate-300"
                >
                  Test Connection
                </button>
                <button 
                  onClick={() => alert('Webhook URL updated!')} 
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-xl text-white ml-auto"
                >
                  Save Webhook
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Configurations Sidebar (Right Column Spans 1) */}
        <div className="space-y-6">
          {/* Notification toggles */}
          <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Notification Rules</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="space-y-0.5">
                  <span className="text-slate-200 block">New Applicants</span>
                  <span className="text-[9px] text-slate-500 block">Email on new resume match</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifNewApp} 
                  onChange={e => setNotifNewApp(e.target.checked)} 
                  className="w-4 h-4 text-indigo-600 bg-slate-950 border-slate-800 rounded focus:ring-indigo-500 focus:ring-offset-0"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="space-y-0.5">
                  <span className="text-slate-200 block">Interview Updates</span>
                  <span className="text-[9px] text-slate-500 block">Email on schedule confirmations</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifIntConfirm} 
                  onChange={e => setNotifIntConfirm(e.target.checked)} 
                  className="w-4 h-4 text-indigo-600 bg-slate-950 border-slate-800 rounded focus:ring-indigo-500 focus:ring-offset-0"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="space-y-0.5">
                  <span className="text-slate-200 block">Offer Replies</span>
                  <span className="text-[9px] text-slate-500 block">Email when offer accepted/declined</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifOfferReply} 
                  onChange={e => setNotifOfferReply(e.target.checked)} 
                  className="w-4 h-4 text-indigo-600 bg-slate-950 border-slate-800 rounded focus:ring-indigo-500 focus:ring-offset-0"
                />
              </div>
            </div>
          </div>

          {/* Access keys */}
          <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Corporate API Keys</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Use these keys to sync candidates metrics or sync scheduler data to corporate ERP platforms.
            </p>
            <button 
              onClick={handleGenToken}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              🔑 Generate API Token
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
