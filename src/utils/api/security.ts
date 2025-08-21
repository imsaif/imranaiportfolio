import { ChatMessage } from '../../types/openai';
import { log, LogLevel } from './logging';

/**
 * Safely parse and validate numeric environment variables
 * @param value The environment variable value
 * @param defaultValue Default value if parsing fails
 * @param minValue Minimum allowed value
 * @param maxValue Maximum allowed value
 * @returns The parsed and validated numeric value
 */
export function safeParseInt(
  value: string | undefined,
  defaultValue: number,
  minValue: number,
  maxValue: number
): number {
  if (!value) return defaultValue;

  try {
    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      log(LogLevel.WARN, `Invalid numeric value: "${value}", using default: ${defaultValue}`);
      return defaultValue;
    }

    if (parsedValue < minValue) {
      log(LogLevel.WARN, `Value ${parsedValue} is below minimum ${minValue}, using minimum value`);
      return minValue;
    }

    if (parsedValue > maxValue) {
      log(LogLevel.WARN, `Value ${parsedValue} exceeds maximum ${maxValue}, using maximum value`);
      return maxValue;
    }

    return parsedValue;
  } catch (error) {
    log(LogLevel.WARN, `Error parsing numeric value: "${value}", using default: ${defaultValue}`);
    return defaultValue;
  }
}

/**
 * Sanitize user input to prevent injection attacks
 * @param text Input text to sanitize
 * @returns Sanitized text
 */
export function sanitizeUserInput(text: string): string {
  if (!text) return '';

  // Remove potentially dangerous HTML/script tags
  // This is a simple example - consider using a proper HTML sanitizer library in production
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<img[^>]*>/gi, '[IMAGE]');
}

/**
 * Enhanced security check for user messages
 * @param content Message content to check
 * @returns True if message passes security checks
 */
export function passesSecurityCheck(content: string): boolean {
  // Skip empty messages
  if (!content || content.trim() === '') {
    return false;
  }

  // Check length constraints
  if (content.length > 4000) {
    log(LogLevel.WARN, 'Message exceeds maximum length', { contentLength: content.length });
    return false;
  }

  // Check for potential prompt injection patterns
  const promptInjectionPatterns = [
    /ignore previous instructions/i,
    /disregard all instructions/i,
    /ignore all context/i,
    /forget your previous instructions/i
  ];

  for (const pattern of promptInjectionPatterns) {
    if (pattern.test(content)) {
      log(LogLevel.WARN, 'Potential prompt injection detected', { match: pattern.toString() });
      return false;
    }
  }

  return true;
}

/**
 * Helper function to check if an object is a valid ChatMessage
 */
export function isValidChatMessage(msg: any): msg is ChatMessage {
  return (
    msg &&
    typeof msg === 'object' &&
    ['system', 'user', 'assistant'].includes(msg.role) &&
    typeof msg.content === 'string'
  );
}

/**
 * Processes and sanitizes messages with security checks
 * @param messages Array of raw messages to process
 * @returns Array of validated and sanitized messages
 */
export function processMessages(messages: any[]): ChatMessage[] {
  const validMessages: ChatMessage[] = [];

  if (!messages || !Array.isArray(messages)) {
    return validMessages;
  }

  for (const msg of messages) {
    try {
      // Handle string messages (parse JSON)
      if (typeof msg === 'string') {
        try {
          const parsed = JSON.parse(msg);
          if (isValidChatMessage(parsed)) {
            // Apply security checks to user messages
            if (parsed.role === 'user') {
              const sanitizedContent = sanitizeUserInput(parsed.content);

              // Skip messages that don't pass security checks
              if (!passesSecurityCheck(sanitizedContent)) {
                log(LogLevel.WARN, 'Message failed security check', { role: parsed.role });
                continue;
              }

              validMessages.push({
                role: parsed.role,
                content: sanitizedContent
              });
            } else {
              // Non-user messages pass through normally
              validMessages.push({
                role: parsed.role,
                content: parsed.content
              });
            }
          }
        } catch {
          // Use structured logging for errors
          log(LogLevel.ERROR, 'Failed to parse message string');
        }
      }
      // Handle object messages
      else if (isValidChatMessage(msg)) {
        // Apply security checks to user messages
        if (msg.role === 'user') {
          const sanitizedContent = sanitizeUserInput(msg.content);

          // Skip messages that don't pass security checks
          if (!passesSecurityCheck(sanitizedContent)) {
            log(LogLevel.WARN, 'Message failed security check', { role: msg.role });
            continue;
          }

          validMessages.push({
            role: msg.role,
            content: sanitizedContent
          });
        } else {
          // Non-user messages pass through normally
          validMessages.push({
            role: msg.role,
            content: msg.content
          });
        }
      }
    } catch (error) {
      // Use structured logging for errors
      log(LogLevel.ERROR, 'Error processing message', { errorMessage: (error as Error).message });
    }
  }

  return validMessages;
}
