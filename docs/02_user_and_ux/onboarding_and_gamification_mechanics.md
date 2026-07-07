# Onboarding & Gamification Mechanics
**AI Learning & Member Management Platform — LearnFlow AI**
**Version:** 1.0 | **Date:** July 2026

---

## 1. Onboarding Philosophy

### Core Principle: Value in Under 3 Minutes
A new user should reach their "aha moment" — seeing their first personalized course recommendation and starting their first lesson — within 3 minutes of installing the app. Every onboarding screen must earn its place by delivering value or collecting critical personalization data.

### Design Principles
- **Progressive disclosure:** Only ask what we need right now. Don't overwhelm.
- **Motivation-first:** Lead with outcomes ("You could be job-ready in 8 weeks") not features.
- **Smart defaults:** Pre-fill what we can from device settings (language, timezone).
- **Age-adaptive UI:** Font sizes, animation intensity, and language complexity auto-adjust based on age range selected during onboarding.
- **Skip-friendly:** Let users skip optional steps — we can collect data later through behavior.

### Age-Adaptive Modes
| Mode | Trigger | UI Changes |
|---|---|---|
| Teen Mode (13–17) | Age range selection | Larger fonts, higher animation energy, social emphasis |
| Adult Mode (18–35) | Age range selection | Clean, efficient, professional language |
| Senior Mode (55+) | Age range selection | 20px+ body text, reduced animation, simplified navigation, phone support CTA |

---

## 2. Onboarding Flow — Step by Step

### Step 1: Splash / Welcome
| Element | Details |
|---|---|
| **Screen Name** | SplashWelcome |
| **What User Sees** | Full-screen hero with animated logo, tagline "Learn Smarter. Grow Faster.", and "Get Started" / "I already have an account" CTAs |
| **What User Does** | Taps "Get Started" (new) or "Login" (returning) |
| **Data Collected** | None |
| **Adaptive Behavior** | Returning users see their name and "Welcome back, [Name]" |
| **Duration Target** | < 3 seconds before interaction is possible |

### Step 2: Choose Your Path (Role Selection)
| Element | Details |
|---|---|
| **Screen Name** | RoleSelection |
| **What User Sees** | 4 large icon cards: 🎓 Student / Learner, 💼 Working Professional, 🔍 Job Seeker, 📚 Trainer / Teach Online |
| **What User Does** | Taps one card (single selection) |
| **Data Collected** | `user.role_type` = [student, professional, job_seeker, trainer] |
| **Adaptive Behavior** | Role determines which goal options appear in Step 3 |
| **Skip Option** | No (critical routing data) |

### Step 3: Set Your Learning Goal
| Element | Details |
|---|---|
| **Screen Name** | GoalSelection |
| **What User Sees** | "What's your main goal?" with 6 visual goal cards specific to their role |
| **Student goals** | Get a job, Learn new skills, Exam prep, Explore interests, Build a project, Earn a certificate |
| **Professional goals** | Get promoted, Change careers, Learn leadership, Build technical skills, Stay updated, Build side income |
| **Job Seeker goals** | Get hired quickly, Build a portfolio, Learn in-demand skills, Improve resume, Interview prep, Freelance work |
| **What User Does** | Selects 1–2 goals |
| **Data Collected** | `user.primary_goal`, `user.secondary_goal` |
| **Adaptive Behavior** | Goals shape the AI recommendation engine's initial weighting |

### Step 4: Interest / Skill Category Selection
| Element | Details |
|---|---|
| **Screen Name** | InterestSelection |
| **What User Sees** | Horizontal scrolling grid of category chips with icons: Technology, Design, Business, Data Science, Marketing, Finance, Language, Arts, etc. |
| **What User Does** | Selects 2–5 categories |
| **Data Collected** | `user.interest_categories[]` |
| **Adaptive Behavior** | "You must choose at least 2" nudge if fewer selected |
| **Skip Option** | Yes — "I'll explore later" link |

