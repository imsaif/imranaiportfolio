import Image from 'next/image';
import ParticlesOnHover from './ParticlesOnHover';
import { Project } from '@/data/projects';

interface ProjectMockupProps {
  project: Project;
  onCaseStudyHover?: (hovered: boolean) => void;
  showParticles?: boolean;
}

export const ProjectMockup = ({ project, onCaseStudyHover, showParticles }: ProjectMockupProps) => {
  return (
    <div
      className="relative w-full h-80 md:h-[32rem]"
      onMouseEnter={() => onCaseStudyHover && onCaseStudyHover(true)}
      onMouseLeave={() => onCaseStudyHover && onCaseStudyHover(false)}
    >
      {/* Overlay particles effect on hover */}
      {showParticles && <ParticlesOnHover />}
      {/* Display only the main project image */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Image src={project.images[0]} alt={project.title} fill className="object-contain p-4" priority />
      </div>
    </div>
  );
};
