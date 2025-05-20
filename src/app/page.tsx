'use client';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Suspense, useRef } from 'react';

import Hero from '@/components/sections/Hero';
import Process from '@/components/sections/Process';
import Projects from '@/components/sections/Projects';
import { CursorDot } from '@/components/ui';

export default function Home() {
  // Ref for the scroll container (main)
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  // Set up scroll tracking for the parallax transition - without specifying container
  const { scrollY } = useScroll();
  // Height of the Hero section (adjust as needed)
  const heroHeight = 600;

  return (
    <main ref={containerRef} className="min-h-screen bg-background relative">
      <CursorDot size={14} />
      {/* Hero Section with Suspense for better loading */}
      <Suspense fallback={<div className="h-screen" />}>
        <Hero />
      </Suspense>

      {/* Projects Section appears statically */}
      <Suspense fallback={<div className="h-96" />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <Process />
      </Suspense>
    </main>
  );
}
