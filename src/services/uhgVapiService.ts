/**
 * UHG Case Study Vapi.ai Service
 * Handles voice conversations specifically for the UHG case study with scroll integration
 */

import Vapi from '@vapi-ai/web';

export interface UHGVapiConfig {
  publicKey: string;
  assistantId: string;
}

// UHG Case Study Vapi Configuration
const UHG_VAPI_CONFIG: UHGVapiConfig = {
  publicKey: '9d01e9df-08e0-4c40-a0ea-d6d5fe9ee28e',
  assistantId: 'e77af21c-3577-44d8-8e93-688a54d03b39',
};

let uhgVapiInstance: Vapi | null = null;
let isInitialized = false;
let currentCall: any = null;

/**
 * Initialize UHG Vapi client
 */
export const initializeUHGVapi = (): boolean => {
  if (!UHG_VAPI_CONFIG.publicKey) {
    console.warn('UHG Vapi public key not configured');
    return false;
  }

  if (!uhgVapiInstance) {
    try {
      uhgVapiInstance = new Vapi(UHG_VAPI_CONFIG.publicKey);

      console.log('✅ UHG Vapi client initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize UHG Vapi:', error);
      return false;
    }
  }

  return true;
};

/**
 * Start a voice conversation for UHG case study
 */
export const startUHGVapiCall = async (eventHandlers?: any): Promise<{ success: boolean; error?: string }> => {
  if (!initializeUHGVapi()) {
    return { success: false, error: 'UHG Vapi not configured' };
  }

  if (!uhgVapiInstance) {
    return { success: false, error: 'UHG Vapi not initialized' };
  }

  try {
    // Set up event handlers before starting the call
    if (eventHandlers) {
      console.log('📡 Setting up event handlers before call...');
      setupUHGVapiEventHandlers(eventHandlers);
    }

    // Start the call with the UHG case study assistant
    currentCall = await uhgVapiInstance.start(UHG_VAPI_CONFIG.assistantId);

    console.log('🚀 Starting UHG case study call with assistant:', UHG_VAPI_CONFIG.assistantId);
    isInitialized = true;

    return { success: true };
  } catch (error) {
    console.error('Failed to start UHG Vapi call:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Stop the current UHG Vapi call
 */
export const stopUHGVapiCall = async (): Promise<void> => {
  if (uhgVapiInstance && currentCall) {
    try {
      await uhgVapiInstance.stop();
      currentCall = null;
      console.log('🛑 UHG Vapi call stopped');
    } catch (error) {
      console.error('Error stopping UHG Vapi call:', error);
    }
  }
};

/**
 * Check if a UHG call is currently active
 */
export const isUHGCallActive = (): boolean => {
  return currentCall !== null;
};

/**
 * Set up event handlers for UHG Vapi with scroll integration
 */
export const setupUHGVapiEventHandlers = (handlers: {
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onMessage?: (message: any) => void;
  onError?: (error: any) => void;
  onFunctionCall?: (functionCall: any) => void;
}) => {
  if (!uhgVapiInstance) return;

  // Basic call events
  if (handlers.onCallStart) {
    uhgVapiInstance.on('call-start', handlers.onCallStart);
  }

  if (handlers.onCallEnd) {
    uhgVapiInstance.on('call-end', handlers.onCallEnd);
  }

  if (handlers.onSpeechStart) {
    uhgVapiInstance.on('speech-start', handlers.onSpeechStart);
  }

  if (handlers.onSpeechEnd) {
    uhgVapiInstance.on('speech-end', handlers.onSpeechEnd);
  }

  if (handlers.onMessage) {
    uhgVapiInstance.on('message', handlers.onMessage);
  }

  if (handlers.onError) {
    uhgVapiInstance.on('error', handlers.onError);
  }

  // Function call handling for scroll functions
  if (handlers.onFunctionCall) {
    uhgVapiInstance.on('function-call', (functionCall) => {
      console.log('🔧 Function call received:', functionCall);
      handlers.onFunctionCall?.(functionCall);
    });
  }

  // Handle messages that might contain function calls
  uhgVapiInstance.on('message', (message) => {
    if (message.type === 'function-call' && handlers.onFunctionCall) {
      handlers.onFunctionCall(message);
    }
  });
};

/**
 * Send a function call result back to Vapi
 */
export const sendFunctionResult = async (
  functionCallId: string,
  result: any
): Promise<boolean> => {
  if (!uhgVapiInstance || !currentCall) {
    console.warn('No active UHG Vapi call to send function result');
    return false;
  }

  try {
    await uhgVapiInstance.send({
      type: 'function-call-result',
      functionCallId,
      result,
    });
    return true;
  } catch (error) {
    console.error('Error sending function result to UHG Vapi:', error);
    return false;
  }
};

/**
 * Get UHG Vapi call status
 */
export const getUHGCallStatus = () => {
  return {
    isInitialized,
    isCallActive: isUHGCallActive(),
    hasVapiInstance: !!uhgVapiInstance,
  };
};

/**
 * Cleanup UHG Vapi resources
 */
export const cleanupUHGVapi = async (): Promise<void> => {
  if (currentCall) {
    await stopUHGVapiCall();
  }

  uhgVapiInstance = null;
  isInitialized = false;
  currentCall = null;
  console.log('🧹 UHG Vapi resources cleaned up');
};

export default {
  initializeUHGVapi,
  startUHGVapiCall,
  stopUHGVapiCall,
  isUHGCallActive,
  setupUHGVapiEventHandlers,
  sendFunctionResult,
  getUHGCallStatus,
  cleanupUHGVapi,
};