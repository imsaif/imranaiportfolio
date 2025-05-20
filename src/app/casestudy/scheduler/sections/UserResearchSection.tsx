import { motion } from 'framer-motion';
import React from 'react';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';

/**
 * User Research & Problem Definition section for the EduScheduler case study.
 * @returns {JSX.Element}
 */
export const UserResearchSection: React.FC = () => (
  <section id="process" className="mb-20">
    <div className="flex items-center mb-8">
      <CaseStudyHeader level="h2" showGradientLine>
        User Research & Problem Definition
      </CaseStudyHeader>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 rounded-xl shadow-md"
    >
      <p className="text-gray-800 mb-6">
        I ran in-depth research to understand pain points and workflows for all stakeholders.
      </p>
      <p className="text-gray-700 mb-8">
        We used interviews, on-site observation, workshops, and system analysis to find bottlenecks and define solution
        requirements.
      </p>
      <h3 className="text-gray-800 font-bold mb-6">Research Methods</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-blue-50 p-6 rounded-xl">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h4 className="font-bold text-gray-800">Stakeholder Interviews</h4>
          </div>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>12 interviews across 3 groups</li>
            <li>Mapped goals and workflow issues</li>
            <li>Documented scheduling needs</li>
          </ul>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl">
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h4 className="font-bold text-gray-800">Process Shadowing</h4>
          </div>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>5 days observing timetable creation</li>
            <li>Mapped end-to-end workflow</li>
            <li>Found process bottlenecks</li>
          </ul>
        </div>
        <div className="bg-pink-50 p-6 rounded-xl">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h4 className="font-bold text-gray-800">Collaborative Workshops</h4>
          </div>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Facilitated rule identification sessions</li>
            <li>Created journey maps with teams</li>
            <li>Prioritized requirements together</li>
          </ul>
        </div>
        <div className="bg-green-50 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="text-green-600 mr-3">
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
            <h4 className="font-bold text-gray-800">System Analysis</h4>
          </div>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Audited legacy system</li>
            <li>Reviewed docs and data flows</li>
            <li>Found technical gaps</li>
          </ul>
        </div>
      </div>
      <h3 className="text-gray-800 font-bold mb-6">User Personas</h3>
      <p className="text-gray-700 mb-8">Through this research, I developed three key personas:</p>
      {/* ...User personas and pain points table would go here, can be further split if needed... */}
    </motion.div>
  </section>
);
