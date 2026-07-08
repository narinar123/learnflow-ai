'use client';

import React, { useState, useEffect } from 'react';
import { 
  getJobOffers, 
  saveJobOffers, 
  getJobApplications, 
  saveJobApplications,
  getJobPostings,
  JobOffer,
  JobApplication,
  JobPosting
} from '@/lib/recruiterData';
import { mockStudents } from '@/lib/admin-data';

export default function RecruiterOffersTracker() {
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [apps, setApps] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  // Form Fields
  const [appId, setAppId] = useState('');
  const [baseSalary, setBaseSalary] = useState('');
  const [benefits, setBenefits] = useState('');
  const [startDate, setStartDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');

  // Selected Offer for Document Preview Modal
  const [previewOffer, setPreviewOffer] = useState<JobOffer | null>(null);

  useEffect(() => {
    setOffers(getJobOffers());
    setApps(getJobApplications());
    setJobs(getJobPostings());
  }, []);

  const handleExtendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId) {
      alert('Please select an applicant.');
      return;
    }

    const newOffer: JobOffer = {
      id: `off_${Date.now()}`,
      applicationId: appId,
      baseSalary,
      benefits,
      startDate,
      expiryDate,
      notes,
      status: 'Sent',
    };

    // Update offers state & localStorage
    const updatedOffers = [newOffer, ...offers];
    saveJobOffers(updatedOffers);
    setOffers(updatedOffers);

    // Update application stage to 'Offer'
    const updatedApps = apps.map(a => {
      if (a.id === appId) {
        return { ...a, stage: 'Offer' } as JobApplication;
      }
      return a;
    });
    saveJobApplications(updatedApps);
    setApps(updatedApps);

    // Reset Form
    setAppId('');
    setBaseSalary('');
    setBenefits('');
    setStartDate('');
    setExpiryDate('');
    setNotes('');
  };

  const handleUpdateStatus = (offerId: string, status: JobOffer['status']) => {
    const updated = offers.map(o => {
      if (o.id === offerId) {
        return { ...o, status } as JobOffer;
      }
      return o;
    });
    saveJobOffers(updated);
    setOffers(updated);

    // If offer is accepted, we progress application stage to 'Hired'. If declined, to 'Rejected'
    const targetOffer = offers.find(o => o.id === offerId);
    if (targetOffer) {
      const updatedApps = apps.map(a => {
        if (a.id === targetOffer.applicationId) {
          return { ...a, stage: status === 'Accepted' ? 'Hired' : status === 'Declined' ? 'Rejected' : a.stage } as JobApplication;
        }
        return a;
      });
      saveJobApplications(updatedApps);
      setApps(updatedApps);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Job Offers Tracker</h1>
        <p className="text-slate-400 text-sm mt-1">Generate offer letters, verify candidate compensations, and monitor signature completions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleExtendOffer} className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Extend an Offer</h3>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Applicant Candidate</label>
              <select
                value={appId}
                onChange={e => setAppId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
                required
              >
                <option value="">Select Candidate...</option>
                {apps.filter(app => app.stage !== 'Hired' && app.stage !== 'Rejected').map(app => {
                  const student = mockStudents.find(s => s.id === app.studentId);
                  const job = jobs.find(j => j.id === app.jobId);
                  return (
                    <option key={app.id} value={app.id}>
                      {student?.name} - {job?.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Annual Package (Salary)</label>
              <input
                type="text"
                placeholder="e.g. ₹20,00,000 / year"
                value={baseSalary}
                onChange={e => setBaseSalary(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Join Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Offer Expiry</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Core Benefits</label>
              <textarea
                rows={2}
                placeholder="Healthcare, WFH allowances..."
                value={benefits}
                onChange={e => setBenefits(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all duration-150 active:scale-95 shadow-md shadow-indigo-500/10"
            >
              ✍️ Extend Offer Letter
            </button>
          </form>
        </div>

        {/* Right column list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-3xl border border-slate-800 bg-[#0F0B26]">
            <h3 className="text-base font-bold text-white mb-6">Active Offer Logs</h3>

            {offers.length === 0 ? (
              <div className="text-center py-20 text-slate-500">No extended job offers found.</div>
            ) : (
              <div className="space-y-3">
                {offers.map(offer => {
                  const app = apps.find(a => a.id === offer.applicationId);
                  const student = app ? mockStudents.find(s => s.id === app.studentId) : null;
                  const job = app ? jobs.find(j => j.id === app.jobId) : null;

                  return (
                    <div key={offer.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={student?.avatar || 'https://api.dicebear.com/9.x/avataaars/svg?seed=Demo'} 
                          alt={student?.name} 
                          className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{student?.name || 'Applicant'}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold ${
                              offer.status === 'Accepted'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                : offer.status === 'Declined'
                                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                                : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                            }`}>
                              {offer.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">Job: {job?.title || 'Vacancy'}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 font-mono">Comp: {offer.baseSalary}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right sm:text-right">
                          <p className="text-xs font-bold text-slate-300">📅 Joins: {offer.startDate}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Expires: {offer.expiryDate}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setPreviewOffer(offer)}
                            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold rounded-lg text-slate-300"
                          >
                            👁️ Letter
                          </button>

                          {offer.status === 'Sent' && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(offer.id, 'Accepted')}
                                className="px-2 py-1 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(offer.id, 'Declined')}
                                className="text-[10px] text-rose-500 hover:text-rose-400 px-1 py-1"
                              >
                                Decline
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── OFFER LETTER PREVIEW MODAL ─── */}
      {previewOffer && (() => {
        const app = apps.find(a => a.id === previewOffer.applicationId);
        const student = app ? mockStudents.find(s => s.id === app.studentId) : null;
        const job = app ? jobs.find(j => j.id === app.jobId) : null;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-[#0F0B26] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
              <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
                <span className="text-sm font-bold text-white">Mock Offer Letter Preview</span>
                <button 
                  onClick={() => setPreviewOffer(null)}
                  className="text-slate-400 hover:text-white font-bold"
                >
                  ×
                </button>
              </div>

              {/* Printable-like formal document area */}
              <div className="p-8 bg-slate-950 text-slate-300 space-y-6 text-xs leading-relaxed max-h-[60vh] overflow-y-auto font-sans">
                <div className="flex justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">LEARNFLOW AI CO.</h4>
                    <p className="text-[9px] text-slate-500">Corporate Recruiting Division</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-slate-400">Ref: LF-OFFER-{previewOffer.id.substring(4, 9).toUpperCase()}</p>
                    <p className="text-[9px] text-slate-500">Date: {new Date().toISOString().split('T')[0]}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-400">To,</p>
                  <p className="font-bold text-white">{student?.name}</p>
                  <p className="text-slate-400">{student?.email}</p>
                </div>

                <div className="space-y-3">
                  <h5 className="font-bold text-white uppercase text-[10px] tracking-wider">Subject: Offer of Employment for {job?.title}</h5>
                  <p>
                    Dear {student?.name},
                  </p>
                  <p>
                    On behalf of Google India, we are delighted to offer you the position of <span className="text-white font-bold">{job?.title}</span>. We were incredibly impressed by your academic record, your verified certifications, and your platform learning metrics.
                  </p>
                  <p>
                    The terms of this offer are summarized below:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><span className="text-slate-400">Base Compensation:</span> <span className="font-bold text-white font-mono">{previewOffer.baseSalary}</span></li>
                    <li><span className="text-slate-400">Benefits & Stipend:</span> {previewOffer.benefits}</li>
                    <li><span className="text-slate-400">Expected Start Date:</span> <span className="font-bold text-white">{previewOffer.startDate}</span></li>
                    <li><span className="text-slate-400">Offer Expiration Date:</span> {previewOffer.expiryDate}</li>
                  </ul>
                  <p>
                    Please review this document. To accept this position, please sign and return this letter or confirm directly via our portal interface before the expiration date.
                  </p>
                  <p>
                    We look forward to welcoming you to the Google India family!
                  </p>
                </div>

                <div className="pt-8 flex justify-between">
                  <div>
                    <div className="h-6 border-b border-slate-800 w-28" />
                    <p className="text-[9px] text-slate-500 mt-1">Candidate Signature</p>
                  </div>
                  <div className="text-right">
                    <div className="h-6 border-b border-slate-800 w-28 inline-block" />
                    <p className="text-[9px] text-slate-500 mt-1">HR Operations Lead</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-800 bg-slate-900/30 flex justify-end">
                <button 
                  onClick={() => setPreviewOffer(null)} 
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
