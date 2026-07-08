---
type: concept
title: "Low-Fidelity Wireframe Prompts"
source: /03_design_system_and_ui/low_fidelity_wireframe_prompts/
path: /03_design_system_and_ui/low_fidelity_wireframe_prompts/
updated: 2026-07-07
okf:
  generated_by: "@docmd/plugin-okf"
  generated_at: "2026-07-07T15:59:27.357Z"
---
# Low-Fidelity Wireframe Prompts
**AI Learning & Member Management Platform — LearnFlow AI**
**Version:** 1.0 | **Date:** July 2026

---

## How to Use These Prompts

These prompts are designed for AI design tools (Figma AI, Galileo AI, Visily, Uizard, Midjourney, DALL·E) and Figma FigJam rapid wireframing workflows. Use them in sequence to build out the full wireframe set for the platform. All wireframes should:
- Be in grayscale only (no color)
- Use placeholder text ("Lorem Ipsum" or "[Course Title]")
- Show structural hierarchy clearly
- Include navigation elements
- Mark interactive elements with simple annotations

---

## Group 1: Authentication & Onboarding Wireframes

### Prompt 1.1 — Splash Screen
```
Create a low-fidelity mobile wireframe (375×812px, iPhone frame) for an app splash screen.
Layout: Full-screen centered layout with a placeholder logo box at center (80×80px), a wordmark text placeholder below it, a tagline text line below that, and two stacked button rectangles at the bottom (primary button "Get Started" and ghost button "Log In"). 
Add a subtle placeholder background pattern or lines. 
Use only grayscale. No color. Label all elements.
```

### Prompt 1.2 — Register Screen
```
Create a low-fidelity mobile wireframe (375×812px) for a user registration form screen.
Layout: Back arrow top left. Title "Create Account" (large text). Below: email input field, password input field with eye icon on right, confirm password field. Primary button "Create Account" full width. Horizontal "OR" divider. Two social login buttons stacked (Google icon placeholder, Apple icon placeholder). Footer text "Already have an account? Log In".
Use only grayscale. Show field labels above each input. Mark the submit button as primary with darker fill.
```

### Prompt 1.3 — OTP Verification
```
Create a low-fidelity mobile wireframe for an OTP verification screen.
Layout: Large icon at top (phone/email icon circle placeholder). Title "Enter verification code". Subtitle text "Sent to [email@example.com]". Six square input boxes side by side in a row (OTP input). Below: resend countdown text "Resend in 00:28". Skip link at bottom.
Use only grayscale.
```

### Prompt 1.4 — Onboarding Step 1: Role Selection
```
Create a low-fidelity mobile wireframe for an onboarding role selection screen.
Layout: Progress indicator at top (5 dots, 1 filled). Title "How will you use the app?". 2×2 grid of selection cards, each card has: a square icon placeholder, a title, and 1 line of description text. Cards have a border. "Continue" primary button at bottom. Skip text link.
Use only grayscale.
```

### Prompt 1.5 — Onboarding Step 2: Goal Selection
```
Create a low-fidelity mobile wireframe for a goal selection screen.
Layout: Progress dots (2 of 5 filled). Title "What's your main goal?". 2×3 grid of goal cards (icon placeholder + label). Multiple selection allowed. "Continue" primary button. Skip link.
Grayscale only.
```

### Prompt 1.6 — Onboarding Step 3: Interest Selection
```
Create a low-fidelity mobile wireframe for topic/interest selection.
Layout: Progress dots (3/5). Title "What topics interest you?". Wrapping chip grid of 12 chips with labels (Technology, Design, Business, Finance, etc.). Chips are rounded rectangles. Selected state: darker fill. Counter: "3 selected (min 2)". Continue button.
Grayscale only.
```

### Prompt 1.7 — Onboarding Step 4: Daily Schedule
```
Create a low-fidelity mobile wireframe for a daily learning schedule setup screen.
Layout: Progress dots (4/5). Title "How much time per day?". Row of 5 option buttons (pill shape): "5min", "15min", "30min", "1hr", "AI Pick". One selected state shown. Descriptive text below selection. Continue button.
Grayscale only.
```

### Prompt 1.8 — Onboarding Step 5: Profile Setup
```
Create a low-fidelity mobile wireframe for profile setup.
Layout: Progress dots (5/5). Large circular avatar placeholder with "+" add icon. Name text input below. Age range dropdown field. "Complete Setup" primary button. "Skip for now" link.
Grayscale only.
```

