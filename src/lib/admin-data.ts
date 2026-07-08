// ============================================================
// Admin Mock Data — GUIDESOFT IT SOLUTIONS Enterprise Admin Panel
// ============================================================

import { Role } from './rbac';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  joinedAt: string;
  lastActive: string;
  country: string;
}

export interface Student extends AdminUser {
  coursesEnrolled: number;
  coursesCompleted: number;
  xpPoints: number;
  level: number;
  plan: 'Free' | 'Pro' | 'Enterprise';
  certificates: number;
}

export interface Trainer extends AdminUser {
  coursesCreated: number;
  totalStudents: number;
  rating: number;
  revenue: number;
  specialty: string;
  verified: boolean;
}

export interface Institution {
  id: string;
  name: string;
  type: 'University' | 'College' | 'Bootcamp' | 'Corporate' | 'School';
  domain: string;
  seats: number;
  usedSeats: number;
  plan: 'Starter' | 'Growth' | 'Enterprise';
  status: 'active' | 'inactive' | 'trial';
  adminEmail: string;
  country: string;
  joinedAt: string;
  revenue: number;
}

export interface Recruiter extends AdminUser {
  company: string;
  jobPostings: number;
  hiresCount: number;
  industry: string;
  verified: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  trainer: string;
  status: 'draft' | 'published' | 'archived' | 'review';
  students: number;
  rating: number;
  revenue: number;
  lessons: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  isFree: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  coursesCount: number;
  studentsCount: number;
  color: string;
  status: 'active' | 'inactive';
}

export interface Lesson {
  id: string;
  title: string;
  course: string;
  module: string;
  type: 'video' | 'article' | 'quiz' | 'assignment' | 'live';
  duration: string;
  status: 'draft' | 'published';
  order: number;
  views: number;
  completionRate: number;
  createdAt: string;
}

export interface Module {
  id: string;
  title: string;
  course: string;
  lessonsCount: number;
  duration: string;
  order: number;
  status: 'draft' | 'published';
  completionRate: number;
}

