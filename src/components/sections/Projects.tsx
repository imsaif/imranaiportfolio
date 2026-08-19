'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getFeaturedProjects, type Project } from '@/data/projects';

const projects = getFeaturedProjects();

/** How far the strip pulls back across the scroll. Subtle on purpose. */
const MAX_ZOOM_OUT = 0.07;

/**
 * The strip holds still for the first slice of the scroll, so the first panel
 * is settled and readable when you arrive instead of already travelling.
 */
const LEAD_IN = 0.12;
/**
 * And a matching hold at the end. Without it the indicator marks the last
 * panel active while the strip is still travelling, so you stop scrolling
 * with that panel still cut off at the edge.
 */
const LEAD_OUT = 0.12;
const travelProgress = (p: number) =>
  Math.min(1, Math.max(0, (p - LEAD_IN) / (1 - LEAD_IN - LEAD_OUT)));

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

/**
 * Products show their real mark; the index cards get a line icon drawn at the
 * same stroke weight as the arrows, so one strip does not carry two visual
 * languages. Decorative in both cases: the heading beside it already names it.
 */
const ICON_PATHS: Record<string, string> = {
  folder: 'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z',
  writing: 'M4 20h16M6 16l10-10a2 2 0 013 3L9 19l-4 1 1-4z',
  mail: 'M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm0 0l9 6 9-6',
  terminal: 'M5 6l5 5-5 5M13 16h6',
  lightbulb: 'M9 18h6M10 21h4M12 3a6 6 0 00-3 11v2h6v-2a6 6 0 00-3-11z',
};

const PanelIcon = ({ project }: { project: Project }) => {
  const logo = project.logo;
  if (!logo) return null;
  if (logo.type === 'image') {
    return (
      <Image
        src={logo.src}
        alt=""
        aria-hidden="true"
        width={28}
        height={28}
        className="mt-0.5 h-7 w-7 shrink-0 object-contain"
      />
    );
  }
  return (
    <svg
      aria-hidden="true"
      className="mt-0.5 h-7 w-7 shrink-0 text-text-tertiary"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d={ICON_PATHS[logo.name]} />
    </svg>
  );
};

const LINK_CLASS =
  'inline-flex items-center gap-1.5 text-sm font-medium text-text-primary hover:text-accent transition-colors';

