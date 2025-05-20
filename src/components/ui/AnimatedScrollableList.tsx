'use client';

import { motion, useReducedMotion } from 'framer-motion';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Props for AnimatedScrollableList
 */
export type AnimatedScrollableListProps = {
  /** List of items to display (React nodes) */
  items: React.ReactNode[];
  /** Optional className for container */
  className?: string;
};

/**
 * AnimatedScrollableList
 * Resets scroll/index to 1 when entering viewport.
 * @param {AnimatedScrollableListProps} props
 */
export const AnimatedScrollableList: React.FC<AnimatedScrollableListProps> = ({ items, className = '' }) => {
  const [index, setIndex] = useState(1); // 1-based index
  const listRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 1 });
  const shouldReduceMotion = useReducedMotion();

  // Reset index to 1 when entering viewport
  useEffect(() => {
    if (inView) setIndex(1);
  }, [inView]);

  // Optional: Scroll to top if using scrollable container
  useEffect(() => {
    if (inView && listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  }, [inView, shouldReduceMotion]);

  // Handler for next/prev (if needed)
  const handleNext = useCallback(() => setIndex(i => Math.min(i + 1, items.length)), [items.length]);
  const handlePrev = useCallback(() => setIndex(i => Math.max(i - 1, 1)), []);

  return (
    <motion.div
      ref={ref}
      className={`overflow-auto max-h-64 rounded-lg shadow bg-white dark:bg-gray-900 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      aria-live="polite"
      tabIndex={0}
      role="region"
      aria-label="Animated Scrollable List"
    >
      <div ref={listRef} className="flex flex-col items-center justify-center min-h-32">
        {items[index - 1]}
      </div>
      <div className="flex justify-between items-center mt-2 px-2">
        <button
          onClick={handlePrev}
          disabled={index === 1}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 focus:outline-none focus:ring"
          aria-label="Previous item"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {index} / {items.length}
        </span>
        <button
          onClick={handleNext}
          disabled={index === items.length}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 focus:outline-none focus:ring"
          aria-label="Next item"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};
