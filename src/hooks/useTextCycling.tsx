'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Configuration options for the text cycling animation
 */
export interface TextCyclingOptions {
  /** Array of texts to cycle through */
  texts: string[];
  /** Duration for typing animation in milliseconds */
  typingSpeed?: number;
  /** Duration to pause between animations in milliseconds */
  pauseDuration?: number;
  /** Whether to start automatically */
  autoStart?: boolean;
  /** Speed of typing each character in milliseconds */
  charSpeed?: number;
}

/**
 * Return type for the useTextCycling hook
 */
export interface TextCyclingResult {
  /** Current text being displayed */
  currentText: string;
  /** Opacity value for the text (0-1) */
  textOpacity: number;
  /** Whether the text is currently in typing mode */
  typing: boolean;
  /** Whether the text is currently in deleting mode */
  deleting: boolean;
  /** Current animation status */
  status: TextCyclingStatus;
  /** Function to manually advance to the next text */
  next: () => void;
}

/**
 * Possible states for the text cycling animation
 */
export type TextCyclingStatus = 'typing' | 'deleting' | 'pausing';

/**
 * A hook that cycles through a list of texts with typing-like animation
 *
 * @param options Configuration options for the text cycling
 * @returns Object containing the current state and controls
 */
export const useTextCycling = ({
  texts,
  pauseDuration = 3000,
  autoStart = true,
  charSpeed = 40,
}: TextCyclingOptions): TextCyclingResult => {
  // Ensure we have at least one text to display
  const validTexts = texts && texts.length > 0 ? texts : ['Text'];

  const [index, setIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>('');
  const [fullText, setFullText] = useState<string>(validTexts[0] || '');
  const [textOpacity] = useState<number>(1);
  const [status, setStatus] = useState<TextCyclingStatus>(autoStart ? 'typing' : 'pausing');
  const [charIndex, setCharIndex] = useState<number>(0);

  // Function to advance to the next word - synchronously moves to next word
  const next = useCallback((): void => {
    const nextIndex = (index + 1) % validTexts.length;
    setIndex(nextIndex);
    setFullText(validTexts[nextIndex] || '');
    setCharIndex(0);
    setCurrentText(''); // Clear text before starting to type the new word
    setStatus('typing'); // Immediately start typing - no gap
  }, [index, validTexts]);

  // Initial setup on mount - start with the first word
  useEffect(() => {
    // Force-start typing on initial render
    if (currentText === '' && status === 'typing' && charIndex === 0) {
      setCurrentText(fullText.substring(0, 1));
      setCharIndex(1);
    }
  }, [currentText, status, charIndex, fullText]);

  // Effect for typing animation
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status === 'typing') {
      // Character-by-character typing
      if (charIndex < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, charSpeed);
      } else {
        // Finished typing
        timer = setTimeout(() => {
          setStatus('pausing');
        }, 50); // Short delay to ensure typing is complete
      }
    } else if (status === 'pausing') {
      // Keep text visible during pause
      timer = setTimeout(() => {
        setStatus('deleting');
        setCharIndex(fullText.length);
      }, pauseDuration);
    } else if (status === 'deleting') {
      // Character-by-character deletion
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, charSpeed / 1.5); // Delete slightly faster than typing
      } else {
        // When fully deleted, immediately go to next word without delay
        next();
      }
    }
    return () => clearTimeout(timer);
  }, [status, pauseDuration, charIndex, fullText, charSpeed, next]);

  return {
    currentText,
    textOpacity,
    typing: status === 'typing',
    deleting: status === 'deleting',
    status,
    next,
  };
};

