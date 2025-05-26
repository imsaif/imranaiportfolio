'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { ArrowLeft } from '@/components/Icons';

export default function CaseStudyFooter() {
  const pathname = usePathname();

  // Determine which case study is being viewed
  const isSchedulerCaseStudy = pathname?.includes('/scheduler');
  const isLessonLoomCaseStudy = pathname?.includes('/lessonloom');

  // Set the other case study link and title
  const otherCaseStudyLink = isSchedulerCaseStudy ? '/casestudy/lessonloom' : '/casestudy/scheduler';
  const otherCaseStudyTitle = isSchedulerCaseStudy ? 'LessonLoom Case Study' : 'EduScheduler Case Study';

  return (
    <motion.div
      className="mt-24 py-10 border-t border-gray-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Looking for more?</h3>
          <p className="text-muted text-sm">Check out my other projects</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="inline-flex rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 p-[1.5px] hover:from-purple-700 hover:via-pink-600 hover:to-blue-700 transition-all duration-300">
            <Link
              href="/"
              className="px-6 py-3 bg-white text-gray-700 rounded-xl flex items-center transition-all duration-200 group hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          <div className="inline-flex rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 p-[1.5px] hover:from-purple-700 hover:via-pink-600 hover:to-blue-700 transition-all duration-300">
            <Link
              href={otherCaseStudyLink}
              className="px-6 py-3 bg-white text-gray-700 rounded-xl flex items-center transition-all duration-200 hover:bg-gray-50"
            >
              <span className="font-medium">{otherCaseStudyTitle}</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
