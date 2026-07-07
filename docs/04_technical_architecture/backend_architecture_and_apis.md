# Backend Architecture & API Specification
**AI Learning & Member Management Platform — LearnFlow AI**
**Version:** 1.0 | **Date:** July 2026

---

## 1. Architecture Overview

The backend is a **modular monolith** (Phase 1–2) with a clear separation of concerns, designed to be decomposed into microservices when scaling demands it (Phase 3+). It is built with **Node.js + Express.js** and communicates with a **PostgreSQL** database via **Prisma ORM**.

### 1.1 High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
│   Flutter (iOS/Android)  │  Next.js (Web)  │  Electron     │
└──────────────────┬────────────────────┬─────────────────────┘
                   │ HTTPS / WSS        │
┌──────────────────▼────────────────────▼─────────────────────┐
│                   API GATEWAY / LOAD BALANCER                │
│                (Nginx / AWS ALB / Cloudflare)               │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                   LEARNFLOW API SERVER                       │
│   Node.js 20 LTS + Express.js + TypeScript                  │
│                                                             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌────────────┐  │
│  │   Auth    │ │  Courses  │ │   Quiz    │ │    AI      │  │
│  │  Module   │ │  Module   │ │  Module   │ │  Module    │  │
│  └───────────┘ └───────────┘ └───────────┘ └────────────┘  │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌────────────┐  │
│  │Membership │ │ Payments  │ │  Notify   │ │  Support   │  │
│  │  Module   │ │  Module   │ │  Module   │ │  Module    │  │
│  └───────────┘ └───────────┘ └───────────┘ └────────────┘  │
│  ┌───────────┐ ┌───────────┐                               │
│  │  Admin    │ │Analytics  │                               │
│  │  Module   │ │  Module   │                               │
│  └───────────┘ └───────────┘                               │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┼─────────────────────────┐
       │                       │                         │
┌──────▼──────┐   ┌────────────▼──────┐   ┌─────────────▼────┐
│ PostgreSQL  │   │  Redis Cache       │   │  BullMQ Queue     │
│  (Primary)  │   │  (Sessions/Cache)  │   │  (Background Jobs)│
└─────────────┘   └───────────────────┘   └──────────────────┘
       │
┌──────▼──────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│  AWS S3 (Media) │ Razorpay/Stripe │ FCM/APNs │ SendGrid     │
│  Gemini API (AI)│ pgvector (RAG)  │ Twilio OTP               │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Backend Stack
| Component | Technology |
|---|---|
| Runtime | Node.js 20 LTS |
| Framework | Express.js 4.x + TypeScript 5.x |
| ORM | Prisma 5.x |
| Database | PostgreSQL 16 |
| Cache | Redis 7 (ioredis) |
| Job Queue | BullMQ (Redis-backed) |
| File Storage | AWS S3 (or Wasabi S3-compatible) |
| Authentication | JWT (access 15min + refresh 7d) |
| Real-time | Socket.io (notifications, live updates) |
| Email | SendGrid |
| SMS/OTP | Twilio |
| Push Notifications | Firebase Admin SDK (FCM/APNs) |
| Payments | Razorpay (India) + Stripe (International) |
| AI | Google Gemini API + LangChain.js |
| Video Transcoding | AWS MediaConvert (or Mux.com) |
| Monitoring | Sentry + DataDog (or Grafana + Prometheus) |
| API Documentation | Swagger/OpenAPI 3.0 |

---

## 2. Project Structure

