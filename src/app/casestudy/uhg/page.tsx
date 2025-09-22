'use client';

import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import Image from 'next/image';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import ProgressBar from '@/components/ui/ProgressBar';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { MdHealthAndSafety, MdManageSearch, MdDesignServices, MdIntegrationInstructions, MdAssessment } from 'react-icons/md';
import {
  startUHGVapiCall,
  stopUHGVapiCall,
  cleanupUHGVapi,
  sendFunctionResult
} from '@/services/uhgVapiService';
import * as scrollHandlers from '@/utils/vapiScrollHandlers';
import { ProjectOverviewSection } from './sections/ProjectOverviewSection';

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

import { ResearchDiscoverySection } from './sections/ResearchDiscoverySection';
import { DesignStrategySection } from './sections/DesignStrategySection';
import { TechnicalImplementationSection } from './sections/TechnicalImplementationSection';
import { ResultsImpactSection } from './sections/ResultsImpactSection';

// Material Design icons with accessible grey styling for sticky navigation
const OverviewIcon = (
  <MdHealthAndSafety
    size={28}
    className="inline-block align-middle text-gray-600"
  />
);

const ResearchIcon = (
  <MdManageSearch
    size={28}
    className="inline-block align-middle text-gray-600"
  />
);

const DesignIcon = (
  <MdDesignServices
    size={28}
    className="inline-block align-middle text-gray-600"
  />
);

const TechnicalIcon = (
  <MdIntegrationInstructions
    size={28}
    className="inline-block align-middle text-gray-600"
  />
);

const ResultsIcon = (
  <MdAssessment
    size={28}
    className="inline-block align-middle text-gray-600"
  />
);

