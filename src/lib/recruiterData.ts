// Recruiter Data Layer & Persistence for GUIDESOFT IT SOLUTIONS Recruiter Portal
import { mockStudents, Student as AdminStudent } from './admin-data';

export interface CompanyProfile {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  industry: string;
  size: string;
  website: string;
  location: string;
  description: string;
  benefits: string[];
  techStack: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  salaryRange: string;
  description: string;
  requirements: string[];
  skills: string[];
  status: 'Active' | 'Closed' | 'Draft';
  createdAt: string;
  applicantsCount: number;
}

export interface CandidateResume {
  studentId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  education: Array<{ school: string; degree: string; year: string; gpa?: string }>;
  experience: Array<{ company: string; role: string; period: string; details: string[] }>;
  projects: Array<{ name: string; description: string; url?: string; techStack: string[] }>;
  skills: string[];
  summary: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  studentId: string;
  stage: 'Screening' | 'Interviewing' | 'Offer' | 'Hired' | 'Rejected';
  appliedDate: string;
  matchScore: number;
  comments: string[];
  notes?: string;
}

export interface InterviewEvent {
  id: string;
  applicationId: string;
  title: string;
  date: string;
  time: string;
  type: 'Technical' | 'HR' | 'System Design' | 'Cultural';
  interviewer: string;
  meetingLink: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface JobOffer {
  id: string;
  applicationId: string;
  baseSalary: string;
  benefits: string;
  startDate: string;
  expiryDate: string;
  notes?: string;
  status: 'Sent' | 'Accepted' | 'Declined' | 'Expired';
}

export interface ChatMessage {
  id: string;
  sender: 'recruiter' | 'candidate';
  text: string;
  timestamp: string;
}

export interface MessageThread {
  studentId: string;
  studentName: string;
  studentAvatar: string;
  lastMessage: string;
  lastActive: string;
  unread: boolean;
  messages: ChatMessage[];
}

export interface RecruiterBilling {
  plan: 'Free' | 'Startup' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Past Due' | 'Cancelled';
  billingCycle: 'Monthly' | 'Annual';
  nextBillingDate: string;
  cardLast4: string;
  invoices: Array<{ id: string; number: string; date: string; amount: number; status: 'Paid' | 'Pending' | 'Failed' }>;
}

// ==========================================
// SEED DATA
// ==========================================

export const initialCompany: CompanyProfile = {
  id: 'c_01',
  name: 'Google India',
  logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=128&h=128&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=1200&h=400&fit=crop',
  industry: 'Technology / Internet',
  size: '10,000+ employees',
  website: 'https://careers.google.com',
  location: 'Bangalore, Karnataka',
  description: 'Google’s mission is to organize the world’s information and make it universally accessible and useful. In India, Google is building technology that empowers hundreds of millions of people through search, cloud, AI, and developer tools.',
  benefits: ['Premium Health Insurance', 'Unlimited Gourmet Meals & Snacks', 'On-site Fitness Centers & Massages', 'Flexible WFH Options', 'Generous Education Reimbursement'],
  techStack: ['Python', 'Go', 'Java', 'C++', 'TensorFlow', 'Kubernetes', 'Angular', 'TypeScript'],
};

export const initialJobs: JobPosting[] = [
  {
    id: 'job_01',
    title: 'Frontend Engineer (React / Next.js)',
    department: 'Engineering',
    location: 'Bangalore (Hybrid)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    salaryRange: '₹18,00,000 - ₹24,00,000 / year',
    description: 'We are looking for a Software Engineer to join our Core UI team. You will build responsive, lightning-fast web applications, collaborate with designers on high-end design systems, and optimize core web vitals (LCP, INP) for Google platforms.',
    requirements: [
      'Strong proficiency in JavaScript, TypeScript, React, and Next.js.',
      'Experience building responsive web applications with semantic HTML and modern CSS (Tailwind, HSL values).',
      'Solid understanding of client-side performance profiling and Core Web Vitals.',
      'Familiarity with Git version control and RESTful APIs integration.'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'CSS', 'HTML5', 'Core Web Vitals'],
    status: 'Active',
    createdAt: '2026-06-15',
    applicantsCount: 3,
  },
  {
    id: 'job_02',
    title: 'Machine Learning Scientist',
    department: 'AI Research',
    location: 'Hyderabad (On-site)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryRange: '₹35,00,000 - ₹48,00,000 / year',
    description: 'Help develop next-generation Gemini LLM modules and AI features. You will design, train, and test complex neural networks, work on retrieval-augmented generation (RAG) models, and collaborate on high-scale ML pipelines.',
    requirements: [
      'Master’s or PhD in Computer Science, AI, or equivalent quantitative field.',
      'Deep understanding of Machine Learning, Deep Learning, and NLP architectures.',
      'Proficiency in Python, TensorFlow, PyTorch, and cloud platforms (GCP).',
      'Hands-on experience with LLM tuning, prompting paradigms, and vector databases.'
    ],
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'NLP', 'Gemini AI', 'PyTorch', 'Data Science'],
    status: 'Active',
    createdAt: '2026-06-20',
    applicantsCount: 2,
  },
  {
    id: 'job_03',
    title: 'UI/UX Designer',
    department: 'Product Design',
    location: 'Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    salaryRange: '₹12,00,000 - ₹16,00,000 / year',
    description: 'Design intuitive, state-of-the-art experiences for Google Cloud consoles. You will draft wireframes, design complex component-driven UI systems in Figma, conduct user interviews, and deliver detailed prototyping flows.',
    requirements: [
      '3+ years of experience as a product/interaction designer.',
      'Advanced mastery of Figma including Auto Layout, component variables, and prototypes.',
      'A stunning portfolio demonstrating case studies of mobile and dashboard interfaces.',
      'Understanding of modern web constraints, user research methodologies, and developer handoffs.'
    ],
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research', 'Design Systems', 'Wireframing'],
    status: 'Active',
    createdAt: '2026-06-25',
    applicantsCount: 2,
  },
  {
    id: 'job_04',
    title: 'Cloud DevOps Specialist',
    department: 'Infrastructure',
    location: 'Bangalore (Hybrid)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryRange: '₹22,00,000 - ₹30,00,000 / year',
    description: 'We are seeking an infrastructure wizard to scale and maintain our scalable multitenant environment. You will lead AWS/GCP cloud configurations, orchestrate CI/CD pipelines, and secure docker containers.',
    requirements: [
      'Solid experience hosting and architecting systems in AWS or GCP.',
      'Strong command over Docker containerization and Kubernetes orchestration.',
      'Expertise in shell scripting and automating build pipelines (Jenkins, GitHub Actions).',
      'Understanding of network security protocols, load balancers, and system monitoring.'
    ],
    skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Bash', 'Terraform', 'System Design'],
    status: 'Draft',
    createdAt: '2026-07-01',
    applicantsCount: 0,
  }
];

