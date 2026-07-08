---
type: concept
title: "Security & Compliance"
source: /04_technical_architecture/security_and_compliance/
path: /04_technical_architecture/security_and_compliance/
updated: 2026-07-07
okf:
  generated_by: "@docmd/plugin-okf"
  generated_at: "2026-07-07T15:59:27.363Z"
---
# Security & Compliance
**AI Learning & Member Management Platform — LearnFlow AI**
**Version:** 1.0 | **Date:** July 2026

---

## 1. Security Philosophy

LearnFlow AI implements **Defense in Depth** — multiple layers of security controls so that even if one layer is breached, others prevent exploitation. Security is not an afterthought; it is baked into the design of every system component from Day 1.

**Security Pillars:**
1. Identity & Access — Who can do what
2. Data Protection — Protect at rest and in transit
3. Application Security — Prevent code-level vulnerabilities
4. Infrastructure Security — Secure the hosting environment
5. Incident Response — Detect, respond, recover

---

## 2. Authentication & Identity Security

### 2.1 JWT Token Strategy
```
Access Token:
  - Algorithm: HS256 (or RS256 for public key infrastructure)
  - Expiry: 15 minutes
  - Payload: { sub: userId, role, plan, iat, exp, jti (unique ID) }
  - Storage: In-memory (React/Flutter) — NOT in localStorage or cookies

Refresh Token:
  - Expiry: 7 days
  - Storage: Secure HttpOnly cookie (web) OR flutter_secure_storage (mobile)
  - Rotation: New refresh token issued on every use (refresh token rotation)
  - Single use: Old token immediately invalidated after rotation
  - Revocation: Stored as hashed value in refresh_tokens table; deleted on logout

Token Blacklist:
  - Compromised access tokens cached in Redis with TTL matching remaining expiry
  - Checked on every API request
```

### 2.2 Password Security
```
Hashing Algorithm: bcrypt with cost factor 12
Minimum password strength enforced server-side:
  - Minimum 8 characters
  - At least 1 uppercase, 1 number, 1 special character
  - Not a known breached password (HaveIBeenPwned API check — k-anonymity model)
Password history: Last 5 passwords stored (hashed), cannot reuse
Reset token: Cryptographically random 32-byte hex, valid 24 hours, single-use
```

### 2.3 OTP Security
```
Generation: crypto.randomInt(100000, 999999) — cryptographically secure random
Storage: Hashed with SHA-256 before storing in Redis
Expiry: 10 minutes
Attempt limit: 3 attempts before invalidation
Delivery rate limit: 1 OTP per 60 seconds per phone/email
Protection: Twilio's built-in rate limiting + our own rate limiter
```

### 2.4 Brute Force Protection
```
Login attempts: 5 per 15 minutes per IP + per account
OTP verification: 3 attempts per OTP
Password reset: 3 requests per hour per email
Progressive delay: 1s, 2s, 4s delay after 3+ failed attempts
Account lockout: 15 minutes after 5 failed attempts, email notification sent
```

### 2.5 Multi-Factor Authentication (MFA)
```
Institution Admins: MFA required (enforced)
Support Agents: MFA required (enforced)
Super Admins: MFA required + hardware key option (FIDO2/WebAuthn)
Other users: Optional — TOTP (Google Authenticator compatible) or backup codes
```

---

## 3. Data Protection

### 3.1 Encryption at Rest
```
Database (PostgreSQL):
  - AWS RDS with AES-256 encryption at rest
  - Encrypted snapshots (same key)
  - Key management via AWS KMS
  
File Storage (S3):
  - Server-Side Encryption: SSE-S3 (AES-256)
  - Bucket policies: block all public access
  - Pre-signed URLs for private content (15-minute expiry)
  
Sensitive fields (additional column-level encryption):
  - payment card data: never stored (tokenized by gateway)
  - `passwordHash`: bcrypt (not reversible)
  - `phone`: encrypted with AES-256-GCM before DB storage
  - AI conversation content: encrypted at rest with row-level key
  
Mobile (Flutter):
  - flutter_secure_storage → iOS Keychain / Android Keystore
  - Downloaded lesson videos: AES-256 encrypted with device-bound key
```

### 3.2 Encryption in Transit
```
All communications: TLS 1.3 minimum (TLS 1.2 fallback for old clients)
Certificate: Let's Encrypt with auto-renewal, or AWS Certificate Manager
HSTS: max-age=31536000; includeSubDomains; preload
Perfect Forward Secrecy: ECDHE cipher suites enforced
API Gateway: Cloudflare with TLS 1.3 + HTTP/2
Internal services: mTLS (mutual TLS) in Phase 2 when microservices introduced
```

