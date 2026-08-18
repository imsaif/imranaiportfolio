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
const CursorDot = dynamic(() => import('@/components/ui').then(module => ({ default: module.CursorDot })), {
  ssr: false
});

export default function Home() {
  // Ref for the scroll container (main)
  const containerRef = useRef<HTMLDivElement>(null);

    return (
    <div
      ref={containerRef}
      className="flex flex-col justify-center w-full bg-background relative"
      style={{ minHeight: 'calc(100vh - 56px - 72px)' }}
    >
      <CursorDot size={14} />
      <Hero />
      <Projects />
      {/* Hidden — kept for future use */}
      {/* <Process /> */}
      {/* <StrategicVision /> */}
      {/* <LeadershipPhilosophy /> */}
      {/* <Collaboration /> */}
    </div>
  );
}
