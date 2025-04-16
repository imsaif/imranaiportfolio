import Redis from 'ioredis';

/**
 * Redis client instance, using REDIS_URL from environment variables.
 * Connection is reused across hot reloads in development.
 */
const globalForRedis = global as unknown as { redis?: Redis };
export const redis =
  globalForRedis.redis ||
  new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
if (!globalForRedis.redis) globalForRedis.redis = redis;

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
  const key = `rate_limit:${userId}`;
  const ttl = windowSec;

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
} 