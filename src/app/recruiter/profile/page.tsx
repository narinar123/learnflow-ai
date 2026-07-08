'use client';

import React, { useState, useEffect } from 'react';
import { getCompanyProfile, saveCompanyProfile, CompanyProfile, getJobPostings } from '@/lib/recruiterData';

export default function RecruiterCompanyProfile() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CompanyProfile | null>(null);
  const [jobsCount, setJobsCount] = useState(0);
  const [newTech, setNewTech] = useState('');
  const [newBenefit, setNewBenefit] = useState('');

  useEffect(() => {
    const data = getCompanyProfile();
    setProfile(data);
    setFormData(data);
    setJobsCount(getJobPostings().filter(j => j.status === 'Active').length);
  }, []);

  if (!profile || !formData) return <div className="text-center py-20 text-slate-400">Loading profile...</div>;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveCompanyProfile(formData);
    setProfile(formData);
    setIsEditing(false);
  };

  const handleAddTech = () => {
    if (!newTech.trim()) return;
    setFormData(prev => prev ? {
      ...prev,
      techStack: [...prev.techStack, newTech.trim()]
    } : null);
    setNewTech('');
  };

  const handleRemoveTech = (index: number) => {
    setFormData(prev => prev ? {
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index)
    } : null);
  };

  const handleAddBenefit = () => {
    if (!newBenefit.trim()) return;
    setFormData(prev => prev ? {
      ...prev,
      benefits: [...prev.benefits, newBenefit.trim()]
    } : null);
    setNewBenefit('');
  };

  const handleRemoveBenefit = (index: number) => {
    setFormData(prev => prev ? {
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    } : null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cover Image & Header Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0F0B26]">
        <div className="h-44 sm:h-56 relative">
          <img 
            src={profile.coverImage} 
            alt="Company Cover" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B26] to-transparent" />
        </div>

        <div className="px-6 pb-6 relative -mt-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 min-w-0">
            <img 
              src={profile.logo} 
              alt={profile.name} 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-[#0F0B26] bg-slate-900 object-cover shadow-xl"
            />
            <div className="min-w-0 pb-1">
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{profile.name}</h1>
              <p className="text-xs text-slate-400 mt-1">🏢 {profile.industry} · 📍 {profile.location}</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => {
              setIsEditing(!isEditing);
              setFormData(profile);
            }} 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
          >
            {isEditing ? 'Cancel Edit' : '📝 Edit Profile'}
          </button>
        </div>
      </div>

      {/* Main Form/Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Details (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          {isEditing ? (
            <form onSubmit={handleSave} className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
              <h3 className="text-base font-bold text-white mb-2">Edit Corporate Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Website URL</label>
                  <input 
                    type="url" 
                    value={formData.website} 
                    onChange={e => setFormData({ ...formData, website: e.target.value })} 
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Company Size</label>
                  <input 
                    type="text" 
                    value={formData.size} 
                    onChange={e => setFormData({ ...formData, size: e.target.value })} 
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                <textarea 
                  rows={4}
                  value={formData.description} 
                  onChange={e => setFormData({ ...formData, description: e.target.value })} 
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Location</label>
                  <input 
                    type="text" 
                    value={formData.location} 
                    onChange={e => setFormData({ ...formData, location: e.target.value })} 
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Industry</label>
                  <input 
                    type="text" 
                    value={formData.industry} 
                    onChange={e => setFormData({ ...formData, industry: e.target.value })} 
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Edit Tech Stack */}
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Tech Stack</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. Next.js"
                    value={newTech} 
                    onChange={e => setNewTech(e.target.value)} 
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button type="button" onClick={handleAddTech} className="px-3 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.techStack.map((tech, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 text-[10px] font-semibold rounded-lg text-slate-300 border border-slate-700">
                      {tech}
                      <button type="button" onClick={() => handleRemoveTech(idx)} className="text-slate-500 hover:text-red-400 ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Edit Benefits */}
              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Benefits & Perks</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. Flexible Hours"
                    value={newBenefit} 
                    onChange={e => setNewBenefit(e.target.value)} 
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button type="button" onClick={handleAddBenefit} className="px-3 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.benefits.map((benefit, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 text-[10px] font-semibold rounded-lg text-slate-300 border border-slate-700">
                      {benefit}
                      <button type="button" onClick={() => handleRemoveBenefit(idx)} className="text-slate-500 hover:text-red-400 ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors">Save Changes</button>
              </div>
            </form>
          ) : (
            <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">About Google India</h3>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed whitespace-pre-line">{profile.description}</p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-3">Core Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.techStack.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-900 border border-slate-800 text-xs font-bold rounded-xl text-indigo-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-3">Employee Benefits & Perks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profile.benefits.map((benefit, idx) => (
                    <div key={idx} className="p-3 rounded-2xl border border-slate-800/80 bg-slate-900/20 text-xs font-semibold text-slate-300 flex items-center gap-2">
                      <span className="text-emerald-400">✔️</span> {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Info Box */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Corporate Stats</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-800/60 text-xs font-semibold">
                <span className="text-slate-400">Active Job Postings</span>
                <span className="text-white font-bold">{jobsCount} positions</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60 text-xs font-semibold">
                <span className="text-slate-400">Verified Partner</span>
                <span className="text-emerald-400 font-bold">🛡️ Active</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60 text-xs font-semibold">
                <span className="text-slate-400">Company Size</span>
                <span className="text-white font-bold">{profile.size}</span>
              </div>
              <div className="flex justify-between py-2 text-xs font-semibold">
                <span className="text-slate-400">Headquarters</span>
                <span className="text-white font-bold truncate max-w-[150px]">{profile.location}</span>
              </div>
            </div>

            <a 
              href={profile.website} 
              target="_blank" 
              rel="noreferrer" 
              className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              🌐 Visit Careers Page
            </a>
          </div>

          <div className="p-6 rounded-3xl border border-indigo-500/10 bg-[#0F0B26] relative overflow-hidden">
            <h3 className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">Workspace Token</h3>
            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
              Use this key to integrate candidate pipelines directly to Slack, Workable, or greenhouse.
            </p>
            <div className="mt-4 p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between gap-2">
              <code className="text-[9px] text-indigo-300 font-mono truncate">lf_partner_key_0x5412A8</code>
              <button 
                onClick={() => alert('Key copied to clipboard!')} 
                className="text-[9px] font-bold text-slate-400 hover:text-white"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
