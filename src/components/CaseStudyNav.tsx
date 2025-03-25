'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from './Icons';

export default function CaseStudyNav() {
  return (
    <motion.nav 
      className="py-4 mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        href="/" 
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Back to Portfolio</span>
      </Link>
    </motion.nav>
  );
} 