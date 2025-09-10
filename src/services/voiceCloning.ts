/**
 * Three-Tier Voice Synthesis Service
 * 1. Primary: Vapi.ai (advanced voice AI)
 * 2. Secondary: OpenAI TTS 
 * 3. Tertiary: Browser TTS
 */

import { synthesizeWithVapi, isVapiEnabled } from './vapiService';

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
}

export interface VoiceCloneResponse {
  success: boolean;
  audioUrl?: string;
  audioBlob?: Blob;
  error?: string;
  fallbackUsed?: boolean;
  providerUsed?: 'vapi-ai' | 'openai-tts' | 'browser-tts';
}

export interface VoiceCloneConfig {
  voiceId: string;
  modelId: string;
  settings: VoiceSettings;
}

// Vapi.ai Configuration
const VAPI_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY || '',
  assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '',
  baseUrl: 'https://api.vapi.ai',
};

// OpenAI Configuration
const OPENAI_CONFIG = {
  apiKey: process.env.OPENAI_API_KEY || '',
  baseUrl: 'https://api.openai.com/v1',
  model: 'tts-1',
  voice: 'nova', // Natural, friendly voice
};

// Default configuration for Imran's Product Designer Assistant
const DEFAULT_CONFIG: VoiceCloneConfig = {
  voiceId: 'Rohan', // Vapi voice ID for Imran's assistant
  modelId: 'vapi-product-designer',
  settings: {
    stability: 0.7, // More stable for professional tone
    similarity_boost: 0.8,
    style: 0.4, // Slightly more expressive for design discussions
    use_speaker_boost: true,
  },
};

/**
 * Check if high-quality voice synthesis is properly configured
 */
export const isVoiceCloningEnabled = (): boolean => {
  const vapiEnabled = isVapiEnabled();
  const openAIEnabled = !!(OPENAI_CONFIG.apiKey && OPENAI_CONFIG.apiKey !== 'your_openai_api_key_here');
  
  console.log('Voice synthesis status:', {
    vapiAI: vapiEnabled ? 'Available (conversations only)' : 'Not configured',
    openAI: openAIEnabled ? 'Available (TTS)' : 'Not configured',
    browserTTS: 'speechSynthesis' in window ? 'Available' : 'Not supported'
  });
  
  // Consider voice cloning "enabled" if either Vapi.ai or OpenAI is available
  // Vapi.ai provides full conversation experience (preferred)
  // OpenAI TTS provides high-quality fallback synthesis
  return vapiEnabled || openAIEnabled;
};

/**
 * Synthesize text using Vapi.ai (Primary) - Advanced Voice AI
 */
const synthesizeWithVapiAI = async (text: string): Promise<VoiceCloneResponse> => {
  if (!isVapiEnabled()) {
    return {
      success: false,
      error: 'Vapi.ai not configured',
      fallbackUsed: true,
    };
  }

  try {
    console.log('🎵 Attempting Vapi.ai synthesis:', text.substring(0, 50) + '...');
    
    const startTime = Date.now();
    
    // Use Vapi service for synthesis
    const result = await synthesizeWithVapi(text);
    
    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Vapi.ai synthesis failed',
        fallbackUsed: true,
      };
    }
    
    const duration = Date.now() - startTime;
    console.log(`🎵 Vapi.ai synthesis completed in ${duration}ms`);

    return {
      success: true,
      audioUrl: result.audioUrl,
      audioBlob: result.audioBlob,
      fallbackUsed: false,
      providerUsed: 'vapi-ai',
    };
  } catch (error) {
    console.error('Vapi.ai synthesis error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      fallbackUsed: true,
    };
  }
};

/**
 * Synthesize text using OpenAI TTS (Secondary)
 */
