'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MdLightbulbOutline,
  MdOutlineArticle,
  MdOutlineFolderOpen,
  MdTerminal,
} from 'react-icons/md';

import { getFeaturedProjects, type Project } from '@/data/projects';

const projects = getFeaturedProjects();

// Emil Kowalski's rules: ease-out, never ease-in, under 300ms for UI motion.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const DURATION = 0.25;

const ProductIcon = ({ project }: { project: Project }) => {
  if (!project.logo) return null;
  if (project.logo.type === 'image') {
    // Plain <img> for static SVG icons: Next/Image adds no value at this size
    // and occasionally mangles SVGs with negative viewBox values.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.logo.src}
        alt={`${project.title} logo`}
        width={36}
        height={36}
        // These SVGs pad their artwork inside the viewBox (dwic is -4 -4 32 32),
        // so a 28px box renders ~21px of glyph. Sized up to match the icon set.
        className="object-contain w-9 h-9"
      />
    );
  }
  if (project.logo.name === 'terminal') return <MdTerminal className="w-7 h-7 text-text-primary" />;
  if (project.logo.name === 'folder')
    return <MdOutlineFolderOpen className="w-7 h-7 text-text-primary" />;
  if (project.logo.name === 'writing')
    return <MdOutlineArticle className="w-7 h-7 text-text-primary" />;
  return <MdLightbulbOutline className="w-7 h-7 text-text-primary" />;
};

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
  'relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-text-primary hover:text-accent transition-colors';

/** Links sit above the expand overlay so they stay individually clickable. */
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

const CardLinks = ({ project, className }: { project: Project; className: string }) => {
  if (!project.links?.length) return null;
  return (
    <ul className={className}>
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
  );
};

/** Shared between the collapsed card and the expanded panel so they morph cleanly. */
const CardHead = ({ project }: { project: Project }) => (
  <>
    <div className="mb-5 flex h-10 w-10 items-center">
      <ProductIcon project={project} />
    </div>
    <h3 className="mb-2 text-lg font-semibold text-text-primary">{project.title}</h3>
    {project.statLabel && (
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.06em] text-text-tertiary">
        {project.statLabel}
      </p>
    )}
  </>
);

const ProductCard = ({ project, onExpand }: { project: Project; onExpand: () => void }) => {
  const reduceMotion = useReducedMotion();
  return (
  <motion.div
    layoutId={`card-${project.id}`}
    transition={{ duration: reduceMotion ? 0 : DURATION, ease: EASE_OUT }}
    className="group relative flex h-full flex-col rounded-3xl bg-background-grain p-7 transition-shadow duration-300 hover:shadow-card-hover"
  >
    <CardHead project={project} />

    {project.links?.length ? (
      <CardLinks project={project} className="mb-6 flex-grow space-y-2.5" />
    ) : (
      <p className="mb-6 text-[15px] leading-relaxed text-text-secondary flex-grow">
        {project.description}
      </p>
    )}

    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <PrimaryLink project={project} />
      {project.decisionsUrl && (
        <Link
          href={project.decisionsUrl}
          className="relative z-10 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
        >
          Design decisions
        </Link>
      )}
    </div>

    {/*
      Inverts the usual stretched-link: this overlay expands the card, and it sits
      BENEATH the links above (which are z-10), so explicit links still navigate.
    */}
    <button
      type="button"
      onClick={onExpand}
      aria-label={`More about ${project.title}`}
      className="absolute inset-0 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    />
  </motion.div>
  );
};

const DetailPanel = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const detail = project.detail;

  useEffect(() => {
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      transition={{ duration: reduceMotion ? 0 : DURATION, ease: EASE_OUT }}
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-background-grain p-8 shadow-card-hover focus:outline-none"
    >
      <CardHead project={project} />

      {detail?.problem && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
            The problem
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{detail.problem}</p>
        </div>
      )}

      {detail?.chose && (
        <div className="mt-5">
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
        <p className="mt-5 text-[15px] leading-relaxed text-text-secondary">{detail.inside}</p>
      )}

      <CardLinks project={project} className="mt-5 space-y-2.5" />

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
        <PrimaryLink project={project} />
        {detail?.moreHref && (
          <Link
            href={detail.moreHref}
            className="relative z-10 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
          >
            {detail.moreLabel ?? 'Read more'}
          </Link>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 rounded-full p-2 text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </motion.div>
  );
};

const Projects = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const open = projects.find(p => p.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);

  return (
    <section id="work" className="relative w-full pb-8 md:pb-10">
      <div className="container mx-auto max-w-6xl px-4 xs:px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map(project => (
            <ProductCard key={project.id} project={project} onExpand={() => setOpenId(project.id)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              key="scrim"
              className="absolute inset-0 bg-text-primary/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION, ease: EASE_OUT }}
              onClick={close}
            />
            <DetailPanel project={open} onClose={close} />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
