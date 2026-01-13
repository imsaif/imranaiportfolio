'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { MdPerson, MdWork, MdSchool, MdRecommend, MdStars } from 'react-icons/md';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import ProgressBar from '@/components/ui/ProgressBar';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

// Import section components
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSkillsSection } from './sections/EducationSkillsSection';
import { RecommendationsSection } from './sections/RecommendationsSection';
import { PublicationsAwardsSection } from './sections/PublicationsAwardsSection';

// Material Design icons with accessible grey styling for sticky navigation
const AboutIcon = (
  <MdPerson
    size={28}
    className="inline-block align-middle text-gray-600"
  />
);

const ExperienceIcon = (
  <MdWork
    size={28}
    className="inline-block align-middle text-gray-600"
  />
);

const EducationIcon = (
  <MdSchool
    size={28}
    className="inline-block align-middle text-gray-600"
  />
);

const RecommendationsIcon = (
  <MdRecommend
    size={28}
    className="inline-block align-middle text-gray-600"
  />
);

const AwardsIcon = (
  <MdStars
    size={28}
    className="inline-block align-middle text-gray-600"
  />
);

const ResumePage = () => {
  // Scroll progress state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sticky section title logic
  const [currentSection, setCurrentSection] = useState<
    'about' | 'experience' | 'education' | 'recommendations' | 'awards'
  >('about');

  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const recommendationsRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Update current section
      const experienceTop = experienceRef.current?.getBoundingClientRect().top ?? 0;
      const educationTop = educationRef.current?.getBoundingClientRect().top ?? 0;
      const recommendationsTop = recommendationsRef.current?.getBoundingClientRect().top ?? 0;
      const awardsTop = awardsRef.current?.getBoundingClientRect().top ?? 0;

      if (awardsTop <= 150) {
        setCurrentSection('awards');
      } else if (recommendationsTop <= 150) {
        setCurrentSection('recommendations');
      } else if (educationTop <= 150) {
        setCurrentSection('education');
      } else if (experienceTop <= 150) {
        setCurrentSection('experience');
      } else {
        setCurrentSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resumeData = {
    about: `Senior product designer and team leader at NewGlobe, leading cross-functional teams in AI-powered educational experiences that transform learning outcomes for millions worldwide. With 8+ years of experience, I've evolved from individual contributor to design leader, mentoring teams and establishing scalable design systems.

My approach combines strategic design thinking with hands-on mentorship, fostering innovation at the intersection of AI and human-centered design. With psychology expertise and advanced design education from IIT, I guide teams in creating experiences that understand human behavior and deliver meaningful impact at scale.`,
    experience: [
      {
        title: 'Senior Product Designer',
        company: 'NewGlobe',
        duration: 'Feb 2023 - Present · 2 yrs 10 mos',
        location: 'Hyderabad, Telangana, India · On-site',
        description: 'Leading cross-functional design teams to create AI-powered educational products reaching millions of children across Africa and Asia. Contributing to learning outcomes validated by Nobel Prize-winning economist Michael Kremer as among the largest gains ever measured in international education.',
        skills: ['Team Leadership', 'Design Mentorship', 'Generative AI', 'AI Strategy', 'Product Design', 'UX Research', 'Cross-functional Leadership', 'Strategic Planning'],
      },
      {
        title: 'UX Designer',
        company: 'Optum',
        duration: 'Jun 2017 - Jan 2023 · 5 yrs 8 mos',
        location: 'Chennai, Tamil Nadu, India',
        description: 'Led design initiatives for healthcare analytics products, mentoring junior designers and collaborating across teams.',
        skills: [
          'Team Collaboration Leadership',
          'Design Mentorship',
          'Stakeholder Management',
          'Design System Governance',
          'User Interface Design',
          'UX Research',
          'Data Visualization',
          'Analytical Skills',
          'Prototyping',
          'User Testing',
        ],
      },
      {
        title: 'UX Designer',
        company: 'Freelance',
        duration: 'Jan 2015 - May 2017 · 2 yrs 5 mos',
        location: 'New Delhi, Istanbul, Amsterdam',
        description: 'Led design projects for multiple startups, managing remote teams and coordinating with international clients.',
        skills: ['Client Leadership', 'Project Leadership', 'Remote Team Management', 'Product Management', 'Project Management', 'UI Design', 'UX Design', 'Client Coordination'],
      },
      {
        title: 'Team Lead - Usability Analyst - Contract',
        company: 'Google',
        duration: 'Sep 2013 - Dec 2014 · 1 yr 4 mos',
        location: 'Hyderabad Area, India',
        description: 'Led a team of 15 full-time employees conducting usability reviews for Google News and Google Maps, driving strategic improvements.',
        skills: ['Team Management', 'Performance Management', 'Strategic Planning', 'Process Optimization', 'Usability Testing', 'Team Leadership', 'Google News', 'Google Maps', 'Reporting'],
      },
      {
        title: 'Usability Analyst - Contract',
        company: 'Google',
        duration: 'Jun 2011 - Aug 2013 · 2 yrs 3 mos',
        location: 'Hyderabad',
        description: 'Conducted comprehensive usability reviews for Google News, collaborating with product teams to enhance user experience.',
        skills: ['Usability Testing', 'Product Collaboration', 'Quality Assurance', 'Google News', 'Analysis'],
      },
    ],
    education: [
      {
        institution: 'Indian Institute of Technology Hyderabad',
        degree: 'Post Graduate Program in Visual & User Experience Design',
        field: 'Design and Applied Arts',
        duration: 'Jun 2022 - Dec 2022',
        skills: ['Design Systems', 'Digital Storytelling', 'Design Thinking', 'Visual Design', 'User Experience (UX)'],
      },
      {
        institution: 'Acharya Nagarjuna University',
        degree: 'Master of Science - MSc',
        field: 'Psychology',
        duration: '2010 - 2012',
      },
    ],
    licensesCertifications: [
      {
        name: 'Product-Led Growth Certified',
        issuer: 'ProductLed',
        date: 'Mar 2024',
        id: '41671',
        skills: ['Product Management', 'Product Development'],
      },
      { name: 'Generative AI Fundamentals', issuer: 'Google', date: 'Jan 2024', id: '7759676' },
      { name: 'Introduction to Large Language Models', issuer: 'Google', date: 'Jan 2024', id: '7754338' },
      { name: 'Introduction to Responsible AI', issuer: 'Google', date: 'Jan 2024', id: '7757145' },
      {
        name: 'Design Thinking - Scored 99%',
        issuer: 'IxDF - The Interaction Design Foundation',
        date: 'Dec 2018',
        id: '24696',
      },
      {
        name: 'Human Computer Interaction - Scored 89%',
        issuer: 'IxDF - The Interaction Design Foundation',
        date: 'Mar 2018',
        id: '24696',
      },
      {
        name: 'Gestalt Psychology & Web Design - Scored 99%',
        issuer: 'IxDF - The Interaction Design Foundation',
        date: 'Sep 2017',
        id: '24696',
      },
      {
        name: 'UX Design From Scratch - Scored 98%',
        issuer: 'IxDF - The Interaction Design Foundation',
        date: 'Sep 2017',
        id: '24696',
      },
    ],
    skills: [
      'Team Leadership',
      'Design Mentorship',
      'Strategic Planning',
      'Cross-functional Leadership',
      'Stakeholder Management',
      'User Experience (UX)',
      'User Interface (UI) Design',
      'Product Design',
      'UX Research',
      'Generative AI',
      'AI Strategy',
      'AI Prompt Engineering',
      'Responsible AI',
      'AI Ethics',
      'Data Visualization',
      'Analytical Skills',
      'Prototyping',
      'User Testing',
      'Usability Testing',
      'Design Systems',
      'Visual Design',
      'Design Thinking',
      'Human Computer Interaction (HCI)',
      'Product Management',
      'Product Development',
      'Project Management',
      'Performance Management',
      'Remote Team Management',
      'Collaboration',
    ],
    publications: [
      {
        role: 'Review Team Member',
        title: `Beyond Vibe Coding: From Coder to AI-Era Developer`,
        date: 'August 2025',
        description: `I was honored to be part of the review team for this groundbreaking book by Addy Osmani. Beyond Vibe Coding explores how AI-powered coding assistants are transforming software development, shifting focus from traditional code-writing to an "intent-driven workflow" where developers describe goals in natural language and collaborate with AI models to generate solutions.

The book covers essential topics including techniques for reviewing and validating AI-generated code, practical strategies for integrating AI into development workflows, multiagent coding systems, security and ethical considerations, and preparing careers for AI's expanding role in engineering. This resource is invaluable for developers, tech leads, and organizations seeking to leverage AI tools effectively while maintaining code quality and reliability.`,
      },
      {
        role: 'Book Reviewer/Critic',
        title: `Observing User Experience : A Practitioner's Guide to User Research`,
        date: 'Apr 11, 2017',
        description: `I was honored to be invited by Elsevir Research to act as a critic/reviewer for the book. The aim was to review the book completely and provide detailed insights from a readers perspective, market and updated technologies.

Observing the User Experience: A Practitioner's Guide to User Research aims to bridge the gap between what digital companies think they know about their users and the actual user experience. Individuals engaged in digital product and service development often fail to conduct user research. The book presents concepts and techniques to provide an understanding of how people experience products and services. The techniques are drawn from the worlds of human-computer interaction, marketing, and social sciences.`,
      },
    ],
    recommendations: [
      {
        author: 'Kasia Rzezniczak',
        title: 'Senior Director of Product Management | Product Leader | Tech for Good',
        date: 'April 13, 2025',
        context: 'Kasia managed Imran directly',
        text: `I had the pleasure of working with Imran for over two years at NewGlobe, where he was a key member of my team. Imran is an incredibly talented and versatile experience designer — someone who consistently delivers both strategic value and thoughtful, user-first design.

He led the redesign of several core applications, transforming them from outdated legacy tools into intuitive, beautifully crafted products that put users at the center. What sets Imran apart is not just his creative vision, but his ability to balance user needs with business goals — always mindful, always intentional.

Beyond his design work, Imran contributes immense value to the wider organisation. He shares best practices generously, mentors colleagues with empathy, and elevates team culture through his insight and initiative.

He's one of those rare individuals who is both a deep thinker and a reliable doer — a consistent force for innovation, quality, and integrity. I would wholeheartedly recommend Imran to any organisation looking for a smart, skilled, and genuinely collaborative design leader.`,
      },
      {
        author: 'Soorya Ramesh',
        title: 'Azure AI, Sr PM @ Microsoft',
        date: 'August 19, 2018',
        context: 'Soorya worked with Imran on the same team',
        text: `Working with Imran Saif has been a pleasure. He comes up with creative and innovative designs that give unprecedented clarity to the product. Imran Saif's work ethic combined with his creativity and attention to detail lead to great user experiences. He is a great team player, he even gave us a lot of insight on UX and the theory behind it. Any team would be lucky to have him drive their product's UX.`,
      },
      {
        author: 'Naveenraj Rajasekaran',
        title: 'Sr. Manager at EXL Health',
        date: 'November 21, 2017',
        context: 'Naveenraj managed Imran directly',
        text: `Imran Saif is extremely passionate about user experience. He strives to think from a different perspective unlike developers and product owners. What is interesting about him is the way he wants to make things simpler for users. It is fun to work with him, he makes sure that he drives users perspective in every product or developer meeting.`,
      },
    ],
    honorsAwards: [
      {
        title: 'Award of Excellent Performance & Compassion - Optum Analytics',
        issuer: 'United Health Group',
        date: 'Dec 2018',
        description: `Be it interaction design, production design, visual design, product analytics or Toastmasters...Saif is not only forthcoming in taking up variety in execution but also executes them with absolute passion & dedication - all with minimal assistance. Few notable examples: Interaction/ Visual design: Worked on interactions and visuals by analyzing the capabilities and limitations of the Django framework. Product analytics: Volunteered to independently steer product analytics effort Production design: Catering to ad-hoc logo requests from members with high-quality Toastmasters: Elected as Vice President of Public Relations for the ABCO Chennai Club Thank you Saif for your flexibility and compassion!`,
        associatedWith: 'Optum',
      },
      {
        title: 'Award of Excellent Performance & Collaboration - Optum Analytics',
        issuer: 'United Health Group',
        date: 'Nov 2018',
        description: `In one of our flagship products Saif was involved recently with providing necessary visual guidance for the development team overseas. Saif had collaborated with the Product Manager in gathering the necessary requirements and with minimal guidance got up and running with things that were necessary to accomplish his tasks. He had not only turned over the requests on time but also went to additional lengths to analyze and identify additional visual improvements which were not originally in the ask. When he was asked to take additional requests which were important for the product he showed his genuine willingness to accept them in the right spirit and executed them on time with good quality and lesser hand-holding. I'd like Saif to preserve his quality of collaboration with people he has not worked with in the past and quickly getting them to like him and his openness.`,
        associatedWith: 'Optum',
      },
      {
        title: 'Top 10% of the Class - Gestalt Psychology & Web',
        issuer: 'Interaction Design Foundation',
        date: 'Jun 2018',
        description: 'Awarded as the top 10% in class',
      },
      {
        title: 'Best Volunteer',
        issuer: 'SAFA',
        date: 'Apr 2013',
      },
      {
        title: 'Award for Exceptional Performance - Google',
        issuer: 'Google India',
        date: 'Apr 2012',
        associatedWith: 'Google',
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ProgressBar progress={scrollProgress} />

      {/* Minimal Hero Section */}
      <header className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Visual Element - Overlapping Circles */}
            <div className="flex mb-8">
              <div className="relative flex items-center">
                <motion.div
                  className="w-16 h-16 rounded-full relative z-50 overflow-hidden border-2 border-blue-600"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                >
                  <Image
                    src="/images/profile/avatar.jpg"
                    alt="Imran Mohammed"
                    fill
                    className="object-cover rounded-full"
                  />
                </motion.div>
                <motion.div
                  className="w-16 h-16 bg-blue-500 rounded-full -ml-4 relative z-40"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                ></motion.div>
                <motion.div
                  className="w-16 h-16 bg-blue-400 rounded-full -ml-4 relative z-30"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                ></motion.div>
                <motion.div
                  className="w-16 h-16 bg-blue-300 rounded-full -ml-4 relative z-20"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                ></motion.div>
                <motion.div
                  className="w-16 h-16 bg-blue-200 rounded-full -ml-4 relative z-10"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                ></motion.div>
                <motion.div
                  className="w-16 h-16 bg-blue-100 rounded-full -ml-4 relative z-0"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Shaping how<br />
              millions learn.
            </motion.h1>

            {/* Description */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
                My design journey began with content review and spotting usability errors, which sparked a deep curiosity about why users struggle and how experiences could be better. This led me to teach myself UX design, eventually spending years crafting healthcare experiences before transitioning to product design in education at NewGlobe—where I now design AI-powered learning tools reaching millions of children across Africa and Asia. Each chapter has sharpened my ability to merge strategic thinking with human-centered design, always focusing on solutions that drive meaningful impact at scale.
              </p>
            </motion.div>

            {/* Simple Links */}
            <motion.div
              className="flex space-x-8 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <a
                href="https://www.linkedin.com/in/imsaif/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/imsaif"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://medium.com/@imsaif"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Medium
              </a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main content sections with sticky navigation */}
        <section className="relative flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Sticky Title */}
          <div className="lg:sticky lg:top-24 h-fit w-full lg:min-w-[280px] lg:w-[280px] flex flex-col justify-start items-start lg:pr-6 py-4 lg:py-8">
            <AnimatePresence mode="wait">
              <CaseStudyHeader
                level="h2"
                showGradientLine
                className="flex items-center gap-3 mb-4"
                key={currentSection}
              >
                {currentSection === 'about' && (
                  <>
                    {AboutIcon}
                    <span>About</span>
                  </>
                )}
                {currentSection === 'experience' && (
                  <>
                    {ExperienceIcon}
                    <span>Experience</span>
                  </>
                )}
                {currentSection === 'education' && (
                  <>
                    {EducationIcon}
                    <span>Education</span>
                  </>
                )}
                {currentSection === 'recommendations' && (
                  <>
                    {RecommendationsIcon}
                    <span>Reviews</span>
                  </>
                )}
                {currentSection === 'awards' && (
                  <>
                    {AwardsIcon}
                    <span>Awards</span>
                  </>
                )}
              </CaseStudyHeader>
            </AnimatePresence>
          </div>

          {/* Content sections */}
          <div className="flex-1 w-full lg:pl-0">
            <div className="flex flex-col gap-8 max-w-none">
              <div ref={aboutRef} id="about" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <AboutSection about={resumeData.about} />
              </div>

              <div ref={experienceRef} id="experience" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <ExperienceSection experience={resumeData.experience} />
              </div>

              <div ref={educationRef} id="education" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <EducationSkillsSection
                  education={resumeData.education}
                  skills={resumeData.skills}
                />
              </div>

              <div ref={recommendationsRef} id="recommendations" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <RecommendationsSection recommendations={resumeData.recommendations} />
              </div>

              <div ref={awardsRef} id="awards" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <PublicationsAwardsSection
                  publications={resumeData.publications}
                  awards={resumeData.honorsAwards}
                  certifications={resumeData.licensesCertifications}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Download Resume Button */}
        <div className="text-center mb-16 mt-16">
          <a
            href="https://drive.google.com/file/d/1dn0zJB2FjcgdidSu9Yd-k4vyPUVNX00T/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group focus:outline-none"
            tabIndex={0}
            aria-label="Download Resume (opens in new tab)"
          >
            <span className="inline-flex rounded-xl bg-gradient-to-r from-accent to-tertiary p-[1.5px] transition-all duration-300">
              <span className="flex items-center justify-center w-full h-full px-8 py-3 bg-white rounded-xl text-black font-bold text-base tracking-wide transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-tertiary group-hover:text-white">
                DOWNLOAD CV
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transition-colors duration-300 group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 7h5m0 0v5m0-5L10 19" />
                </svg>
              </span>
            </span>
          </a>
        </div>
      </main>

      <ScrollToTopButton targetId="about" />
    </div>
  );
};

export default ResumePage;