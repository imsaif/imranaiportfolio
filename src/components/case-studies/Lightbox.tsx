'use client';

import FocusTrap from 'focus-trap-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Full-size view for a case-study screenshot.
 *
 * The screenshots are 1500px+ wide but render around 1000px, so the detail that
 * makes them worth showing is not legible in the page flow. This is the way to
 * actually read them.
 *
 * Two constraints drive the implementation:
 *
 * 1. It renders through a portal to `document.body`. The figures animate in with
 *    framer-motion's `whileInView`, which leaves an inline `transform` on the
 *    settled element. A `position: fixed` overlay inside a transformed ancestor
 *    resolves against that ancestor rather than the viewport, so an overlay left
 *    in place would be positioned against the figure and clipped by it.
 *
 * 2. It appears and disappears instantly, with no fade either way. An entry fade
 *    has to be triggered after the first paint, and the frame callback that does
 *    it is throttled in a backgrounded tab — which left the overlay mounted and
 *    fully transparent. An overlay you cannot see but cannot click past is worse
 *    than one that simply appears.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  /** `null` closes it. */
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const open = index !== null;

  useEffect(() => setMounted(true), []);

  // Lenis owns wheel and touch scrolling and exposes no ref to pause it, so the
  // overlay opts out via `data-lenis-prevent`. That leaves the keyboard, which
  // Lenis does not intercept, hence the overflow lock as well.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const step = useCallback(
    (delta: number) => {
      if (index === null || images.length < 2) return;
      onNavigate((index + delta + images.length) % images.length);
    },
    [index, images.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, step, onClose]);

  if (!mounted || index === null) return null;

  const image = images[index];
  if (!image) return null;

  const many = images.length > 1;

  return createPortal(
    <FocusTrap
      focusTrapOptions={{
        // The trap manages focus and nothing else. Wiring `onDeactivate` to
        // onClose looks right and is not: React remounts effects once in
        // development, the trap deactivates on that first teardown, and the
        // lightbox closed itself in the same frame it opened. Escape and the
        // backdrop are handled here instead, where they cannot misfire.
        escapeDeactivates: false,
        clickOutsideDeactivates: false,
        allowOutsideClick: true,
        returnFocusOnDeactivate: true,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
        data-lenis-prevent
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0b0b]/80 p-4 backdrop-blur-sm md:p-12"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl leading-none text-white transition-colors hover:bg-white/20 md:right-6 md:top-6"
        >
          &times;
        </button>

        {many ? (
          <>
            <button
              type="button"
              onClick={event => {
                event.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
            >
              &#8592;
            </button>
            <button
              type="button"
              onClick={event => {
                event.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
            >
              &#8594;
            </button>
          </>
        ) : null}

        {/* The enlarged image keeps the frame it had on the page, so it reads as
            the same object brought closer rather than a different asset. */}
        {/* Sized by width, then clamped by the height the image's own aspect
            ratio allows in the viewport. Letting the image size itself with
            max-height alone leaves a wide screenshot far smaller than the space
            available, which defeats the point of opening it. */}
        <div
          onClick={event => event.stopPropagation()}
          style={{
            width: 'min(92vw, 1500px)',
            maxWidth: `calc(84vh * ${image.width} / ${image.height})`,
          }}
          className="rounded-[14px] border border-black/5 bg-white p-2 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.5)]"
        >
          <div className="overflow-hidden rounded-[6px] bg-white">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="92vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </FocusTrap>,
    document.body
  );
}