```
src/
├── api/                        # API route definitions
│   └── v1/
│       ├── auth.routes.ts
│       ├── users.routes.ts
│       ├── courses.routes.ts
│       ├── lessons.routes.ts
│       ├── quizzes.routes.ts
│       ├── certificates.routes.ts
│       ├── memberships.routes.ts
│       ├── payments.routes.ts
│       ├── ai.routes.ts
│       ├── notifications.routes.ts
│       ├── support.routes.ts
│       └── admin.routes.ts
│
├── controllers/               # Request handlers
├── services/                  # Business logic
├── repositories/              # Data access layer (Prisma queries)
├── middleware/
│   ├── auth.middleware.ts      # JWT verification
│   ├── rbac.middleware.ts      # Role-based access control
│   ├── validate.middleware.ts  # Zod input validation
│   ├── rateLimit.middleware.ts # Rate limiting (express-rate-limit)
│   ├── upload.middleware.ts    # Multer + S3 file upload
│   └── error.middleware.ts    # Global error handler
│
├── jobs/                      # BullMQ job definitions
│   ├── email.job.ts
│   ├── notification.job.ts
│   ├── certificate.job.ts
│   ├── video-transcode.job.ts
│   └── subscription-renewal.job.ts
│
├── workers/                   # BullMQ worker processes
├── lib/
│   ├── prisma.ts              # Prisma client singleton
│   ├── redis.ts               # Redis client
│   ├── queue.ts               # BullMQ queue instances
│   ├── s3.ts                  # AWS S3 client
│   ├── firebase.ts            # Firebase Admin
│   ├── sendgrid.ts            # SendGrid client
│   ├── gemini.ts              # Google Gemini API client
│   └── stripe.ts              # Stripe client
│
├── types/                     # TypeScript type definitions
├── utils/                     # Helpers, validators
├── config/                    # Configuration management
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Migration files
├── app.ts                     # Express app setup
└── server.ts                  # Server entry point
```

---

## 3. API Specifications

### Base URL
- Development: `http://localhost:4000/api/v1`
- Production: `https://api.learnflow.ai/api/v1`

### Standard Response Format
```json
// Success
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "limit": 20, "total": 150, "totalPages": 8 }
}

// Error
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_TOKEN",
    "message": "Invalid or expired authentication token",
    "details": []
  }
}
```

### Authentication Headers
```
Authorization: Bearer <access_token>
```

---

### 3.1 AUTH API

#### POST /auth/register
```json
// Request
{
  "email": "priya@example.com",
  "password": "SecurePass123!",
  "displayName": "Priya Sharma"
}

// Response 201
{
  "success": true,
  "data": {
    "message": "OTP sent to priya@example.com",
    "userId": "usr_abc123",
    "otpExpiresAt": "2026-07-07T06:25:00Z"
  }
}
```

#### POST /auth/verify-otp
```json
// Request
{ "userId": "usr_abc123", "otp": "847291" }

// Response 200
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR...",
    "refreshToken": "rt_...",
    "expiresIn": 900,
    "user": {
      "id": "usr_abc123",
      "email": "priya@example.com",
      "displayName": "Priya Sharma",
      "role": "STUDENT",
      "plan": "FREE",
      "onboardingCompleted": false
    }
  }
}
```

#### POST /auth/login
```json
// Request
{ "email": "priya@example.com", "password": "SecurePass123!" }
// Response: same structure as verify-otp
```

#### POST /auth/refresh-token
```json
// Request
{ "refreshToken": "rt_..." }
// Response: { accessToken, expiresIn }
```

#### POST /auth/logout
```json
// Headers: Authorization required
// Request: {}
// Response 200: { "success": true, "data": { "message": "Logged out" } }
```

#### POST /auth/forgot-password
```json
// Request: { "email": "priya@example.com" }
// Response: { "success": true, "data": { "message": "Reset email sent" } }
```

#### POST /auth/reset-password
```json
// Request: { "token": "reset_token_from_email", "newPassword": "NewPass123!" }
// Response: { "success": true, "data": { "message": "Password updated" } }
```

---

### 3.2 USERS API

#### GET /users/me
```json
// Response 200
{
  "success": true,
  "data": {
    "id": "usr_abc123",
    "email": "priya@example.com",
    "displayName": "Priya Sharma",
    "avatarUrl": "https://cdn.learnflow.ai/avatars/usr_abc123.jpg",
    "role": "STUDENT",
    "plan": "PRO",
    "xp": 1250,
    "level": 5,
    "streak": { "current": 14, "longest": 21, "freezes": 2 },
    "onboardingCompleted": true,
    "createdAt": "2026-07-01T10:00:00Z"
  }
}
```

