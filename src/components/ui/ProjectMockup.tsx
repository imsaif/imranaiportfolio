import Image from 'next/image';
import React from 'react';

import { Project } from '../../data/projects';

interface ProjectMockupProps {
  project: Project;
  className?: string;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ project, className = '' }) => {

  // const handleMouseLeave = () => {
  //   // setIsHovered(false);
  //   // onCaseStudyHover && onCaseStudyHover(false);
  // };

  return (
    <div
      className={`relative transition-all duration-300 ease-in-out w-full h-full flex-1 ${className}`}
    >
      {/* Overlay particles effect on hover */}
      {/* showParticles && <ParticlesOnHover /> */}

      {/* Display the main project image */}
      <div className="relative w-full h-full py-6 pl-8 pr-2 md:pl-12 md:pr-4 rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden bg-white flex items-center justify-center">
        {project.images && project.images.length > 0 && project.images[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            width={600}
            height={360}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover w-full h-auto max-h-full rounded-xl"
            priority
            quality={80}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            <span>No image</span>
          </div>
        )}
      </div>
    </div>
  );
};
