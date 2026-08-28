'use client';

import { Lightbox, type LightboxImage } from '@/components/case-studies/Lightbox';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, type ReactNode } from 'react';

import { useRise } from './sections';

/**
 * Staged visuals for the Cognition case study.
 *
 * These are deliberately separate from `Figure` / `TwoUp` in `sections.tsx`.
 * Those two are also imported by the aiex case study, whose images are a
 * different shape (1145x1064 against these 1568x751), so a treatment tuned for
 * one silently damages the other. Rather than fork the behaviour with flags,
 * the staged versions live here and the shared pair stay as they were.
 *
 * The visual idea: the screenshot sits *on* a warm ground rather than being cut
 * out of the page. Depth comes from the ground and a layered shadow, not from a
 * hairline border.
 */

const STAGE = 'bg-[#F7F5F2] px-6 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16';

/**
 * Full-bleed stages run edge to edge, so they carry less side padding — the
 * point of the width is the screenshot, not the ground around it.
 */
const STAGE_FULL = 'bg-[#F7F5F2] px-6 py-14 sm:px-8 sm:py-20 md:px-10 md:py-24';

/**
 * The ground runs edge to edge; the screenshot does not. Filling the full width
 * with the image leaves the bone as a thin rim and the screenshot crowds the
 * reader — the band has to be visibly wider than what sits on it for the staging
 * to read at all.
 */
const BLEED_CAP = 'mx-auto max-w-5xl';

/**
 * The card the screenshot sits in. Note the concentric radii: the outer radius
 * minus the padding gives the inner one, so the corners stay parallel instead of
 * drifting apart. 14 - 8 = 6.
 */
const FRAME =
  'rounded-[14px] border border-black/5 bg-white p-2 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-4px_rgba(16,24,40,0.08),0_24px_48px_-12px_rgba(16,24,40,0.06)]';
const FRAME_HOVER =
  'transition-shadow duration-300 group-hover:shadow-[0_2px_4px_rgba(16,24,40,0.05),0_16px_36px_-6px_rgba(16,24,40,0.12),0_36px_72px_-16px_rgba(16,24,40,0.10)]';
const SCREEN = 'overflow-hidden rounded-[6px] bg-white';

const CAPTION = 'mx-auto mt-4 max-w-2xl px-6 text-center text-sm text-gray-500';
const LABEL = 'mt-3 font-mono text-[11px] uppercase tracking-wider text-text-tertiary';

type Size = 'narrow' | 'inset' | 'default' | 'wide' | 'full';

const WIDTH: Record<Size, string> = {
  narrow: 'max-w-3xl',
  inset: 'max-w-4xl',
  default: 'max-w-5xl',
  wide: 'max-w-6xl',
  full: 'max-w-none',
};

/**
 * A staged block's outer shell. At `full` the horizontal padding comes off so the
 * bone ground reaches both edges of the viewport; every other size stays in the
 * page's centred column.
 */
function shell(size: Size) {
  return `mx-auto w-full ${WIDTH[size]} ${size === 'full' ? '' : 'px-6'} py-10`;
}

type Item = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

/**
 * A phone bezel drawn in CSS, so the frame is a property of the page rather than
 * something baked into the PNG. Adapted from the frame in the Optum case study,
 * which wraps an iframe at a fixed 375x812. Fixing the screen height there would
 * letterbox these: 488/991 is 0.492 against that frame's 0.462.
 */
function PhoneShell({
  ratio,
  maxWidth,
  children,
}: {
  ratio: string;
  maxWidth?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div
      style={{ maxWidth: maxWidth ?? '300px' }}
      className="relative mx-auto w-full rounded-[2rem] bg-gray-900 p-[10px] shadow-[0_2px_6px_rgba(16,24,40,0.10),0_18px_40px_-8px_rgba(16,24,40,0.22),0_40px_80px_-20px_rgba(16,24,40,0.18)]"
    >
      {/* Side buttons. Purely decorative, so they stay out of the accessibility tree. */}
      <span aria-hidden className="absolute -left-[2px] top-[30%] h-8 w-[3px] rounded-l-md bg-gray-800" />
      <span aria-hidden className="absolute -left-[2px] top-[42%] h-12 w-[3px] rounded-l-md bg-gray-800" />
      <span aria-hidden className="absolute -right-[2px] top-[34%] h-14 w-[3px] rounded-r-md bg-gray-800" />

      <div className="relative overflow-hidden rounded-[22px] bg-white" style={{ aspectRatio: ratio }}>
        {children}
      </div>
    </div>
  );
}

