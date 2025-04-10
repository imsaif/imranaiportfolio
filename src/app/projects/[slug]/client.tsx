'use client';

import { useEffect, useState } from 'react';

import LessonLoomContent from '@/components/case-studies/LessonLoom';
import ProjectContent from '@/components/case-studies/ProjectContent';
import { Project } from '@/data/projects';

// Client components for each case study type
// Client component for LessonLoom
export function LessonLoomClient() {
  return <LessonLoomContent />;
}

// Client component for generic projects
export function ProjectClient({ projectData }: { projectData: string }) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    try {
      if (projectData) {
        setProject(JSON.parse(projectData));
      }
    } catch (error) {
      console.error('Failed to parse project data:', error);
    }
  }, [projectData]);

  if (!project) {
    return <div>Loading project...</div>;
  }

  return <ProjectContent project={project} />;
}
