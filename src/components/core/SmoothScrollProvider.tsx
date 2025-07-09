'use client';

import Lenis from '@studio-freight/lenis';
import { useEffect, useRef } from 'react';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Provides inertia-based smooth scrolling using Lenis.
 * Respects reduced motion and cleans up on unmount.
 * Wrap your layout or page with this provider for enhanced scroll experience.
 */
export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2, // Increase for more inertia
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // Custom cubic easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
