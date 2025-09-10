/**
 * Vapi.ai Voice Service Integration
 * Primary voice synthesis and conversation management using Vapi.ai
 */

import Vapi from '@vapi-ai/web';

export interface VapiConfig {
  apiKey: string;
  assistantId?: string;
  voice?: {
    provider: string;
    voiceId: string;
  };
}

export interface VapiResponse {
  success: boolean;
  audioUrl?: string;
  audioBlob?: Blob;
  error?: string;
  conversationId?: string;
  providerUsed: 'vapi-ai';
}

export interface VapiCallConfig {
  assistant?: {
    firstMessage?: string;
    model?: {
      provider: string;
      model: string;
    };
    voice?: {
      provider: string;
      voiceId: string;
    };
  };
  phoneNumberId?: string;
  customer?: {
    number?: string;
  };
}

// Vapi.ai Configuration - Using Imran's Product Designer Assistant
const VAPI_CONFIG: VapiConfig = {
  apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY || '',
  assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || 'fcd09324-15d1-4bd3-8059-fce614a3c946',
  voice: {
    provider: 'vapi',
    voiceId: 'Rohan',
  },
};

let vapiInstance: Vapi | null = null;
let isInitialized = false;
let currentCall: any = null;

/**
 * Initialize Vapi client
 */
export const initializeVapi = (): boolean => {
  if (!VAPI_CONFIG.apiKey) {
    console.warn('Vapi.ai API key not configured');
    return false;
  }

  if (!vapiInstance) {
    try {
      vapiInstance = new Vapi(VAPI_CONFIG.apiKey);
      
      // Set up event listeners
      vapiInstance.on('call-start', () => {
        console.log('🎤 Vapi call started');
        isInitialized = true;
      });

      vapiInstance.on('call-end', () => {
        console.log('📞 Vapi call ended');
        currentCall = null;
      });

      vapiInstance.on('speech-start', () => {
        console.log('🗣️ User started speaking');
      });

      vapiInstance.on('speech-end', () => {
        console.log('🤐 User stopped speaking');
      });

      vapiInstance.on('message', (message) => {
        console.log('💬 Vapi message:', message);
      });

      vapiInstance.on('error', (error) => {
        console.error('❌ Vapi error:', error);
      });

      console.log('✅ Vapi.ai client initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize Vapi:', error);
      return false;
    }
  }

  return true;
};

/**
 * Check if Vapi.ai is properly configured and available
 */
export const isVapiEnabled = (): boolean => {
  const hasApiKey = !!(VAPI_CONFIG.apiKey && VAPI_CONFIG.apiKey !== 'your_vapi_api_key_here');
  console.log('Vapi.ai status:', {
    hasApiKey,
    isInitialized,
    hasInstance: !!vapiInstance
  });
  
  return hasApiKey;
};

/**
 * Start a voice conversation with Vapi.ai
 */
export const startVapiCall = async (
  assistantOptions?: Partial<VapiCallConfig['assistant']>
): Promise<{ success: boolean; error?: string }> => {
  if (!initializeVapi()) {
    return { success: false, error: 'Vapi.ai not configured' };
  }

  if (!vapiInstance) {
    return { success: false, error: 'Vapi.ai not initialized' };
  }

  try {
    const callConfig: VapiCallConfig = {
      assistant: {
        firstMessage: "Hi, I'm Imran, a senior product designer. What would you like to know about my work?",
        model: {
          provider: 'openai',
          model: 'gpt-4o-mini',
        },
        voice: {
          provider: 'vapi',
          voiceId: 'Rohan',
        },
        ...assistantOptions,
      },
    };

    // Start the call with the specific assistant ID
    currentCall = await vapiInstance.start(VAPI_CONFIG.assistantId);
    
    console.log('🚀 Starting call with Imran\'s Product Designer Assistant:', VAPI_CONFIG.assistantId);

    console.log('🚀 Vapi call started successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to start Vapi call:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

/**
 * Stop the current Vapi call
 */
export const stopVapiCall = async (): Promise<void> => {
  if (vapiInstance && currentCall) {
    try {
      await vapiInstance.stop();
      currentCall = null;
      console.log('🛑 Vapi call stopped');
    } catch (error) {
      console.error('Error stopping Vapi call:', error);
    }
  }
};

/**
 * Check if a call is currently active
 */
export const isCallActive = (): boolean => {
  return currentCall !== null;
};

/**
 * Send a message to the current call
 */
export const sendMessage = async (message: string): Promise<boolean> => {
  if (!vapiInstance || !currentCall) {
    console.warn('No active Vapi call to send message');
    return false;
  }

  try {
    await vapiInstance.send({
      type: 'add-message',
      message: {
        role: 'user',
        content: message,
      },
    });
    return true;
  } catch (error) {
    console.error('Error sending message to Vapi:', error);
    return false;
  }
};

/**
 * Set up event handlers for Vapi
 */
export const setupVapiEventHandlers = (handlers: {
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onMessage?: (message: any) => void;
  onError?: (error: any) => void;
}) => {
  if (!vapiInstance) return;

  if (handlers.onCallStart) {
    vapiInstance.on('call-start', handlers.onCallStart);
  }
  
  if (handlers.onCallEnd) {
    vapiInstance.on('call-end', handlers.onCallEnd);
  }
  
  if (handlers.onSpeechStart) {
    vapiInstance.on('speech-start', handlers.onSpeechStart);
  }
  
  if (handlers.onSpeechEnd) {
    vapiInstance.on('speech-end', handlers.onSpeechEnd);
  }
  
  if (handlers.onMessage) {
    vapiInstance.on('message', handlers.onMessage);
  }
  
  if (handlers.onError) {
    vapiInstance.on('error', handlers.onError);
  }
};

/**
 * Get Vapi call status
 */
export const getCallStatus = () => {
  return {
    isInitialized,
    isCallActive: isCallActive(),
    hasVapiInstance: !!vapiInstance,
  };
};

/**
 * Cleanup Vapi resources
 */
export const cleanupVapi = async (): Promise<void> => {
  if (currentCall) {
    await stopVapiCall();
  }
  
  vapiInstance = null;
  isInitialized = false;
  currentCall = null;
  console.log('🧹 Vapi resources cleaned up');
};

/**
 * Note: Vapi.ai doesn't provide standalone TTS - it's for full conversations only
 * This function indicates that Vapi should be used for real-time calls instead
 */
export const synthesizeWithVapi = async (text: string): Promise<VapiResponse> => {
  console.log('🎵 Note: Vapi.ai is designed for full conversations, not standalone TTS');
  console.log('💬 For voice interactions, use startVapiCall() instead of TTS synthesis');
  
  // Vapi.ai doesn't provide standalone TTS - it's designed for full conversational AI
  // For welcome messages and standalone TTS, we should fall back to OpenAI TTS or browser TTS
  return {
    success: false,
    error: 'Vapi.ai is for full conversations only, not standalone TTS',
    providerUsed: 'vapi-ai',
  };
};

export default {
  initializeVapi,
  isVapiEnabled,
  startVapiCall,
  stopVapiCall,
  isCallActive,
  sendMessage,
  setupVapiEventHandlers,
  getCallStatus,
  cleanupVapi,
  synthesizeWithVapi,
};