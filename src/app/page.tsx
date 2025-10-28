'use client';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import Hero from '@/components/sections/Hero';

// Lazy load non-critical components for better LCP
// const Process = dynamic(() => import('@/components/sections/Process'), {
//   loading: () => <div className="h-96 bg-background" />
// });
const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <div className="h-96 bg-background" />
});
const StrategicVision = dynamic(() => import('@/components/sections/StrategicVision'), {
  loading: () => <div className="h-96 bg-background" />
});
const LeadershipPhilosophy = dynamic(() => import('@/components/sections/LeadershipPhilosophy'), {
  loading: () => <div className="h-96 bg-background" />
});
const Collaboration = dynamic(() => import('@/components/sections/Collaboration'), {
  loading: () => <div className="h-96 bg-background" />
});
const BuildingInPublic = dynamic(() => import('@/components/sections/BuildingInPublic'), {
  loading: () => <div className="h-96 bg-background" />
});
const CursorDot = dynamic(() => import('@/components/ui').then(module => ({ default: module.CursorDot })), {
  ssr: false
});

export default function Home() {
  // Ref for the scroll container (main)
  const containerRef = useRef<HTMLDivElement>(null);

    return (
    <main ref={containerRef} className="min-h-screen bg-background relative" style={{ position: 'relative' }}>
      {/* Load CursorDot after hero for better LCP */}
      <CursorDot size={14} />

      {/* Hero Section - prioritized for LCP */}
      <Hero />

      {/* Lazy load below-the-fold sections */}
      <Projects />
      {/* <Process /> */}

      {/* Leadership Sections */}
      <StrategicVision />
      <LeadershipPhilosophy />
      <Collaboration />
      <BuildingInPublic />
    </main>
  );
}
