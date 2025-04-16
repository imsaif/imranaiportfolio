import { Project } from '@/data/projects';
import Image from 'next/image';

interface ProjectMockupProps {
  project: Project;
}

export const ProjectMockup = ({ project }: ProjectMockupProps) => {
  // Determine accent color based on project id
  const getAccentColor = () => {
    switch (project.id % 4) {
      case 0:
        return "bg-purple-200";
      case 1:
        return "bg-blue-200";
      case 2:
        return "bg-emerald-200";
      case 3:
        return "bg-rose-200";
      default:
        return "bg-indigo-200";
    }
  };

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-50">
      {/* Soft blob background similar to the icon */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large blob in top-left */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-100/80 blur-2xl"></div>
        
        {/* Medium blob in bottom-right */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-blue-100/70 blur-2xl"></div>
        
        {/* Small accent blob floating in middle-right */}
        <div className={`absolute top-1/3 right-1/4 w-16 h-16 rounded-full ${getAccentColor()} blur-xl opacity-60`}></div>
        
        {/* Tiny blob top-right */}
        <div className="absolute top-5 right-10 w-8 h-8 rounded-full bg-pink-100/60 blur-md"></div>
      </div>
      
      {/* Card border with slight gradient - similar to the icon's border */}
      <div className="absolute inset-0 rounded-lg border-2 border-white/30 z-0"></div>
      
      {/* Display the image */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
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
};
