// ============================================================
// Recruiter Mock Data — GUIDESOFT IT SOLUTIONS Recruiter Portal
// ============================================================

export interface RecruiterJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  status: 'active' | 'closed' | 'draft';
  applicationsCount: number;
  matchedCount: number;
  postedDate: string;
}

export interface MatchedCandidate {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  courseCompleted: string;
  matchScore: number;
  experienceLevel: 'Entry' | 'Mid' | 'Senior';
  status: 'New' | 'Shortlisted' | 'Rejected' | 'Interviewing';
}

export const mockRecruiterJobs: RecruiterJob[] = [
  { id: 'job1', title: 'Associate Machine Learning Engineer', department: 'Engineering', location: 'Bengaluru, India (Hybrid)', type: 'Full-time', status: 'active', applicationsCount: 42, matchedCount: 8, postedDate: '2026-07-01' },
  { id: 'job2', title: 'Data Scientist Intern', department: 'Data Science', location: 'Remote (Global)', type: 'Internship', status: 'active', applicationsCount: 120, matchedCount: 15, postedDate: '2026-07-03' },
  { id: 'job3', title: 'Senior AI Research Scientist', department: 'Research', location: 'San Francisco, USA', type: 'Full-time', status: 'active', applicationsCount: 14, matchedCount: 3, postedDate: '2026-06-25' },
  { id: 'job4', title: 'Python Backend Developer', department: 'Engineering', location: 'Mumbai, India', type: 'Contract', status: 'draft', applicationsCount: 0, matchedCount: 0, postedDate: '2026-07-06' },
];

export const mockMatchedCandidates: MatchedCandidate[] = [
  { id: 'c1', name: 'Sarah Mitchell', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah', skills: ['Python', 'TensorFlow', 'PyTorch', 'Linear Models'], courseCompleted: 'Machine Learning Mastery', matchScore: 95, experienceLevel: 'Entry', status: 'Shortlisted' },
  { id: 'c2', name: 'Priya Sharma', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya', skills: ['Machine Learning', 'Data Analysis', 'SciKit-Learn', 'SQL'], courseCompleted: 'Machine Learning Mastery', matchScore: 92, experienceLevel: 'Mid', status: 'New' },
  { id: 'c3', name: 'Liam Chen', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Liam', skills: ['Deep Learning', 'Computer Vision', 'Keras', 'Python'], courseCompleted: 'Deep Learning with TensorFlow', matchScore: 88, experienceLevel: 'Entry', status: 'Interviewing' },
  { id: 'c4', name: 'Yuki Tanaka', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Yuki', skills: ['Neural Networks', 'Python', 'NLP', 'Stats'], courseCompleted: 'Python for Data Analysis', matchScore: 85, experienceLevel: 'Entry', status: 'New' },
];

export const recruiterKPIs = {
  activeJobsCount: 3,
  totalApplicants: 176,
  shortlistedCount: 18,
  interviewsCount: 6,
};
