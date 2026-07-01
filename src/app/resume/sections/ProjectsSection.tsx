interface Project {
  name: string;
  role: string;
  url: string;
  description: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <div className="border border-border-primary rounded-2xl bg-surface-primary overflow-hidden">
      {projects.map((project, i) => (
        <div
          key={i}
          className={`px-6 md:px-8 py-6 ${i < projects.length - 1 ? 'border-b border-border-primary' : ''}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
            <div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base md:text-lg font-semibold text-text-primary hover:text-accent-primary transition-colors inline-flex items-center gap-1.5"
              >
                {project.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-text-tertiary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 7h5m0 0v5m0-5L10 19" />
                </svg>
              </a>
              <p className="text-sm text-text-secondary">{project.role}</p>
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">{project.description}</p>
        </div>
      ))}
    </div>
  );
}
