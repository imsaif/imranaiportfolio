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
      <div className="flex justify-center max-w-[600px] max-h-[600px] mx-auto">
        <Image
          src={project.images[0]}
          alt={project.title}
          width={600}
          height={600}
          sizes="(max-width: 768px) 95vw, 600px"
          className="object-contain rounded-xl bg-white"
          priority
          quality={80}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      </div>
    </div>
  );
};
