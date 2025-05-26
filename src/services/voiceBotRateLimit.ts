/**
 * Voice Bot Rate Limiting Service
 * Prevents API abuse and controls costs for ElevenLabs and chat interactions
 */

export interface VoiceUsageStats {
  totalCharacters: number;
  conversationCount: number;
  clonedVoiceMinutes: number;
  estimatedCost: number;
  lastActivity: Date;
}

export interface VoiceRateLimits {
  // Session limits (per browser session)
  maxConversationsPerSession: number;
  maxMessagesPerConversation: number;
  maxCharactersPerMessage: number;
  maxCharactersPerSession: number;

  // Time-based limits
  maxConversationsPerHour: number;
  maxCharactersPerHour: number;
  cooldownBetweenMessages: number; // seconds

  // Daily limits (resets at midnight)
  maxConversationsPerDay: number;
  maxCharactersPerDay: number;
  maxCostPerDay: number; // dollars

  // Voice cloning specific
  maxClonedVoiceMinutesPerDay: number;
  maxClonedVoiceCharactersPerSession: number;
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
  timeUntilReset?: number; // milliseconds
  currentUsage?: VoiceUsageStats;
  limits?: VoiceRateLimits;
}

import { getVoiceRateLimits, validateRateLimits } from '../utils/voiceRateLimitConfig';

// Get default limits from environment configuration
const getDefaultLimits = (): VoiceRateLimits => {
  const limits = getVoiceRateLimits();

  // Validate the configuration
  const errors = validateRateLimits(limits);
  if (errors.length > 0) {
    console.warn('Voice rate limit configuration issues:', errors);
  }

  return limits;
};

class VoiceBotRateLimiter {
  private sessionData: Map<string, VoiceUsageStats> = new Map();
  private hourlyData: Map<string, VoiceUsageStats> = new Map();
  private dailyData: Map<string, VoiceUsageStats> = new Map();
  private lastMessageTime: Map<string, number> = new Map();
  private conversationCounts: Map<string, number> = new Map();
  private messageCounts: Map<string, number> = new Map();

  private limits: VoiceRateLimits;

  constructor(customLimits?: Partial<VoiceRateLimits>) {
    this.limits = { ...getDefaultLimits(), ...customLimits };

    // Cleanup old data every hour
    setInterval(() => this.cleanup(), 60 * 60 * 1000);
  }

