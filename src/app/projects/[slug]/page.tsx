import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProjectBySlug } from '@/data/projects';

import ClientProjectPage from './client-page';

// Server component for metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} - Case Study`,
    description: project.description,
  };
}

// Server component that passes data to client component
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Pass the slug and serialized project data to the client component
  return <ClientProjectPage slug={slug} projectData={JSON.stringify(project)} />;
}

// Simple wrapper components to separate client components from server components
function LessonLoomWrapper() {
  return (
    <div data-client-component-placeholder="lessonloom">{/* LessonLoomContent will be rendered by the client */}</div>
  );
}

function ProjectWrapper({ project }: { project: any }) {
  return (
    <div data-client-component-placeholder="project" data-project={JSON.stringify(project)}>
      {/* ProjectContent will be rendered by the client */}
      {/* This div acts as a placeholder that will be hydrated */}
    </div>
  );
}
