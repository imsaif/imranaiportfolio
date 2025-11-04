'use client';

import { useState, useEffect, useRef } from 'react';
import { TabNavigation } from './TabNavigation';
import { ProjectOverviewSection } from '../sections/ProjectOverviewSection';
import { ResearchDiscoverySection } from '../sections/ResearchDiscoverySection';
import { DesignStrategySection } from '../sections/DesignStrategySection';
import { TechnicalImplementationSection } from '../sections/TechnicalImplementationSection';
import { ResultsImpactSection } from '../sections/ResultsImpactSection';
import { StrategicBusinessContextSection } from '../sections/StrategicBusinessContextSection';
import { LeadershipTeamSection } from '../sections/LeadershipTeamSection';
import { CrisisManagementSection } from '../sections/CrisisManagementSection';
import { OrganizationalImpactSection } from '../sections/OrganizationalImpactSection';
import { StrategicInsightsSection } from '../sections/StrategicInsightsSection';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MdDescription,
  MdSearch,
  MdPalette,
  MdBuild,
  MdShowChart,
  MdBusinessCenter,
  MdGroup,
  MdWarning,
  MdGroupWork,
  MdLightbulb
} from 'react-icons/md';

interface CaseStudyTabsProps {
  onSectionChange?: (section: string) => void;
}

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const strategicSections: Section[] = [
  { id: 'overview', title: 'Project Overview', icon: <MdDescription size={18} /> },
  { id: 'strategic-business-context', title: 'Strategic Business Context', icon: <MdBusinessCenter size={18} /> },
  { id: 'leadership-team', title: 'My Role & Collaboration', icon: <MdGroup size={18} /> },
  { id: 'crisis-management', title: 'Design Challenges', icon: <MdWarning size={18} /> },
  { id: 'organizational-impact', title: 'Team Approach', icon: <MdGroupWork size={18} /> },
  { id: 'results', title: 'Results & Impact', icon: <MdShowChart size={18} /> },
  { id: 'strategic-insights', title: 'Key Learnings', icon: <MdLightbulb size={18} /> }
];

const tacticalSections: Section[] = [
  { id: 'research', title: 'Research & Discovery', icon: <MdSearch size={18} /> },
  { id: 'design', title: 'Design Strategy', icon: <MdPalette size={18} /> },
  { id: 'technical', title: 'Technical Implementation', icon: <MdBuild size={18} /> },
  { id: 'results', title: 'Results & Impact', icon: <MdShowChart size={18} /> }
];

export function CaseStudyTabs({}: CaseStudyTabsProps) {
  const [activeTab, setActiveTab] = useState<'strategic' | 'tactical'>('strategic');
  const [activeSection, setActiveSection] = useState('overview');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleTabChange = (tab: 'strategic' | 'tactical') => {
    setActiveTab(tab);
    // Set first section of each tab as active
    setActiveSection(tab === 'strategic' ? 'overview' : 'research');
  };

  const currentSections = activeTab === 'strategic' ? strategicSections : tacticalSections;

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track which section is in view as user scrolls
  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Longer delay to ensure DOM elements are fully rendered and positioned
    const timer = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      observerRef.current = observer;

      // Get all section elements for current tab
      let foundElements = 0;
      currentSections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.observe(element);
          foundElements++;
        }
      });

      // If no elements found, try again after another delay
      if (foundElements === 0) {
        setTimeout(() => {
          currentSections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element && observerRef.current) {
              observerRef.current.observe(element);
            }
          });
        }, 200);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [activeTab, currentSections]);

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
            <AnimatePresence mode="wait">
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
                  <ProjectOverviewSection />
                  <StrategicBusinessContextSection />
                  <LeadershipTeamSection />
                  <CrisisManagementSection />
                  <OrganizationalImpactSection />
                  <ResultsImpactSection />
                  <StrategicInsightsSection />
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
                  className="space-y-20"
                >
                  <ResearchDiscoverySection />
                  <DesignStrategySection />
                  <TechnicalImplementationSection />
                  <ResultsImpactSection />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
