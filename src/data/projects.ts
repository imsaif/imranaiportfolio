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
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'lessonloom',
    title: 'LessonLoom: Automated Lesson Generation Platform',
    description:
      'An innovative platform that automates the creation of educational materials using AI and templating systems',
    fullDescription: `
      As a product designer for LessonLoom, I led the design process for an innovative platform that automates 
      the creation of educational materials using AI and templating systems. This case study walks through how our 
      design team approached this complex challenge – from understanding user needs and pain points to crafting an 
      intuitive interface that empowers educators to create high-quality content at scale.
    `,
    technologies: ['Vue.js', '.NET Core', 'Python', 'Azure OpenAI', 'AWS S3'],
    liveUrl: 'https://lessonloom-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/lessonloom',
    images: ['/projects/project1.jpg', '/projects/project2.jpg', '/projects/project3.jpg'],
    featured: true,
    tagline: 'AI-Powered Education',
  },
  {
    id: 2,
    slug: 'scheduler',
    title: 'Automated Instructional Planning System',
    description:
      'An innovative system that automates the generation of optimized teaching schedules for educational institutions',
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
    images: ['/projects/dashboard.jpg', '/images/casestudy/scheduler/timetable-view.svg'],
    featured: true,
    tagline: 'Smart Educational Scheduling',
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

export const featuredProjects = [
  // ... existing projects
  {
    id: 'your-case-study-id', // usually a string or number
    title: 'Your Case Study Title',
    description: 'A short description of your case study',
    slug: 'your-case-study-slug', // This will be used in the URL
    tagline: 'UX Design / AI / Whatever tags apply',
    image: '/images/projects/your-case-study-image.jpg', // Add this image to your public folder
    // Any other properties the existing projects have
  },
];
