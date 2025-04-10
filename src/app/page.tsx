import { Suspense } from 'react';

import Hero from '@/components/sections/Hero';
import Process from '@/components/sections/Process';
import Projects from '@/components/sections/Projects';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Suspense for better loading */}
      <Suspense fallback={<div className="h-screen" />}>
        <Hero />
      </Suspense>

      {/* Main Content Sections */}
      <Suspense fallback={<div className="h-96" />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <Process />
      </Suspense>
    </main>
  );
}
