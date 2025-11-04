'use client';

import Image from 'next/image';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import ProgressBar from '@/components/ui/ProgressBar';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { CaseStudyTabs } from '../components/CaseStudyTabs';
import { useState } from 'react';

export default function StrategicUHGCaseStudyPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <div className="bg-white min-h-screen">
      <ProgressBar progress={scrollProgress} />

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

      {/* Introduction Section */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="mb-12 text-center">
          <CaseStudyHeader level="h1" className="mb-6">
            Optum Bank: HSA Reimbursement Platform Redesign
          </CaseStudyHeader>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Led the strategic transformation of the HSA reimbursement system affecting 3.2M users and $2.8B in annual transactions. Improved task completion from 1.1% to 76% while generating $4.7M in revenue impact.
          </p>
        </div>
      </div>

      {/* Tabbed Content */}
      <CaseStudyTabs />

      {/* Footer */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <CaseStudyFooter />
      </div>

      <ScrollToTopButton targetId="overview" />
    </div>
  );
}
