'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

import CaseStudyNav from '@/components/case-studies/CaseStudyNav';
import CaseStudyHeader from '@/components/CaseStudyHeader';
import { Container } from '@/components/Container';

export default function CaseStudy() {
  return (
    <>
      <CaseStudyNav />
      <div className="pt-16">{/* Rest of your case study content */}</div>
      <footer className="mt-16 py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="text-purple-700 hover:text-purple-900 font-medium mb-4 md:mb-0">
              ← Back to Portfolio
            </Link>

            <div className="flex space-x-4">
              <Link href="/case-study-2" className="text-gray-600 hover:text-purple-700">
                Next Case Study →
              </Link>
              {/* Add other navigation links as needed */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
