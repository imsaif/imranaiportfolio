import { motion } from 'framer-motion';
import React from 'react';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';

/**
 * Challenge section for the EduScheduler case study.
 * @returns {JSX.Element}
 */
export const ChallengeSection: React.FC = () => (
  <section id="challenge" className="mb-20">
    <div className="flex items-center mb-8">
      <CaseStudyHeader level="h2" showGradientLine>
        The Challenge
      </CaseStudyHeader>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 rounded-xl shadow-md"
    >
      <p className="text-gray-700 mb-8">
        NewGlobe faced major hurdles creating teaching materials for schools in different countries:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-start bg-gray-50 rounded-xl p-6 border-l-4 border-blue-200 shadow-sm">
          <span className="bg-blue-100 text-blue-500 rounded-full p-2 mr-4 flex items-center justify-center">
            {/* Clock Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <div>
            <div className="font-bold text-gray-900 mb-1">Time-intensive</div>
            <div className="text-gray-800">Manual guide creation took months</div>
          </div>
        </div>
        <div className="flex items-start bg-gray-50 rounded-xl p-6 border-l-4 border-pink-200 shadow-sm">
          <span className="bg-pink-100 text-pink-500 rounded-full p-2 mr-4 flex items-center justify-center">
            {/* Briefcase Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-7 4h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2zm2-10V5a2 2 0 114 0v1"
              />
            </svg>
          </span>
          <div>
            <div className="font-bold text-gray-900 mb-1">Resource drain</div>
            <div className="text-gray-800">Experts spent time on repetitive tasks</div>
          </div>
        </div>
        <div className="flex items-start bg-gray-50 rounded-xl p-6 border-l-4 border-yellow-200 shadow-sm">
          <span className="bg-yellow-100 text-yellow-500 rounded-full p-2 mr-4 flex items-center justify-center">
            {/* Check Badge Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
            </svg>
          </span>
          <div>
            <div className="font-bold text-gray-900 mb-1">Inconsistent quality</div>
            <div className="text-gray-800">Materials varied by writer</div>
          </div>
        </div>
        <div className="flex items-start bg-gray-50 rounded-xl p-6 border-l-4 border-green-200 shadow-sm">
          <span className="bg-green-100 text-green-500 rounded-full p-2 mr-4 flex items-center justify-center">
            {/* Globe Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c0 4.97 4.03 9 9 9m-9-9C7.03 3 3 7.03 3 12m9-9v18"
              />
            </svg>
          </span>
          <div>
            <div className="font-bold text-gray-900 mb-1">Localization delays</div>
            <div className="text-gray-800">Regional adaptation slowed expansion</div>
          </div>
        </div>
      </div>
      <p className="text-gray-700">
        Content creators needed a solution to free them from tedious formatting and let them focus on teaching quality.
      </p>
    </motion.div>
  </section>
);