export const initialResumes: Record<string, CandidateResume> = {
  s3: {
    studentId: 's3',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 12340',
    location: 'Mumbai, Maharashtra',
    summary: 'A highly passionate Frontend Developer with over 2 years of building responsive, user-centric web applications. Specialist in React 19, Next.js, and high-fidelity Tailwind designs. Active community contributor with a 15-level rank on GUIDESOFT IT SOLUTIONS.',
    education: [
      { school: 'Veermata Jijabai Technological Institute (VJTI)', degree: 'B.Tech in Computer Engineering', year: '2020 - 2024', gpa: '9.2/10 CGPA' }
    ],
    experience: [
      { company: 'Zomato Ltd.', role: 'Frontend Engineering Intern', period: 'Jan 2024 - June 2024', details: ['Re-architected the restaurant settings panel using React 19, boosting render speeds by 30%.', 'Integrated complex Figma design system tokens using Tailwind CSS properties.', 'Optimized web vitals (LCP reduced by 1.2s, INP improved by 40ms).'] },
      { company: 'GUIDESOFT IT SOLUTIONS Community', role: 'Open Source UI Lead', period: '2023 - Present', details: ['Authored 3 reusable component libraries using Radix UI and Tailwind CSS.', 'Created verified templates helping 5,000+ students design portfolio websites.', 'Tutored junior learners on advanced React State patterns.'] }
    ],
    projects: [
      { name: 'EcoStream Dashboard', description: 'A carbon emissions tracker dashboard displaying visual real-time analytics graphs and notifications.', techStack: ['Next.js', 'React', 'TypeScript', 'Recharts', 'Tailwind CSS'] },
      { name: 'Gemini Chat Buddy', description: 'An interactive chatbot wrapper connecting to the Google Gemini model with voice command modules.', techStack: ['React', 'CSS', 'JavaScript', 'Google Generative AI'] }
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'CSS', 'HTML5', 'Figma', 'UI/UX Design', 'Core Web Vitals', 'Recharts']
  },
  s1: {
    studentId: 's1',
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    phone: '+1 (555) 321-4321',
    location: 'San Francisco, CA',
    summary: 'Dedicated Machine Learning Engineer focused on Natural Language Processing (NLP) models, predictive modeling, and AI assistant interfaces. Experienced working in collaborative cross-functional settings.',
    education: [
      { school: 'UC Berkeley', degree: 'B.S. in Data Science & Statistics', year: '2019 - 2023', gpa: '3.85/4.0' }
    ],
    experience: [
      { company: 'Stanford Online', role: 'Teaching Assistant - Machine Learning', period: '2023 - 2024', details: ['Created hands-on neural network exercises in TensorFlow and PyTorch.', 'Evaluated capstone model projects for 200+ online students.', 'Conducted weekly logic tutoring hours.'] },
      { company: 'Predictive Analytics Inc.', role: 'Data Analyst', period: 'June 2022 - Sept 2022', details: ['Built tabular regression models to forecast client monthly churn rates.', 'Cleaned large-scale datasets using NumPy, Pandas, and Matplotlib.', 'Compiled business reports for executive review.'] }
    ],
    projects: [
      { name: 'NewsClassifier NLP', description: 'A neural model classifying news articles into 8 topics with 94.6% validation accuracy.', techStack: ['Python', 'TensorFlow', 'NLP', 'NLTK', 'scikit-learn'] }
    ],
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'NLP', 'Data Science', 'Pandas', 'NumPy', 'scikit-learn']
  },
  s7: {
    studentId: 's7',
    name: 'Liam Chen',
    email: 'liam@example.com',
    phone: '+1 (416) 987-6543',
    location: 'Toronto, Ontario',
    summary: 'Full Stack Engineer with strong foundations in system design, cloud environments, and secure DevOps pipelines. Deep knowledge of container orchestration and security protocols.',
    education: [
      { school: 'University of Toronto', degree: 'B.Sc. in Computer Science', year: '2018 - 2022' }
    ],
    experience: [
      { company: 'Deloitte Tech Lab', role: 'Associate Cloud Consultant', period: '2022 - Present', details: ['Designed secure AWS IAM architectures for 5+ multinational clients.', 'Migrated legacy Node.js monolithic apps into Docker containers.', 'Orchestrated Jenkins build loops reducing delivery cycle by 50%.'] }
    ],
    projects: [
      { name: 'Dockerized Microservices Registry', description: 'Highly scalable API gateway registering 12 backend services using Kubernetes and Docker.', techStack: ['AWS', 'Docker', 'Kubernetes', 'Node.js', 'TypeScript'] }
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Node.js', 'TypeScript', 'JavaScript', 'React', 'CI/CD', 'Bash', 'System Design', 'PostgreSQL']
  },
  s5: {
    studentId: 's5',
    name: 'Yuki Tanaka',
    email: 'yuki@example.com',
    phone: '+81 90-1234-5678',
    location: 'Tokyo, Japan',
    summary: 'Product designer focusing on user research and building comprehensive, accessible design frameworks. Passionate about typography, clean visual hierarchy, and creating products that feel intuitive.',
    education: [
      { school: 'Waseda University', degree: 'B.A. in Digital Media Design', year: '2020 - 2024' }
    ],
    experience: [
      { company: 'Toyota Digital Team', role: 'UX Intern', period: 'Feb 2024 - May 2024', details: ['Conducted 15 user testing interviews regarding dashboard screens.', 'Drafted interactive wireframes in Figma containing 80+ states.', 'Collaborated with engineers to check layout constraints.'] }
    ],
    projects: [
      { name: 'Taberuno App', description: 'A restaurant discovery UI focusing on high-contrast readability and accessibility.', techStack: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing'] }
    ],
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Wireframing', 'Design Systems', 'Prototyping']
  }
};

export const initialApplications: JobApplication[] = [
  // Job 01: Frontend Engineer (React/Next.js)
  { id: 'app_01', jobId: 'job_01', studentId: 's3', stage: 'Interviewing', appliedDate: '2026-06-16', matchScore: 98, comments: ['Outstanding React 19 portfolio.', 'Passed codetest cleanly.', 'Strong fit for UX requirements.'] },
  { id: 'app_02', jobId: 'job_01', studentId: 's7', stage: 'Screening', appliedDate: '2026-06-17', matchScore: 72, comments: ['Has React basics, but background is more DevOps/Systems.', 'Good candidate for full stack teams.'] },
  { id: 'app_03', jobId: 'job_01', studentId: 's5', stage: 'Rejected', appliedDate: '2026-06-18', matchScore: 45, comments: ['Visual designer, lacks technical coding skills.'] },
  
  // Job 02: ML Scientist
  { id: 'app_04', jobId: 'job_02', studentId: 's1', stage: 'Screening', appliedDate: '2026-06-21', matchScore: 94, comments: ['Has excellent TensorFlow and Python background.', 'Needs to review LLM metrics in panel.'] },
  { id: 'app_05', jobId: 'job_02', studentId: 's3', stage: 'Offer', appliedDate: '2026-06-22', matchScore: 60, comments: ['Strong developer, but AI/ML background is limited to API wrappers.'] },

  // Job 03: UI/UX Designer
  { id: 'app_06', jobId: 'job_03', studentId: 's5', stage: 'Interviewing', appliedDate: '2026-06-26', matchScore: 96, comments: ['Outstanding Figma styling. Custom components are pixel-perfect.'] },
  { id: 'app_07', jobId: 'job_03', studentId: 's3', stage: 'Screening', appliedDate: '2026-06-27', matchScore: 82, comments: ['Front-end coder with great design eye. Fits well for hybrid developer-designer roles.'] }
];

export const initialInterviews: InterviewEvent[] = [
  { id: 'int_01', applicationId: 'app_01', title: 'React Performance & Design Systems', date: '2026-07-08', time: '11:00', type: 'Technical', interviewer: 'Ankit Sharma (Lead Architect)', meetingLink: 'https://meet.google.com/abc-defg-hij', status: 'Scheduled' },
  { id: 'int_02', applicationId: 'app_06', title: 'Figma System Review & Handoff', date: '2026-07-09', time: '14:30', type: 'System Design', interviewer: 'Priya Nair (Design Lead)', meetingLink: 'https://meet.google.com/xyz-qwer-tyu', status: 'Scheduled' }
];

export const initialOffers: JobOffer[] = [
  { id: 'off_01', applicationId: 'app_05', baseSalary: '₹22,00,000 / year', benefits: 'Standard healthcare, WFH stipend, meal credits', startDate: '2026-08-01', expiryDate: '2026-07-15', status: 'Sent', notes: 'Hiring as Frontend Specialist in AI Platform team.' }
];

export const initialThreads: MessageThread[] = [
  {
    studentId: 's3',
    studentName: 'Priya Sharma',
    studentAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya',
    lastMessage: 'Thanks for scheduling the session! I will join the meet link tomorrow.',
    lastActive: '2026-07-07T14:45:00Z',
    unread: true,
    messages: [
      { id: 'm1', sender: 'recruiter', text: 'Hi Priya, we are highly impressed by your LearnFlow badges. We would love to discuss a React Engineer opening.', timestamp: '2026-07-06T10:00:00Z' },
      { id: 'm2', sender: 'candidate', text: 'Hi Jennifer! Thank you so much. I would love to chat. What slots work for you?', timestamp: '2026-07-06T11:20:00Z' },
      { id: 'm3', sender: 'recruiter', text: 'Great, I’ve scheduled a technical discussion for tomorrow at 11 AM. Here is the link.', timestamp: '2026-07-07T09:15:00Z' },
      { id: 'm4', sender: 'candidate', text: 'Thanks for scheduling the session! I will join the meet link tomorrow.', timestamp: '2026-07-07T14:45:00Z' }
    ]
  },
  {
    studentId: 's5',
    studentName: 'Yuki Tanaka',
    studentAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Yuki',
    lastMessage: 'Awesome. Looking forward to the interview.',
    lastActive: '2026-07-06T18:20:00Z',
    unread: false,
    messages: [
      { id: 'm5', sender: 'recruiter', text: 'Hello Yuki, can we schedule a Figma dashboard review for Thursday?', timestamp: '2026-07-06T15:00:00Z' },
      { id: 'm6', sender: 'candidate', text: 'Awesome. Looking forward to the interview.', timestamp: '2026-07-06T18:20:00Z' }
    ]
  }
];

export const initialBilling: RecruiterBilling = {
  plan: 'Pro',
  status: 'Active',
  billingCycle: 'Monthly',
  nextBillingDate: '2026-08-01',
  cardLast4: '4242',
  invoices: [
    { id: 'inv_rec_1', number: 'INV-REC-001', date: '2026-07-01', amount: 149, status: 'Paid' },
    { id: 'inv_rec_2', number: 'INV-REC-002', date: '2026-06-01', amount: 149, status: 'Paid' }
  ]
};

// ==========================================
// STATE PERSISTENCE HELPERS
// ==========================================

const getStorage = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  const item = localStorage.getItem(key);
  if (!item) return fallback;
  try {
    return JSON.parse(item);
  } catch {
    return fallback;
  }
};

