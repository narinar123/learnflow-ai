import type { Metadata } from 'next';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export const metadata: Metadata = {
  title: 'Careers | GUIDESOFT IT SOLUTIONS',
  description: 'Join our team and help build the future of AI-powered education.',
};

export default function CareersPage() {
  const jobs = [
    { id: 1, role: 'Senior Frontend Engineer', dept: 'Engineering', location: 'Remote (US/Remote)', type: 'Full-time' },
    { id: 2, role: 'Machine Learning Researcher', dept: 'AI Labs', location: 'San Francisco, CA', type: 'Full-time' },
    { id: 3, role: 'Product Manager, Enterprise', dept: 'Product', location: 'Remote (Global)', type: 'Full-time' },
    { id: 4, role: 'Curriculum Developer (Tech)', dept: 'Content', location: 'New York, NY', type: 'Contract' }
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Build the future of learning.</h1>
          <p className="text-lg text-text-secondary">
            We're a team of educators, engineers, and designers working to make high-quality education universally accessible. Join us.
          </p>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
          
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold mb-1">{job.role}</h3>
                  <div className="flex gap-3 text-sm text-text-secondary">
                    <span>{job.dept}</span>
                    <span>·</span>
                    <span>{job.location}</span>
                    <span>·</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-muted hover:bg-muted/80 font-medium rounded-lg text-sm transition-colors border border-border shrink-0">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border text-center">
            <h3 className="text-xl font-bold mb-2">Don't see a fit?</h3>
            <p className="text-text-secondary mb-6 text-sm">We're always looking for talented people. Send your resume and tell us how you can help.</p>
            <a href="mailto:careers@learnflow.ai" className="text-primary font-medium hover:underline">
              careers@learnflow.ai
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