const synthesizeWithOpenAI = async (text: string): Promise<VoiceCloneResponse> => {
  if (!OPENAI_CONFIG.apiKey) {
    return {
      success: false,
      error: 'OpenAI not configured',
      fallbackUsed: true,
    };
  }

  try {
    console.log('🤖 Attempting OpenAI TTS synthesis:', text.substring(0, 50) + '...');
    
    const startTime = Date.now();
    
    const response = await fetch(`${OPENAI_CONFIG.baseUrl}/audio/speech`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_CONFIG.model,
        input: text,
        voice: OPENAI_CONFIG.voice,
        response_format: 'mp3',
        speed: 1.0,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI TTS API error:', response.status, errorText);
      return {
        success: false,
        error: `OpenAI TTS API error: ${response.status}`,
        fallbackUsed: true,
      };
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    const duration = Date.now() - startTime;
    console.log(`🤖 OpenAI TTS synthesis completed in ${duration}ms`);

    return {
      success: true,
      audioUrl,
      audioBlob,
      fallbackUsed: false,
      providerUsed: 'openai-tts',
    };
  } catch (error) {
    console.error('OpenAI TTS synthesis error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      fallbackUsed: true,
    };
  }
};

/**
 * Two-tier synthesis with automatic fallback - OpenAI TTS Primary
 * Note: Vapi.ai is not used for standalone TTS (it's for full conversations)
 */
export const synthesizeWithClonedVoice = async (
  text: string,
  config: Partial<VoiceCloneConfig> = {}
): Promise<VoiceCloneResponse> => {
  console.log('🗺️ Note: Using OpenAI TTS for synthesis (Vapi.ai is for live conversations)');
  
  // Try OpenAI TTS first (Primary - High Quality, Reliable)
  const openAIResult = await synthesizeWithOpenAI(text);
  if (openAIResult.success) {
    return openAIResult;
  }

  console.log('🤖 OpenAI TTS failed, will use Browser TTS...');

  // Browser TTS will be handled in playClonedVoiceAudio
  return {
    success: false,
    error: 'Voice synthesis services failed, falling back to browser TTS',
    fallbackUsed: true,
    providerUsed: 'browser-tts',
  };
};

/**
 * Play synthesized audio with three-tier fallback
 */
export const playClonedVoiceAudio = async (
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (error: string) => void
): Promise<{ success: boolean; usedClonedVoice: boolean }> => {
  try {
    onStart?.();

    // Try Fish Audio and OpenAI TTS
    const result = await synthesizeWithClonedVoice(text);

    if (result.success && result.audioUrl) {
      // Play the synthesized audio
      const audio = new Audio(result.audioUrl);

      audio.onended = () => {
        // Clean up the blob URL
        URL.revokeObjectURL(result.audioUrl!);
        onEnd?.();
      };

      audio.onerror = () => {
        URL.revokeObjectURL(result.audioUrl!);
        onError?.('Failed to play synthesized audio');
      };

      await audio.play();

      const isHighQualityVoice = result.providerUsed === 'vapi-ai' || result.providerUsed === 'openai-tts';
      const voiceType = result.providerUsed === 'vapi-ai' ? ' (Imran\'s voice - Rohan)' : 
                       result.providerUsed === 'openai-tts' ? ' (high-quality AI voice)' : '';
      console.log(`✅ Used ${result.providerUsed}${voiceType}`);

      return { success: true, usedClonedVoice: isHighQualityVoice };
    } else {
      // Fallback to standard browser TTS (Tertiary)
      console.log('📢 Falling back to browser TTS');
      return await playBrowserTTS(text, onEnd, onError);
    }
  } catch (error) {
    console.error('Error in voice synthesis:', error);
    onError?.(error instanceof Error ? error.message : 'Unknown error');

    // Fallback to browser TTS
    return await playBrowserTTS(text, onEnd, onError);
  }
};

/**
 * Browser TTS fallback (Tertiary)
 */
const playBrowserTTS = async (
  text: string,
  onEnd?: () => void,
  onError?: (error: string) => void
): Promise<{ success: boolean; usedClonedVoice: boolean }> => {
  return new Promise(resolve => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Configure for better quality
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onend = () => {
        onEnd?.();
        console.log('📢 Used browser TTS');
        resolve({ success: true, usedClonedVoice: false });
      };

      utterance.onerror = event => {
        onError?.(`Browser TTS error: ${event.error}`);
        resolve({ success: false, usedClonedVoice: false });
      };

      window.speechSynthesis.speak(utterance);
    } else {
      onError?.('Speech synthesis not supported');
      resolve({ success: false, usedClonedVoice: false });
    }
  });
};

/**
 * Simple voice cloning function for compatibility
 */
export const cloneVoice = async (text: string): Promise<VoiceCloneResponse> => {
  try {
    // Synthesize the voice
    const result = await synthesizeWithClonedVoice(text);

    if (result.success && result.audioUrl) {
      // Play the audio immediately
      const audio = new Audio(result.audioUrl);
      await audio.play();

      // Clean up the blob URL after playing
      audio.onended = () => {
        URL.revokeObjectURL(result.audioUrl!);
      };

      return { 
        success: true, 
        fallbackUsed: false,
        providerUsed: result.providerUsed 
      };
    } else {
      return result;
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      fallbackUsed: true,
    };
  }
};

/**
 * Get available voices (for setup/testing)
 */
export const getAvailableVoices = async (): Promise<any[]> => {
  // For Fish Audio, this would require their specific API endpoint
  // For now, return empty array as this is mainly used for setup
  console.log('Voice listing not implemented for Fish Audio');
  return [];
};

/**
 * Preload common responses for instant playback
 */
export const preloadCommonResponses = async (responses: string[]): Promise<Map<string, string>> => {
  const cache = new Map<string, string>();

  if (!isVoiceCloningEnabled()) {
    console.log('Voice cloning not enabled, skipping preload');
    return cache;
  }

  console.log('Preloading common responses...');

  for (const text of responses) {
    try {
      const result = await synthesizeWithClonedVoice(text);
      if (result.success && result.audioUrl) {
        cache.set(text, result.audioUrl);
        console.log(`Preloaded: "${text.substring(0, 30)}..." with ${result.providerUsed}`);
      }
    } catch (error) {
      console.warn(`Failed to preload: "${text.substring(0, 30)}..."`, error);
    }
  }

  console.log(`Preloaded ${cache.size} responses`);
  return cache;
};

/**
 * Cleanup blob URLs to prevent memory leaks
 */
export const cleanupAudioUrls = (urls: string[]): void => {
  urls.forEach(url => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  });
};

/**
 * Get character count for cost estimation
 */
export const getCharacterCount = (text: string): number => {
  return text.length;
};

/**
 * Estimate cost for text synthesis
 */
export const estimateCost = (text: string): number => {
  const charCount = getCharacterCount(text);
  
  // Vapi.ai: Pay per minute of usage
  // OpenAI TTS: ~$0.015 per 1000 characters
  // Browser TTS: Free
  
  // Estimate based on typical speech rate (~150 words per minute)
  const wordsCount = charCount / 5; // Average 5 characters per word
  const estimatedMinutes = wordsCount / 150;
  
  // Vapi.ai pricing (example: $0.10 per minute)
  return estimatedMinutes * 0.10;
};