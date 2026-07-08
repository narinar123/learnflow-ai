import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { PricingSection } from '@/components/marketing/PricingSection';
import { getFeaturedCourses, testimonials, instructors } from '@/lib/data';

export const metadata: Metadata = {
  title: 'GUIDESOFT IT SOLUTIONS — AI-Powered Learning Platform | 500+ Courses | Free to Start',
  description: 'Learn with your personal AI tutor. 500+ expert-led courses, verified certificates, offline support. Join 100,000+ learners on GUIDESOFT IT SOLUTIONS. Free to start.',
  openGraph: {
    title: 'GUIDESOFT IT SOLUTIONS — Learn Smarter. Grow Faster.',
    description: 'Your AI tutor. 500+ courses. Verified certificates. Free to start.',
    type: 'website',
    url: 'https://gsdev.guideitsol.com',
    images: [{ url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop', width: 1200, height: 630, alt: 'GUIDESOFT IT SOLUTIONS' }],
  },
};

const featuredCourses = getFeaturedCourses().slice(0, 4);

export default function HomePage() {
  const now = new Date();

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden">
      {/* ─── NAVBAR ─── */}
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background gradient + mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5 dark:from-slate-950 dark:via-indigo-950/50 dark:to-purple-950/30" />
        <div className="absolute inset-0 opacity-40 dark:opacity-100" style={{backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(168,85,247,0.12) 0%, transparent 50%)'}} />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Overline chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            AI-Powered Learning Platform
          </div>

          {/* H1 */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
            <span className="text-text-primary">Learn Smarter.</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-pink-400 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Grow Faster.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
            Your AI tutor knows your learning style, fills your knowledge gaps, and keeps you motivated — from your first lesson to your last certificate.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/signup" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl text-base transition-all duration-200 active:scale-95 shadow-lg shadow-primary/25">
              Get Started Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href="#demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-muted hover:bg-muted/80 border border-border text-text-primary font-semibold rounded-2xl text-base transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Watch Demo
            </a>
          </div>

          {/* Trust stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-500">⭐</span>
              <span className="text-text-primary font-medium">4.9/5</span>
              <span>from 18,000+ reviews</span>
            </div>
            <span className="hidden sm:block text-border">·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500">●</span>
              <span className="text-text-primary font-medium">100,000+</span>
              <span>active learners</span>
            </div>
            <span className="hidden sm:block text-border">·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-primary">📚</span>
              <span className="text-text-primary font-medium">500+</span>
              <span>expert courses</span>
            </div>
          </div>
        </div>

        {/* Hero bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ─── TRUSTED BY ─── */}
      <section className="py-12 border-y border-border/40 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm text-text-muted uppercase tracking-widest mb-8 font-medium">Trusted by learners from</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {['TCS', 'Infosys', 'HDFC Bank', 'Zomato', 'Razorpay'].map(company => (
              <span key={company} className="text-text-secondary font-semibold text-sm hover:text-text-primary transition-colors">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">WHY LEARNFLOW AI</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Everything you need to learn,<br />grow, and succeed</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">Powerful features designed for real-world learning outcomes — not just feature checkboxes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🤖',
                gradient: 'from-primary/10 to-secondary/10 dark:from-indigo-600/20 dark:to-purple-600/20',
                border: 'border-primary/20',
                iconBg: 'bg-primary/10',
                iconColor: 'text-primary',
                title: 'Your Personal AI Tutor',
                desc: 'Not a generic chatbot. An AI that\'s trained on your exact course content — answers questions, generates quizzes, and creates personalized study plans based on what you\'re actually learning.',
                stat: '93% of learners find AI responses helpful',
              },
              {
                icon: '🎮',
                gradient: 'from-amber-600/10 to-orange-600/10 dark:from-amber-600/20 dark:to-orange-600/20',
                border: 'border-amber-500/20',
                iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
                iconColor: 'text-amber-500 dark:text-amber-400',
                title: 'Gamification That Works',
                desc: 'XP points, levels, badges, daily quests, streak trackers, and global leaderboards. The psychology of engagement from the best games, applied to your education.',
                stat: '92% first-course completion rate',
              },
              {
                icon: '📜',
                gradient: 'from-emerald-600/10 to-teal-600/10 dark:from-emerald-600/20 dark:to-teal-600/20',
                border: 'border-emerald-500/20',
                iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
                iconColor: 'text-emerald-500 dark:text-emerald-400',
                title: 'Certificates That Matter',
                desc: 'Every certificate is blockchain-verified and directly shareable to LinkedIn. Employers can verify your skills instantly via QR code — no trust gap.',
                stat: 'Accepted by 500+ employers',
              },
            ].map((feature) => (
              <div key={feature.title} className={`relative group rounded-3xl bg-gradient-to-br ${feature.gradient} border ${feature.border} bg-card p-8 hover:scale-[1.02] transition-all duration-300`}>
                <div className={`w-14 h-14 ${feature.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-6">{feature.desc}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border text-xs text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {feature.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED COURSES ─── */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">FEATURED COURSES</p>
              <h2 className="text-4xl font-bold text-text-primary">What will you learn today?</h2>
            </div>
            <Link href="/courses" className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              Browse all 500+ courses
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => {
              const instructor = instructors.find(i => i.id === course.instructorId);
              return (
                <Link key={course.id} href={`/courses/${course.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full text-white ${course.isFree ? 'bg-emerald-500/90' : course.includedInPro ? 'bg-primary/90' : 'bg-slate-800/90'}`}>
                          {course.isFree ? 'Free' : course.includedInPro ? 'Pro' : ''}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/60 text-white backdrop-blur-sm">{course.level}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-xs text-primary font-medium uppercase tracking-wide mb-1.5">{course.category}</p>
                      <h3 className="text-sm font-semibold text-text-primary leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>

                      {/* Instructor */}
                      <div className="flex items-center gap-2 mb-3">
                        <img src={instructor?.avatar} alt={instructor?.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-xs text-text-muted">{instructor?.name}</span>
                      </div>

                      {/* Rating & Enrollment */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-amber-500 text-xs">★</span>
                          <span className="text-xs font-medium text-text-primary">{course.rating}</span>
                          <span className="text-xs text-text-muted">({course.reviewsCount.toLocaleString()})</span>
                        </div>
                        <div className="text-right">
                          {course.isFree ? (
                            <span className="text-sm font-bold text-emerald-500">Free</span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-text-muted line-through">₹{course.originalPrice?.toLocaleString()}</span>
                              <span className="text-sm font-bold text-text-primary">₹{course.price.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/courses" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium">
              Browse all 500+ courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 dark:from-indigo-950 dark:via-purple-950 dark:to-indigo-950 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '100,000+', label: 'Active Learners' },
              { value: '500+', label: 'Expert Courses' },
              { value: '92%', label: 'Completion Rate' },
              { value: '4.9★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-sm text-text-secondary font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">LEARNER STORIES</p>
            <h2 className="text-4xl font-bold text-text-primary">Learners love GUIDESOFT IT SOLUTIONS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl bg-card border border-border hover:border-border/80 p-7 transition-all duration-300 shadow-sm">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => <span key={i} className="text-amber-500 text-sm">★</span>)}
                </div>
                <p className="text-text-secondary leading-relaxed mb-6 text-[15px]">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30" />
                  <div>
                    <div className="font-semibold text-text-primary text-sm">{t.name}</div>
                    <div className="text-xs text-text-muted">{t.role}{t.company ? ` · ${t.company}` : ''}, {t.location}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">{t.course}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <PricingSection />

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-indigo-950 dark:to-purple-950" />
        <div className="absolute inset-0 opacity-50 dark:opacity-100" style={{backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.3) 0%, transparent 70%)'}} />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">Your learning journey<br />starts today.</h2>
          <p className="text-text-secondary text-lg mb-10">Join 100,000+ learners. Your first 6 courses are free. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3.5 rounded-xl bg-background border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm" />
            <Link href="/signup" className="px-6 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-sm transition-all duration-150 whitespace-nowrap shadow-sm">
              Create Free Account
            </Link>
          </div>
          <p className="mt-4 text-xs text-text-muted">Already have an account? <Link href="/login" className="text-primary hover:underline">Log in →</Link></p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />
    </div>
  );
}
