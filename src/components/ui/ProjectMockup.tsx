import Image from 'next/image';
import ParticlesOnHover from './ParticlesOnHover';
import { Project } from '@/data/projects';
import { useState } from 'react';

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
      className="relative w-full h-screen transition-all duration-300 ease-in-out"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Overlay particles effect on hover */}
      {showParticles && <ParticlesOnHover />}
      
      {/* Display the main project image */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <Image 
          src={project.images[0]} 
          alt={project.title} 
          fill 
          className="object-cover rounded-xl" 
          priority 
        />
      </div>
    </div>
  );
};
