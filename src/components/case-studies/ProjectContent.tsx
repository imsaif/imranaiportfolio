'use client';

import AnimatedContent from './AnimatedContent';
import ProjectHeader from './ProjectHeader';
import ProjectImages from './ProjectImages';
import { Project } from '@/data/projects';

export default function ProjectContent({ project }: { project: Project }) {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <ProjectHeader />

        <div>
          <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

          <div className="mb-8">
            <p className="text-xl text-gray-700">{project.description}</p>
          </div>

          <ProjectImages images={project.images} title={project.title} />

          <AnimatedContent>
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: project.fullDescription }} />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-accent to-tertiary text-white rounded-md hover:shadow-md transition-all"
                >
                  View Live
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-accent to-tertiary text-white rounded-md hover:shadow-md transition-all"
                >
                  View Code
                </a>
              )}
            </div>
          </AnimatedContent>
        </div>
      </div>
    </main>
  );
}
