/**
 * Hybrid Conversational Agent Service
 * Combines free browser APIs with strategic premium ElevenLabs usage
 * for cost-effective case study interactions
 */

import { generateResponse } from '../utils/chatService';
import { cloneVoice, isVoiceCloningEnabled } from './voiceCloning';

// Extended SpeechRecognition event interfaces
interface CustomSpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface CustomSpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

// SpeechRecognition types are already declared in VoiceBot.tsx

export interface ConversationContext {
  caseStudyId: string;
  isFirstTimeVisitor: boolean;
  conversationDuration: number;
  messageCount: number;
  userEngagement: number;
  lastVisit?: Date;
}

export interface ConversationLimits {
  maxPremiumMinutes: number;
  maxDailyConversations: number;
  premiumCooldownHours: number;
}

export interface ConversationMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  usedPremiumVoice?: boolean;
  cost?: number;
}

export interface ConversationSession {
  id: string;
  caseStudyId: string;
  startTime: Date;
  messages: ConversationMessage[];
  totalCost: number;
  premiumMinutesUsed: number;
  isActive: boolean;
}

export class HybridConversationalAgent {
  private currentSession: ConversationSession | null = null;
  private speechRecognition: any = null;
  private speechSynthesis: SpeechSynthesis | null = null;
  private isListening = false;
  private defaultLimits: ConversationLimits = {
    maxPremiumMinutes: 3, // 3 minutes of premium voice per session
    maxDailyConversations: 10, // 10 premium conversations per day
    premiumCooldownHours: 2, // 2 hours between premium sessions
  };

  constructor() {
    // Only initialize if we're in the browser
    if (typeof window !== 'undefined') {
      this.speechSynthesis = window.speechSynthesis;
      this.initializeSpeechRecognition();
    }
  }

