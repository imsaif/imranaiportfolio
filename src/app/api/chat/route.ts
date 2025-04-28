import { NextResponse } from 'next/server';

// Mark route as dynamic to prevent static generation errors
export const dynamic = "force-dynamic";

// Import portfolio context for the AI
import portfolioData from '../../../data/portfolio-context.json';
// Import project data to get case study links
import { projects, Project } from '../../../data/projects';
// Import TypeScript types
import { ChatMessage, ChatAPIResponse, ProjectLink, ChatAPIRequest } from '../../../types/openai';

// Import utility modules
import { log, LogLevel, appendChatLog } from '../../../utils/api/logging';
import {
  callOpenAI,
  DEFAULT_API_URL,
  DEFAULT_TIMEOUT_MS,
  MIN_TIMEOUT_MS,
  MAX_TIMEOUT_MS,
} from '../../../utils/api/openai';
import {
  checkRateLimit,
  DEFAULT_RATE_LIMIT,
  DEFAULT_RATE_WINDOW_MS,
  MIN_RATE_LIMIT,
  MAX_RATE_LIMIT,
  MIN_RATE_WINDOW_MS,
  MAX_RATE_WINDOW_MS,
} from '../../../utils/api/rateLimit';
import { safeParseInt, processMessages } from '../../../utils/api/security';
import { checkRedisRateLimit, redisAvailable } from '../../../utils/api/redisRateLimit';
import { generateUserId } from '../../../utils/api/rateLimit';

/**
 * POST handler for the chat API route
 * Processes incoming chat messages and returns AI-generated responses
 */
