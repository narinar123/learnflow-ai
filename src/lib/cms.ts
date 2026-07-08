// GUIDESOFT IT SOLUTIONS — Marketing CMS Data Layer
// Mock data for marketing pages (Blog, Resources, Enterprise, etc.)

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: 'E-Book' | 'Guide' | 'Cheatsheet' | 'Template';
  coverImage: string;
  downloadUrl: string;
  downloadCount: number;
}

export interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  speaker: {
    name: string;
    avatar: string;
    role: string;
  };
  registrationUrl: string;
  coverImage: string;
  isUpcoming: boolean;
}

export interface SuccessStory {
  id: string;
  company: string;
  logo: string;
  title: string;
  quote: string;
  metrics: {
    label: string;
    value: string;
  }[];
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export const blogs: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'future-of-ai-in-education',
    title: 'The Future of AI in Education: Beyond Chatbots',
    excerpt: 'How artificial intelligence is reshaping personalised learning paths and replacing traditional one-size-fits-all curricula.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    author: {
      name: 'Dr. Rajan Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
      role: 'Head of AI Research',
    },
    category: 'Technology',
    publishedAt: '2026-07-01T09:00:00Z',
    readTime: '5 min read',
    tags: ['AI', 'Education', 'Future', 'EdTech'],
  },
  {
    id: 'blog-2',
    slug: 'upskilling-workforce-2026',
    title: 'Upskilling the Workforce for 2026 and Beyond',
    excerpt: 'Why enterprise training needs to move from compliance-based seminars to skill-based continuous learning.',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    author: {
      name: 'Priya Nair',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612f7f3?w=96&h=96&fit=crop&crop=face',
      role: 'Product Lead',
    },
    category: 'Enterprise',
    publishedAt: '2026-06-25T14:30:00Z',
    readTime: '7 min read',
    tags: ['Enterprise', 'HR', 'Upskilling'],
  },
  {
    id: 'blog-3',
    slug: 'mastering-react-19',
    title: 'Mastering React 19: Server Components in Production',
    excerpt: 'A deep dive into how we migrated our entire learning platform to React 19 Server Components for better performance.',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    author: {
      name: 'Ankit Sharma',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face',
      role: 'Senior Engineer',
    },
    category: 'Engineering',
    publishedAt: '2026-06-18T11:15:00Z',
    readTime: '10 min read',
    tags: ['React', 'Engineering', 'Web Dev'],
  }
];

export const resources: Resource[] = [
  {
    id: 'res-1',
    slug: 'enterprise-ai-readiness',
    title: 'Enterprise AI Readiness Checklist',
    description: 'A comprehensive 50-point checklist to assess if your organization is ready to deploy AI-driven learning tools.',
    type: 'Cheatsheet',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80',
    downloadUrl: '#',
    downloadCount: 14250,
  },
  {
    id: 'res-2',
    slug: 'state-of-edtech-2026',
    title: 'The State of EdTech 2026 Report',
    description: 'Data from over 500 enterprises on how they are training their workforce and what tools they use.',
    type: 'E-Book',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80',
    downloadUrl: '#',
    downloadCount: 8930,
  },
  {
    id: 'res-3',
    slug: 'developer-roadmap-guide',
    title: 'The Ultimate Developer Roadmap Guide',
    description: 'Step-by-step paths to become a Frontend, Backend, or DevOps engineer in 2026.',
    type: 'Guide',
    coverImage: 'https://images.unsplash.com/photo-1607799279861-4ddbc137fa3f?w=500&q=80',
    downloadUrl: '#',
    downloadCount: 22100,
  }
];

export const webinars: Webinar[] = [
  {
    id: 'web-1',
    title: 'Scaling Learning Across Distributed Teams',
    description: 'Learn how Fortune 500 companies are keeping their global, remote workforce up-to-date with technical skills.',
    date: 'July 15, 2026',
    time: '10:00 AM PST',
    duration: '45 mins',
    speaker: {
      name: 'Anjali Mehta',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face',
      role: 'VP of L&D, HDFC',
    },
    registrationUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&q=80',
    isUpcoming: true,
  },
  {
    id: 'web-2',
    title: 'Generative AI for Software Engineers',
    description: 'A practical workshop on using AI coding assistants effectively without losing your programming fundamentals.',
    date: 'July 22, 2026',
    time: '2:00 PM EST',
    duration: '60 mins',
    speaker: {
      name: 'Dr. Rajan Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
      role: 'Head of AI Research',
    },
    registrationUrl: '#',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    isUpcoming: true,
  }
];

export const successStories: SuccessStory[] = [
  {
    id: 'story-1',
    company: 'TechFlow Solutions',
    logo: '/logos/techflow.svg',
    title: 'How TechFlow reduced onboarding time by 40% with AI Paths',
    quote: 'LearnFlow completely transformed how we train our new hires. What used to take 6 weeks now takes 3, and they are writing better code.',
    metrics: [
      { label: 'Time saved', value: '40%' },
      { label: 'Completion rate', value: '92%' },
      { label: 'Employees', value: '5,000+' }
    ],
    content: 'Full story goes here...',
    author: {
      name: 'Sarah Jenkins',
      role: 'CTO, TechFlow',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
    }
  }
];

// Helper functions
export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find(b => b.slug === slug);
}

export function getRelatedBlogs(currentSlug: string, count = 2): BlogPost[] {
  return blogs.filter(b => b.slug !== currentSlug).slice(0, count);
}

export function getUpcomingWebinars(): Webinar[] {
  return webinars.filter(w => w.isUpcoming);
}
