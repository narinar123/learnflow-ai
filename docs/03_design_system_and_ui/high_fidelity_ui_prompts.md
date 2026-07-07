# High-Fidelity UI Design Prompts
**AI Learning & Member Management Platform — LearnFlow AI**
**Version:** 1.0 | **Date:** July 2026

---

## Design Style Guidelines (Apply to All Prompts)

All high-fidelity screens must follow these design directives:
- **Color Palette:** Dark mode first. Primary: Indigo `#6366F1`, Secondary: Purple `#A855F7`, Accent: Emerald `#10B981`, Amber `#F59E0B`. Background: `#0F172A` (deep navy). Surface: `#1E1E2E` (elevated card).
- **Typography:** Outfit font for headings (Bold 700+), Inter for body (Regular/Medium 400/500)
- **Style:** Modern Glassmorphism — cards have `rgba(255,255,255,0.08)` background, `1px solid rgba(255,255,255,0.12)` border, `blur(12px)` backdrop filter
- **Gradients:** Subtle linear gradients on hero elements and CTA buttons
- **Icons:** Lucide icon style (thin 1.5px stroke, 24px)
- **Shadows:** `0 8px 32px rgba(0,0,0,0.37)` for elevated elements
- **Animations:** Note where Framer Motion animations apply
- **Accessibility:** Minimum 4.5:1 contrast ratio for all text

---

## Group 1: Authentication Screens (All Platforms)

### HFD-AUTH-01 — iOS Splash Screen
```
Design a premium iOS splash screen (390×844px, iPhone 15 Pro) for "LearnFlow AI".
Background: Full-screen animated gradient from deep navy #0F172A to dark purple #1E1E2E with subtle geometric particle lines in indigo #6366F1 at 10% opacity.
Center: The app logo — a stylized "L" lettermark in a glassmorphism rounded square (80×80px), with a subtle indigo-to-purple gradient fill and soft glow. Below: "LearnFlow AI" wordmark in Outfit Bold 28px white. Below that: Tagline in Inter Regular 16px, color #94A3B8.
Bottom section (fixed): "Get Started" button (full width, indigo gradient, 56px height, 14px radius, with subtle glow shadow). Below: "I already have an account" text link in #94A3B8.
Safe area insets respected. Dynamic Island top space respected. Status bar white icons. No additional decorative elements. Clean, premium, spacious.
```

### HFD-AUTH-02 — iOS Register Screen
```
Design a premium mobile registration screen (390×844px).
Background: Deep navy #0F172A. 
Header: Back arrow (top left, white), "Create Account" in Outfit Bold 32px white, "Join 100,000+ learners" subtitle in Inter 15px #94A3B8.
Form section: Glassmorphism card (16px radius, rgba(255,255,255,0.05) background, 1px border rgba(255,255,255,0.1)). Inside: 
- "Email" label (Inter 13px weight 500, #94A3B8) above email input (48px height, Inter 15px white, subtle inner glow on focus)
- "Password" label + password input with eye icon (right side, grey)
- "Confirm Password" label + input field
- Password strength bar (4 segments: grey → red → orange → yellow → emerald)
CTA button: "Create Account" (full width, indigo gradient #4F46E5→#6366F1, 56px, 14px radius, Inter Bold 16px white, subtle indigo glow shadow).
Divider: "OR" with horizontal lines.
Social buttons: Google button (white outline, Google "G" logo, 52px) and Apple button (white fill, Apple logo).
Footer: "Already have an account? Log In" (grey + indigo link).
```

### HFD-AUTH-03 — OTP Verification Screen
```
Design a premium OTP verification screen (390×844px).
Background: Deep navy, same as register.
Top: Large indigo circle icon (80px) with a message/mobile icon inside (Lucide style, white).
Title: "Verify Your Account" Outfit Bold 28px white. Subtitle: "Enter the 6-digit code sent to priya@email.com" Inter 15px #94A3B8, with email in indigo color.
OTP input: 6 square boxes (48×56px each, 8px gap between), glassmorphism style, white text center, active box has indigo 2px border + glow.
Resend: "Resend in 00:28" in amber #F59E0B. When available: "Resend Code" as indigo link.
Auto-fill indicator: Small "Paste from clipboard" chip appears if clipboard contains 6-digit number.
CTA: "Verify" button (same style as register, disabled until 6 digits entered).
```

