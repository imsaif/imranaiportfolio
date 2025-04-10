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
                  {/* Outer glow container */}
                  <div className="relative">
                    {/* Default shadow state */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400/20 via-gray-300/20 to-gray-400/20 rounded-lg blur-lg opacity-75"></div>

                    {/* Static hover glow effect - replaced cyan with red */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 via-fuchsia-500/0 to-red-500/0 rounded-lg blur-xl transition-all duration-500 group-hover:from-purple-500/25 group-hover:via-fuchsia-500/25 group-hover:to-red-500/25 opacity-0 group-hover:opacity-100"></div>

                    {/* Rotating gradient effect - using red instead of pink */}
                    <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-500/40 via-purple-500/40 to-red-500/40 blur-xl group-hover:animate-spin-slow"></div>
                    </div>

                    {/* Single-sweep shimmer effect */}
                    <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-x-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer-once"></div>
                    </div>

                    {/* Card content */}
                    <div className="relative bg-white rounded-lg shadow-[0_8px_16px_rgb(0_0_0_/_0.08),_0_1px_2px_rgb(0_0_0_/_0.15)] transition-all duration-500 ease-out transform group-hover:scale-[1.02] group-hover:shadow-[0_20px_40px_rgb(0_0_0_/_0.12),_0_1px_3px_rgb(0_0_0_/_0.18)] z-10">
                      <div className="rounded-lg overflow-hidden z-20">
                        <ProjectMockup project={project} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 flex flex-col justify-center relative">
                  <span className="absolute -left-8 top-0 text-8xl font-bold text-gray-100 select-none hidden md:block">
                    0{index + 1}
                  </span>

                  <div className="relative">
                    <span className="inline-block mb-2 text-sm font-medium text-accent">{project.tagline}</span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{project.title}</h3>
                    <p className="text-muted mb-8 leading-relaxed">{project.description}</p>

                    {/* Gradient button on hover */}
                    <div className="relative inline-flex items-center">
                      <div className="flex items-center">
                        <span className="inline-flex font-medium relative z-10 bg-gradient-to-r from-accent to-accent bg-clip-text transition-all duration-300 group-hover:from-purple-500 group-hover:to-red-500 group-hover:text-transparent text-accent">
                          View case study
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-1 transition-all duration-300 text-accent group-hover:translate-x-2 group-hover:text-red-500"
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
