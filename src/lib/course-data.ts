// GUIDESOFT IT SOLUTIONS — Enterprise Course Management Data Layer
// Full TypeScript types + rich mock data

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  parentId?: string;
  courseCount: number;
  skillCount: number;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  proficiencyLevels: ('Beginner' | 'Intermediate' | 'Advanced' | 'Expert')[];
  courseCount: number;
  trending: boolean;
  color: string;
}

export type LessonType = 'video' | 'pdf' | 'text' | 'quiz' | 'assignment' | 'lab';

export interface CourseLesson {
  id: string;
  moduleId: string;
  title: string;
  type: LessonType;
  duration: number; // seconds
  isFreePreview: boolean;
  order: number;
  description?: string;
  videoUrl?: string;
  content?: string;
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  lessons: CourseLesson[];
  isExpanded?: boolean;
}

export type ResourceType = 'pdf' | 'video' | 'zip' | 'link' | 'image' | 'code' | 'spreadsheet';

export interface Resource {
  id: string;
  courseId: string;
  lessonId?: string;
  moduleId?: string;
  title: string;
  description?: string;
  type: ResourceType;
  url: string;
  size?: string;
  downloadable: boolean;
  createdAt: string;
}

export type AssignmentType = 'text' | 'file' | 'url' | 'code';

export interface RubricCriteria {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  weight: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  moduleId?: string;
  title: string;
  description: string;
  type: AssignmentType;
  dueInDays?: number;
  maxPoints: number;
  rubric: RubricCriteria[];
  instructions: string;
  allowedFormats?: string[];
  isRequired: boolean;
  createdAt: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  dueInDays: number;
  deliverables: string[];
}

export interface Project {
  id: string;
  courseId: string;
  title: string;
  description: string;
  overview: string;
  objectives: string[];
  milestones: ProjectMilestone[];
  skills: string[];
  maxPoints: number;
  estimatedHours: number;
  isCapstone: boolean;
  starterRepoUrl?: string;
  createdAt: string;
}

export type LabEnvironment = 'jupyter' | 'codesandbox' | 'terminal' | 'browser' | 'vscode';

export interface Lab {
  id: string;
  courseId: string;
  moduleId?: string;
  title: string;
  description: string;
  environment: LabEnvironment;
  instructions: string;
  estimatedMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  starterFiles?: { name: string; content: string }[];
  expectedOutput?: string;
  hints: string[];
  createdAt: string;
}

export type QuestionType = 'mcq' | 'true_false' | 'short_answer' | 'matching' | 'fill_blank';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: QuizOption[];
  correctAnswer?: string;
  explanation?: string;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
}

export interface Quiz {
  id: string;
  courseId: string;
  moduleId?: string;
  lessonId?: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number; // minutes, null = unlimited
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  showExplanations: boolean;
  passingScore: number; // percent
  maxAttempts: number;
  createdAt: string;
}

export interface Exam {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit: number; // minutes
  passingScore: number; // percent
  maxAttempts: number;
  isProctored: boolean;
  shuffleQuestions: boolean;
  showResults: 'immediately' | 'after_review' | 'never';
  availableFrom?: string;
  availableTo?: string;
  createdAt: string;
}

export type CertificateTemplate = 'classic' | 'modern' | 'minimal' | 'premium';

export interface CertificateField {
  key: string;
  label: string;
  value: string;
  editable: boolean;
}

export interface Certificate {
  id: string;
  courseId: string;
  title: string;
  template: CertificateTemplate;
  fields: CertificateField[];
  autoIssueOnCompletionPercent?: number;
  autoIssueOnExamPass?: boolean;
  examId?: string;
  includeInstructor: boolean;
  includeDate: boolean;
  includeVerificationCode: boolean;
  validityMonths?: number;
  createdAt: string;
}

export interface Review {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  rating: number; // 1–5
  title: string;
  body: string;
  helpfulCount: number;
  status: 'pending' | 'approved' | 'flagged' | 'rejected';
  instructorResponse?: string;
  createdAt: string;
}

export type CourseStatus = 'draft' | 'review' | 'published' | 'archived';