### Step 5: Learning Schedule Preference
| Element | Details |
|---|---|
| **Screen Name** | ScheduleSetup |
| **What User Sees** | "How much time can you dedicate?" — illustrated slider or button row: 5 min/day, 15 min/day, 30 min/day, 1 hr/day, Let AI decide |
| **What User Does** | Selects a preference |
| **Data Collected** | `user.daily_goal_minutes` |
| **Adaptive Behavior** | Sets the daily learning target for streak tracking and daily quest difficulty |
| **Skip Option** | Yes — defaults to 15 min/day |

### Step 6: Profile Setup
| Element | Details |
|---|---|
| **Screen Name** | ProfileSetup |
| **What User Sees** | "Tell us a bit about yourself" — Name field, optional profile photo upload, age range dropdown (13-17, 18-25, 26-35, 36-50, 50+) |
| **What User Does** | Enters name (required), optionally adds photo and age range |
| **Data Collected** | `user.display_name`, `user.avatar_url`, `user.age_range` |
| **Adaptive Behavior** | Age range triggers UI mode (Teen/Adult/Senior); triggers COPPA-compliant flow for 13-17 |
| **Skip Option** | Photo and age are optional; name is required |

### Step 7: Personalized Course Recommendations Preview
| Element | Details |
|---|---|
| **Screen Name** | RecommendationsPreview |
| **What User Sees** | "We found courses for you!" — 5 AI-curated course cards based on steps 2–4, with explanation chips ("Based on your goal: Get a job") |
| **What User Does** | Swipes through cards, can tap to preview, taps "Start with this" or "See all courses" |
| **Data Collected** | `onboarding.recommendation_accepted` (true/false), `onboarding.viewed_course_ids[]` |
| **Adaptive Behavior** | If no good matches found (insufficient interest data), shows top-rated courses instead |
| **Conversion Goal** | ≥ 50% of users enroll in a recommended course from this screen |

### Step 8: First Course Selection + Enroll CTA
| Element | Details |
|---|---|
| **Screen Name** | FirstEnrollPrompt |
| **What User Sees** | Single featured course card with "Start Learning Free" CTA and social proof ("4,823 learners enrolled") |
| **What User Does** | Taps "Start Learning" → goes to lesson player (first lesson auto-plays) |
| **Data Collected** | `onboarding.first_enrollment_completed` = true |
| **Adaptive Behavior** | Onboarding officially ends; streak counter starts; first XP awarded |
| **Skip Option** | "Explore on my own" link goes to Dashboard |

---

## 3. Gamification Engine Design

### 3.1 Experience Points (XP) System

#### XP Earned Per Action
| Action | XP Awarded | Notes |
|---|---|---|
| Complete first lesson | 100 XP | Bonus for first time only |
| Complete a lesson (subsequent) | 25 XP | Per lesson, any course |
| Complete a course | 500 XP | Full course completion bonus |
| Pass a quiz (first attempt) | 75 XP | Full score bonus: +25 XP |
| Pass a quiz (retry) | 30 XP | Partial credit |
| Maintain daily streak (+1 day) | 10 XP | Applied at midnight |
| Complete a daily quest | 50 XP | Per quest, 3 quests/day max |
| Earn a badge | 25 XP | Per badge earned |
| Leave a course review | 15 XP | Once per course |
| Share a certificate | 20 XP | One-time per certificate |
| Complete onboarding | 200 XP | One-time bonus |
| Invite a friend (who enrolls) | 150 XP | Per successful referral |
| Take AI-generated practice quiz | 30 XP | Per quiz session |
| Watch a lesson preview (non-enrolled) | 2 XP | Cap at 10 XP/day from previews |

#### XP Leveling Thresholds
| Level | Name | Total XP Required | XP to Next Level |
|---|---|---|---|
| 1 | Curious Beginner | 0 | 200 |
| 2 | Explorer | 200 | 400 |
| 3 | Learner | 600 | 600 |
| 4 | Scholar | 1,200 | 800 |
| 5 | Achiever | 2,000 | 1,000 |
| 6 | Practitioner | 3,000 | 1,500 |
| 7 | Specialist | 4,500 | 2,000 |
| 8 | Expert | 6,500 | 3,000 |
| 9 | Master | 9,500 | 4,000 |
| 10 | Grand Master | 13,500 | 5,000 |
| 11 | Luminary | 18,500 | 7,000 |
| 12 | Visionary | 25,500 | 10,000 |
| 13 | Sage | 35,500 | 15,000 |
| 14 | Legend | 50,500 | 20,000 |
| 15 | Titan | 70,500 | — |