export function PhoneFrame({
  src,
  alt,
  width,
  height,
  sizes,
  onOpen,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  // Explicitly `| undefined`: the project sets exactOptionalPropertyTypes, so a
  // caller forwarding an optional prop through would otherwise not typecheck.
  sizes?: string | undefined;
  onOpen?: (() => void) | undefined;
}) {
  const inner = (
    <PhoneShell ratio={`${width} / ${height}`}>
      <Image src={src} alt={alt} fill sizes={sizes ?? '(max-width: 640px) 100vw, 300px'} className="object-cover" />
    </PhoneShell>
  );

  if (!onOpen) return inner;

  return (
    <button type="button" onClick={onOpen} aria-label={alt} className="group block w-full cursor-zoom-in">
      {inner}
    </button>
  );
}

/**
 * A running prototype on a stage, in place of a screenshot.
 *
 * The prototype is a plain HTML page served from /public and loaded in an
 * iframe — the same arrangement as the Optum receipt demo, which keeps it out of
 * this app's React and Tailwind versions entirely.
 *
 * No zoom affordance and no hover lift: the frame's contents are already
 * interactive, and wrapping them in a button would nest one control inside
 * another. The iframe also needs a height it can fill, hence the ratio on the
 * screen — a percentage height against an auto-height parent collapses to zero.
 */
export function StagedEmbed({
  src,
  title,
  caption,
  ratio,
  size = 'full',
  eager = false,
  device,
  maxWidth,
}: {
  src: string;
  title: string;
  caption: string;
  /** Shape of the frame, e.g. '1568 / 751' — matched to the figures around it. */
  ratio: string;
  size?: Size;
  /** Wrap the running page in a device body rather than the flat card. */
  device?: 'phone';
  /** Only with `device`: how wide the device itself may get. */
  maxWidth?: string;
  /** Set when this is the first thing on the page; lazy-loading it would leave
      the top of the case study empty while it fetches. */
  eager?: boolean;
}) {
  const rise = useRise();
  const full = size === 'full';

  const page = (
    <iframe src={src} title={title} loading={eager ? 'eager' : 'lazy'} className="h-full w-full border-0" />
  );

  return (
    <motion.figure {...rise} className={shell(size)}>
      <div className={full ? STAGE_FULL : STAGE}>
        {/* Wider than the screenshot blocks. A running interface has a sidebar,
            a thread and a composer all competing for width; at the 1024px the
            still images sit at, the whole thing reads cramped. */}
        <div className={full ? 'mx-auto max-w-[1400px]' : ''}>
          {device === 'phone' ? (
            <PhoneShell ratio={ratio} maxWidth={maxWidth}>
              {page}
            </PhoneShell>
          ) : (
            <div className={FRAME}>
              <div className={SCREEN} style={{ aspectRatio: ratio }}>
                {page}
              </div>
            </div>
          )}
        </div>
      </div>
      <figcaption className={CAPTION}>{caption}</figcaption>
    </motion.figure>
  );
}

/**
 * One screenshot on a stage.
 *
 * `size` is the only thing that varies between blocks. Giving every figure the
 * same width is what makes a run of screenshots read as a contact sheet; varying
 * it is most of the rhythm.
 */
export function StagedFigure({
  src,
  alt,
  caption,
  width,
  height,
  sizes,
  size = 'default',
  priority = false,
  zoom = true,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sizes?: string;
  size?: Size;
  priority?: boolean;
  zoom?: boolean;
}) {
  const rise = useRise();
  const [open, setOpen] = useState<number | null>(null);
  const images: LightboxImage[] = [{ src, alt, width, height }];

  const picture = (
    <div className={`${FRAME} ${zoom ? FRAME_HOVER : ''}`}>
      <div className={SCREEN}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes ?? '(max-width: 1024px) 100vw, 1024px'}
          className="h-auto w-full"
        />
      </div>
    </div>
  );

  const full = size === 'full';

  return (
    <motion.figure {...rise} className={shell(size)}>
      <div className={full ? STAGE_FULL : STAGE}>
        <div className={full ? BLEED_CAP : ''}>
          {zoom ? (
            <button
              type="button"
              onClick={() => setOpen(0)}
              aria-label={alt}
              className="group block w-full cursor-zoom-in"
            >
              {picture}
            </button>
          ) : (
            picture
          )}
        </div>
      </div>
      <figcaption className={CAPTION}>{caption}</figcaption>
      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </motion.figure>
  );
}

