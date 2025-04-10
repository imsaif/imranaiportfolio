import { Message } from '../types/chat';

/**
 * Initial messages to greet visitors
 */
export const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hey there! 👋 I'm Imran's AI assistant. What can I help you with today?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

/**
 * Check if we should use the OpenAI API
 */
const useOpenAI = process.env.NEXT_PUBLIC_USE_AI_API === 'true';
console.log('NEXT_PUBLIC_USE_AI_API:', process.env.NEXT_PUBLIC_USE_AI_API);
console.log('Using OpenAI API:', useOpenAI);

/**
 * Call the OpenAI API through our API route
 */
async function callAPI(text: string, chatHistory: Message[] = []): Promise<string | null> {
  try {
    console.log('Calling OpenAI API with text:', text);
    console.log('Chat history length:', chatHistory.length);

    // Format messages for the API
    const messages = chatHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }));

    // Add the current message
    messages.push({
      role: 'user',
      content: text,
    });

    console.log('Formatted messages for API:', JSON.stringify(messages, null, 2));

    // Call our API route
    console.log('Sending request to /api/chat');
    console.log('Request payload:', JSON.stringify({ messages }, null, 2));

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    console.log('API response status:', response.status);
    console.log('API response headers:', Object.fromEntries([...response.headers.entries()]));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    console.log('API response data:', data);
    return data.response || null;
  } catch (error) {
    console.error('Error calling API:', error);
    return null;
  }
}

/**
 * Suggested questions to help users get started
 */
export const suggestedQuestions = [
  "What's Imran's background in AI design?",
  'How does Imran approach design projects?',
  'What tools does Imran use most?',
  "Can you show me Imran's best projects?",
  'How does he handle AI/ML design challenges?',
  'What was his toughest project?',
  'What makes his design approach different?',
  'Tell me more about his case studies',
];

/**
 * Enhanced response generator with API integration
 */
export const generateResponse = async (text: string, chatHistory: Message[] = []): Promise<string> => {
  console.log('Generate response called with:', text);
  console.log('NEXT_PUBLIC_USE_AI_API value:', process.env.NEXT_PUBLIC_USE_AI_API);
  console.log('useOpenAI flag:', useOpenAI);
  console.log('OpenAI API Key exists:', !!process.env.OPENAI_API_KEY);

  // Special debug command to force API usage with debugging info
  if (text.toLowerCase().includes('debug api')) {
    console.log('Debug API requested - forcing API call');

    try {
      // Call API directly
      const apiResponse = await callAPI(text.replace(/debug api/i, '').trim(), chatHistory);
      if (apiResponse) {
        return `[API DEBUG] ${apiResponse}`;
      } else {
        return '[API DEBUG FAILED] Failed to get a response from the API. Check console for details.';
      }
    } catch (error) {
      console.error('Error in API debug mode:', error);
      return `[API DEBUG ERROR] ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  // Special test for API functionality
  if (text.toLowerCase().includes('test api') || text.toLowerCase().includes('api test')) {
    console.log('API Test requested');

    // Force an API call
    try {
      // Format messages for the API
      const testMessages = [
        {
          role: 'user',
          content:
            'This is a test of the OpenAI API. Please respond with "The OpenAI API is working correctly!" and then add a random fun fact about design or AI.',
        },
      ];

      // Call our API route
      console.log('Sending API test request to /api/chat');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: testMessages }),
      });

      console.log('API test response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API test error:', response.status, errorText);
        return `[API TEST FAILED] The OpenAI API request failed with status: ${response.status}. Please check the browser console for more details.`;
      }

      const data = await response.json();
      console.log('API test response data:', data);

      if (data.response) {
        return `[API TEST SUCCEEDED] ${data.response}`;
      } else {
        return '[API TEST FAILED] The API response did not contain the expected data format.';
      }
    } catch (error) {
      console.error('Error during API test:', error);
      return `[API TEST FAILED] An error occurred: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  // For all normal messages, use the OpenAI API only
  console.log('Using OpenAI API for normal message');

  try {
    console.log('Starting API call...');
    const startTime = Date.now();
    const apiResponse = await callAPI(text, chatHistory);
    const endTime = Date.now();
    console.log(`API call completed in ${endTime - startTime}ms`);

    if (apiResponse) {
      console.log('Got valid response from OpenAI API:', apiResponse.substring(0, 50) + '...');
      return apiResponse;
    }

    // If API fails, provide a generic but useful response
    return "I'm having trouble connecting to my AI services right now. I'm Imran's AI assistant and can tell you about his design experience and projects once the connection is restored.";
  } catch (error) {
    console.error('Error getting API response:', error);
    // Generic error message if API call fails
    return "Sorry, I'm having trouble processing your request right now. I'm Imran's AI assistant and can help you shortly.";
  }
};
