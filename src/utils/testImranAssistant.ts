/**
 * Test utilities for Imran's Product Designer Assistant
 * Vapi.ai Assistant ID: fcd09324-15d1-4bd3-8059-fce614a3c946
 */

import { isVapiEnabled, initializeVapi, getCallStatus } from '../services/vapiService';

interface AssistantTestResult {
  success: boolean;
  message: string;
  details?: any;
}

/**
 * Test Imran's specific assistant configuration
 */
export const testImranAssistant = async (): Promise<AssistantTestResult> => {
  console.group('🎨 Testing Imran\'s Product Designer Assistant');
  
  try {
    // Check if Vapi is enabled
    if (!isVapiEnabled()) {
      console.error('❌ Vapi.ai not configured. Please set NEXT_PUBLIC_VAPI_API_KEY');
      return {
        success: false,
        message: 'Vapi.ai API key not configured'
      };
    }

    console.log('✅ Vapi.ai API key is configured');

    // Initialize Vapi
    const initialized = initializeVapi();
    if (!initialized) {
      return {
        success: false,
        message: 'Failed to initialize Vapi.ai client'
      };
    }

    console.log('✅ Vapi.ai client initialized');

    // Check assistant configuration
    const assistantConfig = {
      id: 'fcd09324-15d1-4bd3-8059-fce614a3c946',
      name: 'Product designer',
      voice: 'Rohan (Vapi)',
      model: 'GPT-5-mini',
      role: 'Senior Product Designer',
      transcriber: 'Deepgram Nova-2'
    };

    console.log('🎯 Assistant Configuration:', assistantConfig);

    // Get call status
    const status = getCallStatus();
    console.log('📊 Call Status:', status);

    console.log('🎉 Assistant ready for voice interactions!');
    console.log('💡 Instructions:');
    console.log('   1. Click "Voice" mode in the UI');
    console.log('   2. Click the microphone to start');
    console.log('   3. Say: "Tell me about your design process"');
    console.log('   4. Listen to Imran respond with Rohan voice');

    console.groupEnd();

    return {
      success: true,
      message: 'Imran\'s Product Designer Assistant is ready!',
      details: {
        assistantConfig,
        status,
        testSuggestions: [
          'Tell me about your AI product experience',
          'What\'s your design process for AI applications?',
          'Can you share insights on product development?',
          'What tools do you use for product design?'
        ]
      }
    };

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.groupEnd();
    
    return {
      success: false,
      message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: error
    };
  }
};

/**
 * Quick configuration check
 */
export const checkAssistantConfig = (): void => {
  console.log('🔍 Assistant Configuration Check:');
  
  const config = {
    apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY ? '✅ Set' : '❌ Missing',
    assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || 'fcd09324-15d1-4bd3-8059-fce614a3c946',
    vapiEnabled: isVapiEnabled(),
    environment: process.env.NODE_ENV
  };
  
  console.table(config);
  
  if (config.vapiEnabled) {
    console.log('🎉 Ready to test! Run: testImranAssistant()');
  } else {
    console.log('⚠️ Please set NEXT_PUBLIC_VAPI_API_KEY in your .env.local file');
  }
};

// Add to global scope for development testing
declare global {
  interface Window {
    testImranAssistant: () => Promise<AssistantTestResult>;
    checkAssistantConfig: () => void;
  }
}

export const createImranTestCommands = (): void => {
  if (typeof window === 'undefined') return;
  if (process.env.NODE_ENV !== 'development') return;

  window.testImranAssistant = testImranAssistant;
  window.checkAssistantConfig = checkAssistantConfig;

  console.log(`
🎨 Imran's Assistant Test Commands:
  testImranAssistant() - Test the complete assistant setup
  checkAssistantConfig() - Quick config verification

Try: testImranAssistant()
  `);
};

export default {
  testImranAssistant,
  checkAssistantConfig,
  createImranTestCommands
};