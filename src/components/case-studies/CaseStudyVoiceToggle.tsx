'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { ConversationLimits } from '../../services/hybridConversationalAgent';
// import CaseStudyConversationalAgent from './CaseStudyConversationalAgent';

interface CaseStudyVoiceToggleProps {
  caseStudyId: string;
  caseStudyTitle: string;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  limits?: Partial<ConversationLimits>;
  disabled?: boolean;
}

const CaseStudyVoiceToggle: React.FC<CaseStudyVoiceToggleProps> = ({
  caseStudyId,
  caseStudyTitle,
  className = '',
  position = 'bottom-right',
  limits = {
    maxPremiumMinutes: 3, // 3 minutes premium per session (~$0.50 max cost)
    maxDailyConversations: 5, // 5 conversations per day
    premiumCooldownHours: 1, // 1 hour between premium sessions
  },
  disabled = false,
}) => {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  const handleToggleAgent = () => {
    if (disabled) return;
    setIsAgentOpen(!isAgentOpen);
  };

  const handleCloseAgent = () => {
    setIsAgentOpen(false);
  };

  return (
    <>
      {/* Floating Voice Toggle Button */}
      <motion.div
        className={`fixed ${getPositionClasses()} z-40 ${className}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 30 }}
      >
        <motion.button
          onClick={handleToggleAgent}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          disabled={disabled}
          className={`
            relative group flex items-center justify-center
            w-14 h-14 rounded-full shadow-lg
            transition-all duration-300 ease-out
            ${
              disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : isAgentOpen
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
            }
            ${!disabled && 'hover:shadow-xl hover:scale-110'}
          `}
          whileHover={!disabled ? { scale: 1.1 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
        >
          {/* Pulsing ring effect */}
          {!isAgentOpen && !disabled && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-30"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}

          {/* Icon */}
          <AnimatePresence mode="wait">
            {isAgentOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="microphone"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && !isAgentOpen && !disabled && (
            <motion.div
              initial={{ opacity: 0, x: position.includes('right') ? 10 : -10, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: position.includes('right') ? 10 : -10, y: 0 }}
              className={`
                absolute top-1/2 transform -translate-y-1/2
                ${position.includes('right') ? 'right-16' : 'left-16'}
                px-3 py-2 bg-black text-white text-sm rounded-lg
                whitespace-nowrap pointer-events-none
                shadow-lg
              `}
            >
              Talk about this case study
              <div
                className={`
                  absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-black rotate-45
                  ${position.includes('right') ? '-right-1' : '-left-1'}
                `}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disabled state tooltip */}
        <AnimatePresence>
          {isHovered && disabled && (
            <motion.div
              initial={{ opacity: 0, x: position.includes('right') ? 10 : -10, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: position.includes('right') ? 10 : -10, y: 0 }}
              className={`
                absolute top-1/2 transform -translate-y-1/2
                ${position.includes('right') ? 'right-16' : 'left-16'}
                px-3 py-2 bg-gray-600 text-white text-sm rounded-lg
                whitespace-nowrap pointer-events-none
                shadow-lg
              `}
            >
              Voice chat unavailable
              <div
                className={`
                  absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-600 rotate-45
                  ${position.includes('right') ? '-right-1' : '-left-1'}
                `}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {isAgentOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleCloseAgent}
          />
        )}
      </AnimatePresence>

      {/* Conversational Agent - Temporarily disabled for build fix */}
      {/* <CaseStudyConversationalAgent
        caseStudyId={caseStudyId}
        caseStudyTitle={caseStudyTitle}
        isVisible={isAgentOpen}
        onClose={handleCloseAgent}
        limits={limits}
      /> */}
    </>
  );
};

export default CaseStudyVoiceToggle;
