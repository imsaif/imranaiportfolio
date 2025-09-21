'use client';

import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { voiceBotRateLimiter } from '../services/voiceBotRateLimit';
import {
    cleanupAudioUrls,
    isVoiceCloningEnabled,
    playClonedVoiceAudio,
    preloadCommonResponses,
} from '../services/voiceCloning';
import {
    initializeVapi,
    isVapiEnabled,
    startVapiCall,
    stopVapiCall,
    isCallActive,
    setupVapiEventHandlers,
    cleanupVapi,
} from '../services/vapiService';
import { generateResponse } from '../utils/chatService';
import { createTestCommand } from '../utils/voiceTestUtils';
import { createImranTestCommands } from '../utils/testImranAssistant';

// TypeScript declarations for Speech Recognition API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface VoiceBotProps {
  isActive: boolean;
  closeVoice?: () => void;
}

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

// Common responses to preload for instant playback - Product Designer focused
const COMMON_RESPONSES = [
  'Hi my name is Imran, I\'m a senior product designer. I can listen and respond to your voice. What would you like to know about my work',
  "Thanks for visiting my portfolio! I specialize in AI applications and product development. What interests you most?",
  "I'd be happy to discuss my design process and AI product experience. What specifically would you like to explore?",
  "I'm having trouble processing that. Could you try again?",
  "That's an excellent question about product design! Let me share my insights.",
  "I didn't catch that clearly. Could you please repeat your question?",
  "I'm passionate about AI application development. What aspect would you like to explore?",
  "As a senior product designer, I can share insights on design processes, AI products, and best practices. What's your focus?",
  "I love discussing user experience and product strategy. What would you like to know?",
  "My experience spans AI applications, design systems, and product development. What interests you?",
];

