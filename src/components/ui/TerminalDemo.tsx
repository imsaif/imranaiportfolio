'use client';

import { useEffect, useRef, useState } from 'react';

interface TerminalDemoProps {
  onClose: () => void;
}

interface DemoSlide {
  title: string;
  tagline: string;
  description: string[];
  url: string;
}

const slides: DemoSlide[] = [
  {
    title: 'designwithclaude',
    tagline: 'A senior designer inside your terminal.',
    description: [
      'I built dwic to be a senior designer inside your terminal.',
      'It audits design systems, catches drift, and ships specialist',
      'agents you can drop into Claude Code.',
    ],
    url: 'https://designwithclaude.com',
  },
  {
    title: 'AI UX Design Guide',
    tagline: 'AI UX patterns from real products.',
    description: [
      'I built aiuxdesign.guide to document AI UX patterns from real',
      'products. A free, open library used by designers shipping AI',
      'features today.',
    ],
    url: 'https://aiuxdesign.guide',
  },
  {
    title: 'llmsgist.org',
    tagline: 'Structured design specs for AI coding tools.',
    description: [
      'I built llmsgist as a structured spec format for AI coding tools.',
      '.gist.design files give Claude, Cursor, and Copilot the design',
      'context they otherwise lack.',
    ],
    url: 'https://llmsgist.org',
  },
];

const BANNER_LINES = [
  ' _',
  '(_)_ __ ___  _ __ __ _ _ __',
  "| | '_ ` _ \\| '__/ _` | '_ \\",
  '| | | | | | | | | (_| | | | |',
  '|_|_| |_| |_|_|  \\__,_|_| |_|',
];

const SUBTITLE = '  Senior product designer';

const BANNER_LINE_MS = 220;
const CHAR_MS = 45;
const CHAR_JITTER_MS = 40;
const FIELD_GAP_MS = 360;
const LINE_GAP_MS = 220;
const SLIDE_FADE_MS = 280;

const typeDelay = () => CHAR_MS + Math.random() * CHAR_JITTER_MS;

const Cursor = () => (
  <span
    className="inline-block w-[7px] h-[1em] -mb-[2px] align-middle bg-white/70"
    style={{ animation: 'blink 1s steps(1) infinite' }}
  />
);

type Phase =
  | 'banner'
  | 'subtitle'
  | 'slide-in'
  | 'slide-title'
  | 'slide-tagline'
  | 'slide-desc'
  | 'slide-url'
  | 'slide-prompt'
  | 'slide-hold'
  | 'resume-prompt'
  | 'resume-declined'
  | 'resume-redirecting'
  | 'done';

