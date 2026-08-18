'use client';

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

  return (
    <section className="relative w-full px-4 xs:px-5 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center pt-14 pb-6 md:pt-20 md:pb-8">
          {showDemo ? (
            <TerminalDemo onClose={() => setShowDemo(false)} />
          ) : (
            <>
              <h1
                className="tracking-tight leading-[1.45] max-w-4xl"
                style={{ color: 'var(--text-hero)' }}
              >
                <span className="block text-[11px] xs:text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-text-secondary">
                  Senior Product Designer and Design Engineer
                </span>
                <span className="mt-6 md:mt-8 block text-balance text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold">
                  I design and build
                </span>
                {/* Cycling text sits last so nothing downstream can reflow as it types. */}
                <TextType
                  text={['audit tools', 'MCP servers', 'design systems']}
                  typingSpeed={90}
                  pauseDuration={1800}
                  className="mt-6 md:mt-8 block text-base xs:text-lg md:text-xl font-medium uppercase tracking-[0.08em] text-text-secondary min-h-[1.8em]"
                />
              </h1>
              <div className="mt-10 md:mt-12 flex flex-col items-center">
                <TerminalPill command="imran --work" onClick={() => setShowDemo(true)} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
