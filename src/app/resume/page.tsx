'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
        description: 'Leading cross-functional design teams to create AI-powered educational products that transform learning outcomes.',
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
    <div className="bg-white min-h-screen">
      <ProgressBar progress={scrollProgress} />

      {/* Header section */}
      <header className="text-left pt-12 pb-12 md:pt-20 md:pb-20 relative overflow-visible container mx-auto px-4 md:px-6 lg:px-8">
        <motion.h1
          className="
            text-4xl sm:text-5xl md:text-6xl font-bold
            text-transparent bg-clip-text
            animate-gradient-text relative z-10
          "
          style={{
            backgroundImage: 'linear-gradient(90deg, var(--accent), var(--tertiary), var(--accent))',
            backgroundSize: '200% auto',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Imran Mohammed
        </motion.h1>

        {/* Bio Section */}
        <motion.div
          className="max-w-xl mt-6 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-left space-y-3">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Driven by a fascination with how systems work, I began my journey in frontend engineering before discovering my true calling: crafting experiences that resonate with users. This led me to transition into design, where I've since partnered with diverse teams across multiple sectors on digital platforms and mobile experiences. Each collaboration has strengthened my ability to merge strategic thinking with creative execution, always focusing on solutions that are both seamless and meaningful.
            </p>
          </div>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          className="max-w-xl mt-6 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50 relative">
            {/* Quote icon */}
            <div className="absolute -top-1.5 left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>

            <div className="text-left pt-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed mb-3">
                "Imran is an incredibly talented and versatile experience designer who consistently delivers both strategic value and thoughtful, user-first design. Beyond his creative vision, he's an exceptional leader who mentors colleagues with empathy and elevates team culture through his insight and initiative."
              </p>

              <div className="flex items-baseline">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">— Kasia Rzezniczak</span>
                <span className="text-xs text-gray-500 dark:text-gray-500 ml-2">Senior Director of Product Management</span>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        {/* Main content sections with sticky navigation */}
        <section className="relative flex flex-row items-start gap-0 mb-20 min-h-[500px]">
          {/* Sticky Title */}
          <div className="sticky left-0 top-24 h-fit min-w-[300px] w-[300px] max-w-md flex flex-col justify-start items-start pr-4 py-8 bg-gradient-to-b from-white/90 to-white/60 z-10">
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
          <div className="flex-1 pl-0 pr-4">
            <div className="flex flex-col gap-8 max-w-5xl">
              <div ref={aboutRef} id="about">
                <AboutSection about={resumeData.about} />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-70" />

              <div ref={experienceRef} id="experience">
                <ExperienceSection experience={resumeData.experience} />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-70" />

              <div ref={educationRef} id="education">
                <EducationSkillsSection
                  education={resumeData.education}
                  skills={resumeData.skills}
                />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-70" />

              <div ref={recommendationsRef} id="recommendations">
                <RecommendationsSection recommendations={resumeData.recommendations} />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-70" />

              <div ref={awardsRef} id="awards">
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
        <div className="text-center mb-16">
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