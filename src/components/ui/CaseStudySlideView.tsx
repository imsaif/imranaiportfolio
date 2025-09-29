'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Project } from '@/data/projects';
import Image from 'next/image';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
// Using inline SVG instead of lucide-react

interface CaseStudySlideViewProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudySlideView: React.FC<CaseStudySlideViewProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to start before calling onClose
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 100);
  };

  if (!project) return null;

  const slideVariants = {
    hidden: { y: '100%' },
    visible: { y: 0 },
    exit: { y: '-100%' }
  };

  const renderCaseStudyContent = () => {
    if (project.slug === 'scheduler') {
      return (
        <div className="space-y-12">
          {/* Project Overview */}
          <section>
            <CaseStudyHeader level="h2" className="mb-6" showGradientLine>
              Project Overview
            </CaseStudyHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Challenge</h3>
                <p className="text-gray-700 mb-6">
                  Educational institutions struggled with manual scheduling processes that were time-consuming,
                  error-prone, and failed to optimize resource allocation across multiple schools and programs.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Solution</h3>
                <p className="text-gray-700">
                  Developed an AI-powered scheduling system that automates timetable generation while
                  considering constraints, teacher availability, and institutional requirements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.stats?.map((stat, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-indigo-600 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section>
            <CaseStudyHeader level="h2" className="mb-6" showGradientLine>
              Design Process
            </CaseStudyHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Research</h3>
                <p className="text-gray-600 text-sm">
                  Conducted interviews with administrators and teachers to understand scheduling pain points.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Design</h3>
                <p className="text-gray-600 text-sm">
                  Created intuitive workflows for constraint input and schedule visualization.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-indigo-600 font-bold">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Iterate</h3>
                <p className="text-gray-600 text-sm">
                  Refined the interface based on user testing and implementation feedback.
                </p>
              </div>
            </div>
          </section>
        </div>
      );
    } else if (project.slug === 'lessonloom') {
      return (
        <div className="space-y-12">
          {/* Project Overview */}
          <section>
            <CaseStudyHeader level="h2" className="mb-6" showGradientLine>
              Project Overview
            </CaseStudyHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Challenge</h3>
                <p className="text-gray-700 mb-6">
                  Teachers spend countless hours creating lesson plans and educational materials from scratch,
                  often lacking the time and resources to create engaging, curriculum-aligned content.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Solution</h3>
                <p className="text-gray-700">
                  Built an AI-powered platform that generates custom lesson plans, worksheets, and educational
                  materials based on curriculum standards and teacher preferences.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.stats?.map((stat, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-indigo-600 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Generation Process */}
          <section>
            <CaseStudyHeader level="h2" className="mb-6" showGradientLine>
              AI Generation Workflow
            </CaseStudyHeader>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Input</h4>
                  <p className="text-sm text-gray-600">Teacher specifies subject, grade level, and learning objectives</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">AI Processing</h4>
                  <p className="text-sm text-gray-600">AI analyzes curriculum standards and generates content</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Generation</h4>
                  <p className="text-sm text-gray-600">Creates lesson plans, activities, and assessments</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Customize</h4>
                  <p className="text-sm text-gray-600">Teachers can edit and personalize generated content</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    } else if (project.slug === 'uhg') {
      return (
        <div className="space-y-12">
          {/* Project Overview */}
          <section>
            <CaseStudyHeader level="h2" className="mb-6" showGradientLine>
              Project Overview
            </CaseStudyHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Challenge</h3>
                <p className="text-gray-700 mb-6">
                  The HSA reimbursement system at UnitedHealth Group had a critically low 1.1% task completion rate,
                  causing massive customer service overhead and user frustration across 450,000 users.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Solution</h3>
                <p className="text-gray-700">
                  Led a comprehensive UX redesign focusing on simplified workflows, clearer visual hierarchy,
                  and guided user experiences while maintaining strict healthcare compliance requirements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.stats?.map((stat, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-indigo-600 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Healthcare UX Considerations */}
          <section>
            <CaseStudyHeader level="h2" className="mb-6" showGradientLine>
              Healthcare UX Considerations
            </CaseStudyHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-bold text-red-900 mb-3 flex items-center">
                  <span className="mr-2">🔒</span>
                  HIPAA Compliance
                </h3>
                <p className="text-red-800 text-sm">
                  All design decisions had to consider strict healthcare privacy regulations and secure data handling.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                  <span className="mr-2">👥</span>
                  Diverse User Base
                </h3>
                <p className="text-blue-800 text-sm">
                  Designed for users across all ages and technical skill levels, requiring inclusive design patterns.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-bold text-green-900 mb-3 flex items-center">
                  <span className="mr-2">⚡</span>
                  High Stakes
                </h3>
                <p className="text-green-800 text-sm">
                  Errors in reimbursement processes directly impact people's healthcare finances and well-being.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-bold text-purple-900 mb-3 flex items-center">
                  <span className="mr-2">📱</span>
                  Mobile First
                </h3>
                <p className="text-purple-800 text-sm">
                  Mobile completion rates improved from 0.3% to 15% through responsive, mobile-optimized design.
                </p>
              </div>
            </div>
          </section>
        </div>
      );
    }

    // Default content for other projects
    return (
      <div className="space-y-8">
        <section>
          <CaseStudyHeader level="h2" className="mb-6" showGradientLine>
            About This Project
          </CaseStudyHeader>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">{project.fullDescription}</p>
          </div>
        </section>

        {project.stats && project.stats.length > 0 && (
          <section>
            <CaseStudyHeader level="h3" className="mb-4">
              Key Metrics
            </CaseStudyHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.stats.map((stat, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-white"
          variants={slideVariants}
          initial="hidden"
          animate={isClosing ? "exit" : "visible"}
          exit="exit"
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 300,
            duration: 0.6
          }}
        >
          {/* Header with close button */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {project.slug === 'scheduler' ? 'EduScheduler' :
                   project.slug === 'lessonloom' ? 'LessonLoom' :
                   project.title}
                </h1>
                <span className="inline-block uppercase tracking-wide text-xs font-bold text-indigo-700 bg-indigo-50 rounded px-3 py-1">
                  {project.tagline}
                </span>
              </div>

              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close case study"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full h-64 md:h-80 relative overflow-hidden">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {renderCaseStudyContent()}
            </motion.div>
          </div>

          {/* Footer CTA */}
          <div className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Want to see more details?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Interested in learning more about this project or discussing similar challenges?
                  Let's connect to explore how thoughtful design can solve complex problems.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      View Live Project
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  <button
                    onClick={handleClose}
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Projects
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudySlideView;