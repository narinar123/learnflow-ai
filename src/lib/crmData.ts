// GUIDESOFT IT SOLUTIONS — Enterprise CRM Mock Data Layer
// Realistic seed data representing leads, clients, students, billing, operations, and campaigns.

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  source: 'Organic Search' | 'LinkedIn Outbound' | 'Referral' | 'Webinar' | 'Cold Outreach' | 'Event';
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  value: number; // Value in INR
  assignedTo: string;
  createdAt: string;
  notes: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyId?: string;
  companyName: string;
  jobTitle: string;
  type: 'Client' | 'Recruiter' | 'Student Representative' | 'Partner';
  addedAt: string;
}

export interface Company {
  id: string;
  name: string;
  industry: 'Technology' | 'Finance' | 'Healthcare' | 'Education' | 'E-commerce' | 'Manufacturing';
  size: '10-50' | '51-200' | '201-1000' | '1000+';
  website: string;
  country: string;
  revenuePotential: number; // in INR
  activeDeals: number;
  joinedAt: string;
}

export interface Institution {
  id: string;
  name: string;
  type: 'University' | 'College' | 'K-12 School' | 'Vocational Center';
  campuses: number;
  studentsCount: number;
  activeSeats: number;
  contractValue: number; // in INR
  primaryContact: string;
  status: 'Active' | 'Pending Setup' | 'Trial' | 'Expired';
}

export interface Recruiter {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  activeJobs: number;
  hireRate: number; // %
  rating: number; // 1-5
  focusArea: string[];
  lastActive: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  certificatesEarned: number;
  engagementScore: number; // 0-100
  planType: 'FREE' | 'BASIC' | 'PRO' | 'PREMIUM' | 'ENTERPRISE';
  joinedAt: string;
  status: 'Active' | 'Inactive' | 'At-Risk';
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'SMS' | 'Multichannel';
  status: 'Draft' | 'Active' | 'Completed' | 'Paused';
  budget: number; // INR
  sentCount: number;
  openRate: number; // %
  clickRate: number; // %
  conversions: number;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Completed';
  relatedTo: string; // E.g., Lead Name or Company Name
  assignedTo: string;
  createdAt: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  duration: number; // minutes
  type: 'Demo' | 'Discovery' | 'Proposal Review' | 'Negotiation' | 'Onboarding' | 'General';
  relatedTo: string;
  meetingLink: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface Activity {
  id: string;
  type: 'Call' | 'Email' | 'SMS' | 'Meeting' | 'Note' | 'System' | 'Workflow';
  title: string;
  description: string;
  timestamp: string; // ISO string
  user: string;
  relatedTo?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  amount: number; // Subtotal
  taxAmount: number; // GST
  totalAmount: number; // Total
  status: 'Paid' | 'Unpaid' | 'Overdue' | 'Draft';
  issueDate: string;
  dueDate: string;
  items: Array<{ description: string; quantity: number; unitPrice: number; total: number }>;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  status: 'Success' | 'Failed' | 'Pending';
  gateway: 'Razorpay' | 'Stripe';
  transactionId: string;
  timestamp: string;
  customerName: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  active: boolean;
  runCount: number;
  lastRun?: string;
}

// ─────────────────────────────────────────────────────────
// SEED DATA REPRESENTATION
// ─────────────────────────────────────────────────────────

export const seedLeads: Lead[] = [
  {
    id: 'lead_001',
    name: 'Rohan Sharma',
    email: 'rohan.sharma@tcs.com',
    phone: '+91 98765 43210',
    company: 'Tata Consultancy Services',
    title: 'VP of Engineering',
    source: 'LinkedIn Outbound',
    status: 'Proposal',
    value: 450000,
    assignedTo: 'Super Admin',
    createdAt: '2026-06-15T10:30:00Z',
    notes: 'Interested in purchasing 100 enterprise licenses for the DevOps and AI engineering track. Requested customized reports.',
  },
  {
    id: 'lead_002',
    name: 'Dr. Ananya Sen',
    email: 'asen@iitb.ac.in',
    phone: '+91 98123 45678',
    company: 'IIT Bombay',
    title: 'Dean of Academic Affairs',
    source: 'Referral',
    status: 'Negotiation',
    value: 1200000,
    assignedTo: 'Super Admin',
    createdAt: '2026-06-20T14:15:00Z',
    notes: 'Campus-wide partnership discussion. Looking to integrate LearnFlow courses into the computer science curriculum.',
  },
  {
    id: 'lead_003',
    name: 'Vikram Malhotra',
    email: 'vmalhotra@razorpay.com',
    phone: '+91 99998 88888',
    company: 'Razorpay',
    title: 'Talent Acquisition Director',
    source: 'Webinar',
    status: 'Contacted',
    value: 350000,
    assignedTo: 'Super Admin',
    createdAt: '2026-07-01T09:00:00Z',
    notes: 'Wants to setup a Recruiter account to hire students completing Web Development and Blockchain courses.',
  },
  {
    id: 'lead_004',
    name: 'Pooja Hegde',
    email: 'pooja.hegde@wipro.com',
    phone: '+91 97777 66666',
    company: 'Wipro Technologies',
    title: 'Learning & Development Lead',
    source: 'Organic Search',
    status: 'New',
    value: 600000,
    assignedTo: 'Super Admin',
    createdAt: '2026-07-06T18:45:00Z',
    notes: 'Downloaded the Enterprise brochure. Needs to schedule an introductory call to review security features.',
  },
  {
    id: 'lead_005',
    name: 'Nitin Gadkari',
    email: 'nitin@infosys.com',
    phone: '+91 96666 55555',
    company: 'Infosys',
    title: 'Global Delivery Head',
    source: 'Cold Outreach',
    status: 'Qualified',
    value: 800000,
    assignedTo: 'Super Admin',
    createdAt: '2026-06-28T11:20:00Z',
    notes: 'Qualified through introductory call. Budget is approved for cloud transition training.',
  },
  {
    id: 'lead_006',
    name: 'Arjun Reddy',
    email: 'arjun@apollo.org',
    phone: '+91 95555 44444',
    company: 'Apollo Hospitals Group',
    title: 'Chief Information Officer',
    source: 'Event',
    status: 'Won',
    value: 950000,
    assignedTo: 'Super Admin',
    createdAt: '2026-05-10T16:00:00Z',
    notes: 'Contract signed for hospital tech training. Initial deployment completed.',
  },
  {
    id: 'lead_007',
    name: 'Sarah Connor',
    email: 'sconnor@cyberdyne.io',
    phone: '+1 555-0199',
    company: 'Cyberdyne Systems',
    title: 'VP of AI Research',
    source: 'Organic Search',
    status: 'Lost',
    value: 1500000,
    assignedTo: 'Super Admin',
    createdAt: '2026-04-12T10:00:00Z',
    notes: 'Lost to in-house developed training solution due to compliance needs.',
  }
];

export const seedContacts: Contact[] = [
  {
    id: 'cnt_001',
    name: 'Rohan Sharma',
    email: 'rohan.sharma@tcs.com',
    phone: '+91 98765 43210',
    companyName: 'Tata Consultancy Services',
    jobTitle: 'VP of Engineering',
    type: 'Client',
    addedAt: '2026-06-15T10:30:00Z',
  },
  {
    id: 'cnt_002',
    name: 'Dr. Ananya Sen',
    email: 'asen@iitb.ac.in',
    phone: '+91 98123 45678',
    companyName: 'IIT Bombay',
    jobTitle: 'Dean of Academic Affairs',
    type: 'Partner',
    addedAt: '2026-06-20T14:15:00Z',
  },
  {
    id: 'cnt_003',
    name: 'Vikram Malhotra',
    email: 'vmalhotra@razorpay.com',
    phone: '+91 99998 88888',
    companyName: 'Razorpay',
    jobTitle: 'Talent Acquisition Director',
    type: 'Recruiter',
    addedAt: '2026-07-01T09:00:00Z',
  },
  {
    id: 'cnt_004',
    name: 'Rajesh Nair',
    email: 'r.nair@hdfc.com',
    phone: '+91 90000 11111',
    companyName: 'HDFC Bank',
    jobTitle: 'HR Specialist',
    type: 'Client',
    addedAt: '2026-05-20T12:00:00Z',
  }
];

export const seedCompanies: Company[] = [
  {
    id: 'comp_001',
    name: 'Tata Consultancy Services',
    industry: 'Technology',
    size: '1000+',
    website: 'https://tcs.com',
    country: 'India',
    revenuePotential: 450000,
    activeDeals: 1,
    joinedAt: '2026-06-15T10:30:00Z',
  },
  {
    id: 'comp_002',
    name: 'Razorpay',
    industry: 'Finance',
    size: '201-1000',
    website: 'https://razorpay.com',
    country: 'India',
    revenuePotential: 350000,
    activeDeals: 1,
    joinedAt: '2026-07-01T09:00:00Z',
  },
  {
    id: 'comp_003',
    name: 'Infosys Ltd',
    industry: 'Technology',
    size: '1000+',
    website: 'https://infosys.com',
    country: 'India',
    revenuePotential: 800000,
    activeDeals: 1,
    joinedAt: '2026-06-28T11:20:00Z',
  },
  {
    id: 'comp_004',
    name: 'Zomato Media',
    industry: 'E-commerce',
    size: '1000+',
    website: 'https://zomato.com',
    country: 'India',
    revenuePotential: 0,
    activeDeals: 0,
    joinedAt: '2026-03-12T10:00:00Z',
  }
];

export const seedInstitutions: Institution[] = [
  {
    id: 'inst_001',
    name: 'IIT Bombay',
    type: 'University',
    campuses: 1,
    studentsCount: 12000,
    activeSeats: 350,
    contractValue: 1200000,
    primaryContact: 'Dr. Ananya Sen',
    status: 'Trial',
  },
  {
    id: 'inst_002',
    name: 'Delhi University',
    type: 'University',
    campuses: 84,
    studentsCount: 77000,
    activeSeats: 1500,
    contractValue: 3400000,
    primaryContact: 'Prof. Ramesh Gupta',
    status: 'Active',
  },
  {
    id: 'inst_003',
    name: 'St. Xaviers College',
    type: 'College',
    campuses: 2,
    studentsCount: 4500,
    activeSeats: 0,
    contractValue: 0,
    primaryContact: 'Sister Mary D’Souza',
    status: 'Pending Setup',
  }
];

export const seedRecruiters: Recruiter[] = [
  {
    id: 'rec_001',
    name: 'Vikram Malhotra',
    company: 'Razorpay',
    email: 'vmalhotra@razorpay.com',
    phone: '+91 99998 88888',
    activeJobs: 14,
    hireRate: 85,
    rating: 4.8,
    focusArea: ['Frontend Developer', 'NodeJS Developer', 'React Architect'],
    lastActive: '2026-07-07T12:00:00Z',
  },
  {
    id: 'rec_002',
    name: 'Megha Gupta',
    company: 'Zomato',
    email: 'megha.g@zomato.com',
    phone: '+91 91234 56789',
    activeJobs: 8,
    hireRate: 67,
    rating: 4.2,
    focusArea: ['Python Developer', 'Data Analyst', 'ML Engineer'],
    lastActive: '2026-07-06T15:30:00Z',
  },
  {
    id: 'rec_003',
    name: 'David Miller',
    company: 'Meta India',
    email: 'davidm@meta.com',
    phone: '+91 92222 33333',
    activeJobs: 22,
    hireRate: 91,
    rating: 4.9,
    focusArea: ['Product Manager', 'AI Specialist', 'iOS Engineer'],
    lastActive: '2026-07-07T18:15:00Z',
  }
];

export const seedStudents: Student[] = [
  {
    id: 'stud_001',
    name: 'Priya Patel',
    email: 'priya.patel@gmail.com',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    certificatesEarned: 3,
    engagementScore: 92,
    planType: 'PRO',
    joinedAt: '2026-05-01T10:00:00Z',
    status: 'Active',
  },
  {
    id: 'stud_002',
    name: 'Aravind Swamy',
    email: 'aravind.s@outlook.com',
    coursesEnrolled: 2,
    coursesCompleted: 0,
    certificatesEarned: 0,
    engagementScore: 35,
    planType: 'FREE',
    joinedAt: '2026-06-25T11:00:00Z',
    status: 'At-Risk',
  },
  {
    id: 'stud_003',
    name: 'Karan Malhotra',
    email: 'karan19@yahoo.com',
    coursesEnrolled: 12,
    coursesCompleted: 9,
    certificatesEarned: 9,
    engagementScore: 98,
    planType: 'PREMIUM',
    joinedAt: '2026-01-15T09:00:00Z',
    status: 'Active',
  },
  {
    id: 'stud_004',
    name: 'Sneha Rao',
    email: 'sneha.rao@gmail.com',
    coursesEnrolled: 4,
    coursesCompleted: 1,
    certificatesEarned: 1,
    engagementScore: 71,
    planType: 'BASIC',
    joinedAt: '2026-04-10T14:00:00Z',
    status: 'Active',
  },
  {
    id: 'stud_005',
    name: 'Aditya Sen',
    email: 'aditya.sen@iitb.ac.in',
    coursesEnrolled: 6,
    coursesCompleted: 0,
    certificatesEarned: 0,
    engagementScore: 50,
    planType: 'ENTERPRISE',
    joinedAt: '2026-06-20T14:15:00Z',
    status: 'Active',
  }
];

export const seedCampaigns: Campaign[] = [
  {
    id: 'camp_001',
    name: 'Pro Subscription Upgrade Drive (July 2026)',
    type: 'Email',
    status: 'Active',
    budget: 50000,
    sentCount: 15400,
    openRate: 28.5,
    clickRate: 6.2,
    conversions: 247,
    createdAt: '2026-07-01T08:00:00Z',
  },
  {
    id: 'camp_002',
    name: 'New Flutter Developer Path Announcement',
    type: 'Email',
    status: 'Completed',
    budget: 30000,
    sentCount: 22000,
    openRate: 34.1,
    clickRate: 9.8,
    conversions: 189,
    createdAt: '2026-06-10T09:00:00Z',
  },
  {
    id: 'camp_003',
    name: 'Streak Warning - SMS Recall Campaign',
    type: 'SMS',
    status: 'Active',
    budget: 15000,
    sentCount: 4200,
    openRate: 95.0,
    clickRate: 15.3,
    conversions: 540,
    createdAt: '2026-07-05T12:00:00Z',
  },
  {
    id: 'camp_004',
    name: 'August 2026 AI Webinar Promo',
    type: 'Multichannel',
    status: 'Draft',
    budget: 80000,
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    conversions: 0,
    createdAt: '2026-07-07T11:00:00Z',
  }
];

export const seedTasks: Task[] = [
  {
    id: 'tsk_001',
    title: 'Call Rohan Sharma to review proposal revisions',
    description: 'Rohan wants to add 20 seats to the DevOps path. Adjust quote by ₹75,000.',
    dueDate: '2026-07-08',
    priority: 'High',
    status: 'Pending',
    relatedTo: 'Tata Consultancy Services',
    assignedTo: 'Super Admin',
    createdAt: '2026-07-07T10:00:00Z',
  },
  {
    id: 'tsk_002',
    title: 'Draft campus agreement for IIT Bombay',
    description: 'Include clauses on offline access for labs and custom certificates with college logo.',
    dueDate: '2026-07-10',
    priority: 'High',
    status: 'Pending',
    relatedTo: 'IIT Bombay',
    assignedTo: 'Super Admin',
    createdAt: '2026-07-07T14:00:00Z',
  },
  {
    id: 'tsk_003',
    title: 'Follow up on unpaid invoice for Apollo Hospitals',
    description: 'Invoice INV-2026-003 is overdue by 5 days. Reach out to finance desk.',
    dueDate: '2026-07-09',
    priority: 'Medium',
    status: 'Pending',
    relatedTo: 'Apollo Hospitals Group',
    assignedTo: 'Super Admin',
    createdAt: '2026-07-06T09:00:00Z',
  },
  {
    id: 'tsk_004',
    title: 'Approve new course list templates',
    description: 'Prepare custom newsletter template for passive learners.',
    dueDate: '2026-07-06',
    priority: 'Low',
    status: 'Completed',
    relatedTo: 'Pro Upgrade Drive Campaign',
    assignedTo: 'Super Admin',
    createdAt: '2026-07-05T15:00:00Z',
  }
];

export const seedMeetings: Meeting[] = [
  {
    id: 'mtg_001',
    title: 'TCS Enterprise License Review',
    description: 'Going over custom paths, SSO, and billing cycle options.',
    date: '2026-07-08',
    time: '11:00',
    duration: 45,
    type: 'Proposal Review',
    relatedTo: 'Tata Consultancy Services',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    status: 'Scheduled',
  },
  {
    id: 'mtg_002',
    title: 'IIT Bombay Academic Partnership Sync',
    description: 'Finalizing pricing models and student seat count requirements.',
    date: '2026-07-09',
    time: '14:30',
    duration: 60,
    type: 'Negotiation',
    relatedTo: 'IIT Bombay',
    meetingLink: 'https://zoom.us/j/9876543210',
    status: 'Scheduled',
  },
  {
    id: 'mtg_003',
    title: 'Razorpay Recruiter Profile Review',
    description: 'Walkthrough of how their hiring managers filter students based on project completions.',
    date: '2026-07-07',
    time: '16:00',
    duration: 30,
    type: 'Discovery',
    relatedTo: 'Razorpay',
    meetingLink: 'https://meet.google.com/xyz-qprs-tuv',
    status: 'Completed',
  }
];

export const seedActivities: Activity[] = [
  {
    id: 'act_001',
    type: 'System',
    title: 'New Lead Generated',
    description: 'Pooja Hegde downloaded the Enterprise brochure and was added as a New lead.',
    timestamp: '2026-07-06T18:45:00Z',
    user: 'System',
    relatedTo: 'Wipro Technologies',
  },
  {
    id: 'act_002',
    type: 'Call',
    title: 'Discovery Call Placed',
    description: 'Discussed cloud training requirements with Nitin Gadkari. Qualified the opportunity.',
    timestamp: '2026-06-29T10:30:00Z',
    user: 'Super Admin',
    relatedTo: 'Infosys',
  },
  {
    id: 'act_003',
    type: 'Workflow',
    title: 'Welcome Email Sent',
    description: 'Workflow "New Lead Welcome Sequence" successfully sent onboarding mailer to Pooja Hegde.',
    timestamp: '2026-07-06T18:46:00Z',
    user: 'Automation',
    relatedTo: 'Wipro Technologies',
  },
  {
    id: 'act_004',
    type: 'Email',
    title: 'Proposal Shared via Email',
    description: 'Shared custom pricing draft for 100 enterprise licenses with Rohan Sharma.',
    timestamp: '2026-06-16T15:00:00Z',
    user: 'Super Admin',
    relatedTo: 'Tata Consultancy Services',
  }
];

export const seedInvoices: Invoice[] = [
  {
    id: 'inv_001',
    invoiceNumber: 'INV-2026-001',
    clientName: 'Tata Consultancy Services',
    clientEmail: 'billing@tcs.com',
    amount: 381355,
    taxAmount: 68645,
    totalAmount: 450000,
    status: 'Unpaid',
    issueDate: '2026-07-01',
    dueDate: '2026-07-31',
    items: [
      { description: 'Enterprise LearnFlow Seats (Annual License) — 100 units', quantity: 100, unitPrice: 3813.55, total: 381355 }
    ]
  },
  {
    id: 'inv_002',
    invoiceNumber: 'INV-2026-002',
    clientName: 'Apollo Hospitals Group',
    clientEmail: 'apollopayments@apollo.org',
    amount: 805085,
    taxAmount: 144915,
    totalAmount: 950000,
    status: 'Paid',
    issueDate: '2026-05-12',
    dueDate: '2026-06-12',
    items: [
      { description: 'Healthcare Tech and HIPAA Compliance Custom Pathway Licenses', quantity: 1, unitPrice: 805085, total: 805085 }
    ]
  },
  {
    id: 'inv_003',
    invoiceNumber: 'INV-2026-003',
    clientName: 'IIT Bombay',
    clientEmail: 'accounts@iitb.ac.in',
    amount: 50000,
    taxAmount: 9000,
    totalAmount: 59000,
    status: 'Overdue',
    issueDate: '2026-06-01',
    dueDate: '2026-07-01',
    items: [
      { description: 'Academic Portal Trial Activation Fee', quantity: 1, unitPrice: 50000, total: 50000 }
    ]
  }
];

export const seedPayments: Payment[] = [
  {
    id: 'pay_001',
    invoiceId: 'inv_002',
    amount: 950000,
    status: 'Success',
    gateway: 'Razorpay',
    transactionId: 'pay_RZP_982392813',
    timestamp: '2026-05-13T11:00:00Z',
    customerName: 'Apollo Hospitals Group',
  },
  {
    id: 'pay_002',
    invoiceId: 'inv_003',
    amount: 59000,
    status: 'Failed',
    gateway: 'Stripe',
    transactionId: 'ch_STR_891312389',
    timestamp: '2026-06-02T15:30:00Z',
    customerName: 'IIT Bombay',
  }
];

export const seedWorkflows: AutomationWorkflow[] = [
  {
    id: 'wf_001',
    name: 'New Lead Welcome sequence',
    description: 'When a new lead is captured, automatically trigger a welcome email sequence introducing our courses.',
    trigger: 'Lead Created',
    action: 'Send Onboarding Welcome Email',
    active: true,
    runCount: 42,
    lastRun: '2026-07-06T18:46:00Z',
  },
  {
    id: 'wf_002',
    name: 'At-Risk Learner Notification',
    description: 'When a Pro student goes inactive for 7+ days, dispatch a customized push notification with their current course status.',
    trigger: 'Student Inactive (7 Days)',
    action: 'Send Reactivation Push & Email',
    active: true,
    runCount: 114,
    lastRun: '2026-07-07T08:00:00Z',
  },
  {
    id: 'wf_003',
    name: 'Recruiter Alert on Graduate',
    description: 'When a student completes a course and achieves 90%+ score, notify matching recruiters in their area.',
    trigger: 'Course Completed (Score > 90%)',
    action: 'Email Matching Recruiters',
    active: false,
    runCount: 0,
  },
  {
    id: 'wf_004',
    name: 'Subscription Expiry Win-Back',
    description: 'When a Pro subscription cancels, schedule a 50% discount offer after 21 days of inactivity.',
    trigger: 'Subscription Cancelled',
    action: 'Send 50% Off Promo after 21 days',
    active: true,
    runCount: 8,
    lastRun: '2026-07-02T10:00:00Z',
  }
];
