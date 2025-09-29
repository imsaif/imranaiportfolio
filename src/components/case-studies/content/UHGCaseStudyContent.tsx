'use client';

import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import ProgressBar from '@/components/ui/ProgressBar';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MdHealthAndSafety, MdManageSearch, MdDesignServices, MdIntegrationInstructions, MdAssessment } from 'react-icons/md';
import { ProjectOverviewSection } from '../../../app/casestudy/uhg/sections/ProjectOverviewSection';

interface UHGCaseStudyContentProps {
  showProgressBar?: boolean;
  showScrollToTop?: boolean;
}

export const UHGCaseStudyContent: React.FC<UHGCaseStudyContentProps> = ({
  showProgressBar = true,
  showScrollToTop = true,
}) => {
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

  // Material Design icons with accessible grey styling for sticky navigation
  const OverviewIcon = (
    <MdHealthAndSafety
      size={28}
      className="inline-block align-middle text-gray-600"
    />
  );

  const ResearchIcon = (
    <MdManageSearch
      size={28}
      className="inline-block align-middle text-gray-600"
    />
  );

  const DesignIcon = (
    <MdDesignServices
      size={28}
      className="inline-block align-middle text-gray-600"
    />
  );

  const TechnicalIcon = (
    <MdIntegrationInstructions
      size={28}
      className="inline-block align-middle text-gray-600"
    />
  );

  const ResultsIcon = (
    <MdAssessment
      size={28}
      className="inline-block align-middle text-gray-600"
    />
  );

  return (
    <div className="bg-white min-h-screen">
      {showProgressBar && <ProgressBar progress={scrollProgress} />}

      {/* Hero Image */}
      <div className="w-full relative">
        <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
          <Image
            src="/images/casestudy/uhg/uhg-hospital-bank.png"
            alt="Optum Bank HSA Reimbursement Platform"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        </div>
      </div>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        {/* Introduction Section */}
        <div className="mb-12 text-center">
          <CaseStudyHeader level="h1" className="mb-6">
            Optum Bank: HSA Reimbursement Platform Redesign
          </CaseStudyHeader>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Redesigning the HSA reimbursement experience for 450,000 users at UnitedHealth Group,
            improving task completion rates from 1.1% to 23% while reducing customer service calls by 28%.
          </p>
        </div>

        {/* Sticky Navigation Layout */}
        <section className="relative flex flex-row items-start gap-0 mb-20 min-h-[500px]">
          {/* Sticky Title */}
          <div className="sticky left-0 top-24 h-fit min-w-[300px] w-[300px] max-w-md flex flex-col justify-start items-start pr-4 py-8 bg-gradient-to-b from-white/90 to-white/60 z-10">
            <CaseStudyHeader
              level="h2"
              showGradientLine
              className="flex items-center gap-3 mb-4"
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
                  <span>Implementation</span>
                </>
              )}
              {currentSection === 'results' && (
                <>
                  {ResultsIcon}
                  <span>Results & Impact</span>
                </>
              )}
            </CaseStudyHeader>
          </div>

          {/* Content Sections */}
          <div className="flex-1 pl-0 pr-4">
            <div className="flex flex-col gap-8 max-w-5xl">

              {/* Overview Section */}
              <div ref={overviewRef} id="overview">
                <ProjectOverviewSection />
              </div>

              {/* Separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />

              {/* Research & Discovery Section */}
              <div ref={researchRef} id="research">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Research & Discovery</h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">Key Problems Identified</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Complex navigation with unclear information hierarchy</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Confusing form layouts causing user errors</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Poor mobile experience limiting accessibility</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700">Lack of clear status indicators and feedback</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">User Research Insights</h4>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-red-600 mb-1">1.1%</div>
                            <div className="text-sm text-gray-600">Task completion rate</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-red-600 mb-1">0.3%</div>
                            <div className="text-sm text-gray-600">Mobile completion rate</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-red-600 mb-1">68%</div>
                            <div className="text-sm text-gray-600">Users contacted support</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-red-600 mb-1">45min</div>
                            <div className="text-sm text-gray-600">Average task time</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />

              {/* Design Strategy Section */}
              <div ref={designRef} id="design">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Design Strategy</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-bold text-blue-900 mb-3">🎯 Design Principles</h4>
                      <ul className="space-y-2 text-blue-800">
                        <li>• Simplify complex healthcare processes</li>
                        <li>• Provide clear, actionable feedback</li>
                        <li>• Ensure mobile-first accessibility</li>
                        <li>• Maintain HIPAA compliance</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-bold text-green-900 mb-3">📱 Key Improvements</h4>
                      <ul className="space-y-2 text-green-800">
                        <li>• Streamlined information architecture</li>
                        <li>• Progressive form completion</li>
                        <li>• Enhanced mobile responsive design</li>
                        <li>• Real-time validation and guidance</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Healthcare UX Considerations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl mb-2">🔒</div>
                        <div className="font-medium">HIPAA Compliance</div>
                        <div className="text-sm text-gray-600">Secure data handling</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-2">👥</div>
                        <div className="font-medium">Diverse Users</div>
                        <div className="text-sm text-gray-600">All ages & tech levels</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-2">⚡</div>
                        <div className="font-medium">High Stakes</div>
                        <div className="text-sm text-gray-600">Financial wellbeing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />

              {/* Technical Implementation Section */}
              <div ref={technicalRef} id="technical">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Implementation</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">Technology Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'Node.js', 'Healthcare APIs', 'OCR Processing', 'HIPAA Compliance'].map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <h5 className="font-bold text-purple-900 mb-3">Frontend Improvements</h5>
                        <ul className="space-y-2 text-purple-800 text-sm">
                          <li>• Responsive design system implementation</li>
                          <li>• Progressive web app capabilities</li>
                          <li>• Real-time form validation</li>
                          <li>• Accessibility compliance (WCAG 2.1)</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 p-6 rounded-lg">
                        <h5 className="font-bold text-orange-900 mb-3">Backend Integration</h5>
                        <ul className="space-y-2 text-orange-800 text-sm">
                          <li>• Legacy system integration</li>
                          <li>• OCR document processing</li>
                          <li>• Secure API endpoints</li>
                          <li>• Performance optimization</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />

              {/* Results & Impact Section */}
              <div ref={resultsRef} id="results">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Results & Impact</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-green-50 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">23% ↑</div>
                      <div className="text-sm font-medium text-green-800">Task Completion Rate</div>
                      <div className="text-xs text-green-600 mt-1">From 1.1% to 23%</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">28% ↓</div>
                      <div className="text-sm font-medium text-blue-800">Support Calls</div>
                      <div className="text-xs text-blue-600 mt-1">Reduced customer service load</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">15%</div>
                      <div className="text-sm font-medium text-purple-800">Mobile Completion</div>
                      <div className="text-xs text-purple-600 mt-1">From 0.3% to 15%</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Business Impact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Operational Efficiency</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Reduced customer service workload</li>
                          <li>• Faster processing times</li>
                          <li>• Fewer user errors and resubmissions</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">User Experience</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Higher user satisfaction scores</li>
                          <li>• Improved accessibility compliance</li>
                          <li>• Better mobile user experience</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CaseStudyFooter />
      </main>
      {showScrollToTop && <ScrollToTopButton targetId="overview" />}
    </div>
  );
};