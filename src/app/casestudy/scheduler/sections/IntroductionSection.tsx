import { motion } from 'framer-motion';
import React from 'react';

/**
 * Introduction section for the EduScheduler case study.
 * @returns {JSX.Element}
 */
export const IntroductionSection: React.FC = () => (
  <motion.div
    id="introduction"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="bg-white p-8 rounded-xl border-l-4 border-blue-400 shadow-sm mb-16"
  >
    <p className="text-lg text-gray-700">
      EduScheduler was built to help NewGlobe Education quickly generate optimized teaching schedules for hundreds of
      schools worldwide.
    </p>
  </motion.div>
);
