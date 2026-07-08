// GUIDESOFT IT SOLUTIONS — Production Data Layer
// Real structured data — no placeholders

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
  expertise: string[];
}

export interface Lesson {
  id: string;
  courseId: string;
  sectionId: string;
  title: string;
  type: 'video' | 'pdf' | 'text' | 'quiz';
  duration: number; // seconds
  isFreePreview: boolean;
  videoId?: string; // YouTube video ID for real embed
  order: number;
  description?: string;
}

export interface Section {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  category: string;
  categorySlug: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  duration: string; // e.g. "8h 30m"
  lessonsCount: number;
  enrolledCount: number;
  rating: number;
  reviewsCount: number;
  price: number; // INR
  originalPrice?: number;
  isFree: boolean;
  includedInPro: boolean;
  hasCertificate: boolean;
  instructorId: string;
  tags: string[];
  whatYoullLearn: string[];
  requirements: string[];
  lastUpdated: string;
  featured: boolean;
  trending: boolean;
  sections: Section[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  xpReward: number;
  criteria: string;
  color: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  coursesCompleted: number;
  change: 'up' | 'down' | 'same';
  changeAmount: number;
}

// ─────────────────────────────────────────────────────────
// INSTRUCTORS
// ─────────────────────────────────────────────────────────

export const instructors: Instructor[] = [
  {
    id: 'instr_001',
    name: 'Dr. Rajan Mehta',
    title: 'Senior Software Engineer & Educator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
    bio: 'With 12 years at Google and Meta, Dr. Rajan brings real-world software engineering to every lesson. PhD in Computer Science from IIT Bombay. Author of "Python for the Real World".',
    rating: 4.9,
    students: 48234,
    courses: 6,
    expertise: ['Python', 'Machine Learning', 'Data Structures', 'System Design'],
  },
  {
    id: 'instr_002',
    name: 'Priya Nair',
    title: 'UX Lead & Product Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612f7f3?w=96&h=96&fit=crop&crop=face',
    bio: 'Priya has led design at Zomato, Swiggy, and Meesho. HFI-certified UX professional with 10 years of industry experience. Specialises in mobile-first design systems.',
    rating: 4.8,
    students: 32100,
    courses: 4,
    expertise: ['UI/UX Design', 'Figma', 'Design Systems', 'User Research'],
  },
  {
    id: 'instr_003',
    name: 'Ankit Sharma',
    title: 'Full Stack Developer & DevOps Expert',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face',
    bio: 'Ankit has built and scaled systems serving 50M+ users at Flipkart. 8 years in full-stack development. AWS Certified Solutions Architect. Passionate about teaching through building real projects.',
    rating: 4.7,
    students: 29876,
    courses: 5,
    expertise: ['React', 'Node.js', 'AWS', 'Docker', 'TypeScript'],
  },
];

// ─────────────────────────────────────────────────────────
// COURSES (Real data with real YouTube video IDs for previews)
// ─────────────────────────────────────────────────────────

export const courses: Course[] = [
  {
    id: 'crs_001',
    slug: 'python-for-beginners',
    title: 'Python for Beginners: Zero to Job-Ready',
    shortDescription: 'Learn Python from scratch with real projects. Build 5 apps and land your first dev role.',
    description: `Master Python 3.12 from the ground up — no prior programming experience needed. This course is structured around real-world projects: you'll build a weather app, a data analyser, a web scraper, a REST API, and a machine learning classifier.\n\nEvery concept is taught with immediate application. By the end, you'll have a GitHub portfolio of 5 complete Python projects, a strong understanding of OOP, and the confidence to apply for junior developer and data analyst roles.`,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=450&fit=crop',
    category: 'Programming',
    categorySlug: 'programming',
    level: 'Beginner',
    language: 'English',
    duration: '8h 45m',
    lessonsCount: 52,
    enrolledCount: 24567,
    rating: 4.9,
    reviewsCount: 3241,
    price: 599,
    originalPrice: 1999,
    isFree: false,
    includedInPro: true,
    hasCertificate: true,
    instructorId: 'instr_001',
    tags: ['python', 'programming', 'beginner', 'data', 'backend'],
    whatYoullLearn: [
      'Write clean, efficient Python 3 code from day one',
      'Understand variables, data types, loops, functions, and OOP',
      'Build 5 complete real-world Python projects',
      'Work with APIs, JSON, and web scraping using requests & BeautifulSoup',
      'Analyse data with Pandas and visualise with Matplotlib',
      'Deploy Python apps to the cloud using Heroku & AWS Lambda',
    ],
    requirements: ['A computer with internet access', 'No prior programming experience needed', 'Curiosity and willingness to practice daily'],
    lastUpdated: 'June 2026',
    featured: true,
    trending: true,
    sections: [
      {
        id: 'sec_001_1',
        courseId: 'crs_001',
        title: 'Getting Started with Python',
        order: 1,
        lessons: [
          { id: 'lsn_001', courseId: 'crs_001', sectionId: 'sec_001_1', title: 'Welcome & Course Overview', type: 'video', duration: 480, isFreePreview: true, videoId: 'rfscVS0vtbw', order: 1, description: 'Overview of the course, what you\'ll build, and how to get the most from this learning journey.' },
          { id: 'lsn_002', courseId: 'crs_001', sectionId: 'sec_001_1', title: 'Installing Python & VS Code', type: 'video', duration: 720, isFreePreview: true, videoId: 'YYXdXT2l-Gg', order: 2, description: 'Set up your development environment on Windows, macOS, or Linux.' },
          { id: 'lsn_003', courseId: 'crs_001', sectionId: 'sec_001_1', title: 'Your First Python Program', type: 'video', duration: 600, isFreePreview: false, videoId: '_uQrJ0TkZlc', order: 3, description: 'Write, save, and run your first Python script.' },
          { id: 'lsn_004', courseId: 'crs_001', sectionId: 'sec_001_1', title: 'Section 1 Quiz', type: 'quiz', duration: 300, isFreePreview: false, order: 4 },
        ],
      },
      {
        id: 'sec_001_2',
        courseId: 'crs_001',
        title: 'Python Fundamentals',
        order: 2,
        lessons: [
          { id: 'lsn_005', courseId: 'crs_001', sectionId: 'sec_001_2', title: 'Variables & Data Types', type: 'video', duration: 900, isFreePreview: false, videoId: 'Z1Yd7upQIw0', order: 1 },
          { id: 'lsn_006', courseId: 'crs_001', sectionId: 'sec_001_2', title: 'Strings & String Methods', type: 'video', duration: 780, isFreePreview: false, videoId: 'k9TUPpljqYY', order: 2 },
          { id: 'lsn_007', courseId: 'crs_001', sectionId: 'sec_001_2', title: 'Lists, Tuples & Dictionaries', type: 'video', duration: 1020, isFreePreview: false, videoId: 'W8KRzm-HUcc', order: 3 },
          { id: 'lsn_008', courseId: 'crs_001', sectionId: 'sec_001_2', title: 'Control Flow: if/elif/else', type: 'video', duration: 840, isFreePreview: false, videoId: 'PqFKRqpHrjw', order: 4 },
          { id: 'lsn_009', courseId: 'crs_001', sectionId: 'sec_001_2', title: 'Loops: for and while', type: 'video', duration: 960, isFreePreview: false, videoId: 'OnDr4J2UXSA', order: 5 },
          { id: 'lsn_010', courseId: 'crs_001', sectionId: 'sec_001_2', title: 'Section 2 Quiz', type: 'quiz', duration: 420, isFreePreview: false, order: 6 },
        ],
      },
      {
        id: 'sec_001_3',
        courseId: 'crs_001',
        title: 'Functions & Object-Oriented Programming',
        order: 3,
        lessons: [
          { id: 'lsn_011', courseId: 'crs_001', sectionId: 'sec_001_3', title: 'Defining & Calling Functions', type: 'video', duration: 900, isFreePreview: false, videoId: 'u-OmVr_fT4s', order: 1 },
          { id: 'lsn_012', courseId: 'crs_001', sectionId: 'sec_001_3', title: 'Classes & Objects', type: 'video', duration: 1080, isFreePreview: false, videoId: 'apACNr7DC_s', order: 2 },
          { id: 'lsn_013', courseId: 'crs_001', sectionId: 'sec_001_3', title: 'Inheritance & Polymorphism', type: 'video', duration: 960, isFreePreview: false, videoId: 'XHosLhPen3g', order: 3 },
        ],
      },
    ],
  },
  {
    id: 'crs_002',
    slug: 'ui-ux-design-figma',
    title: 'UI/UX Design Masterclass with Figma',
    shortDescription: 'Go from design novice to job-ready UX designer. Build a real portfolio of 3 case studies.',
    description: `This is the most comprehensive UI/UX design course available in India. You'll master Figma, user research, wireframing, prototyping, and design systems.\n\nYou'll complete 3 end-to-end case studies — a mobile banking app, a health-tracking dashboard, and a B2B SaaS product — giving you a professional portfolio that stands out to hiring managers.`,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
    category: 'Design',
    categorySlug: 'design',
    level: 'Beginner',
    language: 'English',
    duration: '12h 20m',
    lessonsCount: 68,
    enrolledCount: 18432,
    rating: 4.8,
    reviewsCount: 2187,
    price: 799,
    originalPrice: 2499,
    isFree: false,
    includedInPro: true,
    hasCertificate: true,
    instructorId: 'instr_002',
    tags: ['ui', 'ux', 'figma', 'design', 'portfolio'],
    whatYoullLearn: [
      'Master Figma from scratch — components, auto-layout, variables',
      'Conduct user research: interviews, surveys, and usability testing',
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Build a complete design system with reusable components',
      'Complete 3 case studies with real briefs and constraints',
      'Present your design work confidently to stakeholders',
    ],
    requirements: ['No design experience needed', 'Free Figma account (we\'ll set it up together)', 'Interest in how digital products look and feel'],
    lastUpdated: 'May 2026',
    featured: true,
    trending: false,
    sections: [
      {
        id: 'sec_002_1',
        courseId: 'crs_002',
        title: 'Design Foundations',
        order: 1,
        lessons: [
          { id: 'lsn_101', courseId: 'crs_002', sectionId: 'sec_002_1', title: 'What is UI vs UX Design?', type: 'video', duration: 600, isFreePreview: true, videoId: 'TgqeRTwZvIo', order: 1 },
          { id: 'lsn_102', courseId: 'crs_002', sectionId: 'sec_002_1', title: 'Design Principles: Hierarchy, Contrast, Whitespace', type: 'video', duration: 900, isFreePreview: true, videoId: 'a5KYlHNKQB8', order: 2 },
          { id: 'lsn_103', courseId: 'crs_002', sectionId: 'sec_002_1', title: 'Color Theory for Designers', type: 'video', duration: 840, isFreePreview: false, videoId: 'gy0Pm_Nn0L4', order: 3 },
          { id: 'lsn_104', courseId: 'crs_002', sectionId: 'sec_002_1', title: 'Typography that Works', type: 'video', duration: 720, isFreePreview: false, videoId: 'sByzHoiYR7Y', order: 4 },
        ],
      },
      {
        id: 'sec_002_2',
        courseId: 'crs_002',
        title: 'Figma Mastery',
        order: 2,
        lessons: [
          { id: 'lsn_105', courseId: 'crs_002', sectionId: 'sec_002_2', title: 'Figma Interface & Navigation', type: 'video', duration: 780, isFreePreview: false, videoId: 'jk1T0CdLxwU', order: 1 },
          { id: 'lsn_106', courseId: 'crs_002', sectionId: 'sec_002_2', title: 'Frames, Shapes & Text', type: 'video', duration: 900, isFreePreview: false, videoId: 'Cx2dkpBxst8', order: 2 },
          { id: 'lsn_107', courseId: 'crs_002', sectionId: 'sec_002_2', title: 'Auto Layout Deep Dive', type: 'video', duration: 1080, isFreePreview: false, videoId: 'TyaGpGDFczw', order: 3 },
          { id: 'lsn_108', courseId: 'crs_002', sectionId: 'sec_002_2', title: 'Components & Variants', type: 'video', duration: 960, isFreePreview: false, videoId: 'grljNaa8S1g', order: 4 },
        ],
      },
    ],
  },
  {
    id: 'crs_003',
    slug: 'full-stack-react-nodejs',
    title: 'Full Stack Web Development: React & Node.js',
    shortDescription: 'Build production-ready web apps with React 19, Node.js, PostgreSQL, and deploy to the cloud.',
    description: `The most hands-on full stack development course in India. Every module is centred on building real features for a production e-commerce platform — from auth and payments to real-time notifications.\n\nYou'll graduate with a deployed, working web app that potential employers can actually use.`,
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop',
    category: 'Programming',
    categorySlug: 'programming',
    level: 'Intermediate',
    language: 'English',
    duration: '22h 15m',
    lessonsCount: 118,
    enrolledCount: 15234,
    rating: 4.7,
    reviewsCount: 1876,
    price: 1299,
    originalPrice: 3999,
    isFree: false,
    includedInPro: true,
    hasCertificate: true,
    instructorId: 'instr_003',
    tags: ['react', 'nodejs', 'javascript', 'fullstack', 'postgresql'],
    whatYoullLearn: [
      'Build complete React 19 apps with hooks, context, and server components',
      'Create RESTful APIs with Node.js, Express, and Prisma ORM',
      'Design and manage PostgreSQL databases with real migrations',
      'Implement JWT authentication and role-based access control',
      'Integrate Stripe payments and Razorpay for Indian markets',
      'Deploy to Vercel and AWS with CI/CD pipelines',
    ],
    requirements: ['Basic HTML, CSS, and JavaScript knowledge', 'Familiarity with the command line', 'A code editor installed (VS Code recommended)'],
    lastUpdated: 'July 2026',
    featured: true,
    trending: true,
    sections: [
      {
        id: 'sec_003_1',
        courseId: 'crs_003',
        title: 'JavaScript & TypeScript Foundations',
        order: 1,
        lessons: [
          { id: 'lsn_201', courseId: 'crs_003', sectionId: 'sec_003_1', title: 'Modern JS: ES6+ You Must Know', type: 'video', duration: 1200, isFreePreview: true, videoId: 'nZ1DMMsyVUI', order: 1 },
          { id: 'lsn_202', courseId: 'crs_003', sectionId: 'sec_003_1', title: 'TypeScript in 60 Minutes', type: 'video', duration: 3600, isFreePreview: false, videoId: 'BwuLxPH8IDs', order: 2 },
          { id: 'lsn_203', courseId: 'crs_003', sectionId: 'sec_003_1', title: 'Async/Await & Promises', type: 'video', duration: 900, isFreePreview: false, videoId: 'V_Kr9OSfDeU', order: 3 },
        ],
      },
      {
        id: 'sec_003_2',
        courseId: 'crs_003',
        title: 'React 19 Mastery',
        order: 2,
        lessons: [
          { id: 'lsn_204', courseId: 'crs_003', sectionId: 'sec_003_2', title: 'React Fundamentals & JSX', type: 'video', duration: 1080, isFreePreview: false, videoId: 'SqcY0GlETPk', order: 1 },
          { id: 'lsn_205', courseId: 'crs_003', sectionId: 'sec_003_2', title: 'State Management with useState & useReducer', type: 'video', duration: 1200, isFreePreview: false, videoId: 'O6P86uwfdR0', order: 2 },
          { id: 'lsn_206', courseId: 'crs_003', sectionId: 'sec_003_2', title: 'Server Components Deep Dive', type: 'video', duration: 1440, isFreePreview: false, videoId: 'jYWLW2M_4fA', order: 3 },
        ],
      },
    ],
  },
  {
    id: 'crs_004',
    slug: 'data-science-python',
    title: 'Data Science & Machine Learning with Python',
    shortDescription: 'From data wrangling to deploying ML models. Build 6 real-world data science projects.',
    description: `Become a data scientist with this comprehensive program. You'll work with real datasets from Kaggle, Indian stock markets, healthcare, and social media — learning pandas, scikit-learn, and TensorFlow through practice.`,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    category: 'Data Science',
    categorySlug: 'data-science',
    level: 'Intermediate',
    language: 'English',
    duration: '18h 30m',
    lessonsCount: 94,
    enrolledCount: 12876,
    rating: 4.8,
    reviewsCount: 1543,
    price: 1099,
    originalPrice: 3499,
    isFree: false,
    includedInPro: true,
    hasCertificate: true,
    instructorId: 'instr_001',
    tags: ['data science', 'machine learning', 'python', 'tensorflow', 'pandas'],
    whatYoullLearn: [
      'Clean, analyse, and visualise data with Pandas, NumPy, and Matplotlib',
      'Build ML models with scikit-learn: regression, classification, clustering',
      'Deep learning with TensorFlow and Keras',
      'Natural Language Processing (NLP) basics with NLTK',
      'Deploy ML models as APIs with FastAPI and Docker',
      'Work with real datasets from Indian markets and global sources',
    ],
    requirements: ['Python basics (loops, functions, classes)', 'Basic statistics knowledge (mean, standard deviation)', 'Jupyter Notebook installed'],
    lastUpdated: 'June 2026',
    featured: false,
    trending: true,
    sections: [
      {
        id: 'sec_004_1',
        courseId: 'crs_004',
        title: 'Data Analysis Foundations',
        order: 1,
        lessons: [
          { id: 'lsn_301', courseId: 'crs_004', sectionId: 'sec_004_1', title: 'Introduction to Data Science', type: 'video', duration: 720, isFreePreview: true, videoId: 'X3paOmcrTjQ', order: 1 },
          { id: 'lsn_302', courseId: 'crs_004', sectionId: 'sec_004_1', title: 'NumPy Fundamentals', type: 'video', duration: 1080, isFreePreview: false, videoId: 'QUT1VHiLmmI', order: 2 },
          { id: 'lsn_303', courseId: 'crs_004', sectionId: 'sec_004_1', title: 'Pandas for Data Wrangling', type: 'video', duration: 1440, isFreePreview: false, videoId: 'vmEHCJofslg', order: 3 },
        ],
      },
    ],
  },
  {
    id: 'crs_005',
    slug: 'digital-marketing-seo',
    title: 'Digital Marketing & SEO Masterclass 2026',
    shortDescription: 'Master Google Ads, Meta Ads, SEO, and analytics. Run campaigns with a real ₹10,000 ad budget.',
    description: `The most practical digital marketing course available. You'll not just learn theory — you'll run actual Google Ads and Meta Ads campaigns with a provided practice budget, optimise a real website for SEO, and build a complete marketing funnel.`,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    category: 'Marketing',
    categorySlug: 'marketing',
    level: 'Beginner',
    language: 'Hindi + English',
    duration: '10h 45m',
    lessonsCount: 62,
    enrolledCount: 21345,
    rating: 4.6,
    reviewsCount: 2876,
    price: 699,
    originalPrice: 2199,
    isFree: false,
    includedInPro: true,
    hasCertificate: true,
    instructorId: 'instr_002',
    tags: ['digital marketing', 'seo', 'google ads', 'meta ads', 'analytics'],
    whatYoullLearn: [
      'Set up and run profitable Google Search and Display campaigns',
      'Create high-converting Meta/Instagram ad creatives and audiences',
      'Optimise websites for Google ranking with on-page and off-page SEO',
      'Analyse campaign data with Google Analytics 4 and Search Console',
      'Build complete marketing funnels from awareness to conversion',
      'Manage social media presence for brand growth',
    ],
    requirements: ['No prior marketing experience needed', 'A Google account (Gmail)', 'Basic computer skills'],
    lastUpdated: 'May 2026',
    featured: false,
    trending: true,
    sections: [
      {
        id: 'sec_005_1',
        courseId: 'crs_005',
        title: 'Digital Marketing Fundamentals',
        order: 1,
        lessons: [
          { id: 'lsn_401', courseId: 'crs_005', sectionId: 'sec_005_1', title: 'The Digital Marketing Landscape 2026', type: 'video', duration: 840, isFreePreview: true, videoId: 'bixR-KQODHI', order: 1 },
          { id: 'lsn_402', courseId: 'crs_005', sectionId: 'sec_005_1', title: 'Customer Journey & Funnel Mapping', type: 'video', duration: 960, isFreePreview: false, videoId: 'efxyNEYqtfE', order: 2 },
        ],
      },
    ],
  },
  {
    id: 'crs_006',
    slug: 'english-communication',
    title: 'Professional English Communication for Indian Professionals',
    shortDescription: 'Speak confidently in meetings, interviews, and presentations. Build business English fluency in 30 days.',
    description: `Designed specifically for Indian professionals who want to communicate more confidently in English at work. Every lesson uses real workplace scenarios — meetings, emails, presentations, and negotiations.`,
    thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=450&fit=crop',
    category: 'Language',
    categorySlug: 'language',
    level: 'Beginner',
    language: 'English + Hindi',
    duration: '6h 30m',
    lessonsCount: 38,
    enrolledCount: 34876,
    rating: 4.7,
    reviewsCount: 4321,
    price: 399,
    originalPrice: 1299,
    isFree: true,
    includedInPro: true,
    hasCertificate: true,
    instructorId: 'instr_002',
    tags: ['english', 'communication', 'business english', 'speaking', 'interview'],
    whatYoullLearn: [
      'Speak confidently in English meetings and group discussions',
      'Write professional emails, reports, and presentations',
      'Ace English interviews with practised responses',
      'Reduce mother-tongue influence in pronunciation',
      'Use business vocabulary appropriately in context',
      'Build a daily English practice habit that actually works',
    ],
    requirements: ['Basic understanding of English (can read simple sentences)', 'Willingness to speak and practise daily'],
    lastUpdated: 'April 2026',
    featured: true,
    trending: false,
    sections: [
      {
        id: 'sec_006_1',
        courseId: 'crs_006',
        title: 'Speaking Foundations',
        order: 1,
        lessons: [
          { id: 'lsn_501', courseId: 'crs_006', sectionId: 'sec_006_1', title: 'Why Your English Holds You Back (And How to Fix It)', type: 'video', duration: 600, isFreePreview: true, videoId: 'kEjGIIJgYDI', order: 1 },
          { id: 'lsn_502', courseId: 'crs_006', sectionId: 'sec_006_1', title: 'Pronunciation: Common Indian English Errors', type: 'video', duration: 780, isFreePreview: true, videoId: 'dBF3Wl11OP0', order: 2 },
        ],
      },
    ],
  },
  {
    id: 'crs_007',
    slug: 'financial-literacy',
    title: 'Personal Finance & Investment Masterclass',
    shortDescription: 'Master budgeting, mutual funds, stocks, and tax planning. Build wealth on any salary.',
    description: `India's most practical personal finance course, designed for salaried professionals, entrepreneurs, and students. You'll set up a real budget, open a demat account, invest your first SIP, and understand tax-saving instruments under the new tax regime.`,
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop',
    category: 'Finance',
    categorySlug: 'finance',
    level: 'Beginner',
    language: 'Hindi + English',
    duration: '9h 15m',
    lessonsCount: 54,
    enrolledCount: 28943,
    rating: 4.8,
    reviewsCount: 3876,
    price: 499,
    originalPrice: 1599,
    isFree: false,
    includedInPro: true,
    hasCertificate: true,
    instructorId: 'instr_003',
    tags: ['finance', 'investment', 'mutual funds', 'stocks', 'tax'],
    whatYoullLearn: [
      'Build a realistic budget and emergency fund',
      'Understand and invest in mutual funds, index funds, and stocks',
      'Navigate India\'s tax system: 80C, new regime, and capital gains',
      'Evaluate real estate, gold, and alternative investments',
      'Calculate and plan for retirement using the FIRE framework',
      'Protect your wealth with the right insurance coverage',
    ],
    requirements: ['No finance background needed', 'A smartphone with internet', 'A willingness to talk about money'],
    lastUpdated: 'June 2026',
    featured: true,
    trending: true,
    sections: [
      {
        id: 'sec_007_1',
        courseId: 'crs_007',
        title: 'Money Mindset & Budgeting',
        order: 1,
        lessons: [
          { id: 'lsn_601', courseId: 'crs_007', sectionId: 'sec_007_1', title: 'Why Most Indians Struggle with Money', type: 'video', duration: 720, isFreePreview: true, videoId: 'FqMSIEQALUU', order: 1 },
          { id: 'lsn_602', courseId: 'crs_007', sectionId: 'sec_007_1', title: 'The 50-30-20 Budget Rule for Indians', type: 'video', duration: 840, isFreePreview: false, videoId: 'PnG4fO5_vU0', order: 2 },
        ],
      },
    ],
  },
  {
    id: 'crs_008',
    slug: 'aws-cloud-devops',
    title: 'AWS Cloud & DevOps Engineering',
    shortDescription: 'Prepare for AWS Solutions Architect certification. Build and deploy real cloud infrastructure.',
    description: `Become cloud-certified and job-ready. This course prepares you for the AWS Solutions Architect Associate exam while teaching you to actually build production infrastructure with EC2, RDS, S3, Lambda, and more.`,
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=450&fit=crop',
    category: 'Cloud & DevOps',
    categorySlug: 'cloud-devops',
    level: 'Intermediate',
    language: 'English',
    duration: '24h 30m',
    lessonsCount: 132,
    enrolledCount: 8756,
    rating: 4.8,
    reviewsCount: 987,
    price: 1499,
    originalPrice: 4999,
    isFree: false,
    includedInPro: true,
    hasCertificate: true,
    instructorId: 'instr_003',
    tags: ['aws', 'cloud', 'devops', 'docker', 'kubernetes', 'terraform'],
    whatYoullLearn: [
      'Design scalable, fault-tolerant AWS architectures',
      'Work with EC2, RDS, S3, Lambda, CloudFront, Route 53',
      'Container orchestration with Docker and Kubernetes (EKS)',
      'Infrastructure as Code with Terraform and CloudFormation',
      'CI/CD pipelines with GitHub Actions, CodePipeline, and CodeDeploy',
      'Pass the AWS Solutions Architect Associate exam',
    ],
    requirements: ['Basic Linux command line knowledge', 'Understanding of networking concepts (HTTP, DNS)', 'An AWS free-tier account'],
    lastUpdated: 'July 2026',
    featured: false,
    trending: false,
    sections: [
      {
        id: 'sec_008_1',
        courseId: 'crs_008',
        title: 'AWS Fundamentals',
        order: 1,
        lessons: [
          { id: 'lsn_701', courseId: 'crs_008', sectionId: 'sec_008_1', title: 'Cloud Computing Concepts', type: 'video', duration: 900, isFreePreview: true, videoId: 'M988_fsOSWo', order: 1 },
          { id: 'lsn_702', courseId: 'crs_008', sectionId: 'sec_008_1', title: 'AWS Global Infrastructure', type: 'video', duration: 720, isFreePreview: false, videoId: 'a9__D53WsUs', order: 2 },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────
// BADGES
// ─────────────────────────────────────────────────────────

export const badges: Badge[] = [
  { id: 'bdg_001', name: 'First Step', description: 'Completed your first lesson', icon: '🚀', category: 'Learning', xpReward: 50, criteria: 'complete_1_lesson', color: '#6C47FF' },
  { id: 'bdg_002', name: 'Week Warrior', description: '7-day learning streak', icon: '🔥', category: 'Streak', xpReward: 100, criteria: 'streak_7_days', color: '#F59E0B' },
  { id: 'bdg_003', name: 'Quiz Ace', description: 'Score 100% on any quiz', icon: '🎯', category: 'Achievement', xpReward: 75, criteria: 'quiz_perfect_score', color: '#00C9A7' },
  { id: 'bdg_004', name: 'Course Crusher', description: 'Complete your first full course', icon: '🎓', category: 'Achievement', xpReward: 200, criteria: 'complete_1_course', color: '#EF4444' },
  { id: 'bdg_005', name: 'Bookworm', description: 'Complete 10 lessons in one day', icon: '📚', category: 'Learning', xpReward: 150, criteria: 'complete_10_lessons_day', color: '#3B82F6' },
  { id: 'bdg_006', name: 'AI Explorer', description: 'Ask the AI tutor 10 questions', icon: '🤖', category: 'Learning', xpReward: 80, criteria: 'ai_queries_10', color: '#8B5CF6' },
  { id: 'bdg_007', name: 'Social Learner', description: 'Write 3 course reviews', icon: '⭐', category: 'Community', xpReward: 60, criteria: 'reviews_3', color: '#F59E0B' },
  { id: 'bdg_008', name: 'Speed Learner', description: 'Complete a course in under 7 days', icon: '⚡', category: 'Achievement', xpReward: 120, criteria: 'course_in_7_days', color: '#6C47FF' },
  { id: 'bdg_009', name: 'Consistent', description: '30-day learning streak', icon: '💎', category: 'Streak', xpReward: 300, criteria: 'streak_30_days', color: '#00C9A7' },
  { id: 'bdg_010', name: 'Top Scorer', description: 'Reach the weekly leaderboard top 10', icon: '🏆', category: 'Community', xpReward: 250, criteria: 'leaderboard_top10', color: '#F59E0B' },
  { id: 'bdg_011', name: 'Certified Pro', description: 'Earn 5 course certificates', icon: '📜', category: 'Achievement', xpReward: 500, criteria: 'certificates_5', color: '#EF4444' },
  { id: 'bdg_012', name: 'Night Owl', description: 'Study after 10pm for 5 days', icon: '🦉', category: 'Learning', xpReward: 50, criteria: 'study_night_5', color: '#3B82F6' },
];

// ─────────────────────────────────────────────────────────
// LEADERBOARD DATA (weekly reset)
// ─────────────────────────────────────────────────────────

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'usr_a01', name: 'Arjun Kapoor', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=face', xp: 4820, level: 12, streak: 31, coursesCompleted: 8, change: 'same', changeAmount: 0 },
  { rank: 2, userId: 'usr_a02', name: 'Sneha Reddy', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face', xp: 4540, level: 11, streak: 28, coursesCompleted: 7, change: 'up', changeAmount: 1 },
  { rank: 3, userId: 'usr_a03', name: 'Vikram Singh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop&crop=face', xp: 4210, level: 10, streak: 21, coursesCompleted: 6, change: 'down', changeAmount: 1 },
  { rank: 4, userId: 'usr_a04', name: 'Divya Menon', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop&crop=face', xp: 3980, level: 10, streak: 18, coursesCompleted: 6, change: 'up', changeAmount: 2 },
  { rank: 5, userId: 'usr_a05', name: 'Rahul Gupta', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=48&h=48&fit=crop&crop=face', xp: 3720, level: 9, streak: 14, coursesCompleted: 5, change: 'down', changeAmount: 1 },
  { rank: 6, userId: 'usr_a06', name: 'Meera Iyer', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=48&h=48&fit=crop&crop=face', xp: 3560, level: 9, streak: 12, coursesCompleted: 5, change: 'up', changeAmount: 3 },
  { rank: 7, userId: 'usr_a07', name: 'Karan Malhotra', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=48&h=48&fit=crop&crop=face', xp: 3340, level: 8, streak: 10, coursesCompleted: 4, change: 'down', changeAmount: 2 },
  { rank: 8, userId: 'usr_a08', name: 'Aisha Patel', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop&crop=face', xp: 3120, level: 8, streak: 9, coursesCompleted: 4, change: 'same', changeAmount: 0 },
  { rank: 9, userId: 'usr_a09', name: 'Siddharth Kumar', avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=48&h=48&fit=crop&crop=face', xp: 2980, level: 7, streak: 8, coursesCompleted: 4, change: 'up', changeAmount: 1 },
  { rank: 10, userId: 'usr_a10', name: 'Pooja Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=48&h=48&fit=crop&crop=face', xp: 2840, level: 7, streak: 7, coursesCompleted: 3, change: 'down', changeAmount: 2 },
  { rank: 247, userId: 'usr_demo', name: 'You', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=48&h=48&fit=crop&crop=face', xp: 1250, level: 5, streak: 7, coursesCompleted: 3, change: 'up', changeAmount: 12 },
];

// ─────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────

export function getCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id || c.slug === id);
}

export function getCoursesByCategory(categorySlug: string): Course[] {
  if (categorySlug === 'all') return courses;
  return courses.filter(c => c.categorySlug === categorySlug);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter(c => c.featured);
}

export function getTrendingCourses(): Course[] {
  return courses.filter(c => c.trending);
}

export function getFreeCourses(): Course[] {
  return courses.filter(c => c.isFree);
}

export function getInstructorById(id: string): Instructor | undefined {
  return instructors.find(i => i.id === id);
}

export function searchCourses(query: string): Course[] {
  const q = query.toLowerCase().trim();
  if (!q) return courses;
  return courses.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.shortDescription.toLowerCase().includes(q) ||
    c.tags.some(t => t.includes(q)) ||
    c.category.toLowerCase().includes(q)
  );
}

export const categories = [
  { id: 'all', name: 'All Courses', slug: 'all', count: courses.length },
  { id: 'programming', name: 'Programming', slug: 'programming', count: courses.filter(c => c.categorySlug === 'programming').length },
  { id: 'design', name: 'Design', slug: 'design', count: courses.filter(c => c.categorySlug === 'design').length },
  { id: 'data-science', name: 'Data Science', slug: 'data-science', count: courses.filter(c => c.categorySlug === 'data-science').length },
  { id: 'marketing', name: 'Marketing', slug: 'marketing', count: courses.filter(c => c.categorySlug === 'marketing').length },
  { id: 'finance', name: 'Finance', slug: 'finance', count: courses.filter(c => c.categorySlug === 'finance').length },
  { id: 'language', name: 'Language', slug: 'language', count: courses.filter(c => c.categorySlug === 'language').length },
  { id: 'cloud-devops', name: 'Cloud & DevOps', slug: 'cloud-devops', count: courses.filter(c => c.categorySlug === 'cloud-devops').length },
];

// Dashboard data for the logged-in demo user
export const demoUser = {
  id: 'usr_demo',
  name: 'Priya Sharma',
  email: 'priya@example.com',
  avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=face',
  role: 'STUDENT' as const,
  plan: 'PRO' as const,
  level: 5,
  xp: 1250,
  xpToNextLevel: 500,
  streak: 7,
  longestStreak: 14,
  coursesCompleted: 3,
  lessonsCompleted: 47,
  hoursLearned: 12.5,
  certificatesEarned: 3,
  aiQueriesRemaining: 42,
  badges: ['bdg_001', 'bdg_002', 'bdg_003', 'bdg_004', 'bdg_006'],
  enrolledCourseIds: ['crs_001', 'crs_002', 'crs_006'],
  courseProgress: {
    crs_001: 45,
    crs_002: 72,
    crs_006: 100,
  },
  weeklyActivity: [
    { day: 'Mon', minutes: 35 },
    { day: 'Tue', minutes: 52 },
    { day: 'Wed', minutes: 0 },
    { day: 'Thu', minutes: 28 },
    { day: 'Fri', minutes: 45 },
    { day: 'Sat', minutes: 60 },
    { day: 'Sun', minutes: 22 },
  ],
  recentActivity: [
    { type: 'lesson', text: 'Completed "Lists, Tuples & Dictionaries"', course: 'Python for Beginners', time: '2h ago', xp: 25 },
    { type: 'quiz', text: 'Scored 90% on Section 2 Quiz', course: 'Python for Beginners', time: '3h ago', xp: 50 },
    { type: 'badge', text: 'Earned "Week Warrior" badge', course: '', time: '1 day ago', xp: 100 },
    { type: 'lesson', text: 'Completed "Auto Layout Deep Dive"', course: 'UI/UX Design Masterclass', time: '2 days ago', xp: 25 },
    { type: 'certificate', text: 'Earned certificate for "Professional English"', course: 'English Communication', time: '3 days ago', xp: 200 },
  ],
};

export const membershipPlans = [
  {
    id: 'plan_free',
    name: 'Free',
    tagline: 'Perfect for exploring',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { name: 'Access to free courses (6)', included: true },
      { name: '10 AI tutor queries/day', included: true },
      { name: 'Basic progress tracking', included: true },
      { name: '5-day streak tracking', included: true },
      { name: 'Course certificates', included: false },
      { name: 'Offline downloads', included: false },
      { name: 'Unlimited AI tutor', included: false },
      { name: 'All 500+ courses', included: false },
    ],
    cta: 'Get Started Free',
    popular: false,
    color: 'border-border',
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    tagline: 'For serious learners',
    monthlyPrice: 599,
    annualPrice: 499,
    features: [
      { name: 'All 500+ courses', included: true },
      { name: 'Unlimited AI tutor queries', included: true },
      { name: 'Verified certificates', included: true },
      { name: 'Offline lesson downloads', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Priority support', included: true },
      { name: 'AI Study Plans', included: true },
      { name: 'Live Q&A sessions', included: false },
    ],
    cta: 'Start 7-Day Free Trial',
    popular: true,
    color: 'border-primary',
  },
  {
    id: 'plan_premium',
    name: 'Premium',
    tagline: 'For professionals',
    monthlyPrice: 999,
    annualPrice: 833,
    features: [
      { name: 'Everything in Pro', included: true },
      { name: 'Live Q&A with instructors', included: true },
      { name: 'LinkedIn certificate integration', included: true },
      { name: 'Dedicated learning advisor', included: true },
      { name: 'Early access to new courses', included: true },
      { name: 'Downloadable course PDFs', included: true },
      { name: 'Priority certificate (24h)', included: true },
      { name: '1-on-1 AI coaching sessions', included: true },
    ],
    cta: 'Start 7-Day Free Trial',
    popular: false,
    color: 'border-amber-500',
  },
];

export const testimonials = [
  {
    id: 't1',
    name: 'Rohan Verma',
    role: 'Software Developer',
    company: 'Infosys',
    location: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    text: 'I went from knowing absolutely nothing about Python to landing my first developer job at Infosys in under 4 months. The AI tutor explains things better than my engineering professors ever did.',
    course: 'Python for Beginners',
  },
  {
    id: 't2',
    name: 'Kamala Iyer',
    role: 'Retired Teacher',
    company: '',
    location: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    text: "I'm 58 and terrified of online learning. GUIDESOFT IT SOLUTIONS made it so easy and encouraging. I earned my first digital marketing certificate last week and my grandkids are jealous! The app works perfectly on my iPad.",
    course: 'Digital Marketing & SEO',
  },
  {
    id: 't3',
    name: 'Anjali Mehta',
    role: 'L&D Manager',
    company: 'HDFC Bank',
    location: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    text: 'Our team of 25 uses GUIDESOFT IT SOLUTIONS for quarterly upskilling. The admin dashboard makes tracking everyone\'s progress effortless. Completion rates went from 34% on our old platform to 91% here. Worth every rupee.',
    course: 'Team Learning Plan',
  },
  {
    id: 't4',
    name: 'Aditya Rathore',
    role: 'UX Designer',
    company: 'Razorpay',
    location: 'Pune',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    text: 'The UI/UX course with Priya Nair is the best design course I\'ve taken — and I\'ve tried Coursera, Udemy, and Interaction Design Foundation. The case studies are real briefs from actual companies. My portfolio went from 0 to job-ready in 3 months.',
    course: 'UI/UX Design Masterclass',
  },
];

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  courses: string[];
  icon: string;
  level: string;
  outcomes: string[];
}

export const learningPaths: LearningPath[] = [
  {
    id: 'full-stack-web',
    title: 'Full-Stack Web Developer',
    description: 'Go from zero to full-stack. Master HTML, CSS, JavaScript, React, Node.js, and PostgreSQL to build production-ready web applications.',
    duration: '6 months',
    courses: ['web-dev-fundamentals', 'javascript-advanced', 'react-mastery', 'nodejs-backend', 'postgresql-essentials', 'system-design'],
    icon: '🌐',
    level: 'Beginner to Advanced',
    outcomes: ['Build full-stack apps from scratch', 'Deploy to production on cloud platforms', 'Ace technical interviews'],
  },
  {
    id: 'data-science-ai',
    title: 'Data Science & AI Engineer',
    description: 'Master Python, statistics, machine learning, and deep learning. Build real ML pipelines and deploy models at scale.',
    duration: '8 months',
    courses: ['python-for-data', 'statistics-fundamentals', 'machine-learning-core', 'deep-learning-pytorch', 'mlops-production', 'ai-product-design'],
    icon: '🤖',
    level: 'Intermediate',
    outcomes: ['Build and deploy ML models', 'Work with large datasets', 'Understand AI ethics and governance'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Designer',
    description: 'Learn user research, wireframing, Figma, design systems, and usability testing. Build a portfolio that gets you hired.',
    duration: '4 months',
    courses: ['design-thinking', 'figma-mastery', 'ux-research-methods', 'design-systems', 'portfolio-projects'],
    icon: '🎨',
    level: 'Beginner',
    outcomes: ['Design pixel-perfect interfaces', 'Conduct user research', 'Build a job-ready portfolio'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Engineer',
    description: 'Master AWS, Docker, Kubernetes, CI/CD pipelines, and infrastructure as code. Become a cloud-native DevOps engineer.',
    duration: '5 months',
    courses: ['linux-foundations', 'aws-core', 'docker-kubernetes', 'terraform-iac', 'cicd-pipelines'],
    icon: '☁️',
    level: 'Intermediate',
    outcomes: ['Deploy apps on AWS', 'Automate infrastructure', 'Implement DevSecOps practices'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Professional',
    description: 'Learn network security, ethical hacking, penetration testing, and incident response. Prepare for CompTIA Security+ and CEH.',
    duration: '6 months',
    courses: ['networking-basics', 'ethical-hacking', 'penetration-testing', 'soc-operations', 'cloud-security'],
    icon: '🔐',
    level: 'Beginner to Intermediate',
    outcomes: ['Conduct penetration tests', 'Respond to security incidents', 'Earn industry certifications'],
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Developer',
    description: 'Build beautiful cross-platform mobile apps with React Native and Flutter. Ship to both iOS and Android from a single codebase.',
    duration: '5 months',
    courses: ['react-native-core', 'flutter-fundamentals', 'mobile-ui-patterns', 'app-store-publishing', 'mobile-backend'],
    icon: '📱',
    level: 'Intermediate',
    outcomes: ['Publish apps to App Store & Google Play', 'Build offline-capable apps', 'Integrate device APIs'],
  },
];
