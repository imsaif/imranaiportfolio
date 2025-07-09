/**
 * ElevenLabs Voice Cloning Service
 * Provides voice synthesis using Imran's cloned voice
 */

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
}

export interface VoiceCloneConfig {
  voiceId: string;
  modelId: string;
  settings: VoiceSettings;
}

// Default configuration for Imran's voice
const DEFAULT_CONFIG: VoiceCloneConfig = {
  voiceId: process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || '',
  modelId: 'eleven_monolingual_v1', // High quality model
  settings: {
    stability: 0.5, // Balance between consistency and expressiveness
    similarity_boost: 0.75, // How similar to original voice (higher = more similar)
    style: 0.3, // Amount of style to apply
    use_speaker_boost: true, // Enhance speaker characteristics
  },
};

// API endpoints
const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1';
const TTS_ENDPOINT = (voiceId: string) => `${ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}`;

/**
 * Check if ElevenLabs integration is properly configured
 */
export const isVoiceCloningEnabled = (): boolean => {
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
  const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;

  return !!(apiKey && voiceId && apiKey !== 'your_elevenlabs_api_key_here');
};

/**
 * Get available voices from ElevenLabs (for setup/testing)
 */
export const getAvailableVoices = async (): Promise<any[]> => {
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;

  if (!apiKey) {
    throw new Error('ElevenLabs API key not configured');
  }

  try {
    const response = await fetch(`${ELEVENLABS_BASE_URL}/voices`, {
      headers: {
        'xi-api-key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch voices: ${response.status}`);
    }

    const data = await response.json();
    return data.voices || [];
  } catch (error) {
    console.error('Error fetching voices:', error);
    throw error;
  }
};

/**
 * Synthesize text using Imran's cloned voice
 */
export const synthesizeWithClonedVoice = async (
  text: string,
  config: Partial<VoiceCloneConfig> = {}
): Promise<VoiceCloneResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;

  // Check if voice cloning is enabled
  if (!isVoiceCloningEnabled()) {
    return {
      success: false,
      error: 'Voice cloning not configured',
      fallbackUsed: true,
    };
  }

  // Merge with default config
  const finalConfig = {
    ...DEFAULT_CONFIG,
    ...config,
    settings: {
      ...DEFAULT_CONFIG.settings,
      ...config.settings,
    },
  };

  try {
    console.log('Synthesizing with cloned voice:', text.substring(0, 50) + '...');

    const startTime = Date.now();

    const response = await fetch(TTS_ENDPOINT(finalConfig.voiceId), {
      method: 'POST',
      headers: {
        Accept: 'audio/mpeg',
        'xi-api-key': apiKey!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        model_id: finalConfig.modelId,
        voice_settings: finalConfig.settings,
      }),
    });

    const duration = Date.now() - startTime;
    console.log(`Voice synthesis completed in ${duration}ms`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);

      return {
        success: false,
        error: `API error: ${response.status}`,
        fallbackUsed: true,
      };
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return {
      success: true,
      audioUrl,
      audioBlob,
      fallbackUsed: false,
    };
  } catch (error) {
    console.error('Error in voice synthesis:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      fallbackUsed: true,
    };
  }
};

/**
 * Simple voice cloning function for compatibility
 * Synthesizes text and plays it immediately
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

      return { success: true, fallbackUsed: false };
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
 * Play synthesized audio from cloned voice
 */
export const playClonedVoiceAudio = async (
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (error: string) => void
): Promise<{ success: boolean; usedClonedVoice: boolean }> => {
  try {
    onStart?.();

    // Try to synthesize with cloned voice
    const result = await synthesizeWithClonedVoice(text);

    if (result.success && result.audioUrl) {
      // Play the cloned voice audio
      const audio = new Audio(result.audioUrl);

      audio.onended = () => {
        // Clean up the blob URL
        URL.revokeObjectURL(result.audioUrl!);
        onEnd?.();
      };

      audio.onerror = () => {
        URL.revokeObjectURL(result.audioUrl!);
        onError?.('Failed to play cloned voice audio');
      };

      await audio.play();

      return { success: true, usedClonedVoice: true };
    } else {
      // Fallback to standard speech synthesis
      console.log('Falling back to standard TTS:', result.error);
      return await playStandardTTS(text, onEnd, onError);
    }
  } catch (error) {
    console.error('Error playing cloned voice:', error);
    onError?.(error instanceof Error ? error.message : 'Unknown error');

    // Fallback to standard TTS
    return await playStandardTTS(text, onEnd, onError);
  }
};

/**
 * Fallback to standard browser TTS
 */
const playStandardTTS = async (
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
        resolve({ success: true, usedClonedVoice: false });
      };

      utterance.onerror = event => {
        onError?.(`Standard TTS error: ${event.error}`);
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
 * Preload common responses for instant playback
 */
export const preloadCommonResponses = async (responses: string[]): Promise<Map<string, string>> => {
  const cache = new Map<string, string>();

  if (!isVoiceCloningEnabled()) {
    console.log('Voice cloning not enabled, skipping preload');
    return cache;
  }

  console.log('Preloading common responses with cloned voice...');

  for (const text of responses) {
    try {
      const result = await synthesizeWithClonedVoice(text);
      if (result.success && result.audioUrl) {
        cache.set(text, result.audioUrl);
        console.log(`Preloaded: "${text.substring(0, 30)}..."`);
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
 * Estimate cost for text synthesis (ElevenLabs pricing)
 */
export const estimateCost = (text: string): number => {
  const charCount = getCharacterCount(text);
  const costPerChar = 0.0003; // Approximate cost per character
  return charCount * costPerChar;
};