### 3.3 Data Minimization & Privacy
```
Collection principle: Collect only what is functionally necessary
Payment data: Never stored — all card/UPI data handled by Razorpay/Stripe tokenization
User age data: Stored as range ("13-17") not exact date of birth
Location: Stored as country-level only (from IP geo-lookup for analytics)
IP addresses: Logged with a 90-day TTL then anonymized
Analytics: Anonymized after 12 months; PII stripped from event data
AI conversations: User can delete at any time; auto-purged after 90 days of inactivity
```

---

## 4. Application Security (OWASP Top 10)

### 4.1 SQL Injection Prevention
- Prisma ORM with parameterized queries — direct string interpolation into SQL is architecturally impossible
- Prisma raw queries (`$queryRaw`) only used where necessary, always with tagged template literals
- Input sanitization via Zod schema validation before any data reaches the DB layer

### 4.2 Cross-Site Scripting (XSS) Prevention
```javascript
// Helmet.js headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://checkout.razorpay.com", "'nonce-{random}'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://cdn.learnflow.ai"],
      connectSrc: ["'self'", "https://api.learnflow.ai"],
      frameAncestors: ["'none'"],
    },
  },
  xFrameOptions: { action: 'deny' },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));
```
- React/Next.js auto-escapes all JSX content (no dangerouslySetInnerHTML except in tightly controlled rich text renderer with DOMPurify sanitization)
- Rich text from trainers sanitized with DOMPurify before rendering

### 4.3 Cross-Site Request Forgery (CSRF)
- JWT-based authentication with Authorization header (not cookies) for API — immune to CSRF by design
- SameSite=Strict on all cookies
- Web app does not use form-based session cookies for API authentication

### 4.4 Broken Access Control
```typescript
// Every endpoint explicitly defines required permissions
router.patch('/admin/users/:id', 
  authenticate,                      // Must be authenticated
  requireRole('ADMIN'),              // Must be admin
  validate(updateUserSchema),        // Input validation
  auditLog('UPDATE', 'user'),        // Audit trail
  adminUsersController.updateUser    // Handler
);

// Ownership checks enforced in service layer
async function downloadCertificate(userId: string, certId: string) {
  const cert = await certRepository.findById(certId);
  if (!cert) throw new NotFoundError('Certificate not found');
  if (cert.userId !== userId) throw new ForbiddenError('Access denied');
  return generateCertificatePdf(cert);
}
```

### 4.5 Security Misconfiguration Prevention
- Environment variables managed via AWS Parameter Store / Secrets Manager (never in .env files in production)
- Debug mode: disabled in production (NODE_ENV=production enforced)
- Error messages: generic in production (no stack traces exposed to client)
- Dependency scanning: `npm audit` + Snyk in CI/CD pipeline
- Docker images: non-root user, minimal base image (node:20-alpine)

### 4.6 File Upload Security
```typescript
const upload = multer({
  storage: multerS3({...}),
  fileFilter: (req, file, cb) => {
    const allowedTypes = {
      'video/*': ['video/mp4', 'video/quicktime', 'video/webm'],
      'image/*': ['image/jpeg', 'image/png', 'image/webp'],
      'application/pdf': ['application/pdf'],
    };
    const isAllowed = Object.values(allowedTypes).flat().includes(file.mimetype);
    cb(null, isAllowed);
  },
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024,  // 2GB for video
    files: 1,
  },
});

// After upload: virus scan via AWS GuardDuty Malware Protection on S3
// Files quarantined if malware detected, uploader notified
```

### 4.7 Input Validation (Zod)
```typescript
// All API request bodies validated with Zod before processing
const registerSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128).regex(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    'Password must include uppercase, number, and special character'
  ),
  displayName: z.string().min(2).max(100).trim(),
});

// Validation middleware
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ success: false, error: { 
        code: 'VALIDATION_ERROR', 
        details: result.error.flatten().fieldErrors 
      }});
    }
    req.body = result.data;
    next();
  };
};
```

---

## 5. Infrastructure Security

### 5.1 Network Architecture
```
Internet
   ↓
Cloudflare (DDoS protection, WAF, TLS termination)
   ↓
AWS ALB (Load Balancer, SSL termination backup)
   ↓
Private Subnet — EC2 / ECS Fargate (API servers)
   ↓
Private Subnet — PostgreSQL RDS (DB, no public access)
   ↓
Private Subnet — Redis ElastiCache (Cache, no public access)

All internal communication via AWS VPC private IPs only.
No direct public internet access to DB or cache layers.
```

