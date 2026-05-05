'use client';

import { MdLightbulbOutline, MdTerminal } from 'react-icons/md';

import { getFeaturedProjects, type Project } from '@/data/projects';

const projects = getFeaturedProjects();

const ProductIcon = ({ project }: { project: Project }) => {
  if (!project.logo) return null;
  if (project.logo.type === 'image') {
    // Plain <img> for static SVG icons — Next/Image adds no value for 28px logos
    // and occasionally mangles SVGs with negative viewBox values.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.logo.src}
        alt={`${project.title} logo`}
        width={28}
        height={28}
        className="object-contain w-7 h-7"
      />
    );
  }
  if (project.logo.name === 'terminal') {
    return <MdTerminal className="w-7 h-7 text-text-primary" />;
  }
  return <MdLightbulbOutline className="w-7 h-7 text-text-primary" />;
};

const ProductCard = ({ project }: { project: Project }) => (
  <a
    href={project.liveUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col rounded-3xl bg-background-grain p-7 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
  >
    <div className="mb-5 flex h-10 w-10 items-center justify-center">
      <ProductIcon project={project} />
    </div>
    <h3 className="mb-3 text-lg font-semibold text-text-primary">{project.title}</h3>
    <p className="mb-6 text-[15px] leading-relaxed text-text-secondary flex-grow">
      {project.description}
    </p>
    <div className="flex items-center gap-1.5 text-sm font-medium text-text-primary">
      <span>Visit site</span>
      <svg
        className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  </a>
);

const Projects = () => (
  <section id="work" className="relative w-full pb-8 md:pb-10">
    <div className="container mx-auto max-w-6xl px-4 xs:px-5 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {projects.map(project => (
          <ProductCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
