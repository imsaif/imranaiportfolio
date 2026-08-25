export interface ProjectStat {
  label: string;
  value: string;
}

export type ProjectLogo =
  | { type: 'image'; src: string }
  | { type: 'icon'; name: 'terminal' | 'lightbulb' | 'folder' | 'writing' | 'mail' };

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
  /**
   * When true the card CTA links externally to liveUrl ("Visit site") instead
   * of the internal /casestudy/<slug> route. Used for live products (dwc/aiex/llmsgist).
   */
  external?: boolean;
  /** Optional CTA copy override; defaults to "View Case Study" or "Visit Site". */
  ctaLabel?: string;
  /** Optional logo treatment for live products (rendered in place of images). */
  logo?: ProjectLogo;
  /** Optional internal decision-record page, linked beneath the card. */
  decisionsUrl?: string;
  /** Short factual number shown as a label on the card. Omit when there isn't one worth showing. */
  statLabel?: string;
  /**
   * Shown when the card is expanded. Products carry problem + decision;
   * index cards carry `inside` instead, since inventing a "problem" for an
   * index would put a position in my mouth I never took.
   */
  detail?: {
    problem?: string;
    chose?: string;
    over?: string;
    inside?: string;
    moreHref?: string;
    moreLabel?: string;
  };
  /**
   * When present the card lists these links instead of a description.
   * A card with its own links cannot also be one big click target.
   */
  links?: { label: string; href: string }[];
}