const PrimaryLink = ({ project }: { project: Project }) => {
  const label = project.ctaLabel ?? 'Visit site';
  if (project.liveUrl.startsWith('mailto:')) {
    return (
      <a href={project.liveUrl} className={LINK_CLASS}>
        <span>{label}</span>
        <Arrow />
      </a>
    );
  }
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
  /**
   * Record where the pointer crossed the edge, as a percentage of the card, so
   * the fill can bloom from that point. Set on enter only: re-setting it on
   * every move would drag the circle's centre around mid-transition.
   */
  const markEntryPoint = (event: React.PointerEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--mx',
      `${((event.clientX - box.left) / box.width) * 100}%`
    );
    event.currentTarget.style.setProperty(
      '--my',
      `${((event.clientY - box.top) / box.height) * 100}%`
    );
  };

  return (
    <article
      onPointerEnter={markEntryPoint}
      onPointerLeave={markEntryPoint}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-border-secondary bg-background-grain p-5 transition-colors duration-200 sm:p-8 [@media(hover:hover)]:hover:border-text-tertiary md:p-10"
    >
      <span
        aria-hidden="true"
        className="cursor-fill pointer-events-none -z-10 bg-background-primary"
      />
      <div className="flex items-start gap-3">
        <PanelIcon project={project} />
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
      </div>
      <p className="mt-2 max-w-2xl text-[15px] leading-[1.55] sm:text-[16px] sm:leading-relaxed text-text-secondary">
        {project.description}
      </p>

      <div className="mt-5 flex-grow sm:mt-7">
        {detail?.problem && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              The problem
            </p>
            {/* Reading measure stays capped even though the panel is wide. */}
            <p className="mt-2 max-w-2xl text-[15px] leading-[1.55] sm:text-[16px] sm:leading-relaxed text-text-secondary">
              {detail.problem}
            </p>
          </div>
        )}

        {detail?.chose && (
          <div className="mt-5 sm:mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              What I decided
            </p>
            <p className="mt-2 max-w-2xl text-[15px] leading-[1.55] sm:text-[16px] sm:leading-relaxed text-text-primary">
              {detail.chose}
            </p>
            {detail.over && (
              <p className="mt-2 max-w-2xl text-[15px] leading-[1.55] sm:text-[16px] sm:leading-relaxed text-text-secondary">
                Over: {detail.over}
              </p>
            )}
          </div>
        )}

        {detail?.inside && (
          <p className="max-w-2xl text-[15px] leading-[1.55] sm:text-[16px] sm:leading-relaxed text-text-secondary">{detail.inside}</p>
        )}

        {project.links?.length ? (
          <ul className="mt-5 space-y-2.5 sm:mt-6">
            {project.links.map(link => {
              const className =
                'text-[16px] font-medium text-text-primary underline decoration-border-secondary underline-offset-4 transition-colors hover:text-accent hover:decoration-accent';
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

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mt-8">
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

type StripMode = 'stacked' | 'scroller' | 'pinned';

/**
 * Phones get a plain vertical stack: sideways content is content some people
 * never find, and a thumb already knows how to scroll down. Pinning is opt-in
 * on wide screens with motion allowed, never the fallback. Everything between
 * keeps the swipe strip, where there is room for a card to peek in from the
 * edge and say there is more.
 */
const useStripMode = (): StripMode => {
  const [mode, setMode] = useState<StripMode>('stacked');
  useEffect(() => {
    const phone = window.matchMedia('(max-width: 767px)');
    const wide = window.matchMedia('(min-width: 1024px)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      if (phone.matches) setMode('stacked');
      else if (wide.matches && !still.matches) setMode('pinned');
      else setMode('scroller');
    };
    update();
    [phone, wide, still].forEach(query => query.addEventListener('change', update));
    return () => {
      [phone, wide, still].forEach(query => query.removeEventListener('change', update));
    };
  }, []);
  return mode;
};

/** Panels use h3; without an h2 the heading order jumps from the hero's h1. */
const StripHeading = () => (
  <h2 className="mb-4 text-center font-mono text-xs uppercase tracking-[0.14em] text-text-tertiary">
    Selected work
  </h2>
);

const Ticks = ({ activeIndex, onSelect }: { activeIndex: number; onSelect: (i: number) => void }) => (
  <div className="mb-6 flex items-center justify-center gap-1.5">
    {projects.map((project, index) => (
      <button
        key={project.id}
        type="button"
        onClick={() => onSelect(index)}
        aria-label={`Go to ${project.title}`}
        aria-current={index === activeIndex}
        className="group flex min-h-[24px] min-w-[24px] items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
  const stickyRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky) return;
    const reset = () => {
      if (sticky.scrollLeft !== 0) sticky.scrollLeft = 0;
    };
    sticky.addEventListener('scroll', reset);
    return () => sticky.removeEventListener('scroll', reset);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Pull back to reveal more of the strip, then hold, the way rauno.me does.
  const scaleAt = (p: number) => 1 - MAX_ZOOM_OUT * Math.min(1, travelProgress(p) / 0.5);
  const scale = useTransform(scrollYProgress, p => scaleAt(p));

  // Translation is computed against the SCALED width, so the last panel still
  // reaches the edge once the strip has shrunk.
  const x = useTransform(scrollYProgress, p => {
    const t = travelProgress(p);
    const scaledWidth = scaleAt(p) * metrics.stripWidth;
    const travel = Math.max(0, scaledWidth - metrics.viewportWidth + 64);
    return -travel * t;
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', value => {
      setActiveIndex(
        Math.min(projects.length - 1, Math.round(travelProgress(value) * (projects.length - 1)))
      );
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ratio =
      LEAD_IN + (index / Math.max(1, projects.length - 1)) * (1 - LEAD_IN - LEAD_OUT);
    // Document position, not offsetTop: offsetTop is relative to the offset
    // parent, which left the scroll landing short and the indicator a panel behind.
    const documentTop = window.scrollY + wrapper.getBoundingClientRect().top;
    const top = documentTop + ratio * (wrapper.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior });
  }, []);

  /**
   * Keyboard focus lands on links in panels that are translated off-screen.
   * The browser tries to reveal them by scrolling the overflow-hidden
   * container, which desyncs it from the scroll-driven transform. Undo that
   * and move the page instead, so transform, indicator and focus agree.
   * No smooth scroll here: keyboard-initiated moves should be instant.
   *
   * Mouse focus must be left alone. A click focuses the link on mousedown, so
   * repositioning here slid the link out from under the cursor before mouseup
   * and the click never landed — the panel's links were unopenable by mouse.
   * :focus-visible is exactly the keyboard-vs-pointer distinction we want.
   */
  const handleFocusIn = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const strip = stripRef.current;
      if (!strip) return;
      const target = event.target as HTMLElement;
      if (typeof target.matches === 'function' && !target.matches(':focus-visible')) return;
      const panels = Array.from(strip.children) as HTMLElement[];
      const index = panels.findIndex(panel => panel.contains(event.target as Node));
      if (index >= 0) {
        // Set the indicator from focus directly. Deriving it from scroll maths
        // leaves it a panel behind, since the scroll lands mid-range.
        setActiveIndex(index);
        scrollToIndex(index, 'auto');
      }
    },
    [scrollToIndex]
  );

  return (
    <div ref={wrapperRef} style={{ height: `${projects.length * 90}vh` }}>
      <div
        ref={stickyRef}
        onFocus={handleFocusIn}
        className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20 [@media(max-height:820px)]:pt-10"
      >
        <StripHeading />
        <Ticks activeIndex={activeIndex} onSelect={scrollToIndex} />
        <motion.div
          ref={stripRef}
          style={{
            x,
            scale,
            transformOrigin: 'left center',
            // Inset so the first panel sits centred at rest. Flush to the left
            // edge reads as "already scrolled past the start".
            paddingLeft: 'max(2rem, calc((100vw - 46rem) / 2))',
          }}
          className="flex items-stretch gap-5 will-change-transform"
        >
          {projects.map(project => (
            <div key={project.id} className="min-h-[30rem] w-[46rem] max-w-[85vw] shrink-0">
              <Panel project={project} />
            </div>
          ))}
        </motion.div>
        <p className="mt-4 text-center text-xs text-text-tertiary">Keep scrolling</p>
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
      <StripHeading />
      <Ticks activeIndex={activeIndex} onSelect={scrollToIndex} />
      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Selected work, scroll horizontally"
        className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-4 pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent xs:px-5 sm:px-6 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => {
              panelRefs.current[index] = el;
            }}
            className="min-h-[30rem] w-[85vw] max-w-3xl shrink-0 snap-center"
          >
            <Panel project={project} />
          </div>
        ))}
      </div>
    </>
  );
};

/**
 * Phones: one card after another down the page. No ticks, because there is no
 * strip to be at a position in, and nothing sits off-screen to be missed.
 */
const StackedStrip = () => (
  <div className="px-4 xs:px-5 sm:px-6">
    <StripHeading />
    <div className="flex flex-col gap-4">
      {projects.map(project => (
        <Panel key={project.id} project={project} />
      ))}
    </div>
  </div>
);

const Projects = () => {
  const mode = useStripMode();
  return (
    // scroll-mt clears the sticky header, which otherwise covers the heading
    // when the hero cue jumps here.
    <section id="work" className="relative w-full scroll-mt-20 pb-8 md:pb-10">
      {mode === 'pinned' && <PinnedStrip />}
      {mode === 'scroller' && <NativeStrip />}
      {mode === 'stacked' && <StackedStrip />}
    </section>
  );
};

export default Projects;
