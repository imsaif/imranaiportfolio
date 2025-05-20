import { motion } from 'framer-motion';
import React from 'react';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';

/**
 * Project Overview section for the EduScheduler case study.
 * @returns {JSX.Element}
 */
export const ProjectOverviewSection: React.FC = () => (
  <section id="overview" className="mb-20">
    <div className="flex items-center mb-12">
      <CaseStudyHeader level="h2" showGradientLine>
        Project Overview
      </CaseStudyHeader>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      <div className="bg-blue-50 p-8 rounded-2xl border-t-4 border-blue-400 shadow-md">
        <h3 className="text-gray-800 font-bold mb-3">Role</h3>
        <p className="text-gray-900">Lead Product Designer</p>
      </div>
      <div className="bg-purple-50 p-8 rounded-2xl border-t-4 border-purple-400 shadow-md">
        <h3 className="text-gray-800 font-bold mb-3">Organization</h3>
        <p className="text-gray-900">NewGlobe Education</p>
      </div>
      <div className="bg-pink-50 p-8 rounded-2xl border-t-4 border-pink-400 shadow-md">
        <h3 className="text-gray-800 font-bold mb-3">Technologies</h3>
        <p className="text-gray-900">React, Node.js, PostgreSQL, Optimization Algorithms</p>
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white p-8 rounded-xl shadow-md mb-12"
    >
      <p className="text-gray-700">
        Before EduScheduler, timetables were created manually—slow, error-prone, and inflexible. As Lead Product
        Designer, I worked with cross-functional teams to design an automated, adaptable scheduling system.
      </p>
    </motion.div>
  </section>
);
