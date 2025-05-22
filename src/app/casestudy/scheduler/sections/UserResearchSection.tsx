import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import UserPersonasSection from './UserPersonasSectionNEW';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';

/**
 * Card data type for research steps
 */
type ResearchCard = {
  border: string;
  iconClass: string;
  title: string;
  description: string;
  findings: string[];
  impact: string;
};

/**
 * User Research & Problem Definition section for the EduScheduler case study.
 * @returns {JSX.Element}
 */
export const UserResearchSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Card data
  const cards: ResearchCard[] = [
    {
      border: 'border-blue-300',
      iconClass: 'text-blue-600',
      title: 'Stakeholder Interviews',
      description:
        'In-depth conversations with academic directors, digital production, and schools teams to uncover real scheduling needs and pain points.',
      findings: ['12 interviews across 3 groups', 'Mapped goals and workflow issues', 'Documented scheduling needs'],
      impact: 'Helped define core requirements and surfaced hidden workflow blockers.',
    },
    {
      border: 'border-purple-300',
      iconClass: 'text-purple-600',
      title: 'Process Shadowing',
      description:
        'Observed the end-to-end timetable creation process in real school environments to identify bottlenecks and inefficiencies.',
      findings: ['5 days observing timetable creation', 'Mapped end-to-end workflow', 'Found process bottlenecks'],
      impact: 'Revealed manual steps and delays, informing automation priorities.',
    },
    {
      border: 'border-pink-300',
      iconClass: 'text-pink-600',
      title: 'Collaborative Workshops',
      description:
        'Facilitated sessions with stakeholders to co-create journey maps, identify rules, and prioritize requirements.',
      findings: [
        'Facilitated rule identification sessions',
        'Created journey maps with teams',
        'Prioritized requirements together',
      ],
      impact: 'Built consensus and ensured all voices were heard in the design process.',
    },
    {
      border: 'border-green-300',
      iconClass: 'text-green-600',
      title: 'System Analysis',
      description:
        'Audited the legacy scheduling system, reviewed documentation, and analyzed data flows to find technical gaps.',
      findings: ['Audited legacy system', 'Reviewed docs and data flows', 'Found technical gaps'],
      impact: 'Identified integration challenges and opportunities for improvement.',
    },
  ];

  // Height: each card is 340px + gap, so set container height accordingly
  const containerHeight = `${cards.length * 340 + (cards.length - 1) * 24}px`;

  // Manually create refs and hooks for each card
  const cardRef0 = useRef<HTMLDivElement>(null);
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);

  const { scrollYProgress: scrollYProgress0 } = useScroll({
    target: cardRef0,
    container: containerRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: cardRef1,
    container: containerRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: cardRef2,
    container: containerRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: cardRef3,
    container: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale0 = useTransform(scrollYProgress0, [0, 0.5, 1], [0.96, 1, 0.96]);
  const scale1 = useTransform(scrollYProgress1, [0, 0.5, 1], [0.96, 1, 0.96]);
  const scale2 = useTransform(scrollYProgress2, [0, 0.5, 1], [0.96, 1, 0.96]);
  const scale3 = useTransform(scrollYProgress3, [0, 0.5, 1], [0.96, 1, 0.96]);

  const boxShadow0 = useTransform(
    scrollYProgress0,
    [0, 0.5, 1],
    [
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
      '0 6px 18px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.08)',
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
    ]
  );
  const boxShadow1 = useTransform(
    scrollYProgress1,
    [0, 0.5, 1],
    [
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
      '0 6px 18px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.08)',
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
    ]
  );
  const boxShadow2 = useTransform(
    scrollYProgress2,
    [0, 0.5, 1],
    [
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
      '0 6px 18px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.08)',
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
    ]
  );
  const boxShadow3 = useTransform(
    scrollYProgress3,
    [0, 0.5, 1],
    [
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
      '0 6px 18px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.08)',
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
    ]
  );

  return (
    <section id="process" className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-0"
      >
        <p className="text-gray-800 mb-6">
          I ran in-depth research to understand pain points and workflows for all stakeholders.
        </p>
        <p className="text-gray-700 mb-8">
          We used interviews, on-site observation, workshops, and system analysis to find bottlenecks and define
          solution requirements.
        </p>
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20" style={{ height: containerHeight }}>
          <div ref={containerRef} className="relative h-full">
            {/* Card 0 */}
            <motion.div
              ref={cardRef0}
              className="sticky top-24 z-[10] border-blue-300 shadow-md p-6 sm:p-8 lg:p-12 rounded-xl flex flex-col mb-8 w-full h-[340px] bg-blue-50"
              style={{ scale: scale0, boxShadow: boxShadow0 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-blue-600 mr-3">
                  {/* SVG icon */}
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-lg">Stakeholder Interviews</h4>
              </div>
              <div className="text-gray-700 text-base mb-2">
                In-depth conversations with academic directors, digital production, and schools teams to uncover real
                scheduling needs and pain points.
              </div>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                <li>12 interviews across 3 groups</li>
                <li>Mapped goals and workflow issues</li>
                <li>Documented scheduling needs</li>
              </ul>
              <div
                className="mt-2 rounded-lg px-4 py-3 text-base flex items-start gap-2 bg-blue-100 text-blue-800 border-l-4 border-blue-400"
                aria-label="Key Insight"
              >
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1" />
                </svg>
                <span>Helped define core requirements and surfaced hidden workflow blockers.</span>
              </div>
            </motion.div>
            {/* Card 1 */}
            <motion.div
              ref={cardRef1}
              className="sticky top-36 z-[11] border-purple-300 shadow-md p-6 sm:p-8 lg:p-12 rounded-xl flex flex-col mb-8 w-full h-[340px] bg-purple-50"
              style={{ scale: scale1, boxShadow: boxShadow1 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-purple-600 mr-3">
                  {/* SVG icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-lg">Process Shadowing</h4>
              </div>
              <div className="text-gray-700 text-base mb-2">
                Observed the end-to-end timetable creation process in real school environments to identify bottlenecks
                and inefficiencies.
              </div>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                <li>5 days observing timetable creation</li>
                <li>Mapped end-to-end workflow</li>
                <li>Found process bottlenecks</li>
              </ul>
              <div
                className="mt-2 rounded-lg px-4 py-3 text-base flex items-start gap-2 bg-purple-100 text-purple-800 border-l-4 border-purple-400"
                aria-label="Key Insight"
              >
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1" />
                </svg>
                <span>Revealed manual steps and delays, informing automation priorities.</span>
              </div>
            </motion.div>
            {/* Card 2 */}
            <motion.div
              ref={cardRef2}
              className="sticky top-48 z-[12] border-pink-300 shadow-md p-6 sm:p-8 lg:p-12 rounded-xl flex flex-col mb-8 w-full h-[340px] bg-pink-50"
              style={{ scale: scale2, boxShadow: boxShadow2 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-pink-600 mr-3">
                  {/* SVG icon */}
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
                <h4 className="font-bold text-gray-800 text-lg">Collaborative Workshops</h4>
              </div>
              <div className="text-gray-700 text-base mb-2">
                Facilitated sessions with stakeholders to co-create journey maps, identify rules, and prioritize
                requirements.
              </div>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                <li>Facilitated rule identification sessions</li>
                <li>Created journey maps with teams</li>
                <li>Prioritized requirements together</li>
              </ul>
              <div
                className="mt-2 rounded-lg px-4 py-3 text-base flex items-start gap-2 bg-pink-100 text-pink-800 border-l-4 border-pink-400"
                aria-label="Key Insight"
              >
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1" />
                </svg>
                <span>Built consensus and ensured all voices were heard in the design process.</span>
              </div>
            </motion.div>
            {/* Card 3 */}
            <motion.div
              ref={cardRef3}
              className="sticky top-60 z-[13] border-green-300 shadow-md p-6 sm:p-8 lg:p-12 rounded-xl flex flex-col mb-8 w-full h-[340px] bg-green-50"
              style={{ scale: scale3, boxShadow: boxShadow3 }}
            >
              <div className="flex items-center mb-3">
                <div className="text-green-600 mr-3">
                  {/* SVG icon */}
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-lg">System Analysis</h4>
              </div>
              <div className="text-gray-700 text-base mb-2">
                Audited the legacy scheduling system, reviewed documentation, and analyzed data flows to find technical
                gaps.
              </div>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                <li>Audited legacy system</li>
                <li>Reviewed docs and data flows</li>
                <li>Found technical gaps</li>
              </ul>
              <div
                className="mt-2 rounded-lg px-4 py-3 text-base flex items-start gap-2 bg-green-100 text-green-800 border-l-4 border-green-400"
                aria-label="Key Insight"
              >
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1" />
                </svg>
                <span>Identified integration challenges and opportunities for improvement.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