export interface ManagedCourse {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  categoryId: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: CourseStatus;
  instructorId: string;
  instructorName: string;
  studentsEnrolled: number;
  completionRate: number;
  rating: number;
  reviewsCount: number;
  revenue: number;
  modules: CourseModule[];
  skills: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CourseBuilderState {
  courseId: string;
  currentStep: number;
  completedSteps: number[];
  courseInfo: {
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    thumbnail: string;
    categoryId: string;
    skillIds: string[];
    level: string;
    language: string;
    price: number;
    originalPrice: number;
    isFree: boolean;
    hasCertificate: boolean;
    whatYoullLearn: string[];
    requirements: string[];
  };
  modules: CourseModule[];
  resources: Resource[];
  assignments: Assignment[];
  projects: Project[];
  labs: Lab[];
  quizzes: Quiz[];
  exams: Exam[];
  certificates: Certificate[];
}

// ─────────────────────────────────────────────────────────
// MOCK DATA — CATEGORIES
// ─────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    id: 'cat_001',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Frontend, backend, and full-stack web technologies',
    icon: '🌐',
    color: '#6C47FF',
    courseCount: 42,
    skillCount: 28,
    createdAt: '2024-01-15',
    status: 'active',
  },
  {
    id: 'cat_002',
    name: 'Data Science & AI',
    slug: 'data-science-ai',
    description: 'Machine learning, deep learning, and data analytics',
    icon: '🤖',
    color: '#00C9A7',
    courseCount: 31,
    skillCount: 22,
    createdAt: '2024-01-15',
    status: 'active',
  },
  {
    id: 'cat_003',
    name: 'Cloud & DevOps',
    slug: 'cloud-devops',
    description: 'AWS, Azure, GCP, Kubernetes, CI/CD pipelines',
    icon: '☁️',
    color: '#3B82F6',
    courseCount: 24,
    skillCount: 18,
    createdAt: '2024-02-01',
    status: 'active',
  },
  {
    id: 'cat_004',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Ethical hacking, network security, and compliance',
    icon: '🔒',
    color: '#EF4444',
    courseCount: 18,
    skillCount: 14,
    createdAt: '2024-02-10',
    status: 'active',
  },
  {
    id: 'cat_005',
    name: 'Mobile Development',
    slug: 'mobile-development',
    description: 'iOS, Android, React Native, Flutter development',
    icon: '📱',
    color: '#F59E0B',
    courseCount: 15,
    skillCount: 12,
    createdAt: '2024-03-01',
    status: 'active',
  },
  {
    id: 'cat_006',
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    description: 'User interface design, prototyping, and research',
    icon: '🎨',
    color: '#EC4899',
    courseCount: 12,
    skillCount: 10,
    createdAt: '2024-03-15',
    status: 'active',
  },
  {
    id: 'cat_007',
    name: 'Business & Management',
    slug: 'business-management',
    description: 'Project management, leadership, and entrepreneurship',
    icon: '💼',
    color: '#8B5CF6',
    courseCount: 20,
    skillCount: 16,
    createdAt: '2024-04-01',
    status: 'active',
  },
  {
    id: 'cat_008',
    name: 'Database & SQL',
    slug: 'database-sql',
    description: 'Relational databases, NoSQL, and data modeling',
    icon: '🗄️',
    color: '#06B6D4',
    courseCount: 14,
    skillCount: 10,
    createdAt: '2024-04-15',
    status: 'active',
  },
];

// ─────────────────────────────────────────────────────────
// MOCK DATA — SKILLS
// ─────────────────────────────────────────────────────────

export const skills: Skill[] = [
  { id: 'sk_001', name: 'React.js', slug: 'reactjs', categoryId: 'cat_001', description: 'Build modern UIs with React', proficiencyLevels: ['Beginner', 'Intermediate', 'Advanced'], courseCount: 12, trending: true, color: '#61DAFB' },
  { id: 'sk_002', name: 'Node.js', slug: 'nodejs', categoryId: 'cat_001', description: 'Server-side JavaScript runtime', proficiencyLevels: ['Beginner', 'Intermediate', 'Advanced'], courseCount: 9, trending: true, color: '#6DB33F' },
  { id: 'sk_003', name: 'TypeScript', slug: 'typescript', categoryId: 'cat_001', description: 'Typed superset of JavaScript', proficiencyLevels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], courseCount: 8, trending: true, color: '#3178C6' },
  { id: 'sk_004', name: 'Python', slug: 'python', categoryId: 'cat_002', description: 'Versatile programming language for AI/ML', proficiencyLevels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], courseCount: 15, trending: true, color: '#3776AB' },
  { id: 'sk_005', name: 'Machine Learning', slug: 'machine-learning', categoryId: 'cat_002', description: 'ML algorithms and model training', proficiencyLevels: ['Intermediate', 'Advanced', 'Expert'], courseCount: 10, trending: true, color: '#FF6F00' },
  { id: 'sk_006', name: 'AWS', slug: 'aws', categoryId: 'cat_003', description: 'Amazon Web Services cloud platform', proficiencyLevels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], courseCount: 11, trending: false, color: '#FF9900' },
  { id: 'sk_007', name: 'Docker & Kubernetes', slug: 'docker-k8s', categoryId: 'cat_003', description: 'Containerization and orchestration', proficiencyLevels: ['Intermediate', 'Advanced'], courseCount: 7, trending: true, color: '#2496ED' },
  { id: 'sk_008', name: 'SQL', slug: 'sql', categoryId: 'cat_008', description: 'Structured Query Language for databases', proficiencyLevels: ['Beginner', 'Intermediate', 'Advanced'], courseCount: 9, trending: false, color: '#336791' },
  { id: 'sk_009', name: 'Next.js', slug: 'nextjs', categoryId: 'cat_001', description: 'React framework for production', proficiencyLevels: ['Intermediate', 'Advanced'], courseCount: 6, trending: true, color: '#000000' },
  { id: 'sk_010', name: 'Flutter', slug: 'flutter', categoryId: 'cat_005', description: 'Cross-platform mobile framework by Google', proficiencyLevels: ['Beginner', 'Intermediate', 'Advanced'], courseCount: 5, trending: true, color: '#02569B' },
  { id: 'sk_011', name: 'Figma', slug: 'figma', categoryId: 'cat_006', description: 'Collaborative UI design tool', proficiencyLevels: ['Beginner', 'Intermediate', 'Advanced'], courseCount: 6, trending: false, color: '#F24E1E' },
  { id: 'sk_012', name: 'Ethical Hacking', slug: 'ethical-hacking', categoryId: 'cat_004', description: 'Penetration testing and vulnerability assessment', proficiencyLevels: ['Intermediate', 'Advanced', 'Expert'], courseCount: 4, trending: false, color: '#EF4444' },
];

// ─────────────────────────────────────────────────────────
// MOCK DATA — MANAGED COURSES
// ─────────────────────────────────────────────────────────

export const managedCourses: ManagedCourse[] = [
  {
    id: 'mc_001',
    slug: 'react-mastery-2024',
    title: 'React 19 Mastery — From Zero to Production',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    categoryId: 'cat_001',
    level: 'Intermediate',
    status: 'published',
    instructorId: 'instr_001',
    instructorName: 'Dr. Rajan Mehta',
    studentsEnrolled: 3842,
    completionRate: 72,
    rating: 4.8,
    reviewsCount: 412,
    revenue: 192100,
    skills: ['sk_001', 'sk_003', 'sk_009'],
    tags: ['React', 'TypeScript', 'Frontend', 'Web Dev'],
    createdAt: '2024-03-10',
    updatedAt: '2024-11-20',
    publishedAt: '2024-04-01',
    modules: [],
  },
  {
    id: 'mc_002',
    slug: 'python-data-science-bootcamp',
    title: 'Python Data Science Bootcamp — Complete Guide',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    categoryId: 'cat_002',
    level: 'Beginner',
    status: 'published',
    instructorId: 'instr_002',
    instructorName: 'Priya Sharma',
    studentsEnrolled: 5210,
    completionRate: 61,
    rating: 4.9,
    reviewsCount: 681,
    revenue: 260500,
    skills: ['sk_004', 'sk_005'],
    tags: ['Python', 'ML', 'Data Science'],
    createdAt: '2024-01-20',
    updatedAt: '2024-12-01',
    publishedAt: '2024-02-10',
    modules: [],
  },
  {
    id: 'mc_003',
    slug: 'aws-solutions-architect',
    title: 'AWS Solutions Architect Professional',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop',
    categoryId: 'cat_003',
    level: 'Advanced',
    status: 'published',
    instructorId: 'instr_001',
    instructorName: 'Dr. Rajan Mehta',
    studentsEnrolled: 2100,
    completionRate: 55,
    rating: 4.7,
    reviewsCount: 289,
    revenue: 315000,
    skills: ['sk_006', 'sk_007'],
    tags: ['AWS', 'Cloud', 'DevOps'],
    createdAt: '2024-05-01',
    updatedAt: '2024-12-10',
    publishedAt: '2024-06-01',
    modules: [],
  },
  {
    id: 'mc_004',
    slug: 'nextjs-fullstack-course',
    title: 'Next.js Full-Stack Development — Modern Web Apps',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
    categoryId: 'cat_001',
    level: 'Intermediate',
    status: 'draft',
    instructorId: 'instr_002',
    instructorName: 'Priya Sharma',
    studentsEnrolled: 0,
    completionRate: 0,
    rating: 0,
    reviewsCount: 0,
    revenue: 0,
    skills: ['sk_009', 'sk_003'],
    tags: ['Next.js', 'React', 'TypeScript'],
    createdAt: '2024-12-01',
    updatedAt: '2024-12-15',
    modules: [],
  },
  {
    id: 'mc_005',
    slug: 'ethical-hacking-masterclass',
    title: 'Ethical Hacking Masterclass — CEH Prep',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=225&fit=crop',
    categoryId: 'cat_004',
    level: 'Advanced',
    status: 'review',
    instructorId: 'instr_001',
    instructorName: 'Dr. Rajan Mehta',
    studentsEnrolled: 0,
    completionRate: 0,
    rating: 0,
    reviewsCount: 0,
    revenue: 0,
    skills: ['sk_012'],
    tags: ['Security', 'Hacking', 'CEH'],
    createdAt: '2024-11-20',
    updatedAt: '2024-12-18',
    modules: [],
  },
  {
    id: 'mc_006',
    slug: 'flutter-mobile-dev',
    title: 'Flutter & Dart — Build iOS & Android Apps',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop',
    categoryId: 'cat_005',
    level: 'Beginner',
    status: 'archived',
    instructorId: 'instr_002',
    instructorName: 'Priya Sharma',
    studentsEnrolled: 890,
    completionRate: 48,
    rating: 4.5,
    reviewsCount: 102,
    revenue: 44500,
    skills: ['sk_010'],
    tags: ['Flutter', 'Dart', 'Mobile'],
    createdAt: '2023-10-01',
    updatedAt: '2024-08-01',
    publishedAt: '2023-11-01',
    modules: [],
  },
];