// Professional Voice Visualizer with animated bars
const VoiceVisualizer: React.FC<{
  isActive: boolean;
  state: VoiceState;
  isClonedVoice: boolean;
}> = ({ isActive, state, isClonedVoice }) => {
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(20).fill(0));

  useEffect(() => {
    if (!isActive) {
      setAudioLevels(new Array(20).fill(0));
      return;
    }

    const interval = setInterval(() => {
      if (state === 'listening' || state === 'speaking') {
        // Generate dynamic audio levels that simulate real voice activity
        setAudioLevels(prevLevels => prevLevels.map((_, index) => {
          const baseHeight = 0.1;
          const randomFactor = Math.random() * 0.9;
          const wavePattern = Math.sin((Date.now() + index * 100) / 200) * 0.3;
          const centerBoost = 1 - Math.abs(index - 10) / 10; // Boost center bars

          return Math.max(
            baseHeight,
            (randomFactor + wavePattern + centerBoost * 0.3) * (state === 'speaking' ? 0.8 : 0.6)
          );
        }));
      } else if (state === 'processing') {
        // Gentle pulsing animation for processing
        const pulsePattern = Math.sin(Date.now() / 300) * 0.5 + 0.5;
        setAudioLevels(prevLevels => prevLevels.map((_, index) => {
          const centerDistance = Math.abs(index - 10);
          return (0.2 + pulsePattern * 0.3) * (1 - centerDistance / 15);
        }));
      }
    }, 80); // 80ms for smooth animation

    return () => clearInterval(interval);
  }, [isActive, state]); // Removed audioLevels from dependencies

  return (
    <div className="flex items-end justify-center gap-1 h-20 px-4 mb-6">
      {audioLevels.map((level, index) => (
        <motion.div
          key={index}
          className={`rounded-full transition-all duration-100 ${
            isClonedVoice
              ? 'bg-gradient-to-t from-indigo-600 via-rose-500 to-indigo-400'
              : 'bg-gradient-to-t from-indigo-500 via-rose-500 to-indigo-300'
          }`}
          style={{
            width: `${2 + (index === 10 ? 1 : 0)}px`, // Center bar slightly wider
          }}
          animate={{
            height: `${Math.max(4, level * 60)}px`,
            opacity: state === 'idle' ? 0.3 : [0.7, 1, 0.7],
          }}
          transition={{
            duration: state === 'idle' ? 0.3 : 0.1,
            repeat: state === 'idle' ? 0 : Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Central microphone icon with state-based styling
const MicrophoneIcon: React.FC<{
  state: VoiceState;
  isClonedVoice: boolean;
  onClick: () => void;
  disabled: boolean;
}> = ({ state, isClonedVoice, onClick, disabled }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 mb-6 ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105'
      }`}
      style={{
        background:
          state === 'listening'
            ? 'linear-gradient(135deg, #7075e0, #e0637c, #7075e0)'
            : state === 'speaking' && isClonedVoice
              ? 'linear-gradient(135deg, #5f64d1, #e0637c, #7075e0)'
              : state === 'processing'
                ? 'linear-gradient(135deg, #5f64d1, #e0637c, #7075e0)'
                : isClonedVoice
                  ? 'linear-gradient(135deg, #5f64d1, #e0637c, #7075e0)'
                  : 'linear-gradient(135deg, #7075e0, #e0637c, #7075e0)',
      }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Pulsing ring effect */}
      {(state === 'listening' || state === 'speaking') && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/50"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${state === 'listening' ? 'animate-pulse' : ''}`}
      >
        {state === 'listening' ? (
          // Stop icon when listening
          <rect x="6" y="6" width="12" height="12" rx="2" fill="white" />
        ) : (
          // Microphone icon
          <>
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </>
        )}
      </svg>
    </motion.button>
  );
};

// Status text with enhanced styling
const StatusDisplay: React.FC<{
  state: VoiceState;
  errorMessage: string;
  currentMessage: string;
  messages: Message[];
  isClonedVoice: boolean;
  isVapiMode?: boolean;
  vapiCallActive?: boolean;
}> = ({ state, errorMessage, currentMessage, messages, isClonedVoice, isVapiMode = false, vapiCallActive = false }) => {
  const getStatusText = () => {
    if (errorMessage) return errorMessage;
    if (currentMessage) {
      console.log('🔍 Using currentMessage:', currentMessage);
      return currentMessage;
    }

    const latestMessage = messages[messages.length - 1];

    if (isVapiMode) {
      if (vapiCallActive) {
        switch (state) {
          case 'listening':
            return 'Imran is listening - speak naturally!';
          case 'processing':
            return 'Imran is thinking about your question...';
          case 'speaking':
            return 'Imran is speaking - listen closely!';
          case 'idle':
            return 'Connected! Imran is ready - say something';
          default:
            return 'Voice conversation active with Imran';
        }
      } else {
        // Vapi mode but call not active - could be connecting or ended
        switch (state) {
          case 'processing':
            return 'Imran is picking up the call...';
          case 'error':
            return errorMessage || 'Connection failed - try clicking microphone';
          case 'idle':
            return 'Voice conversation ended. Click microphone to call again.';
          default:
            return 'Ready to call Imran - click microphone';
        }
      }
    }

    switch (state) {
      case 'listening':
        return 'Listening to your voice...';
      case 'processing':
        return isClonedVoice ? 'Imran is thinking...' : 'Processing your request...';
      case 'speaking':
        return isClonedVoice ? 'Imran is speaking...' : 'AI is responding...';
      case 'error':
        return errorMessage || 'Something went wrong';
      default:
        return latestMessage?.text || (isClonedVoice ? 'Hi, Imran is ready to help!' : 'AI assistant ready to help');
    }
  };

  const getStatusColor = () => {
    if (isVapiMode) {
      if (vapiCallActive) {
        switch (state) {
          case 'listening':
            return 'text-green-600 dark:text-green-400'; // Green for active listening
          case 'processing':
            return 'text-purple-600 dark:text-purple-400'; // Purple for thinking
          case 'speaking':
            return 'text-indigo-600 dark:text-indigo-400'; // Indigo for speaking
          case 'idle':
            return 'text-emerald-600 dark:text-emerald-400'; // Emerald for ready state
          default:
            return 'text-indigo-600 dark:text-indigo-400';
        }
      } else {
        // Connecting state colors
        return state === 'error' 
          ? 'text-red-600 dark:text-red-400'
          : 'text-amber-600 dark:text-amber-400'; // Amber for connecting
      }
    } // Fixed: Added closing brace for isVapiMode condition

    switch (state) {
      case 'listening':
        return 'text-blue-600 dark:text-blue-400';
      case 'processing':
        return 'text-amber-600 dark:text-amber-400';
      case 'speaking':
        return isClonedVoice ? 'text-rose-600 dark:text-rose-400' : 'text-indigo-600 dark:text-indigo-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-muted-foreground';
    }
  }; // Fixed: Added closing brace for getStatusColor function

  return (
    <motion.div
      key={getStatusText()} // Re-animate when text changes
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-md mx-auto px-4 mb-6"
    >
      <p className={`text-lg font-medium transition-colors duration-300 ${getStatusColor()}`}>{getStatusText()}</p>
    </motion.div>
  );
};

const VoiceBot: React.FC<VoiceBotProps> = ({ isActive, closeVoice }) => {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSupported, setIsSupported] = useState<boolean>(true); // Assume supported initially, check on interaction
  const [isClonedVoiceEnabled, setIsClonedVoiceEnabled] = useState<boolean>(false);
  const [lastUsedClonedVoice, setLastUsedClonedVoice] = useState<boolean>(false);
  const [isVapiMode, setIsVapiMode] = useState<boolean>(false);
  const [vapiCallActive, setVapiCallActive] = useState<boolean>(false);
  const [callManuallyStopped, setCallManuallyStopped] = useState<boolean>(false);


  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const preloadedUrlsRef = useRef<string[]>([]);

  // Check browser support for Speech Recognition
  useEffect(() => {
    // Check if we're in a browser environment first
    if (typeof window === 'undefined') {
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    console.log('Speech Recognition API check:', {
      SpeechRecognition: !!SpeechRecognition,
      speechSynthesis: 'speechSynthesis' in window,
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      hasUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    });

    // Try to initialize if basic APIs are available
    if (SpeechRecognition && 'speechSynthesis' in window) {
      try {
        recognitionRef.current = new SpeechRecognition();
        setupSpeechRecognition();
        console.log('✅ Speech Recognition pre-initialized successfully');
      } catch (error) {
        console.log('⚠️ Speech Recognition pre-initialization failed, will try on user interaction:', error);
        // Don't set unsupported here, we'll try again on user interaction
      }
    } else {
      console.log('⚠️ Speech Recognition APIs not detected, will check again on user interaction');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      // Cleanup preloaded audio URLs
      cleanupAudioUrls(preloadedUrlsRef.current);
    };
  }, []);

  // Check voice services and initialize Vapi.ai
  useEffect(() => {
    const initializeVoiceServices = async () => {
      const voiceCloningEnabled = isVoiceCloningEnabled();
      setIsClonedVoiceEnabled(voiceCloningEnabled);

      // Check if Vapi.ai is available
      const vapiAvailable = isVapiEnabled();
      setIsVapiMode(vapiAvailable);

      if (vapiAvailable) {
        console.log('🎵 Vapi.ai is available! Initializing...');
        initializeVapi();
        
        // Set up Vapi event handlers
        setupVapiEventHandlers({
          onCallStart: () => {
            setVapiCallActive(true);
            setVoiceState('speaking');
            console.log('🎤 Vapi call started');
          },
          onCallEnd: () => {
            setVapiCallActive(false);
            setVoiceState('idle');
            setCurrentMessage(''); // Clear any connection messages
            console.log('📞 Vapi call ended - cleared currentMessage');
          },
          onSpeechStart: () => {
            setVoiceState('listening');
            console.log('👂 User speaking detected');
          },
          onSpeechEnd: () => {
            setVoiceState('processing');
            console.log('🤐 User stopped speaking');
          },
          onMessage: (message) => {
            console.log('💬 Vapi message:', message);
            if (message.type === 'transcript' && message.transcript) {
              addMessage(message.transcript, 'user');
            }
            if (message.type === 'function-call-result' || message.role === 'assistant') {
              const content = message.content || message.text;
              if (content) {
                addMessage(content, 'bot');
              }
            }
          },
          onError: (error) => {
            console.error('❌ Vapi error:', error);
            setErrorMessage('Voice service error. Falling back to text-to-speech.');
            setVoiceState('error');
            setTimeout(() => {
              setErrorMessage('');
              setVoiceState('idle');
            }, 3000);
          }
        });
      } else if (voiceCloningEnabled) {
        console.log('Voice cloning enabled! Preloading common responses...');
        try {
          const preloaded = await preloadCommonResponses(COMMON_RESPONSES);
          preloadedUrlsRef.current = Array.from(preloaded.values());
        } catch (error) {
          console.error('Error preloading responses:', error);
        }
      }
    };

    initializeVoiceServices();

    // Enable voice testing commands in development
    if (process.env.NODE_ENV === 'development') {
      createTestCommand();
      createImranTestCommands();
    }

    // Cleanup on unmount
    return () => {
      cleanupVapi();
    };
  }, []);

  // Auto-start voice conversation when voice mode is activated
  useEffect(() => {
    console.log('🎯 Voice activation check:', { isActive, messagesLength: messages.length, isVapiMode, callManuallyStopped });
    
    // Reset manually stopped flag when voice mode is reactivated
    if (isActive && messages.length === 0 && callManuallyStopped) {
      console.log('🔄 Voice mode reactivated - resetting manually stopped flag');
      setCallManuallyStopped(false);
      return; // Don't start call immediately, wait for next useEffect cycle
    }
    
    if (isActive && messages.length === 0 && !callManuallyStopped) {
      console.log('✅ Starting voice conversation...');
      // Start a new conversation session
      const canStartConversation = voiceBotRateLimiter.startNewConversation();

      if (!canStartConversation) {
        const errorMsg = 'Maximum conversations per session reached. Please refresh the page to start a new session.';
        setErrorMessage(errorMsg);
        setVoiceState('error');
        return;
      }

      // Check Vapi.ai availability directly instead of relying on state timing
      const vapiCurrentlyEnabled = isVapiEnabled();
      
      console.log('🔍 Voice mode decision:', {
        isVapiMode,
        isVapiEnabledCheck: vapiCurrentlyEnabled,
        isClonedVoiceEnabled,
        condition: vapiCurrentlyEnabled
      });

      if (vapiCurrentlyEnabled) {
        // Auto-start Vapi.ai call immediately for seamless experience
        console.log('🎤 Auto-starting Vapi.ai call for immediate conversation');
        startVapiCallAutomatically();
      } else {
        // Fallback: Use traditional welcome message with TTS (only if Vapi is not available)
        const welcomeMessage = isClonedVoiceEnabled
          ? 'Hi, this is Imran speaking! I can hear and respond to you. What would you like to know about my work?'
          : 'Hi, this is Imran. I can hear and respond to your voice! What would you like to know about my work?';

        const rateLimitCheck = voiceBotRateLimiter.checkRateLimit(welcomeMessage, false);
        if (rateLimitCheck.allowed) {
          addMessage(welcomeMessage, 'bot');
          speakMessage(welcomeMessage, false);
          voiceBotRateLimiter.recordUsage(welcomeMessage, false);
        } else {
          setErrorMessage(rateLimitCheck.reason || 'Rate limit exceeded');
          setVoiceState('error');
        }
      }
    }
  }, [isActive, isVapiMode, callManuallyStopped]);

  const setupSpeechRecognition = useCallback(() => {
    if (!recognitionRef.current) return;

    const recognition = recognitionRef.current;

    // Configure speech recognition
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setVoiceState('listening');
      setErrorMessage('');
      setCurrentMessage('');
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const transcript = event.results?.[0]?.[0]?.transcript;

      if (!transcript) {
        setErrorMessage('No speech was detected');
        setVoiceState('idle');
        return;
      }

      setVoiceState('processing');
      setCurrentMessage('');

      // Check rate limit before processing the user's message
      const userRateLimitCheck = voiceBotRateLimiter.checkRateLimit(transcript, false); // User message doesn't use cloned voice

      if (!userRateLimitCheck.allowed) {
        setErrorMessage(userRateLimitCheck.reason || 'Rate limit exceeded');
        setVoiceState('error');

        // Clear error after showing the limit message
        setTimeout(() => {
          setErrorMessage('');
          setVoiceState('idle');
        }, 5000);
        return;
      }

      addMessage(transcript, 'user');
      voiceBotRateLimiter.recordUsage(transcript, false); // Record user message usage

      try {
        const response = await generateResponse(transcript, messages);

        // Check rate limit for bot response
        const shouldUseClonedVoice = isClonedVoiceEnabled && voiceBotRateLimiter.shouldUseClonedVoice(response);
        const botRateLimitCheck = voiceBotRateLimiter.checkRateLimit(response, shouldUseClonedVoice);

        if (!botRateLimitCheck.allowed) {
          // If we can't use cloned voice due to limits, try with standard voice
          if (shouldUseClonedVoice) {
            const standardVoiceCheck = voiceBotRateLimiter.checkRateLimit(response, false);
            if (standardVoiceCheck.allowed) {
              addMessage(response, 'bot');
              await speakMessage(response, false); // Use standard voice
              voiceBotRateLimiter.recordUsage(response, false);
              return;
            }
          }

          // If even standard voice is rate limited, show error
          setErrorMessage(botRateLimitCheck.reason || 'Rate limit exceeded');
          setVoiceState('error');
          setTimeout(() => {
            setErrorMessage('');
            setVoiceState('idle');
          }, 5000);
          return;
        }

        addMessage(response, 'bot');
        await speakMessage(response, shouldUseClonedVoice);
        voiceBotRateLimiter.recordUsage(response, shouldUseClonedVoice);
      } catch (error) {
        console.error('Error generating response:', error);
        const errorResponse = "I'm sorry, I encountered an error processing your request. Please try again.";

        // Check rate limit for error response
        const errorRateLimitCheck = voiceBotRateLimiter.checkRateLimit(errorResponse, false);
        if (errorRateLimitCheck.allowed) {
          addMessage(errorResponse, 'bot');
          await speakMessage(errorResponse, false);
          voiceBotRateLimiter.recordUsage(errorResponse, false);
        } else {
          setErrorMessage('Service temporarily unavailable due to rate limits.');
          setVoiceState('error');
        }
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);

      let errorMsg = '';
      switch (event.error) {
        case 'no-speech':
          errorMsg = "I didn't hear anything. Please try speaking again.";
          break;
        case 'audio-capture':
          errorMsg = 'Could not access your microphone. Please check permissions.';
          break;
        case 'not-allowed':
          errorMsg = 'Microphone access denied. Please allow microphone access.';
          break;
        case 'network':
          errorMsg = 'Network error occurred. Please check your connection.';
          break;
        default:
          errorMsg = 'Voice recognition error. Please try again.';
      }

      setErrorMessage(errorMsg);
      setVoiceState('error');

      // Clear error after 3 seconds
      setTimeout(() => {
        setErrorMessage('');
        setVoiceState('idle');
      }, 3000);
    };

    recognition.onend = () => {
      if (voiceState === 'listening') {
        setVoiceState('idle');
      }
    };
  }, [messages, voiceState]);

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const speakMessage = async (message: string, forceClonedVoice?: boolean): Promise<void> => {
    setVoiceState('speaking');

    try {
      // If forceClonedVoice is explicitly false, use standard TTS
      if (forceClonedVoice === false) {
        // Use standard browser TTS
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;

        utterance.onend = () => setVoiceState('idle');
        utterance.onerror = () => setVoiceState('idle');

        window.speechSynthesis.speak(utterance);
        setLastUsedClonedVoice(false);
        console.log('📢 Used standard TTS voice (rate limited)');
        return;
      }

      // Otherwise, use the normal cloned voice logic
      const result = await playClonedVoiceAudio(
        message,
        () => setVoiceState('speaking'),
        () => setVoiceState('idle'),
        error => {
          console.error('Voice playback error:', error);
          setVoiceState('idle');
        }
      );

      setLastUsedClonedVoice(result.usedClonedVoice);

      if (result.usedClonedVoice) {
        console.log("✅ Used Imran's cloned voice!");
      } else {
        console.log('📢 Used standard TTS voice');
      }
    } catch (error) {
      console.error('Error in speech synthesis:', error);
      setVoiceState('idle');
    }
  };

  const startListening = async () => {
    // If Vapi.ai is available, use Vapi call instead of speech recognition
    if (isVapiMode && isVapiEnabled()) {
      if (vapiCallActive) {
        // Stop current Vapi call
        await stopVapiCall();
        setVapiCallActive(false);
        setVoiceState('idle');
        return;
      }

      try {
        setVoiceState('processing');
        setCallManuallyStopped(false); // Reset the flag when manually starting
        const result = await startVapiCall();

        if (result.success) {
          setVapiCallActive(true);
          setVoiceState('listening');
          console.log('🎤 Vapi call started successfully');
        } else {
          setErrorMessage(result.error || 'Failed to start voice call');
          setVoiceState('error');
          setTimeout(() => {
            setErrorMessage('');
            setVoiceState('idle');
          }, 3000);
        }
      } catch (error) {
        console.error('Error starting Vapi call:', error);
        setErrorMessage('Could not start voice call. Please try again.');
        setVoiceState('error');
      }
      return;
    }

    // Fallback to traditional speech recognition
    // If initial support check failed, try to re-initialize
    if (!isSupported || !recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setErrorMessage('Voice recognition not available in your browser. Please use Chrome or Safari.');
        return;
      }

      try {
        // Try to request microphone permission first
        await navigator.mediaDevices.getUserMedia({ audio: true });

        // Initialize Speech Recognition after permission granted
        recognitionRef.current = new SpeechRecognition();
        setupSpeechRecognition();
        setIsSupported(true);
        setErrorMessage(''); // Clear any previous error

        console.log('✅ Speech Recognition initialized after user interaction');
      } catch (permissionError) {
        console.error('Microphone permission denied:', permissionError);
        setErrorMessage('Microphone access denied. Please allow microphone access to use voice features.');
        return;
      }
    }

    if (voiceState === 'speaking') {
      // Stop current speech before listening
      window.speechSynthesis.cancel();
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setErrorMessage('Could not start voice recognition. Please try again.');
    }
  };

  const stopListening = async () => {
    if (isVapiMode && vapiCallActive) {
      // Stop Vapi call
      await stopVapiCall();
      setVapiCallActive(false);
    } else if (recognitionRef.current) {
      // Stop speech recognition
      recognitionRef.current.stop();
    }
    setVoiceState('idle');
    setCurrentMessage('');
  };

  const stopSpeaking = async () => {
    if (vapiCallActive) {
      // Stop Vapi call
      await stopVapiCall();
      setVapiCallActive(false);
      setVoiceState('idle');
      setCurrentMessage(''); // Clear any connection messages
      setCallManuallyStopped(true); // Prevent auto-restart
      console.log('🛑 Stopped Vapi call - cleared currentMessage, set manually stopped flag');
    } else if ('speechSynthesis' in window) {
      // Stop regular TTS
      window.speechSynthesis.cancel();
      setVoiceState('idle');
    }

    // Close voice mode and return to portfolio
    if (closeVoice) {
      closeVoice();
    }
  };

  // Auto-start Vapi.ai call when voice mode is activated
  const startVapiCallAutomatically = async () => {
    try {
      setVoiceState('processing');
      setCurrentMessage('Imran is picking up the call...');
      
      const result = await startVapiCall();
      
      if (result.success) {
        setVapiCallActive(true);
        setVoiceState('speaking'); // Vapi will handle the greeting
        setCurrentMessage('');
        console.log('🎤 Auto-started Vapi call successfully - Imran will greet you!');
        
        // Set up auto-stop timeout (2 minutes)
        setTimeout(async () => {
          if (vapiCallActive) {
            console.log('⏰ Auto-stopping Vapi call after 2 minutes');
            await stopVapiCall();
            setVapiCallActive(false);
            setVoiceState('idle');
            addMessage('Voice session ended after 2 minutes. Click the microphone to start again.', 'bot');

            // Close voice mode and return to portfolio after timeout
            if (closeVoice) {
              setTimeout(closeVoice, 1000); // Small delay to show the message briefly
            }
          }
        }, 120000); // 2 minutes
      } else {
        console.error('❌ Failed to auto-start Vapi call:', result.error);
        setErrorMessage('Failed to connect to Imran. Please try clicking the microphone.');
        setVoiceState('idle');
        
        // Fallback to traditional mode
        const fallbackMessage = 'Unable to start voice call automatically. Click the microphone to try again.';
        addMessage(fallbackMessage, 'bot');
        speakMessage(fallbackMessage, false);
      }
    } catch (error) {
      console.error('❌ Error auto-starting Vapi call:', error);
      setErrorMessage('Connection error. Please try clicking the microphone.');
      setVoiceState('idle');
      
      // Fallback message
      const errorMessage = 'Voice connection failed. Click the microphone to try again.';
      addMessage(errorMessage, 'bot');
      speakMessage(errorMessage, false);
    }
  };

  if (!isActive) return null;

  // Only show error screen if we've explicitly determined it's not supported
  if (!isSupported && errorMessage.includes('not available in your browser')) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="text-center py-12"
      >
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.318 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-300">Voice Not Supported</h3>
          <p className="text-red-600 dark:text-red-400">
            Voice recognition isn't available in your browser. Please try using Chrome or Safari.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="text-center py-12 max-w-2xl mx-auto"
    >
      {/* Voice Visualizer */}
      <VoiceVisualizer
        isActive={voiceState !== 'idle' && voiceState !== 'error'}
        state={voiceState}
        isClonedVoice={isClonedVoiceEnabled && lastUsedClonedVoice}
      />

      {/* Central Microphone */}
      <div className="flex justify-center">
        <MicrophoneIcon
          state={voiceState}
          isClonedVoice={isVapiMode || isClonedVoiceEnabled}
          onClick={vapiCallActive ? stopListening : startListening}
          disabled={voiceState === 'processing' || voiceState === 'error'}
        />
      </div>

      {/* Status Display */}
      <StatusDisplay
        state={voiceState}
        errorMessage={errorMessage}
        currentMessage={currentMessage}
        messages={messages}
        isClonedVoice={isClonedVoiceEnabled}
        isVapiMode={isVapiMode}
        vapiCallActive={vapiCallActive}
      />

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        {/* Stop Speaking/End Conversation Button */}
        {(voiceState === 'speaking' || vapiCallActive) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={stopSpeaking}
            className="px-4 py-2 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-300 transition-all"
            aria-label="Stop Speaking"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mr-2 inline"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
{vapiCallActive ? 'End Conversation' : 'Stop Speaking'}
          </motion.button>
        )}
      </div>
      
      {/* Technical indicator */}
      <div className="text-center mt-4">
        <span className="text-xs text-gray-500/80">
          {isVapiMode 
            ? 'Built using Vapi.ai with Imran\'s voice assistant'
            : 'Built with Web Speech API & Two-Tier Voice System'
          }
        </span>
      </div>
    </motion.div>
  );
};

export default VoiceBot;
