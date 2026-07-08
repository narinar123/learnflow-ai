import type { Metadata } from 'next';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { webinars } from '@/lib/cms';
import { Calendar, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Webinars & Masterclasses | GUIDESOFT IT SOLUTIONS',
  description: 'Join live masterclasses and interactive webinars with industry experts and leading instructors.',
};

export default function WebinarsPage() {
  const upcomingWebinars = webinars.filter(w => w.isUpcoming);
  const onDemandWebinars = webinars.filter(w => !w.isUpcoming);

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Masterclasses & Webinars</h1>
            <p className="text-lg text-text-secondary">Learn directly from industry leaders. Join live sessions or watch on-demand recordings.</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              Upcoming Live Sessions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingWebinars.map((webinar) => (
                <div key={webinar.id} className="rounded-2xl bg-card border border-primary/20 overflow-hidden shadow-lg shadow-primary/5 flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5 relative bg-muted aspect-video md:aspect-auto">
                    <img src={webinar.coverImage} alt={webinar.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">Live</div>
                  </div>
                  <div className="p-6 w-full md:w-3/5 flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>
                    <div className="flex flex-col gap-2 mb-4 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-text-muted" />
                        <span>{webinar.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-text-muted" />
                        <span>{webinar.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-text-muted" />
                        <span>{webinar.speaker.name}</span>
                      </div>
                    </div>
                    <button className="mt-auto w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors text-sm">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">On-Demand Recordings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {onDemandWebinars.map((webinar) => (
                <div key={webinar.id} className="rounded-xl bg-card border border-border overflow-hidden hover:border-border/80 transition-colors">
                  <div className="aspect-video relative bg-muted">
                    <img src={webinar.coverImage} alt={webinar.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold mb-2 line-clamp-2">{webinar.title}</h3>
                    <p className="text-xs text-text-muted mb-4">By {webinar.speaker.name}</p>
                    <button className="text-sm font-medium text-primary hover:underline">Watch Recording →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
