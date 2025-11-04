'use client';

import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import Image from 'next/image';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { useEffect, useRef, useState } from 'react';
import {
  startUHGVapiCall,
  stopUHGVapiCall,
  cleanupUHGVapi,
  sendFunctionResult
} from '@/services/uhgVapiService';
import * as scrollHandlers from '@/utils/vapiScrollHandlers';
import { CaseStudyTabs } from './components/CaseStudyTabs';

// Voice Control Bar Component
interface VoiceControlBarProps {
  isVapiActive: boolean;
  vapiStatus: 'idle' | 'connecting' | 'active' | 'error';
  handleVapiStart: () => void;
  handleVapiStop: () => void;
  className?: string;
}

const VoiceControlBar: React.FC<VoiceControlBarProps> = ({
  isVapiActive,
  vapiStatus,
  handleVapiStart,
  handleVapiStop,
  className = ""
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm p-4 ${className}`}>
      <div className="flex items-center gap-4">
        {/* Left: Voice indicator and controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block">
              <defs>
                <linearGradient id="voice-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EC4899" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="url(#voice-gradient)" />
              <path
                d="M19 10v2a7 7 0 0 1-14 0v-2"
                stroke="url(#voice-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path d="M12 19v4" stroke="url(#voice-gradient)" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 23h8" stroke="url(#voice-gradient)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Play/Stop button */}
          <button
            onClick={isVapiActive ? handleVapiStop : handleVapiStart}
            disabled={vapiStatus === 'connecting'}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
              vapiStatus === 'active'
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : vapiStatus === 'connecting'
                ? 'bg-blue-100 text-blue-600 animate-pulse'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label={isVapiActive ? "Stop voice assistant" : "Start voice assistant"}
          >
            {vapiStatus === 'connecting' ? (
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="animate-spin">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                <path fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"/>
              </svg>
            ) : isVapiActive ? (
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <rect x="6" y="6" width="4" height="12" fill="currentColor" />
                <rect x="14" y="6" width="4" height="12" fill="currentColor" />
              </svg>
            ) : (
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        {/* Center: Progress bar */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="relative w-full bg-gray-200 rounded-full h-1">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                vapiStatus === 'active'
                  ? 'bg-gradient-to-r from-green-500 to-blue-600 animate-pulse'
                  : 'bg-gradient-to-r from-pink-500 to-purple-600'
              } w-0`}
            ></div>
          </div>
          {vapiStatus === 'active' && (
            <div className="text-xs text-center mt-1 text-green-600 font-medium">
              Voice assistant is listening...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function UHGCaseStudyPage() {
  // UHG Vapi assistant state
  const [isVapiActive, setIsVapiActive] = useState(false);
  const [vapiStatus, setVapiStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle');
  const [conversationPhase, setConversationPhase] = useState<'opening' | 'introduction' | 'active'>('opening');
  const [messageCount, setMessageCount] = useState(0);
  const [showFloatingVoiceBar, setShowFloatingVoiceBar] = useState(false);
  const conversationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const introSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we should show floating voice bar
      if (introSectionRef.current) {
        const introRect = introSectionRef.current.getBoundingClientRect();
        const introBottom = introRect.bottom;
        setShowFloatingVoiceBar(introBottom < -100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Store event handlers for reuse
  const eventHandlers = {
    onCallStart: () => {
      console.log('🎤 UHG Vapi call started');
      setVapiStatus('active');
      setIsVapiActive(true);
    },
    onCallEnd: () => {
      console.log('📞 UHG Vapi call ended');
      setVapiStatus('idle');
      setIsVapiActive(false);
      setConversationPhase('opening');
      setMessageCount(0);

      if (conversationTimeoutRef.current) {
        clearTimeout(conversationTimeoutRef.current);
        conversationTimeoutRef.current = null;
      }
    },
    onSpeechStart: () => {
      console.log('👂 User started speaking');
    },
    onSpeechEnd: () => {
      console.log('🤐 User stopped speaking');
    },
    onError: (error: any) => {
      console.error('❌ UHG Vapi error:', error);
      setVapiStatus('error');
      setIsVapiActive(false);
    },
    onMessage: (message: any) => {
      console.log('💬 UHG Vapi message:', message);

      if (message.type === 'transcript' && message.transcript) {
        console.log('👤 User said:', message.transcript);
        handleKeywordBasedScroll(message.transcript);
      }

      if (message.type === 'function-call-result' || message.role === 'assistant') {
        const content = message.content || message.text;
        if (content) {
          console.log('🤖 Assistant said:', content);
          handleKeywordBasedScroll(content);
        }
      }

      const messageText = message.transcript || message.content || message.text || '';
      if (messageText) {
        setMessageCount(prev => prev + 1);
        handleKeywordBasedScroll(messageText);
      }
    },
    onFunctionCall: (functionCall: any) => {
      console.log('🔧 Function call:', functionCall);
      handleScrollFunction(functionCall);
    }
  };

  // Initialize on mount
  useEffect(() => {
    console.log('🔧 Setting up UHG Vapi...');
    return () => {
      cleanupUHGVapi();
    };
  }, []);

  // Handle scroll function calls from Vapi
  const handleScrollFunction = async (functionCall: any) => {
    const { name, parameters, id } = functionCall;

    try {
      let result;

      switch (name) {
        case 'scrollToSection':
          result = scrollHandlers.scrollToSection(parameters.sectionId);
          break;
        case 'scrollToMetric':
          result = scrollHandlers.scrollToMetric(parameters.metricType);
          break;
        case 'getCurrentSection':
          result = scrollHandlers.getCurrentSection();
          break;
        case 'scrollToContent':
          result = scrollHandlers.scrollToContent(parameters.elementId);
          break;
        case 'getAvailableSections':
          result = scrollHandlers.getAvailableSections();
          break;
        default:
          result = { success: false, message: `Unknown function: ${name}` };
      }

      if (id) {
        await sendFunctionResult(id, result);
      }

      console.log(`✅ Executed ${name}:`, result);
    } catch (error) {
      console.error(`❌ Error executing ${name}:`, error);
      if (id) {
        await sendFunctionResult(id, { success: false, message: `Error: ${error}` });
      }
    }
  };

  // Enhanced keyword-based scrolling with contextual awareness
  const handleKeywordBasedScroll = (text: string) => {
    if (!text) return;

    const lowerText = text.toLowerCase();
    console.log('🔍 Checking keywords in:', lowerText);

    updateConversationPhase(lowerText);

    if (conversationPhase === 'opening' || conversationPhase === 'introduction') {
      const explicitDiscussionRequests = [
        'tell me about', 'explain', 'show me', 'walk me through',
        'how did you', 'what was your', 'dive into', 'talk about',
        'discuss', 'go over', 'cover', 'explore', 'look at'
      ];

      const sectionRequests = [
        'design', 'research', 'technical', 'prototype', 'results', 'implementation',
        'discovery', 'strategy', 'approach', 'process', 'methodology', 'solution',
        'strategic', 'business', 'context', 'leadership', 'crisis', 'organizational', 'insights'
      ];

      const hasExplicitRequest = explicitDiscussionRequests.some(request => lowerText.includes(request));
      const hasSectionRequest = sectionRequests.some(section => lowerText.includes(section));

      const shouldAllowScroll = hasExplicitRequest || (hasSectionRequest && (
        lowerText.includes('?') ||
        lowerText.includes('tell me') ||
        lowerText.includes('show me') ||
        lowerText.includes('explain') ||
        lowerText.includes('about the') ||
        lowerText.includes('the ' + sectionRequests.find(s => lowerText.includes(s)))
      ));

      if (!shouldAllowScroll) {
        return;
      } else {
        setConversationPhase('active');
      }
    }

    if (!shouldTriggerScroll(lowerText)) {
      return;
    }

    // Define keyword mappings to sections
    const keywordMappings = {
      'research': ['research', 'discovery', 'insights', 'user types', 'mental model', 'data analysis', 'stakeholder'],
      'design': ['design', 'solution', 'approach', 'strategy', 'ocr', 'workflow', 'progressive', 'compliance'],
      'technical': ['technical', 'technology', 'tech stack', 'implementation', 'react native', 'node.js', 'aws', 'postgresql'],
      'results': ['results', 'impact', 'metrics', 'completion', 'abandonment', 'improvement', 'success', 'outcome'],
      'overview': ['problem', 'challenge', 'business', 'platform', 'context', 'constraint'],
      'strategic-business-context': ['strategic', 'business context', 'market', 'competitive', 'investment'],
      'leadership-team': ['leadership', 'team', 'authority', 'stakeholder', 'management'],
      'crisis-management': ['crisis', 'pivot', 'challenge', 'setback', 'failure'],
      'organizational-impact': ['organizational', 'design system', 'process', 'capability', 'culture'],
      'strategic-insights': ['insights', 'leadership', 'learning', 'evolution', 'philosophy']
    };

    for (const [section, keywords] of Object.entries(keywordMappings)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        console.log(`🎯 Detected ${section} keywords, scrolling to section`);
        scrollHandlers.scrollToSection(section);
        break;
      }
    }
  };

  // Update conversation phase based on content and context
  const updateConversationPhase = (lowerText: string) => {
    if (conversationPhase === 'opening' && messageCount >= 3) {
      const introIndicators = [
        'let me walk you through', 'i\'ll show you', 'overview of the sections',
        'what would you like to know', 'specific area you\'re interested'
      ];

      if (introIndicators.some(indicator => lowerText.includes(indicator))) {
        setConversationPhase('introduction');
        return;
      }
    }

    if (conversationPhase !== 'active' && messageCount >= 8) {
      setConversationPhase('active');
    }
  };

  // Determine if a message should trigger scrolling based on context
  const shouldTriggerScroll = (lowerText: string): boolean => {
    if (conversationPhase === 'active') {
      return true;
    }

    const discussionIndicators = [
      'tell me about', 'explain', 'how did you', 'what was', 'why did',
      'diving into', 'exploring', 'let\'s look at', 'focusing on',
      'show me', 'walk me through', 'talk about', 'discuss'
    ];

    const hasDiscussionIndicator = discussionIndicators.some(indicator => lowerText.includes(indicator));

    const questionPatterns = ['?', 'how', 'what', 'why', 'when', 'where', 'which', 'who'];
    const sectionKeywords = ['design', 'research', 'technical', 'prototype', 'results', 'implementation', 'strategic', 'leadership', 'business'];

    const hasQuestionWithSection = questionPatterns.some(pattern => lowerText.includes(pattern)) &&
                                   sectionKeywords.some(keyword => lowerText.includes(keyword));

    const futureIndicators = [
      'will discuss', 'we\'ll explore', 'later', 'next', 'upcoming',
      'available sections', 'you can ask', 'feel free to', 'sections include',
      'covers', 'includes', 'features'
    ];

    const hasFutureIndicator = futureIndicators.some(indicator => lowerText.includes(indicator));

    return (hasDiscussionIndicator || hasQuestionWithSection) && !hasFutureIndicator;
  };

  // Initialize UHG Vapi when play button is clicked
  const handleVapiStart = async () => {
    try {
      setVapiStatus('connecting');
      setConversationPhase('opening');
      setMessageCount(0);

      if (conversationTimeoutRef.current) {
        clearTimeout(conversationTimeoutRef.current);
      }

      conversationTimeoutRef.current = setTimeout(() => {
        setConversationPhase('active');
      }, 30000);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        console.error('Microphone permission denied:', error);
        alert('Microphone access is required. Please allow microphone access and try again.');
        setVapiStatus('error');
        return;
      }

      console.log('🚀 Starting UHG voice conversation...');

      const result = await startUHGVapiCall(eventHandlers);

      if (result.success) {
        console.log('✅ UHG Vapi call started successfully');
      } else {
        throw new Error(result.error || 'Failed to start call');
      }
    } catch (error) {
      console.error('Failed to start UHG Vapi call:', error);
      setVapiStatus('error');
      setIsVapiActive(false);
      alert('Voice assistant is currently unavailable. Please try again later.');
    }
  };

  const handleVapiStop = async () => {
    try {
      console.log('🛑 Stopping UHG Vapi call...');
      await stopUHGVapiCall();
      setVapiStatus('idle');
      setIsVapiActive(false);
    } catch (error) {
      console.error('Error stopping UHG Vapi call:', error);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Image */}
      <div className="w-full relative">
        <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
          <Image
            src="/images/casestudy/uhg/uhg-hospital-bank.png"
            alt="Optum Bank HSA Reimbursement Platform"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        </div>
      </div>

      {/* Introduction Section */}
      <div
        ref={introSectionRef}
        className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-b border-blue-200/60"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
          <div className="mb-12 text-center">
            <CaseStudyHeader level="h1" className="mb-6">
              Optum Bank: HSA Reimbursement Platform Redesign
            </CaseStudyHeader>

            {/* Voice Control Bar */}
            <div className="w-full max-w-2xl mx-auto mb-6">
              <VoiceControlBar
                isVapiActive={isVapiActive}
                vapiStatus={vapiStatus}
                handleVapiStart={handleVapiStart}
                handleVapiStop={handleVapiStop}
              />
            </div>

            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Redesigned a struggling reimbursement feature, improving task completion from 1.1% to 30% and reducing support costs by 30% for 450K users. Strategic transformation with strong business impact.
            </p>
          </div>
        </div>
      </div>

      {/* Tabbed Content System */}
      <CaseStudyTabs />

      {/* Footer */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <CaseStudyFooter />
      </div>

      {/* Floating Voice Bar */}
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out z-50 max-w-xl w-[90%] md:w-auto ${
          showFloatingVoiceBar
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl shadow-2xl">
          <VoiceControlBar
            isVapiActive={isVapiActive}
            vapiStatus={vapiStatus}
            handleVapiStart={handleVapiStart}
            handleVapiStop={handleVapiStop}
            className="backdrop-blur-md bg-white/95 shadow-none border-none"
          />
        </div>
      </div>

      <ScrollToTopButton targetId="overview" />
    </div>
  );
}
