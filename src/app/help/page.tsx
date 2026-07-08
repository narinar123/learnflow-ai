import type { Metadata } from 'next';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help Center | GUIDESOFT IT SOLUTIONS',
  description: 'Find answers, troubleshooting guides, and contact support.',
};

export default function HelpCenterPage() {
  const faqs = [
    { q: 'How do I access my certificates?', a: 'Once you complete a course, your certificate is automatically generated. You can find it under the "Certificates" tab in your dashboard.' },
    { q: 'Can I change my subscription plan?', a: 'Yes! You can upgrade or downgrade your plan at any time from your Account Settings. Changes take effect at the start of your next billing cycle.' },
    { q: 'Is there a discount for students?', a: 'We offer a 50% discount on annual Pro plans for actively enrolled students. Contact our support team with your student ID to claim it.' },
    { q: 'How does the AI Tutor work?', a: 'Our AI Tutor is trained on the specific curriculum of the course you are taking. You can ask it to clarify concepts, generate quizzes, or summarize video transcripts in real-time.' },
  ];

  const categories = ['Getting Started', 'Account & Billing', 'Course Player', 'Certificates & Badges', 'Mobile App', 'Enterprise Admin'];

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 border border-border">
            <h1 className="text-4xl font-bold tracking-tight mb-6">How can we help you?</h1>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
              <input type="text" placeholder="Search for articles, guides, and FAQs..." className="w-full pl-12 pr-4 py-4 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none shadow-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h2 className="font-bold text-lg mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map((cat, i) => (
                  <li key={i}>
                    <button className="text-text-secondary hover:text-primary text-sm font-medium transition-colors text-left w-full py-1.5">{cat}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <h2 className="font-bold text-2xl mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                    <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                    <p className="text-text-secondary leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
