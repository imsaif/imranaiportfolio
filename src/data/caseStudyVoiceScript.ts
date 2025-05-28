/**
 * EduScheduler Case Study Voice Script
 * Structured data for section-by-section voice synthesis
 */

export interface VoiceScriptSection {
  text: string;
  characters: number;
  pauseAfter?: number; // milliseconds
  estimatedCost: number; // Based on ElevenLabs pricing
  elementId: string; // Element ID to scroll to
}

export interface VoiceScript {
  [key: string]: VoiceScriptSection;
}

export const eduSchedulerVoiceScript: VoiceScript = {
  introduction: {
    text: "Hi, I'm Imran. This is my EduScheduler case study - how I transformed manual school scheduling into an automated system that saves 85% of time. Feel free to ask questions anytime.",
    characters: 150,
    pauseAfter: 2000, // 2 seconds as marked in script
    estimatedCost: 0.045,
    elementId: 'overview',
  },

  problem: {
    text: 'NewGlobe Education had a major scheduling problem. Manual timetable creation took 2-3 weeks, contained 23% errors, and any change meant starting over completely. Staff spent 86% of time on data entry. Teacher utilization was only 68% optimal.',
    characters: 280,
    pauseAfter: 1000,
    estimatedCost: 0.084,
    elementId: 'challenge',
  },

  research: {
    text: "I conducted 12 stakeholder interviews, shadowed 5 days of scheduling work, and facilitated workshops to understand the pain points. Three key personas emerged: Anne, Academic Director: 'We spend more time creating timetables than reviewing quality.' Jake, Digital Production: 'Teacher changes mean recreating everything from scratch.' Laura, Schools Team: 'We need teachers teaching what they're qualified for.'",
    characters: 320,
    pauseAfter: 1000,
    estimatedCost: 0.096,
    elementId: 'user-research',
  },

  userPersonas: {
    text: 'Three key personas emerged from our research: Anne, the Academic Director who needs quality oversight; Jake from Digital Production who handles technical implementation; and Laura from the Schools Team who ensures proper teacher qualifications.',
    characters: 240,
    pauseAfter: 1000,
    estimatedCost: 0.072,
    elementId: 'user-personas',
  },

  solution: {
    text: 'I designed four core features: Automated timetable generation with conflict detection. Visual constraint builder for scheduling rules. Multiple viewing perspectives for different roles. Resource optimization including textbook sharing.',
    characters: 240,
    pauseAfter: 2000, // 2 seconds as marked in script
    estimatedCost: 0.072,
    elementId: 'design-process',
  },

  approach: {
    text: 'Three principles guided the design: Progressive disclosure - reveal complexity gradually. Contextual assistance - help exactly when needed. Adaptive interfaces - tailored to each user role.',
    characters: 180,
    pauseAfter: 1000,
    estimatedCost: 0.054,
    elementId: 'design-process',
  },

  impact: {
    text: "The results: 80% fewer scheduling errors, 85% time saved, 92% better teacher optimization, 12% cost reduction. 'EduScheduler revolutionized our academic scheduling, saving countless hours while producing better results.' - Director of Academic Programs",
    characters: 280,
    pauseAfter: 1000,
    estimatedCost: 0.084,
    elementId: 'conclusion',
  },

  quote: {
    text: "As our Director of Academic Programs said: 'EduScheduler revolutionized our academic scheduling, saving countless hours while producing better results.' This feedback validates the impact of thoughtful design.",
    characters: 200,
    pauseAfter: 1000,
    estimatedCost: 0.06,
    elementId: 'conclusion',
  },

  lessons: {
    text: "Most complex systems can be made simple through thoughtful information architecture and clear workflows. If I did this again, I'd involve users earlier and implement more phased rollouts.",
    characters: 160,
    pauseAfter: 1000,
    estimatedCost: 0.048,
    elementId: 'lessons',
  },

  conclusion: {
    text: 'As Lead Product Designer, I transformed a weeks-long manual process into an intuitive automated system that empowers administrators to create optimal schedules. What questions do you have about this project?',
    characters: 200,
    pauseAfter: 2000, // 2 seconds as marked in script
    estimatedCost: 0.06,
    elementId: 'conclusion',
  },
};

// Updated section order based on new timestamps
export const getSectionOrder = (): string[] => [
  'introduction',
  'problem',
  'research',
  'userPersonas',
  'solution',
  'approach',
  'impact',
  'quote',
  'lessons',
  'conclusion',
];

// Format section names for display
export const formatSectionName = (sectionKey: string): string => {
  const nameMap: { [key: string]: string } = {
    introduction: 'Introduction',
    problem: 'The Problem',
    research: 'Research',
    userPersonas: 'User Personas',
    solution: 'The Solution',
    approach: 'Design Approach',
    impact: 'Impact',
    quote: 'Quote',
    lessons: 'Key Lessons',
    conclusion: 'Conclusion',
  };
  return nameMap[sectionKey] || sectionKey;
};

// Calculate total script metrics
export const scriptMetrics = {
  totalSections: Object.keys(eduSchedulerVoiceScript).length,
  totalCharacters: Object.values(eduSchedulerVoiceScript).reduce((sum, section) => sum + section.characters, 0),
  totalEstimatedCost: Object.values(eduSchedulerVoiceScript).reduce((sum, section) => sum + section.estimatedCost, 0),
  averageSectionLength: Math.round(
    Object.values(eduSchedulerVoiceScript).reduce((sum, section) => sum + section.characters, 0) /
      Object.keys(eduSchedulerVoiceScript).length
  ),
};
