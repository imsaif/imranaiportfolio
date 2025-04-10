/**
 * Utility functions for managing document scroll locking
 * Used when displaying modals, dialogs, or expanding UI elements
 */

// Store the original body styles to restore them later
const originalStyles: {
  overflow?: string;
  position?: string;
  top?: string;
  width?: string;
  paddingRight?: string;
} = {};

/**
 * Get the width of the browser's scrollbar
 * @returns Width of the scrollbar in pixels
 */
const getScrollbarWidth = (): number => {
  // Create a temporary div to measure scrollbar width
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  // Create inner div to get the difference in width
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculate the scrollbar width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Clean up
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
};

/**
 * Toggles scroll locking on the body element
 * @param lock Whether to lock (true) or unlock (false) scrolling
 */
export const toggleScrollLock = (lock: boolean): void => {
  // Don't do anything on the server
  if (typeof document === 'undefined') return;

  // Store the scroll position
  const scrollY = window.scrollY;

  if (lock) {
    // Simplest approach: just set overflow hidden on html and body
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Set a data attribute to store the scroll position
    document.body.dataset.scrollPosition = scrollY.toString();
  } else {
    // Restore scrolling
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    // Get the stored position
    const storedPosition = document.body.dataset.scrollPosition || '0';
    const parsedPosition = parseInt(storedPosition, 10);

    // Restore the scroll position
    window.scrollTo(0, parsedPosition);
  }
};
