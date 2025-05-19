'use client';

import React from 'react';

import { useChatToggle } from '../../../context/ChatToggleProvider';
import Button from '../../ui/Button';
import { unlockScrolling } from '../Hero';

interface HeroButtonsProps {
  isVisible: boolean;
  isChatOpen: boolean;
  onChatToggle: (e?: React.MouseEvent) => void;
}

const HeroButtons = ({ isVisible, isChatOpen, onChatToggle }: HeroButtonsProps) => {
  // Get the toggleChat function directly from the context as a backup
  const { toggleChat } = useChatToggle();

  // Handler for the chat button click
  const handleChatToggle = (e: React.MouseEvent) => {
    // Most direct approach: prevent the event entirely
    e.preventDefault();
    e.stopPropagation();

    console.log('Chat button clicked!', { isChatOpen });

    // Call the passed toggle function first, and if that fails, use the direct context function
    try {
      console.log('Trying onChatToggle from props');
      onChatToggle(e);
      console.log('onChatToggle from props called successfully');
    } catch (error) {
      console.error('Error using onChatToggle, falling back to direct context toggle', error);
      console.log('Using direct toggleChat from context');
      toggleChat();
      console.log('toggleChat from context called successfully');
    }
  };

  // Custom handler for the Work button when chat is open
  const handleWorkButtonClick = (e: React.MouseEvent) => {
    // First, prevent the default action in all cases
    e.preventDefault();
    console.log('Work button clicked');

    const scrollToWorkSection = () => {
      console.log('Executing scroll to work');

      // Try multiple ways to find the work section
      const workSection = document.getElementById('work');

      if (workSection) {
        console.log('Work section found by ID');

        try {
          // 1. Try direct scrollTo with calculation for header offset
          const headerHeight = 80; // Approximate header height
          const rect = workSection.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - headerHeight;

          console.log(`Scrolling to position: ${targetPosition}`);

          // Use instant behavior for reliability
          window.scrollTo({
            top: targetPosition,
            behavior: 'auto',
          });

          console.log('Direct scrollTo applied');

          // 2. Fallback to alternative method after a short delay
          setTimeout(() => {
            // Check if we're still not at the right position
            const currentPos = window.pageYOffset || document.documentElement.scrollTop;
            const expectedPos = targetPosition - 50; // Allow some margin

            if (Math.abs(currentPos - expectedPos) > 100) {
              console.log('First scroll attempt may have failed, trying alternative');

              // Try an alternative approach - direct JS scroll
              window.scroll(0, targetPosition);
              console.log('Alternative scroll applied');

              // Final fallback - try scrollIntoView
              setTimeout(() => {
                workSection.scrollIntoView({ block: 'start' });
                console.log('scrollIntoView applied as final fallback');
              }, 100);
            }
          }, 300);
        } catch (err) {
          console.error('Error during scroll:', err);
          // Ultimate fallback - use location hash
          window.location.hash = '';
          setTimeout(() => {
            window.location.hash = 'work';
          }, 50);
        }
      } else {
        console.error('Work section not found, using location hash directly');
        // If element not found, try changing the hash directly
        window.location.hash = '';
        setTimeout(() => {
          window.location.hash = 'work';
        }, 50);
      }
    };

    if (isChatOpen) {
      console.log('Chat is open, closing first');

      // Close the chat first
      onChatToggle();

      // Immediately unlock scrolling
      unlockScrolling();

      // Execute scroll after a short delay
      setTimeout(scrollToWorkSection, 200);
    } else {
      // Execute scroll immediately if chat is closed
      scrollToWorkSection();
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 sm:gap-4 w-full mt-6 sm:mt-8 mb-8 sm:mb-12 relative z-30 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Primary button - gradient, bold, shadow */}
      <Button
        variant="primary"
        className="flex-1 min-w-[180px] text-base sm:text-sm py-3 sm:py-2.5 px-5 sm:px-5 rounded-xl shadow-lg font-semibold group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2"
        onClick={isChatOpen ? undefined : handleWorkButtonClick}
        disabled={isChatOpen}
        aria-label="View My Work"
      >
        <span className="flex items-center gap-2">
          View My Work
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </Button>

      {/* Secondary button - white, border, shadow */}
      <Button
        variant="outline"
        className="flex-1 min-w-[180px] text-base sm:text-sm py-3 sm:py-2.5 px-5 sm:px-5 rounded-xl shadow-md font-semibold group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2"
        onClick={handleChatToggle}
        aria-label={isChatOpen ? 'Close Chat' : 'Chat with my AI'}
      >
        <span className="flex items-center gap-2">
          {isChatOpen ? 'Close Chat' : 'Chat with my AI'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-all duration-300 ${isChatOpen ? '' : 'group-hover:scale-110 group-hover:rotate-45'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isChatOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            )}
          </svg>
        </span>
      </Button>
    </div>
  );
};

export default HeroButtons;
