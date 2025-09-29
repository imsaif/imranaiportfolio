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
    label: 'About',
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
        className="w-5 h-5 xs:w-6 xs:h-6 sm:w-5 sm:h-5"
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
        className="w-5 h-5 xs:w-6 xs:h-6 sm:w-5 sm:h-5"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
        className="w-5 h-5 xs:w-6 xs:h-6 sm:w-5 sm:h-5"
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
        className="w-5 h-5 xs:w-6 xs:h-6 sm:w-5 sm:h-5"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  });

  // Create dynamic modes array
  const dynamicModes = [
    modes.find(m => m.id === 'portfolio'), // About
    getChatMode(), // Chat/Close
  ].filter((mode): mode is { id: Mode; label: string; icon: React.ReactNode } => mode !== undefined);

  return (
    <>
      <div
        className={`relative flex items-center justify-center p-[2px] rounded-full transition-all duration-500 backdrop-blur-sm shadow-lg ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          background: 'linear-gradient(135deg, #7075e0, #e0637c)',
          padding: '2px'
        }}
      >
        <div className="relative flex items-center justify-center w-full h-full bg-background rounded-full">
          {dynamicModes.map(mode => (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`relative flex items-center gap-2 px-6 py-4 xs:px-7 xs:py-4 sm:px-8 sm:py-4 text-sm xs:text-base sm:text-sm font-medium transition-all duration-300 rounded-full ${
                currentMode === mode.id ? 'text-white font-semibold scale-105' : 'text-muted-foreground hover:text-foreground hover:scale-105'
              }`}
              aria-label={`Switch to ${mode.label} mode`}
            >
              {mode.icon}
              <span className="hidden sm:inline">{mode.label}</span>
              {currentMode === mode.id && (
                <motion.div
                  layoutId="activeMode"
                  className="absolute inset-0 rounded-full -z-10 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #7075e0, #e0637c)',
                  }}
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