const setStorage = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const getCompanyProfile = (): CompanyProfile => getStorage('rec_company', initialCompany);
export const saveCompanyProfile = (profile: CompanyProfile): void => setStorage('rec_company', profile);

export const getJobPostings = (): JobPosting[] => getStorage('rec_jobs', initialJobs);
export const saveJobPostings = (jobs: JobPosting[]): void => setStorage('rec_jobs', jobs);

export const getJobApplications = (): JobApplication[] => getStorage('rec_applications', initialApplications);
export const saveJobApplications = (apps: JobApplication[]): void => setStorage('rec_applications', apps);

export const getInterviewEvents = (): InterviewEvent[] => getStorage('rec_interviews', initialInterviews);
export const saveInterviewEvents = (ints: InterviewEvent[]): void => setStorage('rec_interviews', ints);

export const getJobOffers = (): JobOffer[] => getStorage('rec_offers', initialOffers);
export const saveJobOffers = (offers: JobOffer[]): void => setStorage('rec_offers', offers);

export const getMessageThreads = (): MessageThread[] => getStorage('rec_messages', initialThreads);
export const saveMessageThreads = (threads: MessageThread[]): void => setStorage('rec_messages', threads);

export const getBillingDetails = (): RecruiterBilling => getStorage('rec_billing', initialBilling);
export const saveBillingDetails = (billing: RecruiterBilling): void => setStorage('rec_billing', billing);

