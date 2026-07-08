import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Universities | GUIDESOFT IT SOLUTIONS',
  description: 'Empower your students with industry-relevant skills and AI-powered learning tools integrated with your curriculum.',
};

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-teal-500/10 -z-10 blur-3xl rounded-full" />
          <p className="text-indigo-500 font-semibold tracking-widest uppercase mb-4 text-sm">FOR HIGHER EDUCATION</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Bridge the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-500">campus and career.</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-10">
            Augment your existing degree programs with industry-aligned certification paths, an AI teaching assistant, and real-world project portfolios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-lg">
              Partner with Us
            </Link>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why partner with GUIDESOFT IT SOLUTIONS?</h2>
              <ul className="space-y-6">
                {[
                  { title: 'Industry-Relevant Curriculum', desc: 'Our courses are built in collaboration with top tech companies. Ensure your students learn the exact skills employers are hiring for today.' },
                  { title: 'AI Teaching Assistant', desc: 'Reduce faculty workload. Our AI tutor answers common student questions 24/7, based entirely on your specific course materials.' },
                  { title: 'White-Label Portals', desc: 'Provide a seamless experience. Our platform can be customized with your university\'s branding and integrated into your existing LMS.' },
                  { title: 'Employability Tracking', desc: 'Get actionable data on how ready your cohorts are for the job market, based on their performance in technical assessments.' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 to-slate-900 border border-border p-8 flex items-center justify-center">
                <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.5) 0%, transparent 60%)'}} />
                <div className="relative text-center space-y-6 z-10">
                  <div className="text-6xl font-extrabold text-white">94%</div>
                  <p className="text-indigo-200 text-xl font-medium">of students in our partner programs secure employment within 3 months of graduation.</p>
                </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
