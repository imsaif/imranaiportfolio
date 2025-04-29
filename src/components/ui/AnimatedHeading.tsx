'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

interface AnimatedHeadingProps {
  /**
   * Heading level (1-4). Defaults to 2.
   */
  level?: 1 | 2 | 3 | 4;
  /**
   * Text alignment.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Additional class names.
   */
  className?: string;
  /**
   * Heading content.
   */
  children: React.ReactNode;
}

const headingSizes = {
  1: 'text-4xl md:text-5xl font-extrabold',
  2: 'text-3xl md:text-4xl font-bold',
  3: 'text-2xl md:text-3xl font-bold',
  4: 'text-xl md:text-2xl font-semibold',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right ml-auto',
};

export const AnimatedHeading = ({ level = 2, align = 'left', className = '', children }: AnimatedHeadingProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };
  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
    },
  };

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div className={`mb-12 ${alignClasses[align]} ${className}`.trim()}>
      <motion.div
        ref={ref}
        initial={prefersReducedMotion ? false : 'hidden'}
        animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
        variants={textVariants}
        style={{ display: 'inline-block', position: 'relative' }}
      >
        <HeadingTag className={`inline-block ${headingSizes[level]} relative`} tabIndex={-1}>
          {children}
        </HeadingTag>
        {/* Underline */}
        <motion.span
          className="block h-1 bg-gradient-to-r from-accent to-tertiary rounded-full mt-2 origin-left"
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
          variants={underlineVariants}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
};

export default AnimatedHeading;
