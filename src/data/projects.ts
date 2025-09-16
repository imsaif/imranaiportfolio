export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  images: string[];
  featured?: boolean;
  tagline: string;
  stats?: ProjectStat[];
}

export const projects: Project[] = [
  {
    id: 3,
    slug: 'uhg',
    title: 'Optum Bank',
    description: 'Redesigned HSA reimbursement healthcare financial platform serving 450K users',
    fullDescription: `
      As Lead UX Designer at UnitedHealth Group, I spearheaded the redesign of the HSA reimbursement
      system serving 450,000 users. The existing system had significant usability issues with a 1.1% task
      completion rate, causing substantial customer service overhead and user frustration. Through comprehensive
      research, cross-functional collaboration, and systematic design improvements, we enhanced the user experience
      while maintaining strict healthcare financial compliance requirements.

      Key Achievements:
      - Improved task completion from 1.1% to 23%
      - Reduced customer service calls by 28%
      - Achieved measurable business impact through reduced support costs
      - Enhanced mobile completion rate from 0.3% to 15%
      - Established design patterns for regulated healthcare experiences
    `,
    technologies: ['React', 'Node.js', 'Healthcare APIs', 'OCR Processing', 'HIPAA Compliance'],
    liveUrl: 'https://optumbank.com',
    githubUrl: '#',
    images: [
      '/images/casestudy/uhg/uhg-hospital-bank.png',
      '/images/casestudy/uhg/mobile-flow.svg',
      '/images/casestudy/uhg/desktop-interface.svg',
      '/images/casestudy/uhg/user-journey.svg',
    ],
    featured: true,
    tagline: 'ENTERPRISE UX, HEALTHCARE FINTECH',
    stats: [
      { label: 'Task Completion', value: '23% ↑' },
      { label: 'Support Calls', value: '28% ↓' },
      { label: 'User Satisfaction', value: '3.8★' },
    ],
  },
  {
    id: 2,
    slug: 'scheduler',
    title: 'EduScheduler: Intelligent Academic Planning System',
    description: 'Automates teaching schedules for schools using smart algorithms.',
    fullDescription: `
      The Automated Instructional Planning System revolutionizes how educational institutions manage their scheduling needs.
      By leveraging advanced algorithms and machine learning, the system creates optimal schedules while considering
      multiple constraints such as teacher availability, room capacity, and student preferences.

      Key Features:
      - AI-powered schedule optimization
      - Real-time conflict resolution
      - Resource allocation management
      - Interactive schedule visualization
      - Multi-institution support
    `,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Python', 'TensorFlow'],
    liveUrl: 'https://scheduler-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/scheduler',
    images: [
      '/images/casestudy/scheduler/teacherafri1.png',
      '/images/casestudy/scheduler/scheduler-icon.svg',
      '/images/casestudy/scheduler/classroom-icon.svg',
      '/images/casestudy/scheduler/conflict-icon.svg',
    ],
    featured: true,
    tagline: 'UX RESEARCH, PRODUCT DESIGN',
    stats: [
      { label: 'Schools Automated', value: '120+' },
      { label: 'Scheduling Time Saved', value: '85%' },
      { label: 'User Satisfaction', value: '4.7★' },
    ],
  },
  {
    id: 1,
    slug: 'lessonloom',
    title: 'LessonLoom: Automated Lesson Generation Platform',
    description: 'AI platform that quickly creates custom educational materials for teachers.',
    fullDescription: `
      As a product designer for LessonLoom, I led the design process for an innovative platform that automates 
      the creation of educational materials using AI and templating systems. This case study walks through how our 
      design team approached this complex challenge – from understanding user needs and pain points to crafting an 
      intuitive interface that empowers educators to create high-quality content at scale.
    `,
    technologies: ['Vue.js', '.NET Core', 'Python', 'Azure OpenAI', 'AWS S3'],
    liveUrl: 'https://lessonloom-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/lessonloom',
    images: [
      '/images/casestudy/lessonloom/lessonloomboard.png',
      '/images/casestudy/lessonloom/lessonloom-icon.svg',
      '/images/casestudy/lessonloom/creator.svg',
      '/images/casestudy/lessonloom/content-view.svg',
    ],
    featured: true,
    tagline: 'AI DESIGN, AUTOMATION',
    stats: [
      { label: 'Lessons Generated', value: '10,000+' },
      { label: 'Time Saved per Teacher', value: '6h/week' },
      { label: 'Adoption Rate', value: '92%' },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getAllProjects(): Project[] {
  return projects;
}

