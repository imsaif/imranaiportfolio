import { log, LogLevel } from './logging';

/**
 * Validate email format
 * @param email Email to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;

  // RFC 5322 email validation regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 * @param url URL to validate
 * @returns Boolean indicating if URL is valid
 */
export function isValidURL(url: string): boolean {
  if (!url) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate string length is within specified constraints
 * @param str String to validate
 * @param minLength Minimum allowed length
 * @param maxLength Maximum allowed length
 * @returns Boolean indicating if string is valid
 */
export function isValidLength(str: string, minLength: number, maxLength: number): boolean {
  if (str === undefined || str === null) return false;

  const length = str.trim().length;
  return length >= minLength && length <= maxLength;
}

/**
 * Validate contact form submission
 * @param data Contact form data
 * @returns Object with validation result and error messages
 */
export function validateContactForm(data: any): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Validate name
  if (!data.name) {
    errors.name = 'Name is required';
  } else if (!isValidLength(data.name, 2, 100)) {
    errors.name = 'Name must be between 2 and 100 characters';
  }

  // Validate email
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate message
  if (!data.message) {
    errors.message = 'Message is required';
  } else if (!isValidLength(data.message, 10, 2000)) {
    errors.message = 'Message must be between 10 and 2000 characters';
  }

  // Validate subject (optional)
  if (data.subject && !isValidLength(data.subject, 0, 200)) {
    errors.subject = 'Subject must be less than 200 characters';
  }

  // Log validation failures for tracking
  if (Object.keys(errors).length > 0) {
    log(LogLevel.WARN, 'Contact form validation failed', {
      fields: Object.keys(errors)
    });
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate project query parameters
 * @param query Query parameters
 * @returns Object with validation result and error messages
 */
export function validateProjectQuery(query: any): {
  valid: boolean;
  errors: Record<string, string>;
  params: {
    category?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
  };
} {
  const errors: Record<string, string> = {};
  const params: Record<string, any> = {};

  // Validate category (optional)
  if (query.category && typeof query.category === 'string') {
    if (isValidLength(query.category, 1, 50)) {
      params.category = query.category;
    } else {
      errors.category = 'Category must be between 1 and 50 characters';
    }
  }

  // Validate featured flag (optional)
  if (query.featured !== undefined) {
    const featured = query.featured === 'true';
    params.featured = featured;
  }

  // Validate limit (optional)
  if (query.limit !== undefined) {
    const limit = parseInt(query.limit, 10);
    if (!isNaN(limit) && limit > 0 && limit <= 100) {
      params.limit = limit;
    } else {
      errors.limit = 'Limit must be a number between 1 and 100';
    }
  }

  // Validate page (optional)
  if (query.page !== undefined) {
    const page = parseInt(query.page, 10);
    if (!isNaN(page) && page > 0) {
      params.page = page;
    } else {
      errors.page = 'Page must be a positive number';
    }
  }

  // Log validation failures for tracking
  if (Object.keys(errors).length > 0) {
    log(LogLevel.WARN, 'Project query validation failed', {
      fields: Object.keys(errors)
    });
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    params
  };
}

/**
 * Validate project slug
 * @param slug Project slug to validate
 * @returns Object with validation result and error message
 */
export function validateProjectSlug(slug: string): {
  valid: boolean;
  error?: string;
} {
  if (!slug) {
    return {
      valid: false,
      error: 'Project slug is required'
    };
  }

  // Slug should only contain alphanumeric characters, hyphens, and underscores
  const slugRegex = /^[a-zA-Z0-9-_]+$/;
  if (!slugRegex.test(slug)) {
    log(LogLevel.WARN, 'Invalid project slug format', { slug });
    return {
      valid: false,
      error: 'Invalid project slug format'
    };
  }

  return {
    valid: true
  };
}

/**
 * Validate analytics pageview data
 * @param data Pageview data
 * @returns Object with validation result and error messages
 */
export function validatePageview(data: any): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Validate path
  if (!data.path) {
    errors.path = 'Path is required';
  } else if (!isValidLength(data.path, 1, 200)) {
    errors.path = 'Path must be between 1 and 200 characters';
  }

  // Validate referrer (optional)
  if (data.referrer !== undefined && data.referrer !== null) {
    if (!isValidLength(data.referrer, 0, 200)) {
      errors.referrer = 'Referrer must be less than 200 characters';
    }
  }

  // Log validation failures for tracking
  if (Object.keys(errors).length > 0) {
    log(LogLevel.WARN, 'Pageview validation failed', {
      fields: Object.keys(errors)
    });
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate CSRF token
 * @param token CSRF token to validate
 * @param expectedToken Expected CSRF token
 * @returns Boolean indicating if token is valid
 */
export function validateCSRFToken(token: string, expectedToken: string): boolean {
  if (!token || !expectedToken) {
    log(LogLevel.WARN, 'Missing CSRF token');
    return false;
  }

  const isValid = token === expectedToken;

  if (!isValid) {
    log(LogLevel.WARN, 'Invalid CSRF token');
  }

  return isValid;
}

/**
 * Sanitize and validate number input
 * @param value Input value
 * @param defaultValue Default value if invalid
 * @param min Minimum allowed value
 * @param max Maximum allowed value
 * @returns Validated number
 */
export function validateNumber(
  value: any,
  defaultValue: number,
  min: number,
  max: number
): number {
  if (value === undefined || value === null) return defaultValue;

  let numValue: number;

  if (typeof value === 'number') {
    numValue = value;
  } else if (typeof value === 'string') {
    numValue = parseInt(value, 10);
    if (isNaN(numValue)) return defaultValue;
  } else {
    return defaultValue;
  }

  return Math.min(Math.max(numValue, min), max);
}
