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
import { generateResponse } from '../utils/chatService';
import { createTestCommand } from '../utils/voiceTestUtils';

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

// Common responses to preload for instant playback
const COMMON_RESPONSES = [
  'Hi, this is Imran. I can hear and respond to your voice! What can I help you with today?',
  "Thanks for visiting my portfolio! I'm here to answer any questions about my projects and experience.",
  "I'd be happy to tell you about my work. What specifically interests you?",
  "I'm having trouble processing that. Could you try again?",
  "That's a great question! Let me provide you with some details.",
  "I'm sorry, I didn't catch that. Could you please repeat?",
  "I'm currently working on a new project. What would you like to know about it?",
  "I'm here to help with any questions you have. What's on your mind?",
  "I'm currently working on a new project. What would you like to know about it?",
  "I'm here to help with any questions you have. What's on your mind?",
  "I'm currently working on a new project. What would you like to know about it?",
  "I'm here to help with any questions you have. What's on your mind?",
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
        const newLevels = audioLevels.map((_, index) => {
          const baseHeight = 0.1;
          const randomFactor = Math.random() * 0.9;
          const wavePattern = Math.sin((Date.now() + index * 100) / 200) * 0.3;
          const centerBoost = 1 - Math.abs(index - 10) / 10; // Boost center bars

          return Math.max(
            baseHeight,
            (randomFactor + wavePattern + centerBoost * 0.3) * (state === 'speaking' ? 0.8 : 0.6)
          );
        });
        setAudioLevels(newLevels);
      } else if (state === 'processing') {
        // Gentle pulsing animation for processing
        const pulsePattern = Math.sin(Date.now() / 300) * 0.5 + 0.5;
        const newLevels = audioLevels.map((_, index) => {
          const centerDistance = Math.abs(index - 10);
          return (0.2 + pulsePattern * 0.3) * (1 - centerDistance / 15);
        });
        setAudioLevels(newLevels);
      }
    }, 80); // 80ms for smooth animation

    return () => clearInterval(interval);
  }, [isActive, state, audioLevels]);

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
            ? 'linear-gradient(135deg, #6366f1, #f43f5e, #6366f1)'
            : state === 'speaking' && isClonedVoice
              ? 'linear-gradient(135deg, #4f46e5, #f43f5e, #6366f1)'
              : state === 'processing'
                ? 'linear-gradient(135deg, #f59e0b, #f43f5e, #6366f1)'
                : isClonedVoice
                  ? 'linear-gradient(135deg, #4f46e5, #f43f5e, #6366f1)'
                  : 'linear-gradient(135deg, #6366f1, #f43f5e, #6366f1)',
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

// Voice type indicator badge
const VoiceIndicatorBadge: React.FC<{
  isClonedVoice: boolean;
  isVisible: boolean;
  state: VoiceState;
}> = ({ isClonedVoice, isVisible, state }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border mb-4 ${
        isClonedVoice
          ? 'bg-rose-500/20 text-rose-700 border-rose-400/30'
          : 'bg-indigo-500/20 text-indigo-700 border-indigo-400/30'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full animate-pulse ${isClonedVoice ? 'bg-rose-500' : 'bg-indigo-500'}`} />
        <span>{isClonedVoice ? "Imran's Voice" : 'AI Voice'}</span>
      </div>
    </motion.div>
  );
};

// Status text with enhanced styling
const StatusDisplay: React.FC<{
  state: VoiceState;
  errorMessage: string;
  currentMessage: string;
  messages: Message[];
  isClonedVoice: boolean;
}> = ({ state, errorMessage, currentMessage, messages, isClonedVoice }) => {
  const getStatusText = () => {
    if (errorMessage) return errorMessage;
    if (currentMessage) return currentMessage;

    const latestMessage = messages[messages.length - 1];

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
  };

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

  // Check if voice cloning is enabled and preload responses
  useEffect(() => {
    const checkVoiceCloning = async () => {
      const enabled = isVoiceCloningEnabled();
      setIsClonedVoiceEnabled(enabled);

      if (enabled) {
        console.log('Voice cloning enabled! Preloading common responses...');
        try {
          const preloaded = await preloadCommonResponses(COMMON_RESPONSES);
          preloadedUrlsRef.current = Array.from(preloaded.values());
        } catch (error) {
          console.error('Error preloading responses:', error);
        }
      }
    };

    checkVoiceCloning();

    // Enable voice testing commands in development
    if (process.env.NODE_ENV === 'development') {
      createTestCommand();
    }
  }, []);

  // Initialize voice bot with welcome message and start conversation tracking
  useEffect(() => {
    if (isActive && messages.length === 0 && isSupported) {
      // Start a new conversation session
      const canStartConversation = voiceBotRateLimiter.startNewConversation();

      if (!canStartConversation) {
        const errorMsg = 'Maximum conversations per session reached. Please refresh the page to start a new session.';
        setErrorMessage(errorMsg);
        setVoiceState('error');
        return;
      }



      const welcomeMessage = isClonedVoiceEnabled
        ? 'Hi, this is Imran speaking! I can hear and respond to you. What would you like to know about my work?'
        : 'Hi, this is Imran. I can hear and respond to your voice! What would you like to know about my work?';

      // Check rate limit for welcome message
      const rateLimitCheck = voiceBotRateLimiter.checkRateLimit(welcomeMessage, isClonedVoiceEnabled);

      if (!rateLimitCheck.allowed) {
        setErrorMessage(rateLimitCheck.reason || 'Rate limit exceeded');
        setVoiceState('error');
        return;
      }

      addMessage(welcomeMessage, 'bot');
      speakMessage(welcomeMessage);

      // Record the usage
      voiceBotRateLimiter.recordUsage(welcomeMessage, isClonedVoiceEnabled);
    } else if (isActive && !isSupported) {
      // Don't show error immediately - let user try to interact first
      // The error will be shown in startListening if it truly doesn't work
      console.log('Speech Recognition not initially supported, but will try on user interaction');
    }
  }, [isActive, isSupported, isClonedVoiceEnabled]);

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
      const transcript = event.results[0][0].transcript;
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

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setVoiceState('idle');
    setCurrentMessage('');
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setVoiceState('idle');
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
      {/* Voice Type Indicator - Removed */}
      {/* <VoiceIndicatorBadge
        isClonedVoice={isClonedVoiceEnabled && lastUsedClonedVoice}
        isVisible={voiceState === 'speaking' || voiceState === 'processing'}
        state={voiceState}
      /> */}

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
          isClonedVoice={isClonedVoiceEnabled}
          onClick={voiceState === 'listening' ? stopListening : startListening}
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
      />

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        {/* Stop Speaking Button */}
        {voiceState === 'speaking' && (
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
            Stop Speaking
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default VoiceBot;
