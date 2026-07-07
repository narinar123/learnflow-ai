# UX Latest Design System
**AI Learning & Member Management Platform — LearnFlow AI**
**Version:** 1.0 | **Date:** July 2026

---

## 1. Design System Philosophy

LearnFlow AI's design system is built on four principles:
1. **Clarity First:** Every element must communicate a clear purpose. No decoration without function.
2. **Premium Feel:** Glassmorphism, smooth gradients, and refined spacing make the platform feel like a top-tier consumer app.
3. **Universal Accessibility:** WCAG 2.2 AA compliance built into every token and component.
4. **Scalable Consistency:** A single source of truth for Flutter (mobile) and React/Next.js (web/desktop).

---

## 2. Color System

### 2.1 Primary Palette (Dark Mode — Default)
| Token | Color Name | Hex | HSL | Usage |
|---|---|---|---|---|
| `color.primary.500` | Indigo | `#6366F1` | hsl(239, 84%, 67%) | Primary CTA buttons, links, active states |
| `color.primary.400` | Indigo Light | `#818CF8` | hsl(234, 89%, 74%) | Hover states, secondary actions |
| `color.primary.600` | Indigo Dark | `#4F46E5` | hsl(243, 75%, 59%) | Pressed state, important accents |
| `color.primary.100` | Indigo Tint | `#EEF2FF` | hsl(230, 100%, 97%) | Light mode backgrounds, badges |

### 2.2 Secondary Palette
| Token | Color Name | Hex | Usage |
|---|---|---|---|
| `color.secondary.500` | Purple | `#A855F7` | Premium features, membership highlights |
| `color.secondary.400` | Purple Light | `#C084FC` | Hover states |
| `color.accent.500` | Emerald | `#10B981` | Success states, completion, certificates |
| `color.accent.amber` | Amber | `#F59E0B` | Streaks, warnings, XP rewards |
| `color.accent.rose` | Rose | `#F43F5E` | Errors, destructive actions, urgency |

### 2.3 Neutral Scale
| Token | Hex | Usage |
|---|---|---|
| `color.neutral.0` | `#FFFFFF` | Light mode surface |
| `color.neutral.50` | `#F8FAFC` | Light mode background |
| `color.neutral.100` | `#F1F5F9` | Light mode card surface |
| `color.neutral.200` | `#E2E8F0` | Borders, dividers (light mode) |
| `color.neutral.400` | `#94A3B8` | Placeholder text, disabled |
| `color.neutral.600` | `#475569` | Secondary body text |
| `color.neutral.800` | `#1E293B` | Primary body text (light mode) |
| `color.neutral.900` | `#0F172A` | Dark mode primary background |
| `color.neutral.850` | `#1E1E2E` | Dark mode card surface |
| `color.neutral.800d` | `#2A2A3E` | Dark mode secondary surface |

### 2.4 Semantic Colors
| Token | Hex | Usage |
|---|---|---|
| `color.success` | `#10B981` | Completion, positive feedback |
| `color.warning` | `#F59E0B` | Alerts, streak warnings |
| `color.error` | `#F43F5E` | Form errors, destructive states |
| `color.info` | `#3B82F6` | Informational messages |

### 2.5 Glassmorphism Tokens
| Token | Value | Usage |
|---|---|---|
| `glass.background` | `rgba(255,255,255,0.08)` | Glass card backgrounds (dark mode) |
| `glass.background.light` | `rgba(255,255,255,0.6)` | Glass card backgrounds (light mode) |
| `glass.border` | `rgba(255,255,255,0.12)` | Glass card borders (dark mode) |
| `glass.backdrop` | `blur(12px)` | Backdrop filter for glass surfaces |
| `glass.shadow` | `0 8px 32px rgba(0,0,0,0.37)` | Shadow for glass elements |

---

## 3. Typography System

### 3.1 Font Families
| Token | Font | Fallback | Usage |
|---|---|---|---|
| `font.display` | Outfit | system-ui, sans-serif | Headings, hero text, display text |
| `font.body` | Inter | system-ui, sans-serif | Body text, labels, descriptions |
| `font.mono` | JetBrains Mono | Courier New, monospace | Code blocks, technical content |

*Google Fonts CDN: `https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono&display=swap`*