  /**
   * Generate user identifier based on session and IP (privacy-respecting)
   */
  private generateUserId(request?: Request): string {
    if (typeof window !== 'undefined') {
      // Client-side: use session storage for consistent ID
      let sessionId = sessionStorage.getItem('voice_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('voice_session_id', sessionId);
      }
      return sessionId;
    }

    // Server-side: use IP-based identifier (if available)
    const forwarded = request?.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0] || request?.headers.get('x-real-ip') || 'unknown';
    return `ip_${ip.replace(/\./g, '_')}`;
  }

  /**
   * Get current time-based keys for tracking
   */
  private getTimeKeys() {
    const now = new Date();
    const hourKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}`;
    const dayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    return { hourKey, dayKey };
  }

  /**
   * Initialize or get usage stats for a user
   */
  private getOrCreateStats(userMap: Map<string, VoiceUsageStats>, userId: string): VoiceUsageStats {
    if (!userMap.has(userId)) {
      userMap.set(userId, {
        totalCharacters: 0,
        conversationCount: 0,
        clonedVoiceMinutes: 0,
        estimatedCost: 0,
        lastActivity: new Date(),
      });
    }
    return userMap.get(userId)!;
  }

  /**
   * Estimate cost based on character count
   */
  private estimateCost(characters: number, useClonedVoice = true): number {
    if (!useClonedVoice) return 0;
    const costPerChar = 0.0003; // ElevenLabs approximate pricing
    return characters * costPerChar;
  }

  /**
   * Estimate speaking time based on character count
   */
  private estimateSpeakingTime(characters: number): number {
    const averageWPM = 150; // words per minute
    const averageCharsPerWord = 5;
    const wordsPerMinute = averageWPM;
    const charactersPerMinute = wordsPerMinute * averageCharsPerWord;
    return characters / charactersPerMinute;
  }

  /**
   * Check if a voice interaction is allowed
   */
  public checkRateLimit(messageText: string, useClonedVoice = true, request?: Request): RateLimitResult {
    const userId = this.generateUserId(request);
    const messageLength = messageText.length;
    const estimatedCost = this.estimateCost(messageLength, useClonedVoice);
    const estimatedMinutes = this.estimateSpeakingTime(messageLength);
    const now = Date.now();

    // Check message length limit
    if (messageLength > this.limits.maxCharactersPerMessage) {
      return {
        allowed: false,
        reason: `Message too long. Maximum ${this.limits.maxCharactersPerMessage} characters allowed.`,
      };
    }

    // Check cooldown between messages
    const lastMessageTime = this.lastMessageTime.get(userId) || 0;
    const timeSinceLastMessage = (now - lastMessageTime) / 1000;
    if (timeSinceLastMessage < this.limits.cooldownBetweenMessages) {
      const waitTime = this.limits.cooldownBetweenMessages - timeSinceLastMessage;
      return {
        allowed: false,
        reason: `Please wait ${Math.ceil(waitTime)} seconds before sending another message.`,
        timeUntilReset: waitTime * 1000,
      };
    }

    // Get time-based keys
    const { hourKey, dayKey } = this.getTimeKeys();

    // Get or create usage stats for different time periods
    const sessionStats = this.getOrCreateStats(this.sessionData, userId);
    const hourlyStats = this.getOrCreateStats(this.hourlyData, `${userId}_${hourKey}`);
    const dailyStats = this.getOrCreateStats(this.dailyData, `${userId}_${dayKey}`);

    // Check session limits
    if (sessionStats.totalCharacters + messageLength > this.limits.maxCharactersPerSession) {
      return {
        allowed: false,
        reason: `Session character limit reached. Maximum ${this.limits.maxCharactersPerSession} characters per session.`,
        currentUsage: sessionStats,
      };
    }

    // Check hourly limits
    if (hourlyStats.totalCharacters + messageLength > this.limits.maxCharactersPerHour) {
      return {
        allowed: false,
        reason: `Hourly character limit reached. Please try again in the next hour.`,
        timeUntilReset: (60 - new Date().getMinutes()) * 60 * 1000,
        currentUsage: hourlyStats,
      };
    }

    // Check daily limits
    if (dailyStats.totalCharacters + messageLength > this.limits.maxCharactersPerDay) {
      return {
        allowed: false,
        reason: `Daily character limit reached. Please try again tomorrow.`,
        timeUntilReset: this.getTimeUntilMidnight(),
        currentUsage: dailyStats,
      };
    }

    // Check daily cost limit
    if (dailyStats.estimatedCost + estimatedCost > this.limits.maxCostPerDay) {
      return {
        allowed: false,
        reason: `Daily cost limit reached. Please try again tomorrow.`,
        timeUntilReset: this.getTimeUntilMidnight(),
        currentUsage: dailyStats,
      };
    }

    // Check cloned voice specific limits
    if (useClonedVoice) {
      if (dailyStats.clonedVoiceMinutes + estimatedMinutes > this.limits.maxClonedVoiceMinutesPerDay) {
        return {
          allowed: false,
          reason: `Daily voice cloning limit reached. Standard voice will be used instead.`,
          currentUsage: dailyStats,
        };
      }

      if (sessionStats.totalCharacters + messageLength > this.limits.maxClonedVoiceCharactersPerSession) {
        return {
          allowed: false,
          reason: `Session voice cloning limit reached. Standard voice will be used instead.`,
          currentUsage: sessionStats,
        };
      }
    }

    // Check conversation and message counts
    const sessionConversationCount = this.conversationCounts.get(userId) || 0;
    const sessionMessageCount = this.messageCounts.get(userId) || 0;

    if (sessionConversationCount >= this.limits.maxConversationsPerSession) {
      return {
        allowed: false,
        reason: `Maximum conversations per session reached. Please refresh to start a new session.`,
        currentUsage: sessionStats,
      };
    }

    if (sessionMessageCount >= this.limits.maxMessagesPerConversation) {
      return {
        allowed: false,
        reason: `Maximum messages per conversation reached. Please start a new conversation.`,
        currentUsage: sessionStats,
      };
    }

    // All checks passed
    return {
      allowed: true,
      currentUsage: sessionStats,
      limits: this.limits,
    };
  }

  /**
   * Record usage after a successful interaction
   */
  public recordUsage(messageText: string, useClonedVoice = true, request?: Request): void {
    const userId = this.generateUserId(request);
    const messageLength = messageText.length;
    const estimatedCost = this.estimateCost(messageLength, useClonedVoice);
    const estimatedMinutes = this.estimateSpeakingTime(messageLength);
    const now = new Date();

    // Update last message time
    this.lastMessageTime.set(userId, Date.now());

    // Increment message count
    const currentMessageCount = this.messageCounts.get(userId) || 0;
    this.messageCounts.set(userId, currentMessageCount + 1);

    // Get time-based keys
    const { hourKey, dayKey } = this.getTimeKeys();

    // Update usage stats for all time periods
    const sessionStats = this.getOrCreateStats(this.sessionData, userId);
    const hourlyStats = this.getOrCreateStats(this.hourlyData, `${userId}_${hourKey}`);
    const dailyStats = this.getOrCreateStats(this.dailyData, `${userId}_${dayKey}`);

    // Update stats
    [sessionStats, hourlyStats, dailyStats].forEach(stats => {
      stats.totalCharacters += messageLength;
      stats.estimatedCost += estimatedCost;
      stats.lastActivity = now;

      if (useClonedVoice) {
        stats.clonedVoiceMinutes += estimatedMinutes;
      }
    });
  }

  /**
   * Start a new conversation (increment conversation count)
   */
  public startNewConversation(request?: Request): boolean {
    const userId = this.generateUserId(request);
    const currentCount = this.conversationCounts.get(userId) || 0;

    if (currentCount >= this.limits.maxConversationsPerSession) {
      return false;
    }

    this.conversationCounts.set(userId, currentCount + 1);
    this.messageCounts.set(userId, 0); // Reset message count for new conversation
    return true;
  }

  /**
   * Get current usage statistics for a user
   */
  public getCurrentUsage(request?: Request): VoiceUsageStats | null {
    const userId = this.generateUserId(request);
    return this.sessionData.get(userId) || null;
  }

  /**
   * Get time until midnight (for daily reset)
   */
  private getTimeUntilMidnight(): number {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return midnight.getTime() - now.getTime();
  }

  /**
   * Clean up old data to prevent memory leaks
   */
  private cleanup(): void {
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;
    const dayAgo = now - 24 * 60 * 60 * 1000;

    // Clean up hourly data older than 2 hours
    for (const [key, stats] of this.hourlyData.entries()) {
      if (stats.lastActivity.getTime() < hourAgo) {
        this.hourlyData.delete(key);
      }
    }

    // Clean up daily data older than 7 days
    for (const [key, stats] of this.dailyData.entries()) {
      if (stats.lastActivity.getTime() < dayAgo * 7) {
        this.dailyData.delete(key);
      }
    }

    // Clean up session data for inactive users (older than 1 hour)
    for (const [key, stats] of this.sessionData.entries()) {
      if (stats.lastActivity.getTime() < hourAgo) {
        this.sessionData.delete(key);
        this.lastMessageTime.delete(key);
        this.conversationCounts.delete(key);
        this.messageCounts.delete(key);
      }
    }
  }

  /**
   * Get current rate limits configuration
   */
  public getLimits(): VoiceRateLimits {
    return { ...this.limits };
  }

  /**
   * Check if should use cloned voice based on current usage
   */
  public shouldUseClonedVoice(messageText: string, request?: Request): boolean {
    const result = this.checkRateLimit(messageText, true, request);
    return result.allowed;
  }

  /**
   * Reset user session (for testing or admin purposes)
   */
  public resetUserSession(request?: Request): void {
    const userId = this.generateUserId(request);
    this.sessionData.delete(userId);
    this.lastMessageTime.delete(userId);
    this.conversationCounts.delete(userId);
    this.messageCounts.delete(userId);
  }

  /**
   * Get usage summary for monitoring
   */
  public getUsageSummary(): {
    activeSessions: number;
    totalCharactersToday: number;
    totalCostToday: number;
    averageSessionLength: number;
  } {
    const { dayKey } = this.getTimeKeys();
    let totalCharactersToday = 0;
    let totalCostToday = 0;
    const activeSessions = this.sessionData.size;

    // Sum up daily usage across all users
    for (const [key, stats] of this.dailyData.entries()) {
      if (key.includes(dayKey.split('_')[1])) {
        // Match today's date
        totalCharactersToday += stats.totalCharacters;
        totalCostToday += stats.estimatedCost;
      }
    }

    // Calculate average session length
    let totalSessionCharacters = 0;
    for (const stats of this.sessionData.values()) {
      totalSessionCharacters += stats.totalCharacters;
    }
    const averageSessionLength = activeSessions > 0 ? totalSessionCharacters / activeSessions : 0;

    return {
      activeSessions,
      totalCharactersToday,
      totalCostToday,
      averageSessionLength,
    };
  }
}

// Create singleton instance
export const voiceBotRateLimiter = new VoiceBotRateLimiter();

// Export for testing/customization
export { VoiceBotRateLimiter };