### HFD-AUTH-04 — Android Register Screen (Material You + Glassmorphism)
```
Design the same registration screen adapted for Android (360×800px, no Dynamic Island).
Use the same color palette but with 12dp card radius standard and 48dp touch targets per Material Design guidelines. Status bar: transparent with white icons.
Add a subtle floating label animation on inputs (label moves up on focus, Material style).
Same content and layout, adapted for Android conventions.
```

### HFD-AUTH-05 — iPad Login Screen
```
Design a premium iPad login screen (1024×1366px, iPad Pro 12.9").
Split-panel layout: Left panel (50% width): Full-height hero image/illustration — abstract gradient with floating course card mockups, testimonial quote overlay, badge icons floating around.
Right panel (50% width): White/light background (if light mode) or dark navy card. 
Centered login form: Logo at top, "Welcome back" heading, email + password fields, "Forgot Password?" link, "Log In" primary button, OR divider, social login buttons, Register link.
Clean, professional, spacious for tablet context.
```

### HFD-AUTH-06 — Web App Login Page (Desktop, 1280px)
```
Design a premium web app login page at 1280px width.
Background: Full-page animated gradient (dark navy). 
Center: Floating login card (480px wide, glassmorphism style, 24px radius, shadow xl).
Card content: Logo + "Welcome back" heading in Outfit Bold 32px + subtitle. Email input, password input, forgot password link. "Log In" full-width button. OR divider. Google + GitHub social buttons. Register link below.
Left and right of center card: Abstract 3D-style floating UI mockup illustrations of the platform (course cards, AI chat bubble, certificate) rendered in low-opacity outlines.
```

---

## Group 2: Onboarding Screens

### HFD-ONBD-01 — Role Selection (iOS)
```
Design a premium mobile onboarding screen for role/path selection (390×844px).
Background: Deep navy with subtle gradient.
Top: 5-dot progress indicator (dot 1 filled in indigo, rest empty white). "Step 1 of 5" caption.
Title: "How will you use LearnFlow?" Outfit Bold 28px white. 
Body: 2×2 grid of selection cards (glassmorphism, 16px radius):
- Card 1: Student icon (graduation cap, indigo) + "Student" bold + "Courses & certificates" small
- Card 2: Professional icon (briefcase, purple) + "Professional" bold + "Career upskilling" small
- Card 3: Job Seeker icon (target/compass) + "Job Seeker" bold + "Get hired fast" small
- Card 4: Trainer icon (presentation screen) + "Trainer" bold + "Teach & earn" small
Selected card state: indigo border (2px) + subtle indigo tint background + checkmark badge (top right).
Bottom: "Continue" indigo gradient button.
```

### HFD-ONBD-02 — Recommendations Preview (iOS)
```
Design a premium post-onboarding course recommendation reveal screen (390×844px).
Background: Dark with celebratory gradient overlay (indigo→purple) in top 30% area.
Top area: "🎉 We found 5 courses for you, Priya!" Outfit Bold 26px white. Small sparkle animation icons scattered.
Below: Horizontal scroll card row — show 3 visible course cards (glassmorphism), each with: gradient thumbnail placeholder (140×90px, 12px radius), course title (2 lines), category chip, and a "Why we picked this" chip in amber.
Bottom: "Start Learning" indigo gradient button + "Explore All" ghost link.
```

---

## Group 3: Dashboard Screens

### HFD-DASH-01 — Home Dashboard (iOS, Dark Mode)
```
Design a premium iOS home dashboard screen (390×844px, dark mode).
Background: Deep navy #0F172A. 
Top bar: User avatar circle (36px, left), "Good morning, Priya 🌅" Outfit SemiBold 20px white, notification bell with red dot badge (right).
Below top bar: Streak card (full width, glassmorphism, amber left accent border): Flame icon 🔥 (animated) + "14-day streak" bold white + "Goal: 15min today" subtext + progress bar (50% emerald fill).
"Continue Learning" section header: Continue Learning card (full width, glassmorphism): thumbnail left (80×60px, 10px radius, gradient placeholder) + "Python for Beginners" bold + "Chapter 3: Functions" small grey + "Progress: 45%" + emerald progress bar + "Resume" indigo chip button.
"Daily Quests" section: 3 quest rows (icon + title + "50 XP" amber badge + completion checkbox).
"Recommended for You" section: horizontal scroll of course cards (each 160px wide, glassmorphism, thumbnail + title + rating + enroll button).
Bottom: Floating tab bar with glassmorphism background, 5 tabs, active tab indigo icon + indicator dot.
```

