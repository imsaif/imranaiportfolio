'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';

/**
 * Small, shared pieces for the Cognition case study.
 *
 * The page deliberately runs long on images and short on prose. The product's
 * own design principle was "calm, editorial", and the write-up holds to it.
 */

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
};

export function Section({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <motion.section {...rise} className="mx-auto w-full max-w-[820px] px-6 py-16 md:py-24">
      <div className="mb-8 flex items-baseline gap-4">
        <span className="font-mono text-sm tabular-nums text-text-tertiary">{index}</span>
        <h2 className="text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[32px]">{title}</h2>
      </div>
      <div className="space-y-6 text-[18px] leading-[1.65] tracking-[-0.01em] text-text-secondary md:text-[20px]">{children}</div>
    </motion.section>
  );
}

export function Figure({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <motion.figure {...rise} className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <Image
          src={src}
          alt={alt}
          width={1459}
          height={812}
          priority={priority}
          className="h-auto w-full"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
      <figcaption className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500">{caption}</figcaption>
    </motion.figure>
  );
}

/**
 * Two frames side by side, each with its own small label. For before/after
 * pairs where the difference is the point and a single image cannot show it.
 */
export function TwoUp({
  items,
  caption,
}: {
  items: { src: string; alt: string; label: string }[];
  caption: string;
}) {
  return (
    <motion.figure {...rise} className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map(item => (
          <div key={item.src}>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <Image
                src={item.src}
                alt={item.alt}
                width={1570}
                height={751}
                className="h-auto w-full"
                sizes="(max-width: 640px) 100vw, 512px"
              />
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">{item.label}</p>
          </div>
        ))}
      </div>
      <figcaption className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-500">{caption}</figcaption>
    </motion.figure>
  );
}

export function Pull({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <motion.blockquote
      {...rise}
      className="mx-auto w-full max-w-5xl border-l-2 border-gray-900 px-6 py-3 pl-8 md:pl-10"
    >
      <p className="max-w-4xl text-[26px] font-medium leading-[1.3] tracking-[-0.02em] text-text-primary md:text-[34px]">
        {children}
      </p>
      {cite ? (
        <cite className="mt-5 block font-mono text-[11px] uppercase not-italic tracking-wider text-text-tertiary">
          {cite}
        </cite>
      ) : null}
    </motion.blockquote>
  );
}

export function Readers({ items }: { items: { who: string; need: string; constraint: string }[] }) {
  return (
    <motion.ul
      {...rise}
      className="mx-auto grid w-full max-w-5xl gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 sm:grid-cols-3"
    >
      {items.map(item => (
        <li key={item.who} className="flex flex-col gap-3 bg-white p-7 md:p-8">
          <span className="text-[19px] font-bold leading-snug tracking-[-0.01em] text-text-primary md:text-[20px]">
            {item.who}
          </span>
          <span className="text-[16px] leading-[1.6] tracking-[-0.01em] text-text-secondary md:text-[17px]">
            {item.need}
          </span>
          <span className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
            {item.constraint}
          </span>
        </li>
      ))}
    </motion.ul>
  );
}

export function Steps({ items }: { items: { label: string; body: string }[] }) {
  return (
    <ol className="space-y-7 border-l border-gray-200 pl-7">
      {items.map((item, i) => (
        <li key={item.label} className="relative">
          {/* Centred on the rule horizontally (half the 28px indent plus half the
              24px marker). Vertically: the label's first line is 19px x 1.4, so its
              centre sits at 13.3px and the 24px marker starts 1px down. An `em`
              offset would resolve against the marker's own 11px font, not the
              label's, so this is deliberately a fixed value. */}
          <span className="absolute -left-[40px] top-px flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white font-mono text-[11px] tabular-nums text-text-tertiary">
            {i + 1}
          </span>
          <p className="text-[18px] font-semibold leading-[1.4] tracking-[-0.01em] text-text-primary md:text-[19px]">
            {item.label}
          </p>
          <p className="mt-2 text-[17px] leading-[1.6] text-text-secondary md:text-[18px]">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Shipped({ built, notBuilt }: { built: string[]; notBuilt?: string[] }) {
  return (
    <div className={notBuilt?.length ? 'grid gap-8 sm:grid-cols-2' : ''}>
      <div>
        <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gray-500">Built</h3>
        <ul className="space-y-2">
          {built.map(b => (
            <li key={b} className="flex gap-2 text-[15px] text-gray-700">
              <span aria-hidden className="text-gray-500">
                &#8212;
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
      {notBuilt?.length ? (
        <div>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gray-500">Scoped, and next</h3>
          <ul className="space-y-2">
            {notBuilt.map(b => (
              <li key={b} className="flex gap-2 text-[15px] text-gray-500">
                <span aria-hidden className="text-gray-400">
                  &#8212;
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
