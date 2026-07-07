import type { Metadata } from 'next';
import Link from 'next/link';
import { getFeaturedCourses, testimonials, membershipPlans, instructors } from '@/lib/data';

export const metadata: Metadata = {
  title: 'LearnFlow AI — AI-Powered Learning Platform | 500+ Courses | Free to Start',
  description: 'Learn with your personal AI tutor. 500+ expert-led courses, verified certificates, offline support. Join 100,000+ learners on LearnFlow AI. Free to start.',
  openGraph: {
    title: 'LearnFlow AI — Learn Smarter. Grow Faster.',
    description: 'Your AI tutor. 500+ courses. Verified certificates. Free to start.',
    type: 'website',
    url: 'https://gsdev.guideitsol.com',
    images: [{ url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop', width: 1200, height: 630, alt: 'LearnFlow AI' }],
  },
};

const featuredCourses = getFeaturedCourses().slice(0, 4);

export default function HomePage() {
  const now = new Date();

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">L</div>
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">LearnFlow AI</span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
              <Link href="/courses" className="text-sm text-slate-400 hover:text-white transition-colors">Courses</Link>
              <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
              <a href="#teams" className="text-sm text-slate-400 hover:text-white transition-colors">For Teams</a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/sign-up-login-screen" className="hidden sm:block text-sm text-slate-400 hover:text-white transition-colors px-3 py-2">Log In</Link>
              <Link href="/sign-up-login-screen" className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all duration-150 active:scale-95">
                Get Started Free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background gradient + mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/50 to-purple-950/30" />
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(168,85,247,0.12) 0%, transparent 50%)'}} />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Overline chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            AI-Powered Learning Platform
          </div>

          {/* H1 */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
            <span className="text-white">Learn Smarter.</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Grow Faster.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Your AI tutor knows your learning style, fills your knowledge gaps, and keeps you motivated — from your first lesson to your last certificate.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/sign-up-login-screen" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-2xl text-base transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-500/25">
              Get Started Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href="#demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold rounded-2xl text-base transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Watch Demo
            </a>
          </div>

          {/* Trust stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">⭐</span>
              <span className="text-slate-300 font-medium">4.9/5</span>
              <span>from 18,000+ reviews</span>
            </div>
            <span className="hidden sm:block text-slate-700">·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-green-400">●</span>
              <span className="text-slate-300 font-medium">100,000+</span>
              <span>active learners</span>
            </div>
            <span className="hidden sm:block text-slate-700">·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-indigo-400">📚</span>
              <span className="text-slate-300 font-medium">500+</span>
              <span>expert courses</span>
            </div>
          </div>
        </div>

        {/* Hero bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* ─── TRUSTED BY ─── */}
      <section className="py-12 border-y border-white/5 bg-slate-950/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm text-slate-600 uppercase tracking-widest mb-8 font-medium">Trusted by learners from</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {['TCS', 'Infosys', 'HDFC Bank', 'Zomato', 'Razorpay'].map(company => (
              <span key={company} className="text-slate-600 font-semibold text-sm hover:text-slate-400 transition-colors">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">WHY LEARNFLOW AI</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Everything you need to learn,<br />grow, and succeed</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Powerful features designed for real-world learning outcomes — not just feature checkboxes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🤖',
                gradient: 'from-indigo-600/20 to-purple-600/20',
                border: 'border-indigo-500/20',
                iconBg: 'bg-indigo-500/20',
                iconColor: 'text-indigo-400',
                title: 'Your Personal AI Tutor',
                desc: 'Not a generic chatbot. An AI that\'s trained on your exact course content — answers questions, generates quizzes, and creates personalized study plans based on what you\'re actually learning.',
                stat: '93% of learners find AI responses helpful',
              },
              {
                icon: '🎮',
                gradient: 'from-amber-600/20 to-orange-600/20',
                border: 'border-amber-500/20',
                iconBg: 'bg-amber-500/20',
                iconColor: 'text-amber-400',
                title: 'Gamification That Works',
                desc: 'XP points, levels, badges, daily quests, streak trackers, and global leaderboards. The psychology of engagement from the best games, applied to your education.',
                stat: '92% first-course completion rate',
              },
              {
                icon: '📜',
                gradient: 'from-emerald-600/20 to-teal-600/20',
                border: 'border-emerald-500/20',
                iconBg: 'bg-emerald-500/20',
                iconColor: 'text-emerald-400',
                title: 'Certificates That Matter',
                desc: 'Every certificate is blockchain-verified and directly shareable to LinkedIn. Employers can verify your skills instantly via QR code — no trust gap.',
                stat: 'Accepted by 500+ employers',
              },
            ].map((feature) => (
              <div key={feature.title} className={`relative group rounded-3xl bg-gradient-to-br ${feature.gradient} border ${feature.border} p-8 hover:scale-[1.02] transition-all duration-300`}>
                <div className={`w-14 h-14 ${feature.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{feature.desc}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {feature.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED COURSES ─── */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">FEATURED COURSES</p>
              <h2 className="text-4xl font-bold text-white">What will you learn today?</h2>
            </div>
            <Link href="/courses" className="hidden sm:flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
              Browse all 500+ courses
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => {
              const instructor = instructors.find(i => i.id === course.instructorId);
              return (
                <Link key={course.id} href={`/courses/${course.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${course.isFree ? 'bg-emerald-500/90 text-white' : course.includedInPro ? 'bg-indigo-500/90 text-white' : 'bg-slate-800/90 text-white'}`}>
                          {course.isFree ? 'Free' : course.includedInPro ? 'Pro' : ''}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/60 text-white backdrop-blur-sm">{course.level}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-xs text-indigo-400 font-medium uppercase tracking-wide mb-1.5">{course.category}</p>
                      <h3 className="text-sm font-semibold text-white leading-snug mb-3 line-clamp-2 group-hover:text-indigo-300 transition-colors">{course.title}</h3>

                      {/* Instructor */}
                      <div className="flex items-center gap-2 mb-3">
                        <img src={instructor?.avatar} alt={instructor?.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-xs text-slate-500">{instructor?.name}</span>
                      </div>

                      {/* Rating & Enrollment */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-amber-400 text-xs">★</span>
                          <span className="text-xs font-medium text-white">{course.rating}</span>
                          <span className="text-xs text-slate-600">({course.reviewsCount.toLocaleString()})</span>
                        </div>
                        <div className="text-right">
                          {course.isFree ? (
                            <span className="text-sm font-bold text-emerald-400">Free</span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-slate-600 line-through">₹{course.originalPrice?.toLocaleString()}</span>
                              <span className="text-sm font-bold text-white">₹{course.price.toLocaleString()}</span>
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
            <Link href="/courses" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium">
              Browse all 500+ courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section className="py-16 bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '100,000+', label: 'Active Learners' },
              { value: '500+', label: 'Expert Courses' },
              { value: '92%', label: 'Completion Rate' },
              { value: '4.9★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">LEARNER STORIES</p>
            <h2 className="text-4xl font-bold text-white">Learners love LearnFlow AI</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 p-7 transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6 text-[15px]">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30" />
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}{t.company ? ` · ${t.company}` : ''}, {t.location}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">{t.course}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-24 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">PRICING</p>
            <h2 className="text-4xl font-bold text-white mb-4">Simple pricing for every learner</h2>
            <p className="text-slate-400">No hidden fees. No confusing tiers. Start free, scale as you grow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipPlans.map((plan) => (
              <div key={plan.id} className={`relative rounded-3xl bg-slate-900/80 border-2 ${plan.popular ? 'border-indigo-500 shadow-xl shadow-indigo-500/20' : 'border-white/10'} p-7 flex flex-col`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold tracking-wide uppercase shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-500">{plan.tagline}</p>
                </div>
                <div className="mb-8">
                  {plan.monthlyPrice === 0 ? (
                    <div className="text-4xl font-bold text-white">Free <span className="text-base font-normal text-slate-500">forever</span></div>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold text-white">₹{plan.monthlyPrice.toLocaleString()}</span>
                      <span className="text-slate-500">/month</span>
                      <div className="text-sm text-emerald-400 mt-1">₹{plan.annualPrice}/mo billed annually</div>
                    </div>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.name} className="flex items-center gap-3 text-sm">
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${f.included ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>
                        {f.included ? '✓' : '×'}
                      </span>
                      <span className={f.included ? 'text-slate-300' : 'text-slate-600'}>{f.name}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up-login-screen" className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-150 ${plan.popular ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-sm text-slate-600">
            🔒 Secure payments via Razorpay · ✅ 14-day money-back guarantee · Cancel anytime
          </p>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 to-purple-950" />
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.3) 0%, transparent 70%)'}} />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Your learning journey<br />starts today.</h2>
          <p className="text-slate-400 text-lg mb-10">Join 100,000+ learners. Your first 6 courses are free. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-sm" />
            <Link href="/sign-up-login-screen" className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl text-sm transition-all duration-150 whitespace-nowrap">
              Create Free Account
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-600">Already have an account? <Link href="/sign-up-login-screen" className="text-indigo-400 hover:underline">Log in →</Link></p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/10 py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">L</div>
                <span className="font-bold text-white">LearnFlow AI</span>
              </Link>
              <p className="text-sm text-slate-600 leading-relaxed">AI-powered learning for everyone. Learn, grow, succeed.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Courses', 'Pricing', 'For Teams', 'Changelog'] },
              { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
              { title: 'Learn', links: ['Blog', 'Tutorials', 'Community', 'Help Center'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="text-sm text-slate-600 hover:text-slate-400 transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-700">© 2026 LearnFlow AI. All rights reserved. Made with ❤️ in India.</p>
            <div className="flex items-center gap-4">
              {['LinkedIn', 'Twitter/X', 'YouTube', 'Instagram'].map(s => (
                <a key={s} href="#" className="text-xs text-slate-700 hover:text-slate-500 transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
