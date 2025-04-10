import { useEffect, useRef, useState, RefObject } from 'react';

import { MousePosition } from '../types/animations';

/**
 * Options for the mouse tracking hook
 */
interface UseMouseTrackingOptions {
  /**
   * Optional callback to apply effects based on mouse position
   */
  onMouseMove?: (element: HTMLElement, position: MousePosition) => void;

  /**
   * Whether to throttle mouse move events
   * @default false
   */
  throttle?: boolean;

  /**
   * Throttle delay in milliseconds
   * @default 16 (~ 60fps)
   */
  throttleDelay?: number;
}

/**
 * Custom hook for tracking mouse movement relative to a container element
 * Can be used for creating interactive UI effects based on mouse position
 *
 * @param options Configuration options for the hook
 * @returns Object containing the ref to attach to the element and the current mouse position
 */
export const useMouseTracking = <T extends HTMLElement>(options?: UseMouseTrackingOptions) => {
  const elementRef = useRef<T>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    const shouldThrottle = options?.throttle ?? false;
    const throttleDelay = options?.throttleDelay ?? 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      if (elementRef.current) {
        const now = Date.now();

        // Skip if throttling is enabled and not enough time has passed
        if (shouldThrottle && now - lastUpdateRef.current < throttleDelay) {
          return;
        }

        lastUpdateRef.current = now;
        const rect = elementRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const position: MousePosition = { x, y };
        setMousePosition(position);

        // Call onMouseMove callback if provided
        if (options?.onMouseMove) {
          options.onMouseMove(elementRef.current, position);
        }
      }
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [options]);

  return { elementRef, mousePosition };
};

/**
 * Utility function to create a subtle gradient shift effect based on mouse position
 * Can be used with useMouseTracking
 *
 * @param element The HTML element to apply the gradient shift to
 * @param position The current mouse position relative to the element
 * @param intensityFactor Factor to control the intensity of the shift (higher = more movement)
 */
export const applyGradientShift = (element: HTMLElement, position: MousePosition, intensityFactor = 3): void => {
  const rect = element.getBoundingClientRect();
  const gradientShift = `${50 + (position.x / rect.width) * intensityFactor}%, ${50 + (position.y / rect.height) * intensityFactor}%`;
  element.style.backgroundPosition = gradientShift;
};