const TerminalDemo = ({ onClose }: TerminalDemoProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const [bannerLines, setBannerLines] = useState(0);
  const [subtitleChars, setSubtitleChars] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [phase, setPhase] = useState<Phase>('banner');
  const [titleChars, setTitleChars] = useState(0);
  const [taglineChars, setTaglineChars] = useState(0);
  const [descLineIdx, setDescLineIdx] = useState(0);
  const [descLineChars, setDescLineChars] = useState(0);
  const [urlChars, setUrlChars] = useState(0);
  const [slideVisible, setSlideVisible] = useState(false);
  const [promptAnswer, setPromptAnswer] = useState<'' | 'y' | 'n'>('');
  const [resumeAnswer, setResumeAnswer] = useState<'' | 'y' | 'n'>('');

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPrefersReducedMotion(true);
      setBannerLines(BANNER_LINES.length);
      setSubtitleChars(SUBTITLE.length);
      setSlideVisible(true);
      setPhase('done');
    }
  }, []);

  const timers = useRef<number[]>([]);
  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  useEffect(() => {
    return () => {
      timers.current.forEach(id => window.clearTimeout(id));
      timers.current = [];
    };
  }, []);

  const jumpToSlide = (next: number) => {
    if (next < 0 || next >= slides.length) return;
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
    setCurrentSlide(next);
    setTitleChars(0);
    setTaglineChars(0);
    setDescLineIdx(0);
    setDescLineChars(0);
    setUrlChars(0);
    setPromptAnswer('');
    setResumeAnswer('');
    setSlideVisible(true);
    setPhase('slide-in');
  };

  // Global keyboard shortcuts: q closes, ←/→ navigate slides.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k.toLowerCase() === 'q') {
        e.preventDefault();
        onClose();
        return;
      }
      const past = phase !== 'banner' && phase !== 'subtitle';
      if (!past) return;
      if (k === 'ArrowRight') {
        e.preventDefault();
        jumpToSlide(currentSlide + 1);
      } else if (k === 'ArrowLeft') {
        e.preventDefault();
        jumpToSlide(currentSlide - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, currentSlide, onClose]);

  // Phase: banner — reveal one line at a time.
  useEffect(() => {
    if (phase !== 'banner') return;
    if (bannerLines >= BANNER_LINES.length) {
      schedule(() => setPhase('subtitle'), 250);
      return;
    }
    const id = schedule(() => setBannerLines(n => n + 1), BANNER_LINE_MS);
    return () => window.clearTimeout(id);
  }, [phase, bannerLines]);

  // Phase: subtitle — type chars.
  useEffect(() => {
    if (phase !== 'subtitle') return;
    if (subtitleChars >= SUBTITLE.length) {
      schedule(() => {
        setSlideVisible(true);
        setPhase('slide-in');
      }, 300);
      return;
    }
    const id = schedule(() => setSubtitleChars(n => n + 1), typeDelay());
    return () => window.clearTimeout(id);
  }, [phase, subtitleChars]);

  // Phase: slide-in — small delay for fade-in before typing title.
  useEffect(() => {
    if (phase !== 'slide-in') return;
    const id = schedule(() => setPhase('slide-title'), SLIDE_FADE_MS);
    return () => window.clearTimeout(id);
  }, [phase, currentSlide]);

  // Phase: slide-title.
  useEffect(() => {
    if (phase !== 'slide-title') return;
    const target = slides[currentSlide]!.title;
    if (titleChars >= target.length) {
      schedule(() => setPhase('slide-tagline'), FIELD_GAP_MS);
      return;
    }
    const id = schedule(() => setTitleChars(n => n + 1), typeDelay());
    return () => window.clearTimeout(id);
  }, [phase, titleChars, currentSlide]);

  // Phase: slide-tagline.
  useEffect(() => {
    if (phase !== 'slide-tagline') return;
    const target = slides[currentSlide]!.tagline;
    if (taglineChars >= target.length) {
      schedule(() => setPhase('slide-desc'), FIELD_GAP_MS);
      return;
    }
    const id = schedule(() => setTaglineChars(n => n + 1), typeDelay());
    return () => window.clearTimeout(id);
  }, [phase, taglineChars, currentSlide]);

  // Phase: slide-desc — stream description lines, char by char.
  useEffect(() => {
    if (phase !== 'slide-desc') return;
    const desc = slides[currentSlide]!.description;
    if (descLineIdx >= desc.length) {
      schedule(() => setPhase('slide-url'), FIELD_GAP_MS);
      return;
    }
    const line = desc[descLineIdx]!;
    if (descLineChars >= line.length) {
      const id = schedule(() => {
        setDescLineIdx(i => i + 1);
        setDescLineChars(0);
      }, LINE_GAP_MS);
      return () => window.clearTimeout(id);
    }
    const id = schedule(() => setDescLineChars(n => n + 1), typeDelay());
    return () => window.clearTimeout(id);
  }, [phase, descLineIdx, descLineChars, currentSlide]);

  // Phase: slide-url.
  useEffect(() => {
    if (phase !== 'slide-url') return;
    const target = slides[currentSlide]!.url;
    if (urlChars >= target.length) {
      const isLast = currentSlide >= slides.length - 1;
      schedule(() => setPhase(isLast ? 'done' : 'slide-prompt'), 600);
      return;
    }
    const id = schedule(() => setUrlChars(n => n + 1), typeDelay());
    return () => window.clearTimeout(id);
  }, [phase, urlChars, currentSlide]);

  // Phase: slide-prompt — wait for y/n keypress.
  useEffect(() => {
    if (phase !== 'slide-prompt') return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'y') {
        e.preventDefault();
        setPromptAnswer('y');
        schedule(() => setPhase('slide-hold'), 350);
      } else if (k === 'n') {
        e.preventDefault();
        setPromptAnswer('n');
        schedule(() => setPhase('resume-prompt'), 500);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  // Phase: resume-prompt — wait for y/n to view resume.
  useEffect(() => {
    if (phase !== 'resume-prompt') return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === 'y') {
        e.preventDefault();
        setResumeAnswer('y');
        setPhase('resume-redirecting');
        schedule(() => {
          window.location.href = '/resume';
        }, 600);
      } else if (k === 'n') {
        e.preventDefault();
        setResumeAnswer('n');
        schedule(() => setPhase('resume-declined'), 350);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  // Phase: slide-hold — fade out, advance, fade in, restart streaming.
  useEffect(() => {
    if (phase !== 'slide-hold') return;
    if (currentSlide >= slides.length - 1) {
      setPhase('done');
      return;
    }
    const id = schedule(() => {
      setSlideVisible(false);
      schedule(() => {
        setCurrentSlide(i => i + 1);
        setTitleChars(0);
        setTaglineChars(0);
        setDescLineIdx(0);
        setDescLineChars(0);
        setUrlChars(0);
        setPromptAnswer('');
        setSlideVisible(true);
        setPhase('slide-in');
      }, SLIDE_FADE_MS);
    }, 150);
    return () => window.clearTimeout(id);
  }, [phase, currentSlide]);

  const slide = slides[currentSlide]!;

  const isStreamingBanner = phase === 'banner';
  const isStreamingSubtitle = phase === 'subtitle';
  const showSlide = phase !== 'banner' && phase !== 'subtitle';
  const titleText = prefersReducedMotion ? slide.title : slide.title.slice(0, titleChars);
  const taglineText = prefersReducedMotion ? slide.tagline : slide.tagline.slice(0, taglineChars);
  const urlText = prefersReducedMotion ? slide.url : slide.url.slice(0, urlChars);
  const afterSlideUrl = ['slide-url', 'slide-prompt', 'slide-hold', 'resume-prompt', 'resume-declined', 'resume-redirecting', 'done'];
  const showTagline =
    prefersReducedMotion ||
    ['slide-tagline', 'slide-desc', ...afterSlideUrl].includes(phase);
  const showDesc =
    prefersReducedMotion || ['slide-desc', ...afterSlideUrl].includes(phase);
  const showUrl = prefersReducedMotion || afterSlideUrl.includes(phase);
  const showContinuePrompt =
    phase === 'slide-prompt' ||
    phase === 'resume-prompt' ||
    phase === 'resume-declined' ||
    phase === 'resume-redirecting' ||
    (phase === 'slide-hold' && promptAnswer === 'y');
  const showResumePrompt =
    phase === 'resume-prompt' || phase === 'resume-declined' || phase === 'resume-redirecting';

  const renderedDesc = prefersReducedMotion
    ? slide.description
    : slide.description.slice(0, descLineIdx).concat(
        descLineIdx < slide.description.length
          ? [slide.description[descLineIdx]!.slice(0, descLineChars)]
          : []
      );

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Window chrome */}
      <div className="rounded-2xl bg-[#1a1f2e] shadow-elevated overflow-hidden text-left">
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f1320] border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-white/40 font-mono">~ — npx imranai</span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-white/90 hover:text-white border border-white/20 hover:border-white/50 rounded px-2.5 py-1 transition-colors"
            aria-label="Close demo"
          >
            ✕ close
          </button>
        </div>

        {/* Terminal body */}
        <div className="p-6 md:p-8 font-mono text-[13px] md:text-sm leading-[1.6]">
          <div className="text-white/40">$ npx imranai</div>

          {/* Banner */}
          <div className="mt-4 text-white/90 whitespace-pre min-h-[7.5em]">
            {BANNER_LINES.slice(0, bannerLines).map((line, i) => (
              <div key={i}>
                {line}
                {isStreamingBanner && i === bannerLines - 1 && <Cursor />}
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <div className="mt-3 text-white/50 min-h-[1.6em]">
            {prefersReducedMotion ? SUBTITLE : SUBTITLE.slice(0, subtitleChars)}
            {isStreamingSubtitle && <Cursor />}
          </div>

          {/* Slide */}
          <div
            className="mt-6 border border-white/10 rounded-md p-4 transition-opacity"
            style={{
              transitionDuration: `${SLIDE_FADE_MS}ms`,
              opacity: showSlide && slideVisible ? 1 : 0,
            }}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-white/40">
                [{currentSlide + 1}/{slides.length}]
              </span>
              <span className="text-white font-semibold">
                {titleText}
                {phase === 'slide-title' && <Cursor />}
              </span>
            </div>
            <div className="mt-2 text-white/60 min-h-[1.6em]">
              {showTagline && taglineText}
              {phase === 'slide-tagline' && <Cursor />}
            </div>
            <div className="mt-3 space-y-1 text-white/80">
              {showDesc &&
                renderedDesc.map((line, i) => (
                  <div key={i}>
                    {line}
                    {phase === 'slide-desc' && i === renderedDesc.length - 1 && <Cursor />}
                  </div>
                ))}
            </div>
            <div className="mt-3 text-white/70 min-h-[1.6em]">
              {showUrl && (
                <>
                  <span className="text-white/40">→ </span>
                  {urlText}
                  {phase === 'slide-url' && <Cursor />}
                </>
              )}
            </div>
          </div>

          {/* Continue prompt */}
          {showContinuePrompt && (
            <div className="mt-4 text-white/80">
              <span>? Continue to next project? </span>
              <span className="text-white/50">[y/n] </span>
              <span className="text-white">{promptAnswer}</span>
              {phase === 'slide-prompt' && <Cursor />}
            </div>
          )}

          {/* Resume prompt — shown when user says no to continuing */}
          {showResumePrompt && (
            <div className="mt-3 text-white/80">
              <span>? Want to see Imran&apos;s resume? </span>
              <span className="text-white/50">[y/n] </span>
              <span className="text-white">{resumeAnswer}</span>
              {phase === 'resume-prompt' && <Cursor />}
              {phase === 'resume-declined' && (
                <div className="mt-2 text-white/50">
                  No problem — feel free to browse the projects below.
                </div>
              )}
              {phase === 'resume-redirecting' && (
                <div className="mt-2 text-white/50">
                  Opening resume<span className="inline-block">…</span>
                </div>
              )}
            </div>
          )}

          <div className="mt-3 text-white/30">
            [←] back   [→] next   [q] quit
          </div>
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === currentSlide ? 'w-6 bg-text-primary' : 'w-1.5 bg-text-disabled'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TerminalDemo;
