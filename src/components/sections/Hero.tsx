'use client';

import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';

import { useChatToggle } from '../../context/ChatToggleProvider';
import ChatTransition from '../ui/chat/ChatTransition';
import ModeToggle, { Mode } from '../ui/ModeToggle';
import VoiceBot from '../VoiceBot';
import HeroButtons from './hero/HeroButtons';
import HeroChatSection from './hero/HeroChatSection';
import HeroContactInfo from './hero/HeroContactInfo';
import HeroHeading from './hero/HeroHeading';

// Function to manually unlock scrolling
export const unlockScrolling = () => {
  if (typeof document !== 'undefined') {
    // More aggressive approach to unlock scrolling
    // Get the stored position
    const scrollY = document.body.style.top ? parseInt(document.body.style.top || '0', 10) * -1 : 0;

    // Remove lock from both document and body with multiple approaches
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.documentElement.style.position = '';
    document.documentElement.style.top = '';
    document.documentElement.style.height = '';

    // Reset header z-index
    const header = document.querySelector('header');
    if (header) {
      header.setAttribute('style', '');
    }

    // Restore scroll with both methods
    window.scrollTo(0, scrollY);

    console.log('Manual unlock completed');
  }
};

interface HeroProps {
  opacity?: any;
}

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMode, setCurrentMode] = useState<Mode>('portfolio');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isChatOpen, toggleChat } = useChatToggle();

  // Animation enter effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle mode changes
  const handleModeChange = (mode: Mode) => {
    setCurrentMode(mode);
    if (mode === 'chat' && !isChatOpen) {
      setIsTransitioning(true);
    } else if (mode !== 'chat' && isChatOpen) {
      toggleChat();
    }
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    toggleChat();
  };

  // Apply scroll locking directly to body and html
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isChatOpen || currentMode === 'voice') {
        // Store current scroll position
        document.body.style.top = `-${window.scrollY}px`;
        // Apply lock
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        // Make header higher z-index to ensure it's clickable
        const header = document.querySelector('header');
        if (header) {
          header.setAttribute('style', 'z-index: 1000;');
        }
      } else {
        // Get the stored position
        const scrollY = document.body.style.top ? parseInt(document.body.style.top || '0', 10) * -1 : 0;

        // Remove lock
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // Reset header z-index
        const header = document.querySelector('header');
        if (header) {
          header.setAttribute('style', '');
        }

        // Restore scroll
        window.scrollTo(0, scrollY);
      }
    }
  }, [isChatOpen, currentMode]);

  // Text options for the animated heading
  const aiTextOptions = ['AI-enhanced', 'brilliantly-biased', 'beautifully-balanced', 'future-fluent'];

  return (
    <section
      className="pt-6 xs:pt-8 sm:pt-12 pb-4 xs:pb-6 sm:pb-8 md:pb-12 overflow-hidden relative bg-background flex items-center justify-center min-h-[80vh]"
      style={{ position: 'relative', overflowX: 'hidden' }}
    >
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Always show the hero content */}
          <div className="flex flex-col items-center text-center">
            {/* Hide avatar and greeting in voice mode */}
            {!isChatOpen && currentMode !== 'voice' && (
              <div className="flex items-center justify-center gap-3 mb-3 xs:mb-4 md:mb-6">
                <div className="relative w-10 h-7 xs:w-12 xs:h-8 md:w-14 md:h-9 overflow-hidden rounded-full border border-black/40 shadow-md">
                  <Image
                    src="/images/profile/avatar.jpg"
                    alt="Imran Mohammed"
                    fill
                    sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="flex flex-col items-center">
                  <span
                    className={`text-base xs:text-lg font-medium transition-all duration-700 ease-out ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    Hi, I'm Imran 👋
                  </span>
                </div>
              </div>
            )}

            {/* Animation container with fixed height to prevent layout shifts */}
            <div
              className={`relative ${
                isChatOpen || currentMode === 'voice'
                  ? 'h-[350px] xs:h-[380px] md:h-[450px]'
                  : 'h-[300px] xs:h-[320px] md:h-[300px]'
              } w-full overflow-hidden transition-all duration-300 flex items-center justify-center`}
            >
              <AnimatePresence mode="wait">
                {isTransitioning ? (
                  <ChatTransition onComplete={handleTransitionComplete} />
                ) : currentMode === 'chat' && isChatOpen ? (
                  <HeroChatSection closeChat={toggleChat} />
                ) : currentMode === 'voice' ? (
                  <VoiceBot isActive={true} closeVoice={() => setCurrentMode('portfolio')} />
                ) : (
                  <HeroHeading isVisible={isVisible} aiTextOptions={aiTextOptions} />
                )}
              </AnimatePresence>
            </div>

            {/* Mode Toggle */}
            <div className="mt-8 flex justify-center">
              <ModeToggle currentMode={currentMode} onModeChange={handleModeChange} isVisible={isVisible} />
            </div>

            {/* Original buttons - temporarily hidden but kept for future use
            {!isChatOpen && (
              <HeroButtons isVisible={isVisible} isChatOpen={isChatOpen} onChatToggle={toggleChat} />
            )} */}
          </div>

          {/* Contact info */}
          <HeroContactInfo isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
