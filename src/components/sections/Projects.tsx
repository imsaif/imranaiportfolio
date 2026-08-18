'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { getFeaturedProjects, type Project } from '@/data/projects';

const projects = getFeaturedProjects();

// Emil Kowalski's rules: ease-out, never ease-in, under 300ms for UI motion.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const DURATION = 0.25;

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

const Detail = ({ project }: { project: Project }) => {
  const detail = project.detail;
  return (
    <div className="pt-5">
      {detail?.problem && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
            The problem
          </p>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
            {detail.problem}
          </p>
        </div>
      )}

      {detail?.chose && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
            What I decided
          </p>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-text-primary">
            {detail.chose}
          </p>
          {detail.over && (
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
              Over: {detail.over}
            </p>
          )}
        </div>
      )}

      {detail?.inside && (
        <p className="max-w-2xl text-[15px] leading-relaxed text-text-secondary">{detail.inside}</p>
      )}

      {project.links?.length ? (
        <ul className="mt-5 space-y-2.5">
          {project.links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] font-medium text-text-primary underline decoration-border-secondary underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        <PrimaryLink project={project} />
        {project.detail?.moreHref && (
          <Link
            href={project.detail.moreHref}
            className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
          >
            {project.detail.moreLabel ?? 'Read more'}
          </Link>
        )}
        {project.decisionsUrl && !project.detail?.moreHref && (
          <Link
            href={project.decisionsUrl}
            className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
          >
            Design decisions
          </Link>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  // First row is open on load so the section never reads as empty.
  const [activeId, setActiveId] = useState<number | null>(projects[0]?.id ?? null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="relative w-full pb-8 md:pb-10">
      <div className="container mx-auto max-w-3xl px-4 xs:px-5 sm:px-6 md:px-8">
        <ul className="flex flex-col gap-1">
          {projects.map(project => {
            const isActive = project.id === activeId;
            return (
              <li key={project.id}>
                {/*
                  Hover and focus both open the row, so this is not a hover-only
                  affordance. On touch, where hover never fires, tapping the row
                  opens it.
                */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  onMouseEnter={() => setActiveId(project.id)}
                  onFocus={() => setActiveId(project.id)}
                  onClick={() => setActiveId(project.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveId(project.id);
                    }
                  }}
                  className={`cursor-default rounded-2xl px-5 py-4 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive ? 'bg-background-grain' : 'hover:bg-background-grain/60'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-[17px] font-semibold text-text-primary">{project.title}</h3>
                    {project.statLabel && (
                      <span className="font-mono text-xs uppercase tracking-[0.06em] text-text-tertiary">
                        {project.statLabel}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">
                    {project.description}
                  </p>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="detail"
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: reduceMotion ? 0 : DURATION, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <Detail project={project} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
