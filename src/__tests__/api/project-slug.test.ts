import { validateProjectSlug } from '../../utils/api/validation';

// Mock logging function to prevent console output during tests
jest.mock('../../utils/api/logging', () => ({
  log: jest.fn(),
  LogLevel: {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    DEBUG: 'debug',
  },
}));

describe('Project Slug Validation', () => {
  it('requires a slug parameter', () => {
    // Test with empty slug
    const emptyResult = validateProjectSlug('');
    
    expect(emptyResult.valid).toBe(false);
    expect(emptyResult.error).toContain('required');
    
    // Test with undefined/null (TypeScript will prevent this, but testing for robustness)
    // @ts-ignore
    const undefinedResult = validateProjectSlug(undefined);
    
    expect(undefinedResult.valid).toBe(false);
    expect(undefinedResult.error).toContain('required');
  });

  it('validates slug format correctly', () => {
    // Valid slugs with different characters
    const validSlugs = [
      'project-1',
      'my_awesome_project',
      'project123',
      'UPPERCASE',
      '123numerical',
      'mixed-123_slug',
    ];
    
    validSlugs.forEach(slug => {
      const result = validateProjectSlug(slug);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
    
    // Invalid slugs with disallowed characters
    const invalidSlugs = [
      'project with spaces',
      'project.with.dots',
      'project/with/slashes',
      'project@with@symbols',
      'project?with?questions',
      'project+with+plus',
      'project&with&ampersands',
    ];
    
    invalidSlugs.forEach(slug => {
      const result = validateProjectSlug(slug);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid project slug format');
    });
  });

  it('should work with edge cases', () => {
    // Single character slug
    const singleCharResult = validateProjectSlug('a');
    expect(singleCharResult.valid).toBe(true);
    
    // Very long slug (should be valid if format is correct)
    const longSlug = 'a'.repeat(100) + '-' + 'b'.repeat(100);
    const longSlugResult = validateProjectSlug(longSlug);
    expect(longSlugResult.valid).toBe(true);
  });
});
