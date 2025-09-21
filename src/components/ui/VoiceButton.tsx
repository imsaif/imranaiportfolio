'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface VoiceButtonProps {
  isVisible: boolean;
  isActive: boolean;
  onClick: () => void;
}

const VoiceButton = ({ isVisible, isActive, onClick }: VoiceButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Generate sound bar animations
  const soundBars = Array.from({ length: 5 }, (_, index) => {
    const baseHeight = 4;
    const maxHeight = 16;
    const delay = index * 0.1;

    return (
      <motion.div
        key={index}
        className="w-[2px] rounded-full"
        style={{
          background: 'linear-gradient(to top, #7075e0, #e0637c)',
        }}
        animate={{
          height: isActive
            ? [baseHeight, maxHeight, baseHeight]
            : isHovered
            ? [baseHeight, maxHeight * 0.8, baseHeight]
            : [baseHeight, maxHeight * 0.5, baseHeight],
          opacity: isActive ? 1 : isHovered ? 0.9 : 0.7,
        }}
        transition={{
          height: {
            duration: isActive ? 0.6 : isHovered ? 0.8 : 1.5,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          },
          opacity: {
            duration: 0.3,
            ease: "easeInOut",
          },
        }}
      />
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 10
      }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="flex flex-col items-center gap-3 mt-6 xs:mt-7 sm:mt-8"
    >
      {/* Nudge text */}
      <span className="text-sm text-muted-foreground/70 font-medium">
        Ask me about my projects
      </span>

      <div className="flex flex-col items-center gap-2">
        {/* Voice button with gradient border */}
        <div
          className="relative p-[2px] rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #7075e0, #e0637c)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={onClick}
            className={`
              relative flex items-center justify-center w-12 h-12 rounded-full
              transition-all duration-300 ease-out
              ${isActive
                ? 'bg-accent text-accent-foreground scale-105'
                : 'bg-background hover:bg-accent/5 hover:scale-105'
              }
              focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2
              group
            `}
            aria-label="Start voice conversation"
          >
            {/* Microphone icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`
                transition-all duration-300
                ${isActive ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-accent'}
              `}
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>

            {/* Subtle pulse effect when active */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-accent/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </button>
        </div>

        {/* Animated sound bars */}
        <div className="flex items-end gap-[2px] h-4">
          {soundBars}
        </div>
      </div>
    </motion.div>
  );
};

export default VoiceButton;