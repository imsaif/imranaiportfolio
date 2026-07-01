import type { Metadata } from 'next';

import { AboutSection } from './sections/AboutSection';
import { EducationSkillsSection } from './sections/EducationSkillsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { PublicationsAwardsSection } from './sections/PublicationsAwardsSection';
import { RecommendationsSection } from './sections/RecommendationsSection';

export const metadata: Metadata = {
  title: 'Resume | Imran Mohammed',
  description:
    'Senior AI product designer and design engineer. 10+ years across AI, edtech, healthcare, and Google. Founder of aiuxdesign.guide. Ships production React, TypeScript, and Tailwind.',
  alternates: { canonical: '/resume' },
};

const resumeData = {
  about: `Senior product designer with 10+ years working at the intersection of software and human behavior. A designer who ships production code (React, TypeScript, Tailwind). I founded aiuxdesign.guide, a free AI-UX audit tool used by 3,000+ designers monthly and cited by Claude and Perplexity. Previously embedded with Google News, led enterprise UX at UnitedHealth Group for 5+ years, and now design AI tools impacting 10,000+ schools at NewGlobe.`,
  projects: [
    {
      name: 'aiuxdesign.guide',
      role: 'AI-UX audit tool · founder, built end-to-end',
      url: 'https://aiuxdesign.guide',
      description:
        'Upload any AI-interface screenshot and get instant feedback scored against 36 patterns drawn from 50+ shipped products including Claude, Copilot, and Notion. 3,000+ monthly users, referenced by Claude and Perplexity, 300+ daily newsletter subscribers. Designed and shipped end-to-end in Next.js, React, TypeScript, and Tailwind with Postgres/Prisma, including evidence-first grading and evals.',
    },
    {
      name: 'dwic · designwithclaude.com',
      role: 'MCP server for design systems',
      url: 'https://designwithclaude.com',
      description:
        'An MCP server that audits your design system from inside Claude Code, catching contrast failures, token drift, and pattern misuse before they ship.',
    },
  ],
  experience: [
    {
      title: 'Senior Product Designer',
      company: 'NewGlobe',
      duration: 'Feb 2023 – Present',
      location: 'Hyderabad',
      description:
        'Led AI product design for an edtech platform deployed across 10,000+ schools and government programs. Designed core tools for teachers and school heads powering daily instructional workflows.',
    },
    {
      title: 'UX Designer',
      company: 'Optum (UnitedHealth Group)',
      duration: 'Jun 2017 – Jan 2023',
      location: 'Chennai · Hyderabad',
      description:
        'Designed Optum Bank, a healthcare financial product serving patients and enterprise clients. Resolved billing experience issues, improving clarity for patients navigating healthcare payments.',
    },
    {
      title: 'UX Designer (Consultant)',
      company: 'Independent',
      duration: 'Jan 2015 – May 2017',
      location: 'Remote',
      description:
        'Worked remotely and on-site with startups across India, the US, and Europe, coordinating closely with developers and product managers.',
    },
    {
      title: 'Usability Analyst Lead',
      company: 'Google',
      duration: 'Jun 2011 – Dec 2014',
      location: 'Hyderabad',
      description:
        "Embedded with the Google News team in Hyderabad, identifying and resolving UX issues. Collaborated with Google India's product and engineering teams on continuous product improvement.",
    },
  ],
  education: [
    {
      institution: 'Indian Institute of Technology Hyderabad',
      degree: 'Post Graduate Program, Visual & User Experience Design',
      duration: '2022',
    },
    {
      institution: 'Acharya Nagarjuna University',
      degree: 'M.Sc., Psychology',
      duration: '2010 – 2012',
    },
  ],
  licensesCertifications: [
    { name: 'Product-Led Growth Certified', issuer: 'ProductLed', date: '2024' },
    { name: 'Generative AI Fundamentals', issuer: 'Google', date: '2024' },
    { name: 'Large Language Models', issuer: 'Google', date: '2024' },
    { name: 'Responsible AI', issuer: 'Google', date: '2024' },
    { name: 'Design Thinking', issuer: 'Interaction Design Foundation', date: '2018' },
    { name: 'Human Computer Interaction', issuer: 'Interaction Design Foundation', date: '2018' },
  ],
  skills: [
    {
      category: 'Design',
      items: ['Figma', 'Design Systems', 'Design Tokens', 'Prototyping', 'Evals for AI UX'],
    },
    {
      category: 'Engineering',
      items: ['React', 'TypeScript', 'Tailwind', 'HTML / CSS', 'Next.js', 'MCP Servers'],
    },
    {
      category: 'AI Tools',
      items: ['Claude Code', 'Cursor', 'Gemini', 'Bolt', 'GitHub'],
    },
  ],
  publications: [
    {
      role: 'Review team',
      title: 'Beyond Vibe Coding: From Coder to AI-Era Developer (Addy Osmani)',
      date: '2025',
    },
    {
      role: 'Reviewer',
      title: "Observing User Experience: A Practitioner's Guide to User Research (Elsevier)",
      date: '2017',
    },
  ],
  recommendations: [
    {
      author: 'Kasia Rzezniczak',
      title: 'Senior Director of Product Management, NewGlobe',
      date: '2025',
      context: 'managed Imran directly',
      text: 'Imran is an incredibly talented and versatile experience designer who consistently delivers both strategic value and thoughtful, user-first design. He led the redesign of several core applications and contributes immense value to the wider organisation through mentorship and culture.',
    },
    {
      author: 'Soorya Ramesh',
      title: 'Sr PM, Azure AI @ Microsoft',
      date: '2018',
      context: 'worked on the same team',
      text: "Imran comes up with creative, innovative designs that give unprecedented clarity to the product. His work ethic, attention to detail, and grasp of UX theory lead to great experiences. Any team would be lucky to have him drive their product's UX.",
    },
  ],
  honorsAwards: [
    { title: 'Excellent Performance & Compassion', issuer: 'UnitedHealth Group / Optum', date: '2018' },
    { title: 'Excellent Performance & Collaboration', issuer: 'UnitedHealth Group / Optum', date: '2018' },
    { title: 'Top 10%: Gestalt Psychology & Web', issuer: 'Interaction Design Foundation', date: '2018' },
    { title: 'Exceptional Performance', issuer: 'Google India', date: '2012' },
  ],
};