*Levels 11–15 are "Prestige" levels unlocked only by consistently completing courses and community contributions.*

---

### 3.2 Badge System

#### Badge Categories & Full Badge List

| Badge Name | Category | Icon Description | Criteria | XP Reward |
|---|---|---|---|---|
| First Step | Learning | Footprints on a path | Complete your first lesson | 25 XP |
| Course Finisher | Learning | Checkered flag | Complete your first course | 50 XP |
| Knowledge Seeker | Learning | Open book with sparkles | Enroll in 5 different courses | 30 XP |
| Deep Diver | Learning | Submarine | Complete a course with 20+ lessons | 75 XP |
| Quiz Ace | Achievement | Gold medal star | Score 100% on any quiz | 50 XP |
| Speed Learner | Achievement | Lightning bolt | Complete a 5-lesson course in 1 day | 40 XP |
| Comeback Kid | Achievement | Rising phoenix | Pass a quiz after 3 failed attempts | 60 XP |
| Certificate Earner | Achievement | Rolled certificate with ribbon | Earn your first certificate | 100 XP |
| Triple Crown | Achievement | 3 laurel wreaths | Earn 3 certificates | 150 XP |
| 3-Day Streak | Streak | Flame with "3" | Maintain a 3-day learning streak | 30 XP |
| Week Warrior | Streak | Flame with "7" | Maintain a 7-day streak | 75 XP |
| Unstoppable | Streak | Inferno flame | Maintain a 30-day streak | 300 XP |
| Century Club | Streak | Diamond flame | Maintain a 100-day streak | 1,000 XP |
| Referral Champion | Social | Two connected people | Successfully refer 3 friends who enroll | 200 XP |
| Reviewer | Social | Chat bubble with star | Leave 5 course reviews | 50 XP |
| Early Bird | Special | Sunrise over mountains | Join in the first 1,000 users | 500 XP |
| Night Owl | Special | Moon and stars | Complete a lesson between 11 PM–3 AM (10 times) | 40 XP |
| Weekend Warrior | Special | Calendar with rocket | Study for 3+ hours on a weekend | 60 XP |
| Community Hero | Social | Shield with heart | Be voted "Most Helpful" in community (Phase 2) | 200 XP |
| AI Enthusiast | Special | Robot head with lightbulb | Use the AI assistant 50 times | 75 XP |
| Goal Crusher | Achievement | Target with bullseye hit | Complete a full learning path aligned to your goal | 500 XP |
| All-Rounder | Learning | Circle of diverse icons | Enroll in 5 different category courses | 100 XP |

---

### 3.3 Streak System

#### Streak Milestones & Rewards
| Streak Length | Milestone Name | Reward |
|---|---|---|
| 1 day | First Flame | +10 XP |
| 3 days | Warming Up | +30 XP + "3-Day Streak" badge |
| 7 days | Week Warrior | +75 XP + badge + 1 Streak Freeze |
| 14 days | Fortnight Fighter | +150 XP |
| 30 days | Monthly Master | +300 XP + "Unstoppable" badge + 2 Streak Freezes |
| 50 days | Half Century | +500 XP + exclusive profile frame |
| 100 days | Century Club | +1,000 XP + "Century Club" badge + premium certificate template |
| 365 days | Year of Learning | +5,000 XP + "Legend of the Year" badge + 1 month Pro free |

#### Streak Freeze Mechanic
- **What it does:** Prevents streak from breaking if user misses one day
- **How to earn:** Awarded as milestone rewards (see above)
- **How to purchase:** 100 XP per freeze, or ₹29 for 3 freezes (IAP)
- **Max active freezes:** 3 at any time
- **Auto-use:** Freeze is consumed automatically if user misses a day (no action required)
- **Notification:** "Your streak freeze was used! You still have a [N]-day streak 🔥"

---

### 3.4 Daily Quests & Challenges

