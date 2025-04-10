'use client';

import { useRef, useEffect } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  percentX: number;
  percentY: number;
}

interface MouseTrackingOptions<T extends HTMLElement> {
  onMouseMove?: (element: T, position: MousePosition) => void;
  onMouseLeave?: () => void;
  onMouseEnter?: () => void;
}

export function useMouseTracking<T extends HTMLElement>({
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
}: MouseTrackingOptions<T> = {}) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const percentX = Math.min(Math.max(x / rect.width, 0), 1);
      const percentY = Math.min(Math.max(y / rect.height, 0), 1);

      onMouseMove?.(element, { x, y, percentX, percentY });
    };

    const handleMouseLeave = () => {
      onMouseLeave?.();
    };

    const handleMouseEnter = () => {
      onMouseEnter?.();
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [onMouseMove, onMouseLeave, onMouseEnter]);

  return { elementRef };
}

// Helper function to apply gradient shift based on mouse position
export function applyGradientShift(element: HTMLElement, position: MousePosition) {
  const { percentX, percentY } = position;

  // Calculate gradient position based on mouse with smoothing
  const gradientX = Math.floor(100 * percentX);
  const gradientY = Math.floor(100 * percentY);

  // Apply the gradient position with a smooth transition
  element.style.backgroundPosition = `${gradientX}% ${gradientY}%`;
}
