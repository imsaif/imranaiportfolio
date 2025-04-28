import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProjectBySlug } from '@/data/projects';

import ClientProjectPage from './client-page';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

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

  // Don't pass props as the client component uses useParams to get the slug
  return <ClientProjectPage />;
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