### Prompt 1.9 — Personalized Recommendations Preview
```
Create a low-fidelity mobile wireframe for a post-onboarding course recommendation screen.
Layout: Celebratory header area with sparkles/stars placeholder icons. Title text "We found courses for you!" Horizontal scroll row of 5 course cards (each: rectangle thumbnail + title text + small chip tag). "Start Learning" primary button. "Explore All Courses" secondary link.
Grayscale only.
```

---

## Group 2: Dashboard & Navigation Wireframes

### Prompt 2.1 — Dashboard (Home Screen)
```
Create a low-fidelity mobile wireframe for a learning app home/dashboard screen.
Layout from top to bottom:
- Top bar: avatar circle (left), title "Good morning [Name]", bell icon (right)
- Streak banner card: flame icon + "7 day streak" + goal progress bar
- Section "Continue Learning": single large course card with progress bar
- Section header "Daily Quests" with "See all" link: 3 small quest item rows
- Section header "For You": horizontal scroll of 3 course cards (each: thumbnail rectangle + title + rating)
- Section header "New Courses": horizontal scroll of 3 course cards
- Bottom: tab bar with 5 icons (home, courses, AI robot, chart, person)
Grayscale only. Label each section.
```

### Prompt 2.2 — Tab Bar Navigation
```
Create a low-fidelity wireframe showing the bottom tab bar component for a mobile app.
5 tabs: Home (house icon), Courses (grid icon), AI (robot/sparkle icon), Progress (chart icon), Profile (person icon).
Active state: filled icon + label + indicator dot below. Inactive: outline icon + label.
Show at 375px width, 64px height. Grayscale.
```

### Prompt 2.3 — Dashboard (Web/Desktop Layout)
```
Create a low-fidelity wireframe for a web app dashboard in 1280px width.
Layout: 
- Left: sidebar 240px with logo at top + 8 nav items listed vertically + user info at bottom
- Main area: 
  - Top: greeting + search bar + notification bell + avatar
  - 4 KPI stat cards in a row
  - 2-column grid: "Continue Learning" card (left) + "Daily Quests" card (right)
  - Full-width "Recommended Courses" section with 4 course cards in a row
Grayscale only.
```

---

## Group 3: Course Discovery Wireframes

### Prompt 3.1 — Course Catalog / Browse
```
Create a low-fidelity mobile wireframe for a course catalog/browse screen.
Layout:
- Top: search bar with filter icon
- Category horizontal scroll chips (6 visible: All, Technology, Design, Business...)
- 2-column course card grid below (each card: thumbnail rectangle 16:9, title text, rating, price tag)
- Filter icon leads to bottom sheet
Grayscale only.
```

### Prompt 3.2 — Filter Bottom Sheet
```
Create a low-fidelity mobile wireframe of a filter bottom sheet overlay.
Show: handle bar at top. "Filter Courses" title. Sections: Level (3 radio buttons), Duration (4 radio buttons), Rating (3 options with stars placeholder), Price (3 radio buttons). Two buttons at bottom: "Clear" (ghost) and "Apply Filters" (primary).
Grayscale only.
```

### Prompt 3.3 — Course Detail Page
```
Create a low-fidelity mobile wireframe for a course detail page.
Layout from top to bottom:
- Hero thumbnail image rectangle (16:9 ratio, full width)
- Course title (large text, 2 lines)
- Badges row: level badge, duration badge, language badge
- Rating row: stars placeholder + "1,234 ratings" + enrolled count
- Tab row: Overview | Curriculum | Reviews | Instructor
- Content area (Overview active): "What you'll learn" section with 5 bullet items, description text block
- Sticky bottom bar: price text + "Enroll Now" primary button
Grayscale only.
```

### Prompt 3.4 — Curriculum Tab (Course Detail)
```
Create a low-fidelity wireframe for the curriculum tab content within a course detail screen.
Show accordion sections: "Section 1: Introduction" (expanded, shows 3 lesson rows each with: play icon, title, duration). "Section 2: Core Concepts" (collapsed). "Section 3: Advanced" (collapsed with lock icon — locked content).
Grayscale only.
```

---

## Group 4: Lesson Player Wireframes

### Prompt 4.1 — Video Lesson Player (Portrait Mobile)
```
Create a low-fidelity mobile wireframe for a video lesson player screen.
Layout:
- Video player area (16:9 aspect ratio, top of screen): shows play controls overlay (play/pause circle, seek bar with progress, timestamp left, duration right, fullscreen icon right)
- Below video: lesson title text, breadcrumb "Course > Section > Lesson"
- 3 tabs below: Notes | Resources | AI Help
- "Notes" tab content: text area placeholder
- Bottom sticky bar: Back button + lesson count "3 of 12" + Next button
Grayscale only.
```

