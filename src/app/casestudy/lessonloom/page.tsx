'use client';

import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { CaseStudyTabs } from './components/CaseStudyTabs';

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="w-full relative"
      >
        <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
          <Image
            src="/images/casestudy/lessonloom/lessonloomboard.png"
            alt="LessonLoom: Automated Lesson Generation Platform"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        </div>
      </motion.div>

      {/* Main Tabs Content */}
      <CaseStudyTabs />

      {/* Footer */}
      <CaseStudyFooter />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}
