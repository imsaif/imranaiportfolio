import { NextResponse } from 'next/server';
import { validateContactForm } from '../../../utils/api/validation';
import { log, LogLevel } from '../../../utils/api/logging';
import { 
  checkRateLimit, 
  DEFAULT_RATE_LIMIT, 
  DEFAULT_RATE_WINDOW_MS
} from '../../../utils/api/rateLimit';
import { safeParseInt } from '../../../utils/api/security';

// Mark route as dynamic to prevent static generation errors
export const dynamic = "force-dynamic";

// Define types for the API
type ContactFormData = {
  name: string;
  email: string;
  message: string;
  subject?: string;
};

type ContactAPIResponse = {
  success: boolean;
  message: string;
  id?: string;
  errors?: Record<string, string>;
};

/**
 * POST handler for the contact form API
 */
export async function POST(request: Request) {
  try {
    // Configure rate limiting
    const rateLimit = safeParseInt(
      process.env.CONTACT_RATE_LIMIT, 
      5, // Default: 5 requests per window
      1,  // Min: 1 request per window
      20  // Max: 20 requests per window
    );
    
    const rateWindowMs = safeParseInt(
      process.env.CONTACT_RATE_WINDOW_MS,
      3600000, // Default: 1 hour
      60000,   // Min: 1 minute
      86400000 // Max: 24 hours
    );
    
    // Get request headers for rate limiting
    const headersList = request.headers;
    
    // Check rate limit
    const rateLimitResult = checkRateLimit(rateLimit, rateWindowMs, headersList);
    
    if (rateLimitResult.isLimited) {
      const minutesUntilReset = Math.ceil((rateLimitResult.timeUntilReset || 0) / 60000);
      
      log(LogLevel.WARN, 'Rate limit exceeded for contact form', {
        userId: rateLimitResult.userId,
        minutesUntilReset
      });
      
      return NextResponse.json<ContactAPIResponse>({
        success: false,
        message: `Rate limit exceeded. Please try again in about ${minutesUntilReset} minute${minutesUntilReset === 1 ? '' : 's'}.`
      }, { status: 429 });
    }
    
    // Parse request body with error handling
    let formData: ContactFormData;
    try {
      formData = await request.json();
    } catch (error) {
      log(LogLevel.ERROR, 'Failed to parse contact form request body', {
        error: error instanceof Error ? error.message : String(error)
      });
      
      return NextResponse.json<ContactAPIResponse>({
        success: false,
        message: 'Invalid request format'
      }, { status: 400 });
    }
    
    // Validate the form data server-side
    const validation = validateContactForm(formData);
    
    if (!validation.valid) {
      return NextResponse.json<ContactAPIResponse>({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      }, { status: 400 });
    }
    
    // Log the successful validation
    log(LogLevel.INFO, 'Contact form submission validated', {
      name: formData.name,
      email: formData.email,
      hasSubject: !!formData.subject,
      messageLength: formData.message.length
    });
    
    // Process the contact form submission
    // For now, we'll just log it, but this would be where you'd save to a database
    // or send an email, etc.
    
    // TODO: Implement actual submission processing
    // Example:
    // const id = await saveContactSubmission(formData);
    
    // For demo purposes, generate a mock ID
    const mockId = `contact_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    return NextResponse.json<ContactAPIResponse>({
      success: true,
      message: 'Your message has been received. Thank you for contacting us!',
      id: mockId
    }, { status: 200 });
    
  } catch (error) {
    // Log any unhandled errors
    log(LogLevel.ERROR, 'Unhandled error in contact form API', {
      error: error instanceof Error ? error.message : String(error)
    });
    
    return NextResponse.json<ContactAPIResponse>({
      success: false,
      message: 'An unexpected error occurred while processing your request.'
    }, { status: 500 });
  }
} 