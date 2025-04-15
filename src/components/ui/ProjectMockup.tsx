import { Project } from '@/data/projects';
import Image from 'next/image';

interface ProjectMockupProps {
  project: Project;
}

export const ProjectMockup = ({ project }: ProjectMockupProps) => {
  if (project.slug === 'lessonloom') {
    // Use SVG illustration from project images
    return (
      <div className="relative aspect-video bg-gradient-to-br from-white to-purple-50 rounded-lg overflow-hidden shadow-lg">
        {/* Simple static overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none z-0"></div>
        
        {/* Display the SVG illustration */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <Image 
            src={project.images[0]} 
            alt={project.title} 
            fill 
            className="object-contain p-4"
            priority
          />
        </div>
      </div>
    );
  }

  if (project.slug === 'scheduler') {
    // Use SVG illustration from project images
    return (
      <div className="relative aspect-video bg-gradient-to-br from-white to-blue-50 rounded-lg overflow-hidden shadow-lg">
        {/* Simple static overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none z-10"></div>
        
        {/* Display the SVG illustration */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <Image 
            src={project.images[0]} 
            alt={project.title} 
            fill 
            className="object-contain p-4"
            priority
          />
        </div>
      </div>
    );
  }

  return null;
};