// ─────────────────────────────────────────────────────────
// MOCK DATA — MODULES & LESSONS
// ─────────────────────────────────────────────────────────

export const sampleModules: CourseModule[] = [
  {
    id: 'mod_001',
    courseId: 'mc_001',
    title: 'Getting Started with React 19',
    description: 'Setup, core concepts, and your first React application',
    order: 1,
    isExpanded: true,
    lessons: [
      { id: 'les_001', moduleId: 'mod_001', title: 'Welcome & Course Overview', type: 'video', duration: 480, isFreePreview: true, order: 1, description: 'Introduction to what you will learn' },
      { id: 'les_002', moduleId: 'mod_001', title: 'Setting Up Your Development Environment', type: 'video', duration: 720, isFreePreview: true, order: 2 },
      { id: 'les_003', moduleId: 'mod_001', title: 'Understanding JSX & Components', type: 'video', duration: 1200, isFreePreview: false, order: 3 },
      { id: 'les_004', moduleId: 'mod_001', title: 'React Fundamentals — Reading Material', type: 'pdf', duration: 600, isFreePreview: false, order: 4 },
      { id: 'les_005', moduleId: 'mod_001', title: 'Module 1 Quiz', type: 'quiz', duration: 900, isFreePreview: false, order: 5 },
    ],
  },
  {
    id: 'mod_002',
    courseId: 'mc_001',
    title: 'State Management & Hooks',
    description: 'useState, useEffect, useContext, and custom hooks',
    order: 2,
    isExpanded: false,
    lessons: [
      { id: 'les_006', moduleId: 'mod_002', title: 'useState Deep Dive', type: 'video', duration: 1440, isFreePreview: false, order: 1 },
      { id: 'les_007', moduleId: 'mod_002', title: 'useEffect and Side Effects', type: 'video', duration: 1800, isFreePreview: false, order: 2 },
      { id: 'les_008', moduleId: 'mod_002', title: 'Context API & useContext', type: 'video', duration: 1320, isFreePreview: false, order: 3 },
      { id: 'les_009', moduleId: 'mod_002', title: 'Building Custom Hooks', type: 'lab', duration: 2400, isFreePreview: false, order: 4 },
      { id: 'les_010', moduleId: 'mod_002', title: 'Hooks Assignment', type: 'assignment', duration: 3600, isFreePreview: false, order: 5 },
    ],
  },
  {
    id: 'mod_003',
    courseId: 'mc_001',
    title: 'Advanced Patterns & Performance',
    description: 'Memoization, code splitting, and production optimizations',
    order: 3,
    isExpanded: false,
    lessons: [
      { id: 'les_011', moduleId: 'mod_003', title: 'React.memo & useMemo', type: 'video', duration: 1560, isFreePreview: false, order: 1 },
      { id: 'les_012', moduleId: 'mod_003', title: 'Code Splitting & Lazy Loading', type: 'video', duration: 1200, isFreePreview: false, order: 2 },
      { id: 'les_013', moduleId: 'mod_003', title: 'Performance Optimization Lab', type: 'lab', duration: 3600, isFreePreview: false, order: 3 },
      { id: 'les_014', moduleId: 'mod_003', title: 'Final Exam', type: 'quiz', duration: 2700, isFreePreview: false, order: 4 },
    ],
  },
];

