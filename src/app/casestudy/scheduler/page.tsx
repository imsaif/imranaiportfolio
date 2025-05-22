'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { FloatingNavBar, sections } from './FloatingNavBar';
import InteractivePrototype from './InteractivePrototype';
import { ChallengeSection } from './sections/ChallengeSection';
import { IntroductionSection } from './sections/IntroductionSection';
import { ProjectOverviewSection } from './sections/ProjectOverviewSection';
import UserPersonasSection from './sections/UserPersonasSectionNEW';
import { UserResearchSection } from './sections/UserResearchSection';
import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import UserJourneyMapInteractive from '@/components/case-studies/UserJourneyMapInteractive';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

// Edit (pencil) icon for Design Process section title with gradient stroke
const DesignProcessIcon = (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block align-middle" aria-hidden="true">
    <defs>
      <linearGradient id="designprocess-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EC4899" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    <path
      d="M16.862 5.487l1.65-1.65a2.121 2.121 0 113 3l-1.65 1.65m-2-2l-9.193 9.193a2 2 0 00-.497.88l-1.01 3.366a.5.5 0 00.62.62l3.366-1.01a2 2 0 00.88-.497l9.193-9.193m-2-2l2 2"
      stroke="url(#designprocess-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default function Page() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // Sticky section title logic with Intersection Observer for four sections
  const [currentSection, setCurrentSection] = useState<
    'overview' | 'challenge' | 'userresearch' | 'userpersonas' | 'designprocess'
  >('overview');
  const overviewRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const userResearchRef = useRef<HTMLDivElement>(null);
  const userPersonasRef = useRef<HTMLDivElement>(null);
  const designProcessRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const overviewTop = overviewRef.current?.getBoundingClientRect().top ?? 0;
      const challengeTop = challengeRef.current?.getBoundingClientRect().top ?? 0;
      const userResearchTop = userResearchRef.current?.getBoundingClientRect().top ?? 0;
      const userPersonasTop = userPersonasRef.current?.getBoundingClientRect().top ?? 0;
      const designProcessTop = designProcessRef.current?.getBoundingClientRect().top ?? 0;
      if (designProcessTop <= 150) {
        setCurrentSection('designprocess');
      } else if (userPersonasTop <= 150) {
        setCurrentSection('userpersonas');
      } else if (userResearchTop <= 150) {
        setCurrentSection('userresearch');
      } else if (challengeTop <= 150) {
        setCurrentSection('challenge');
      } else {
        setCurrentSection('overview');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Header section */}
      <header className="bg-white py-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          {/* Removed: <Link href="/" className="text-purple-600 font-medium text-xl">Imran Mohammed</Link> */}
        </div>
      </header>

      {/* Hero image in its own container */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full relative"
        >
          <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
            <Image
              src="/images/casestudy/scheduler/teacherafri1.png"
              alt="EduScheduler: Intelligent Academic Planning System"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
          </div>
        </motion.div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <CaseStudyHeader level="h1">EduScheduler: Intelligent Academic Planning System</CaseStudyHeader>
        <IntroductionSection />
        {/* Vertically stacked sections with sticky dynamic title for four sections */}
        <section className="relative flex flex-row items-start gap-0 mb-20 min-h-[500px]">
          {/* Sticky Title */}
          <div className="sticky left-0 top-24 h-fit min-w-[220px] w-[220px] max-w-xs flex flex-col justify-start items-start pr-4 py-8 bg-gradient-to-b from-white/90 to-white/60 z-10">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="text-3xl font-bold text-gray-900 mb-4 transition-colors duration-300 flex items-center gap-3"
              >
                {currentSection === 'overview' && (
                  <>
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="url(#overview-gradient)"
                      strokeWidth="2"
                      className="inline-block align-middle"
                    >
                      <defs>
                        <linearGradient
                          id="overview-gradient"
                          x1="4"
                          y1="4"
                          x2="20"
                          y2="20"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EC4899" />
                          <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                      <rect x="4" y="4" width="16" height="16" rx="3" />
                      <path d="M8 8h8M8 12h8M8 16h4" />
                    </svg>
                    <span>Overview</span>
                  </>
                )}
                {currentSection === 'challenge' && (
                  <>
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="url(#challenge-gradient)"
                      strokeWidth="2"
                      className="inline-block align-middle"
                    >
                      <defs>
                        <linearGradient
                          id="challenge-gradient"
                          x1="4"
                          y1="4"
                          x2="20"
                          y2="20"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EC4899" />
                          <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                      <path d="M7 21V5a2 2 0 012-2h6a2 2 0 012 2v16l-5-3-5 3z" />
                    </svg>
                    <span>Challenge</span>
                  </>
                )}
                {currentSection === 'userresearch' && (
                  <>
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="url(#userresearch-gradient)"
                      strokeWidth="2"
                      className="inline-block align-middle"
                    >
                      <defs>
                        <linearGradient
                          id="userresearch-gradient"
                          x1="4"
                          y1="4"
                          x2="20"
                          y2="20"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EC4899" />
                          <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <span>User Research</span>
                  </>
                )}
                {currentSection === 'userpersonas' && (
                  <>
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="url(#userpersonas-gradient)"
                      strokeWidth="2"
                      className="inline-block align-middle"
                    >
                      <defs>
                        <linearGradient
                          id="userpersonas-gradient"
                          x1="4"
                          y1="4"
                          x2="20"
                          y2="20"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EC4899" />
                          <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                      <circle cx="9" cy="10" r="4" />
                      <circle cx="17" cy="13" r="3" />
                      <path d="M2 20c0-3 4-5 7-5s7 2 7 5" />
                      <path d="M14 20c0-2 2-3 3-3s3 1 3 3" />
                    </svg>
                    <span>User Personas</span>
                  </>
                )}
                {currentSection === 'designprocess' && (
                  <>
                    {DesignProcessIcon}
                    <span>Design Process</span>
                  </>
                )}
              </motion.h2>
            </AnimatePresence>
          </div>
          {/* Vertically stacked content with increased width */}
          <div className="flex-1 pl-0 pr-4">
            <div className="flex flex-col gap-8 max-w-5xl">
              <div ref={overviewRef} id="overview">
                <ProjectOverviewSection />
              </div>
              {/* Gradient separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />
              <div ref={challengeRef} id="challenge">
                <ChallengeSection />
              </div>
              {/* Gradient separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />
              <div ref={userResearchRef} id="user-research">
                <UserResearchSection />
              </div>
              {/* Gradient separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />
              <div ref={userPersonasRef} id="user-personas">
                <UserPersonasSection />
              </div>
              {/* Gradient separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />
              {/* Move Design Process section here */}
              <div ref={designProcessRef} id="design-process">
                {/* Design Process Section Content (move from below) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-gray-800 font-bold text-xl mb-6">Information Architecture & Workflow Design</h3>

                  <div className="mb-6">
                    <p className="text-gray-800 mb-6">
                      Clear structure and workflows were essential for scalable scheduling.
                    </p>

                    {/* Information Architecture Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                      {/* Programs Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                      >
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mb-2">
                          <circle cx="12" cy="10" r="5" stroke="#334155" strokeWidth="2" fill="none" />
                          <path
                            d="M12 22c3-4 7-7.5 7-12A7 7 0 0 0 5 10c0 4.5 4 8 7 12z"
                            stroke="#334155"
                            strokeWidth="2"
                            fill="none"
                          />
                          <circle cx="12" cy="10" r="2" fill="#334155" />
                        </svg>
                        <div className="font-bold text-blue-700 mb-1">Programs</div>
                        <div className="text-gray-600 text-sm text-center">
                          Represents the geographical location (e.g., Nigeria).
                        </div>
                      </motion.div>
                      {/* Schools Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                      >
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mb-2">
                          <rect
                            x="4"
                            y="10"
                            width="16"
                            height="8"
                            rx="2"
                            stroke="#334155"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path d="M2 10l10-6 10 6" stroke="#334155" strokeWidth="2" fill="none" />
                          <rect x="10" y="14" width="4" height="4" stroke="#334155" strokeWidth="1.5" fill="none" />
                        </svg>
                        <div className="font-bold text-blue-700 mb-1">Schools</div>
                        <div className="text-gray-600 text-sm text-center">Each program contains multiple schools.</div>
                      </motion.div>
                      {/* Grades Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                      >
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mb-2">
                          <rect
                            x="6"
                            y="16"
                            width="12"
                            height="3"
                            rx="1"
                            stroke="#334155"
                            strokeWidth="2"
                            fill="none"
                          />
                          <rect
                            x="6"
                            y="11"
                            width="12"
                            height="3"
                            rx="1"
                            stroke="#334155"
                            strokeWidth="2"
                            fill="none"
                          />
                          <rect x="6" y="6" width="12" height="3" rx="1" stroke="#334155" strokeWidth="2" fill="none" />
                        </svg>
                        <div className="font-bold text-blue-700 mb-1">Grades</div>
                        <div className="text-gray-600 text-sm text-center">
                          Schools are divided into grades or streams.
                        </div>
                      </motion.div>
                      {/* Teachers Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65 }}
                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                      >
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mb-2">
                          <circle cx="12" cy="9" r="4" stroke="#334155" strokeWidth="2" fill="none" />
                          <path d="M4 21v-1a7 7 0 0 1 14 0v1" stroke="#334155" strokeWidth="2" fill="none" />
                        </svg>
                        <div className="font-bold text-blue-700 mb-1">Teachers</div>
                        <div className="text-gray-600 text-sm text-center">
                          Teachers are assigned to grades and subjects.
                        </div>
                      </motion.div>
                      {/* Subjects Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                      >
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mb-2">
                          <path
                            d="M3 6.5A2.5 2.5 0 0 1 5.5 4H12v16H5.5A2.5 2.5 0 0 1 3 17.5v-11z"
                            stroke="#334155"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path
                            d="M21 6.5A2.5 2.5 0 0 0 18.5 4H12v16h6.5A2.5 2.5 0 0 0 21 17.5v-11z"
                            stroke="#334155"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path d="M12 20V4" stroke="#334155" strokeWidth="1.5" />
                        </svg>
                        <div className="font-bold text-blue-700 mb-1">Subjects</div>
                        <div className="text-gray-600 text-sm text-center">Subjects are taught within each grade.</div>
                      </motion.div>
                    </div>
                  </div>

                  <p className="text-gray-700 italic">
                    This foundation made the system intuitive for both development and user training.
                  </p>

                  {/* User Journey Mapping */}
                  <h3 className="text-gray-800 font-bold text-xl mb-6 mt-10">User Journey Mapping</h3>

                  <p className="text-gray-800 mb-6">
                    Mapped real user steps, emotions, and pain points to guide design decisions.
                  </p>

                  <UserJourneyMapInteractive />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 mt-14">
                    {/* Pain Points Card */}
                    <div className="w-full">
                      <h4 className="font-bold mb-4 text-gray-800">Pain Points</h4>
                      <ul className="space-y-4">
                        <li>
                          <div className="border-l-4 border-red-500 pl-3">
                            <p className="text-gray-800 font-medium">Limited visibility</p>
                            <p className="text-gray-700">into which schools have unique constraints</p>
                          </div>
                        </li>
                        <li>
                          <div className="border-l-4 border-red-500 pl-3">
                            <p className="text-gray-800 font-medium">Long waiting times</p>
                            <p className="text-gray-700">for plan generation with no progress indicator</p>
                          </div>
                        </li>
                        <li>
                          <div className="border-l-4 border-red-500 pl-3">
                            <p className="text-gray-800 font-medium">Overwhelming error messages</p>
                            <p className="text-gray-700">with no clear resolution path</p>
                          </div>
                        </li>
                        <li>
                          <div className="border-l-4 border-red-500 pl-3">
                            <p className="text-gray-800 font-medium">Tedious manual adjustments</p>
                            <p className="text-gray-700">requiring repetitive actions</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {/* Design Opportunities Card */}
                    <div className="w-full">
                      <h4 className="font-bold mb-4 text-gray-800">Design Opportunities</h4>
                      <ul className="space-y-4">
                        <li>
                          <div className="border-l-4 border-green-500 pl-3">
                            <p className="text-gray-800 font-medium">Create visual constraint indicators</p>
                            <p className="text-gray-700">for quick school assessment</p>
                          </div>
                        </li>
                        <li>
                          <div className="border-l-4 border-green-500 pl-3">
                            <p className="text-gray-800 font-medium">Implement real-time progress updates</p>
                            <p className="text-gray-700">with estimated completion times</p>
                          </div>
                        </li>
                        <li>
                          <div className="border-l-4 border-green-500 pl-3">
                            <p className="text-gray-800 font-medium">Design guided resolution workflows</p>
                            <p className="text-gray-700">for each violation type</p>
                          </div>
                        </li>
                        <li>
                          <div className="border-l-4 border-green-500 pl-3">
                            <p className="text-gray-800 font-medium">Create bulk editing capabilities</p>
                            <p className="text-gray-700">for common adjustment patterns</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-8">
                    These insights shaped targeted improvements across the user experience.
                  </p>
                </motion.div>
              </div>
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />
              <div className="mt-16" />
            </div>
          </div>
        </section>

        {/* Interactive Prototype Section */}
        <div className="mb-20">
          <InteractivePrototype />
        </div>

        {/* Lessons Learned Section */}
        <section id="lessons" className="mb-20 mt-20">
          <div className="flex items-center mb-8">
            <CaseStudyHeader level="h2" showGradientLine>
              Lessons Learned
            </CaseStudyHeader>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-md mb-12"
          >
            <p className="text-gray-800 mb-8">
              The EduScheduler project provided valuable insights that have informed my approach to complex system
              design:
            </p>

            {/* Key Challenges */}
            <div className="mb-12">
              <h3 className="text-gray-900 font-bold text-xl mb-6">Key Challenges</h3>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl border-t-4 border-blue-400 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="text-blue-600 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">Complex Constraint Management</h4>
                  </div>
                  <p className="text-gray-700">
                    Balancing the need for standardization across programs with flexibility for local contexts proved
                    more complex than initially anticipated.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-t-4 border-purple-400 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="text-purple-600 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">Stakeholder Alignment</h4>
                  </div>
                  <p className="text-gray-700">
                    Coordinating between program administrators, school principals, and teachers required careful
                    communication plans and change management.
                  </p>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl border-t-4 border-pink-400 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="text-pink-600 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">Performance Optimization</h4>
                  </div>
                  <p className="text-gray-700">
                    The complexity of scheduling algorithms required significant optimization to deliver results in a
                    timely manner for larger schools.
                  </p>
                </div>
              </div>
            </div>

            {/* What I Would Do Differently */}
            <div className="mb-12">
              <h3 className="text-gray-900 font-bold text-xl mb-6">What I Would Do Differently</h3>

              <motion.div className="rounded-xl overflow-hidden shadow-md border border-gray-200 mb-8">
                <div className="py-4 px-6 bg-blue-50 rounded-t-xl">
                  <h4 className="font-bold text-gray-900">Process Improvements</h4>
                </div>
                <div className="bg-white p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 mb-1">Earlier User Testing</h5>
                        <p className="text-gray-700">
                          Involving end users earlier in the process would have identified usability challenges sooner
                          and improved adoption rates.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 mb-1">Incremental Rollout</h5>
                        <p className="text-gray-700">
                          A more phased approach to deployment would have allowed for iterative improvements based on
                          real-world usage.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 mb-1">Enhanced Data Visualization</h5>
                        <p className="text-gray-700">
                          More sophisticated data visualization tools would have made it easier for administrators to
                          identify optimization opportunities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Design Principles Reinforced */}
            <div className="mb-12">
              <h3 className="text-gray-900 font-bold text-xl mb-6">Design Principles Reinforced</h3>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-400 w-16 h-16 -mr-6 -mt-6 rounded-full opacity-20"></div>
                  <h4 className="font-bold text-gray-900 mb-3">Progressive Disclosure</h4>
                  <p className="text-gray-700 relative z-10">
                    Revealing complexity gradually allowed users to navigate the system confidently despite its
                    sophistication.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-purple-400 w-16 h-16 -mr-6 -mt-6 rounded-full opacity-20"></div>
                  <h4 className="font-bold text-gray-900 mb-3">Contextual Assistance</h4>
                  <p className="text-gray-700 relative z-10">
                    Providing help and guidance at the point of need significantly reduced training requirements.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-pink-400 w-16 h-16 -mr-6 -mt-6 rounded-full opacity-20"></div>
                  <h4 className="font-bold text-gray-900 mb-3">Adaptive Interfaces</h4>
                  <p className="text-gray-700 relative z-10">
                    Different user roles required tailored interfaces to focus on their specific needs and
                    responsibilities.
                  </p>
                </div>
              </div>
            </div>

            {/* The Biggest Takeaway */}
            <div className="mb-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900">The Biggest Takeaway</h3>
                <p className="text-gray-700">
                  The most significant lesson from this project was that even the most complex systems can be made
                  approachable through thoughtful information architecture and workflow design. By creating clear mental
                  models and providing appropriate feedback mechanisms, users can successfully navigate and control
                  highly sophisticated processes.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="results" className="mb-20">
          <div className="flex items-center mb-8">
            <CaseStudyHeader level="h2" showGradientLine>
              Conclusion
            </CaseStudyHeader>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-md mb-12"
          >
            <p className="text-gray-800 mb-8">
              EduScheduler transformed a complex manual process into an efficient, intuitive system, empowering
              administrators to create optimal schedules while meeting diverse needs.
            </p>

            <h3 className="text-blue-700 font-bold text-lg mb-4">Project Achievements</h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700">
                Thoughtful UX design enabled automation and control, balancing optimization with human expertise. Clear
                workflows and visualizations made schedule creation accessible for all stakeholders.
              </p>
            </div>

            <h4 className="font-bold text-gray-900 mb-4 text-xl">Impact Metrics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-700 mb-1">80%</div>
                <div className="text-sm text-gray-700">Fewer scheduling errors</div>
              </div>
              <div className="bg-purple-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-700 mb-1">85%</div>
                <div className="text-sm text-gray-700">Time saved</div>
              </div>
              <div className="bg-pink-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-pink-700 mb-1">92%</div>
                <div className="text-sm text-gray-700">Teacher resource optimization</div>
              </div>
              <div className="bg-green-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-700 mb-1">12%</div>
                <div className="text-sm text-gray-700">Cost reduction</div>
              </div>
            </div>

            <h4 className="font-bold text-gray-900 mb-4 text-xl">My Role</h4>
            <p className="text-gray-700 mb-6">
              As Lead Product Designer, I led research, design, and implementation, collaborating across teams and
              supporting users throughout the product lifecycle.
            </p>

            <h4 className="font-bold text-gray-900 mb-4 text-xl">Future Directions</h4>
            <p className="text-gray-700 mb-6">
              EduScheduler lays the foundation for a modular learning platform, with future enhancements planned for
              content, planning, teacher, and school management.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl flex items-start">
              <div className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9-5-9-5v10z" />
                </svg>
              </div>
              <div>
                <p className="italic text-gray-700 mb-2">
                  "The EduScheduler system has revolutionized how we approach academic scheduling, saving countless
                  hours while producing better results. It's become an essential tool in our educational planning
                  process."
                </p>
                <div className="text-sm text-gray-900 font-semibold">DA</div>
                <div className="text-xs text-gray-500">Director of Academic Programs</div>
              </div>
            </div>
          </motion.div>
        </section>

        <CaseStudyFooter />
      </main>
      <ScrollToTopButton targetId="intro-section" />
    </div>
  );
}
