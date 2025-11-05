'use client';

import React from 'react';
import { MdTerminal } from 'react-icons/md';
import PixelHoverBackground from '@/components/effects/PixelHoverBackground';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  github: string;
  logo: {
    type: 'image' | 'icon';
    src?: string;
    icon?: React.ReactNode;
  };
  gradient: string;
}

const BuildingInPublic = () => {

  const projects: Project[] = [
    {
      title: 'AI UX Design Guide',
      description: 'Comprehensive resource for human-centered AI experiences. Open-source patterns, principles, and best practices.',
      github: 'https://github.com/imsaif/aiex',
      logo: {
        type: 'image',
        src: '/images/logos/aiux-logo.svg'
      },
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'DesignwithClaude',
      description: 'Specialized AI agents + CLI tool for design challenges, powered by Claude. Automate design workflows.',
      github: 'https://github.com/imsaif/design-with-claude',
      logo: {
        type: 'icon',
        icon: <MdTerminal className="w-10 h-10 text-gray-600" />
      },
      gradient: 'from-purple-500 to-purple-600'
    }
  ];


  return (
    <section className="pt-12 md:pt-16 pb-12 md:pb-16 bg-background relative">
      {/* Pixel Hover Background */}
      <PixelHoverBackground pixelSize={20} />

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8 relative z-10">
        {/* Title and Description */}
        <div className="text-center mb-8 md:mb-10 pointer-events-none">
          <h2 className="section-title text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight leading-tight">
            Building in Public
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-2xl mx-auto">
            Open-source projects and resources for the design and AI community
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group">
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <div className="relative h-full cursor-pointer">
                  {/* Gradient Background */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-xl blur-lg opacity-15 group-hover:opacity-20 transition-opacity duration-300`}></div>

                  {/* Card Content */}
                  <div className="relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    {/* Logo Container */}
                    <div className="mb-4 flex items-center justify-center h-14">
                      {project.logo.type === 'image' && project.logo.src ? (
                        <div className="relative w-12 h-12">
                          <Image
                            src={project.logo.src}
                            alt={`${project.title} logo`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          {project.logo.icon}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    {/* GitHub Link */}
                    <div className="mt-4 pt-4">
                      <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                        <span className="text-sm">View on GitHub</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildingInPublic;
