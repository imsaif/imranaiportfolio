/**
 * Voice Rate Limit Configuration
 * Environment-based configuration for voice bot rate limits
 */

import { VoiceRateLimits } from '../services/voiceBotRateLimit';

/**
 * Parse environment variable as number with fallback
 */
const parseEnvNumber = (envVar: string | undefined, fallback: number): number => {
  if (!envVar) return fallback;
  const parsed = parseInt(envVar, 10);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * Parse environment variable as float with fallback
 */
const parseEnvFloat = (envVar: string | undefined, fallback: number): number => {
  if (!envVar) return fallback;
  const parsed = parseFloat(envVar);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * Get rate limits configuration from environment variables
 */
export const getVoiceRateLimitsFromEnv = (): Partial<VoiceRateLimits> => {
  return {
    // Session limits
    maxConversationsPerSession: parseEnvNumber(process.env.NEXT_PUBLIC_VOICE_MAX_CONVERSATIONS_PER_SESSION, 3),
    maxMessagesPerConversation: parseEnvNumber(process.env.NEXT_PUBLIC_VOICE_MAX_MESSAGES_PER_CONVERSATION, 10),
    maxCharactersPerMessage: parseEnvNumber(process.env.NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_MESSAGE, 500),
    maxCharactersPerSession: parseEnvNumber(process.env.NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_SESSION, 3000),

    // Time-based limits
    maxConversationsPerHour: parseEnvNumber(process.env.NEXT_PUBLIC_VOICE_MAX_CONVERSATIONS_PER_HOUR, 5),
    maxCharactersPerHour: parseEnvNumber(process.env.NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_HOUR, 5000),
    cooldownBetweenMessages: parseEnvNumber(process.env.NEXT_PUBLIC_VOICE_COOLDOWN_BETWEEN_MESSAGES, 3),

    // Daily limits
    maxConversationsPerDay: parseEnvNumber(process.env.NEXT_PUBLIC_VOICE_MAX_CONVERSATIONS_PER_DAY, 10),
    maxCharactersPerDay: parseEnvNumber(process.env.NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_DAY, 10000),
    maxCostPerDay: parseEnvFloat(process.env.NEXT_PUBLIC_VOICE_MAX_COST_PER_DAY, 5.0),

    // Voice cloning specific
    maxClonedVoiceMinutesPerDay: parseEnvNumber(process.env.NEXT_PUBLIC_VOICE_MAX_CLONED_MINUTES_PER_DAY, 20),
    maxClonedVoiceCharactersPerSession: parseEnvNumber(
      process.env.NEXT_PUBLIC_VOICE_MAX_CLONED_CHARACTERS_PER_SESSION,
      1500
    ),
  };
};

/**
 * Environment-specific presets
 */
export const RATE_LIMIT_PRESETS = {
  // Development - generous limits for testing
  development: {
    maxConversationsPerSession: 10,
    maxMessagesPerConversation: 50,
    maxCharactersPerMessage: 1000,
    maxCharactersPerSession: 10000,
    maxConversationsPerHour: 20,
    maxCharactersPerHour: 15000,
    cooldownBetweenMessages: 1,
    maxConversationsPerDay: 50,
    maxCharactersPerDay: 30000,
    maxCostPerDay: 10.0,
    maxClonedVoiceMinutesPerDay: 60,
    maxClonedVoiceCharactersPerSession: 5000,
  } as VoiceRateLimits,

  // Production - conservative limits to prevent abuse
  production: {
    maxConversationsPerSession: 3,
    maxMessagesPerConversation: 10,
    maxCharactersPerMessage: 500,
    maxCharactersPerSession: 3000,
    maxConversationsPerHour: 5,
    maxCharactersPerHour: 5000,
    cooldownBetweenMessages: 3,
    maxConversationsPerDay: 10,
    maxCharactersPerDay: 10000,
    maxCostPerDay: 5.0,
    maxClonedVoiceMinutesPerDay: 20,
    maxClonedVoiceCharactersPerSession: 1500,
  } as VoiceRateLimits,

  // Demo - very restrictive for public demos
  demo: {
    maxConversationsPerSession: 1,
    maxMessagesPerConversation: 5,
    maxCharactersPerMessage: 300,
    maxCharactersPerSession: 1000,
    maxConversationsPerHour: 2,
    maxCharactersPerHour: 2000,
    cooldownBetweenMessages: 5,
    maxConversationsPerDay: 3,
    maxCharactersPerDay: 3000,
    maxCostPerDay: 1.0,
    maxClonedVoiceMinutesPerDay: 5,
    maxClonedVoiceCharactersPerSession: 500,
  } as VoiceRateLimits,
};

/**
 * Get rate limits based on environment
 */
export const getVoiceRateLimits = (): VoiceRateLimits => {
  // Check for environment variable override
  const envLimits = getVoiceRateLimitsFromEnv();

  // Determine environment
  const environment = process.env.NODE_ENV || 'development';
  const preset = process.env.NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET as keyof typeof RATE_LIMIT_PRESETS;

  // Get base limits from preset or environment
  let baseLimits: VoiceRateLimits;

  if (preset && RATE_LIMIT_PRESETS[preset]) {
    baseLimits = RATE_LIMIT_PRESETS[preset];
    console.log(`Using voice rate limit preset: ${preset}`);
  } else if (environment === 'production') {
    baseLimits = RATE_LIMIT_PRESETS.production;
    console.log('Using production voice rate limits');
  } else {
    baseLimits = RATE_LIMIT_PRESETS.development;
    console.log('Using development voice rate limits');
  }

  // Merge with environment variable overrides
  const finalLimits = { ...baseLimits, ...envLimits };

  // Log the final configuration (without sensitive data)
  console.log('Voice rate limits configured:', {
    maxConversationsPerSession: finalLimits.maxConversationsPerSession,
    maxCharactersPerSession: finalLimits.maxCharactersPerSession,
    maxCostPerDay: finalLimits.maxCostPerDay,
    environment,
    preset: preset || 'auto',
  });

  return finalLimits;
};

/**
 * Validate rate limits configuration
 */
export const validateRateLimits = (limits: VoiceRateLimits): string[] => {
  const errors: string[] = [];

  // Check for reasonable values
  if (limits.maxCharactersPerMessage < 50) {
    errors.push('maxCharactersPerMessage should be at least 50');
  }

  if (limits.maxCharactersPerMessage > 2000) {
    errors.push('maxCharactersPerMessage should not exceed 2000');
  }

  if (limits.maxCharactersPerSession < limits.maxCharactersPerMessage) {
    errors.push('maxCharactersPerSession should be >= maxCharactersPerMessage');
  }

  if (limits.maxCharactersPerDay < limits.maxCharactersPerSession) {
    errors.push('maxCharactersPerDay should be >= maxCharactersPerSession');
  }

  if (limits.maxCostPerDay < 0.1) {
    errors.push('maxCostPerDay should be at least $0.10');
  }

  if (limits.cooldownBetweenMessages < 0) {
    errors.push('cooldownBetweenMessages should be >= 0');
  }

  if (limits.maxConversationsPerSession < 1) {
    errors.push('maxConversationsPerSession should be at least 1');
  }

  if (limits.maxMessagesPerConversation < 3) {
    errors.push('maxMessagesPerConversation should be at least 3');
  }

  return errors;
};