### Prompt 4.2 — Video Player (Landscape / Fullscreen)
```
Create a low-fidelity landscape wireframe (812×375px) for fullscreen video lesson playback.
Show: Controls overlay at bottom: left side (back 10s button, play/pause, forward 10s), center (progress bar + timestamp), right side (volume, settings, exit fullscreen). Top left: back arrow + lesson title. Controls auto-hide indicator.
Grayscale only.
```

### Prompt 4.3 — Notes Panel
```
Create a low-fidelity mobile wireframe for the notes panel within a lesson.
Show: Text area with formatted note entries. Toolbar above textarea: Bold | Italic | Bullet | Heading | Insert timestamp buttons. "Add note" placeholder text in textarea. Below: list of saved notes with timestamps (e.g., "[4:32] Key concept: ..."). Export button.
Grayscale only.
```

---

## Group 5: Quiz Wireframes

### Prompt 5.1 — Quiz Intro Screen
```
Create a low-fidelity mobile wireframe for a quiz introduction screen.
Show: Quiz title. 4 info cards in 2×2 grid: Questions count, Time limit, Passing score, Attempts remaining. "Start Quiz" primary button. "Review materials first" link below button.
Grayscale only.
```

### Prompt 5.2 — Quiz Question Screen
```
Create a low-fidelity mobile wireframe for a multiple-choice quiz question screen.
Layout:
- Top: progress "Q 3 of 10" + timer bar (full width, shows time remaining)
- Question card: large question text
- 4 answer option items (rounded rectangle, each with radio circle left + answer text)
- One option shown selected (filled circle)
- "Next" primary button at bottom
Grayscale only.
```

### Prompt 5.3 — Quiz Results Screen
```
Create a low-fidelity mobile wireframe for quiz results.
Layout:
- Large circular progress indicator showing score (e.g., 8/10) at center
- Below: pass/fail text, XP badge
- Stats row: Time | Correct | Incorrect
- Two buttons: "Review Answers" (secondary) + "Continue Course" (primary)
- "Explain with AI" link
Grayscale only.
```

---

## Group 6: AI Assistant Wireframes

### Prompt 6.1 — AI Chat (Slide-up Drawer, Mobile)
```
Create a low-fidelity mobile wireframe for a slide-up AI chat assistant drawer.
Show: handle bar at top. Header: "AI Tutor" title + query count "8/10 queries" + close X. Chat messages area: 2 user message bubbles (right-aligned rectangles) and 2 AI response bubbles (left-aligned, slightly taller with action chips below). Quick suggestions: horizontal scroll of 4 chip buttons at top of input area. Bottom: text input field + send button + mic icon.
Grayscale only.
```

### Prompt 6.2 — AI Study Plan Screen
```
Create a low-fidelity mobile wireframe for an AI-generated study plan.
Show: "Your Study Plan" header. Input summary cards: Goal, Time available, Start date. Below: weekly plan list (Week 1, Week 2, Week 3 rows, each with course placeholder + time estimate). "Regenerate Plan" button. "Start Week 1" primary button.
Grayscale only.
```

---

## Group 7: Gamification Wireframes

### Prompt 7.1 — Progress / XP Dashboard
```
Create a low-fidelity mobile wireframe for a progress and XP dashboard.
Layout:
- Top section: user level label, circular XP progress ring, "Level 5 • 1,234 XP" text, "456 XP to next level" subtext
- Stats row: 4 stat boxes (Courses done, Hours, Certificates, Badges)
- Streak widget: flame icon + "14 day streak" + goal progress bar
- Weekly activity: 7 bar chart placeholders for each day of the week
Grayscale only.
```

### Prompt 7.2 — Badge Collection Screen
```
Create a low-fidelity mobile wireframe for a badge collection gallery.
Show: Title "My Badges". Two sections: "Earned (12)" grid of 4×3 filled badge circles with labels. "Locked (8)" grid of greyed-out circles with lock icon overlays. Tap indicator on a badge showing a modal popup wireframe with: badge name, description, criteria, date earned.
Grayscale only.
```

### Prompt 7.3 — Leaderboard Screen
```
Create a low-fidelity mobile wireframe for a leaderboard screen.
Layout: 4 tab chips: Global | Course | Friends | Institution. Top 3 podium visual (3 rectangles with "1", "2", "3" ranks). Below: ranked list items (rank number + avatar circle + name text + XP amount). User's own rank item at bottom (sticky, highlighted with border).
Grayscale only.
```

