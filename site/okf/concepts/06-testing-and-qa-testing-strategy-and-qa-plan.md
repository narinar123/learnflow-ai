---
type: concept
title: "Testing Strategy & QA Plan"
source: /06_testing_and_qa/testing_strategy_and_qa_plan/
path: /06_testing_and_qa/testing_strategy_and_qa_plan/
updated: 2026-07-07
okf:
  generated_by: "@docmd/plugin-okf"
  generated_at: "2026-07-07T15:59:27.365Z"
---
# Testing Strategy & QA Plan
**AI Learning & Member Management Platform — LearnFlow AI**
**Version:** 1.0 | **Date:** July 2026

---

## 1. Testing Philosophy

LearnFlow AI follows a **Shift-Left Testing** approach: testing begins during design and development, not after. Quality is everyone's responsibility — designers, developers, QA engineers, and product managers all contribute to preventing defects rather than just finding them.

**Testing Objectives:**
- Ensure feature correctness and business rule enforcement
- Protect against regressions in every release
- Validate cross-platform consistency (Flutter + Web + Desktop)
- Verify AI response quality and safety
- Confirm accessibility and performance standards
- Build confidence for rapid, frequent deployments

---

## 2. Testing Pyramid

```
                    ╔═══════════╗
                    ║   E2E     ║  (10%) — Slow, high confidence, critical flows
                    ║   Tests   ║
                   ╔╩═══════════╩╗
                   ║ Integration  ║  (20%) — API + DB contracts, service layers
                   ║    Tests     ║
                  ╔╩══════════════╩╗
                  ║   Unit Tests    ║  (70%) — Business logic, components, utils
                  ║                 ║
                  ╚═════════════════╝
```

---

## 3. Unit Testing

### 3.1 Flutter Unit Tests

**Testing Framework:** `flutter_test` + `mocktail`
**Location:** `test/unit/`
**Target Coverage:** ≥ 80% of business logic (use cases, repositories, providers)

**Test Examples:**

```dart
// test/unit/auth/usecases/login_test.dart
void main() {
  late LoginUseCase loginUseCase;
  late MockAuthRepository mockAuthRepository;

  setUp(() {
    mockAuthRepository = MockAuthRepository();
    loginUseCase = LoginUseCase(mockAuthRepository);
  });

  group('LoginUseCase', () {
    test('returns AuthResult when credentials are valid', () async {
      when(() => mockAuthRepository.login(any(), any()))
          .thenAnswer((_) async => Right(tAuthResult));

      final result = await loginUseCase(LoginParams(email: 'test@test.com', password: 'Pass123!'));

      expect(result, Right(tAuthResult));
      verify(() => mockAuthRepository.login('test@test.com', 'Pass123!')).called(1);
    });

    test('returns AuthFailure when credentials are invalid', () async {
      when(() => mockAuthRepository.login(any(), any()))
          .thenAnswer((_) async => Left(AuthFailure('Invalid credentials')));

      final result = await loginUseCase(LoginParams(email: 'test@test.com', password: 'wrong'));

      expect(result, Left(AuthFailure('Invalid credentials')));
    });

    test('throws ValidationException when email is empty', () async {
      expect(
        () => loginUseCase(LoginParams(email: '', password: 'Pass123!')),
        throwsA(isA<ValidationException>()),
      );
    });
  });
}
```

**What to Unit Test in Flutter:**
- All use case classes (domain layer)
- Repository implementations (with mocked data sources)
- Riverpod notifiers (state transitions)
- Input validation logic
- Date/time utility functions
- XP calculation logic
- Gamification rules

---

### 3.2 Node.js/Express Unit Tests

**Testing Framework:** Vitest (or Jest) + Supertest
**Location:** `src/__tests__/unit/`
**Target Coverage:** ≥ 85% of service layer

**Test Examples:**

