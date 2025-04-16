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
 * Generate a local fallback response for when the API is not available
 */
function generateLocalResponse(text: string): string {
  // Convert to lowercase for easier matching
  const query = text.toLowerCase();
  
  // Check for case study related queries
  if (query.includes('lessonloom') || query.includes('lesson loom') || (query.includes('lesson') && query.includes('case study'))) {
    return `**LessonLoom**
An innovative platform that automates the creation of educational materials using AI and templating systems.

LessonLoom helps educators create high-quality learning resources in a fraction of the time it would normally take, using AI-driven content generation and intelligent templating.

Click the LessonLoom button below to view the complete case study.

Would you like to see another case study?`;
  }
  
  if (query.includes('eduscheduler') || query.includes('edu scheduler') || (query.includes('scheduler') && query.includes('case study'))) {
    return `**EduScheduler**
An intelligent academic planning system that generates optimized teaching schedules.

EduScheduler uses advanced algorithms to create optimal teaching schedules while considering instructor preferences, room availability, and curriculum requirements.

Click the EduScheduler button below to view the complete case study.

Would you like to see another case study?`;
  }
  
  // Generic response about case studies if both are mentioned
  if (query.includes('case stud') || query.includes('case-stud') || query.includes('casestud') || 
      query.includes('project') || (query.includes('most') && query.includes('interesting'))) {
    return `Here are Imran's most interesting projects:

**LessonLoom**
An innovative platform that automates the creation of educational materials using AI and templating systems.

**EduScheduler**
An intelligent academic planning system that generates optimized teaching schedules.

You can explore these case studies in detail by clicking the buttons below. Each case study showcases Imran's expertise in AI design and user experience.`;
  }
  
  // Generic fallback
  return `I'm having trouble connecting to my AI services right now. I'm Imran's AI assistant and can tell you about his design experience and projects once the connection is restored.

In the meantime, you can explore his case studies using the buttons below:

**LessonLoom**
An innovative platform that automates the creation of educational materials using AI and templating systems.

**EduScheduler**
An intelligent academic planning system that generates optimized teaching schedules.`;
}

/**
 * Check if the OpenAI API key is valid and API is accessible
 */
async function checkAPIStatus(): Promise<{valid: boolean; message: string}> {
  try {
    // Create a very simple request to test the API
    const testMessages = [
      {
        role: 'user',
        content: 'API connection test',
      },
    ];

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: testMessages }),
    });
    
    // Check response status
    if (!response.ok) {
      const error = await response.text();
      console.error('API status check failed:', response.status, error);
      return { valid: false, message: `API error: ${response.status}` };
    }
    
    const data = await response.json();
    return { valid: true, message: 'API connection successful' };
  } catch (error) {
    console.error('API status check error:', error);
    return { valid: false, message: error instanceof Error ? error.message : String(error) };
  }
}

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

// Track API status to avoid repeated failure checks
let apiStatusChecked = false;
let apiIsWorking = false;

/**
 * Enhanced response generator with API integration
 */
export const generateResponse = async (text: string, chatHistory: Message[] = []): Promise<string> => {
  console.log('Generate response called with:', text);
  console.log('NEXT_PUBLIC_USE_AI_API value:', process.env.NEXT_PUBLIC_USE_AI_API);
  console.log('useOpenAI flag:', useOpenAI);
  console.log('OpenAI API Key exists:', !!process.env.OPENAI_API_KEY);

  // Special debug command to check API status
  if (text.toLowerCase().includes('check api status')) {
    console.log('API status check requested');
    const status = await checkAPIStatus();
    return `[API STATUS] ${status.message} (${status.valid ? 'Connected' : 'Disconnected'})`;
  }

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

  // Check API status if we haven't already
  if (!apiStatusChecked) {
    console.log('Performing initial API status check');
    try {
      const apiStatus = await checkAPIStatus();
      apiStatusChecked = true;
      apiIsWorking = apiStatus.valid;
      console.log('API status check result:', apiStatus);
    } catch (e) {
      console.error('Error during API status check:', e);
      apiStatusChecked = true;
      apiIsWorking = false;
    }
  }

  // For all normal messages, use the OpenAI API only if it's working
  if (apiIsWorking) {
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
    } catch (error) {
      console.error('Error getting API response:', error);
    }
  } else {
    console.log('Skipping API call because previous check indicated API is not working');
  }

  // If API fails or isn't working, provide a fallback response using the local response generator
  return generateLocalResponse(text);
};
