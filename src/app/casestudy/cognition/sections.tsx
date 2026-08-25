'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';

/**
 * Small, shared pieces for the Cognition case study.
 *
 * The page deliberately runs long on images and short on prose — the product's
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
    <motion.section {...rise} className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <div className="mb-8 flex items-baseline gap-4">
        <span className="font-mono text-sm tabular-nums text-gray-400">{index}</span>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">{title}</h2>
      </div>
      <div className="space-y-6 text-[17px] leading-relaxed text-gray-700">{children}</div>
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
    <motion.figure {...rise} className="mx-auto w-full max-w-5xl px-6 py-4">
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

export function Pull({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <blockquote className="border-l-2 border-gray-900 py-1 pl-6">
      <p className="text-xl leading-snug text-gray-900 md:text-2xl">{children}</p>
      {cite ? <cite className="mt-3 block text-sm not-italic text-gray-500">{cite}</cite> : null}
    </blockquote>
  );
}

export function Readers({ items }: { items: { who: string; need: string; constraint: string }[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 sm:grid-cols-3">
      {items.map(item => (
        <li key={item.who} className="flex flex-col gap-2 bg-white p-5">
          <span className="text-sm font-semibold text-gray-900">{item.who}</span>
          <span className="text-sm leading-relaxed text-gray-600">{item.need}</span>
          <span className="mt-auto pt-2 font-mono text-xs uppercase tracking-wide text-gray-400">
            {item.constraint}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Steps({ items }: { items: { label: string; body: string }[] }) {
  return (
    <ol className="space-y-5 border-l border-gray-200 pl-6">
      {items.map((item, i) => (
        <li key={item.label} className="relative">
          <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white font-mono text-[10px] text-gray-500">
            {i + 1}
          </span>
          <p className="font-medium text-gray-900">{item.label}</p>
          <p className="mt-1 text-gray-600">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Shipped({ built, notBuilt }: { built: string[]; notBuilt: string[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gray-500">Built</h3>
        <ul className="space-y-2">
          {built.map(b => (
            <li key={b} className="flex gap-2 text-[15px] text-gray-700">
              <span aria-hidden className="text-gray-400">
                &#8212;
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-gray-500">Designed, not built</h3>
        <ul className="space-y-2">
          {notBuilt.map(b => (
            <li key={b} className="flex gap-2 text-[15px] text-gray-500">
              <span aria-hidden className="text-gray-300">
                &#8212;
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
