'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getFeaturedProjects, type Project } from '@/data/projects';

const projects = getFeaturedProjects();

const Arrow = () => (
  <svg
    aria-hidden="true"
    className="w-4 h-4 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const LINK_CLASS =
  'inline-flex items-center gap-1.5 text-sm font-medium text-text-primary hover:text-accent transition-colors';

const PrimaryLink = ({ project }: { project: Project }) => {
  const label = project.ctaLabel ?? 'Visit site';
  if (project.external === false) {
    return (
      <Link href={project.liveUrl} className={LINK_CLASS}>
        <span>{label}</span>
        <Arrow />
      </Link>
    );
  }
  return (
    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
      <span>{label}</span>
      <Arrow />
    </a>
  );
};

const Panel = ({ project }: { project: Project }) => {
  const detail = project.detail;
  return (
    <article className="flex h-full flex-col rounded-3xl border border-border-secondary bg-background-grain p-8 md:p-10">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
          {project.title}
        </h3>
        {project.statLabel && (
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-text-tertiary">
            {project.statLabel}
          </span>
        )}
      </div>
      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-text-secondary">
        {project.description}
      </p>

      <div className="mt-7 flex-grow">
        {detail?.problem && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              The problem
            </p>
            {/* Reading measure stays capped even though the panel is wide. */}
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-text-secondary">
              {detail.problem}
            </p>
          </div>
        )}

        {detail?.chose && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              What I decided
            </p>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-text-primary">
              {detail.chose}
            </p>
            {detail.over && (
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-text-secondary">
                Over: {detail.over}
              </p>
            )}
          </div>
        )}

        {detail?.inside && (
          <p className="max-w-xl text-[15px] leading-relaxed text-text-secondary">{detail.inside}</p>
        )}

        {project.links?.length ? (
          <ul className="mt-6 space-y-2.5">
            {project.links.map(link => {
              const className =
                'text-[15px] font-medium text-text-primary underline decoration-border-secondary underline-offset-4 transition-colors hover:text-accent hover:decoration-accent';
              // Article links point off-site; case-study links stay internal.
              const isExternal = link.href.startsWith('http');
              return (
                <li key={link.href}>
                  {isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link href={link.href} className={className}>
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        <PrimaryLink project={project} />
        {detail?.moreHref && (
          <Link
            href={detail.moreHref}
            className="text-sm font-medium text-text-secondary transition-colors hover:text-accent"
          >
            {detail.moreLabel ?? 'Read more'}
          </Link>
        )}
        {project.decisionsUrl && !detail?.moreHref && (
          <Link
            href={project.decisionsUrl}
            className="text-sm font-medium text-text-secondary transition-colors hover:text-accent"
          >
            Design decisions
          </Link>
        )}
      </div>
    </article>
  );
};

const Projects = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Native scroll drives the indicator, rather than the indicator driving a
  // hijacked scroll. Keyboard, trackpad and scrollbar all keep working.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = panelRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { root: scroller, threshold: 0.6 }
    );
    panelRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((index: number) => {
    panelRefs.current[index]?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, []);

  return (
    <section id="work" className="relative w-full pb-8 md:pb-10">
      {/* Position indicator, one tick per panel. */}
      <div className="mb-6 flex items-center justify-center gap-1.5">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Go to ${project.title}`}
            aria-current={index === activeIndex}
            className="group rounded p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span
              className={`block h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-text-primary'
                  : 'w-1 bg-border-secondary group-hover:bg-text-tertiary'
              }`}
            />
          </button>
        ))}
      </div>

      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Selected work, scroll horizontally"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent xs:px-5 sm:px-6 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => {
              panelRefs.current[index] = el;
            }}
            className="w-[85vw] max-w-3xl shrink-0 snap-center"
          >
            <Panel project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
