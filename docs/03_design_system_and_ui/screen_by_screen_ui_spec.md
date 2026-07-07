# Screen-by-Screen UI Specification
**AI Learning & Member Management Platform — LearnFlow AI**
**Version:** 1.0 | **Date:** July 2026

---

## Overview

This document specifies the layout, content, and interaction requirements for every screen in the platform, organized by section. Each screen spec includes:
- **Purpose:** Why this screen exists
- **Layout:** Structural breakdown
- **Key Elements:** Required UI components
- **States:** Empty, loading, error, success variants
- **Interactions:** Tap/click, swipe, scroll behaviors
- **Responsive Notes:** Differences between mobile, tablet, web, and desktop

---

## 1. Authentication Screens

### 1.1 Splash Screen
**Purpose:** Brand reinforcement and routing (returning vs new user)

**Layout (Mobile):**
- Full-screen gradient background: `primary.600` → `secondary.500` (top-left to bottom-right)
- Center: Animated logo (scale-in 0.8→1, 600ms spring) + wordmark "LearnFlow AI"
- Sub-text: Tagline fades in 400ms after logo
- Bottom: "Get Started" (primary button) + "Log In" (ghost button)
- Loading indicator: Bottom progress bar if checking auth state

**Key Elements:**
- Animated logo SVG (Framer Motion)
- Hero gradient background
- Two action buttons
- Background particle animation (subtle floating orbs)

**States:**
- Auto-login: If valid refresh token exists → skip to Dashboard (no user interaction)
- New user: Show full splash with CTAs
- Network error: Show offline banner, retry button

**Responsive:** On web/desktop, center column (480px) with left/right decorative visual panels

---

### 1.2 Register Screen
**Purpose:** New user account creation

**Layout:**
- Header: "Create your account", back arrow
- Form: Email input → Password input → Confirm password → "Create Account" button
- OR divider
- Social: "Continue with Google" + "Continue with Apple" (iOS only)
- Footer: "Already have an account? Log In" link
- Legal: "By registering, you agree to our Terms & Privacy Policy" (12px below button)

**Key Elements:**
- Email input with real-time validation (format check)
- Password strength indicator (5 levels: very weak → very strong)
- Show/hide password toggle
- Primary CTA: "Create Account" (disabled until all fields valid)
- Social auth buttons with brand logos

**States:**
- Default: Empty form
- Validating: Input borders show validation state
- Error: "This email is already registered. Log In?" inline error
- Success: Transition to OTP screen

**Interactions:**
- Form auto-scrolls to first error on submit
- Keyboard "Next" on email field moves focus to password

---

### 1.3 OTP Verification Screen
**Purpose:** Verify phone number or email ownership

**Layout:**
- Icon: Mobile/Email icon in colored circle
- Title: "Enter verification code"
- Subtitle: "We sent a 6-digit code to [email/phone]"
- OTP Input: 6 individual character boxes side-by-side
- Resend: "Didn't receive it? Resend in 00:28" (countdown timer)
- Change method: "Use a different email" link

**Key Elements:**
- 6-box OTP input component (auto-advance on each digit, auto-submit on last digit)
- Countdown timer for resend
- Auto-paste from clipboard/SMS (iOS/Android)

**States:**
- Default: Empty boxes
- Filling: Character by character highlight
- Error: Boxes turn red, "Incorrect code. 2 attempts remaining"
- Expired: "Code expired. Tap resend." timer shows 0:00
- Success: Green checkmark animation → navigate to next step

---

### 1.4 Login Screen
**Purpose:** Returning user authentication

**Layout:**
- Title: "Welcome back"
- Form: Email/Phone input → Password input → "Log In" button
- "Forgot Password?" link (right-aligned below password)
- OR divider
- Social login buttons
- Footer: "New here? Create an account" link

**States:**
- Default, validating, locked (after 5 failures with countdown), success

---