### HFD-DASH-02 — Dashboard (Android, Light Mode)
```
Design the same dashboard adapted for Android light mode (360×800px).
Background: #F8FAFC (light grey). Cards: white with shadow-sm. Text: #0F172A.
Streak card: light version with amber tint background.
Maintain the same layout and sections but with light mode color tokens.
Use Material 3 bottom navigation bar style (no background blur, white surface, nav indicator pill).
```

### HFD-DASH-03 — Dashboard (Web, Desktop, Dark Mode, 1280px)
```
Design the web/desktop version of the home dashboard at 1280px width, dark mode.
Layout: 240px sidebar (dark #0F172A, nav items with active indigo highlight) + main content area.
Main content:
- Top: "Good morning, Priya" heading + search bar (center, glassmorphism) + notifications + avatar
- Row 1 (4 stat cards): Courses Completed | Learning Hours | Certificates | Streak
- Row 2 (2-column): Left: "Continue Learning" large card with progress. Right: "Daily Quests" card with 3 quests.
- Row 3: 4-column course recommendation cards grid
- Right panel (320px, collapsible): AI chat assistant preview pane
All glassmorphism. Framer Motion: cards fade up on scroll.
```

### HFD-DASH-04 — Dashboard (iPad, Landscape)
```
Design the iPad landscape dashboard (1366×1024px).
3-column layout: Left column (sidebar 280px) + center content (main 720px) + right panel (366px AI/notifications).
Premium glassmorphism surfaces. Adapted for tablet multi-tasking. Spacious padding.
```

---

## Group 4: Course Discovery Screens

### HFD-CRS-01 — Course Catalog (iOS)
```
Design a premium iOS course catalog/browse screen (390×844px, dark mode).
Top: Search bar (glassmorphism, magnify icon left, "Explore courses..." placeholder, filter icon right).
Below: Horizontal category chips scroll (rounded pills): All (active, indigo fill) + 6 other categories (grey outline, white text).
Course grid (2 columns): Course cards (glassmorphism, 16px radius, shadow):
- Thumbnail (16:9, gradient placeholder with category icon overlay)
- Level badge chip + Category chip (top-left of thumbnail)
- Title (Outfit SemiBold 15px, 2 lines)
- Rating: star icon + "4.8" + "(1.2k)" in grey
- Instructor name (small)
- Price or "Free" in emerald
- "Included in Pro" badge variant
Smooth infinite scroll indicator. Floating filter FAB (bottom right) if filter active.
```

### HFD-CRS-02 — Course Detail Page (iOS)
```
Design a premium course detail page (390×844px, full scroll).
Hero: 16:9 thumbnail (full width, gradient overlay at bottom, play button if preview video available).
Floating back button (top left, glassmorphism circle).
Content below hero:
- Title: Outfit Bold 24px white (2-line)
- Rating row: stars (amber) + "4.8" + "(2,341 reviews)" + "12,456 enrolled"
- Badges row: chips — "Beginner", "28 hours", "English", "Certificate"
- "What you'll learn" card (glassmorphism): 6 bullet items with emerald checkmarks
- Instructors row: avatar + name + rating + student count
- Description: expandable text block
- Tab navigation: Overview | Curriculum | Reviews
Sticky bottom bar (glassmorphism, blur): "₹599" (struck through "₹1,999") + "Enroll Now" full-width indigo button. "Included in Pro Plan" alternate state with emerald "Pro" badge.
```

### HFD-CRS-03 — Course Detail (Web Desktop, 1280px)
```
Design the course detail page for web desktop (1280px).
2-column layout: Left content (70%): Hero thumbnail, title, metadata, tabs, content area.
Right sidebar (30%, sticky): Enrollment card (glassmorphism, elevated): thumbnail, price, "Enroll" button, "Add to Wishlist" ghost button, features checklist (5 items), instructor quick info. Sticky at scroll while page scrolls.
Full responsive behavior annotated.
```

---

## Group 5: Lesson Player Screens

