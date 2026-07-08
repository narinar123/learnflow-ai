import React from "react"
import { Navbar } from "@/components/marketing/Navbar"
import { Footer } from "@/components/marketing/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqs = [
  {
    question: "How does the AI Tutor work?",
    answer: "Our AI Tutor analyzes your learning patterns, identifies gaps in your knowledge, and generates personalized quizzes, explanations, and study paths tailored exactly to what you need to focus on."
  },
  {
    question: "Is the platform really free to start?",
    answer: "Yes! Your first 6 courses are completely free, including basic AI assistance. You can upgrade to our Pro plans for unlimited AI usage, certificate generation, and 1-on-1 career coaching."
  },
  {
    question: "Are the certificates recognized by employers?",
    answer: "Absolutely. All our certificates are blockchain-verified and instantly shareable to LinkedIn. We partner with over 500+ top tech companies who actively hire from our platform."
  },
  {
    question: "Can I use EduAI for my entire team/company?",
    answer: "Yes, we offer enterprise plans designed specifically for organizations. You get an Institution Portal to track team progress, assign learning paths, and view detailed analytics."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          
          <div className="text-center mb-16 animate-in slide-in-from-bottom-8 fade-in duration-700">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-text-secondary">
              Everything you need to know about the product and billing.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-border bg-card shadow-sm hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-text-secondary mb-6">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