// ==========================================
// LOCAL AI RESUME MATCHING ENGINE
// ==========================================

export interface ResumeMatchResult {
  score: number;
  technicalFit: string;
  experienceFit: string;
  skillGaps: string[];
  courseRecommendations: Array<{ title: string; link: string }>;
}

export function localResumeMatcher(candidateSkills: string[], jobSkills: string[], student: AdminStudent): ResumeMatchResult {
  const matching = jobSkills.filter(skill => 
    candidateSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs.toLowerCase()))
  );
  
  const totalReqs = jobSkills.length || 1;
  const matchRatio = matching.length / totalReqs;
  
  // Calculate score between 35 and 99
  let calculatedScore = Math.round(35 + (matchRatio * 60) + (student.level * 0.3));
  if (calculatedScore > 99) calculatedScore = 99;

  // Technical Gap Analysis
  const gaps = jobSkills.filter(skill => 
    !candidateSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs.toLowerCase()))
  );

  // Technical Fit commentary
  const technicalFit = matching.length > 0 
    ? `Matches key required technology tools: ${matching.slice(0, 4).join(', ')}. Strong capability in core fields.`
    : 'Limited technology overlap. Fundamental skills in alternative stacks present.';

  // Experience Fit commentary
  let experienceFit = 'Understands coding methodologies through extensive student projects.';
  if (student.level > 10) {
    experienceFit = `Demonstrated leadership and deep conceptual expertise with high XP level (${student.xpPoints} pts). Completed ${student.coursesCompleted} courses and has ${student.certificates} certificates.`;
  } else if (student.level > 5) {
    experienceFit = `Solid application record with mid-level progression (Level ${student.level}). Active platform participant.`;
  }

  // Course recommendations based on gaps
  const courseMap: Record<string, { title: string; link: string }> = {
    'next.js': { title: 'React & Next.js Complete Guide', link: '/courses' },
    'react': { title: 'React & Next.js Complete Guide', link: '/courses' },
    'python': { title: 'Python for Data Analysis', link: '/courses' },
    'tensorflow': { title: 'Deep Learning with TensorFlow', link: '/courses' },
    'data science': { title: 'Python for Data Analysis', link: '/courses' },
    'aws': { title: 'Cloud Architecture on AWS', link: '/courses' },
    'kubernetes': { title: 'Cloud Architecture on AWS', link: '/courses' },
    'figma': { title: 'UI/UX Design Fundamentals', link: '/courses' },
    'ui/ux design': { title: 'UI/UX Design Fundamentals', link: '/courses' },
  };

  const recs = gaps
    .map(gap => courseMap[gap.toLowerCase()])
    .filter(Boolean)
    .filter((v, i, a) => a.findIndex(t => t.title === v.title) === i); // Deduplicate

  // Default recommendation if none found
  if (recs.length === 0) {
    recs.push({ title: 'React & Next.js Complete Guide', link: '/courses' });
  }

  return {
    score: calculatedScore,
    technicalFit,
    experienceFit,
    skillGaps: gaps.length > 0 ? gaps : ['None'],
    courseRecommendations: recs,
  };
}