#### PATCH /users/me
```json
// Request (any subset)
{ "displayName": "Priya S.", "ageRange": "18-25", "interests": ["technology", "design"] }
// Response: updated user object
```

#### GET /users/me/progress
```json
{
  "success": true,
  "data": {
    "coursesCompleted": 3,
    "lessonsCompleted": 47,
    "hoursLearned": 12.5,
    "certificatesEarned": 3,
    "quizzesTaken": 12,
    "averageQuizScore": 82,
    "weeklyActivity": [
      { "date": "2026-07-01", "minutesLearned": 25 },
      { "date": "2026-07-02", "minutesLearned": 0 }
    ]
  }
}
```

---

### 3.3 COURSES API

#### GET /courses
```
Query params: page, limit, category, level, minRating, maxPrice, search, sort
```
```json
// Response 200
{
  "success": true,
  "data": [
    {
      "id": "crs_xyz789",
      "title": "Python for Beginners",
      "slug": "python-for-beginners",
      "thumbnailUrl": "https://cdn.learnflow.ai/thumbnails/python.jpg",
      "instructor": { "id": "usr_instr1", "displayName": "Dr. Rajan", "avatarUrl": "..." },
      "category": { "id": "cat_tech", "name": "Technology" },
      "level": "BEGINNER",
      "durationHours": 8.5,
      "lessonsCount": 24,
      "price": 599,
      "currency": "INR",
      "includedInPro": true,
      "rating": 4.8,
      "reviewsCount": 1234,
      "enrolledCount": 12456,
      "isFree": false,
      "hasCertificate": true,
      "language": "English",
      "lastUpdated": "2026-06-15",
      "tags": ["python", "programming", "beginners"]
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 84, "totalPages": 5 }
}
```

#### GET /courses/:id
Returns full course with curriculum, instructor details, reviews sample, and user enrollment status.

#### POST /courses/:id/enroll
```json
// Request: {}
// Response 201: { "success": true, "data": { "enrollmentId": "enr_...", "enrolledAt": "..." } }
```

#### POST /courses (Trainer only)
```json
// Request
{
  "title": "Advanced React Patterns",
  "description": "Learn...",
  "categoryId": "cat_tech",
  "level": "ADVANCED",
  "price": 1299,
  "language": "English",
  "tags": ["react", "javascript"]
}
// Response 201: created draft course object
```

---

### 3.4 LESSONS API

