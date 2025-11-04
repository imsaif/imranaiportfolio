'use client';

import { useState } from 'react';
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

interface CaseStudyTabsProps {
  onSectionChange?: (section: string) => void;
}

const strategicSections = [
  { id: 'overview', title: 'Project Overview' },
  { id: 'strategic-business-context', title: 'Strategic Business Context' },
  { id: 'leadership-team', title: 'My Role & Collaboration' },
  { id: 'crisis-management', title: 'Design Challenges' },
  { id: 'organizational-impact', title: 'Team Approach' },
  { id: 'results', title: 'Results & Impact' },
  { id: 'strategic-insights', title: 'Key Learnings' }
];

const tacticalSections = [
  { id: 'overview', title: 'Project Overview' },
  { id: 'research', title: 'Research & Discovery' },
  { id: 'design', title: 'Design Strategy' },
  { id: 'technical', title: 'Technical Implementation' },
  { id: 'results', title: 'Results & Impact' }
];

export function CaseStudyTabs({ onSectionChange }: CaseStudyTabsProps) {
  const [activeTab, setActiveTab] = useState<'strategic' | 'tactical'>('strategic');
  const [activeSection, setActiveSection] = useState('overview');

  const handleTabChange = (tab: 'strategic' | 'tactical') => {
    setActiveTab(tab);
    setActiveSection('overview');
  };

  const currentSections = activeTab === 'strategic' ? strategicSections : tacticalSections;

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-100 border-l-4 border-blue-600 text-blue-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 border-l-4 border-transparent'
                  }`}
                >
                  {section.title}
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
                  <ProjectOverviewSection />
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
