'use client';

import Link from 'next/link';
import {
  MdLightbulbOutline,
  MdOutlineArticle,
  MdOutlineFolderOpen,
  MdTerminal,
} from 'react-icons/md';

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
        width={36}
        height={36}
        // These SVGs carry padding inside their viewBox (dwic is -4 -4 32 32), so a
        // 28px box renders ~21px of artwork. Sized up to match the icon glyphs.
        className="object-contain w-9 h-9"
      />
    );
  }
  if (project.logo.name === 'terminal') {
    return <MdTerminal className="w-7 h-7 text-text-primary" />;
  }
  if (project.logo.name === 'folder') {
    return <MdOutlineFolderOpen className="w-7 h-7 text-text-primary" />;
  }
  if (project.logo.name === 'writing') {
    return <MdOutlineArticle className="w-7 h-7 text-text-primary" />;
  }
  return <MdLightbulbOutline className="w-7 h-7 text-text-primary" />;
};

const CtaArrow = () => (
  <svg
    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

/** Stretches over the whole card via ::after, so the card stays clickable. */
const CTA_BASE = 'inline-flex items-center gap-1.5 text-sm font-medium text-text-primary';
const CTA_STRETCH = ' after:absolute after:inset-0 after:rounded-3xl';

const PrimaryCta = ({ project }: { project: Project }) => {
  const label = project.ctaLabel ?? 'Visit site';
  // Cards that list their own links keep the CTA to itself, so the link
  // targets inside the card stay individually clickable.
  const className = CTA_BASE + (project.links?.length ? '' : CTA_STRETCH);
  // Internal routes use next/link so navigation stays client-side.
  if (project.external === false) {
    return (
      <Link href={project.liveUrl} className={className}>
        <span>{label}</span>
        <CtaArrow />
      </Link>
    );
  }
  return (
    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={className}>
      <span>{label}</span>
      <CtaArrow />
    </a>
  );
};

/**
 * The card is a <div>, not an <a>, so a second link can live inside it.
 * "Visit site" stretches over the whole card via an ::after overlay, keeping
 * whole-card clickability; the decisions link sits above that overlay on z-10.
 */
const ProductCard = ({ project }: { project: Project }) => (
  <div className="group relative flex h-full flex-col rounded-3xl bg-background-grain p-7 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
    <div className="mb-5 flex h-10 w-10 items-center justify-center">
      <ProductIcon project={project} />
    </div>
    <h3 className="mb-2 text-lg font-semibold text-text-primary">{project.title}</h3>
    {project.statLabel && (
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.06em] text-text-tertiary">
        {project.statLabel}
      </p>
    )}
    {project.links?.length ? (
      <ul className="mb-6 flex-grow space-y-2.5">
        {project.links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="relative z-10 text-[15px] font-medium text-text-primary underline decoration-border-secondary underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p className="mb-6 text-[15px] leading-relaxed text-text-secondary flex-grow">
        {project.description}
      </p>
    )}
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <PrimaryCta project={project} />
      {project.decisionsUrl && (
        <Link
          href={project.decisionsUrl}
          className="relative z-10 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
        >
          Design decisions
        </Link>
      )}
    </div>
  </div>
);

const Projects = () => (
  <section id="work" className="relative w-full pb-8 md:pb-10">
    <div className="container mx-auto max-w-6xl px-4 xs:px-5 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map(project => (
          <ProductCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
