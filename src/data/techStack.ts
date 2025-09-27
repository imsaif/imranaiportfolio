import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFigma,
  SiFramer,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiVercel,
  SiOpenai,
  SiAdobe,
  SiSketch,
  SiWebflow,
  SiNotion,
  SiMiro,
  SiJira
} from 'react-icons/si';
import { IconType } from 'react-icons';

export interface TechStackItem {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  bgColor: string;
  category: 'design' | 'frontend' | 'backend' | 'tools' | 'ai';
  proficiency: number; // 1-100
}

export const techStackData: TechStackItem[] = [
  // Design Tools
  {
    id: 'figma',
    name: 'Figma',
    icon: SiFigma,
    color: '#F24E1E',
    bgColor: 'rgba(242, 78, 30, 0.1)',
    category: 'design',
    proficiency: 95
  },
  {
    id: 'sketch',
    name: 'Sketch',
    icon: SiSketch,
    color: '#F7B500',
    bgColor: 'rgba(247, 181, 0, 0.1)',
    category: 'design',
    proficiency: 85
  },
  {
    id: 'adobe',
    name: 'Adobe Creative Suite',
    icon: SiAdobe,
    color: '#FF0000',
    bgColor: 'rgba(255, 0, 0, 0.1)',
    category: 'design',
    proficiency: 90
  },
  {
    id: 'framer',
    name: 'Framer',
    icon: SiFramer,
    color: '#0055FF',
    bgColor: 'rgba(0, 85, 255, 0.1)',
    category: 'design',
    proficiency: 88
  },
  {
    id: 'webflow',
    name: 'Webflow',
    icon: SiWebflow,
    color: '#4353FF',
    bgColor: 'rgba(67, 83, 255, 0.1)',
    category: 'design',
    proficiency: 75
  },

  // Frontend Technologies
  {
    id: 'react',
    name: 'React',
    icon: SiReact,
    color: '#61DAFB',
    bgColor: 'rgba(97, 218, 251, 0.1)',
    category: 'frontend',
    proficiency: 92
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: SiNextdotjs,
    color: '#000000',
    bgColor: 'rgba(0, 0, 0, 0.1)',
    category: 'frontend',
    proficiency: 88
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: SiTypescript,
    color: '#3178C6',
    bgColor: 'rgba(49, 120, 198, 0.1)',
    category: 'frontend',
    proficiency: 85
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: SiJavascript,
    color: '#F7DF1E',
    bgColor: 'rgba(247, 223, 30, 0.1)',
    category: 'frontend',
    proficiency: 95
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    color: '#06B6D4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    category: 'frontend',
    proficiency: 90
  },

  // Backend & Tools
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: SiNodedotjs,
    color: '#339933',
    bgColor: 'rgba(51, 153, 51, 0.1)',
    category: 'backend',
    proficiency: 80
  },
  {
    id: 'python',
    name: 'Python',
    icon: SiPython,
    color: '#3776AB',
    bgColor: 'rgba(55, 118, 171, 0.1)',
    category: 'backend',
    proficiency: 75
  },

  // AI & Other Tools
  {
    id: 'openai',
    name: 'OpenAI/GPT',
    icon: SiOpenai,
    color: '#412991',
    bgColor: 'rgba(65, 41, 145, 0.1)',
    category: 'ai',
    proficiency: 90
  },
  {
    id: 'git',
    name: 'Git',
    icon: SiGit,
    color: '#F05032',
    bgColor: 'rgba(240, 80, 50, 0.1)',
    category: 'tools',
    proficiency: 85
  },
  {
    id: 'vercel',
    name: 'Vercel',
    icon: SiVercel,
    color: '#000000',
    bgColor: 'rgba(0, 0, 0, 0.1)',
    category: 'tools',
    proficiency: 82
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: SiNotion,
    color: '#000000',
    bgColor: 'rgba(0, 0, 0, 0.1)',
    category: 'tools',
    proficiency: 88
  },
  {
    id: 'miro',
    name: 'Miro',
    icon: SiMiro,
    color: '#FFD02F',
    bgColor: 'rgba(255, 208, 47, 0.1)',
    category: 'design',
    proficiency: 85
  },
  {
    id: 'jira',
    name: 'Jira',
    icon: SiJira,
    color: '#0052CC',
    bgColor: 'rgba(0, 82, 204, 0.1)',
    category: 'tools',
    proficiency: 80
  }
];

// Get prominent tech stack items for the hero animation - organized for full circles
export const heroTechStack = techStackData.filter(tech =>
  ['figma', 'react', 'nextjs', 'typescript', 'javascript', 'tailwind', 'framer', 'nodejs', 'openai', 'adobe', 'python', 'sketch', 'git', 'vercel', 'notion', 'miro', 'webflow', 'jira'].includes(tech.id)
);