// ─────────────────────────────────────────────────────────
// MOCK DATA — RESOURCES
// ─────────────────────────────────────────────────────────

export const sampleResources: Resource[] = [
  { id: 'res_001', courseId: 'mc_001', title: 'React 19 Official Docs (PDF)', type: 'pdf', url: '#', size: '2.4 MB', downloadable: true, createdAt: '2024-04-01' },
  { id: 'res_002', courseId: 'mc_001', moduleId: 'mod_001', title: 'Starter Project Files', type: 'zip', url: '#', size: '1.1 MB', downloadable: true, createdAt: '2024-04-01' },
  { id: 'res_003', courseId: 'mc_001', lessonId: 'les_003', title: 'JSX Cheatsheet', type: 'pdf', url: '#', size: '380 KB', downloadable: true, createdAt: '2024-04-02' },
  { id: 'res_004', courseId: 'mc_001', title: 'Hooks Reference Guide', type: 'link', url: 'https://react.dev/reference/react', downloadable: false, createdAt: '2024-04-05' },
  { id: 'res_005', courseId: 'mc_001', title: 'Course Slides (Full)', type: 'pdf', url: '#', size: '8.6 MB', downloadable: true, createdAt: '2024-04-10' },
  { id: 'res_006', courseId: 'mc_001', title: 'Component Design Patterns', type: 'code', url: '#', size: '45 KB', downloadable: true, createdAt: '2024-05-01' },
];

// ─────────────────────────────────────────────────────────
// MOCK DATA — ASSIGNMENTS
// ─────────────────────────────────────────────────────────

export const sampleAssignments: Assignment[] = [
  {
    id: 'asgn_001',
    courseId: 'mc_001',
    moduleId: 'mod_002',
    title: 'Build a Todo App with Hooks',
    description: 'Create a fully functional Todo application using React Hooks',
    type: 'url',
    dueInDays: 7,
    maxPoints: 100,
    instructions: 'Build a Todo app that demonstrates useState, useEffect, and custom hooks. Deploy to Vercel or Netlify and submit the URL.',
    allowedFormats: ['url'],
    isRequired: true,
    createdAt: '2024-04-10',
    rubric: [
      { id: 'r_001', name: 'Functionality', description: 'All features work correctly', maxPoints: 40, weight: 40 },
      { id: 'r_002', name: 'Code Quality', description: 'Clean, readable, well-organized code', maxPoints: 30, weight: 30 },
      { id: 'r_003', name: 'UI/UX Design', description: 'Attractive and user-friendly interface', maxPoints: 20, weight: 20 },
      { id: 'r_004', name: 'Documentation', description: 'README and code comments', maxPoints: 10, weight: 10 },
    ],
  },
  {
    id: 'asgn_002',
    courseId: 'mc_001',
    moduleId: 'mod_003',
    title: 'Performance Audit Report',
    description: 'Audit an existing React app and submit a performance report',
    type: 'file',
    dueInDays: 5,
    maxPoints: 80,
    instructions: 'Use React DevTools Profiler and Lighthouse to audit a sample app. Submit a PDF report with findings and recommendations.',
    allowedFormats: ['pdf', 'docx'],
    isRequired: false,
    createdAt: '2024-05-15',
    rubric: [
      { id: 'r_005', name: 'Analysis Depth', description: 'Thoroughness of the audit', maxPoints: 40, weight: 50 },
      { id: 'r_006', name: 'Recommendations', description: 'Quality of improvement suggestions', maxPoints: 40, weight: 50 },
    ],
  },
];

// ─────────────────────────────────────────────────────────
// MOCK DATA — PROJECTS
// ─────────────────────────────────────────────────────────