### HFD-LSN-01 — Video Lesson Player (iOS Portrait)
```
Design a premium video lesson player screen (390×844px, immersive dark).
Top section (16:9 ratio): Dark video area with semi-transparent control overlay:
- Top bar: back arrow + "Chapter 3: Functions" lesson title + settings gear
- Center: Play/pause button (large circle, white 50% opacity glass)
- Bottom of video: seek bar (thin, indigo fill, white circle thumb), timestamp left + duration right, fullscreen icon + CC icon + quality icon right
Below video: glassmorphism area:
- Breadcrumb: "Python for Beginners > Chapter 3 > Lesson 5"
- Lesson title: Outfit SemiBold 20px
- Tab row: Notes | Resources | AI Help (pill tabs, active indigo)
- "Notes" tab content: textarea placeholder with "Add a note..." prompt, format toolbar (B, I, bullet, timestamp)
Bottom: Progress "5 / 12 lessons" + "Mark Complete" emerald button.
```

### HFD-LSN-02 — Video Player (Landscape Fullscreen)
```
Design the landscape fullscreen video player (844×390px).
Immersive dark background. 
Control overlay (shown state):
- Top: back arrow + "Python for Beginners" course name + settings + PiP icon (all top bar)
- Bottom: progress bar (full width) + playback time + volume + speed (1x) + CC + fullscreen exit
- Center: ±10s back/forward tap zones (translucent arrows visible on tap)
Controls auto-hide animation after 3s of inactivity.
```

### HFD-LSN-03 — Lesson Player (Electron Desktop App, 1280px)
```
Design the desktop lesson player in Electron app (1280×800px).
Layout: Left sidebar (280px): course curriculum tree. Center (700px): video player. Right panel (300px): Notes editor always visible.
Video player: standard 16:9 with full set of controls. Below video: lesson title, transcript toggle button.
Notes panel: rich text editor with markdown support, auto-save indicator, export PDF button.
AI Help tab at bottom of right panel.
Glassmorphism cards, dark theme.
```

---

## Group 6: Quiz Screens

### HFD-QZ-01 — Quiz Question Screen (iOS)
```
Design a premium quiz question screen (390×844px, dark mode).
Top bar: "Q 4 of 10" left + "Exit" link right.
Timer bar: Full width, amber gradient fill, animating countdown, turns red at 30%.
Question card (glassmorphism, 16px radius, prominent):
- Question number badge (amber pill)
- Question text: Inter SemiBold 18px white, 2–3 lines
Answer options (4 cards stacked below, glassmorphism):
- Default: Glass card + radio circle left + option text
- Selected: Indigo border (2px) + indigo tint background + filled radio
- Correct (review mode): Emerald border + emerald tint + check icon
- Incorrect (review mode): Rose border + rose tint + X icon
"Next" indigo button (full width, bottom, disabled until selection).
```

### HFD-QZ-02 — Quiz Results Screen (iOS)
```
Design a premium quiz results celebration screen (390×844px).
Background: Celebratory gradient overlay (indigo to purple at top).
Center: Large circular progress ring (emerald color, 120px, shows "8/10" inside, Outfit Bold 36px).
Below ring: "Excellent! 🎉" in Outfit Bold 28px. "You scored 80%" subtext.
XP earned: "+" + "150 XP" in amber pill badge with coin icon.
Badge earned card (if applicable): Gold badge icon + "Quiz Ace" badge name + "New Badge!" chip.
Stats row (3 horizontal cards): Time Taken | Correct | Incorrect.
Buttons: "Review Answers" (secondary outline) + "Continue Course" (indigo gradient).
AI link: "Explain any wrong answer →" in grey.
Confetti particle animation overlay (celebratory, Framer Motion).
```

---

## Group 7: AI Assistant Screens

### HFD-AI-01 — AI Chat Drawer (iOS)
```
Design a premium slide-up AI assistant drawer (390×680px visible area, dark glassmorphism).
Drawer handle bar (centered, grey pill) at top.
Header: AI icon (sparkle/robot, indigo, 28px) + "AI Tutor" Outfit SemiBold 18px + "8/10 queries" amber small badge + X close button.
Quick suggestion chips: horizontal scroll — "Explain concept", "Generate quiz", "Study plan", "What's next?"
Chat area:
- User message: Right-aligned glass bubble (indigo tint) with Inter 15px white text + timestamp
- AI message: Left-aligned glass card (darker, 16px radius) with: AI icon avatar, markdown-rendered text (Inter 15px, line breaks, bold), action chips below ("Save to Notes", "Related course")
Typing indicator: 3 bouncing dots in AI avatar style
Bottom input: Glassmorphism input bar + send button (indigo) + mic icon.
```

