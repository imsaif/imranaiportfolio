'use client';

import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import Image from 'next/image';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import ProgressBar from '@/components/ui/ProgressBar';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ProjectOverviewSection } from './sections/ProjectOverviewSection';
import { ResearchDiscoverySection } from './sections/ResearchDiscoverySection';
import { DesignStrategySection } from './sections/DesignStrategySection';
import { TechnicalImplementationSection } from './sections/TechnicalImplementationSection';
import { ResultsImpactSection } from './sections/ResultsImpactSection';

// Healthcare icon for Overview section
const OverviewIcon = (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block align-middle" aria-hidden="true">
    <defs>
      <linearGradient id="overview-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6900" />
        <stop offset="1" stopColor="#E55A00" />
      </linearGradient>
    </defs>
    <path
      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7 7-7Z"
      stroke="url(#overview-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Research icon
const ResearchIcon = (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block align-middle" aria-hidden="true">
    <defs>
      <linearGradient id="research-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6900" />
        <stop offset="1" stopColor="#E55A00" />
      </linearGradient>
    </defs>
    <circle cx="11" cy="11" r="8" stroke="url(#research-gradient)" strokeWidth="2" fill="none" />
    <path d="M21 21l-4.35-4.35" stroke="url(#research-gradient)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Design strategy icon
const DesignIcon = (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block align-middle" aria-hidden="true">
    <defs>
      <linearGradient id="design-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6900" />
        <stop offset="1" stopColor="#E55A00" />
      </linearGradient>
    </defs>
    <path
      d="M16.862 5.487l1.65-1.65a2.121 2.121 0 113 3l-1.65 1.65m-2-2l-9.193 9.193a2 2 0 00-.497.88l-1.01 3.366a.5.5 0 00.62.62l3.366-1.01a2 2 0 00.88-.497l9.193-9.193m-2-2l2 2"
      stroke="url(#design-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Technical implementation icon
const TechnicalIcon = (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block align-middle" aria-hidden="true">
    <defs>
      <linearGradient id="technical-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6900" />
        <stop offset="1" stopColor="#E55A00" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="16" height="12" rx="2" stroke="url(#technical-gradient)" strokeWidth="2" fill="none" />
    <path d="M8 8l4 4 4-4" stroke="url(#technical-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 20h16" stroke="url(#technical-gradient)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Results impact icon
const ResultsIcon = (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block align-middle" aria-hidden="true">
    <defs>
      <linearGradient id="results-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6900" />
        <stop offset="1" stopColor="#E55A00" />
      </linearGradient>
    </defs>
    <path d="M3 13l4 4L17 7" stroke="url(#results-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 7l-10 10-4-4" stroke="url(#results-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function UHGCaseStudyPage() {
  // Scroll progress state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sticky section title logic
  const [currentSection, setCurrentSection] = useState<
    'overview' | 'research' | 'design' | 'technical' | 'results'
  >('overview');

  const overviewRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Update current section
      const researchTop = researchRef.current?.getBoundingClientRect().top ?? 0;
      const designTop = designRef.current?.getBoundingClientRect().top ?? 0;
      const technicalTop = technicalRef.current?.getBoundingClientRect().top ?? 0;
      const resultsTop = resultsRef.current?.getBoundingClientRect().top ?? 0;

      if (resultsTop <= 150) {
        setCurrentSection('results');
      } else if (technicalTop <= 150) {
        setCurrentSection('technical');
      } else if (designTop <= 150) {
        setCurrentSection('design');
      } else if (researchTop <= 150) {
        setCurrentSection('research');
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
      <ProgressBar progress={scrollProgress} />

      {/* Header section */}
      <header className="bg-white py-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          {/* Navigation can be added here if needed */}
        </div>
      </header>

      {/* Hero image */}
      <div>
        <div className="w-full relative">
          <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
            <Image
              src="/images/casestudy/uhg/uhg-hospital-bank.png"
              alt="UnitedHealth Group: HSA Reimbursement Redesign"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        {/* Introduction Section */}
        <div className="text-center mb-12">
          <CaseStudyHeader level="h1" className="text-center mb-4">
            Optum Bank: HSA Reimbursement Process Redesign
          </CaseStudyHeader>
          <p className="text-xl text-gray-600 mb-6">
            Solving Multi-User, Multi-System Healthcare Financial Experience
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600">1.1% → 23%</div>
              <div className="text-sm text-gray-600">Task Completion Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">28%</div>
              <div className="text-sm text-gray-600">Reduction in Support Calls</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">450K</div>
              <div className="text-sm text-gray-600">Users Affected</div>
            </div>
          </div>
        </div>

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
                {currentSection === 'overview' && (
                  <>
                    {OverviewIcon}
                    <span>Project Overview</span>
                  </>
                )}
                {currentSection === 'research' && (
                  <>
                    {ResearchIcon}
                    <span>Research & Discovery</span>
                  </>
                )}
                {currentSection === 'design' && (
                  <>
                    {DesignIcon}
                    <span>Design Strategy</span>
                  </>
                )}
                {currentSection === 'technical' && (
                  <>
                    {TechnicalIcon}
                    <span>Technical Implementation</span>
                  </>
                )}
                {currentSection === 'results' && (
                  <>
                    {ResultsIcon}
                    <span>Results & Impact</span>
                  </>
                )}
              </CaseStudyHeader>
            </AnimatePresence>
          </div>

          {/* Content sections */}
          <div className="flex-1 pl-0 pr-4">
            <div className="flex flex-col gap-8 max-w-5xl">
              <div ref={overviewRef} id="overview">
                <ProjectOverviewSection />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-70" />

              <div ref={researchRef} id="research">
                <ResearchDiscoverySection />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-70" />

              <div ref={designRef} id="design">
                <DesignStrategySection />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-70" />

              <div ref={technicalRef} id="technical">
                <TechnicalImplementationSection />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-70" />

              <div ref={resultsRef} id="results">
                <ResultsImpactSection />
              </div>
            </div>
          </div>
        </section>

        <CaseStudyFooter />
      </main>
      <ScrollToTopButton targetId="overview" />
    </div>
  );
}