### 5.2 Container Security
```
Base image: node:20-alpine (minimal attack surface)
Non-root user: USER node (runs as uid 1000)
Read-only filesystem where possible
No secrets in Dockerfile or image layers
Regular image scanning: AWS ECR Scan + Trivy in CI/CD
```

### 5.3 Secrets Management
```
Development: .env files (gitignored)
Production: AWS Secrets Manager / Parameter Store
Rotation: Database passwords rotated every 90 days
API keys: Rotated every 180 days or immediately on suspected compromise
Access: Secrets accessible only to specific IAM roles (least privilege)
```

### 5.4 Logging & Monitoring
```
Application logs: Winston → CloudWatch Logs
Error tracking: Sentry (stack traces, user context)
Performance: DataDog APM or New Relic
Security events: CloudTrail (AWS API calls)
Audit logs: Stored in audit_logs table (all admin actions)
Alert triggers:
  - > 50 failed logins in 5 minutes from same IP
  - Admin panel access from new country
  - Database query time > 5 seconds
  - Error rate > 1% of requests
  - Payment failure rate > 5%
```

---

## 6. Compliance Frameworks

### 6.1 GDPR / India DPDPA Compliance

| Requirement | Implementation |
|---|---|
| Right to access | `GET /users/me` returns all personal data; `GET /users/me/data-export` generates full export |
| Right to erasure | `DELETE /users/me` triggers soft-delete → anonymization job (30-day grace period) |
| Right to portability | Data export in JSON format, emailed within 48 hours |
| Consent | Explicit consent recorded with timestamp and version for marketing emails, analytics |
| Data retention | Payment records: 7 years (legal), Chat logs: 90 days, Activity logs: 12 months |
| Data breach notification | Procedure: detect → notify DPO → notify users within 72 hours → notify regulator |
| DPA | Data Processing Agreement template available for institutional clients |
| Privacy policy | Accessible at /privacy, version-controlled, plain language |

### 6.2 COPPA Compliance (Minors, Age 13–17)
```
Age verification: Age range collected during onboarding
Parental consent: If age 13–15, parental consent email required
Data collection: Minimal — no location tracking, no behavioral profiling for ads
AI restrictions: More conservative content filters for minor accounts
Profile visibility: No public profiles for minor accounts
Data deletion: Easier deletion process for minors
```

### 6.3 Payment Card Industry (PCI DSS)
```
Scope: Minimal — we do not store, process, or transmit card data
Implementation: Razorpay and Stripe handle all card processing
Our responsibility: SAQ A compliance (merchant with outsourced cardholder data)
Requirements: Secure redirect to payment gateway, no card data in logs or DB
Annual review: SAQ A self-assessment completed annually
```

---

## 7. Security Testing

### 7.1 Pre-Launch VAPT Requirements
- Automated DAST scanning: OWASP ZAP against staging environment
- Dependency audit: `npm audit --audit-level=high` — zero high/critical vulnerabilities
- Static analysis: ESLint security rules + SonarQube
- Manual penetration testing: External security firm, 3-day engagement
- Red team exercise: Simulated phishing + social engineering test

### 7.2 Ongoing Security Testing
| Test | Frequency | Tool |
|---|---|---|
| Dependency vulnerability scan | Daily (CI/CD) | Snyk / npm audit |
| Container image scan | Per deployment | Trivy |
| DAST scan | Weekly | OWASP ZAP |
| Infrastructure scan | Monthly | AWS Inspector |
| Penetration test | Annually | External firm |
| Social engineering test | Annually | External firm |

---

## 8. Incident Response Plan

### 8.1 Incident Severity Levels
| Level | Description | Example | Response Time |
|---|---|---|---|
| P1 - Critical | Data breach, service down | DB exposed publicly | 15 minutes |
| P2 - High | Major feature broken, payment issue | Payment processing down | 1 hour |
| P3 - Medium | Degraded performance, minor feature broken | Slow API responses | 4 hours |
| P4 - Low | UI issue, minor bug | Button alignment wrong | 24 hours |

### 8.2 Response Procedure (P1 - Critical)
1. **Detect** — Automated alert fires (Sentry/DataDog) → On-call engineer paged
2. **Contain** — Isolate affected system; rotate credentials if compromised
3. **Assess** — Determine scope of breach/impact
4. **Notify** — Internal escalation → Legal/DPO → If user data affected: notify users within 72h
5. **Remediate** — Fix vulnerability, deploy patch, restore service
6. **Review** — Post-incident report within 48h; update runbooks
7. **Test** — Verify fix + run regression

### 8.3 Contact & Escalation
- Security email: security@learnflow.ai
- Bug bounty: Responsible disclosure program at hackerone.learnflow.ai
- On-call rotation: PagerDuty with 24/7 coverage for P1/P2 incidents