---

## Group 8: Membership & Payment Wireframes

### Prompt 8.1 — Membership Plans Page
```
Create a low-fidelity mobile wireframe for a subscription plans page.
Layout:
- Toggle switch row: "Monthly | Annual (Save 20%)"
- 3 plan cards stacked vertically (Free, Pro, Premium), each with: plan name, price, divider, feature checklist (5 items each with check/cross icons, text). CTA button in each card.
- "Pro" card has a "Most Popular" badge chip at top
Grayscale only.
```

### Prompt 8.2 — Payment Screen
```
Create a low-fidelity mobile wireframe for a payment checkout screen.
Layout:
- Order summary card: plan name, price, discount, total
- Payment method: tab row (UPI | Card | Net Banking)
- UPI section: text input "Enter UPI ID" + "Pay via app" buttons (GPay, PhonePe icons placeholder)
- "Pay ₹599" primary button full width
- Security badge row at bottom
Grayscale only.
```

---

## Group 9: Admin Panel Wireframes

### Prompt 9.1 — Admin Dashboard (Desktop)
```
Create a low-fidelity desktop wireframe (1280×800px) for an admin dashboard.
Layout:
- Left sidebar (240px): logo area, nav items list (Dashboard, Users, Courses, Payments, Notifications, Support, Settings)
- Main content:
  - Header: page title + notification bell + user avatar
  - 5 KPI stat boxes in a row
  - 2-column charts section: revenue bar chart (left) + user growth line chart (right)
  - Bottom: data table with columns [Name, Email, Role, Status, Actions] — show 5 rows
Grayscale only.
```

### Prompt 9.2 — User Management Screen (Admin)
```
Create a low-fidelity desktop wireframe for a user management table.
Show: Page title "Users". Top bar: search input + filter button + "Export" button.
Data table with sortable column headers: Checkbox | Name | Email | Role | Plan | Status | Last Active | Actions.
Show 5 table rows. Status shown as badge chips. Actions: ellipsis menu icon.
Pagination at bottom.
Grayscale only.
```

### Prompt 9.3 — Trainer Course Builder (Desktop)
```
Create a low-fidelity desktop wireframe for a course creation wizard.
Layout: Step indicator at top (5 steps: Details, Curriculum, Pricing, Preview, Submit) with step 1 active.
Main area: form with: Course title input, Description textarea, Category dropdown, Level radio buttons, Thumbnail upload area (dashed border rectangle), Promotional video upload area.
Right sidebar: "Tips" card with bullet tips.
Bottom: Back + Next buttons.
Grayscale only.
```

---

## Group 10: Marketing Website Wireframes

### Prompt 10.1 — Marketing Website Home (Desktop)
```
Create a low-fidelity desktop wireframe (1280px width) for a learning platform marketing homepage.
Sections from top to bottom:
1. Navigation bar: logo left, links center (Features, Courses, Pricing, About), CTAs right (Log In + Get Started button)
2. Hero section: Headline text + subheadline + 2 CTA buttons + large device mockup rectangle (right side)
3. Social proof bar: "Trusted by..." + 5 company logo placeholders in a row
4. Features section: "Why LearnFlow AI" heading + 3 feature cards in a row (icon + title + description)
5. Testimonials: heading + 3 testimonial cards
6. App download: heading + App Store badge + Play Store badge
7. Footer: 4-column link grid + copyright
Grayscale only.
```

### Prompt 10.2 — Pricing Page (Desktop)
```
Create a low-fidelity desktop wireframe for a pricing page.
Layout:
- Header: "Simple, Transparent Pricing" + Monthly/Annual toggle
- 3 plan card columns (Free, Pro, Premium): price, divider, 8 feature rows each with check/X
- Feature comparison table below the cards with checkmarks
- FAQ accordion section: 5 question rows with expand indicator
- Enterprise CTA band at bottom
Grayscale only.
```

---

## Wireframe Annotation Standards

When adding annotations to all wireframes, use this convention:
```
[A] = Interactive element (tappable/clickable)
[B] = Auto-populated data from API
[C] = State-dependent element (changes based on conditions)
[D] = Accessibility label required
[E] = Navigation destination
```

Example annotation note: `"[A] Taps to navigate to Course Detail page [E]. [D] Requires aria-label: 'View Python Basics course details'"`
