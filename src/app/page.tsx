'use client';
import { useReducedMotion } from 'framer-motion';
import { Suspense, useRef, lazy } from 'react';

import Hero from '@/components/sections/Hero';

// Lazy load non-critical components for better LCP
const Process = lazy(() => import('@/components/sections/Process'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const CursorDot = lazy(() => import('@/components/ui').then(module => ({ default: module.CursorDot })));

export default function Home() {
  // Ref for the scroll container (main)
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <main ref={containerRef} className="min-h-screen bg-background relative" style={{ position: 'relative' }}>
      {/* Load CursorDot after hero for better LCP */}
      <Suspense fallback={null}>
        <CursorDot size={14} />
      </Suspense>
      
      {/* Hero Section - prioritized for LCP */}
      <Hero />

      {/* Lazy load below-the-fold sections */}
      <Suspense fallback={<div className="h-96 bg-background" />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-background" />}>
        <Process />
      </Suspense>
    </main>
  );
}
