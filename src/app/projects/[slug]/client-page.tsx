'use client';

import { useParams } from 'next/navigation';

import LessonLoomContent from '@/components/case-studies/LessonLoom';
import ProjectContent from '@/components/case-studies/ProjectContent';
import { projects } from '@/data/projects';

// Client-side component that handles rendering the appropriate project content
export default function ProjectClientPage() {
  const { slug } = useParams();
  const currentSlug = Array.isArray(slug) ? slug[0] : slug;

  // Find the project data
  const projectData = projects.find(project => project.slug === currentSlug);

  if (!projectData) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p>Sorry, we couldn&apos;t find the project you&apos;re looking for.</p>
      </div>
    );
  }

  // Special handling for LessonLoom case study
  if (currentSlug === 'lessonloom') {
    return <LessonLoomContent />;
  }

  // For other projects, use the generic ProjectContent component
  return <ProjectContent project={projectData} />;
}
