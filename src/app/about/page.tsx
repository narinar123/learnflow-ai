import type { Metadata } from 'next';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export const metadata: Metadata = {
  title: 'About Us | GUIDESOFT IT SOLUTIONS',
  description: 'Our mission is to democratize education through AI-powered personalized learning.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center mb-24">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Democratizing education with AI.</h1>
          <p className="text-lg text-text-secondary">
            We believe that high-quality, personalized education should be accessible to everyone, everywhere. 
            By combining expert-led curriculum with generative AI, we're building the first platform that truly adapts to how you learn.
          </p>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl bg-muted aspect-square sm:aspect-[4/3] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" alt="Our Team" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">The LearnFlow Story</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>GUIDESOFT IT SOLUTIONS started in 2026 when a group of educators and AI researchers asked a simple question: What if every student could have a personal tutor?</p>
                <p>Traditional online courses suffer from dismal completion rates because they are static. When a student gets stuck, there's no one to help them in real-time. The learning stops.</p>
                <p>We built GUIDESOFT IT SOLUTIONS to change that. Our AI doesn't just give you the answers; it guides you to them, acting as a Socratic tutor that knows your exact syllabus, your past mistakes, and your learning style.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Learner First</h3>
              <p className="text-text-secondary text-sm">Every feature we build is designed to improve learning outcomes, not just engagement metrics.</p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI for Augmentation</h3>
              <p className="text-text-secondary text-sm">We use AI to augment human intelligence and teaching, not to replace it.</p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Radical Accessibility</h3>
              <p className="text-text-secondary text-sm">We strive to make world-class education affordable and accessible globally.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
