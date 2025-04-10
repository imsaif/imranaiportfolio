import {
  checkRateLimit,
  rateLimitStore,
  generateUserId,
  cleanupRateLimitStore,
} from '../../utils/api/rateLimit';

describe('Rate Limiting Functionality', () => {
  beforeEach(() => {
    // Clear rate limit store before each test
    rateLimitStore.clear();
  });

  it('generates consistent user IDs for the same headers', () => {
    // Create two identical header objects
    const headers1 = new Headers({
      'x-forwarded-for': '192.168.1.1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    });

    const headers2 = new Headers({
      'x-forwarded-for': '192.168.1.1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    });

    // Generate user IDs
    const userId1 = generateUserId(headers1);
    const userId2 = generateUserId(headers2);

    // User IDs should be the same for identical headers
    expect(userId1).toBe(userId2);
  });

  it('generates different user IDs for different headers', () => {
    // Create two different header objects
    const headers1 = new Headers({
      'x-forwarded-for': '192.168.1.1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    });

    const headers2 = new Headers({
      'x-forwarded-for': '192.168.1.2', // Different IP
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    });

    // Generate user IDs
    const userId1 = generateUserId(headers1);
    const userId2 = generateUserId(headers2);

    // User IDs should be different for different headers
    expect(userId1).not.toBe(userId2);
  });

  it('uses fallback values when headers are missing', () => {
    // Create headers without standard identifying info
    const emptyHeaders = new Headers({});

    // Should still generate a user ID
    const userId = generateUserId(emptyHeaders);
    expect(userId).toBeDefined();
    expect(userId).toContain('user_');
  });

  it('allows requests when under the rate limit', () => {
    const headers = new Headers({
      'x-forwarded-for': '192.168.1.1',
      'user-agent': 'Test User Agent',
    });

    const limit = 5;
    const windowMs = 60000; // 1 minute

    // Make multiple requests under the limit
    for (let i = 0; i < limit; i++) {
      const result = checkRateLimit(limit, windowMs, headers);
      expect(result.isLimited).toBe(false);
    }
  });

  it('blocks requests when rate limit is exceeded', () => {
    const headers = new Headers({
      'x-forwarded-for': '192.168.1.1',
      'user-agent': 'Test User Agent',
    });

    const limit = 3;
    const windowMs = 60000; // 1 minute

    // Make requests up to the limit
    for (let i = 0; i < limit; i++) {
      const result = checkRateLimit(limit, windowMs, headers);
      expect(result.isLimited).toBe(false);
    }

    // The next request should be limited
    const limitedResult = checkRateLimit(limit, windowMs, headers);
    expect(limitedResult.isLimited).toBe(true);
    expect(limitedResult.timeUntilReset).toBeDefined();
    expect(limitedResult.timeUntilReset).toBeLessThanOrEqual(windowMs);
    expect(limitedResult.timeUntilReset).toBeGreaterThan(0);
  });

  it('resets rate limit after window expires', () => {
    // Mock Date.now to control time
    const originalDateNow = Date.now;
    let currentTime = 1600000000000; // Example timestamp
    Date.now = jest.fn(() => currentTime);

    const headers = new Headers({
      'x-forwarded-for': '192.168.1.1',
      'user-agent': 'Test User Agent',
    });

    const limit = 2;
    const windowMs = 60000; // 1 minute

    // Make requests up to the limit
    for (let i = 0; i < limit; i++) {
      const result = checkRateLimit(limit, windowMs, headers);
      expect(result.isLimited).toBe(false);
    }

    // The next request should be limited
    const limitedResult = checkRateLimit(limit, windowMs, headers);
    expect(limitedResult.isLimited).toBe(true);

    // Advance time beyond the window
    currentTime += windowMs + 1000; // 1 minute + 1 second

    // The limit should be reset now
    const resetResult = checkRateLimit(limit, windowMs, headers);
    expect(resetResult.isLimited).toBe(false);

    // Restore original Date.now
    Date.now = originalDateNow;
  });

  it('cleans up expired rate limit entries', () => {
    // Mock Date.now to control time
    const originalDateNow = Date.now;
    let currentTime = 1600000000000; // Example timestamp
    Date.now = jest.fn(() => currentTime);

    // Create several rate limit entries
    rateLimitStore.set('user1', {
      count: 1,
      resetAt: currentTime + 1000, // Expires soon
      lastAccessed: currentTime,
    });

    rateLimitStore.set('user2', {
      count: 1,
      resetAt: currentTime + 60000, // Expires later
      lastAccessed: currentTime,
    });

    // Store size before cleanup
    const initialSize = rateLimitStore.size;
    expect(initialSize).toBe(2);

    // Advance time so user1 entry expires
    currentTime += 2000; // 2 seconds later
    
    // Clean up
    cleanupRateLimitStore();

    // Only user1 entry should be removed
    expect(rateLimitStore.size).toBe(1);
    expect(rateLimitStore.has('user1')).toBe(false);
    expect(rateLimitStore.has('user2')).toBe(true);

    // Restore original Date.now
    Date.now = originalDateNow;
  });
}); 