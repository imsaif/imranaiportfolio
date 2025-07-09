'use client';

import { motion } from 'framer-motion';
import React from 'react';

export type Mode = 'portfolio' | 'chat' | 'voice';

interface ModeToggleProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
  isVisible: boolean;
  isChatOpen?: boolean;
}

const modes: { id: Mode; label: string; icon: React.ReactNode }[] = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 xs:w-8 xs:h-8 sm:w-5 sm:h-5"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 xs:w-8 xs:h-8 sm:w-5 sm:h-5"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'voice',
    label: 'Voice',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 xs:w-8 xs:h-8 sm:w-5 sm:h-5"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
  },
];

const ModeToggle = ({ currentMode, onModeChange, isVisible, isChatOpen }: ModeToggleProps) => {
  // Create a dynamic chat mode based on chat state
  const getChatMode = () => ({
    id: 'chat' as Mode,
    label: isChatOpen ? 'Close' : 'Chat',
    icon: isChatOpen ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 xs:w-8 xs:h-8 sm:w-5 sm:h-5"
      >
        <path d="m18 6-12 12" />
        <path d="m6 6 12 12" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 xs:w-8 xs:h-8 sm:w-5 sm:h-5"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  });

  // Create dynamic modes array
  const dynamicModes = [
    modes.find(m => m.id === 'portfolio'), // Portfolio
    getChatMode(), // Chat/Close
    modes.find(m => m.id === 'voice'), // Voice
  ].filter(Boolean); // Remove any undefined values

  return (
    <>
      <div
        className={`relative flex items-center justify-center p-[2px] rounded-full transition-all duration-500 border border-border/30 bg-background/50 backdrop-blur-sm shadow-lg ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="relative flex items-center justify-center w-full h-full bg-background rounded-full border border-border/20">
          {dynamicModes.map(mode => (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`relative flex items-center gap-2 px-10 py-6 xs:px-8 xs:py-5 sm:px-8 sm:py-4 text-sm xs:text-base sm:text-sm font-medium transition-colors rounded-full ${
                currentMode === mode.id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={`Switch to ${mode.label} mode`}
            >
              {mode.icon}
              <span className="hidden sm:inline">{mode.label}</span>
              {currentMode === mode.id && (
                <motion.div
                  layoutId="activeMode"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ModeToggle;
