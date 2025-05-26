'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * CursorDotProps
 * Optional: allow disabling or customizing the dot in the future
 */
export type CursorDotProps = {
  /** Should the dot be hidden? */
  hidden?: boolean;
  /** Optional: dot size in px */
  size?: number;
  /** Optional: className for custom styling */
  className?: string;
};

/**
 * CursorDot
 * A magnetic dot that follows the user's cursor, styled with brand colors.
 * Uses Framer Motion for smooth animation and respects reduced motion settings.
 * Accessible: supports reduced motion and hides on keyboard navigation.
 * Automatically hides on mobile/touch devices where cursor following is not relevant.
 *
 * @param {CursorDotProps} props
 */
export const CursorDot = ({ hidden = false, size = 20, className = '' }: CursorDotProps) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Check if device is mobile/touch device
  useEffect(() => {
    const checkMobile = () => {
      // Check for touch support and small screens
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768; // md breakpoint
      setIsMobile(hasTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Motion values for position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Magnetic spring for smooth following
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Mouse move handler
  useEffect(() => {
    if (hidden || shouldReduceMotion || isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      // Hide if over a link, button, role=button, tabindex=0, or .sticky-project-card
      const target = e.target as HTMLElement | null;
      const isInteractive =
        target && target.closest('a, button, [role="button"], [tabindex="0"], .sticky-project-card') !== null;
      setIsVisible(!isInteractive);
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);
    };
    const handleMouseLeave = () => setIsVisible(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hidden, shouldReduceMotion, size, mouseX, mouseY, isMobile]);

  // Accessibility: Hide dot on keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'Tab' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ) {
        setIsKeyboard(true);
        setIsVisible(false);
      }
    };
    const handleMouseDown = () => {
      setIsKeyboard(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Hide if reduced motion or mobile
  if (hidden || shouldReduceMotion || isMobile) return null;

  return (
    <motion.div
      ref={dotRef}
      aria-hidden
      className={`fixed pointer-events-none z-[9999] ${className}`}
      style={{
        left: 0,
        top: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(90deg, #a21caf 0%, #ec4899 100%)',
        opacity: isVisible && !isKeyboard ? 1 : 0,
        transition: 'opacity 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform, opacity',
        x: springX,
        y: springY,
      }}
      initial={false}
      animate={{
        scale: isVisible ? 1.1 : 0.8,
        background: 'linear-gradient(90deg, #a21caf 0%, #ec4899 100%)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    />
  );
};
