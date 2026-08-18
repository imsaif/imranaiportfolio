'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { getFeaturedProjects, type Project } from '@/data/projects';

const projects = getFeaturedProjects();

// Emil Kowalski's rules: ease-out, never ease-in, under 300ms for UI motion.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const DURATION = 0.2;

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
    <>
      {detail?.problem && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
            The problem
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{detail.problem}</p>
        </div>
      )}

      {detail?.chose && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
            What I decided
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-text-primary">{detail.chose}</p>
          {detail.over && (
            <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
              Over: {detail.over}
            </p>
          )}
        </div>
      )}

      {detail?.inside && (
        <p className="text-[15px] leading-relaxed text-text-secondary">{detail.inside}</p>
      )}

      {project.links?.length ? (
        <ul className="mt-6 space-y-2.5">
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

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
        <PrimaryLink project={project} />
        {detail?.moreHref && (
          <Link
            href={detail.moreHref}
            className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
          >
            {detail.moreLabel ?? 'Read more'}
          </Link>
        )}
        {project.decisionsUrl && !detail?.moreHref && (
          <Link
            href={project.decisionsUrl}
            className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
          >
            Design decisions
          </Link>
        )}
      </div>
    </>
  );
};

const Projects = () => {
  // First row is active on load so the panel is never empty.
  const [activeId, setActiveId] = useState<number>(projects[0]?.id ?? 0);
  const reduceMotion = useReducedMotion();
  const active: Project | undefined = projects.find(p => p.id === activeId) ?? projects[0];

  if (!active) return null;

  return (
    <section id="work" className="relative w-full pb-8 md:pb-10">
      <div className="container mx-auto max-w-5xl px-4 xs:px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-12">
          {/*
            The list never resizes, so sweeping the cursor down it is stable.
            Hover, focus and click all activate a row, so this is not hover-only
            and works on touch, where hover never fires.
          */}
          <ul className="flex flex-col gap-1">
            {projects.map(project => {
              const isActive = project.id === activeId;
              return (
                <li key={project.id} className="group">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActiveId(project.id)}
                    onFocus={() => setActiveId(project.id)}
                    onClick={() => setActiveId(project.id)}
                    className={`w-full rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? 'border-transparent bg-background-grain shadow-card'
                        : 'border-border-secondary bg-transparent hover:border-text-tertiary hover:bg-background-grain/50'
                    }`}
                  >
                    <span className="flex items-baseline justify-between gap-x-3">
                      <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <span className="text-[16px] font-semibold text-text-primary">
                          {project.title}
                        </span>
                        {project.statLabel && (
                          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-text-tertiary">
                            {project.statLabel}
                          </span>
                        )}
                      </span>
                      <svg
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 self-center transition-all duration-200 ${
                          isActive
                            ? 'translate-x-0 text-text-primary opacity-100'
                            : '-translate-x-1 text-text-tertiary opacity-0 group-hover:opacity-100'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-text-secondary">
                      {project.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* min-height keeps the footer still when switching between short and long entries. */}
          <div className="lg:min-h-[24rem]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduceMotion ? 0 : DURATION, ease: EASE_OUT }}
                className="h-full rounded-3xl border border-border-secondary bg-background-grain/40 p-7"
              >
                <Detail project={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
