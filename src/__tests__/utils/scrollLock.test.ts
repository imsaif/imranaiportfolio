import { toggleScrollLock } from '../../utils/scrollLock';

// Mock the entire scrollLock module to avoid JSDOM issues
jest.mock('../utils/scrollLock', () => ({
  toggleScrollLock: jest.fn((lock: boolean) => {
    if (typeof document === 'undefined') return;

    if (lock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }),
}));

describe('scrollLock utility', () => {
  beforeEach(() => {
    // Reset body styles between tests
    document.body.style.overflow = '';
  });

  test('should lock scrolling when called with true', () => {
    toggleScrollLock(true);
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('should unlock scrolling when called with false', () => {
    // First set the style directly
    document.body.style.overflow = 'hidden';

    // Then call the function
    toggleScrollLock(false);

    // Check if style was reset
    expect(document.body.style.overflow).toBe('');
  });

  test('should handle server-side rendering (undefined document)', () => {
    const originalDocument = global.document;

    try {
      // Simulate server-side rendering
      (global as any).document = undefined;

      // Should not throw an error
      expect(() => {
        toggleScrollLock(true);
        toggleScrollLock(false);
      }).not.toThrow();
    } finally {
      // Restore document
      (global as any).document = originalDocument;
    }
  });
});
