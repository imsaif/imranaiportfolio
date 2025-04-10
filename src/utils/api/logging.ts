// Logging levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

// Set minimum log level (can be overridden by environment variable)
const LOG_LEVEL = process.env.LOG_LEVEL 
  ? parseInt(process.env.LOG_LEVEL, 10) 
  : LogLevel.INFO;

/**
 * Structured logging function
 * @param level Log level
 * @param message Message to log
 * @param data Optional data to include (will be sanitized)
 */
export function log(level: LogLevel, message: string, data?: any) {
  // Skip logging if below current log level
  if (level < LOG_LEVEL) return;
  
  // Prepare log data with sanitization
  const logData = data ? sanitizeLogData(data) : undefined;
  
  const timestamp = new Date().toISOString();
  const prefix = LogLevel[level];
  
  // Format: [LEVEL] Timestamp: Message
  const logMessage = `[${prefix}] ${timestamp}: ${message}`;
  
  switch (level) {
    case LogLevel.DEBUG:
      console.debug(logMessage, logData);
      break;
    case LogLevel.INFO:
      console.log(logMessage, logData);
      break;
    case LogLevel.WARN:
      console.warn(logMessage, logData);
      break;
    case LogLevel.ERROR:
      console.error(logMessage, logData);
      break;
  }
}

/**
 * Sanitize sensitive data for logging
 */
export function sanitizeLogData(data: any): any {
  if (!data) return data;
  
  // Handle different data types
  if (typeof data === 'string') {
    // Truncate long strings
    return data.length > 100 ? `${data.substring(0, 100)}...` : data;
  }
  
  if (Array.isArray(data)) {
    // Sanitize array items
    return data.map(item => sanitizeLogData(item));
  }
  
  if (typeof data === 'object') {
    const result: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(data)) {
      // Omit sensitive keys entirely
      if (['apiKey', 'Authorization', 'key', 'token', 'password', 'secret'].includes(key)) {
        result[key] = '[REDACTED]';
        continue;
      }
      
      // Special handling for message content (truncate long messages)
      if (key === 'content' && typeof value === 'string') {
        result[key] = value.length > 30 ? `${value.substring(0, 30)}...` : value;
        continue;
      }
      
      // Recursively sanitize nested objects
      result[key] = sanitizeLogData(value);
    }
    
    return result;
  }
  
  // Return primitives as-is
  return data;
} 