### HFD-AI-02 — AI Chat (Web Desktop, Side Panel)
```
Design the persistent AI assistant side panel (320px wide, full height) for the web desktop layout.
Panel background: glassmorphism, dark surface.
Header: Title + query count + expand/collapse toggle.
Conversation history sidebar (collapsible, 200px left strip within panel): past conversation list.
Main chat area: message bubbles, same styling as mobile drawer.
Richer AI responses: code blocks with syntax highlighting (dark theme), tables, numbered lists.
Bottom: Multi-line input, send, attach file (PDF for context), voice.
```

---

## Group 8: Gamification Screens

### HFD-GAM-01 — Level-Up Celebration Screen
```
Design a full-screen level-up celebration overlay (390×844px).
Full-screen dark navy background.
Center: Massive animated badge/shield icon (120px) for the new level, with radial glow effect in indigo.
Title: "LEVEL UP!" Outfit Bold 40px, gradient text (indigo→purple).
New level: "Level 6 — Practitioner" Outfit Bold 24px, gold color.
XP bar: Full (100%) emerald glow state.
Reward section: "You unlocked:" + reward cards (AI Study Plan, Profile Frame, etc.).
Confetti + particle burst animation (Framer Motion, 2 seconds).
CTA: "Claim Rewards" indigo button + "Continue" ghost link.
```

### HFD-GAM-02 — Leaderboard Screen (iOS)
```
Design a premium leaderboard screen (390×844px, dark mode).
Tab filter: "Global | Course | Friends | Institution" pill tabs.
Top 3 podium section: Animated podium visualization — 3 user avatar circles (80px for #1, 64px for #2/#3) with gold/silver/bronze rings, username below, XP score. Number 1 position elevated.
Below podium: Ranked list (rank number + avatar 40px + name + XP + streak flame indicator).
User's own rank card: highlighted at bottom with indigo tint + "Your Rank: #247" label.
Weekly reset countdown: "Resets in 3 days, 14h" amber text at top.
```

### HFD-GAM-03 — Badge Detail Modal
```
Design a premium badge detail modal overlay (390×844px, modal on dark overlay).
Backdrop: rgba(0,0,0,0.8) + blur(8px).
Modal card (glassmorphism, 24px radius, centered, 80% width): 
- Large badge icon (80px, full color, with glow effect)
- Badge name: Outfit Bold 22px white
- Category chip (amber)
- Description: Inter 15px #94A3B8
- "Earned on: July 5, 2026" with calendar icon
- XP awarded: "+50 XP" gold badge
- "Share" button (secondary) + Close X button
```

---

## Group 9: Certificate Screens

### HFD-CERT-01 — Certificate Display & Download (iOS)
```
Design a premium certificate screen (390×844px, dark mode).
Celebration header: emerald gradient + "🎓 Certificate Earned!" Outfit Bold 26px.
Certificate card (full width, A4 proportion, premium design):
- Outer border: gold gradient frame (4px)
- Background: dark premium surface with subtle pattern
- Platform logo top center
- "Certificate of Completion" Outfit Bold 20px gold
- "This certifies that" regular text
- "Priya Sharma" Outfit Bold 36px white, emphasized
- "has successfully completed" regular
- "Python for Beginners" Outfit SemiBold 22px indigo
- Date: "July 5, 2026" | Instructor: "Dr. Rajan Mehta"
- QR code (bottom right, 48px)
- Unique ID: small text bottom center
Action buttons (below card): "Download PDF" (emerald) + "Share to LinkedIn" (blue) + "Copy link" (grey).
```

### HFD-CERT-02 — Certificate Gallery (Profile)
```
Design the certificates gallery screen (390×844px).
Header: "My Certificates" Outfit Bold 24px + filter/sort options.
Search bar (glassmorphism).
Certificate grid (2 columns): thumbnail previews with gradient border, course title, completion date, share icon.
Empty state: illustration (graduation cap) + "Complete a course to earn your first certificate" + "Browse Courses" CTA.
```

---

## Group 10: Admin Panel Screens

### HFD-ADM-01 — Admin Dashboard (Desktop, 1440px)
```
Design a premium admin dashboard at 1440px width, dark mode.
Left sidebar (240px): Platform logo + "Admin Panel" label. Nav items with icons: Dashboard (active, indigo left border), Users, Courses, Revenue, Notifications, Support, Settings. User info + logout at bottom.
Main content:
Top: "Dashboard" page title + "Last updated: 2 minutes ago" + "Export Report" button.
KPI row (5 cards, glassmorphism): DAU "2,341", MAU "48,200", MRR "₹18.4L", New Signups "234 today", Open Tickets "12".
Charts row: Revenue chart (left, 60%, bar chart with 30-day trend, indigo bars) + User Growth (right, 40%, area chart, purple).
Bottom: Data table "Recent Signups" — 5 rows with name, email, plan badge, join time, actions.
All glassmorphism surfaces. Premium typographic hierarchy.
```