export async function POST(request: Request) {
  try {
    // Log request handling start
    console.log('API route: Processing POST request to /api/chat');

    // Get configuration from environment variables with validation
    const useOpenAI = process.env.USE_AI_API === 'true' || process.env.NEXT_PUBLIC_USE_AI_API === 'true';
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || 'gpt-4o';
    const apiUrl = process.env.OPENAI_API_URL || DEFAULT_API_URL;

    // Log configuration with safety measures for API key
    console.log('API route config:', {
      useOpenAI,
      apiKeyExists: !!apiKey,
      apiKeyFirstChars: apiKey ? `${apiKey.substring(0, 8)}...` : 'none',
      model,
      apiUrl,
      redisAvailable,
    });

    // Parse and validate numeric configuration values
    const timeoutMs = safeParseInt(
      process.env.OPENAI_REQUEST_TIMEOUT,
      DEFAULT_TIMEOUT_MS,
      MIN_TIMEOUT_MS,
      MAX_TIMEOUT_MS
    );

    const rateLimit = safeParseInt(process.env.OPENAI_RATE_LIMIT, DEFAULT_RATE_LIMIT, MIN_RATE_LIMIT, MAX_RATE_LIMIT);

    const rateWindowMs = safeParseInt(
      process.env.OPENAI_RATE_WINDOW_MS,
      DEFAULT_RATE_WINDOW_MS,
      MIN_RATE_WINDOW_MS,
      MAX_RATE_WINDOW_MS
    );

    // Check if OpenAI API is properly configured
    const isOpenAIConfigured = useOpenAI && apiKey && apiKey !== 'your_api_key_here';
    
    if (!isOpenAIConfigured) {
      console.log('API route: OpenAI API integration disabled or missing API key');
      return NextResponse.json<ChatAPIResponse>(
        {
          response: 'AI API integration is currently disabled. Using local responses instead.',
        },
        { status: 200 }
      );
    }

    // At this point we know the OpenAI API integration is active

    // Get request headers for rate limiting
    const headersList = request.headers;

    // Generate userId for rate limiting
    const userId = generateUserId(headersList);
    // Convert rateWindowMs from ms to seconds for Redis
    const rateWindowSec = Math.ceil(rateWindowMs / 1000);

    // Check rate limit
    let rateLimitResult;
    
    // If Redis is available, use Redis rate limiting, otherwise use in-memory
    if (redisAvailable) {
      rateLimitResult = await checkRedisRateLimit(userId, rateLimit, rateWindowSec);
    } else {
      log(LogLevel.WARN, 'Redis unavailable, using in-memory rate limiting', { userId });
      rateLimitResult = checkRateLimit(rateLimit, rateWindowMs, headersList);
    }

    if (rateLimitResult.isLimited) {
      const minutesUntilReset = Math.ceil((rateLimitResult.timeUntilReset || 0) / 60000);
      return NextResponse.json<ChatAPIResponse>(
        {
          response: `I've answered quite a few questions already. Please try again in about ${minutesUntilReset} minute${minutesUntilReset === 1 ? '' : 's'}.`,
        },
        { status: 429 }
      );
    }

    // Parse request body
    const { messages }: ChatAPIRequest = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json<ChatAPIResponse>(
        {
          response: 'Invalid request format. Please provide a messages array.',
        },
        { status: 400 }
      );
    }

    // Process and validate messages using our security module
    const validMessages = processMessages(messages);

    if (validMessages.length === 0) {
      log(LogLevel.ERROR, 'No valid messages found in request', { userId });
      return NextResponse.json<ChatAPIResponse>(
        {
          response: "I couldn't process your message properly. Let me help with information about Imran instead.",
        },
        { status: 200 }
      );
    }

    log(LogLevel.DEBUG, 'Messages processed successfully', {
      count: validMessages.length,
      userId,
    });

    // Define direct links to case studies with full URLs
    const projectLinks: ProjectLink[] = [
      // LessonLoom case study
      {
        name: 'LessonLoom',
        url: 'https://www.imranaidesign.com/casestudy/lessonloom',
      },
      // EduScheduler case study
      {
        name: 'EduScheduler',
        url: 'https://www.imranaidesign.com/casestudy/scheduler',
      },
    ];

    // Create system message content
    const systemMessageContent = `You are Imran's AI assistant, specifically designed to help visitors learn about his work, skills, and experience.
    
    IMPORTANT: Always introduce yourself as "I'm Imran's AI assistant" when appropriate. Never use generic phrases like "I am an AI assistant" or "I'm an AI designed to provide information about Imran." You work exclusively for Imran and are his personal AI.
    
    Here is information about Imran to use in your responses:
    ${JSON.stringify(portfolioData)}
    
    Project links to share:
    ${JSON.stringify(projectLinks)}
    
    Note: Imran has two detailed case studies available:
    1. LessonLoom case study: https://www.imranaidesign.com/casestudy/lessonloom
    2. EduScheduler case study: https://www.imranaidesign.com/casestudy/scheduler

    When someone asks about case studies or projects, format your response like this:

    Of course! Imran has worked on several exciting projects:

    **LessonLoom**
    This innovative platform automates the creation of educational materials using AI and templating systems. It personalizes learning experiences based on student progress and learning style, increasing student engagement by 35% and reducing lesson planning time by 40%.

    **EduScheduler**
    An intelligent academic planning system that generates optimized teaching schedules, balancing automation with user preferences and priorities. It reduced meeting scheduling time by 60% and improved meeting attendance rates by 25%.

    These projects showcase Imran's expertise in AI design and user experience. If you have any more questions or need further details, feel free to ask!
    
    Technical Implementation Details:
    - Built with Next.js 13.5 using the App Router and TypeScript
    - Uses React Server Components with client-side interactivity
    - Chat interface components:
      * ChatInterface: Main component managing state and message flow
      * ChatMessageList: Handles message rendering and animations
      * ChatInput: Manages user input with real-time validation
      * ChatSuggestions: Provides contextual question suggestions
    - Features:
      * Real-time message updates with typing indicators
      * Smooth animations using Framer Motion
      * Responsive design with Tailwind CSS
      * Error handling and fallback responses
      * Rate limiting and request validation
    - API Integration:
      * OpenAI GPT-3.5 Turbo for natural language processing
      * Secure API key management using environment variables
      * Fallback to local responses when API is unavailable
    
    Your task is to be helpful, friendly, and direct in answering questions about Imran's work and experience.
    When asked about technical details, provide specific information about how the chat interface was built.
    Keep responses concise but informative, sharing relevant details about his projects and expertise.
    Include relevant links when discussing specific projects.
    Avoid making up information not provided in the context.
    If asked about something you don't know, simply state you don't have that information.`;

    // Create a complete message array with system message and validated user messages
    const messageArray: ChatMessage[] = [{ role: 'system', content: systemMessageContent }, ...validMessages];

    // Call OpenAI API with our utility function
    const apiResult = await callOpenAI(apiKey, apiUrl, messageArray, model, timeoutMs);

    // Prepare log entry for this conversation
    const chatLogEntry = {
      userId,
      timestamp: new Date().toISOString(),
      messages: validMessages,
      aiResponse: apiResult.success && apiResult.data ? apiResult.data.choices[0].message.content : null
    };
    // Persist the chat log (do not block response on failure)
    appendChatLog(chatLogEntry);

    // Handle API errors
    if (!apiResult.success || !apiResult.data) {
      log(LogLevel.ERROR, 'API call failed', {
        error: apiResult.error,
        userId,
      });

      return NextResponse.json<ChatAPIResponse>(
        {
          response:
            "I'm having trouble with my AI connection right now. I can still answer basic questions about Imran's work based on my available information.",
        },
        { status: 200 }
      );
    }

    // Return the AI response
    return NextResponse.json<ChatAPIResponse>(
      {
        response: apiResult.data.choices[0].message.content,
      },
      { status: 200 }
    );
  } catch (error) {
    log(LogLevel.ERROR, 'Unhandled error in chat API', {
      errorMessage: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json<ChatAPIResponse>(
      {
        response:
          "I'm experiencing a technical issue with my AI connection. I can answer general questions about Imran's portfolio and experience using my local knowledge base.",
      },
      { status: 200 }
    );
  }
}
