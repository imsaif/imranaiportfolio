'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import ChatInterface from '../../ui/ChatInterface';

interface HeroChatSectionProps {
  closeChat: (e?: React.MouseEvent) => void;
}

const HeroChatSection = ({ closeChat }: HeroChatSectionProps) => {
  const [isReady, setIsReady] = useState(false);

  // Simple transition after component mount
  setTimeout(() => {
    setIsReady(true);
  }, 200);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: 100 }}
    >
      <div
        className="chat-container backdrop-blur-md bg-gradient-to-br from-white/60 to-white/30 rounded-lg sm:rounded-xl h-full w-full max-w-full max-h-full flex flex-col overflow-hidden p-2 sm:p-6"
        style={{
          position: 'relative',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.07)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {isReady && <ChatInterface closeChat={closeChat} />}

        {/* Gradient border styles - matching the "Chat with my AI" button */}
        <style jsx>{`
          .chat-container::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 0.5rem;
            padding: 2px;
            background: linear-gradient(45deg, var(--accent), var(--tertiary));
            background-size: 200% 200%;
            animation: gradientShift 4s ease infinite;
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            z-index: 10;
            pointer-events: none;
          }
        `}</style>
      </div>
    </motion.div>
  );
};

export default HeroChatSection;
