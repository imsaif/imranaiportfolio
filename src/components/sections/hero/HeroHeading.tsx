'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Simple TextType component based on your reference
const TextType = ({ text, typingSpeed = 75, pauseDuration = 1500, showCursor = true, cursorCharacter = "|", className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);

  const textArray = Array.isArray(text) ? text : [text];

  // Typewriter effect
  useEffect(() => {
    let timeout;
    const currentText = textArray[currentTextIndex];

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex(prev => (prev + 1) % textArray.length);
        setCurrentCharIndex(0);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, typingSpeed / 2);
      }
    } else {
      if (currentCharIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(prev => prev + currentText[currentCharIndex]);
          setCurrentCharIndex(prev => prev + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentCharIndex, isDeleting, currentTextIndex, textArray, typingSpeed, pauseDuration]);

  // Cursor blinking
  useEffect(() => {
    if (!showCursor) return;

    const cursorInterval = setInterval(() => {
      setShowCursorState(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [showCursor]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span style={{ opacity: showCursorState ? 1 : 0 }}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

interface HeroHeadingProps {
  isVisible: boolean;
  aiTextOptions: string[];
}

const HeroHeading = ({ isVisible }: HeroHeadingProps) => {
  const [isMounted, setIsMounted] = useState(false);

  // Force client-side rendering
  useEffect(() => {
    setIsMounted(true);
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
          <span className="inline">Turning complexity into simplicity</span>
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
          Turning{' '}
          <TextType
            text={["complexity", "confusion", "chaos", "clutter"]}
            typingSpeed={100}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
            className="font-semibold"
          /> into<br /><span
            className="font-semibold"
            style={{
              background: 'linear-gradient(90deg, #3B82F6 0%, #EC4899 100%)',
              backgroundSize: '100% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block',
              paddingBottom: '5px',
              marginBottom: '-5px',
              marginTop: '1.5rem',
            }}
          >
            simplicity
          </span>
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