export interface Quiz {
  id: string;
  title: string;
  course: string;
  questions: number;
  attempts: number;
  avgScore: number;
  passRate: number;
  timeLimit: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Certificate {
  id: string;
  studentName: string;
  courseName: string;
  issuedAt: string;
  expiresAt: string | null;
  credentialId: string;
  status: 'valid' | 'expired' | 'revoked';
  downloadCount: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly' | 'lifetime';
  features: string[];
  activeSubscribers: number;
  revenue: number;
  status: 'active' | 'inactive';
  color: string;
  isPopular: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  usageLimit: number;
  usedCount: number;
  minPurchase: number;
  expiresAt: string;
  status: 'active' | 'expired' | 'disabled';
  createdAt: string;
  applicableTo: 'all' | 'courses' | 'membership';
}

export interface Payment {
  id: string;
  studentName: string;
  studentEmail: string;
  item: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'refunded';
  method: 'card' | 'paypal' | 'stripe' | 'bank_transfer';
  createdAt: string;
  invoiceId: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  items: { description: string; amount: number }[];
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  issuedAt: string;
  dueAt: string;
  paidAt: string | null;
}

export interface AuditLog {
  id: string;
  actor: string;
  actorRole: Role;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
  status: 'success' | 'failed';
}

export interface ActivityLog {
  id: string;
  user: string;
  userType: 'student' | 'trainer' | 'admin';
  action: string;
  page: string;
  duration: number;
  timestamp: string;
  sessionId: string;
  device: string;
}

export interface Integration {
  id: string;
  name: string;
  category: 'payment' | 'email' | 'analytics' | 'storage' | 'crm' | 'video' | 'ai';
  status: 'connected' | 'disconnected' | 'error';
  icon: string;
  description: string;
  lastSync: string;
  eventsProcessed: number;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  scopes: string[];
  createdAt: string;
  lastUsed: string;
  expiresAt: string | null;
  status: 'active' | 'expired' | 'revoked';
  requestCount: number;
  createdBy: string;
}

export interface Prompt {
  id: string;
  name: string;
  category: string;
  prompt: string;
  model: string;
  tokens: number;
  usageCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface KnowledgeBaseDoc {
  id: string;
  title: string;
  category: string;
  content: string;
  tokens: number;
  status: 'indexed' | 'processing' | 'error' | 'draft';
  createdAt: string;
  updatedAt: string;
  usedInChats: number;
  source: 'upload' | 'url' | 'manual';
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const mockStudents: Student[] = [
  { id: 's1', name: 'Sarah Mitchell', email: 'sarah@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah', role: 'support_agent', status: 'active', joinedAt: '2024-01-15', lastActive: '2026-07-07', country: 'USA', coursesEnrolled: 12, coursesCompleted: 8, xpPoints: 4250, level: 7, plan: 'Pro', certificates: 5 },
  { id: 's2', name: 'James Okafor', email: 'james@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=James', role: 'support_agent', status: 'active', joinedAt: '2024-03-22', lastActive: '2026-07-06', country: 'Nigeria', coursesEnrolled: 7, coursesCompleted: 3, xpPoints: 1800, level: 4, plan: 'Free', certificates: 2 },
  { id: 's3', name: 'Priya Sharma', email: 'priya@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya', role: 'support_agent', status: 'active', joinedAt: '2023-11-10', lastActive: '2026-07-07', country: 'India', coursesEnrolled: 18, coursesCompleted: 14, xpPoints: 9200, level: 12, plan: 'Enterprise', certificates: 9 },
  { id: 's4', name: 'Carlos Ruiz', email: 'carlos@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos', role: 'support_agent', status: 'inactive', joinedAt: '2024-06-01', lastActive: '2026-05-20', country: 'Spain', coursesEnrolled: 4, coursesCompleted: 1, xpPoints: 620, level: 2, plan: 'Free', certificates: 0 },
  { id: 's5', name: 'Yuki Tanaka', email: 'yuki@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Yuki', role: 'support_agent', status: 'active', joinedAt: '2024-02-28', lastActive: '2026-07-07', country: 'Japan', coursesEnrolled: 9, coursesCompleted: 6, xpPoints: 3100, level: 6, plan: 'Pro', certificates: 4 },
  { id: 's6', name: 'Amara Diallo', email: 'amara@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Amara', role: 'support_agent', status: 'suspended', joinedAt: '2024-04-15', lastActive: '2026-06-10', country: 'Senegal', coursesEnrolled: 3, coursesCompleted: 0, xpPoints: 210, level: 1, plan: 'Free', certificates: 0 },
  { id: 's7', name: 'Liam Chen', email: 'liam@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Liam', role: 'support_agent', status: 'active', joinedAt: '2023-09-05', lastActive: '2026-07-07', country: 'Canada', coursesEnrolled: 22, coursesCompleted: 19, xpPoints: 11500, level: 15, plan: 'Enterprise', certificates: 12 },
  { id: 's8', name: 'Fatima Al-Hassan', email: 'fatima@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Fatima', role: 'support_agent', status: 'pending', joinedAt: '2026-07-01', lastActive: '2026-07-01', country: 'UAE', coursesEnrolled: 1, coursesCompleted: 0, xpPoints: 50, level: 1, plan: 'Free', certificates: 0 },
];

export const mockTrainers: Trainer[] = [
  { id: 't1', name: 'Dr. Marcus Webb', email: 'marcus@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Marcus', role: 'content_manager', status: 'active', joinedAt: '2023-01-10', lastActive: '2026-07-07', country: 'UK', coursesCreated: 12, totalStudents: 8420, rating: 4.9, revenue: 124500, specialty: 'Machine Learning', verified: true },
  { id: 't2', name: 'Ananya Krishnan', email: 'ananya@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ananya', role: 'content_manager', status: 'active', joinedAt: '2023-05-20', lastActive: '2026-07-06', country: 'India', coursesCreated: 8, totalStudents: 5200, rating: 4.8, revenue: 87300, specialty: 'Web Development', verified: true },
  { id: 't3', name: 'Roberto Santos', email: 'roberto@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Roberto', role: 'content_manager', status: 'active', joinedAt: '2023-08-14', lastActive: '2026-07-05', country: 'Brazil', coursesCreated: 6, totalStudents: 3100, rating: 4.7, revenue: 52000, specialty: 'Data Science', verified: true },
  { id: 't4', name: 'Sophie Laurent', email: 'sophie@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sophie', role: 'content_manager', status: 'inactive', joinedAt: '2024-01-05', lastActive: '2026-04-30', country: 'France', coursesCreated: 3, totalStudents: 890, rating: 4.5, revenue: 18900, specialty: 'UX Design', verified: false },
  { id: 't5', name: 'Kwame Asante', email: 'kwame@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Kwame', role: 'content_manager', status: 'active', joinedAt: '2023-11-22', lastActive: '2026-07-07', country: 'Ghana', coursesCreated: 9, totalStudents: 6700, rating: 4.9, revenue: 93000, specialty: 'Cybersecurity', verified: true },
];

export const mockInstitutions: Institution[] = [
  { id: 'i1', name: 'Stanford Online', type: 'University', domain: 'stanford.edu', seats: 5000, usedSeats: 4230, plan: 'Enterprise', status: 'active', adminEmail: 'admin@stanford.edu', country: 'USA', joinedAt: '2023-01-01', revenue: 450000 },
  { id: 'i2', name: 'TechBoot Academy', type: 'Bootcamp', domain: 'techboot.io', seats: 500, usedSeats: 482, plan: 'Growth', status: 'active', adminEmail: 'ops@techboot.io', country: 'USA', joinedAt: '2023-06-15', revenue: 120000 },
  { id: 'i3', name: 'Future Skills Corp', type: 'Corporate', domain: 'futureskills.com', seats: 2000, usedSeats: 1200, plan: 'Enterprise', status: 'active', adminEmail: 'hr@futureskills.com', country: 'UK', joinedAt: '2024-01-10', revenue: 280000 },
  { id: 'i4', name: 'Digital Minds College', type: 'College', domain: 'digitalminds.edu', seats: 800, usedSeats: 340, plan: 'Growth', status: 'trial', adminEmail: 'it@digitalminds.edu', country: 'Canada', joinedAt: '2026-06-01', revenue: 0 },
  { id: 'i5', name: 'LearnQuick School', type: 'School', domain: 'learnquick.sch', seats: 200, usedSeats: 89, plan: 'Starter', status: 'active', adminEmail: 'admin@learnquick.sch', country: 'Australia', joinedAt: '2024-09-01', revenue: 22000 },
];

export const mockRecruiters: Recruiter[] = [
  { id: 'r1', name: 'Jennifer Park', email: 'jpark@google.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jennifer', role: 'support_agent', status: 'active', joinedAt: '2024-02-01', lastActive: '2026-07-07', country: 'USA', company: 'Google', jobPostings: 24, hiresCount: 8, industry: 'Technology', verified: true },
  { id: 'r2', name: 'Michael Torres', email: 'mtorres@microsoft.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Michael', role: 'support_agent', status: 'active', joinedAt: '2024-03-15', lastActive: '2026-07-06', country: 'USA', company: 'Microsoft', jobPostings: 18, hiresCount: 12, industry: 'Technology', verified: true },
  { id: 'r3', name: 'Aisha Mohammed', email: 'aisha@deloitte.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Aisha', role: 'support_agent', status: 'active', joinedAt: '2024-01-20', lastActive: '2026-07-05', country: 'UK', company: 'Deloitte', jobPostings: 31, hiresCount: 15, industry: 'Consulting', verified: true },
  { id: 'r4', name: 'Thomas Mueller', email: 'tmueller@bmw.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Thomas', role: 'support_agent', status: 'inactive', joinedAt: '2024-05-10', lastActive: '2026-06-01', country: 'Germany', company: 'BMW', jobPostings: 5, hiresCount: 1, industry: 'Automotive', verified: false },
];

export const mockCourses: Course[] = [
  { id: 'c1', title: 'Machine Learning Mastery', category: 'Data Science', trainer: 'Dr. Marcus Webb', status: 'published', students: 3420, rating: 4.9, revenue: 68400, lessons: 48, duration: '24h', level: 'Advanced', thumbnail: '', createdAt: '2023-03-15', updatedAt: '2026-06-20', price: 199, isFree: false },
  { id: 'c2', title: 'React & Next.js Complete Guide', category: 'Web Development', trainer: 'Ananya Krishnan', status: 'published', students: 5200, rating: 4.8, revenue: 93600, lessons: 62, duration: '38h', level: 'Intermediate', thumbnail: '', createdAt: '2023-06-01', updatedAt: '2026-07-01', price: 149, isFree: false },
  { id: 'c3', title: 'Python for Data Analysis', category: 'Data Science', trainer: 'Roberto Santos', status: 'published', students: 2800, rating: 4.7, revenue: 42000, lessons: 35, duration: '18h', level: 'Beginner', thumbnail: '', createdAt: '2023-08-20', updatedAt: '2026-05-15', price: 99, isFree: false },
  { id: 'c4', title: 'UI/UX Design Fundamentals', category: 'Design', trainer: 'Sophie Laurent', status: 'draft', students: 0, rating: 0, revenue: 0, lessons: 28, duration: '16h', level: 'Beginner', thumbnail: '', createdAt: '2026-06-30', updatedAt: '2026-07-07', price: 129, isFree: false },
  { id: 'c5', title: 'Ethical Hacking & Penetration Testing', category: 'Cybersecurity', trainer: 'Kwame Asante', status: 'published', students: 4100, rating: 4.9, revenue: 123000, lessons: 55, duration: '42h', level: 'Advanced', thumbnail: '', createdAt: '2023-11-15', updatedAt: '2026-07-05', price: 249, isFree: false },
  { id: 'c6', title: 'JavaScript Basics for Beginners', category: 'Web Development', trainer: 'Ananya Krishnan', status: 'published', students: 8900, rating: 4.6, revenue: 0, lessons: 22, duration: '12h', level: 'Beginner', thumbnail: '', createdAt: '2024-01-10', updatedAt: '2026-04-20', price: 0, isFree: true },
  { id: 'c7', title: 'Deep Learning with TensorFlow', category: 'AI & ML', trainer: 'Dr. Marcus Webb', status: 'review', students: 0, rating: 0, revenue: 0, lessons: 40, duration: '28h', level: 'Advanced', thumbnail: '', createdAt: '2026-07-01', updatedAt: '2026-07-07', price: 299, isFree: false },
  { id: 'c8', title: 'Cloud Architecture on AWS', category: 'Cloud Computing', trainer: 'Kwame Asante', status: 'published', students: 2600, rating: 4.8, revenue: 91000, lessons: 44, duration: '30h', level: 'Intermediate', thumbnail: '', createdAt: '2024-02-15', updatedAt: '2026-06-30', price: 229, isFree: false },
];

export const mockCategories: Category[] = [
  { id: 'cat1', name: 'Data Science', slug: 'data-science', icon: '📊', coursesCount: 24, studentsCount: 18400, color: 'from-blue-500 to-cyan-400', status: 'active' },
  { id: 'cat2', name: 'Web Development', slug: 'web-development', icon: '🌐', coursesCount: 38, studentsCount: 32100, color: 'from-purple-500 to-pink-400', status: 'active' },
  { id: 'cat3', name: 'Cybersecurity', slug: 'cybersecurity', icon: '🔒', coursesCount: 15, studentsCount: 9800, color: 'from-red-500 to-orange-400', status: 'active' },
  { id: 'cat4', name: 'Design', slug: 'design', icon: '🎨', coursesCount: 19, studentsCount: 12300, color: 'from-pink-500 to-rose-400', status: 'active' },
  { id: 'cat5', name: 'AI & ML', slug: 'ai-ml', icon: '🤖', coursesCount: 22, studentsCount: 15600, color: 'from-violet-500 to-purple-400', status: 'active' },
  { id: 'cat6', name: 'Cloud Computing', slug: 'cloud-computing', icon: '☁️', coursesCount: 11, studentsCount: 7200, color: 'from-sky-500 to-blue-400', status: 'active' },
  { id: 'cat7', name: 'Mobile Development', slug: 'mobile-dev', icon: '📱', coursesCount: 8, studentsCount: 4500, color: 'from-green-500 to-emerald-400', status: 'inactive' },
  { id: 'cat8', name: 'DevOps', slug: 'devops', icon: '⚙️', coursesCount: 13, studentsCount: 6800, color: 'from-yellow-500 to-amber-400', status: 'active' },
];

export const mockLessons: Lesson[] = [
  { id: 'l1', title: 'Introduction to Machine Learning', course: 'Machine Learning Mastery', module: 'Module 1: Foundations', type: 'video', duration: '32min', status: 'published', order: 1, views: 4200, completionRate: 94, createdAt: '2023-03-15' },
  { id: 'l2', title: 'Supervised vs Unsupervised Learning', course: 'Machine Learning Mastery', module: 'Module 1: Foundations', type: 'video', duration: '28min', status: 'published', order: 2, views: 3800, completionRate: 88, createdAt: '2023-03-16' },
  { id: 'l3', title: 'Python Setup & Environment', course: 'React & Next.js Complete Guide', module: 'Module 1: Setup', type: 'article', duration: '15min', status: 'published', order: 1, views: 5100, completionRate: 97, createdAt: '2023-06-01' },
  { id: 'l4', title: 'React Components Deep Dive', course: 'React & Next.js Complete Guide', module: 'Module 2: React Core', type: 'video', duration: '45min', status: 'published', order: 2, views: 4600, completionRate: 82, createdAt: '2023-06-05' },
  { id: 'l5', title: 'Final Assessment Quiz', course: 'Machine Learning Mastery', module: 'Module 6: Capstone', type: 'quiz', duration: '60min', status: 'published', order: 1, views: 2100, completionRate: 71, createdAt: '2023-04-20' },
  { id: 'l6', title: 'Live Coding Session: Build a Neural Net', course: 'Deep Learning with TensorFlow', module: 'Module 1: Intro', type: 'live', duration: '90min', status: 'draft', order: 1, views: 0, completionRate: 0, createdAt: '2026-07-01' },
];

export const mockModules: Module[] = [
  { id: 'm1', title: 'Module 1: Foundations', course: 'Machine Learning Mastery', lessonsCount: 8, duration: '4h', order: 1, status: 'published', completionRate: 91 },
  { id: 'm2', title: 'Module 2: Supervised Learning', course: 'Machine Learning Mastery', lessonsCount: 10, duration: '5h', order: 2, status: 'published', completionRate: 84 },
  { id: 'm3', title: 'Module 1: Setup & Installation', course: 'React & Next.js Complete Guide', lessonsCount: 6, duration: '3h', order: 1, status: 'published', completionRate: 96 },
  { id: 'm4', title: 'Module 2: React Core Concepts', course: 'React & Next.js Complete Guide', lessonsCount: 12, duration: '7h', order: 2, status: 'published', completionRate: 79 },
  { id: 'm5', title: 'Module 1: Intro to TensorFlow', course: 'Deep Learning with TensorFlow', lessonsCount: 5, duration: '3h', order: 1, status: 'draft', completionRate: 0 },
];

export const mockQuizzes: Quiz[] = [
  { id: 'q1', title: 'ML Fundamentals Quiz', course: 'Machine Learning Mastery', questions: 20, attempts: 3100, avgScore: 74, passRate: 82, timeLimit: 30, status: 'active', createdAt: '2023-04-01' },
  { id: 'q2', title: 'React Hooks Assessment', course: 'React & Next.js Complete Guide', questions: 15, attempts: 4200, avgScore: 81, passRate: 89, timeLimit: 25, status: 'active', createdAt: '2023-07-15' },
  { id: 'q3', title: 'Python Data Structures', course: 'Python for Data Analysis', questions: 12, attempts: 2400, avgScore: 78, passRate: 85, timeLimit: 20, status: 'active', createdAt: '2023-09-10' },
  { id: 'q4', title: 'Penetration Testing Scenarios', course: 'Ethical Hacking', questions: 25, attempts: 1800, avgScore: 68, passRate: 72, timeLimit: 45, status: 'active', createdAt: '2024-01-05' },
  { id: 'q5', title: 'TensorFlow Basics Check', course: 'Deep Learning with TensorFlow', questions: 10, attempts: 0, avgScore: 0, passRate: 0, timeLimit: 15, status: 'inactive', createdAt: '2026-07-01' },
];

export const mockCertificates: Certificate[] = [
  { id: 'cert1', studentName: 'Sarah Mitchell', courseName: 'Machine Learning Mastery', issuedAt: '2024-06-15', expiresAt: null, credentialId: 'LF-ML-001234', status: 'valid', downloadCount: 8 },
  { id: 'cert2', studentName: 'Priya Sharma', courseName: 'React & Next.js Complete Guide', issuedAt: '2024-08-22', expiresAt: null, credentialId: 'LF-WD-005678', status: 'valid', downloadCount: 14 },
  { id: 'cert3', studentName: 'Liam Chen', courseName: 'Ethical Hacking & Penetration Testing', issuedAt: '2024-03-10', expiresAt: '2026-03-10', credentialId: 'LF-CS-002345', status: 'expired', downloadCount: 22 },
  { id: 'cert4', studentName: 'Yuki Tanaka', courseName: 'Python for Data Analysis', issuedAt: '2025-01-18', expiresAt: null, credentialId: 'LF-DS-007890', status: 'valid', downloadCount: 5 },
  { id: 'cert5', studentName: 'Carlos Ruiz', courseName: 'JavaScript Basics', issuedAt: '2024-11-30', expiresAt: null, credentialId: 'LF-JS-009012', status: 'revoked', downloadCount: 1 },
];

export const mockPlans: MembershipPlan[] = [
  { id: 'p1', name: 'Free', price: 0, billingCycle: 'monthly', features: ['5 courses/month', 'Community access', 'Basic AI tutor'], activeSubscribers: 18400, revenue: 0, status: 'active', color: 'from-gray-500 to-slate-400', isPopular: false },
  { id: 'p2', name: 'Pro', price: 29, billingCycle: 'monthly', features: ['Unlimited courses', 'AI tutor', 'Certificates', 'Priority support', 'Offline access'], activeSubscribers: 8200, revenue: 237800, status: 'active', color: 'from-purple-500 to-violet-400', isPopular: true },
  { id: 'p3', name: 'Pro Annual', price: 249, billingCycle: 'yearly', features: ['Everything in Pro', '2 months free', 'Early access features'], activeSubscribers: 3100, revenue: 771900, status: 'active', color: 'from-violet-600 to-purple-400', isPopular: false },
  { id: 'p4', name: 'Enterprise', price: 299, billingCycle: 'monthly', features: ['Unlimited seats', 'Custom branding', 'SSO', 'Analytics API', 'Dedicated support', 'SLA 99.9%'], activeSubscribers: 420, revenue: 125580, status: 'active', color: 'from-amber-500 to-yellow-400', isPopular: false },
  { id: 'p5', name: 'Lifetime', price: 799, billingCycle: 'lifetime', features: ['Lifetime Pro access', 'All future features', 'Priority support forever'], activeSubscribers: 890, revenue: 711110, status: 'active', color: 'from-teal-500 to-cyan-400', isPopular: false },
];

export const mockCoupons: Coupon[] = [
  { id: 'cp1', code: 'LAUNCH50', type: 'percentage', value: 50, usageLimit: 500, usedCount: 342, minPurchase: 0, expiresAt: '2026-08-31', status: 'active', createdAt: '2026-06-01', applicableTo: 'all' },
  { id: 'cp2', code: 'SUMMER25', type: 'percentage', value: 25, usageLimit: 1000, usedCount: 891, minPurchase: 50, expiresAt: '2026-07-31', status: 'active', createdAt: '2026-06-15', applicableTo: 'courses' },
  { id: 'cp3', code: 'FLAT20', type: 'fixed', value: 20, usageLimit: 200, usedCount: 200, minPurchase: 100, expiresAt: '2026-06-30', status: 'expired', createdAt: '2026-05-01', applicableTo: 'all' },
  { id: 'cp4', code: 'PRO30', type: 'percentage', value: 30, usageLimit: 300, usedCount: 45, minPurchase: 0, expiresAt: '2026-09-30', status: 'active', createdAt: '2026-07-01', applicableTo: 'membership' },
  { id: 'cp5', code: 'WELCOME10', type: 'fixed', value: 10, usageLimit: 5000, usedCount: 3210, minPurchase: 0, expiresAt: '2026-12-31', status: 'active', createdAt: '2025-01-01', applicableTo: 'all' },
];

export const mockPayments: Payment[] = [
  { id: 'pay1', studentName: 'Sarah Mitchell', studentEmail: 'sarah@example.com', item: 'Pro Plan — Monthly', amount: 29, currency: 'USD', status: 'succeeded', method: 'card', createdAt: '2026-07-07T14:32:00Z', invoiceId: 'INV-2026-001' },
  { id: 'pay2', studentName: 'Priya Sharma', studentEmail: 'priya@example.com', item: 'Machine Learning Mastery', amount: 199, currency: 'USD', status: 'succeeded', method: 'paypal', createdAt: '2026-07-07T12:15:00Z', invoiceId: 'INV-2026-002' },
  { id: 'pay3', studentName: 'Liam Chen', studentEmail: 'liam@example.com', item: 'Enterprise Plan — Monthly', amount: 299, currency: 'USD', status: 'succeeded', method: 'stripe', createdAt: '2026-07-06T09:00:00Z', invoiceId: 'INV-2026-003' },
  { id: 'pay4', studentName: 'Carlos Ruiz', studentEmail: 'carlos@example.com', item: 'Pro Plan — Monthly', amount: 29, currency: 'USD', status: 'failed', method: 'card', createdAt: '2026-07-06T16:45:00Z', invoiceId: 'INV-2026-004' },
  { id: 'pay5', studentName: 'Yuki Tanaka', studentEmail: 'yuki@example.com', item: 'Pro Annual Plan', amount: 249, currency: 'USD', status: 'succeeded', method: 'card', createdAt: '2026-07-05T11:20:00Z', invoiceId: 'INV-2026-005' },
  { id: 'pay6', studentName: 'James Okafor', studentEmail: 'james@example.com', item: 'Ethical Hacking Course', amount: 249, currency: 'USD', status: 'refunded', method: 'paypal', createdAt: '2026-07-04T08:30:00Z', invoiceId: 'INV-2026-006' },
];

export const mockInvoices: Invoice[] = [
  { id: 'inv1', invoiceNumber: 'INV-2026-001', customerName: 'Sarah Mitchell', customerEmail: 'sarah@example.com', items: [{ description: 'Pro Plan — Monthly', amount: 29 }], total: 29, status: 'paid', issuedAt: '2026-07-07', dueAt: '2026-07-14', paidAt: '2026-07-07' },
  { id: 'inv2', invoiceNumber: 'INV-2026-002', customerName: 'Priya Sharma', customerEmail: 'priya@example.com', items: [{ description: 'Machine Learning Mastery Course', amount: 199 }], total: 199, status: 'paid', issuedAt: '2026-07-07', dueAt: '2026-07-14', paidAt: '2026-07-07' },
  { id: 'inv3', invoiceNumber: 'INV-2026-003', customerName: 'Stanford Online', customerEmail: 'admin@stanford.edu', items: [{ description: 'Enterprise Plan — Monthly (500 seats)', amount: 4500 }, { description: 'Setup Fee', amount: 500 }], total: 5000, status: 'paid', issuedAt: '2026-07-01', dueAt: '2026-07-15', paidAt: '2026-07-03' },
  { id: 'inv4', invoiceNumber: 'INV-2026-004', customerName: 'Future Skills Corp', customerEmail: 'hr@futureskills.com', items: [{ description: 'Enterprise Plan — Monthly (200 seats)', amount: 2200 }], total: 2200, status: 'pending', issuedAt: '2026-07-05', dueAt: '2026-07-19', paidAt: null },
  { id: 'inv5', invoiceNumber: 'INV-2026-005', customerName: 'TechBoot Academy', customerEmail: 'ops@techboot.io', items: [{ description: 'Growth Plan — Monthly (50 seats)', amount: 450 }], total: 450, status: 'overdue', issuedAt: '2026-06-01', dueAt: '2026-06-15', paidAt: null },
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'al1', actor: 'Alex Rivera', actorRole: 'super_admin', action: 'DELETE_USER', resource: 'User', resourceId: 's6', details: 'Suspended user account for TOS violation', ipAddress: '192.168.1.1', userAgent: 'Chrome/126', timestamp: '2026-07-07T18:30:00Z', severity: 'critical', status: 'success' },
  { id: 'al2', actor: 'Alex Rivera', actorRole: 'super_admin', action: 'UPDATE_PERMISSION', resource: 'Role', resourceId: 'content_manager', details: 'Added cms:publish permission to content_manager', ipAddress: '192.168.1.1', userAgent: 'Chrome/126', timestamp: '2026-07-07T17:15:00Z', severity: 'warning', status: 'success' },
  { id: 'al3', actor: 'Finance Bot', actorRole: 'finance_manager', action: 'PROCESS_REFUND', resource: 'Payment', resourceId: 'pay6', details: 'Issued refund of $249 to james@example.com', ipAddress: '10.0.0.5', userAgent: 'API/2.0', timestamp: '2026-07-07T16:00:00Z', severity: 'warning', status: 'success' },
  { id: 'al4', actor: 'Content Bot', actorRole: 'content_manager', action: 'PUBLISH_COURSE', resource: 'Course', resourceId: 'c7', details: 'Attempted to publish course without review approval', ipAddress: '10.0.0.8', userAgent: 'API/2.0', timestamp: '2026-07-07T15:30:00Z', severity: 'warning', status: 'failed' },
  { id: 'al5', actor: 'Alex Rivera', actorRole: 'super_admin', action: 'GENERATE_API_KEY', resource: 'ApiKey', resourceId: 'ak3', details: 'Generated new API key for Zapier integration', ipAddress: '192.168.1.1', userAgent: 'Chrome/126', timestamp: '2026-07-07T14:00:00Z', severity: 'info', status: 'success' },
  { id: 'al6', actor: 'Alex Rivera', actorRole: 'super_admin', action: 'BULK_EMAIL', resource: 'Marketing', resourceId: 'camp3', details: 'Sent campaign email to 8,420 users', ipAddress: '192.168.1.1', userAgent: 'Chrome/126', timestamp: '2026-07-07T12:00:00Z', severity: 'info', status: 'success' },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: 'actl1', user: 'Sarah Mitchell', userType: 'student', action: 'LESSON_COMPLETE', page: '/learn/ml-mastery/lesson-12', duration: 32, timestamp: '2026-07-07T19:45:00Z', sessionId: 'sess-abc123', device: 'Desktop Chrome' },
  { id: 'actl2', user: 'Priya Sharma', userType: 'student', action: 'QUIZ_SUBMIT', page: '/learn/react-nextjs/quiz-3', duration: 18, timestamp: '2026-07-07T19:30:00Z', sessionId: 'sess-def456', device: 'Mobile Safari' },
  { id: 'actl3', user: 'Dr. Marcus Webb', userType: 'trainer', action: 'LESSON_UPLOAD', page: '/trainer/dashboard/upload', duration: 5, timestamp: '2026-07-07T18:00:00Z', sessionId: 'sess-ghi789', device: 'Desktop Firefox' },
  { id: 'actl4', user: 'Liam Chen', userType: 'student', action: 'CERTIFICATE_DOWNLOAD', page: '/profile/certificates', duration: 1, timestamp: '2026-07-07T17:30:00Z', sessionId: 'sess-jkl012', device: 'Desktop Chrome' },
  { id: 'actl5', user: 'James Okafor', userType: 'student', action: 'PAGE_VIEW', page: '/courses', duration: 4, timestamp: '2026-07-07T17:00:00Z', sessionId: 'sess-mno345', device: 'Tablet Android' },
  { id: 'actl6', user: 'Alex Rivera', userType: 'admin', action: 'LOGIN', page: '/admin/dashboard', duration: 0, timestamp: '2026-07-07T14:00:00Z', sessionId: 'sess-pqr678', device: 'Desktop Chrome' },
];

export const mockIntegrations: Integration[] = [
  { id: 'int1', name: 'Stripe', category: 'payment', status: 'connected', icon: '💳', description: 'Payment processing for subscriptions and one-time purchases.', lastSync: '2026-07-07T19:00:00Z', eventsProcessed: 48200 },
  { id: 'int2', name: 'SendGrid', category: 'email', status: 'connected', icon: '📧', description: 'Transactional and marketing email delivery.', lastSync: '2026-07-07T18:30:00Z', eventsProcessed: 125000 },
  { id: 'int3', name: 'Google Analytics', category: 'analytics', status: 'connected', icon: '📊', description: 'Website traffic and user behavior analytics.', lastSync: '2026-07-07T19:30:00Z', eventsProcessed: 890000 },
  { id: 'int4', name: 'AWS S3', category: 'storage', status: 'connected', icon: '☁️', description: 'Media and document storage.', lastSync: '2026-07-07T19:45:00Z', eventsProcessed: 34500 },
  { id: 'int5', name: 'Zoom', category: 'video', status: 'connected', icon: '🎥', description: 'Live session and webinar hosting.', lastSync: '2026-07-07T16:00:00Z', eventsProcessed: 1200 },
  { id: 'int6', name: 'HubSpot', category: 'crm', status: 'disconnected', icon: '🏷️', description: 'CRM for managing leads and institutional contacts.', lastSync: '2026-06-01T00:00:00Z', eventsProcessed: 0 },
  { id: 'int7', name: 'OpenAI', category: 'ai', status: 'connected', icon: '🤖', description: 'AI model for tutoring, content generation, and Q&A.', lastSync: '2026-07-07T19:50:00Z', eventsProcessed: 220000 },
  { id: 'int8', name: 'Zapier', category: 'crm', status: 'error', icon: '⚡', description: 'Workflow automation and third-party app connections.', lastSync: '2026-07-06T12:00:00Z', eventsProcessed: 8400 },
];

export const mockApiKeys: ApiKey[] = [
  { id: 'ak1', name: 'Mobile App — iOS', key: 'lf_live_sk_ios_****8a2f', scopes: ['courses:read', 'users:read', 'payments:read'], createdAt: '2025-01-15', lastUsed: '2026-07-07', expiresAt: '2027-01-15', status: 'active', requestCount: 2840000, createdBy: 'Alex Rivera' },
  { id: 'ak2', name: 'Mobile App — Android', key: 'lf_live_sk_and_****3c9b', scopes: ['courses:read', 'users:read', 'payments:read'], createdAt: '2025-01-15', lastUsed: '2026-07-07', expiresAt: '2027-01-15', status: 'active', requestCount: 1920000, createdBy: 'Alex Rivera' },
  { id: 'ak3', name: 'Zapier Integration', key: 'lf_live_sk_zap_****7d4e', scopes: ['users:read', 'courses:read'], createdAt: '2026-07-07', lastUsed: '2026-07-07', expiresAt: null, status: 'active', requestCount: 124, createdBy: 'Alex Rivera' },
  { id: 'ak4', name: 'Analytics Dashboard', key: 'lf_live_sk_ana_****1f8c', scopes: ['revenue:read', 'users:read', 'courses:read'], createdAt: '2025-06-01', lastUsed: '2026-07-05', expiresAt: '2026-06-01', status: 'expired', requestCount: 450000, createdBy: 'Alex Rivera' },
  { id: 'ak5', name: 'Legacy API — v1 [DEPRECATED]', key: 'lf_test_sk_leg_****0a1b', scopes: ['*'], createdAt: '2024-01-01', lastUsed: '2026-03-15', expiresAt: '2026-03-31', status: 'revoked', requestCount: 12000, createdBy: 'Alex Rivera' },
];

export const mockPrompts: Prompt[] = [
  { id: 'pr1', name: 'Course Summary Generator', category: 'Content', prompt: 'You are an expert educational content writer. Given the course title and description, generate a concise, engaging 3-sentence summary that highlights the key learning outcomes and target audience. Format it for a landing page.', model: 'gemini-pro', tokens: 120, usageCount: 4200, status: 'active', createdAt: '2024-03-01', updatedAt: '2026-06-15', tags: ['courses', 'content', 'seo'] },
  { id: 'pr2', name: 'AI Tutor System Prompt', category: 'Tutoring', prompt: 'You are LearnBot, an expert AI tutor for the GUIDESOFT IT SOLUTIONS platform. You are helpful, encouraging, and pedagogically sound. Always break down complex concepts into simple steps. When a student is stuck, provide hints before full answers. If asked off-topic questions, gently redirect to the current learning material.', model: 'gemini-pro', tokens: 98, usageCount: 98000, status: 'active', createdAt: '2024-01-10', updatedAt: '2026-07-01', tags: ['tutor', 'system', 'core'] },
  { id: 'pr3', name: 'Quiz Question Generator', category: 'Assessment', prompt: 'Generate {count} multiple-choice quiz questions for the following lesson content. Each question should have 4 options (A, B, C, D) with exactly one correct answer. Include a brief explanation for the correct answer. Difficulty level: {difficulty}. Lesson: {lesson_content}', model: 'gemini-pro', tokens: 85, usageCount: 12400, status: 'active', createdAt: '2024-04-20', updatedAt: '2026-05-30', tags: ['quiz', 'assessment', 'template'] },
  { id: 'pr4', name: 'Course Review Analyzer', category: 'Analytics', prompt: 'Analyze the following student reviews for a course and provide: 1) Overall sentiment score (1-10), 2) Top 3 positive themes, 3) Top 3 improvement areas, 4) Suggested instructor action items. Reviews: {reviews}', model: 'gemini-pro', tokens: 75, usageCount: 890, status: 'active', createdAt: '2024-08-15', updatedAt: '2026-04-10', tags: ['analytics', 'reviews', 'feedback'] },
  { id: 'pr5', name: 'Certificate Description Writer', category: 'Content', prompt: 'Write a professional certificate description for a student who completed {course_name}. Highlight the skills learned, practical competencies achieved, and industry relevance. Keep it under 50 words.', model: 'gemini-flash', tokens: 55, usageCount: 6700, status: 'active', createdAt: '2025-01-20', updatedAt: '2026-03-15', tags: ['certificates', 'content'] },
];

export const mockKnowledgeBase: KnowledgeBaseDoc[] = [
  { id: 'kb1', title: 'GUIDESOFT IT SOLUTIONS Platform Overview', category: 'Product', content: '', tokens: 2400, status: 'indexed', createdAt: '2024-01-01', updatedAt: '2026-06-01', usedInChats: 45000, source: 'manual' },
  { id: 'kb2', title: 'Python Programming Reference Guide', category: 'Technical', content: '', tokens: 18000, status: 'indexed', createdAt: '2024-02-15', updatedAt: '2026-05-20', usedInChats: 32000, source: 'upload' },
  { id: 'kb3', title: 'Machine Learning Glossary', category: 'Technical', content: '', tokens: 9500, status: 'indexed', createdAt: '2024-03-10', updatedAt: '2026-07-01', usedInChats: 28000, source: 'url' },
  { id: 'kb4', title: 'Cybersecurity Best Practices 2026', category: 'Technical', content: '', tokens: 14200, status: 'processing', createdAt: '2026-07-06', updatedAt: '2026-07-07', usedInChats: 0, source: 'upload' },
  { id: 'kb5', title: 'Frequently Asked Questions', category: 'Support', content: '', tokens: 5600, status: 'indexed', createdAt: '2024-04-01', updatedAt: '2026-07-05', usedInChats: 89000, source: 'manual' },
  { id: 'kb6', title: 'AWS Architecture Patterns', category: 'Technical', content: '', tokens: 0, status: 'error', createdAt: '2026-07-07', updatedAt: '2026-07-07', usedInChats: 0, source: 'url' },
];

// ─── Dashboard KPI Data ───────────────────────────────────────────────────────

export const dashboardStats = {
  totalUsers: 42180,
  totalUsersGrowth: 12.4,
  activeStudents: 28400,
  activeStudentsGrowth: 8.7,
  totalCourses: 158,
  totalCoursesGrowth: 5.2,
  monthlyRevenue: 284500,
  monthlyRevenueGrowth: 22.8,
  totalCertificates: 18900,
  pendingReviews: 7,
  activeCoupons: 4,
  openTickets: 23,
};

export const revenueChartData = [
  { month: 'Jan', revenue: 180000, subscriptions: 120000, courses: 60000 },
  { month: 'Feb', revenue: 195000, subscriptions: 128000, courses: 67000 },
  { month: 'Mar', revenue: 210000, subscriptions: 138000, courses: 72000 },
  { month: 'Apr', revenue: 224000, subscriptions: 145000, courses: 79000 },
  { month: 'May', revenue: 245000, subscriptions: 158000, courses: 87000 },
  { month: 'Jun', revenue: 268000, subscriptions: 172000, courses: 96000 },
  { month: 'Jul', revenue: 284500, subscriptions: 182000, courses: 102500 },
];

export const userGrowthData = [
  { month: 'Jan', students: 28000, trainers: 380, institutions: 45 },
  { month: 'Feb', students: 30200, trainers: 395, institutions: 48 },
  { month: 'Mar', students: 32800, trainers: 412, institutions: 51 },
  { month: 'Apr', students: 35100, trainers: 428, institutions: 54 },
  { month: 'May', students: 37400, trainers: 445, institutions: 58 },
  { month: 'Jun', students: 40200, trainers: 461, institutions: 61 },
  { month: 'Jul', students: 42180, trainers: 478, institutions: 64 },
];

export const topCoursesData = mockCourses
  .filter(c => c.status === 'published')
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 5);
