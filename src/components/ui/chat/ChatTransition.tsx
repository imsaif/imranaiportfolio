'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useCallback } from 'react';

interface ChatTransitionProps {
  onComplete: () => void;
}

/**
 * Component that handles the multi-stage transition animation
 * when opening the chat interface. Provides visual feedback during
 * the "AI thinking" process before displaying the actual chat.
 */
const ChatTransition = ({ onComplete }: ChatTransitionProps) => {
  // Animation stages:
  // 1 = AI connecting/thinking animation
  // 2 = Container fades in
  // 3 = Initial content reveals
  const [stage, setStage] = useState(1);

  // Maintain scroll position during stage transitions
  const updateStage = useCallback((newStage: number) => {
    // Store the current scroll position
    const scrollY = window.scrollY;

    // Update the stage
    setStage(newStage);

    // Use RAF to ensure the scroll position is maintained after the state update
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }, []);

  // Call completion handler with scroll preservation
  const completeTransition = useCallback(() => {
    // Store the current scroll position
    const scrollY = window.scrollY;

    // Call the completion handler
    onComplete();

    // Restore scroll position
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }, [onComplete]);

  useEffect(() => {
    // Stage 1: Show thinking animation for 1.4 seconds
    const timer1 = setTimeout(() => updateStage(2), 1400);

    // Stage 2: Container fade-in (0.8 seconds)
    const timer2 = setTimeout(() => updateStage(3), 2200);

    // Stage 3: Complete the animation after messages appear
    const timer3 = setTimeout(() => completeTransition(), 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [updateStage, completeTransition]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <AnimatePresence mode="wait">
        {/* Stage 1: AI Thinking Animation */}
        {stage === 1 && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            {/* Text label */}
            <motion.p
              className="text-lg font-medium text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Imran is typing...
            </motion.p>

            {/* Gradient dots animation */}
            <div className="flex space-x-2 mt-2">
              {[1, 2, 3].map(dot => (
                <motion.div
                  key={dot}
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #f43f5e)',
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'loop',
                    delay: (dot - 1) * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Stage 2-3: Container and Content */}
        {stage >= 2 && (
          <motion.div
            key="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                {/* This will be replaced with the actual chat content */}
                <div className="bg-card-bg border border-card-border rounded-lg p-4 shadow-md h-full">
                  {/* Content will be inserted here */}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatTransition;
