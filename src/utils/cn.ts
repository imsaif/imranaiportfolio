/**
 * Utility function for merging className strings
 * Simple implementation for combining CSS classes
 * @param inputs - Array of class values (strings, undefined, null, false)
 * @returns Merged className string
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}