const ResumePage = () => {
  return (
    <div className="bg-background-primary min-h-screen">
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 bg-background-grain">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent-primary font-medium text-sm uppercase tracking-wide mb-4">
            Senior AI Product Designer · Design Engineer
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight mb-6">
            A designer who ships.
          </h1>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl">
            10+ years at the intersection of software and human behavior, and I write the production code, not
            just the specs. I founded aiuxdesign.guide, a free AI-UX audit tool used by 3,000+ designers a month
            and cited by Claude and Perplexity. Today I design AI tools reaching 10,000+ schools at NewGlobe.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href="https://www.linkedin.com/in/imsaif/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/imsaif"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://medium.com/@imsaif"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Medium
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-20">
        <section id="about">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6">About</h2>
          <AboutSection about={resumeData.about} />
        </section>

        <section id="projects">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6">Projects</h2>
          <ProjectsSection projects={resumeData.projects} />
        </section>

        <section id="experience">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6">Experience</h2>
          <ExperienceSection experience={resumeData.experience} />
        </section>

        <section id="education">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6">Education &amp; Skills</h2>
          <EducationSkillsSection education={resumeData.education} skills={resumeData.skills} />
        </section>

        <section id="recommendations">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6">Recommendations</h2>
          <RecommendationsSection recommendations={resumeData.recommendations} />
        </section>

        <section id="awards">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6">Awards &amp; Publications</h2>
          <PublicationsAwardsSection
            publications={resumeData.publications}
            awards={resumeData.honorsAwards}
            certifications={resumeData.licensesCertifications}
          />
        </section>

        <div className="pt-4">
          <a
            href="https://drive.google.com/file/d/1CxHYGdt-W4EpVltOkpFRRiitFIAa8lQl/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-primary text-white font-medium hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
            aria-label="Download Resume (opens in new tab)"
          >
            Download CV
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 7h5m0 0v5m0-5L10 19" />
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
};

export default ResumePage;