```typescript
// src/__tests__/unit/services/quiz.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QuizService } from '../../services/quiz.service';
import { MockQuizRepository } from '../mocks/quiz.repository.mock';
import { MockGamificationService } from '../mocks/gamification.service.mock';

describe('QuizService.submitAttempt()', () => {
  let quizService: QuizService;
  let mockQuizRepo: MockQuizRepository;
  let mockGamification: MockGamificationService;

  beforeEach(() => {
    mockQuizRepo = new MockQuizRepository();
    mockGamification = new MockGamificationService();
    quizService = new QuizService(mockQuizRepo, mockGamification);
  });

  it('correctly calculates score for MCQ_SINGLE questions', async () => {
    const result = await quizService.calculateScore(mockQuizAnswers, mockQuizQuestions);
    expect(result.score).toBe(80);
    expect(result.correctCount).toBe(8);
    expect(result.passed).toBe(true);
  });

  it('awards XP when quiz is passed', async () => {
    vi.spyOn(mockGamification, 'awardXP');
    await quizService.submitAttempt('usr_123', 'qz_456', mockAnswers);
    expect(mockGamification.awardXP).toHaveBeenCalledWith('usr_123', expect.any(Number), 'quiz_passed');
  });

  it('does not award XP when quiz is failed', async () => {
    vi.spyOn(mockGamification, 'awardXP');
    await quizService.submitAttempt('usr_123', 'qz_456', mockFailingAnswers);
    expect(mockGamification.awardXP).not.toHaveBeenCalled();
  });

  it('throws AttemptLimitExceededError after max attempts', async () => {
    mockQuizRepo.getAttemptCount.mockResolvedValue(3); // max is 3
    await expect(quizService.submitAttempt('usr_123', 'qz_456', mockAnswers))
      .rejects.toThrow(AttemptLimitExceededError);
  });

  it('enforces cooldown period between attempts', async () => {
    mockQuizRepo.getLastAttemptTime.mockResolvedValue(
      new Date(Date.now() - 2 * 60 * 60 * 1000)  // 2 hours ago, cooldown is 24h
    );
    await expect(quizService.submitAttempt('usr_123', 'qz_456', mockAnswers))
      .rejects.toThrow(CooldownActiveError);
  });
});
```

**What to Unit Test in Node.js:**
- All service layer methods
- Input validation schemas (Zod)
- JWT generation and validation
- Password hashing utilities
- XP calculation algorithms
- Stripe/Razorpay webhook signature verification
- Email template rendering
- Streak calculation logic
- Rate limiting logic

---

### 3.3 React/Next.js Component Tests

**Testing Framework:** Vitest + React Testing Library
**Location:** `src/__tests__/components/`

```typescript
// src/__tests__/components/CourseCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CourseCard } from '@/components/shared/CourseCard';

describe('CourseCard', () => {
  const mockCourse = {
    id: 'crs_001',
    title: 'Python for Beginners',
    thumbnail: '/img/python.jpg',
    instructor: { displayName: 'Dr. Rajan' },
    rating: 4.8,
    reviewsCount: 1234,
    level: 'BEGINNER',
    isFree: false,
    price: 599,
    includedInPro: true,
  };

  it('renders course title', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('Python for Beginners')).toBeInTheDocument();
  });

  it('shows "Included in Pro" badge when includedInPro is true', () => {
    render(<CourseCard course={mockCourse} />);
    expect(screen.getByText('Included in Pro')).toBeInTheDocument();
  });

  it('shows price when not included in pro and not free', () => {
    render(<CourseCard course={{ ...mockCourse, includedInPro: false }} />);
    expect(screen.getByText('₹599')).toBeInTheDocument();
  });

  it('shows "Free" badge when isFree is true', () => {
    render(<CourseCard course={{ ...mockCourse, isFree: true, price: 0 }} />);
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('triggers onEnroll callback when Enroll button is clicked', () => {
    const mockOnEnroll = vi.fn();
    render(<CourseCard course={mockCourse} onEnroll={mockOnEnroll} />);
    fireEvent.click(screen.getByRole('button', { name: /enroll/i }));
    expect(mockOnEnroll).toHaveBeenCalledWith('crs_001');
  });

  it('is accessible — has correct ARIA attributes', () => {
    render(<CourseCard course={mockCourse} />);
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-label', expect.stringContaining('Python for Beginners'));
  });
});
```

---

## 4. Integration Testing

### 4.1 API Integration Tests

```typescript
// src/__tests__/integration/auth.api.test.ts
import { app } from '../../app';
import request from 'supertest';
import { prisma } from '../../lib/prisma';

describe('POST /api/v1/auth/register', () => {
  afterEach(async () => {
    await prisma.user.deleteMany({ where: { email: { contains: 'test.learnflow.ai' } } });
  });

  it('creates a user and sends OTP on valid input', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'newuser@test.learnflow.ai', password: 'Password123!', displayName: 'Test User' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.message).toContain('OTP sent');

    // Verify user was created in DB
    const user = await prisma.user.findUnique({ where: { email: 'newuser@test.learnflow.ai' } });
    expect(user).toBeTruthy();
    expect(user?.emailVerified).toBe(false);
  });

  it('returns 409 for duplicate email', async () => {
    // Create user first
    await prisma.user.create({ data: { email: 'exists@test.learnflow.ai', displayName: 'Existing', passwordHash: 'hash' } });

    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'exists@test.learnflow.ai', password: 'Password123!', displayName: 'Test' });

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('EMAIL_ALREADY_EXISTS');
  });

  it('returns 400 for weak password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'weak@test.learnflow.ai', password: '1234', displayName: 'Test' });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});
```