#### GET /courses/:courseId/lessons
Returns ordered list of all lessons in a course (with user's completion state per lesson if authenticated).

#### GET /courses/:courseId/lessons/:lessonId
```json
{
  "success": true,
  "data": {
    "id": "lsn_123",
    "title": "Functions and Scope",
    "type": "VIDEO",
    "order": 5,
    "duration": 847,
    "videoUrl": "https://cdn.learnflow.ai/videos/lsn_123/hls/master.m3u8",
    "videoCaptionUrl": "https://cdn.learnflow.ai/captions/lsn_123.vtt",
    "resources": [
      { "name": "Lecture Notes.pdf", "url": "https://..." }
    ],
    "userProgress": {
      "lastPosition": 243,
      "completed": false,
      "notes": "Lorem ipsum..."
    }
  }
}
```

#### POST /courses/:courseId/lessons/:lessonId/progress
```json
// Request
{ "lastPosition": 423, "completed": true }
// Response 200: updated progress + XP awarded if completed
```

#### PATCH /courses/:courseId/lessons/:lessonId/notes
```json
// Request
{ "content": "Key concept: closures mean..." }
// Response 200: { "noteId": "nte_...", "savedAt": "..." }
```

---

### 3.5 QUIZ API

#### GET /courses/:courseId/quizzes/:quizId
Returns quiz metadata and questions (scrambled order, no correct answers exposed).

#### POST /courses/:courseId/quizzes/:quizId/submit
```json
// Request
{
  "answers": [
    { "questionId": "q_001", "selectedOptionIds": ["opt_a"] },
    { "questionId": "q_002", "selectedOptionIds": ["opt_c", "opt_d"] },
    { "questionId": "q_003", "textAnswer": "Python" }
  ],
  "timeTakenSeconds": 312
}

// Response 200
{
  "success": true,
  "data": {
    "attemptId": "att_...",
    "score": 80,
    "correctCount": 8,
    "totalCount": 10,
    "passed": true,
    "xpAwarded": 75,
    "badgeAwarded": { "id": "bdg_quiz_ace", "name": "Quiz Ace" },
    "reviewItems": [
      {
        "questionId": "q_001",
        "questionText": "What is a Python list?",
        "userAnswerIds": ["opt_a"],
        "correctAnswerIds": ["opt_a"],
        "isCorrect": true,
        "explanation": "A Python list is..."
      }
    ]
  }
}
```

---

### 3.6 CERTIFICATES API

#### GET /users/me/certificates
Returns array of earned certificates.

#### GET /certificates/:id
Public endpoint — no auth required. Returns certificate verification data.
```json
{
  "success": true,
  "data": {
    "certificateId": "cert_abc",
    "valid": true,
    "recipientName": "Priya Sharma",
    "courseName": "Python for Beginners",
    "completedAt": "2026-07-05",
    "instructorName": "Dr. Rajan Mehta",
    "issuerName": "LearnFlow AI"
  }
}
```

#### GET /certificates/:id/pdf
Streams PDF download (requires auth, validates ownership).

---

### 3.7 MEMBERSHIP API

#### GET /memberships/plans
Returns all active membership plan definitions.

#### GET /users/me/membership
Returns the authenticated user's current membership details.

#### POST /memberships/subscribe
```json
// Request
{ "planId": "plan_pro_monthly", "paymentMethodId": "pm_razorpay_..." }
// Response 201: membership object + payment confirmation
```

#### POST /memberships/cancel
Cancels at period end.

---

### 3.8 PAYMENTS API

#### POST /payments/create-order (Razorpay)
```json
// Request
{ "amount": 59900, "currency": "INR", "type": "course", "referenceId": "crs_xyz789" }

// Response 201
{
  "success": true,
  "data": {
    "orderId": "order_razorpay_...",
    "amount": 59900,
    "currency": "INR",
    "key": "rzp_live_..."
  }
}
```

#### POST /payments/verify (Razorpay webhook signature verification)
```json
// Request
{
  "razorpay_order_id": "order_...",
  "razorpay_payment_id": "pay_...",
  "razorpay_signature": "sha256_hash"
}
// Response 200: payment confirmed, enrollment/subscription activated
```

#### GET /payments/history
Returns paginated transaction history for authenticated user.

---

### 3.9 AI API

#### POST /ai/chat
```json
// Request
{
  "message": "Explain closures in Python with an example",
  "conversationId": "conv_abc123",
  "context": { "courseId": "crs_xyz789", "lessonId": "lsn_123" }
}

// Response 200 (streaming SSE supported)
{
  "success": true,
  "data": {
    "messageId": "msg_...",
    "role": "assistant",
    "content": "A closure in Python is...",
    "sources": [{ "lessonId": "lsn_123", "title": "Functions and Scope", "timestamp": 245 }],
    "queriesRemaining": 42
  }
}
```

#### POST /ai/study-plan
```json
// Request
{ "goalId": "get_job", "weeklyHours": 10, "startDate": "2026-07-10" }
// Response: { weeklyPlan: [...] }
```

#### POST /ai/generate-quiz (Trainer only)
```json
// Request
{ "lessonId": "lsn_123", "questionCount": 5, "difficulty": "medium" }
// Response: { questions: [...] }
```

---

### 3.10 NOTIFICATIONS API

#### GET /notifications
Returns user's notifications (paginated, with unread count).

#### PATCH /notifications/:id/read
Marks a notification as read.

#### PATCH /notifications/read-all

#### GET /notifications/preferences
Returns user's notification preference settings.

#### PATCH /notifications/preferences
```json
// Request
{
  "learningReminders": true,
  "streakAlerts": true,
  "achievements": true,
  "newCourses": false,
  "offersAndPromotions": false,
  "quietHoursStart": "22:00",
  "quietHoursEnd": "07:00"
}
```

---

### 3.11 SUPPORT API

#### GET /support/articles
FAQ search: `?query=payment+failed`

#### POST /support/tickets
```json
// Request
{
  "category": "PAYMENT",
  "subject": "My payment went through but course not unlocked",
  "description": "I paid ₹599 on July 5...",
  "attachmentUrls": ["https://s3.../screenshot.png"],
  "priority": "HIGH"
}
// Response 201: { ticketId, status: "OPEN", estimatedResponseTime: "8h" }
```

#### GET /support/tickets
Returns user's ticket list.

#### GET /support/tickets/:id
Returns ticket with full message thread.

#### POST /support/tickets/:id/reply
```json
// Request: { "message": "Thank you for the quick response..." }
```

---

### 3.12 ADMIN API

#### GET /admin/dashboard
Returns platform-wide KPIs.

#### GET /admin/users
Full user table with all filters.

#### PATCH /admin/users/:id
Update any user: role, plan, status.

#### POST /admin/notifications/broadcast
```json
// Request
{
  "segment": { "plan": ["FREE"], "lastActiveDaysAgo": 7 },
  "notification": {
    "title": "We miss you!",
    "body": "Come back and continue learning.",
    "ctaUrl": "/courses"
  },
  "channels": ["push", "email"],
  "scheduledAt": null
}
```

#### GET /admin/revenue
Revenue analytics with breakdown by plan, course, country.

---

## 4. Middleware Stack

```typescript
// app.ts — middleware execution order
app.use(helmet());                      // Security headers
app.use(cors(corsConfig));              // CORS configuration
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));             // HTTP request logging
app.use(rateLimiter);                   // Global rate limiter
app.use('/api', apiRouter);             // API routes
app.use(notFoundHandler);               // 404 handler
app.use(globalErrorHandler);            // Global error handler
```

```typescript
// RBAC middleware
export const requireRole = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Usage: requireRole('ADMIN', 'CONTENT_MANAGER')
```

---

## 5. Background Jobs (BullMQ)

| Queue | Job | Trigger | Priority |
|---|---|---|---|
| email-queue | welcome-email | User registration | High |
| email-queue | payment-receipt | Payment confirmed | High |
| email-queue | certificate-ready | Certificate generated | Medium |
| email-queue | streak-risk | 3 days inactive | Low |
| notification-queue | push-notification | Various triggers | Variable |
| certificate-queue | generate-pdf | Course completed | Medium |
| video-queue | transcode-video | Trainer upload | Low |
| analytics-queue | process-event | User action | Low |
| billing-queue | check-renewals | Daily cron (midnight) | High |
| billing-queue | retry-failed-payment | Payment failed | High |

---

## 6. Rate Limiting Configuration

| Endpoint Group | Window | Max Requests | Behavior |
|---|---|---|---|
| `POST /auth/login` | 15 min | 10 | Block + 429, email alert on 5+ |
| `POST /auth/register` | 1 hour | 5 | Block + 429 |
| `POST /auth/verify-otp` | 10 min | 3 | Block + 429 |
| `POST /ai/chat` | 1 min | 5 (Free), 20 (Pro) | 429 with upgrade CTA |
| `GET /courses` | 1 min | 60 | 429 |
| `POST /payments/*` | 5 min | 5 | Block + log |
| All other endpoints | 1 min | 100 | 429 |
