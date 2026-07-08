import type { Metadata } from 'next';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | GUIDESOFT IT SOLUTIONS',
  description: 'Our Terms of Service.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg dark:prose-invert prose-primary mx-auto max-w-none">
            <p>Last updated: July 2026</p>
            <p>Please read these Terms of Service carefully before using the GUIDESOFT IT SOLUTIONS platform operated by GUIDESOFT.</p>
            <h2>Acceptance of Terms</h2>
            <p>By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.</p>
            <h2>Accounts</h2>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the terms, which may result in immediate termination of your account.</p>
            <h2>Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of GUIDESOFT IT SOLUTIONS and its licensors.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
