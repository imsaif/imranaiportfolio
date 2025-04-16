'use client';

import { motion } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';

import { useMouseTracking, applyGradientShift } from '../../../hooks/useMouseTracking';
import { useTextCycling } from '../../../hooks/useTextCycling';

interface HeroHeadingProps {
  isVisible: boolean;
  aiTextOptions: string[];
}

const HeroHeading = ({ isVisible, aiTextOptions }: HeroHeadingProps) => {
  const gradientTextRef = useRef<HTMLSpanElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Force client-side rendering and check mobile status
  useEffect(() => {
    setIsMounted(true);
    // Check screen size on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint: 768px
    };
    checkMobile();
    // Optional: Add resize listener if needed
    // window.addEventListener('resize', checkMobile);
    // return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set up text cycling for the dynamic text options - ONLY if not mobile
  const { currentText, typing } = useTextCycling({
    texts: aiTextOptions && aiTextOptions.length > 0 ? aiTextOptions : [''], // Ensure texts is not empty
    typingSpeed: 2000,
    pauseDuration: 3000,
    charSpeed: 40,
    // Disable autostart if mobile, let hook handle initial state
    autoStart: !isMobile,
  });

  // Determine text and cursor visibility based on screen size
  const displayText = isMobile ? (aiTextOptions[0] || '') : currentText;
  const showCursor = !isMobile && typing;

  // Set up mouse tracking for the gradient effect
  const { elementRef } = useMouseTracking<HTMLDivElement>({
    onMouseMove: (element, position) => {
      if (gradientTextRef.current) {
        applyGradientShift(gradientTextRef.current, position);
      }
    },
  });

  // If not mounted yet (server-side), render a placeholder
  if (!isMounted) {
    return (
      <motion.div
        key="heading-content-placeholder"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-center"
      >
        <h1 className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 xs:mb-6 md:mb-8 leading-tight tracking-tight">
          <span className="inline">Creating experiences with purpose and precision.</span>
        </h1>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        key="heading-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-center"
        style={{ willChange: 'opacity' }}
        ref={elementRef}
      >
        <h1
          className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 xs:mb-6 md:mb-8 tracking-tight transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          Creating{' '}
          <span
            className="inline-block align-baseline"
            style={{}}
          >
            <span
              ref={gradientTextRef}
              style={{
                background: 'linear-gradient(135deg, var(--accent), var(--tertiary), var(--accent))',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
                position: 'relative',
                animation: 'gradientFlow 4s ease infinite',
                paddingBottom: '5px',
              }}
            >
              {displayText}
              {showCursor && (
                <span
                  style={{
                    position: 'absolute',
                    right: '-2px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '60%',
                    width: '3px',
                    backgroundColor: 'var(--accent)',
                    display: 'inline-block',
                    opacity: 0.9,
                    animation: 'blink 0.7s step-end infinite',
                  }}
                />
              )}
            </span>
          </span>{' '}
          experiences with purpose and precision.
        </h1>

        <p
          className={`text-base xs:text-lg md:text-xl text-muted mb-6 xs:mb-8 max-w-2xl leading-relaxed transition-all duration-700 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          I'm a Product Designer specialized in AI experience design, creating thoughtful interfaces for intelligent
          systems that balance automation with human-centered control.
        </p>
      </motion.div>
    </>
  );
};

export default HeroHeading;
