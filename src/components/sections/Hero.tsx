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
        <div className="flex flex-col items-center text-center pt-8 pb-8 md:pt-10 md:pb-10">
          {showDemo ? (
            <TerminalDemo onClose={() => setShowDemo(false)} />
          ) : (
            <>
              <h1
                className="tracking-tight leading-[1.15] max-w-3xl"
                style={{ color: 'var(--text-hero)' }}
              >
                <span className="block text-lg xs:text-xl md:text-2xl lg:text-3xl font-medium uppercase tracking-[0.08em] text-text-secondary">
                  I design and ship
                </span>
                <TextType
                  text={['design systems', 'AI audit tools', 'AI products', 'AI-readable specs']}
                  typingSpeed={90}
                  pauseDuration={1800}
                  className="block my-5 md:my-7 text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold min-h-[1.15em]"
                />
                <span className="block text-lg xs:text-xl md:text-2xl lg:text-3xl font-medium uppercase tracking-[0.08em] text-text-secondary">
                  end to end
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg md:text-xl font-medium text-foreground leading-relaxed">
                Designer who codes. I build the tools and write about what breaks.
              </p>
              <div className="mt-7 flex flex-col items-center">
                <TerminalPill command="npx imranai" onClick={() => setShowDemo(true)} />
                <p className="mt-2 text-xs md:text-sm text-text-secondary">
                  Run the command to see what I&apos;ve built.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