### 3.2 Type Scale
| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `text.display.xl` | 56px / 3.5rem | 1.1 | 800 | Hero headlines (marketing) |
| `text.display.lg` | 40px / 2.5rem | 1.15 | 700 | Page heroes (app) |
| `text.h1` | 32px / 2rem | 1.2 | 700 | Page titles |
| `text.h2` | 24px / 1.5rem | 1.3 | 600 | Section headings |
| `text.h3` | 20px / 1.25rem | 1.35 | 600 | Card titles, subsections |
| `text.h4` | 18px / 1.125rem | 1.4 | 500 | Minor headings |
| `text.body.lg` | 16px / 1rem | 1.6 | 400 | Primary body text |
| `text.body.md` | 15px / 0.9375rem | 1.6 | 400 | Secondary body text |
| `text.body.sm` | 14px / 0.875rem | 1.5 | 400 | Captions, labels |
| `text.body.xs` | 12px / 0.75rem | 1.4 | 400 | Tags, metadata |
| `text.label` | 13px / 0.8125rem | 1 | 500 | Form labels, badge text |
| `text.overline` | 11px / 0.6875rem | 1 | 600 | Overline text, uppercase category labels |

*Senior Mode override: all sizes ×1.25 when `user.age_range = "55+"`*

---

## 4. Spacing System (8pt Grid)

| Token | Value | Usage |
|---|---|---|
| `space.1` | 4px | Micro spacing (icon gap, inline padding) |
| `space.2` | 8px | Compact spacing (badge padding, tight elements) |
| `space.3` | 12px | Small spacing (button padding Y, form field gap) |
| `space.4` | 16px | Base unit (card inner padding, section gap small) |
| `space.5` | 20px | Medium spacing |
| `space.6` | 24px | Large spacing (section inner padding) |
| `space.8` | 32px | Extra large (between sections) |
| `space.10` | 40px | 2XL |
| `space.12` | 48px | 3XL |
| `space.16` | 64px | 4XL (page margins, hero padding) |
| `space.20` | 80px | 5XL |
| `space.24` | 96px | 6XL (landing section padding) |

---

## 5. Border Radius System

| Token | Value | Usage |
|---|---|---|
| `radius.sm` | 6px | Small chips, badges, input fields |
| `radius.md` | 10px | Buttons, small cards |
| `radius.lg` | 16px | Primary cards, modals |
| `radius.xl` | 24px | Large cards, drawer handles, image thumbnails |
| `radius.2xl` | 32px | Feature cards, hero sections |
| `radius.full` | 9999px | Pills, avatar circles, toggle switches |

---

## 6. Elevation & Shadow System

| Token | Shadow Value | Usage |
|---|---|---|
| `shadow.xs` | `0 1px 3px rgba(0,0,0,0.12)` | Subtle hover lift (light mode) |
| `shadow.sm` | `0 2px 8px rgba(0,0,0,0.16)` | Standard card shadow |
| `shadow.md` | `0 4px 16px rgba(0,0,0,0.2)` | Modals, dropdowns |
| `shadow.lg` | `0 8px 32px rgba(0,0,0,0.25)` | Hero elements, prominent cards |
| `shadow.xl` | `0 16px 48px rgba(0,0,0,0.3)` | Full-page modals, drawers |
| `shadow.glow.primary` | `0 0 20px rgba(99,102,241,0.4)` | Indigo glow (CTA buttons, active states) |
| `shadow.glow.success` | `0 0 20px rgba(16,185,129,0.4)` | Green glow (completion, certificates) |
| `shadow.glow.amber` | `0 0 20px rgba(245,158,11,0.4)` | Amber glow (streaks, XP rewards) |

---

## 7. Motion & Animation System (Framer Motion)

### 7.1 Duration Tokens
| Token | Value | Usage |
|---|---|---|
| `motion.duration.instant` | 100ms | State toggles, checkbox, radio |
| `motion.duration.fast` | 150ms | Button press, hover state |
| `motion.duration.normal` | 250ms | Card hover, dropdown open |
| `motion.duration.moderate` | 350ms | Modal entry, drawer slide |
| `motion.duration.slow` | 500ms | Page transitions, hero animations |
| `motion.duration.celebration` | 800ms | Level-up, badge award, confetti |

### 7.2 Easing Tokens
| Token | Value | Usage |
|---|---|---|
| `motion.ease.default` | `[0.25, 0.46, 0.45, 0.94]` | Standard transitions |
| `motion.ease.spring` | `spring({ stiffness: 300, damping: 30 })` | Bouncy effects, badge pop |
| `motion.ease.enter` | `[0, 0, 0.2, 1]` | Elements entering the screen |
| `motion.ease.exit` | `[0.4, 0, 1, 1]` | Elements leaving the screen |

### 7.3 Standard Animation Variants (Framer Motion)
```javascript
// Fade Up — for cards, sections entering viewport
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } }
};

// Scale Pop — for badges, XP toasts
const scalePop = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};

// Slide In Right — for drawer panels
const slideInRight = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] } }
};

// Stagger Children — for list items
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

// Celebration — for level-up and certificate screens
const celebration = {
  hidden: { scale: 0, rotate: -10, opacity: 0 },
  visible: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 15, duration: 0.8 } }
};
```