export default function UHGCaseStudyPage() {
  // Scroll progress state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sticky section title logic
  const [currentSection, setCurrentSection] = useState<
    'overview' | 'research' | 'design' | 'technical' | 'results'
  >('overview');

  // UHG Vapi assistant state
  const [isVapiActive, setIsVapiActive] = useState(false);
  const [vapiStatus, setVapiStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle');
  const [isOpeningStatement, setIsOpeningStatement] = useState(true);
  const [showFloatingVoiceBar, setShowFloatingVoiceBar] = useState(false);
  const openingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const introSectionRef = useRef<HTMLDivElement>(null);

  const overviewRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Check if we should show floating voice bar
      if (introSectionRef.current) {
        const introRect = introSectionRef.current.getBoundingClientRect();
        const introBottom = introRect.bottom;
        // Show floating bar when intro section is scrolled past (with 100px offset)
        setShowFloatingVoiceBar(introBottom < -100);
      }

      // Update current section
      const researchTop = researchRef.current?.getBoundingClientRect().top ?? 0;
      const designTop = designRef.current?.getBoundingClientRect().top ?? 0;
      const technicalTop = technicalRef.current?.getBoundingClientRect().top ?? 0;
      const resultsTop = resultsRef.current?.getBoundingClientRect().top ?? 0;

      if (resultsTop <= 150) {
        setCurrentSection('results');
      } else if (technicalTop <= 150) {
        setCurrentSection('technical');
      } else if (designTop <= 150) {
        setCurrentSection('design');
      } else if (researchTop <= 150) {
        setCurrentSection('research');
      } else {
        setCurrentSection('overview');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Store event handlers for reuse
  const eventHandlers = {
    onCallStart: () => {
      console.log('🎤 UHG Vapi call started - assistant should speak opening statement');
      setVapiStatus('active');
      setIsVapiActive(true);
    },
    onCallEnd: () => {
      console.log('📞 UHG Vapi call ended');
      setVapiStatus('idle');
      setIsVapiActive(false);

      // Clear opening statement timeout on call end
      if (openingTimeoutRef.current) {
        clearTimeout(openingTimeoutRef.current);
        openingTimeoutRef.current = null;
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
      console.log('💬 UHG Vapi message received:', JSON.stringify(message, null, 2));

      // Handle user transcripts
      if (message.type === 'transcript' && message.transcript) {
        console.log('👤 User said:', message.transcript);
        handleKeywordBasedScroll(message.transcript);
      }

      // Handle assistant responses
      if (message.type === 'function-call-result' || message.role === 'assistant') {
        const content = message.content || message.text;
        if (content) {
          console.log('🤖 Assistant said:', content);
          handleKeywordBasedScroll(content);
        }
      }

      // Try to extract any text from the message for keyword detection
      const messageText = message.transcript || message.content || message.text || '';
      if (messageText) {
        console.log('📝 Processing message text for keywords:', messageText);
        handleKeywordBasedScroll(messageText);
      }
    },
    onFunctionCall: (functionCall: any) => {
      console.log('🔧 Function call received:', functionCall);
      handleScrollFunction(functionCall);
    }
  };

  // Initialize on mount
  useEffect(() => {
    console.log('🔧 Setting up UHG Vapi event handlers...');

    // Add a manual test for scrolling
    (window as any).testScroll = (section: string) => {
      console.log('🧪 Manual scroll test to:', section);
      scrollHandlers.scrollToSection(section);
    };

    console.log('✅ UHG page loaded. Test scrolling with: window.testScroll("research")');

    // Cleanup on unmount
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

      // Send result back to Vapi
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

  // Fallback: Handle keyword-based scrolling when function calls aren't working
  const handleKeywordBasedScroll = (text: string) => {
    if (!text) return;

    const lowerText = text.toLowerCase();
    console.log('🔍 Checking keywords in:', lowerText);

    // Skip scrolling during opening statement
    if (isOpeningStatement) {
      console.log('📢 Opening statement mode active, checking message:', lowerText);

      // Check if this looks like an opening statement (contains greeting/intro words)
      const openingPhrases = [
        'hello', 'hi', 'welcome', 'hey there', 'good morning', 'good afternoon', 'good evening',
        'i\'m imran', 'my name', 'this is imran', 'imran mohammed', 'imran here',
        'walkthrough', 'case study introduction', 'introduce', 'introduction',
        'would you like', 'do you want', 'interested in', 'tell me about',
        'full walkthrough', 'specific info', 'specific information',
        'ask me', 'feel free', 'happy to', 'glad to'
      ];

      const isActuallyOpening = openingPhrases.some(phrase => lowerText.includes(phrase));
      console.log('📋 Opening phrases found:', isActuallyOpening);

      if (isActuallyOpening) {
        console.log('✋ Confirmed opening statement - skipping scroll');
        return; // Skip scrolling for opening statement
      } else {
        // This is not the opening statement anymore, enable scrolling for future messages
        console.log('🔄 Not opening statement anymore - enabling scroll for future messages');
        setIsOpeningStatement(false);

        // Clear the timeout since we've detected the end of opening statement
        if (openingTimeoutRef.current) {
          clearTimeout(openingTimeoutRef.current);
          openingTimeoutRef.current = null;
        }
      }
    }

    // Define keyword mappings to sections
    const keywordMappings = {
      'research': ['research', 'discovery', 'insights', 'user types', 'mental model', 'data analysis', 'stakeholder'],
      'design': ['design', 'solution', 'approach', 'strategy', 'ocr', 'workflow', 'progressive', 'compliance'],
      'technical': ['technical', 'technology', 'tech stack', 'implementation', 'react native', 'node.js', 'aws', 'postgresql'],
      'results': ['results', 'impact', 'metrics', 'completion', 'abandonment', 'improvement', 'success', 'outcome'],
      'overview': ['problem', 'challenge', 'business', 'platform', 'context', 'constraint']
    };

    // Check which section keywords appear in the text
    for (const [section, keywords] of Object.entries(keywordMappings)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        console.log(`🎯 Detected ${section} keywords, scrolling to section`);
        scrollHandlers.scrollToSection(section);
        break; // Only scroll to the first matching section
      }
    }
  };

  // Initialize UHG Vapi when play button is clicked
  const handleVapiStart = async () => {
    try {
      setVapiStatus('connecting');
      setIsOpeningStatement(true); // Reset for new conversation

      // Clear any existing timeout
      if (openingTimeoutRef.current) {
        clearTimeout(openingTimeoutRef.current);
      }

      // Set timeout to disable opening statement mode after 15 seconds
      openingTimeoutRef.current = setTimeout(() => {
        console.log('⏰ Opening statement timeout - enabling scroll for all messages');
        setIsOpeningStatement(false);
      }, 15000); // 15 seconds

      // Check microphone permission first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone permission granted');
        stream.getTracks().forEach(track => track.stop()); // Stop the test stream
      } catch (error) {
        console.error('Microphone permission denied:', error);
        alert('Microphone access is required for the voice assistant. Please allow microphone access and try again.');
        setVapiStatus('error');
        return;
      }

      console.log('🚀 Starting UHG case study voice conversation...');

      const result = await startUHGVapiCall(eventHandlers);

      if (result.success) {
        console.log('✅ UHG Vapi call started successfully');
        // State will be updated by onCallStart event handler
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
      <ProgressBar progress={scrollProgress} />

      {/* Header section */}
      <header className="bg-white py-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          {/* Navigation can be added here if needed */}
        </div>
      </header>

      {/* Hero image */}
      <div>
        <div className="w-full relative">
          <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
            <Image
              src="/images/casestudy/uhg/uhg-hospital-bank.png"
              alt="UnitedHealth Group: HSA Reimbursement Redesign"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        {/* Introduction Section */}
        <div
          ref={introSectionRef}
          className="bg-gradient-to-r from-blue-50 via-white to-purple-50 p-8 mb-16 rounded-xl flex flex-col items-center justify-center text-center border border-blue-200/60 shadow-sm"
        >
          <CaseStudyHeader level="h1" className="text-center mb-4">
            Optum Bank: HSA Reimbursement Redesign
          </CaseStudyHeader>

          {/* Voice Control Bar */}
          <div className="w-full max-w-4xl mx-auto mb-6">
            <VoiceControlBar
              isVapiActive={isVapiActive}
              vapiStatus={vapiStatus}
              handleVapiStart={handleVapiStart}
              handleVapiStop={handleVapiStop}
            />
          </div>

          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Transformed a 98.9% abandonment rate into a streamlined experience for 450,000 users.
          </p>
        </div>

        {/* Main content sections with sticky navigation */}
        <section className="relative flex flex-row items-start gap-0 mb-20 min-h-[500px]">
          {/* Sticky Title */}
          <div className="sticky left-0 top-24 h-fit min-w-[300px] w-[300px] max-w-md flex flex-col justify-start items-start pr-4 py-8 bg-gradient-to-b from-white/90 to-white/60 z-10">
            <AnimatePresence mode="wait">
              <CaseStudyHeader
                level="h2"
                showGradientLine
                className="flex items-center gap-3 mb-4"
                key={currentSection}
              >
                {currentSection === 'overview' && (
                  <>
                    {OverviewIcon}
                    <span>Project Overview</span>
                  </>
                )}
                {currentSection === 'research' && (
                  <>
                    {ResearchIcon}
                    <span>Research & Discovery</span>
                  </>
                )}
                {currentSection === 'design' && (
                  <>
                    {DesignIcon}
                    <span>Design Strategy</span>
                  </>
                )}
                {currentSection === 'technical' && (
                  <>
                    {TechnicalIcon}
                    <span>Technical Implementation</span>
                  </>
                )}
                {currentSection === 'results' && (
                  <>
                    {ResultsIcon}
                    <span>Results & Impact</span>
                  </>
                )}
              </CaseStudyHeader>
            </AnimatePresence>
          </div>

          {/* Content sections */}
          <div className="flex-1 pl-0 pr-4">
            <div className="flex flex-col gap-8 max-w-5xl">
              <div ref={overviewRef} id="overview">
                <ProjectOverviewSection />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-70" />

              <div ref={researchRef} id="research">
                <ResearchDiscoverySection />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-70" />

              <div ref={designRef} id="design">
                <DesignStrategySection />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-70" />

              <div ref={technicalRef} id="technical">
                <TechnicalImplementationSection />
              </div>

              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-70" />

              <div ref={resultsRef} id="results">
                <ResultsImpactSection />
              </div>
            </div>
          </div>
        </section>

        <CaseStudyFooter />
      </main>

      {/* Floating Voice Bar */}
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out z-50 max-w-xl w-[90%] md:w-auto ${
          showFloatingVoiceBar
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Gradient border wrapper */}
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