### 1.5 Forgot / Reset Password
**Step 1:** Email entry → "Send Reset Link" button
**Step 2:** "Check your email" confirmation screen, resend option
**Step 3:** New password form (from email link) → success → auto-login

---

## 2. Onboarding Screens

### 2.1 Role Selection
**Layout:**
- Progress: 1/5 progress dots
- Title: "How will you use LearnFlow AI?"
- Grid: 2×2 card grid, each card has icon + title + short description
- Cards: Student, Professional, Job Seeker, Trainer
- CTA: "Continue" (enabled after selection)

**Interactions:**
- Card tap: instant selection highlight (border + background tint)
- Only 1 selection allowed; selecting new deselects old

---

### 2.2 Goal Selection
**Layout:**
- Progress: 2/5 dots
- Title: "What's your main goal?"
- Grid: 2×3 visual goal cards (icon + short label)
- Select up to 2 goals
- Skip link bottom

---

### 2.3 Interest Category Selection
**Layout:**
- Progress: 3/5 dots
- Title: "What topics interest you?"
- Wrapping chip grid (3 columns on mobile)
- Chips: icon + category name
- Counter: "Select at least 2 (X selected)"
- Selected chips: filled with `primary.500`

---

### 2.4 Schedule / Daily Goal
**Layout:**
- Progress: 4/5 dots
- Title: "How much time can you dedicate daily?"
- Row of 5 option buttons: "5 min", "15 min", "30 min", "1 hour", "Let AI decide"
- Visual time analogy below selection ("That's like 1 TED Talk a day")
- Skip link

---

### 2.5 Profile Setup
**Layout:**
- Progress: 5/5 dots
- Avatar circle with "+" add photo icon
- Name input field (required)
- Age range dropdown (optional)
- CTA: "Complete Setup"
- Skip: "Skip for now" (photo and age only)

---

### 2.6 Recommendations Preview (Post-Onboarding)
**Layout:**
- Full-screen celebration background
- "We found 5 courses for you, [Name]!" title
- Horizontal scroll of 5 course cards
- Each card: Thumbnail + title + "Why we picked this" chip
- Primary CTA: "Start Learning" (enrolls in top recommended course)
- Secondary: "Explore All Courses"

---

## 3. Home / Dashboard

### 3.1 Dashboard (Learner)
**Layout (Mobile):**
- Top: Greeting ("Good morning, Priya! 🌅") + notification bell + avatar
- Banner: Streak widget (flame icon + day count + daily goal progress bar)
- Section: "Continue Learning" — single course card (large, with progress %)
- Section: "Daily Quests" — 3 quest chips with XP value + completion state
- Section: "Recommended for You" — horizontal scroll of 5 course cards
- Section: "New Courses" — horizontal scroll
- Section: "Trending Now" — horizontal scroll
- Bottom: Tab bar navigation

**Layout (Web/Desktop):**
- Left sidebar navigation (240px)
- Main content: 3-column grid (macOS-style dashboard)
- Right panel: AI assistant quick-open, upcoming reminders

**States:**
- New user: "Start your first course" hero CTA
- Active learner: Current course progress prominent
- All courses complete: "Explore more" → course catalog

**Interactions:**
- Pull-to-refresh (mobile)
- Course card tap → course detail page
- Streak widget tap → gamification overview

---

## 4. Course Screens

### 4.1 Course Catalog / Browse
**Layout:**
- Search bar (top, sticky) with filter icon
- Category horizontal scroll chips below search
- Course grid: 2 columns (mobile), 3 columns (tablet), 4 columns (desktop)
- Sort: Newest, Most Popular, Highest Rated, Price

**Filters (Bottom Sheet / Side Panel):**
- Level: Beginner, Intermediate, Advanced
- Duration: < 1h, 1–5h, 5–10h, 10h+
- Rating: 3★+, 4★+, 4.5★+
- Price: Free, Paid, My Plan Includes
- Category: multi-select
- Apply + Clear buttons