#### Daily Quest Pool (3 assigned randomly per day)
| Quest Name | Requirement | XP Reward |
|---|---|---|
| Morning Lesson | Complete 1 lesson before noon | 50 XP |
| Quick Fire | Answer 5 quiz questions | 50 XP |
| Deep Focus | Watch 20+ minutes of lesson content | 60 XP |
| Explorer | Open 3 different course detail pages | 30 XP |
| Note Taker | Write notes in 2 lessons | 40 XP |
| AI Conversation | Ask the AI assistant a question | 30 XP |
| Course Sprinter | Complete 2 lessons in any course | 50 XP |
| Badge Hunter | Earn any badge today | 25 XP |
| Streak Keeper | Log in and complete any learning activity | 20 XP |
| Rating Champion | Rate a course you've completed | 15 XP |
| Challenge Mode | Score 80%+ on a quiz | 60 XP |
| Weekend Boost (Sat/Sun only) | Complete 3 lessons | 75 XP |
| Milestone Push | Reach a XP/level milestone today | 100 XP |
| Social Share | Share your progress or a certificate | 25 XP |
| Discovery Mode | Enroll in a new course | 40 XP |

#### Weekly Challenge
One challenge per week, announced Monday, ends Sunday:
- Example: "Complete any full course this week → earn the 'Weekly Champion' badge + 500 XP"
- Difficulty scales with user level

#### Monthly Grand Challenge
One challenge per month, platform-wide:
- Example: "July Learning Marathon — Most lessons completed this month wins a 3-month Pro subscription"
- Leaderboard tracks progress; top 3 win prizes

---

### 3.5 Leaderboards

#### Leaderboard Types
| Type | Scope | Reset Cycle | Opt-out? |
|---|---|---|---|
| Global Leaderboard | All users by XP | Weekly (Mon–Sun) | Yes |
| Course Leaderboard | Enrolled users in same course | Never resets | No |
| Friends Leaderboard | User's followed/connected users | Weekly | N/A |
| Institution Leaderboard | Users within same org | Monthly | Institution Admin controls |

#### Fair Play Rules
- Leaderboard XP counts only organic actions — no purchased XP
- Duplicate account detection prevents abuse
- Flagged accounts are removed from leaderboard pending review
- Ties broken by earliest timestamp of achieving the score

---

### 3.6 Level System & Rewards

| Level Milestone | Reward |
|---|---|
| Level 2 | Profile badge "Explorer", ability to leave reviews |
| Level 3 | 1 Streak Freeze unlocked |
| Level 5 | Access to premium certificate border (Achievement style) |
| Level 7 | AI Study Plan Generator unlocked (one plan free) |
| Level 10 | Exclusive profile frame + "Grand Master" badge + 10% course discount |
| Level 12 | Early access to new course releases |
| Level 15 | "Titan" profile frame + "Titan" badge + 1 month Pro free |

---

### 3.7 Reward Store / Redemption

Users can redeem XP for rewards:

| Reward | XP Cost | Notes |
|---|---|---|
| Streak Freeze | 100 XP | Max 3 active at once |
| Premium Certificate Border | 500 XP | Visual upgrade on certificate PDF |
| 10% Course Discount Coupon | 750 XP | Single-use, valid 30 days |
| AI Study Plan | 300 XP | Generates personalized weekly plan |
| Profile Frame (Rare) | 1,000 XP | Cosmetic, limited-time frames |
| 1 Month Basic Upgrade | 2,000 XP | Temporary plan upgrade |
| Donate XP to Scholarship Fund | Any amount | Platform donates equivalent in INR to student scholarships |

---

## 4. Age-Group Adaptation

