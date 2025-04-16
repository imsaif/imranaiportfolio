import Redis from 'ioredis';
import { log, LogLevel } from './logging';

// In-memory rate limiting for fallback when Redis isn't available
import { RateLimitEntry, checkRateLimit, DEFAULT_RATE_LIMIT, DEFAULT_RATE_WINDOW_MS } from './rateLimit';

/**
 * Redis client instance, using REDIS_URL from environment variables.
 * Connection is reused across hot reloads in development.
 * Uses a fallback when Redis isn't available.
 */
const globalForRedis = global as unknown as { redis?: Redis; redisAvailable?: boolean };

// Try to create Redis client, with error handling
let redisInstance: Redis | null = null;
const shouldAttemptRedis = !!process.env.REDIS_URL; // Check if REDIS_URL is set

// Determine initial availability based *only* on the presence of REDIS_URL.
// We respect the global value only if it's explicitly false (meaning a previous attempt failed).
let isAvailable = shouldAttemptRedis;
if (globalForRedis.redisAvailable === false) {
    isAvailable = false; // If already marked as failed, keep it failed.
}
globalForRedis.redisAvailable = isAvailable;

// Instantiate Redis client only if the URL is provided and we determined it's available initially
if (isAvailable) {
  try {
    // Use existing global instance or create a new one if necessary
    if (!globalForRedis.redis) {
        redisInstance = new Redis(process.env.REDIS_URL!, { // Non-null assertion checked by isAvailable
            maxRetriesPerRequest: 1, // Limit retries on initial connection attempt
            connectTimeout: 1500,
            retryStrategy: (times) => {
               // No automatic retry on initial connection failure
               if (times === 1) {
                 log(LogLevel.WARN, `Initial Redis connection attempt failed.`);
               }
               return null; // Stop retrying
            },
            enableOfflineQueue: false, // Don't queue commands if connection fails
            lazyConnect: true // IMPORTANT: Connect only when a command is issued
        });
        globalForRedis.redis = redisInstance;
        log(LogLevel.INFO, 'Redis client configured (lazy connect) using REDIS_URL.');

        // Add event listeners to handle async errors and update availability
        redisInstance.on('connect', () => {
            log(LogLevel.INFO, 'Redis connected successfully.');
            globalForRedis.redisAvailable = true;
        });

        redisInstance.on('error', (err) => {
            log(LogLevel.WARN, 'Redis async error, marking unavailable.', { error: err.message });
            globalForRedis.redisAvailable = false;
             // Clean up the potentially problematic global instance on error
             if (globalForRedis.redis === redisInstance) {
                 globalForRedis.redis = undefined;
                 redisInstance = null; // Ensure local variable is also null
             }
        });

        redisInstance.on('close', () => {
            log(LogLevel.WARN, 'Redis connection closed, marking unavailable.');
            globalForRedis.redisAvailable = false;
             // Clean up the potentially problematic global instance on close
             if (globalForRedis.redis === redisInstance) {
                 globalForRedis.redis = undefined;
                 redisInstance = null; // Ensure local variable is also null
             }
        });

        // REMOVED explicit redisInstance.connect() call here.
    } else {
        // Reuse existing global instance
        redisInstance = globalForRedis.redis;
        // Update availability based on reused instance status IF it's not connecting/closed
        if (redisInstance.status !== 'connecting' && redisInstance.status !== 'reconnecting' && redisInstance.status !== 'end') {
             globalForRedis.redisAvailable = redisInstance.status === 'ready' || redisInstance.status === 'connect';
        } else {
             // If reused instance is in a transient or closed state, mark unavailable
             globalForRedis.redisAvailable = false;
        }
        log(LogLevel.INFO, `Reusing existing Redis client instance (status: ${redisInstance.status}). Availability set to ${globalForRedis.redisAvailable}`);
    }

  } catch (error) {
    // Catch immediate instantiation errors (e.g., invalid URL format)
    log(LogLevel.WARN, 'Redis instantiation failed, using in-memory fallback', {
      error: error instanceof Error ? error.message : String(error)
    });
    globalForRedis.redisAvailable = false;
    redisInstance = null;
    if (globalForRedis.redis) {
        globalForRedis.redis = undefined; // Clean up global
    }
  }
} else {
  // Handle case where REDIS_URL is not set or was marked unavailable previously
  if (!process.env.REDIS_URL) {
    log(LogLevel.INFO, 'REDIS_URL not set, Redis disabled. Using in-memory fallback.');
  } else {
    log(LogLevel.INFO, 'Redis previously marked unavailable, using in-memory fallback.');
  }
  globalForRedis.redisAvailable = false;
  redisInstance = null;
  if (globalForRedis.redis) {
      globalForRedis.redis = undefined; // Clean up global
  }
}