**States:**
- Loading: Skeleton cards (shimmer animation)
- No results: Illustration + "Try different keywords" + CTA
- Network error: Retry button

---

### 4.2 Course Detail Page
**Layout:**
- Hero image/video thumbnail (16:9, full width)
- Title (h1), instructor line, star rating + review count, enrollment count
- Tab navigation: Overview | Curriculum | Reviews | Instructor
- Sticky bottom bar: Price / "Enroll Free" CTA (or "Included in Pro" badge)
- Badges row: Level, Duration, Language, Certificate, Last Updated

**Overview Tab Content:**
- "What you'll learn" checklist (5–8 items)
- Description text (expandable "Show more" if > 3 lines)
- Requirements/prerequisites
- Target audience

**Curriculum Tab Content:**
- Section accordions → Lesson list
- Each lesson: type icon + title + duration + lock icon if not enrolled
- Free preview lessons: "Preview" chip

**Reviews Tab Content:**
- Overall rating (large) + breakdown bars (5★ → 1★)
- Review cards: avatar + name + date + star + text
- "See all reviews" link

**Instructor Tab:**
- Large avatar + bio + course count + student count + rating

---

### 4.3 My Courses (Library)
**Layout:**
- Tabs: In Progress | Completed | Wishlist
- Course cards with progress bars (in progress), completion date (completed)
- Search within library
- Sort: Recently Accessed, Alphabetical, Progress %

---

## 5. Lesson Player

### 5.1 Video Lesson Player
**Layout (Portrait Mobile):**
- Video player: 16:9 top area
- Controls overlay: play/pause, seek bar, timestamp, fullscreen, settings
- Below player: lesson title, course breadcrumb
- Tabs: Notes | Resources | AI Help
- Bottom: "Mark as Complete" + "Next Lesson" button

**Video Controls:**
- Double-tap left/right: ±10 seconds
- Single tap: show/hide controls (3s auto-hide)
- Long press: playback speed menu
- Settings: Quality (Auto/720p/480p/360p), Playback speed, Captions toggle
- PiP (Picture-in-Picture) mode: floating window while using other app

**Fullscreen (Landscape):**
- Immersive player, controls overlay
- Gesture: swipe down to exit fullscreen

**Desktop / Web:**
- Side panel: Chapter list (left), Notes (right, collapsible)
- No bottom sheet; lesson title in header

**States:**
- Buffering: spinner overlay, video paused
- Error: "Video unavailable" with retry
- Completed: checkmark overlay, auto-advance countdown (5s) to next lesson
- Offline: plays from local storage, offline indicator chip

---

### 5.2 PDF / Document Lesson
- PDF rendered inline using native PDF viewer (no browser launch)
- Scroll navigation
- Zoom: pinch-to-zoom (mobile), +/- buttons (web)
- Page count indicator
- Download button (Pro plan users)

---

### 5.3 Notes Panel
- Markdown-lite text editor (bold, italic, bullet list, heading)
- Auto-saves every 30 seconds
- "Copy lesson timestamp" button (inserts [4:32] marker in note)
- Export: "Download notes as PDF" 
- All notes searchable in Profile → Notes section

---

## 6. Quiz & Assessment Screens

### 6.1 Quiz Intro Screen
**Layout:**
- Course + quiz name header
- Info cards: Question count, Time limit, Passing score, Attempts remaining
- "Start Quiz" button
- "Review materials first" link (goes back to lesson)

### 6.2 Quiz Question Screen
**Layout:**
- Question counter: "Question 3 of 10"
- Timer bar (top, full width, shrinks left→right, turns red at 20%)
- Question card: question text + optional image
- Options list: radio buttons (MCQ) or checkboxes (multi-select) or text input (fill-blank)
- "Next" button (disabled until answer selected)
- "Skip" button (available for non-required quizzes)

