'use client';

import { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, PhoneCall, ChevronDown } from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { toast } from 'sonner';

const FAQS = [
  { q: 'How do I download lessons offline?', a: 'Offline downloads are available on the Pro and Premium tiers. Simply click the download icon next to any lesson in the mobile app.' },
  { q: 'Is there a refund policy?', a: 'Yes, we offer a 14-day money-back guarantee on all our plans. Reach out to billing@learnflow.ai with your invoice details to request a refund.' },
  { q: 'Can I change my course selections after starting?', a: 'Yes! You have full access to our entire catalog of 500+ courses if you are on a Pro or Premium plan. You can start or stop any course anytime without losing progress.' },
  { q: 'How does the weekly leaderboard work?', a: 'The leaderboard resets every Monday at 00:00 UTC. Earn XP by watching lessons, completing quizzes, maintaining streaks, and logging into the platform.' },
];

export default function SupportPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('technical');
  const [message, setMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.error('Please fill out all fields.');
      return;
    }
    toast.success('Ticket submitted successfully! We will get back to you within 24 hours.');
    setSubject('');
    setMessage('');
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-5xl mx-auto">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Help & Support
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Need help? Read our FAQs or fill out the support form below to contact our customer success team.
          </p>
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <HelpCircle size={18} className="text-indigo-400" />
            <span>Frequently Asked Questions</span>
          </h2>

          <div className="space-y-2">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]/30 transition-all"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={16} 
                    className={`text-[var(--text-secondary)] transition-transform duration-200 ${
                      activeFaq === idx ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {activeFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] pt-3 bg-[var(--bg-surface-2)]/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Channels sidebar */}
          <div className="space-y-4 lg:col-span-1">
            <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2.5">
                Support Channels
              </h3>
              
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-indigo-400" />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">Email Support</div>
                    <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">support@learnflow.ai</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquare size={16} className="text-indigo-400" />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">Live Chat</div>
                    <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Available for Premium users.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleContactSubmit} className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3 mb-4">
                Submit Support Ticket
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-text">Support Topic</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-field"
                  >
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="account">Account Access</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>

                <div>
                  <label className="label-text">Subject Line</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Short summary of issue..."
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="label-text">Message / Details</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explain details of the problem..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary text-xs px-6 py-2.5">
                  Send Support Request
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