### 7.4 Reduce Motion Support
All animations must respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```
In Framer Motion, use `useReducedMotion()` hook to disable complex animations.

---

## 8. Grid & Layout System

### 8.1 Breakpoints
| Breakpoint | Name | Min Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| `xs` | Mobile S | 320px | 4 | 12px | 16px |
| `sm` | Mobile L | 390px | 4 | 16px | 16px |
| `md` | Tablet | 768px | 8 | 24px | 24px |
| `lg` | iPad / Desktop S | 1024px | 12 | 24px | 32px |
| `xl` | Desktop | 1280px | 12 | 32px | 48px |
| `2xl` | Desktop L / Electron | 1536px | 12 | 32px | 64px |

### 8.2 Container Max Widths
| Context | Max Width |
|---|---|
| App content | 1200px |
| Marketing page | 1280px |
| Article/blog content | 720px |
| Form screens | 480px |
| Auth screens | 400px |

---

## 9. Component Specifications

### 9.1 Button System

#### Primary Button
```
Background: color.primary.500 (#6366F1)
Text: white, font.body.md, weight 600
Border-radius: radius.md (10px)
Padding: 12px 24px (desktop), 14px 24px (mobile for tap target)
Hover: background darken 10%, shadow.glow.primary
Pressed: scale(0.97), background color.primary.600
Disabled: opacity 0.4, cursor not-allowed
Loading: spinner replaces text, width maintained
Focus: 2px solid color.primary.300, offset 2px
Min height: 44px (mobile), 40px (desktop)
```

#### Secondary Button
```
Background: transparent
Border: 1px solid color.primary.500
Text: color.primary.500, weight 600
Hover: glass.background + border brightness up
```

#### Destructive Button
```
Background: color.error (#F43F5E)
Text: white
Hover: darken 10%, shadow.glow.rose
```

#### Ghost Button / Text Button
```
Background: transparent
Text: color.neutral.600 or color.primary.500
Hover: background rgba(99,102,241,0.08)
```

### 9.2 Input Fields
```
Background: glass.background (dark) / color.neutral.100 (light)
Border: 1px solid color.neutral.200
Border-radius: radius.sm (6px)
Padding: 12px 16px
Placeholder: color.neutral.400
Focus border: 2px solid color.primary.500
Error border: 2px solid color.error
Error text: color.error, 12px, below field
Label: 13px, weight 500, above field by 6px
Min height: 48px (mobile), 44px (desktop)
```

### 9.3 Cards

#### Standard Card
```
Background: glass.background (dark) / color.neutral.0 (light)
Border: 1px solid glass.border / color.neutral.200
Border-radius: radius.lg (16px)
Padding: space.6 (24px)
Shadow: shadow.sm
Hover: shadow.md + translateY(-2px), 250ms ease
```

#### Course Card
```
Extends: Standard Card
Thumbnail: 16:9 aspect ratio, radius.md top corners
Tags row: Category chip + Level chip
Title: text.h4 (18px), weight 600, 2-line clamp
Meta: Instructor avatar + name, duration, star rating
Progress bar: shown when enrolled, emerald color
Price/Enroll CTA: bottom of card
```

#### Lesson Card (in Curriculum)
```
Layout: Horizontal, icon left + text center + duration right
Icon: Play circle (video) / document (PDF) / quiz (check)
Title: text.body.lg, 1-line clamp
Completed state: checkmark icon, text muted
Locked state: lock icon, opacity 0.5
```

### 9.4 Navigation

#### Mobile Bottom Tab Bar
```
Height: 64px + safe area inset
Background: glass.background with backdrop blur
Items: 5 tabs (Home, Courses, AI, Progress, Profile)
Active: color.primary.500 icon + label, indicator dot
Inactive: color.neutral.400 icon + label
Tab items: min 48×48dp touch target
Transition: icon scale 1→1.15 on active, 200ms spring
```

#### Web Top Navigation
```
Height: 64px, sticky
Background: glass.background with backdrop blur (dark) / white with shadow (light)
Logo: left, 140px wide
Primary links: Courses, AI Assistant, Progress (center or left of logo)
Right: Notification bell, Avatar/Menu
Mobile collapsed: hamburger → slide-in drawer
```

#### Sidebar (Admin / Trainer Panel)
```
Width: 240px (expanded), 72px (collapsed)
Background: color.neutral.900 (dark) or color.neutral.50 (light)
Items: icon + label, active state: primary.500 background tint + left border accent
Collapse toggle: arrow icon button at bottom
Responsive: collapses to bottom nav on tablet
```

### 9.5 Progress Indicators

#### Linear Progress Bar
```
Track: color.neutral.200 (light) / rgba(255,255,255,0.1) (dark)
Fill: color.accent.500 (emerald) for course progress, color.primary.500 for XP
Border-radius: radius.full
Height: 6px (compact), 10px (prominent), 16px (large hero)
Animation: width transition 500ms ease-in-out
```

#### Circular Progress (XP / Level)
```
Size: 80px (dashboard widget), 120px (profile header)
Track color: rgba(255,255,255,0.1)
Fill color: primary.500
Stroke width: 8px
Center text: level number, text.h2
Animation: stroke-dashoffset transition 800ms ease
```

#### Streak Flame Widget
```
Icon: animated flame SVG (loops when streak active)
Count: large bold number, amber color
Sub-label: "day streak"
Inactive: grey flame, "No streak today"
```

### 9.6 Modals & Drawers
```
Backdrop: rgba(0,0,0,0.6) + blur(4px)
Container: glass.background, radius.xl, shadow.xl
Max width: 480px (standard), 640px (wide), 90vw on mobile
Animation in: scale 0.95→1 + opacity 0→1, 250ms ease
Animation out: scale 1→0.95 + opacity 1→0, 200ms ease
Close button: top-right, 44×44px touch target
Drawer (mobile): slides from bottom, handle bar at top, max-height 80vh
```

### 9.7 Toast Notifications
```
Position: top-center (mobile), bottom-right (desktop)
Width: max 400px
Variants: success (emerald), error (rose), warning (amber), info (blue)
Duration: 3s auto-dismiss (info), 5s (success), persistent (error requiring action)
Animation: slide in from top (mobile) / right (desktop), 200ms spring
Icon: variant-colored icon left of message
Dismiss: swipe or X button
```

### 9.8 XP & Badge Reward Toast
```
Special full-width bottom toast with:
- XP icon (gold coin or star)
- "+75 XP" large text, amber color
- "Quiz Ace" badge name if badge earned
- Level-up variant: full-screen celebration overlay with confetti
Animation: celebration variant (scalePop, 800ms)
Auto-dismiss: 4s for XP, 6s for badge, 8s for level-up
```

### 9.9 Certificate Component
```
Size: A4 ratio (1:1.414), 16:9 preview thumbnail
Border: 4px gradient border (primary→secondary)
Background: branded design with platform logo
Content: User name (display text), Course name (h2), Date, Trainer, Verification QR
Footer: Platform branding, verification URL, unique ID
Premium border variants: Gold foil effect, Holographic shimmer (Level 5+)
```

### 9.10 Quiz Components

#### Question Card
```
Background: Standard Card
Question text: text.h3, weight 600
Option items: large radio-button list items, min 48dp height
Selected state: primary.500 border + tint background
Correct state: accent.500 (emerald) border + tint + check icon
Incorrect state: error.500 (rose) border + tint + X icon
Timer bar: top of card, red fill shrinking left-to-right
```

#### Result Screen
```
Score: Large circular progress (correct/total)
Grade text: "Excellent!", "Good Job", "Keep Practicing" based on score
XP earned: amber pill badge
Review button: shows incorrect answers with AI explanation
Retry button: disabled if in cooldown, timer shown
```

---

## 10. Iconography

- **Library:** Lucide Icons (React) / Flutter Icons package matching Lucide
- **Size:** 20px (inline), 24px (standard), 28px (navigation tabs), 32px (feature icons)
- **Stroke width:** 1.5px (thin, modern aesthetic)
- **Color:** Inherits from parent context; never hardcode icon color
- **Custom icons:** Course category icons, badge icons — designed as SVG, exported at 48×48px

---

## 11. Imagery & Illustration Style

- **Photos:** Real, diverse, professional photography. No stock-photo clichés.
- **Illustrations:** Line-style with primary brand colors. Used for empty states, onboarding, error screens.
- **Empty States:** Always have an illustration + headline + CTA button. Never just "No data found."
- **Avatar:** User avatars as circle crops, 32px (list), 48px (card), 80px (profile header), 120px (profile page)
- **Thumbnails:** 16:9 aspect ratio for course thumbnails, lazy-loaded with blur placeholder

---

## 12. Dark Mode / Light Mode

| Element | Dark Mode | Light Mode |
|---|---|---|
| Background | `#0F172A` | `#F8FAFC` |
| Surface (Card) | `#1E1E2E` | `#FFFFFF` |
| Surface (Secondary) | `#2A2A3E` | `#F1F5F9` |
| Primary Text | `#F8FAFC` | `#0F172A` |
| Secondary Text | `#94A3B8` | `#475569` |
| Border | `rgba(255,255,255,0.08)` | `#E2E8F0` |
| Mode default | **Dark Mode** | Toggleable |
| Toggle | System preference respected; manual toggle in settings | |
