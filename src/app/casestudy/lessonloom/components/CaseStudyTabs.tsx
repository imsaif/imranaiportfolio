'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { TabNavigation } from './TabNavigation';
import { TacticalExecutionContent } from '../sections/TacticalExecutionContent';
import { ProjectOverviewSection } from '../sections/ProjectOverviewSection';
import { DesignChallengesSection } from '../sections/DesignChallengesSection';
import { RoleCollaborationSection } from '../sections/RoleCollaborationSection';
import { OrganizationalImpactSection } from '../sections/OrganizationalImpactSection';
import { AIImplementationSection } from '../sections/AIImplementationSection';
import { KeyLearningsSection } from '../sections/KeyLearningsSection';
import { ResearchDiscoverySection } from '../sections/ResearchDiscoverySection';
import { DesignSolutionSection } from '../sections/DesignSolutionSection';
import { TechnicalImplementationSection } from '../sections/TechnicalImplementationSection';
import { ResultsImpactSection } from '../sections/ResultsImpactSection';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MdDescription,
  MdSearch,
  MdPalette,
  MdBuild,
  MdShowChart,
  MdGroup,
  MdWarning,
  MdGroupWork,
  MdLightbulb,
  MdDevices
} from 'react-icons/md';

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const strategicSections: Section[] = [
  { id: 'overview', title: 'Project Overview', icon: <MdDescription size={18} /> },
  { id: 'role-collaboration', title: 'My Role & Collaboration', icon: <MdGroup size={18} /> },
  { id: 'design-challenges', title: 'Design Challenges', icon: <MdWarning size={18} /> },
  { id: 'organizational-impact', title: 'Organizational Impact', icon: <MdGroupWork size={18} /> },
  { id: 'ai-implementation', title: 'AI Implementation', icon: <MdLightbulb size={18} /> },
  { id: 'results', title: 'Results & Impact', icon: <MdShowChart size={18} /> },
  { id: 'key-learnings', title: 'Key Learnings', icon: <MdLightbulb size={18} /> }
];

const tacticalSections: Section[] = [
  { id: 'research', title: 'The Challenge', icon: <MdWarning size={18} /> },
  { id: 'design', title: 'Design Solution', icon: <MdPalette size={18} /> },
  { id: 'interactive-demo', title: 'Solution Architecture', icon: <MdDevices size={18} /> },
  { id: 'technical', title: 'Technical Implementation', icon: <MdBuild size={18} /> },
  { id: 'ai-deep-dive', title: 'AI Implementation', icon: <MdLightbulb size={18} /> },
  { id: 'results', title: 'Results & Impact', icon: <MdShowChart size={18} /> }
];

export function CaseStudyTabs() {
  const [activeTab, setActiveTab] = useState<'strategic' | 'tactical'>('strategic');
  const [activeSection, setActiveSection] = useState('overview');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleTabChange = (tab: 'strategic' | 'tactical') => {
    setActiveTab(tab);
    setActiveSection(tab === 'strategic' ? 'overview' : 'research');
  };

  const currentSections = useMemo(
    () => activeTab === 'strategic' ? strategicSections : tacticalSections,
    [activeTab]
  );

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const attachObserver = (attempt = 0, maxAttempts = 5) => {
        let foundElements = 0;
        currentSections.forEach((section) => {
          const element = document.getElementById(section.id);
          if (element) {
            observerRef.current?.observe(element);
            foundElements++;
          }
        });

        if (foundElements < currentSections.length && attempt < maxAttempts) {
          const delay = 100 * Math.pow(2, attempt);
          setTimeout(() => attachObserver(attempt + 1, maxAttempts), delay);
        }
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      };

      const observerOptions: IntersectionObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      };

      observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
      attachObserver();
    }, 500);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = currentSections.length - 1; i >= 0; i--) {
        const section = currentSections[i];
        if (!section) continue;
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;

          if (scrollPosition >= elementTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [currentSections]);

  return (
    <div>
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="flex gap-12">
          {/* Left Sidebar Navigation */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-32 space-y-2">
              {currentSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-100 border-l-4 border-blue-600 text-blue-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 border-l-4 border-transparent'
                  }`}
                >
                  <span className={`flex-shrink-0 transition-colors ${
                    activeSection === section.id
                      ? 'text-gray-600'
                      : 'text-gray-400'
                  }`}>
                    {section.icon}
                  </span>
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="sync">
              {/* STRATEGIC TAB */}
              {activeTab === 'strategic' && (
                <motion.div
                  key="strategic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-20"
                >
                  <section id="overview">
                    <ProjectOverviewSection />
                  </section>
                  <section id="role-collaboration">
                    <RoleCollaborationSection />
                  </section>
                  <section id="design-challenges">
                    <DesignChallengesSection />
                  </section>
                  <section id="organizational-impact">
                    <OrganizationalImpactSection />
                  </section>
                  <section id="ai-implementation">
                    <AIImplementationSection />
                  </section>
                  <section id="results">
                    <ResultsImpactSection />
                  </section>
                  <section id="key-learnings">
                    <KeyLearningsSection />
                  </section>
                </motion.div>
              )}

              {/* TACTICAL TAB */}
              {activeTab === 'tactical' && (
                <motion.div
                  key="tactical"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TacticalExecutionContent />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
