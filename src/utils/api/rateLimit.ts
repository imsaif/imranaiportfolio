import { log, LogLevel } from './logging';

// Rate limiting configuration
export const DEFAULT_RATE_LIMIT = 20; // Maximum requests per user per window
export const DEFAULT_RATE_WINDOW_MS = 3600000; // 1 hour in milliseconds
export const MIN_RATE_LIMIT = 5; // Minimum requests per window
export const MAX_RATE_LIMIT = 100; // Maximum requests per window
export const MIN_RATE_WINDOW_MS = 60000; // 1 minute minimum
export const MAX_RATE_WINDOW_MS = 86400000; // 24 hours maximum
export const MAX_RATE_LIMIT_ENTRIES = 1000; // Maximum number of unique users to track

// Rate limiting storage (NOTE: this will reset when the serverless function cold starts)
// In production, use Redis or another persistent store for more reliable rate limiting
export type RateLimitEntry = {
  count: number;
  resetAt: number;
  lastAccessed: number;
};
export const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Cleanup old rate limit entries and enforce maximum size
 */
export function cleanupRateLimitStore() {
  const now = Date.now();

  // First, remove expired entries
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }

  // If we're still over the maximum size, remove oldest entries based on lastAccessed
  if (rateLimitStore.size > MAX_RATE_LIMIT_ENTRIES) {
    const entries = Array.from(rateLimitStore.entries())
      .sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);

    // Calculate how many entries to remove to get below the limit
    const entriesToRemove = rateLimitStore.size - MAX_RATE_LIMIT_ENTRIES;

    // Remove the oldest entries
    for (let i = 0; i < entriesToRemove && i < entries.length; i++) {
      const entry = entries[i];
      if (entry) {
        rateLimitStore.delete(entry[0]);
      }
    }
  }
}

/**
 * Generate a more robust user identifier
 * @param headersList Headers object to extract identifiers from
 * @returns A user identifier string
 */
export function generateUserId(headersList: Headers): string {
  // Extract potential identifiers from headers
  const ip = headersList.get('x-forwarded-for') ||
             headersList.get('x-real-ip') ||
             'unknown';
  const ua = headersList.get('user-agent') || 'unknown';

  // Create a fingerprint using a combination of factors
  // In production, consider using a more sophisticated fingerprinting library
  const fingerprint = `${ip}-${ua.substring(0, 50)}`;

  // Hash the fingerprint for privacy and to prevent using manipulated values directly
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }

  return `user_${Math.abs(hash).toString(36)}`;
}

/**
 * Check if a request exceeds the rate limit
 * @param limit Maximum number of requests allowed per window
 * @param windowMs Time window in milliseconds
 * @param headersList Headers object to extract user identifiers from
 * @returns Object containing isLimited flag and reset time info
 */
export function checkRateLimit(
  limit: number,
  windowMs: number,
  headersList: Headers
): {
  isLimited: boolean;
  timeUntilReset?: number;
  userId: string;
} {
  // Clean up expired rate limit entries
  cleanupRateLimitStore();

  // Get user identifier for rate limiting
  const userId = generateUserId(headersList);

  // Check rate limit
  const now = Date.now();
  const userRateLimit = rateLimitStore.get(userId);

  // No previous requests from this user
  if (!userRateLimit) {
    // First request from this user
    rateLimitStore.set(userId, {
      count: 1,
      resetAt: now + windowMs,
      lastAccessed: now
    });

    return { isLimited: false, userId };
  }

  // Reset counter if window has passed
  if (userRateLimit.resetAt < now) {
    rateLimitStore.set(userId, {
      count: 1,
      resetAt: now + windowMs,
      lastAccessed: now
    });

    return { isLimited: false, userId };
  }

  // Check if user has exceeded their rate limit
  if (userRateLimit.count >= limit) {
    const timeUntilReset = userRateLimit.resetAt - now;

    // Update last accessed time even when rate limited
    userRateLimit.lastAccessed = now;
    rateLimitStore.set(userId, userRateLimit);

    log(LogLevel.WARN, `Rate limit exceeded for user ${userId}`, {
      limit,
      requestCount: userRateLimit.count,
      timeUntilReset
    });

    return {
      isLimited: true,
      timeUntilReset,
      userId
    };
  }

  // Increment the counter and update last accessed time
  userRateLimit.count += 1;
  userRateLimit.lastAccessed = now;
  rateLimitStore.set(userId, userRateLimit);

  return { isLimited: false, userId };
}