| Feature | Teens (13–17) | Young Adults (18–35) | Mid-Career (36–55) | Seniors (55+) |
|---|---|---|---|---|
| Font Size (Body) | 16px | 15px | 16px | 20px |
| Animation Intensity | High (confetti, bounces) | Medium (smooth transitions) | Low (fade, slide) | Minimal |
| Gamification Emphasis | Very High (badges, peers, levels) | Medium (achievements, certs) | Low (progress, certification) | Optional (off by default) |
| Streak Reminder Style | Playful emoji push ("Don't break your streak 🔥!") | Clean ("Your streak: 7 days") | Calm ("Your learning streak continues") | Gentle ("Remember to learn today") |
| Language Complexity | Simple, casual | Professional, concise | Professional, formal | Simple, warm, patient |
| Help Access | Chat-first AI | Self-serve FAQ | Email/Chat | Phone button always visible |
| Leaderboard | Shown prominently | Shown | Hidden by default | Hidden |
| Social Features | Friends leaderboard emphasized | Optional | Optional | Opt-in only |
| Notification Frequency | Up to 5/day | 2–3/day | 1–2/day | 1/day max |
| Default Learning Goal | 15 min/day | 20 min/day | 15 min/day | 10 min/day |

---

## 5. Learning Path Design

### 5.1 Structured Learning Phases
```
Phase 1: Foundation
  └── Beginner courses in chosen category
  └── Core concepts, short lessons (5–10 min)
  └── MCQ quizzes with instant feedback

Phase 2: Intermediate
  └── Unlocked after completing Phase 1 assessment
  └── Project-based learning, case studies
  └── Complex quizzes with partial scoring

Phase 3: Advanced
  └── Unlocked after Phase 2 quiz (score ≥ 75%)
  └── Expert-level content, real-world scenarios
  └── Peer review exercises (Phase 2 feature)

Phase 4: Mastery
  └── Capstone project or proctored assessment
  └── Premium verifiable certificate issued
  └── Mentor session eligibility (Premium plan)
```

### 5.2 Pre-Assessment & Adaptive Path Generation
- **Skill Gap Assessment:** Optional 5-minute diagnostic quiz on enrollment
- **Result:** AI calculates starting phase (skip beginner if advanced)
- **Path Generation:** Week-by-week schedule generated based on daily goal, course length, and assessment result
- **Re-routing:** If user consistently fails quizzes, AI suggests backing up one phase

### 5.3 Course Sequence Logic
- **Prerequisites:** Courses can mark other courses as prerequisites (hard or soft)
- **Recommended Next:** Algorithm suggests most logical next course post-completion
- **Learning Track:** Curated sequences of 5–8 courses form a "Track" (e.g., "Full-Stack Developer Track") with a Track Certificate at the end

---

## 6. Engagement & Re-engagement Triggers

### 6.1 Smart Push Notification Triggers

| Trigger | Timing | Message Example |
|---|---|---|
| Streak at risk | 2 hours before midnight (if no activity) | "⚠️ Your 7-day streak ends tonight! Just 1 lesson away." |
| Daily quest not done | 6 PM local time (if not completed) | "Your daily quests expire in 6 hours. Earn 150 XP!" |
| New course in interests | When published | "New: [Course Name] just launched in [Interest]" |
| Lesson 50% done | 24h after stopping mid-lesson | "You were halfway through '[Lesson Name]'. Resume now?" |
| Course completion close | When 80% complete | "You're almost done with '[Course]'! Finish it today." |
| Leaderboard position change | When overtaken in weekly leaderboard | "[User X] just overtook you! Learn now to reclaim your spot." |
| Certificate ready | Immediately on generation | "🎉 Your certificate for '[Course]' is ready! Download it." |
| Membership expiry | 7 days and 1 day before | "Your Pro plan renews in 7 days. Keep learning!" |

### 6.2 Win-Back Flow (Churned Users, 7+ days inactive)

**Day 7:** "We miss you, [Name]! You were [X]% through [Course]."
**Day 14:** Streak recovery offer — "Your [N]-day streak is at risk. Use a streak freeze?"
**Day 30:** "You've been away for a while. Here's what you missed: [X new courses]."
**Day 60:** Personalized discount offer — "Come back and get 30% off Pro for 3 months."
**Day 90:** Final re-engagement — survey asking why they left (data for product improvement).

### 6.3 Smart Reminder Logic
- AI learns optimal notification time per user based on open-rate history
- Users in "Do Not Disturb" hours receive notifications queued for after that window
- Notification frequency caps: Free = 3/day, Pro = 5/day (user-configurable)
- All re-engagement messages are personalized with the user's actual course name and progress %
