import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { resources } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Resources | GUIDESOFT IT SOLUTIONS',
  description: 'Download free eBooks, templates, cheat sheets, and guides to accelerate your learning journey.',
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Free Learning Resources</h1>
            <p className="text-lg text-text-secondary">Download expert-crafted guides, cheat sheets, and templates to help you master new skills faster.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <div key={resource.id} className="rounded-2xl bg-card border border-border p-6 flex flex-col hover:border-primary/50 transition-colors shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                    resource.type === 'E-Book' ? 'bg-blue-500/10 text-blue-500' :
                    resource.type === 'Cheatsheet' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {resource.type}
                  </span>
                  <span className="text-xs text-text-muted">{(resource.downloadCount ?? 0).toLocaleString()} downloads</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                <p className="text-text-secondary text-sm mb-6 flex-grow">{resource.description}</p>
                <button className="w-full py-3 bg-muted hover:bg-muted/80 text-text-primary font-medium rounded-xl transition-colors border border-border">
                  Download Free
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