export const redis = redisInstance;
// Export the availability status determined during initialization
export const redisAvailable = globalForRedis.redisAvailable || false;

/**
 * Result of a rate limit check
 */
export type RedisRateLimitResult = {
  isLimited: boolean;
  timeUntilReset?: number;
};

/**
 * Check if a user has exceeded their rate limit using Redis.
 * Uses atomic INCR and EXPIRE for safe, distributed rate limiting.
 * Falls back to in-memory rate limiting if Redis is unavailable.
 *
 * @param userId Unique identifier for the user (e.g., from IP/User-Agent hash)
 * @param limit Max number of allowed requests per window
 * @param windowSec Window size in seconds
 * @returns { isLimited, timeUntilReset }
 */
export async function checkRedisRateLimit(
  userId: string,
  limit: number,
  windowSec: number
): Promise<RedisRateLimitResult> {
  // Fall back to in-memory rate limiting if Redis is unavailable
  if (!redisAvailable || !redis) {
    log(LogLevel.DEBUG, 'Using in-memory rate limiting fallback', { userId });
    
    // Convert seconds to milliseconds for in-memory rate limiting
    const windowMs = windowSec * 1000;
    
    // Use headers object that contains the userId for in-memory rate limiting
    const mockHeaders = new Headers();
    mockHeaders.set('x-user-id', userId);
    
    const result = checkRateLimit(limit, windowMs, mockHeaders);
    return {
      isLimited: result.isLimited,
      timeUntilReset: result.timeUntilReset
    };
  }

  const key = `rate_limit:${userId}`;
  const ttl = windowSec;

  try {
    // Use multi for atomicity
    const execResult = await redis
      .multi()
      .incr(key)
      .ttl(key)
      .exec();

    if (!execResult || execResult.length < 2) {
      // If Redis is unavailable or result is malformed, fail safe: limit user
      return { isLimited: true };
    }

    const [incrErr, current] = execResult[0];
    const [ttlErr, expire] = execResult[1];

    if (incrErr || ttlErr || typeof current !== 'number' || typeof expire !== 'number') {
      // If Redis errors, fail safe: limit user
      return { isLimited: true };
    }

    // If first request, set expiry
    if (current === 1) {
      await redis.expire(key, ttl);
      return { isLimited: false };
    }

    // If over the limit
    if (current > limit) {
      // Get time until reset
      const timeUntilReset = expire > 0 ? expire : ttl;
      return { isLimited: true, timeUntilReset: timeUntilReset * 1000 };
    }

    return { isLimited: false };
  } catch (error) {
    log(LogLevel.ERROR, 'Redis rate limiting error, using fallback', { 
      error: error instanceof Error ? error.message : String(error),
      userId 
    });
    
    // Fall back to in-memory rate limiting on Redis error
    const windowMs = windowSec * 1000;
    const mockHeaders = new Headers();
    mockHeaders.set('x-user-id', userId);
    
    const result = checkRateLimit(limit, windowMs, mockHeaders);
    return {
      isLimited: result.isLimited,
      timeUntilReset: result.timeUntilReset
    };
  }
} 