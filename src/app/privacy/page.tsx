import type { Metadata } from 'next';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | GUIDESOFT IT SOLUTIONS',
  description: 'Our Privacy Policy.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-lg dark:prose-invert prose-primary mx-auto max-w-none">
            <p>Last updated: July 2026</p>
            <p>At GUIDESOFT IT SOLUTIONS, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our application.</p>
            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us when you register for an account, subscribe to our newsletter, or communicate with us. This may include your name, email address, and payment information.</p>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and send you related information such as confirmations and invoices.</p>
            <h2>Data Security</h2>
            <p>We implement reasonable security measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