export const projects: Project[] = [
  {
    id: 101,
    slug: 'designwithclaude',
    title: 'designwithclaude',
    description: 'An MCP server that audits design systems from inside Claude Code.',
    statLabel: '48 design specialists inside Claude Code',
    detail: {
      problem:
        'Claude Code will happily generate UI that breaks your design system. Contrast failures, token drift and off-grid spacing ship silently, and the review that would catch them lands too late.',
      chose:
        'Every finding cites its evidence: the token name, the computed contrast ratio, the off-grid value, the offending selector.',
      over: 'A severity label and a vague description, the way most linters do.',
      moreHref: '/decisions/dwic',
      moreLabel: 'Read the full decision record',
    },
    fullDescription: '',
    technologies: [],
    liveUrl: 'https://designwithclaude.com',
    githubUrl: '',
    images: [],
    featured: true,
    external: true,
    ctaLabel: 'Visit site',
    logo: { type: 'image', src: '/images/logos/dwic-icon.svg' },
    decisionsUrl: '/decisions/dwic',
    tagline: 'AI DESIGN TOOLING',
  },
  {
    id: 102,
    slug: 'aiex',
    title: 'AI UX Design Guide',
    description: 'A free, open library of AI UX patterns drawn from real products.',
    statLabel: '3,000+ designers using',
    detail: {
      problem:
        'Designers shipping AI features are still evaluating them with generic UX heuristics that were never written for AI. There is no fast way to check an AI interface against patterns specific to how AI actually behaves.',
      chose:
        'Free and no signup, with the audit as the front door: upload a screenshot of any AI interface and get it scored against 36 research-backed patterns.',
      over: 'An email gate, a Figma plugin install, or a paid cohort.',
    },
    fullDescription: '',
    technologies: [],
    liveUrl: 'https://aiuxdesign.guide',
    githubUrl: '',
    images: [],
    featured: true,
    external: true,
    ctaLabel: 'Visit site',
    logo: { type: 'image', src: '/images/logos/aiux-logo.svg' },
    tagline: 'AI UX PATTERNS',
  },
  {
    id: 103,
    slug: 'llmsgist',
    title: 'llmsgist.org',
    description:
      'I built llmsgist as a structured spec format for AI coding tools. .gist.design files give Claude, Cursor, and Copilot the design context they otherwise lack.',
    fullDescription: '',
    technologies: [],
    liveUrl: 'https://llmsgist.org',
    githubUrl: '',
    images: [],
    // Temporarily demoted: the third card slot now points at the projects index.
    featured: false,
    external: true,
    ctaLabel: 'Visit site',
    logo: { type: 'image', src: '/images/logos/llmsgist-icon.svg' },
    tagline: 'STRUCTURED DESIGN SPECS',
  },
  {
    id: 104,
    slug: 'projects',
    title: 'Case studies',
    description:
      'Four projects taken apart: the constraint I was designing against, the call I made, and what I would do differently now.',
    links: [
      { label: 'LessonLoom', href: '/casestudy/lessonloom' },
      { label: 'EduScheduler', href: '/casestudy/scheduler' },
      { label: 'Optum Bank', href: '/casestudy/uhg' },
      { label: 'dwic design decisions', href: '/decisions/dwic' },
    ],
    fullDescription: '',
    technologies: [],
    liveUrl: '/projects',
    githubUrl: '',
    images: [],
    featured: true,
    external: false,
    detail: {
      inside:
        'AI tooling at NewGlobe, enterprise healthcare at Optum, and the decision record behind dwic.',
    },
    ctaLabel: 'All case studies',
    logo: { type: 'icon', name: 'folder' },
    tagline: 'CASE STUDIES',
  },
  {
    id: 105,
    slug: 'writing',
    title: 'Writing',
    description: 'Thoughts on AI interfaces and what breaks in them, published in Design Bootcamp.',
    statLabel: '4,000+ readers',
    fullDescription: '',
    technologies: [],
    liveUrl: '/writing',
    githubUrl: '',
    images: [],
    featured: true,
    external: false,
    detail: {},
    links: [
      {
        label: 'AI is finally learning to shut up',
        href: 'https://medium.com/design-bootcamp/ai-is-finally-learning-to-shut-up-62af1d2c01c8',
      },
      {
        label: 'AI learned to shut up. It forgot to say what it was doing',
        href: 'https://medium.com/design-bootcamp/ai-learned-to-shut-up-it-forgot-to-say-what-it-was-doing-91df21ad2742',
      },
      {
        label: "AI can't see your design, so it guesses",
        href: 'https://medium.com/design-bootcamp/ai-cant-see-your-design-so-it-guesses-c50e3695f01a',
      },
      {
        label: 'Who is designing the boundary for AI?',
        href: 'https://medium.com/design-bootcamp/who-is-designing-the-boundary-for-ai-3a51b18b5fc7',
      },
      {
        label: 'The AI you use for design feedback is guessing',
        href: 'https://medium.com/design-bootcamp/the-ai-you-use-for-design-feedback-is-guessing-b4b9cfeaf7ee',
      },
      {
        label: 'Most AIUX is just search with extra steps?',
        href: 'https://medium.com/design-bootcamp/most-aiux-is-just-search-with-extra-steps-3faaae035ab8',
      },
    ],
    ctaLabel: 'All writing',
    logo: { type: 'icon', name: 'writing' },
    tagline: 'WRITING',
  },
  {
    id: 106,
    slug: 'contact',
    title: 'Get in touch',
    description: 'Open to senior product design and design engineering roles.',
    fullDescription: '',
    technologies: [],
    liveUrl: 'mailto:imranrizom@gmail.com',
    githubUrl: '',
    images: [],
    featured: true,
    external: true,
    ctaLabel: 'Email me',
    detail: {},
    links: [
      { label: 'GitHub', href: 'https://github.com/imsaif' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/imsaif/' },
      { label: 'Medium', href: 'https://medium.com/@imsaif' },
    ],
    logo: { type: 'icon', name: 'mail' },
    tagline: 'CONTACT',
  },
  {
    id: 3,
    slug: 'uhg',
    title: 'Optum Bank',
    description: 'Led HSA reimbursement platform redesign, achieving 27x improvement in task completion.',
    fullDescription: `
      As Lead UX Designer at UnitedHealth Group, I led the redesign of the HSA reimbursement system serving 450K users.
      The platform had a critical 1.1% task completion rate with 98.9% abandonment, causing significant support costs.
      Through comprehensive user research, cross-functional collaboration, and systematic design improvements, I delivered
      measurable business impact while navigating strict healthcare compliance requirements.

      Key Achievements:
      - Improved task completion from 1.1% to 30% (27x improvement)
      - Reduced customer service calls by 30% (saving $800K annually)
      - Increased mobile completion from 0.3% to 18% (60x improvement)
      - Reduced average completion time from 18 to 10 minutes
      - Led design team of 6, collaborated across engineering and compliance
      - Established healthcare UX patterns adopted across Optum products
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
    featured: false,
    tagline: 'ENTERPRISE UX, HEALTHCARE FINTECH',
    stats: [
      { label: 'Task Completion', value: '1.1% → 30%' },
      { label: 'Support Calls', value: '30% ↓' },
      { label: 'Mobile Completion', value: '0.3% → 18%' },
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
    featured: false,
    tagline: 'EDUTECH, PRODUCT DESIGN',
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
    featured: false,
    tagline: 'AI DESIGN, AUTOMATION',
    stats: [
      { label: 'Lessons Generated', value: '10,000+' },
      { label: 'Time Saved per Teacher', value: '6h/week' },
      { label: 'Adoption Rate', value: '92%' },
    ],
  },
  {
    id: 5,
    slug: 'cognition',
    title: 'Cognition: Conversational AI for Education Leaders',
    description:
      'An AI assistant that answers questions about national programme data \u2014 and declines everything else.',
    fullDescription: `
      Government education leaders sat on a rich daily dataset they could not interrogate, because
      the only way in was a BI tool that assumed analyst fluency. I designed and built Cognition as
      a conversational surface scoped strictly to programme data, where refusing out-of-scope
      questions is the product rather than a limitation. Shipped as a working prototype and an
      internal proposal; the client, country and programme are not named.
    `,
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand'],
    liveUrl: '',
    githubUrl: '',
    images: [
      '/images/casestudy/cognition/welcome.jpg',
      '/images/casestudy/cognition/refusal.jpg',
      '/images/casestudy/cognition/answer-table.jpg',
      '/images/casestudy/cognition/reasoning.jpg',
    ],
    featured: true,
    tagline: 'AI PRODUCT DESIGN, CONVERSATIONAL UX',
    statLabel: 'Designed and built end to end',
    detail: {
      problem:
        'Officials who answer to ministers could not interrogate their own programme data \u2014 the only interface assumed analyst fluency they did not have.',
      chose: 'An assistant scoped strictly to programme data, which declines out loud and says why',
      over: 'A capable general assistant that answers whatever it is asked',
    },
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

