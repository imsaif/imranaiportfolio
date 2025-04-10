import { NextResponse } from 'next/server';
import { validatePageview, validateCSRFToken } from '../../../../utils/api/validation';
import { log, LogLevel } from '../../../../utils/api/logging';

// Define types for the API
type PageviewData = {
  path: string;
  referrer?: string;
};

type PageviewAPIResponse = {
  success: boolean;
  error?: string;
};

/**
 * POST handler for recording page views
 */
export async function POST(request: Request) {
  try {
    // Validate CSRF token from headers to prevent CSRF attacks
    const csrfToken = request.headers.get('X-CSRF-Token');
    const expectedToken = request.cookies.get('csrf_token')?.value;
    
    // Skip CSRF validation in development
    if (process.env.NODE_ENV !== 'development') {
      if (!validateCSRFToken(csrfToken || '', expectedToken || '')) {
        log(LogLevel.WARN, 'Invalid or missing CSRF token for analytics', {
          token: csrfToken ? 'present' : 'missing',
          expectedToken: expectedToken ? 'present' : 'missing'
        });
        
        return NextResponse.json<PageviewAPIResponse>({
          success: false,
          error: 'Invalid CSRF token'
        }, { status: 403 });
      }
    }
    
    // Parse request body with error handling
    let pageviewData: PageviewData;
    try {
      pageviewData = await request.json();
    } catch (error) {
      log(LogLevel.ERROR, 'Failed to parse analytics request body', {
        error: error instanceof Error ? error.message : String(error)
      });
      
      return NextResponse.json<PageviewAPIResponse>({
        success: false,
        error: 'Invalid request format'
      }, { status: 400 });
    }
    
    // Validate the pageview data
    const validation = validatePageview(pageviewData);
    
    if (!validation.valid) {
      log(LogLevel.WARN, 'Invalid pageview data', { 
        errors: validation.errors 
      });
      
      return NextResponse.json<PageviewAPIResponse>({
        success: false,
        error: 'Validation failed'
      }, { status: 400 });
    }
    
    // Get IP address for analytics (hashed to protect privacy)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    const ipHash = await hashIPAddress(ip);
    
    // Get user agent for analytics
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Prepare the data for saving
    const analyticsData = {
      path: pageviewData.path,
      referrer: pageviewData.referrer || null,
      ipHash,
      userAgent,
      viewDate: new Date()
    };
    
    // Log the pageview - in a real implementation, this would be saved to a database
    log(LogLevel.INFO, 'Page view recorded', {
      path: pageviewData.path,
      hasReferrer: !!pageviewData.referrer
    });
    
    // TODO: Implement actual analytics storage
    // Example:
    // await savePageView(analyticsData);
    
    return NextResponse.json<PageviewAPIResponse>({
      success: true
    }, { status: 200 });
    
  } catch (error) {
    // Log any unhandled errors
    log(LogLevel.ERROR, 'Unhandled error in analytics API', {
      error: error instanceof Error ? error.message : String(error)
    });
    
    return NextResponse.json<PageviewAPIResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

/**
 * Hash an IP address for privacy
 * @param ip IP address to hash
 * @returns Hashed IP value
 */
async function hashIPAddress(ip: string): Promise<string> {
  try {
    // Use Web Crypto API for hashing
    const encoder = new TextEncoder();
    const data = encoder.encode(ip + process.env.IP_HASH_SALT);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    // Fallback if crypto API fails
    log(LogLevel.ERROR, 'IP hashing failed', {
      error: error instanceof Error ? error.message : String(error)
    });
    return 'hash_error';
  }
} 