**Interactions:**
- Option tap: immediate visual selection
- "Next" → auto-advance; "Back" if previous navigation enabled
- Timer expired: auto-submit current answer, move to next or submit quiz

### 6.3 Quiz Results Screen
**Layout:**
- Large circular score indicator (correct/total) with pass/fail color
- Grade message: "Excellent! 🎉" / "Good Job!" / "Keep Practicing"
- XP awarded: amber pill badge (animated in)
- Badge earned notification (if criteria met)
- Stats: Time taken, Correct / Incorrect, Skipped
- Action buttons: "Review Answers" | "Retry" (with cooldown timer if active) | "Continue Course"
- AI explanation prompt: "Get AI to explain any answer →"

### 6.4 Answer Review Screen
- All questions listed with: your answer, correct answer, correct/incorrect indicator
- "Explain this" button per question → opens AI panel with explanation
- Filter: "Show incorrect only"

---

## 7. AI Assistant

### 7.1 AI Chat Interface
**Layout (Mobile — Slide-up Drawer):**
- Handle bar at top
- Header: "LearnFlow AI" + query quota (e.g., "12/50 queries today")
- Chat message list (scroll)
- User message: right-aligned bubble, primary tint
- AI message: left-aligned bubble, glass card style, with "Explain more" and "Related course" chips
- Input: text field + send button + voice button
- Quick suggestions: horizontal scroll of 4 pre-set prompts ("Explain this concept", "Give me a quiz", "Study plan", "What's next?")

**Layout (Web/Desktop — Side Panel):**
- Persistent right panel (320px wide, collapsible)
- Full conversation history
- History sidebar: past 10 conversations

**AI Response Features:**
- Markdown rendering (bold, code blocks, lists)
- "Copy response" button
- "This is helpful / Not helpful" thumbs up/down
- "Save to Notes" option
- Source citation: "Based on [Lesson Name] in [Course Name]"

**States:**
- Typing indicator: animated 3-dot bubble
- Error: "Something went wrong. Try again" with retry
- Quota reached (free plan): "You've used all 10 daily queries. Upgrade to Pro for unlimited AI" 
- Off-topic refusal: Friendly message with redirect

---

## 8. Progress & Analytics

### 8.1 Progress Dashboard
**Layout:**
- Top: Level badge + XP bar (current → next level)
- Stats row: Courses Completed | Lessons Done | Hours Learned | Certificates Earned
- Current streak widget
- Weekly learning chart (bar graph, 7 days)
- Enrolled courses with individual progress bars
- Recent activity feed

### 8.2 Badge Collection
- Grid of all badges (earned: full color; unearned: greyed out with "?" icon)
- Tap badge: modal with description, criteria, date earned
- Progress on near-completion badges: "2/5 reviews written"

### 8.3 Leaderboard
- Tab selector: Global | Course | Friends | Institution
- Rank list: user avatar + name + XP + rank number
- User's own rank: sticky at bottom if not in top 10
- Reset timer: "Resets in 3 days 14h"

---

## 9. Membership & Payments

### 9.1 Membership Plans Page
**Layout:**
- Toggle: Monthly / Annual (annual shows "Save 20%" badge)
- Plan cards (vertical stack mobile, horizontal desktop):
  - Plan name, price, billing period
  - Feature checklist (✓ included, ✗ not included)
  - "Current Plan" badge (if active)
  - CTA: "Upgrade" / "Start Free Trial" / "Contact Sales"
- "Most Popular" badge on Pro plan
- FAQ section at bottom
- "Money-back guarantee" trust badge

### 9.2 Payment Screen
**Layout:**
- Order summary: Plan name, price, discount applied, total
- Payment method selector: UPI (Razorpay), Card, Net Banking, Wallet
- UPI: Enter UPI ID field or "Pay with GPay/PhonePe" app buttons
- Card: Card number, expiry, CVV, name
- "Pay ₹[amount]" button (disabled until valid payment info)
- Security badges: "256-bit SSL" + Razorpay logo
- Terms: "By subscribing, you agree to automatic renewal. Cancel anytime."

