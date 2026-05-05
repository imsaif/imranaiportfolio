import type { Metadata } from 'next';

import { AboutSection } from './sections/AboutSection';
import { EducationSkillsSection } from './sections/EducationSkillsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { PublicationsAwardsSection } from './sections/PublicationsAwardsSection';
import { RecommendationsSection } from './sections/RecommendationsSection';

export const metadata: Metadata = {
  title: 'Resume — Imran Mohammed',
  description:
    'Senior product designer at NewGlobe. 8+ years across AI, edtech, healthcare, and Google. Designs that reach millions.',
};

const resumeData = {
  about: `Senior product designer at NewGlobe, leading AI-powered learning experiences that reach millions of children across Africa and Asia. 8+ years across edtech, healthcare, and Google. I work at the intersection of AI and human-centered design — turning model output into interfaces people trust.`,
  experience: [
    {
      title: 'Senior Product Designer',
      company: 'NewGlobe',
      duration: '2023 – Present',
      location: 'Hyderabad',
      description:
        'Leading design for AI-powered learning products reaching millions of children. Outcomes validated by Nobel laureate Michael Kremer as among the largest measured in international education.',
    },
    {
      title: 'UX Designer',
      company: 'Optum (UnitedHealth Group)',
      duration: '2017 – 2023',
      location: 'Chennai',
      description: 'Led design for healthcare analytics products and governed the design system across squads.',
    },
    {
      title: 'UX Designer (Freelance)',
      company: 'Independent',
      duration: '2015 – 2017',
      location: 'Delhi · Istanbul · Amsterdam',
      description: 'Designed product experiences for early-stage startups across three continents.',
    },
    {
      title: 'Usability Lead (Contract)',
      company: 'Google',
      duration: '2011 – 2014',
      location: 'Hyderabad',
      description: 'Led a 15-person usability team conducting reviews for Google News and Google Maps.',
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
    'Product Design',
    'AI Strategy',
    'Generative AI',
    'Design Systems',
    'UX Research',
    'Design Leadership',
    'Prototyping',
    'Data Visualization',
    'Stakeholder Management',
    'Strategic Planning',
    'Design Mentorship',
    'Visual Design',
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
    { title: 'Top 10% — Gestalt Psychology & Web', issuer: 'Interaction Design Foundation', date: '2018' },
    { title: 'Exceptional Performance', issuer: 'Google India', date: '2012' },
  ],
};

const ResumePage = () => {
  return (
    <div className="bg-background-primary min-h-screen">
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 bg-background-grain">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent-primary font-medium text-sm uppercase tracking-wide mb-4">Resume</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight mb-6">
            Shaping how millions learn.
          </h1>
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl">
            My journey began with content review and spotting usability errors, which sparked a curiosity
            about why users struggle and how experiences could be better. I taught myself UX design, spent
            years on healthcare experiences at Optum, and now design AI-powered learning tools at NewGlobe
            reaching millions of children across Africa and Asia.
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
            href="https://drive.google.com/file/d/1dn0zJB2FjcgdidSu9Yd-k4vyPUVNX00T/view"
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
