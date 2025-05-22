import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

/**
 * Introduction section for the EduScheduler case study.
 * @param {object} props
 * @param {ReactNode} [props.children] - Optional children to render above the subtext (e.g., the title)
 * @returns {JSX.Element}
 */
export const IntroductionSection: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <motion.div
    id="introduction"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="bg-gradient-to-r from-blue-50 via-white to-purple-50 p-8 mb-16 rounded-xl flex flex-col items-center justify-center text-center border border-blue-200/60 shadow-sm"
  >
    {children}
    <p className="text-lg text-gray-700">
      EduScheduler was built to help NewGlobe Education quickly generate optimized teaching schedules for hundreds of
      schools worldwide.
    </p>
  </motion.div>
);
