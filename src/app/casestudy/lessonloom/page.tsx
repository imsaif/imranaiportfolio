'use client';

import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { CaseStudyTabs } from './components/CaseStudyTabs';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl top-20 -left-48"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl bottom-20 -right-48"
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            className="text-center max-w-4xl mx-auto px-6"
            {...fadeIn}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              LessonLoom
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-indigo-100 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              AI-Powered Lesson Generation Platform for Global Education
            </motion.p>
            <motion.p
              className="text-lg text-indigo-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Reducing lesson creation from hours to minutes while maintaining curriculum alignment and educator quality standards across 200+ schools globally.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.section>

      {/* Main Tabs Content */}
      <CaseStudyTabs />

      {/* Footer */}
      <CaseStudyFooter />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}
