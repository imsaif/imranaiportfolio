import { ChatMessage, OpenAIRequestPayload, OpenAIResponse } from '../../types/openai';
import { log, LogLevel } from './logging';

// API configuration constants
export const DEFAULT_API_URL = 'https://api.openai.com/v1/chat/completions';
export const DEFAULT_TIMEOUT_MS = 10000; // 10 seconds
export const MIN_TIMEOUT_MS = 3000; // 3 seconds minimum timeout
export const MAX_TIMEOUT_MS = 30000; // 30 seconds maximum timeout

/**
 * Call the OpenAI API with proper error handling and timeout
 * @param apiKey The OpenAI API key
 * @param apiUrl The OpenAI API URL
 * @param messages The array of messages to send
 * @param model The model to use
 * @param timeoutMs The timeout in milliseconds
 * @returns The API response or error information
 */
export async function callOpenAI(
  apiKey: string,
  apiUrl: string,
  messages: ChatMessage[],
  model: string,
  timeoutMs: number
): Promise<{ success: boolean; data?: OpenAIResponse; error?: string }> {
  if (!apiKey) {
    return {
      success: false,
      error: 'Missing API key'
    };
  }

  // Create timeout controller for the API request
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Prepare API request body
    const payload: OpenAIRequestPayload = {
      model: model,
      messages: messages,
      temperature: 0.7,
      max_tokens: 750,
      top_p: 1
    };

    // For debugging - log the prepared request
    log(LogLevel.DEBUG, 'OpenAI request prepared', {
      url: apiUrl,
      model,
      messageCount: messages.length,
      timeoutMs
    });

    // Call OpenAI API with configurable URL and timeout
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    // Clear the timeout since the request completed
    clearTimeout(timeoutId);

    // Handle non-200 responses
    if (!response.ok) {
      const errorText = await response.text();
      log(LogLevel.ERROR, 'API returned error status', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });

      return {
        success: false,
        error: `API error: ${response.status} ${response.statusText}`
      };
    }

    // Parse the response
    const data = await response.json() as OpenAIResponse;

    // Check for API-reported errors
    if (data.error) {
      log(LogLevel.ERROR, 'API reported error', {
        errorType: data.error.type,
        errorMessage: data.error.message,
        errorCode: data.error.code
      });

      return {
        success: false,
        error: data.error.message
      };
    }

    // Log successful response at INFO level
    log(LogLevel.INFO, 'Received successful API response', {
      model: data.model,
      promptTokens: data?.usage?.prompt_tokens,
      completionTokens: data?.usage?.completion_tokens,
      totalTokens: data?.usage?.total_tokens
    });

    return {
      success: true,
      data
    };
  } catch (error: any) {
    // Clear the timeout to prevent memory leaks
    clearTimeout(timeoutId);

    // Handle timeout vs other errors
    if (error.name === 'AbortError') {
      log(LogLevel.ERROR, 'API request timed out', { timeoutMs });
      return {
        success: false,
        error: `Request timed out after ${timeoutMs}ms`
      };
    }

    // Handle other fetch errors
    log(LogLevel.ERROR, 'Error in API request', {
      errorName: error.name,
      errorMessage: error.message
    });

    return {
      success: false,
      error: error.message || 'Unknown error during API call'
    };
  }
}
