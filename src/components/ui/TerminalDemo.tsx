'use client';

import { useEffect, useState } from 'react';

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

const TerminalDemo = ({ onClose }: TerminalDemoProps) => {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const onCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText('npx imranai');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable — degrade silently.
    }
  };

  const slide = slides[index];

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
          <div className="flex items-center justify-between gap-3">
            <div className="text-white/40">$ npx imranai</div>
            <button
              type="button"
              onClick={onCopyCommand}
              className="text-[11px] md:text-xs font-medium text-white/90 hover:text-white border border-white/20 hover:border-white/50 rounded px-2.5 py-1 transition-colors"
              aria-label="Copy npx imranai to clipboard"
            >
              {copied ? 'copied' : 'copy'}
            </button>
          </div>
          <div className="mt-4 text-white/90 whitespace-pre">
{` _
(_)_ __ ___  _ __ __ _ _ __
| | '_ \` _ \\| '__/ _\` | '_ \\
| | | | | | | | | (_| | | | |
|_|_| |_| |_|_|  \\__,_|_| |_|`}
          </div>
          <div className="mt-3 text-white/50">  Senior product designer · senior in your terminal</div>

          {/* Slide */}
          <div className="mt-6 border border-white/10 rounded-md p-4 transition-opacity duration-300">
            <div className="flex items-baseline gap-3">
              <span className="text-white/40">[{index + 1}/{slides.length}]</span>
              <span className="text-white font-semibold">{slide.title}</span>
            </div>
            <div className="mt-2 text-white/60">{slide.tagline}</div>
            <div className="mt-3 space-y-1 text-white/80">
              {slide.description.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            <div className="mt-3 text-white/70">
              <span className="text-white/40">→ </span>
              {slide.url}
            </div>
          </div>

          <div className="mt-3 text-white/30">
            [←] back   [→] next   [o] open in browser   [q] quit
          </div>
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-text-primary' : 'w-1.5 bg-text-disabled'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TerminalDemo;
