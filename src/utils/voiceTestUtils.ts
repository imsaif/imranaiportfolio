/**
 * Voice Cloning Test Utilities
 * Helper functions to test and verify ElevenLabs integration
 */

import {
    estimateCost,
    getAvailableVoices,
    isVoiceCloningEnabled,
    synthesizeWithClonedVoice,
} from '../services/voiceCloning';

/**
 * Test ElevenLabs API connection and configuration
 */
export const testVoiceCloningSetup = async (): Promise<{
  success: boolean;
  results: {
    apiKeyConfigured: boolean;
    voiceIdConfigured: boolean;
    apiConnection: boolean;
    voiceExists: boolean;
    testSynthesis: boolean;
  };
  errors: string[];
}> => {
  const results = {
    apiKeyConfigured: false,
    voiceIdConfigured: false,
    apiConnection: false,
    voiceExists: false,
    testSynthesis: false,
  };

  const errors: string[] = [];

  try {
    // Check if voice cloning is configured
    const isEnabled = isVoiceCloningEnabled();
    results.apiKeyConfigured = !!process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
    results.voiceIdConfigured = !!process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;

    if (!isEnabled) {
      errors.push('Voice cloning not enabled - missing API key or Voice ID');
      return { success: false, results, errors };
    }

    // Test API connection by fetching available voices
    try {
      const voices = await getAvailableVoices();
      results.apiConnection = true;

      // Check if the configured voice exists
      const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;
      const voiceExists = voices.some(voice => voice.voice_id === voiceId);
      results.voiceExists = voiceExists;

      if (!voiceExists) {
        errors.push(`Voice ID "${voiceId}" not found in available voices`);
      }
    } catch (error) {
      errors.push(`API connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Test synthesis with a short phrase
    if (results.apiConnection && results.voiceExists) {
      try {
        const testResult = await synthesizeWithClonedVoice('Hello, this is a test.');
        results.testSynthesis = testResult.success;

        if (!testResult.success) {
          errors.push(`Synthesis test failed: ${testResult.error}`);
        }

        // Clean up test audio URL
        if (testResult.audioUrl) {
          URL.revokeObjectURL(testResult.audioUrl);
        }
      } catch (error) {
        errors.push(`Synthesis test error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    const success = Object.values(results).every(result => result === true);
    return { success, results, errors };
  } catch (error) {
    errors.push(`Setup test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { success: false, results, errors };
  }
};

/**
 * Get detailed information about the configured voice
 */
export const getVoiceInfo = async (): Promise<{
  success: boolean;
  voiceInfo?: any;
  error?: string;
}> => {
  try {
    if (!isVoiceCloningEnabled()) {
      return { success: false, error: 'Voice cloning not enabled' };
    }

    const voices = await getAvailableVoices();
    const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;
    const voiceInfo = voices.find(voice => voice.voice_id === voiceId);

    if (!voiceInfo) {
      return { success: false, error: `Voice with ID "${voiceId}" not found` };
    }

    return { success: true, voiceInfo };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Test synthesis with different text lengths to check quality and performance
 */
export const testVoiceQuality = async (): Promise<{
  success: boolean;
  tests: Array<{
    text: string;
    length: number;
    success: boolean;
    duration: number;
    cost: number;
    error?: string;
  }>;
}> => {
  const testTexts = [
    'Hi!', // Very short
    'Hello, this is a test of the voice synthesis.', // Short
    "Welcome to my portfolio! I'm excited to share my work with you and answer any questions you might have about my projects and experience.", // Medium
    'I specialize in designing intuitive interfaces that solve real-world problems. My work focuses on educational technology, where I combine user-centered design with cutting-edge AI capabilities to create experiences that are both powerful and accessible.', // Long
  ];

  const tests = [];

  for (const text of testTexts) {
    const startTime = Date.now();

    try {
      const result = await synthesizeWithClonedVoice(text);
      const duration = Date.now() - startTime;
      const cost = estimateCost(text);

      tests.push({
        text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
        length: text.length,
        success: result.success,
        duration,
        cost,
        error: result.error,
      });

      // Clean up audio URL
      if (result.audioUrl) {
        URL.revokeObjectURL(result.audioUrl);
      }
    } catch (error) {
      tests.push({
        text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
        length: text.length,
        success: false,
        duration: Date.now() - startTime,
        cost: estimateCost(text),
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  const success = tests.every(test => test.success);
  return { success, tests };
};

/**
 * Calculate estimated monthly cost based on typical usage
 */
export const estimateMonthlyUsage = (options: {
  averageResponseLength: number;
  responsesPerVisitor: number;
  visitorsPerMonth: number;
}) => {
  const { averageResponseLength, responsesPerVisitor, visitorsPerMonth } = options;

  const totalCharacters = averageResponseLength * responsesPerVisitor * visitorsPerMonth;
  const estimatedCost = estimateCost('x'.repeat(totalCharacters));

  const freeTeir = 10000; // Characters per month on free tier
  const overageCharacters = Math.max(0, totalCharacters - freeTeir);
  const overageCost = estimateCost('x'.repeat(overageCharacters));

  return {
    totalCharacters,
    estimatedCost,
    withinFreeTier: totalCharacters <= freeTeir,
    overageCharacters,
    overageCost,
    recommendation:
      totalCharacters > freeTeir
        ? 'Consider upgrading to paid tier or implementing response caching'
        : 'Usage should fit within free tier limits',
  };
};

/**
 * Log comprehensive voice cloning status for debugging
 */
export const logVoiceStatus = async (): Promise<void> => {
  console.group('🎤 Voice Cloning Status');

  // Basic configuration
  console.log('Configuration:');
  console.log('  API Key:', process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY ? '✅ Configured' : '❌ Missing');
  console.log('  Voice ID:', process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID ? '✅ Configured' : '❌ Missing');
  console.log('  Enabled:', isVoiceCloningEnabled() ? '✅ Yes' : '❌ No');

  if (isVoiceCloningEnabled()) {
    // Run comprehensive test
    const testResult = await testVoiceCloningSetup();

    console.log('\nSetup Test Results:');
    console.log('  API Connection:', testResult.results.apiConnection ? '✅ Success' : '❌ Failed');
    console.log('  Voice Exists:', testResult.results.voiceExists ? '✅ Yes' : '❌ No');
    console.log('  Synthesis Test:', testResult.results.testSynthesis ? '✅ Passed' : '❌ Failed');

    if (testResult.errors.length > 0) {
      console.log('\nErrors:');
      testResult.errors.forEach(error => console.log('  ❌', error));
    }

    // Voice info
    const voiceInfo = await getVoiceInfo();
    if (voiceInfo.success) {
      console.log('\nVoice Details:');
      console.log('  Name:', voiceInfo.voiceInfo.name);
      console.log('  Category:', voiceInfo.voiceInfo.category);
      console.log('  Language:', voiceInfo.voiceInfo.language || 'Not specified');
    }
  }

  console.groupEnd();
};

/**
 * Browser console command for easy testing
 * Usage: testVoice() in browser console
 */
export const createTestCommand = () => {
  if (typeof window !== 'undefined') {
    (window as any).testVoice = async () => {
      await logVoiceStatus();

      if (isVoiceCloningEnabled()) {
        console.log('\n🧪 Running quality tests...');
        const qualityResults = await testVoiceQuality();

        console.table(
          qualityResults.tests.map(test => ({
            'Text Length': test.length,
            Success: test.success ? '✅' : '❌',
            'Duration (ms)': test.duration,
            Cost: `$${test.cost.toFixed(4)}`,
            Error: test.error || 'None',
          }))
        );
      }
    };

    console.log('💡 Voice testing command available: testVoice()');
  }
};