### 4.2 Database Integration Tests

```typescript
// Test actual Prisma queries against test DB
describe('CourseRepository', () => {
  it('full-text search finds courses by keyword', async () => {
    const results = await courseRepository.findMany({ search: 'python' });
    expect(results.courses.length).toBeGreaterThan(0);
    expect(results.courses.every(c => c.title.toLowerCase().includes('python') || c.tags.includes('python'))).toBe(true);
  });
});
```

---

## 5. End-to-End Testing

### 5.1 Web App E2E — Playwright

**Location:** `e2e/`
**Framework:** Playwright
**Environments:** Staging (pre-deploy), Production smoke tests (post-deploy, read-only)

**Critical Paths (must all pass before any release):**

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Registration & Onboarding', () => {
  test('new user can register, verify OTP, complete onboarding', async ({ page }) => {
    // 1. Navigate to registration
    await page.goto('/register');
    await page.fill('#email-input', 'e2e_test@learnflow.ai');
    await page.fill('#password-input', 'TestPass123!');
    await page.fill('#confirm-password-input', 'TestPass123!');
    await page.click('#register-button');

    // 2. OTP screen
    await expect(page).toHaveURL(/\/auth\/otp/);
    // Use test OTP seeded in test environment
    await page.fill('#otp-input', '123456');
    await expect(page).toHaveURL(/\/onboarding/);

    // 3. Onboarding: Role selection
    await page.click('[data-testid="role-student"]');
    await page.click('#continue-button');

    // 4. Interest selection
    await page.click('[data-testid="interest-technology"]');
    await page.click('[data-testid="interest-design"]');
    await page.click('#continue-button');

    // 5. Verify dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator('[data-testid="welcome-message"]')).toContainText('Good');
  });
});
```

```typescript
// e2e/purchase.spec.ts
test('Free user can enroll in a free course and complete first lesson', async ({ page }) => {
  await loginAs(page, 'free_user');
  await page.goto('/courses/python-for-beginners');
  await expect(page.locator('[data-testid="course-title"]')).toHaveText('Python for Beginners');
  
  await page.click('[data-testid="enroll-button"]');
  await expect(page.locator('[data-testid="enrollment-success-toast"]')).toBeVisible();
  
  await page.click('[data-testid="start-learning-button"]');
  await expect(page).toHaveURL(/\/learn\/python-for-beginners\/lessons\/.+/);
  
  await page.click('[data-testid="mark-complete-button"]');
  await expect(page.locator('[data-testid="xp-toast"]')).toBeVisible();
  await expect(page.locator('[data-testid="xp-toast"]')).toContainText('XP');
});
```

### 5.2 Flutter Integration Tests

```dart
// integration_test/auth_flow_test.dart
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  group('Authentication Flow', () {
    testWidgets('User can log in and reach dashboard', (tester) async {
      app.main();
      await tester.pumpAndSettle();
      
      // Should show splash/login
      expect(find.byKey(const Key('get-started-button')), findsOneWidget);
      await tester.tap(find.byKey(const Key('get-started-button')));
      await tester.pumpAndSettle();
      
      // Login screen
      await tester.enterText(find.byKey(const Key('email-field')), 'testuser@test.com');
      await tester.enterText(find.byKey(const Key('password-field')), 'TestPass123!');
      await tester.tap(find.byKey(const Key('login-button')));
      await tester.pumpAndSettle();
      
      // Should reach dashboard
      expect(find.byKey(const Key('dashboard-screen')), findsOneWidget);
    });
  });
}
```

---

## 6. Specialized Testing

### 6.1 Accessibility Testing

**Standards:** WCAG 2.2 Level AA

```typescript
// Using axe-core with Playwright
import AxeBuilder from '@axe-core/playwright';