### 9.3 Payment Success Screen
- Full-screen celebration animation (brief)
- "You're now on Pro! 🎉"
- List of 5 unlocked features
- CTA: "Start Exploring" → Dashboard

### 9.4 Billing History
- List of all transactions: date, description, amount, status, "Download Invoice" link
- Filter by date range
- Export as PDF/CSV

---

## 10. Notifications

### 10.1 Notification Center
**Layout:**
- "All" | "Learning" | "Achievements" | "Offers" tab filter
- Notification cards: icon + title + description + timestamp + "Mark as read"
- Unread: slightly highlighted background
- Empty state: "You're all caught up!" illustration

### 10.2 Notification Settings
- Toggle groups: Learning reminders, Streak alerts, Achievements, New courses, Offers & Promotions
- Quiet hours: Do not disturb time range
- Email digest: Daily / Weekly / Never

---

## 11. Support

### 11.1 Help Center
**Layout:**
- Search bar: "How can we help you?"
- Category cards: Payment, Course Access, Technical, Account, AI Assistant
- Popular articles list
- "Contact Support" floating button

### 11.2 Submit Support Ticket
**Fields:**
- Category: dropdown
- Subject: text field
- Description: textarea (min 20 chars)
- Attachment: optional file upload
- Priority: Low / Medium / High (based on issue type)
- CTA: "Submit Ticket"

### 11.3 My Tickets
- List with: ticket ID, subject, status badge (Open/In Progress/Resolved), last updated
- Tap ticket → conversation thread view
- Reply field at bottom
- CSAT survey when ticket resolved

---

## 12. Profile

### 12.1 Profile Page
**Layout:**
- Hero: Cover background gradient + avatar + name + level badge + join date
- Stats row: Courses | Hours | Certificates | Streak
- Sections: About, Interests, Certificates, Badges
- Edit Profile button

### 12.2 Certificate Gallery
- Grid of earned certificates (thumbnail preview)
- Tap certificate: detail view with Download, Share to LinkedIn, Copy link options
- Verification QR code visible in detail view

### 12.3 Settings & Privacy
- Account: Email, phone, password, linked accounts
- Preferences: Language, theme (Dark/Light/System), notification settings
- Privacy: Download my data, Delete account
- About: App version, Terms, Privacy Policy, Open source licenses

---

## 13. Trainer Panel

### 13.1 Trainer Dashboard
**Layout (Web/Desktop primary):**
- Sidebar navigation: Dashboard, My Courses, Course Builder, Students, Earnings
- KPI row: Total Students | Active This Month | Avg. Completion % | Total Earnings
- Revenue chart (monthly bar graph)
- Top performing courses list
- Recent student activity feed

### 13.2 Course Builder
**Step 1: Course Details**
- Title field (required)
- Short description (100–200 chars) — used in catalog cards
- Long description (rich text editor: bold, italic, bullet, heading)
- Category selector (required)
- Level: Beginner / Intermediate / Advanced
- Language
- Thumbnail upload (minimum 1280×720px)
- Promotional video (optional, max 3 min)
- Prerequisites: multi-select from platform course list
- Tags: freeform chips, max 10

**Step 2: Curriculum Builder**
- Section accordion structure (add sections with drag handle)
- Within section: add lessons (drag to reorder)
- Lesson types: Video, PDF, Text, Quiz
- Each lesson: title + description + content upload/create + free preview toggle
- Quiz lesson: inline quiz builder (add questions, options, correct answer, explanation)

**Step 3: Pricing**
- Free / Paid toggle
- If paid: price input (INR and/or USD)
- Discount: optional original price to show strike-through

**Step 4: Review & Submit**
- Preview in learner view
- Checklist: all required fields filled
- "Submit for Review" button → triggers content review workflow

