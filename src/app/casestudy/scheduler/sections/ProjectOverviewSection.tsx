import { motion } from 'framer-motion';
import React from 'react';

/**
 * Project Overview section for the EduScheduler case study.
 * @returns {JSX.Element}
 */
export const ProjectOverviewSection: React.FC = () => (
  <section id="overview" className="mb-20">
    <div className="flex flex-col md:flex-row gap-10 items-stretch">
      {/* Left: Grouped stats in accent block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 rounded-xl p-6 space-y-3 md:w-1/3 w-full border border-gray-200 bg-white"
      >
        <div className="border border-gray-200 rounded-lg p-3 bg-white">
          <div className="text-xs text-gray-500">Role</div>
          <div className="text-base font-semibold text-gray-900">Lead Product Designer</div>
        </div>
        <div className="border border-gray-200 rounded-lg p-3 bg-white">
          <div className="text-xs text-gray-500">Organization</div>
          <div className="text-base font-semibold text-gray-900">NewGlobe Education</div>
        </div>
        <div className="border border-gray-200 rounded-lg p-3 bg-white">
          <div className="text-xs text-gray-500">Technologies</div>
          <div className="text-base font-semibold text-gray-900">React, Node.js, PostgreSQL</div>
        </div>
      </motion.div>
      {/* Right: Narrative */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm p-8 flex items-center border border-gray-200 bg-white"
      >
        <p className="text-gray-700 text-lg">
          Before EduScheduler, timetables were created manually—slow, error-prone, and inflexible. As Lead Product
          Designer, I worked with cross-functional teams to design an automated, adaptable scheduling system.
        </p>
      </motion.div>
    </div>
  </section>
);
