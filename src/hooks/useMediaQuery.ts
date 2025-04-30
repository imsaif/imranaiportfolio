import { useEffect, useState } from 'react';

/**
 * useMediaQuery - React hook for listening to CSS media queries
 * @param query - media query string (e.g. '(min-width: 768px)')
 * @returns boolean - true if the query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener('change', listener);
    setMatches(mediaQueryList.matches);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