### 13.3 Student Analytics (Per Course)
- Enrollment trend chart
- Completion funnel: Enrolled → Started → 50% → 100%
- Drop-off analysis: lesson with highest abandon rate highlighted
- Quiz performance: average score per quiz
- Student list with individual progress and last active date

---

## 14. Admin Panel

### 14.1 Admin Dashboard
**Layout:** Full desktop layout, sidebar + main content
- KPI cards row: DAU, MAU, MRR, New Signups Today, Active Subscriptions, Open Tickets
- Real-time activity feed (websocket updates)
- Quick action buttons: "Send Notification", "Export Report", "Review Content Queue"
- Charts: Revenue trend (30 days), User growth, Course enrollment heatmap

### 14.2 User Management
- Data table: name, email, role, plan, status, join date, last active
- Search + filter (role, plan, status, date range)
- Row actions: View, Edit Role, Suspend, Delete
- Bulk actions: Export, Send notification, Change plan
- User detail view: full profile, activity timeline, payment history, tickets

### 14.3 Content Management
- Course queue: Pending Review | Published | Rejected | Flagged
- Quick review panel: preview + approve/reject/feature + notes to trainer
- Batch approval option

### 14.4 Payment & Revenue
- Transaction log with: date, user, type, amount, status, gateway reference
- Revenue dashboard: MRR, ARR, Average ARPU, Churn, LTV
- Payout management: trainer earnings, initiate payouts
- Export: CSV / PDF for accounting

### 14.5 Notification Composer
- Target segment: All Users, Plan type, Role, Last active date range, Course enrollment
- Estimated reach counter (updates live as filters applied)
- Notification types: Push, In-app, Email
- Message: title (50 char), body (150 char), CTA link
- Schedule: Now or date/time picker
- A/B test option (2 message variants)

---

## 15. Marketing Website Screens

### 15.1 Home / Landing Page
**Sections (top to bottom):**
1. **Hero:** Animated headline, subheadline, "Get Started Free" + "See Demo" CTAs, hero device mockup
2. **Social Proof:** Logos of featured companies/institutions + "Join 100,000+ learners" counter
3. **Key Features:** 3-column feature cards with icons and short descriptions
4. **How It Works:** Numbered step diagram (Register → Learn → Earn Certificate)
5. **Course Highlights:** Featured course cards grid
6. **Testimonials:** Carousel with user photos, quotes, star ratings
7. **Pricing Teaser:** Simplified plan comparison, "See all plans" link
8. **App Download:** iOS App Store + Google Play badges + QR code
9. **CTA Banner:** "Start learning for free today" with email capture
10. **Footer:** All links, social media, legal

### 15.2 Features Page
- Each feature gets a dedicated section with: headline, description, device mockup animation, stats (e.g., "40% higher completion rates")

### 15.3 Pricing Page
- Full plan comparison table
- Annual/Monthly toggle
- FAQ accordion
- Enterprise CTA: "Contact Sales" form

### 15.4 About Page
- Mission statement, founding story
- Team section (avatars + roles)
- Values cards
- Press mentions

---

## Responsive Notes Summary

| Screen | Mobile (375px) | Tablet (768px) | Web (1280px) | Desktop/Electron (1440px) |
|---|---|---|---|---|
| Navigation | Bottom tab bar | Side tabs or top nav | Top nav bar | Sidebar (240px) |
| Course Grid | 2 columns | 3 columns | 4 columns | 4-5 columns |
| Lesson Player | Full width, portrait | Split: player + notes | Side-by-side | Side panel always visible |
| Admin Panel | Not designed for mobile (tablet+) | 2-column layout | Full 3-panel | Full 3-panel |
| AI Assistant | Slide-up drawer (90% height) | Side panel (320px) | Persistent right panel | Persistent right panel |
| Dashboard | Single column, cards stacked | 2-column card grid | 3-column dashboard | 3-column with right panel |
