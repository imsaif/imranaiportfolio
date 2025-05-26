import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import { useChatToggle } from '../../../context/ChatToggleProvider';
import ModeToggle, { Mode } from '../../ui/ModeToggle';
import HeroButtons from './HeroButtons';
import HeroChatSection from './HeroChatSection';
import HeroContactInfo from './HeroContactInfo';
import HeroHeading from './HeroHeading';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMode, setCurrentMode] = useState<Mode>('portfolio');
  const { isChatOpen, toggleChat } = useChatToggle();

  // Animation enter effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle mode changes
  const handleModeChange = (mode: Mode) => {
    setCurrentMode(mode);
    if (mode === 'chat' && !isChatOpen) {
      toggleChat();
    } else if (mode !== 'chat' && isChatOpen) {
      toggleChat();
    }
  };

  // Text options for the animated heading
  const aiTextOptions = ['AI-enhanced', 'brilliantly-biased', 'beautifully-balanced', 'future-fluent'];

  return (
    <section
      className="pt-10 xs:pt-12 sm:pt-12 pb-8 xs:pb-10 sm:pb-8 md:pb-12 overflow-hidden relative bg-background"
      style={{ position: 'relative', overflowX: 'hidden' }}
    >
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Always show the hero content */}
          <div>
            {!isChatOpen && (
              <div className="flex items-center gap-5 mb-8 xs:mb-8 md:mb-6">
                <div className="relative w-16 h-12 xs:w-20 xs:h-14 md:w-14 md:h-9 overflow-hidden rounded-full border border-black/40 shadow-md">
                  <Image
                    src="/images/profile/avatar.jpg"
                    alt="Imran Mohammed"
                    fill
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 56px"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="flex flex-col">
                  <span
                    className={`text-xl xs:text-2xl md:text-lg font-medium transition-all duration-700 ease-out ${
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
              className={`relative ${isChatOpen ? 'h-[350px] sm:h-[400px] md:h-[450px]' : 'h-[480px] xs:h-[520px] sm:h-[450px] md:h-[380px]'} w-full overflow-hidden transition-all duration-300`}
            >
              <AnimatePresence mode="wait">
                {!isChatOpen ? (
                  <HeroHeading isVisible={isVisible} aiTextOptions={aiTextOptions} />
                ) : (
                  <HeroChatSection closeChat={toggleChat} />
                )}
              </AnimatePresence>
            </div>

            {/* Mode Toggle */}
            <div className="mt-12 xs:mt-16 md:mt-8 flex justify-center">
              <ModeToggle
                currentMode={currentMode}
                onModeChange={handleModeChange}
                isVisible={isVisible}
                isChatOpen={isChatOpen}
              />
            </div>

            {/* Original buttons - hidden when chat is open */}
            {!isChatOpen && <HeroButtons isVisible={isVisible} isChatOpen={isChatOpen} onChatToggle={toggleChat} />}
          </div>

          {/* Contact info */}
          <HeroContactInfo isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
