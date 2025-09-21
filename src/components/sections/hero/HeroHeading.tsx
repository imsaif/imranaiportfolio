'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeroHeadingProps {
  isVisible: boolean;
  aiTextOptions: string[];
}

const HeroHeading = ({ isVisible }: HeroHeadingProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const morphWords = ['AI-powered', 'human-first'];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Force client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Timed automatic cycling every 5.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % morphWords.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // If not mounted yet (server-side), render a placeholder
  if (!isMounted) {
    return (
      <motion.div
        key="heading-content-placeholder"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 xs:mb-6 md:mb-8 leading-tight tracking-tight">
          <span className="inline">Designing AI-powered experiences</span>
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
        className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center"
        style={{ willChange: 'opacity' }}
      >
        <h1
          className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 xs:mb-6 md:mb-8 tracking-tight leading-tight transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          Designing{' '}
          <span className="inline-block align-baseline relative" style={{ minWidth: 'auto' }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={morphWords[currentIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="gradient-text animate-gradient font-semibold"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), var(--tertiary))',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'inline-block',
                  position: 'relative',
                  paddingBottom: '5px',
                }}
                aria-live="polite"
              >
                {morphWords[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </span>{' '}
          experiences
        </h1>

        <p
          className={`text-sm xs:text-base sm:text-lg md:text-xl text-muted mb-6 xs:mb-8 md:mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          Senior product designer leading teams to craft the future of AI
        </p>
      </motion.div>
    </>
  );
};

export default HeroHeading;
