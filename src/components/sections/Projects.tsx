'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getFeaturedProjects, type Project } from '@/data/projects';

const projects = getFeaturedProjects();

/** How far the strip pulls back across the scroll. Subtle on purpose. */
const MAX_ZOOM_OUT = 0.16;

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
    <article className="flex h-full flex-col rounded-3xl border border-border-secondary bg-transparent p-8 transition-colors duration-200 [@media(hover:hover)]:hover:border-text-tertiary [@media(hover:hover)]:hover:bg-background-grain md:p-10">
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

/** True on desktop with motion allowed. Pinning is opt-in, never the fallback. */
const usePinnedScroll = () => {
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPinned(wide.matches && !still.matches);
    update();
    wide.addEventListener('change', update);
    still.addEventListener('change', update);
    return () => {
      wide.removeEventListener('change', update);
      still.removeEventListener('change', update);
    };
  }, []);
  return pinned;
};

const Ticks = ({ activeIndex, onSelect }: { activeIndex: number; onSelect: (i: number) => void }) => (
  <div className="mb-6 flex items-center justify-center gap-1.5">
    {projects.map((project, index) => (
      <button
        key={project.id}
        type="button"
        onClick={() => onSelect(index)}
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
);

/** Desktop: the section pins and vertical scroll drives the strip sideways. */
const PinnedStrip = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ stripWidth: 0, viewportWidth: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const measure = () => {
      const strip = stripRef.current;
      if (!strip) return;
      setMetrics({ stripWidth: strip.scrollWidth, viewportWidth: window.innerWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Pull back to reveal more of the strip, then hold, the way rauno.me does.
  const scaleAt = (p: number) => 1 - MAX_ZOOM_OUT * Math.min(1, p / 0.5);
  const scale = useTransform(scrollYProgress, p => scaleAt(p));

  // Translation is computed against the SCALED width, so the last panel still
  // reaches the edge once the strip has shrunk.
  const x = useTransform(scrollYProgress, p => {
    const scaledWidth = scaleAt(p) * metrics.stripWidth;
    const travel = Math.max(0, scaledWidth - metrics.viewportWidth + 64);
    return -travel * p;
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', value => {
      setActiveIndex(Math.min(projects.length - 1, Math.round(value * (projects.length - 1))));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const ratio = index / Math.max(1, projects.length - 1);
      const top = wrapper.offsetTop + ratio * (wrapper.offsetHeight - window.innerHeight);
      window.scrollTo({ top, behavior: 'smooth' });
    },
    []
  );

  return (
    <div ref={wrapperRef} style={{ height: `${projects.length * 90}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <Ticks activeIndex={activeIndex} onSelect={scrollToIndex} />
        <motion.div
          ref={stripRef}
          style={{ x, scale, transformOrigin: 'left center' }}
          className="flex gap-5 pl-8 will-change-transform"
        >
          {projects.map(project => (
            <div key={project.id} className="w-[46rem] max-w-[85vw] shrink-0">
              <Panel project={project} />
            </div>
          ))}
        </motion.div>
        <p className="mt-6 text-center text-xs text-text-tertiary">Keep scrolling</p>
      </div>
    </div>
  );
};

/** Touch and reduced-motion: a plain horizontal scroller, no hijacking. */
const NativeStrip = () => {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const scrollToIndex = useCallback((index: number) => {
    panelRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, []);

  return (
    <>
      <Ticks activeIndex={activeIndex} onSelect={scrollToIndex} />
      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Selected work, scroll horizontally"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent xs:px-5 sm:px-6 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
    </>
  );
};

const Projects = () => {
  const pinned = usePinnedScroll();
  return (
    <section id="work" className="relative w-full pb-8 md:pb-10">
      {pinned ? <PinnedStrip /> : <NativeStrip />}
    </section>
  );
};

export default Projects;
