'use client';

import { useRef, useState } from 'react';

import { getFeaturedProjects, Project } from '@/data/projects';
import StickyProjectCard from '../ui/StickyProjectCard';
import CaseStudySlideView from '../ui/CaseStudySlideView';

// Get projects at build time
const projects = getFeaturedProjects();

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSlideViewOpen, setIsSlideViewOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsSlideViewOpen(true);
  };

  const handleCloseSlideView = () => {
    setIsSlideViewOpen(false);
    // Delay clearing the selected project to allow exit animation
    setTimeout(() => {
      setSelectedProject(null);
    }, 600);
  };

  return (
    <>
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
                onProjectClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      </section>

      <CaseStudySlideView
        project={selectedProject}
        isOpen={isSlideViewOpen}
        onClose={handleCloseSlideView}
      />
    </>
  );
};

export default Projects;
