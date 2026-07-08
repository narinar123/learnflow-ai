import type { Metadata } from 'next';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | GUIDESOFT IT SOLUTIONS',
  description: 'Get in touch with the GUIDESOFT IT SOLUTIONS team for support, sales, or partnerships.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Get in touch</h1>
            <p className="text-lg text-text-secondary">Whether you have a question about our courses, need enterprise pricing, or want to partner with us, we're here to help.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-8 mb-12">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <p className="text-text-secondary text-sm mb-1">Support: support@learnflow.ai</p>
                    <p className="text-text-secondary text-sm">Sales: sales@learnflow.ai</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Phone</h3>
                    <p className="text-text-secondary text-sm">+1 (555) 123-4567</p>
                    <p className="text-text-muted text-xs mt-1">Mon-Fri, 9am-5pm PST</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Office</h3>
                    <p className="text-text-secondary text-sm">123 AI Boulevard, Suite 400<br />San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Email address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"></textarea>
                </div>
                <button type="button" className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-colors shadow-sm">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
