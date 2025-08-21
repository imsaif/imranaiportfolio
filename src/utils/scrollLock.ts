/**
 * Utility functions for managing document scroll locking
 * Used when displaying modals, dialogs, or expanding UI elements
 */

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
