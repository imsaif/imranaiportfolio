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
const travelProgress = (p: number) => Math.min(1, Math.max(0, (p - LEAD_IN) / (1 - LEAD_IN - LEAD_OUT)));

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

/**
 * Citation marks (Simple Icons), drawn inline rather than loaded as files so
 * they inherit `currentColor` and sit in the neutral palette with everything
 * else on the card. Filled shapes, unlike the stroked ICON_PATHS above.
 */
const CITED_ICON_PATHS: Record<string, string> = {
  Claude:
    'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z',
  Perplexity:
    'M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z',
};

const CitedIcon = ({ name }: { name: string }) => {
  const path = CITED_ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  );
};

/**
 * Engagement marks for the writing links (Font Awesome 6, inlined for the same
 * reason as the citation marks above: they inherit currentColor and stay in the
 * neutral palette). Solid on both so one is not visually louder than the other.
 */
const CLAP_PATH =
  'M336 16l0 64c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16s16 7.2 16 16zm-98.7 7.1l32 48c4.9 7.4 2.9 17.3-4.4 22.2s-17.3 2.9-22.2-4.4l-32-48c-4.9-7.4-2.9-17.3 4.4-22.2s17.3-2.9 22.2 4.4zM135 119c9.4-9.4 24.6-9.4 33.9 0L292.7 242.7c10.1 10.1 27.3 2.9 27.3-11.3l0-39.4c0-17.7 14.3-32 32-32s32 14.3 32 32l0 153.6c0 57.1-30 110-78.9 139.4c-64 38.4-145.8 28.3-198.5-24.4L7 361c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l53 53c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1L23 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l93 93c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1L55 185c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l117 117c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1l-93-93c-9.4-9.4-9.4-24.6 0-33.9zM433.1 484.9c-24.2 14.5-50.9 22.1-77.7 23.1c48.1-39.6 76.6-99 76.6-162.4l0-98.1c8.2-.1 16-6.4 16-16l0-39.4c0-17.7 14.3-32 32-32s32 14.3 32 32l0 153.6c0 57.1-30 110-78.9 139.4zM424.9 18.7c7.4 4.9 9.3 14.8 4.4 22.2l-32 48c-4.9 7.4-14.8 9.3-22.2 4.4s-9.3-14.8-4.4-22.2l32-48c4.9-7.4 14.8-9.3 22.2-4.4z';
const COMMENT_PATH =
  'M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z';

const LinkStat = ({ path, value, label }: { path: string; value: number; label: string }) => (
  <span className="inline-flex items-center gap-1 text-text-tertiary">
    <svg aria-hidden="true" className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 512 512">
      <path d={path} />
    </svg>
    {value.toLocaleString()}
    <span className="sr-only"> {label}</span>
  </span>
);

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
    event.currentTarget.style.setProperty('--mx', `${((event.clientX - box.left) / box.width) * 100}%`);
    event.currentTarget.style.setProperty('--my', `${((event.clientY - box.top) / box.height) * 100}%`);
  };

  return (
    <article
      onPointerEnter={markEntryPoint}
      onPointerLeave={markEntryPoint}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-border-secondary bg-background-grain p-5 transition-colors duration-200 sm:p-8 [@media(hover:hover)]:hover:border-text-tertiary md:p-10"
    >
      <span aria-hidden="true" className="cursor-fill pointer-events-none -z-10 bg-background-primary" />
      <div className="flex items-start gap-3">
        <PanelIcon project={project} />
        <h3 className="text-xl font-semibold leading-snug tracking-tight text-text-primary md:text-2xl">{project.title}</h3>
      </div>
      {/* One credibility line: the number and who cites it are the same kind of
          claim, so they share a row and wrap together on a narrow card.
          Deliberately outside the icon row above — nested beside the icon it
          inherited the icon's indent and sat further in than the description. */}
      {(project.statLabel || project.citedBy?.length) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {project.statLabel && (
            <span className="font-mono text-[13px] font-bold uppercase leading-relaxed tracking-[0.06em] text-slate-700">
              {project.statLabel}
            </span>
          )}
          {/* Marks drawn in the neutral palette so they read as citations
              rather than as decoration. */}
          {project.citedBy && project.citedBy.length > 0 && (
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-text-tertiary">
              <span>Referenced by</span>
              {project.citedBy.map(name => (
                <span key={name} className="inline-flex items-center gap-1.5 font-medium text-text-secondary">
                  <CitedIcon name={name} />
                  {name}
                </span>
              ))}
            </span>
          )}
        </div>
      )}
      {/* Guarded: a card whose links speak for themselves leaves this empty,
          and an empty paragraph still takes its top margin. */}
      {project.description && (
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.65] sm:text-[16px] sm:leading-relaxed text-text-secondary">
          {project.description}
        </p>
      )}

      <div className="mt-5 flex-grow sm:mt-7">
        {detail?.problem && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">The problem</p>
            {/* Reading measure stays capped even though the panel is wide. */}
            <p className="mt-2 max-w-2xl text-[15px] leading-[1.55] sm:text-[16px] sm:leading-relaxed text-text-secondary">
              {detail.problem}
            </p>
          </div>
        )}

        {detail?.chose && (
          <div className="mt-5 sm:mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">What I decided</p>
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
          <p className="max-w-2xl text-[15px] leading-[1.55] sm:text-[16px] sm:leading-relaxed text-text-secondary">
            {detail.inside}
          </p>
        )}

        {project.links?.length ? (
          <ul className="mt-5 space-y-2.5 sm:mt-6">
            {project.links.map(link => {
              const className =
                'text-[16px] font-medium text-text-primary underline decoration-border-secondary underline-offset-4 transition-colors hover:text-accent hover:decoration-accent';
              // Article links point off-site; case-study links stay internal.
              const isExternal = link.href.startsWith('http');
              return (
                <li key={link.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {isExternal ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link href={link.href} className={className}>
                      {link.label}
                    </Link>
                  )}
                  {/* A flex sibling rather than inline text: inline, the counts
                      wrapped into the middle of a long headline and read as part
                      of it. `shrink-0` keeps them whole; they drop to their own
                      line on a narrow card instead of squeezing. */}
                  {(link.claps != null || link.responses != null) && (
                    <span className="flex shrink-0 items-center gap-3 text-[12px] tabular-nums">
                      {link.claps != null && <LinkStat path={CLAP_PATH} value={link.claps} label="claps" />}
                      {link.responses != null && (
                        <LinkStat path={COMMENT_PATH} value={link.responses} label="responses" />
                      )}
                    </span>
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
  <h2 className="mb-4 text-center font-mono text-xs uppercase tracking-[0.14em] text-text-tertiary">Selected work</h2>
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
            index === activeIndex ? 'w-8 bg-text-primary' : 'w-1 bg-border-secondary group-hover:bg-text-tertiary'
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
      setActiveIndex(Math.min(projects.length - 1, Math.round(travelProgress(value) * (projects.length - 1))));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ratio = LEAD_IN + (index / Math.max(1, projects.length - 1)) * (1 - LEAD_IN - LEAD_OUT);
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
