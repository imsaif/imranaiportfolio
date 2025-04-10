'use client';

import Link from 'next/link';
import React from 'react';

import { ProjectMockup } from '../ui/ProjectMockup';
import { SectionTitle } from '../ui/SectionTitle';
import { getFeaturedProjects } from '@/data/projects';

// Get projects at build time
const projects = getFeaturedProjects();

// Function to determine project color based on project ID
const getProjectColor = (id: number) => {
  switch (id) {
    case 1:
      return {
        bg: 'bg-indigo-100',
        accent: 'bg-indigo-500',
      };
    case 2:
      return {
        bg: 'bg-blue-100',
        accent: 'bg-blue-500',
      };
    case 3:
      return {
        bg: 'bg-emerald-100',
        accent: 'bg-emerald-500',
      };
    default:
      return {
        bg: 'bg-purple-100',
        accent: 'bg-purple-500',
      };
  }
};

const Projects = () => {
  return (
    <section id="work" className="section-padding">
      <div className="container mx-auto px-6 md:px-8">
        <SectionTitle title="Featured work" />

        <div className="space-y-32 mt-24">
          {projects.map((project, index) => {
            const projectUrl = `/casestudy/${project.slug}`;
            const projectColors = getProjectColor(project.id);

            return (
              <Link
                key={project.id}
                href={projectUrl}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-16 group cursor-pointer`}
              >
                <div className="md:w-1/2 relative p-4">
                  {/* Card with single shadow state */}
                  <div className="relative">
                    {/* Card content */}
                    <div className="relative bg-white rounded-lg shadow-md transition-all duration-300 ease-out transform group-hover:scale-[1.01] z-10">
                      <div className="rounded-lg overflow-hidden backdrop-blur-sm">
                        <ProjectMockup project={project} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 flex flex-col justify-center relative">
                  <div className="relative">
                    <span className="inline-block mb-2 text-sm font-medium text-accent">{project.tagline}</span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{project.title}</h3>
                    <p className="text-muted mb-8 leading-relaxed">{project.description}</p>

                    {/* Simplified button with subtle hover effect */}
                    <div className="relative inline-flex items-center">
                      <div className="flex items-center">
                        <span className="inline-flex font-medium relative z-10 text-accent transition-all duration-300">
                          View case study
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-1 transition-all duration-300 text-accent group-hover:translate-x-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
