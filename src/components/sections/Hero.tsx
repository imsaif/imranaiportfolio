'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import TerminalDemo from '@/components/ui/TerminalDemo';
import TerminalPill from '@/components/ui/TerminalPill';

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  cursorCharacter?: string;
  className?: string;
}

const TextType = ({
  text,
  typingSpeed = 90,
  pauseDuration = 1500,
  cursorCharacter = '|',
  className = '',
}: TextTypeProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const current = text[currentTextIndex];
    if (!current) return;

    let t: ReturnType<typeof setTimeout>;
    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex(i => (i + 1) % text.length);
        setCurrentCharIndex(0);
      } else {
        t = setTimeout(() => setDisplayText(prev => prev.slice(0, -1)), typingSpeed / 2);
      }
    } else {
      if (currentCharIndex < current.length) {
        t = setTimeout(() => {
          setDisplayText(prev => prev + current[currentCharIndex]);
          setCurrentCharIndex(i => i + 1);
        }, typingSpeed);
      } else {
        t = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    }
    return () => clearTimeout(t);
  }, [displayText, currentCharIndex, isDeleting, currentTextIndex, text, typingSpeed, pauseDuration]);

  useEffect(() => {
    const i = setInterval(() => setCursorOn(c => !c), 500);
    return () => clearInterval(i);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span style={{ opacity: cursorOn ? 1 : 0 }}>{cursorCharacter}</span>
    </span>
  );
};

const Hero = () => {
  const [showDemo, setShowDemo] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full px-4 xs:px-5 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="relative flex min-h-[calc(100vh-53px)] flex-col items-center justify-center text-center py-16">
          {showDemo ? (
            <TerminalDemo onClose={() => setShowDemo(false)} />
          ) : (
            <>
              {/*
                Above the fold, so it is the likely LCP element: priority skips
                the lazy-load wait. The source is a 1024px square with no alpha,
                and the hero is white, so it sits on the page without a cutout.
              */}
              <motion.div
                // Entrance is quick; the idle float is ambient, so it is allowed
                // to be slow. Both are transform/opacity only, and reduced
                // motion drops straight to the resting state.
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, y: [0, -6, 0], scale: 1 }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        opacity: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
                        scale: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
                        y: { duration: 5.5, ease: 'easeInOut', repeat: Infinity, delay: 0.45 },
                      }
                }
                {...(reduceMotion ? {} : { whileHover: { scale: 1.05, rotate: -1.5 } })}
                className="mb-8 md:mb-10"
              >
                <Image
                  src="/images/profile/imranlineart.png"
                  alt="Line drawing of Imran Mohammed"
                  width={160}
                  height={160}
                  priority
                  className="h-28 w-28 md:h-36 md:w-36"
                />
              </motion.div>
              <h1
                className="tracking-tight leading-[1.6] max-w-4xl"
                style={{ color: 'var(--text-hero)' }}
              >
                <span className="block text-[11px] xs:text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-text-secondary">
                  Senior Product Designer and Design Engineer
                </span>
                <span className="mt-8 md:mt-12 block text-balance text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold">
                  I design and build
                </span>
                {/* Cycling text sits last so nothing downstream can reflow as it types. */}
                <TextType
                  text={['audit tools', 'MCP servers', 'design systems']}
                  typingSpeed={90}
                  pauseDuration={1800}
                  className="mt-8 md:mt-12 block text-base xs:text-lg md:text-xl font-medium uppercase tracking-[0.08em] text-text-secondary min-h-[1.8em]"
                />
              </h1>
              <div className="mt-14 md:mt-20 flex flex-col items-center">
                <TerminalPill command="imran --work" onClick={() => setShowDemo(true)} />
              </div>

              {/*
                The hero owns a full screen, so nothing below it peeks through.
                This cue says there is more, and is a real link so keyboard and
                screen-reader users get the same affordance. Arrow only: the
                word "work" already appears in the hero command and the strip
                heading just below, and three in a column read as a stutter. motion-safe keeps
                it still for anyone who asked for reduced motion.
              */}
              <a
                href="#work"
                aria-label="Scroll to selected work"
                onClick={event => {
                  const target = document.getElementById('work');
                  if (!target) return;
                  // The default anchor jump lands on the filmstrip with no
                  // travel, which reads as a glitch rather than a move.
                  // Reduced motion keeps the instant jump on purpose.
                  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                  event.preventDefault();
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="group absolute bottom-8 flex flex-col items-center p-2 text-text-tertiary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <svg
                  aria-hidden="true"
                  // Still on phones: an endless bounce costs battery and
                  // attention on a small screen for decoration nobody needs.
                  className="h-5 w-5 md:motion-safe:animate-[bounce_2.4s_ease-in-out_infinite]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
