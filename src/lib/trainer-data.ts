// ============================================================
// Trainer Mock Data — GUIDESOFT IT SOLUTIONS Trainer Portal
// ============================================================

export interface TrainerCourse {
  id: string;
  title: string;
  category: string;
  studentsCount: number;
  rating: number;
  status: 'published' | 'draft' | 'review';
  revenue: number;
  lessonsCount: number;
  createdAt: string;
  completionsCount: number;
}

export interface TrainerStudent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  courseTitle: string;
  progress: number;
  lastActive: string;
  grade: string | null;
  assignmentStatus: 'pending' | 'graded' | 'none';
  assignmentFile?: string;
}

export interface PayoutTransaction {
  id: string;
  amount: number;
  status: 'completed' | 'processing' | 'failed';
  date: string;
  method: string;
}

export const mockTrainerCourses: TrainerCourse[] = [
  { id: 'c1', title: 'Machine Learning Mastery', category: 'Data Science', studentsCount: 3420, rating: 4.9, status: 'published', revenue: 68400, lessonsCount: 48, createdAt: '2023-03-15', completionsCount: 1240 },
  { id: 'c2', title: 'Deep Learning with TensorFlow', category: 'AI & ML', studentsCount: 480, rating: 4.7, status: 'published', revenue: 9600, lessonsCount: 40, createdAt: '2025-01-10', completionsCount: 110 },
  { id: 'c3', title: 'Natural Language Processing v2', category: 'AI & ML', studentsCount: 0, rating: 0, status: 'draft', revenue: 0, lessonsCount: 22, createdAt: '2026-06-30', completionsCount: 0 },
  { id: 'c4', title: 'Computer Vision Basics', category: 'AI & ML', studentsCount: 0, rating: 0, status: 'review', revenue: 0, lessonsCount: 30, createdAt: '2026-07-02', completionsCount: 0 },
];

export const mockTrainerStudents: TrainerStudent[] = [
  { id: 's1', name: 'Sarah Mitchell', email: 'sarah@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah', courseTitle: 'Machine Learning Mastery', progress: 85, lastActive: '2026-07-07', grade: null, assignmentStatus: 'pending', assignmentFile: 'ml_neural_network_hw1.ipynb' },
  { id: 's2', name: 'Priya Sharma', email: 'priya@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya', courseTitle: 'Machine Learning Mastery', progress: 100, lastActive: '2026-07-06', grade: 'A+', assignmentStatus: 'graded', assignmentFile: 'ml_random_forest_hw2.ipynb' },
  { id: 's3', name: 'Liam Chen', email: 'liam@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Liam', courseTitle: 'Deep Learning with TensorFlow', progress: 42, lastActive: '2026-07-07', grade: null, assignmentStatus: 'none' },
  { id: 's4', name: 'Carlos Ruiz', email: 'carlos@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos', courseTitle: 'Deep Learning with TensorFlow', progress: 12, lastActive: '2026-07-04', grade: null, assignmentStatus: 'none' },
  { id: 's5', name: 'Yuki Tanaka', email: 'yuki@example.com', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Yuki', courseTitle: 'Machine Learning Mastery', progress: 95, lastActive: '2026-07-07', grade: null, assignmentStatus: 'pending', assignmentFile: 'backprop_math.pdf' },
];

export const mockPayouts: PayoutTransaction[] = [
  { id: 'tx1', amount: 4800, status: 'completed', date: '2026-07-01', method: 'Stripe Direct (****4321)' },
  { id: 'tx2', amount: 5200, status: 'completed', date: '2026-06-01', method: 'Stripe Direct (****4321)' },
  { id: 'tx3', amount: 3900, status: 'completed', date: '2026-05-01', method: 'Stripe Direct (****4321)' },
  { id: 'tx4', amount: 6200, status: 'completed', date: '2026-04-01', method: 'Stripe Direct (****4321)' },
];

export const trainerKPIs = {
  totalStudents: 3900,
  averageRating: 4.8,
  totalRevenue: 78000,
  monthlyRevenue: 5400,
  payoutProgress: 480, // Next payout amount
};
