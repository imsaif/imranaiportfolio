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
                className="font-bold tracking-tight leading-[1.15]"
                style={{ color: 'var(--text-hero)' }}
              >
                <span className="block whitespace-nowrap text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-medium text-text-secondary">
                  Transforming{' '}
                  <TextType
                    text={['complexity', 'confusion']}
                    typingSpeed={90}
                    pauseDuration={1800}
                    className="font-medium"
                  />
                  {' '}into
                </span>
                <span className="block mt-3 md:mt-4 text-4xl xs:text-5xl md:text-6xl lg:text-7xl">
                  Clarity
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-base md:text-lg text-text-secondary leading-relaxed">
                Imran is a senior product designer building AI-native apps.
                Run the command to see what he&apos;s built.
              </p>
              <div className="mt-7">
                <TerminalPill command="npx imranai" onClick={() => setShowDemo(true)} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