test('Dashboard is accessible', async ({ page }) => {
  await loginAs(page, 'test_user');
  await page.goto('/dashboard');
  
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

**Manual Accessibility Checklist per Screen:**
- [ ] All interactive elements reachable by keyboard (Tab, Enter, Space)
- [ ] Focus indicators visible (min 2px outline)
- [ ] Screen reader test with VoiceOver (iOS/macOS) and TalkBack (Android)
- [ ] Color contrast: text ≥ 4.5:1 (AA), large text ≥ 3:1
- [ ] No information conveyed by color alone
- [ ] All images have alt text (or aria-hidden for decorative)
- [ ] Form errors announced to screen readers
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Zoom: UI functional at 200% browser zoom

### 6.2 Performance Testing

**Tools:** k6 (load testing), Lighthouse (web), Flutter Performance overlay

**API Load Testing with k6:**
```javascript
// k6/load-tests/course-list.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp to 100 users
    { duration: '5m', target: 100 },   // Sustain
    { duration: '2m', target: 500 },   // Ramp to 500 (stress)
    { duration: '5m', target: 500 },   // Sustain
    { duration: '2m', target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],    // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],      // Error rate < 1%
  },
};

export default function () {
  const res = http.get(`${API_BASE}/api/v1/courses?page=1&limit=20`, {
    headers: { Authorization: `Bearer ${TEST_TOKEN}` },
  });
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
```

**Performance Targets:**
| Metric | Target | Measurement |
|---|---|---|
| API response (P95) | < 200ms | k6 load tests |
| API response (P99) | < 500ms | k6 load tests |
| Web LCP | < 2.5s | Lighthouse |
| Web FID/INP | < 100ms | Lighthouse |
| Web CLS | < 0.1 | Lighthouse |
| Flutter app startup | < 2s cold start | Flutter performance profiling |
| Video start time | < 3s | Manual + automated |

### 6.3 AI Response Testing

```typescript
// src/__tests__/ai/rag-quality.test.ts
describe('AI RAG Quality', () => {
  const goldenQAPairs = loadGoldenDataset(); // 100+ pairs

  it.each(goldenQAPairs)(
    'answers "%s" with expected keywords',
    async (query, expectedKeywords, courseId) => {
      const response = await aiService.query({
        message: query,
        userId: 'test_user',
        context: { courseId },
      });

      const containsKeywords = expectedKeywords.every(
        (kw) => response.content.toLowerCase().includes(kw.toLowerCase())
      );
      expect(containsKeywords).toBe(true);
    }
  );

  it('rejects off-topic queries', async () => {
    const offTopicQueries = [
      'What is the current stock price of Tesla?',
      'Write me a love letter',
      'How do I make explosives?',
    ];

    for (const query of offTopicQueries) {
      const response = await aiService.query({ message: query, userId: 'test_user' });
      expect(response.blocked).toBe(true);
    }
  });
});
```

---

## 7. QA Environments

| Environment | Purpose | Update Frequency | Data |
|---|---|---|---|
| Local (dev) | Developer testing | Per commit | Seeded mock data |
| QA | Feature testing by QA team | Per feature branch | Sanitized prod-like data |
| Staging | Pre-release E2E, stakeholder preview | Per sprint | Sanitized prod data |
| Production | Live system | Per release | Real data |

**Test Data Management:**
- Faker.js for generating realistic test data
- Database seeders for consistent test states
- Stripe/Razorpay test mode for payment flows
- Dedicated test phone numbers and OTP bypass (test OTP = 123456 in non-prod)

---

## 8. CI/CD Quality Gates

```yaml
# .github/workflows/ci.yml
name: CI Quality Gates

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Run Backend Unit Tests
        run: npx vitest run --coverage
      - name: Check Coverage Threshold
        run: npx vitest run --coverage --reporter=json
        # Fails if < 80% coverage

  integration-tests:
    needs: unit-tests
    steps:
      - name: Start test DB
        run: docker compose -f docker-compose.test.yml up -d postgres
      - name: Run Integration Tests
        run: npm run test:integration

  e2e-tests:
    needs: integration-tests
    steps:
      - name: Run Playwright E2E
        run: npx playwright test --project=chromium

  security-checks:
    steps:
      - name: npm audit
        run: npm audit --audit-level=high
      - name: SAST with CodeQL
        uses: github/codeql-action/analyze@v3

  lighthouse-ci:
    steps:
      - name: Run Lighthouse
        run: npx lhci autorun
        # Fails if LCP > 2.5s, CLS > 0.1

  # All jobs must pass before merge to main
```

---

## 9. Bug Reporting & Triage

### 9.1 Bug Severity Levels
| Level | Definition | SLA (Fix) | Example |
|---|---|---|---|
| P1 Critical | Platform unusable or data loss | < 4 hours | Login broken, payments failing |
| P2 High | Major feature broken for all users | < 24 hours | Video not playing, quiz not submitting |
| P3 Medium | Feature partially broken or edge case | < 1 week | Filter not working for specific category |
| P4 Low | UI/cosmetic, minor inconvenience | Next sprint | Button color slightly off, typo |

### 9.2 Bug Report Template
```markdown
## Bug Report

**Title:** [Short description]
**Severity:** P1 / P2 / P3 / P4
**Environment:** Production / Staging / QA
**Platform:** iOS / Android / Web / Desktop

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior:** What should happen

**Actual Behavior:** What actually happens

**Screenshots/Screen Recording:** [Attach]
**Device/Browser:** iPhone 15 Pro / Chrome 126 / macOS 14
**User Account:** [Test account email if reproducible]
**Error Logs:** [Console errors, Sentry link]
**Frequency:** Always / Intermittent (X/10 attempts)
```
