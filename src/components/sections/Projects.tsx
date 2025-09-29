'use client';

import { useRef } from 'react';

import { getFeaturedProjects } from '@/data/projects';
import StickyProjectCard from '../ui/StickyProjectCard';

// Get projects at build time
const projects = getFeaturedProjects();

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" className="relative w-full mt-0 pt-2 md:mt-2 md:pt-4" ref={sectionRef}>
      <div className="container mx-auto max-w-4xl px-4">
        <div className="relative overflow-visible min-h-[120vh]">
          {projects.map((project, idx) => (
            <StickyProjectCard
              key={project.id}
              project={project}
              index={idx}
              total={projects.length}
              containerRef={sectionRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