export const sampleProjects: Project[] = [
  {
    id: 'proj_001',
    courseId: 'mc_001',
    title: 'Full-Stack E-Commerce Platform',
    description: 'Build a production-ready e-commerce platform using React, Node.js, and PostgreSQL',
    overview: 'This capstone project will challenge you to apply everything you have learned to build a real-world e-commerce application.',
    objectives: [
      'Design a scalable React component architecture',
      'Implement authentication and authorization',
      'Build a REST API with Node.js and Express',
      'Integrate payment processing with Stripe',
      'Deploy to production with CI/CD pipeline',
    ],
    milestones: [
      { id: 'ms_001', title: 'Project Setup & Architecture', description: 'Initialize repo, setup CI/CD, design architecture', dueInDays: 3, deliverables: ['GitHub repo', 'Architecture diagram', 'DB schema'] },
      { id: 'ms_002', title: 'Backend API', description: 'Build REST API with authentication', dueInDays: 10, deliverables: ['API endpoints', 'Postman collection', 'Tests'] },
      { id: 'ms_003', title: 'Frontend Implementation', description: 'Build React UI components', dueInDays: 20, deliverables: ['React components', 'State management', 'Routing'] },
      { id: 'ms_004', title: 'Final Submission', description: 'Deploy and submit final project', dueInDays: 30, deliverables: ['Live URL', 'Source code', 'Documentation'] },
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    maxPoints: 200,
    estimatedHours: 40,
    isCapstone: true,
    starterRepoUrl: 'https://github.com/learnflow/react-ecommerce-starter',
    createdAt: '2024-04-01',
  },
];

// ─────────────────────────────────────────────────────────
// MOCK DATA — LABS
// ─────────────────────────────────────────────────────────

export const sampleLabs: Lab[] = [
  {
    id: 'lab_001',
    courseId: 'mc_001',
    moduleId: 'mod_002',
    title: 'Custom Hooks — Live Coding Lab',
    description: 'Build three custom hooks from scratch in a guided environment',
    environment: 'codesandbox',
    instructions: '## Lab Instructions\n\n1. Fork the starter sandbox\n2. Implement `useLocalStorage` hook\n3. Implement `useFetch` hook with loading/error states\n4. Implement `useDebounce` hook\n\nEach hook must have TypeScript types and JSDoc comments.',
    estimatedMinutes: 60,
    difficulty: 'Medium',
    hints: [
      'useLocalStorage should sync with localStorage on mount',
      'useFetch should handle abort controllers for cleanup',
      'useDebounce should use setTimeout with cleanup',
    ],
    starterFiles: [
      { name: 'hooks/useLocalStorage.ts', content: '// TODO: Implement useLocalStorage hook\nexport function useLocalStorage<T>(key: string, initialValue: T) {\n  // Your implementation here\n}' },
      { name: 'hooks/useFetch.ts', content: '// TODO: Implement useFetch hook\nexport function useFetch<T>(url: string) {\n  // Your implementation here\n}' },
    ],
    expectedOutput: 'All three hooks should pass the provided test suite with 100% coverage.',
    createdAt: '2024-04-15',
  },
  {
    id: 'lab_002',
    courseId: 'mc_001',
    moduleId: 'mod_003',
    title: 'Performance Optimization Lab',
    description: 'Identify and fix performance bottlenecks in a provided React app',
    environment: 'codesandbox',
    instructions: '## Performance Lab\n\nYou are given a slow React application. Your task is to:\n1. Profile it with React DevTools\n2. Identify unnecessary re-renders\n3. Apply memo, useMemo, and useCallback\n4. Measure the improvement',
    estimatedMinutes: 90,
    difficulty: 'Hard',
    hints: [
      'Look for components that re-render when parent state changes',
      'Check for expensive calculations in render',
      'Use the React Profiler flame graph',
    ],
    createdAt: '2024-05-10',
  },
];

// ─────────────────────────────────────────────────────────
// MOCK DATA — QUIZZES
// ─────────────────────────────────────────────────────────

export const sampleQuizzes: Quiz[] = [
  {
    id: 'quiz_001',
    courseId: 'mc_001',
    moduleId: 'mod_001',
    lessonId: 'les_005',
    title: 'React Fundamentals Quiz',
    description: 'Test your understanding of React core concepts',
    timeLimit: 15,
    shuffleQuestions: true,
    shuffleOptions: true,
    showExplanations: true,
    passingScore: 70,
    maxAttempts: 3,
    createdAt: '2024-04-05',
    questions: [
      {
        id: 'q_001',
        type: 'mcq',
        question: 'What is JSX in React?',
        options: [
          { id: 'o_001', text: 'A JavaScript extension for writing HTML-like syntax', isCorrect: true },
          { id: 'o_002', text: 'A new programming language', isCorrect: false },
          { id: 'o_003', text: 'A CSS preprocessor', isCorrect: false },
          { id: 'o_004', text: 'A build tool for React', isCorrect: false },
        ],
        explanation: 'JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.',
        points: 10,
        difficulty: 'Easy',
        tags: ['JSX', 'fundamentals'],
      },
      {
        id: 'q_002',
        type: 'true_false',
        question: 'React components must always return a single root element.',
        options: [
          { id: 'o_005', text: 'True', isCorrect: false },
          { id: 'o_006', text: 'False', isCorrect: true },
        ],
        explanation: 'React Fragments (<></>) allow returning multiple elements without a wrapper.',
        points: 5,
        difficulty: 'Easy',
        tags: ['components', 'fragments'],
      },
      {
        id: 'q_003',
        type: 'mcq',
        question: 'Which hook is used for managing state in functional components?',
        options: [
          { id: 'o_007', text: 'useEffect', isCorrect: false },
          { id: 'o_008', text: 'useState', isCorrect: true },
          { id: 'o_009', text: 'useRef', isCorrect: false },
          { id: 'o_010', text: 'useContext', isCorrect: false },
        ],
        explanation: 'useState is the primary hook for adding state to functional components.',
        points: 10,
        difficulty: 'Easy',
        tags: ['hooks', 'useState'],
      },
      {
        id: 'q_004',
        type: 'short_answer',
        question: 'What is the purpose of the key prop in React lists?',
        correctAnswer: 'Helps React identify which items have changed, been added, or removed',
        explanation: 'Keys help React identify which items in a list have changed, enabling efficient re-rendering.',
        points: 15,
        difficulty: 'Medium',
        tags: ['lists', 'keys', 'reconciliation'],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────
// MOCK DATA — EXAMS
// ─────────────────────────────────────────────────────────

export const sampleExams: Exam[] = [
  {
    id: 'exam_001',
    courseId: 'mc_001',
    title: 'React 19 Mastery — Final Certification Exam',
    description: 'Comprehensive exam covering all React 19 concepts from this course. Pass with 80%+ to receive your certificate.',
    timeLimit: 60,
    passingScore: 80,
    maxAttempts: 2,
    isProctored: false,
    shuffleQuestions: true,
    showResults: 'after_review',
    createdAt: '2024-04-01',
    questions: [
      {
        id: 'eq_001',
        type: 'mcq',
        question: 'What is the React Concurrent Mode primarily designed for?',
        options: [
          { id: 'eo_001', text: 'Improving server-side rendering', isCorrect: false },
          { id: 'eo_002', text: 'Making React apps feel more responsive by interrupting rendering', isCorrect: true },
          { id: 'eo_003', text: 'Adding TypeScript support to React', isCorrect: false },
          { id: 'eo_004', text: 'Handling global state management', isCorrect: false },
        ],
        explanation: 'Concurrent Mode allows React to interrupt, pause, resume, or abandon renders to keep the UI responsive.',
        points: 10,
        difficulty: 'Hard',
        tags: ['concurrent', 'advanced'],
      },
      {
        id: 'eq_002',
        type: 'mcq',
        question: 'Which of the following correctly describes React Server Components?',
        options: [
          { id: 'eo_005', text: 'Components that run only in Node.js', isCorrect: false },
          { id: 'eo_006', text: 'Components rendered on the server with no client-side JavaScript', isCorrect: true },
          { id: 'eo_007', text: 'Components that fetch data using getServerSideProps', isCorrect: false },
          { id: 'eo_008', text: 'A new name for class components', isCorrect: false },
        ],
        explanation: 'RSCs are rendered exclusively on the server, resulting in zero JS bundle impact.',
        points: 10,
        difficulty: 'Medium',
        tags: ['RSC', 'server components'],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────
// MOCK DATA — CERTIFICATES
// ─────────────────────────────────────────────────────────

export const sampleCertificates: Certificate[] = [
  {
    id: 'cert_001',
    courseId: 'mc_001',
    title: 'Certificate of Completion — React 19 Mastery',
    template: 'modern',
    fields: [
      { key: 'studentName', label: 'Student Name', value: '{{student.name}}', editable: false },
      { key: 'courseName', label: 'Course Name', value: 'React 19 Mastery — From Zero to Production', editable: true },
      { key: 'instructorName', label: 'Instructor', value: 'Dr. Rajan Mehta', editable: true },
      { key: 'completionDate', label: 'Date of Completion', value: '{{completion.date}}', editable: false },
      { key: 'credentialId', label: 'Credential ID', value: '{{cert.id}}', editable: false },
      { key: 'platform', label: 'Issued By', value: 'GUIDESOFT IT SOLUTIONS', editable: true },
    ],
    autoIssueOnCompletionPercent: 100,
    autoIssueOnExamPass: true,
    examId: 'exam_001',
    includeInstructor: true,
    includeDate: true,
    includeVerificationCode: true,
    validityMonths: undefined,
    createdAt: '2024-04-01',
  },
];

// ─────────────────────────────────────────────────────────
// MOCK DATA — REVIEWS
// ─────────────────────────────────────────────────────────

export const sampleReviews: Review[] = [
  {
    id: 'rev_001',
    courseId: 'mc_001',
    studentId: 'stu_001',
    studentName: 'Arjun Patel',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    rating: 5,
    title: 'Best React course I have ever taken!',
    body: 'The instructor explains concepts incredibly clearly. The projects are challenging but rewarding. I went from knowing nothing about React to building a full-stack app in 4 weeks.',
    helpfulCount: 128,
    status: 'approved',
    instructorResponse: 'Thank you Arjun! Your dedication is inspiring. Keep building great things!',
    createdAt: '2024-08-15',
  },
  {
    id: 'rev_002',
    courseId: 'mc_001',
    studentId: 'stu_002',
    studentName: 'Sneha Iyer',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    rating: 4,
    title: 'Excellent content, could use more exercises',
    body: 'The theory and video quality are top-notch. I wish there were more hands-on practice problems between sections. Overall a very solid course.',
    helpfulCount: 84,
    status: 'approved',
    createdAt: '2024-09-02',
  },
  {
    id: 'rev_003',
    courseId: 'mc_001',
    studentId: 'stu_003',
    studentName: 'Rohit Gupta',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit',
    rating: 5,
    title: 'Transformed my career!',
    body: 'I landed a frontend developer job after completing this course. The real-world project was exactly what I needed to show employers.',
    helpfulCount: 211,
    status: 'approved',
    createdAt: '2024-10-10',
  },
  {
    id: 'rev_004',
    courseId: 'mc_001',
    studentId: 'stu_004',
    studentName: 'Kiran Desai',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kiran',
    rating: 2,
    title: 'Content is outdated in some sections',
    body: 'Some of the API examples use deprecated methods. Needs an update for React 19 breaking changes.',
    helpfulCount: 15,
    status: 'pending',
    createdAt: '2024-11-20',
  },
  {
    id: 'rev_005',
    courseId: 'mc_001',
    studentId: 'stu_005',
    studentName: 'Meera Nair',
    studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera',
    rating: 5,
    title: 'Worth every rupee!',
    body: 'The labs and quizzes keep you engaged. The certificate is a great addition to my portfolio. Highly recommended for anyone serious about React.',
    helpfulCount: 93,
    status: 'approved',
    createdAt: '2024-12-01',
  },
];

// ─────────────────────────────────────────────────────────
// BUILDER STEPS CONFIG
// ─────────────────────────────────────────────────────────

export const builderSteps = [
  { id: 1, key: 'categories', label: 'Categories & Skills', icon: '🏷️', description: 'Organize your course into categories and tag required skills' },
  { id: 2, key: 'info', label: 'Course Info', icon: '📋', description: 'Set up the core details, pricing, and learning outcomes' },
  { id: 3, key: 'curriculum', label: 'Curriculum', icon: '📚', description: 'Create modules and lessons with drag-and-drop ordering' },
  { id: 4, key: 'resources', label: 'Resources', icon: '📎', description: 'Attach files, links, and downloadable materials' },
  { id: 5, key: 'assignments', label: 'Assignments & Projects', icon: '✏️', description: 'Create assignments, rubrics, and capstone projects' },
  { id: 6, key: 'labs', label: 'Labs', icon: '🧪', description: 'Set up interactive coding labs and environments' },
  { id: 7, key: 'assessments', label: 'Quizzes & Exams', icon: '📝', description: 'Build quizzes, question banks, and final exams' },
  { id: 8, key: 'certificates', label: 'Certificates', icon: '🏆', description: 'Design certificates and configure auto-issue rules' },
  { id: 9, key: 'reviews', label: 'Reviews', icon: '⭐', description: 'Manage student reviews and moderate feedback' },
];
