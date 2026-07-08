import type { Metadata } from 'next';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy | GUIDESOFT IT SOLUTIONS',
  description: 'Our Cookie Policy.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          <div className="prose prose-lg dark:prose-invert prose-primary mx-auto max-w-none">
            <p>Last updated: July 2026</p>
            <p>This Cookie Policy explains how GUIDESOFT IT SOLUTIONS uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
            <h2>What are cookies?</h2>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
            <h2>Why do we use cookies?</h2>
            <p>We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our online properties.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