### HFD-ADM-02 — User Management Table (Desktop)
```
Design a premium admin user management screen (1440px, dark mode).
Top: "Users" page title + "3,421 total" count + Search input (glassmorphism) + Filter button + Export CSV button + Invite User button.
Filters row: Role chip filters + Status chip filters (active, inline).
Data table (glassmorphism background, 1px row borders):
Header row: Checkbox, Name, Email, Role (badge), Plan (badge), Status (badge), Last Active, Actions
5 data rows with: avatar circle + real-looking name, email, role badge (color coded), plan badge (purple for Pro), status badge (emerald Active / rose Suspended), time ago text, Actions (View, Edit, •••)
Pagination: "Showing 1-20 of 3,421" + prev/next buttons.
```

---

## Group 11: Marketing Website Screens

### HFD-MKT-01 — Marketing Homepage (Desktop, 1280px)
```
Design a stunning, premium marketing homepage for LearnFlow AI at 1280px width.
Navigation: sticky, glassmorphism, logo left, links center (Features, Courses, Pricing, About), right: "Log In" ghost + "Get Started Free" indigo button.
Hero section: Large headline "Learn Smarter. Grow Faster." in Outfit Bold 64px, gradient text (indigo→purple). Subheadline Inter 20px #94A3B8. Two CTAs: "Start Free Today" indigo + "Watch Demo" white ghost with play icon. Right side: 3D perspective mockup of app screens (phone + tablet side by side, floating).
Animated counter bar: "100,000+ Learners | 500+ Courses | 50+ Instructors | 92% Completion Rate"
Features section: "Why LearnFlow AI?" heading. 3 feature cards (glassmorphism): AI Personalization, Gamification, Cross-Platform. Each with icon (gradient), title, description.
Testimonials: 3 cards with user photos, quotes, star ratings, name + occupation.
Course preview grid: "Top Courses" — 4 course cards.
App download section: "Learn on any device" + App Store + Play Store badges + device mockup.
Footer: full-width dark footer with 4-column link grid, social icons, copyright.
Framer Motion: hero entrance animation, scroll-triggered fade-up sections.
```

### HFD-MKT-02 — Marketing Homepage (Mobile, 390px)
```
Design the mobile version of the marketing homepage (390×844px).
Hamburger menu navigation (top right). Full-width sections stacked vertically. Hero: headline 36px, device mockup below (scaled). Features: vertical card stack. CTA buttons full width.
Optimized for portrait mobile viewing.
```

### HFD-MKT-03 — Pricing Page (Desktop, 1280px)
```
Design a premium pricing page at 1280px.
Header: "Simple, Transparent Pricing" Outfit Bold 48px + "Annual plans save 20%" subtitle. Toggle: Monthly/Annual.
3-plan card row (Free, Pro [highlighted, shadow.glow.primary, "Most Popular" chip], Premium).
Each card: Plan name, price large, billing period, divider, 8 feature rows with green checks/grey X.
Pro card: indigo gradient border, elevated, slightly larger.
Feature comparison table below cards: full 30-row feature comparison.
Enterprise band: dark glassmorphism banner "Need more? Talk to our team" + "Contact Sales" button.
FAQ accordion: 6 questions.
Trust badges: "14-day free trial", "Cancel anytime", "SOC2 compliant".
```

---

## Figma Export Specifications

When creating these screens in Figma:
- **Frame naming:** `[Platform]-[Screen]-[State]` (e.g., `iOS-Dashboard-Dark`, `Web-Login-Error`)
- **Export:** All screens at 2× for mobile, 1× for web/desktop
- **Component library:** All reusable elements extracted as named components
- **Variants:** Create variants for each state (Default, Hover, Active, Disabled, Error, Loading)
- **Auto Layout:** All frames and components use Auto Layout for scalability
- **Design Tokens:** All colors, typography, spacing use styles linked to the design system (not hard-coded)
- **Developer Handoff:** Include "Inspect" notes with: spacing values, hex colors, font weights, corner radii, opacity values for glassmorphism backgrounds