  private initializeSpeechRecognition(): void {
    // Only initialize if we're in the browser
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.continuous = false;
      this.speechRecognition.interimResults = false;
      this.speechRecognition.lang = 'en-US';
      this.speechRecognition.maxAlternatives = 1;
    }
  }

  /**
   * Start a new conversation session
   */
  async startSession(
    caseStudyId: string,
    context: Partial<ConversationContext> = {},
    limits: Partial<ConversationLimits> = {}
  ): Promise<ConversationSession> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    this.currentSession = {
      id: sessionId,
      caseStudyId,
      startTime: new Date(),
      messages: [],
      totalCost: 0,
      premiumMinutesUsed: 0,
      isActive: true,
    };

    // Merge custom limits with defaults
    const sessionLimits = { ...this.defaultLimits, ...limits };

    // Welcome message with strategic premium voice usage
    const welcomeMessage = this.getWelcomeMessage(caseStudyId);
    const shouldUsePremium = this.shouldUsePremiumVoice(welcomeMessage, context, sessionLimits);

    await this.speakMessage(welcomeMessage, shouldUsePremium);

    this.addMessage(welcomeMessage, 'assistant', shouldUsePremium);

    return this.currentSession;
  }

  /**
   * Listen for user input and respond
   */
  async listenAndRespond(
    context: Partial<ConversationContext> = {},
    limits: Partial<ConversationLimits> = {}
  ): Promise<ConversationMessage | null> {
    if (!this.currentSession || !this.speechRecognition) {
      throw new Error('Session not started or speech recognition not available');
    }

    try {
      // Listen for user input
      const userInput = await this.listenForSpeech();
      this.addMessage(userInput, 'user');

      // Convert ConversationMessage[] to Message[] format for generateResponse
      const chatMessages = this.currentSession.messages.map(msg => ({
        id: msg.id,
        text: msg.text,
        sender: msg.sender === 'assistant' ? 'bot' as const : msg.sender,
        timestamp: msg.timestamp,
      }));

      // Generate AI response
      const response = await generateResponse(userInput, chatMessages);

      // Determine if we should use premium voice
      const sessionLimits = { ...this.defaultLimits, ...limits };
      const shouldUsePremium = this.shouldUsePremiumVoice(response, context, sessionLimits);

      // Speak the response
      await this.speakMessage(response, shouldUsePremium);

      // Add to conversation
      const responseMessage = this.addMessage(response, 'assistant', shouldUsePremium);

      return responseMessage;
    } catch (error) {
      console.error('Error in conversation:', error);

      // Fallback error message with free voice
      const errorMessage = "I'm having trouble understanding. Could you try again?";
      await this.speakMessage(errorMessage, false);
      this.addMessage(errorMessage, 'assistant', false);

      return null;
    }
  }

  /**
   * Listen for speech input using browser API
   */
  private listenForSpeech(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.speechRecognition) {
        reject(new Error('Speech recognition not available'));
        return;
      }

      this.isListening = true;

      this.speechRecognition.onresult = (event: CustomSpeechRecognitionEvent) => {
        const transcript = event.results[0]?.[0]?.transcript;
        this.isListening = false;
        if (transcript) {
          resolve(transcript);
        } else {
          reject(new Error('No transcript available'));
        }
      };

      this.speechRecognition.onerror = (event: CustomSpeechRecognitionErrorEvent) => {
        this.isListening = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.speechRecognition.onend = () => {
        this.isListening = false;
      };

      this.speechRecognition.start();
    });
  }

  /**
   * Speak a message using either premium or free voice
   */
  private async speakMessage(text: string, usePremium: boolean): Promise<void> {
    if (usePremium && isVoiceCloningEnabled()) {
      try {
        const result = await cloneVoice(text);
        if (result.success) {
          // Estimate cost (approximate)
          const estimatedCost = this.estimateTTSCost(text);
          this.updateSessionCost(estimatedCost);
          return;
        }
      } catch (error) {
        console.warn('Premium voice failed, falling back to free:', error);
      }
    }

    // Fallback to free browser TTS
    await this.speakWithBrowserTTS(text);
  }

  /**
   * Speak using free browser TTS
   */
  private speakWithBrowserTTS(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.speechSynthesis || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);

      // Configure for better quality
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      // Select best available voice
      const voices = this.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find(
          voice => voice.name.includes('Alex') || voice.name.includes('Daniel') || voice.name.includes('Samantha')
        ) ||
        voices.find(voice => voice.lang.startsWith('en')) ||
        voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = event => reject(new Error(`TTS error: ${event.error}`));

      this.speechSynthesis.speak(utterance);
    });
  }

  /**
   * Determine if premium voice should be used
   */
  private shouldUsePremiumVoice(
    text: string,
    context: Partial<ConversationContext>,
    limits: ConversationLimits
  ): boolean {
    if (!isVoiceCloningEnabled()) return false;
    if (!this.currentSession) return false;

    // Check budget constraints
    if (this.currentSession.premiumMinutesUsed >= limits.maxPremiumMinutes) {
      return false;
    }

    // Strategic usage criteria
    const isWelcomeMessage =
      text.toLowerCase().includes('welcome') ||
      text.toLowerCase().includes('hello') ||
      text.toLowerCase().includes('hi');

    const isKeyInsight =
      text.toLowerCase().includes('key') ||
      text.toLowerCase().includes('important') ||
      text.toLowerCase().includes('insight');

    const isShortResponse = text.length < 150;

    const isFirstTimeVisitor = context.isFirstTimeVisitor || false;

    const isHighEngagement = (context.userEngagement || 0) > 0.7;

    // Use premium voice for strategic moments
    return (
      isWelcomeMessage || // Welcome new visitors warmly
      (isFirstTimeVisitor && isKeyInsight) || // Key insights for new visitors
      (isHighEngagement && isShortResponse) || // Engaged users get premium short responses
      this.currentSession.messages.length <= 2 // First few messages
    );
  }

  /**
   * Add message to current session
   */
  private addMessage(text: string, sender: 'user' | 'assistant', usedPremium = false): ConversationMessage {
    if (!this.currentSession) {
      throw new Error('No active session');
    }

    const message: ConversationMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text,
      sender,
      timestamp: new Date(),
      usedPremiumVoice: usedPremium,
      cost: usedPremium ? this.estimateTTSCost(text) : 0,
    };

    this.currentSession.messages.push(message);
    return message;
  }

  /**
   * Estimate TTS cost (approximate)
   */
  private estimateTTSCost(text: string): number {
    const charCount = text.length;
    const costPerChar = 0.0003; // Approximate ElevenLabs pricing
    return charCount * costPerChar;
  }

  /**
   * Update session cost tracking
   */
  private updateSessionCost(cost: number): void {
    if (!this.currentSession) return;

    this.currentSession.totalCost += cost;
    // Rough estimate: assume ~150 chars per minute of speech
    this.currentSession.premiumMinutesUsed += cost / (150 * 0.0003);
  }

  /**
   * Get appropriate welcome message for case study
   */
  private getWelcomeMessage(caseStudyId: string): string {
    const welcomeMessages: Record<string, string> = {
      lessonloom:
        "Hi! I'm Imran. I'd love to walk you through the LessonLoom project - how we designed an AI-powered platform that revolutionized educational content creation. What would you like to know?",
      scheduler:
        "Welcome! I'm excited to share the EduScheduler project with you. This intelligent academic planning system showcases some fascinating design challenges we solved. What interests you most?",
      default:
        "Hi there! I'm Imran, and I'm thrilled you're exploring my case studies. These projects represent some of my most impactful UX design work. What would you like to discuss?",
    };

    const message = caseStudyId ? welcomeMessages[caseStudyId as keyof typeof welcomeMessages] : null;
    return message || welcomeMessages.default;
  }

  /**
   * Get current session status
   */
  getSessionStatus(): {
    isActive: boolean;
    totalCost: number;
    premiumMinutesUsed: number;
    messageCount: number;
    duration: number;
  } | null {
    if (!this.currentSession) return null;

    return {
      isActive: this.currentSession.isActive,
      totalCost: this.currentSession.totalCost,
      premiumMinutesUsed: this.currentSession.premiumMinutesUsed,
      messageCount: this.currentSession.messages.length,
      duration: (Date.now() - this.currentSession.startTime.getTime()) / 1000 / 60, // minutes
    };
  }

  /**
   * End current session
   */
  endSession(): ConversationSession | null {
    if (!this.currentSession) return null;

    this.currentSession.isActive = false;

    // Stop any ongoing speech
    if (this.speechRecognition && this.isListening) {
      this.speechRecognition.stop();
    }

    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }

    const completedSession = this.currentSession;
    this.currentSession = null;

    return completedSession;
  }

  /**
   * Check if speech recognition is supported
   */
  static isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition) && 'speechSynthesis' in window;
  }

  /**
   * Stop current listening
   */
  stopListening(): void {
    if (this.speechRecognition && this.isListening) {
      this.speechRecognition.stop();
      this.isListening = false;
    }
  }

  /**
   * Stop current speaking
   */
  stopSpeaking(): void {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }

  /**
   * Get conversation history
   */
  getConversationHistory(): ConversationMessage[] {
    return this.currentSession?.messages || [];
  }
}

// Lazy-loaded singleton instance
let hybridAgentInstance: HybridConversationalAgent | null = null;

export const getHybridAgent = (): HybridConversationalAgent => {
  if (!hybridAgentInstance) {
    hybridAgentInstance = new HybridConversationalAgent();
  }
  return hybridAgentInstance;
};

// For backwards compatibility, create a getter that provides the same interface
export const hybridAgent = new Proxy({} as HybridConversationalAgent, {
  get(_target, prop) {
    return getHybridAgent()[prop as keyof HybridConversationalAgent];
  },
});