/**
 * Two or three screenshots on one stage.
 *
 * `variant` decides what each one sits in:
 *   frame — the white card, for full screens
 *   phone — a CSS phone bezel
 *   bare  — nothing, for UI crops, where a card around a sliver of interface
 *           reads as a mistake rather than as a frame
 *
 * `stacked` lays them out one above the other, each filling the width, for a
 * before/after of the same piece of interface.
 */
export function StagedTwoUp({
  items,
  caption,
  sizes,
  size = 'default',
  variant = 'frame',
  aspect,
  stacked = false,
  zoom = true,
}: {
  items: Item[];
  caption: string;
  sizes?: string;
  size?: Size;
  variant?: 'frame' | 'phone' | 'bare';
  /**
   * Force every cell to one shape, e.g. '876 / 1356'. Use when a row's exports
   * are near but not identical shapes and the ragged bottom edge is the thing
   * that looks wrong. Images are contained, never cropped.
   */
  aspect?: string;
  stacked?: boolean;
  zoom?: boolean;
}) {
  const rise = useRise();
  const [open, setOpen] = useState<number | null>(null);
  const images: LightboxImage[] = items.map(({ src, alt, width, height }) => ({ src, alt, width, height }));

  const columns = stacked ? '' : items.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';

  const full = size === 'full';

  return (
    <motion.figure {...rise} className={shell(size)}>
      <div className={full ? STAGE_FULL : STAGE}>
        {/* Phones do not benefit from the full width: two 300px devices in a
            wide field read as lost rather than large. They get the full-bleed
            ground and a tighter cap on the pair itself. */}
        <div
          className={`grid gap-6 ${columns} ${stacked ? 'gap-8' : ''} ${
            full ? (variant === 'phone' ? 'mx-auto max-w-2xl' : BLEED_CAP) : ''
          }`}
        >
          {items.map((item, i) => {
            const trigger = zoom
              ? {
                  onClick: () => setOpen(i),
                  'aria-label': item.alt,
                }
              : null;

            const picture =
              variant === 'phone' ? (
                <PhoneFrame
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes={sizes}
                  onOpen={zoom ? () => setOpen(i) : undefined}
                />
              ) : (
                <div className={variant === 'bare' ? '' : `${FRAME} ${zoom ? FRAME_HOVER : ''}`}>
                  <div
                    className={`${variant === 'bare' ? 'overflow-hidden rounded-[6px]' : SCREEN} ${aspect ? 'relative' : ''}`}
                    style={aspect ? { aspectRatio: aspect } : undefined}
                  >
                    {aspect ? (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes={sizes ?? '(max-width: 640px) 100vw, 512px'}
                        className="object-contain"
                      />
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        sizes={sizes ?? '(max-width: 640px) 100vw, 512px'}
                        className="h-auto w-full"
                      />
                    )}
                  </div>
                </div>
              );

            const body =
              variant === 'phone' || !zoom ? (
                picture
              ) : (
                <button type="button" {...trigger} className="group block w-full cursor-zoom-in">
                  {picture}
                </button>
              );

            return (
              // The frames hug their images rather than being forced to a shared
              // aspect ratio, so nothing is letterboxed or cropped. The labels
              // still line up because each is pushed to the bottom of its cell.
              // Stacked crops both fill the width. They are the same piece of
              // interface captured at two resolutions (1260x108 and 965x83 —
              // near-identical aspect), so filling the width is what makes them
              // the same apparent size. Scaling them by their source widths
              // would preserve the capture difference, not cancel it.
              <div key={item.src} className="flex flex-col">
                {body}
                <p className={`${LABEL} mt-auto pt-3`}>{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
      <figcaption className={CAPTION}>{caption}</figcaption>
      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </motion.figure>
  );
}
