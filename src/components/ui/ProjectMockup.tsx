import Image from 'next/image';
import { useState } from 'react';
import ParticlesOnHover from './ParticlesOnHover';
import { Project } from '@/data/projects';

interface ProjectMockupProps {
  project: Project;
  onCaseStudyHover?: (hovered: boolean) => void;
  showParticles?: boolean;
}

export const ProjectMockup = ({ project, onCaseStudyHover, showParticles }: ProjectMockupProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Debug: log project and image path
  if (typeof window !== 'undefined') {
    console.log('ProjectMockup project:', project);
    console.log('ProjectMockup image path:', project.images && project.images[0]);
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
    onCaseStudyHover && onCaseStudyHover(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onCaseStudyHover && onCaseStudyHover(false);
  };

  return (
    <div
      className="relative transition-all duration-300 ease-in-out"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Overlay particles effect on hover */}
      {showParticles && <ParticlesOnHover />}

      {/* Display the main project image */}
      <div className="relative w-full h-full min-h-[260px] md:min-h-[400px] rounded-l-xl overflow-hidden bg-white">
        {project.images && project.images.length > 0 ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            width={600}
            height={360}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover w-full h-full rounded-l-xl"
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
