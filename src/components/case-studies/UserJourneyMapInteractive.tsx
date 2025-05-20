import { motion, useReducedMotion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// Placeholder data for journey steps
const steps = [
  {
    title: 'Upload School Data',
    role: { name: 'School Manager', icon: '🏫' },
    action: 'Upload school and class data to start the scheduling process.',
    emotion: { emoji: '😐', label: 'Neutral' },
    painPoint: 'Manual data entry was slow and error-prone.',
    opportunity: 'CSV upload and validation.',
    quote: '"It took hours to enter all the school info by hand."',
  },
  {
    title: 'Set Constraints',
    role: { name: 'Academic Director', icon: '🎓' },
    action: 'Define scheduling rules and constraints for the program.',
    emotion: { emoji: '🤔', label: 'Thoughtful' },
    painPoint: 'Hard to visualize all constraints.',
    opportunity: 'Visual constraint builder.',
    quote: '"I wish I could see all the rules at a glance."',
  },
  {
    title: 'Review Conflicts',
    role: { name: 'Production Staff', icon: '🔧' },
    action: 'Review detected scheduling conflicts and warnings.',
    emotion: { emoji: '😟', label: 'Anxious' },
    painPoint: 'Overwhelming error messages.',
    opportunity: 'Guided conflict resolution.',
    quote: '"I wasn\'t sure which issues to fix first."',
  },
  {
    title: 'Resolve Issues',
    role: { name: 'Production Staff', icon: '🔧' },
    action: 'Manually or automatically resolve scheduling issues.',
    emotion: { emoji: '😖', label: 'Frustrated' },
    painPoint: 'Tedious manual adjustments.',
    opportunity: 'Bulk editing and smart suggestions.',
    quote: '"Making changes one by one was exhausting."',
  },
  {
    title: 'Publish Schedule',
    role: { name: 'School Manager', icon: '🏫' },
    action: 'Publish the final, conflict-free schedule for all stakeholders.',
    emotion: { emoji: '😊', label: 'Relieved' },
    painPoint: '',
    opportunity: 'Success confirmation and summary.',
    quote: '"It felt great to finally see a green check!"',
  },
];

const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds

export default function UserJourneyMapInteractive() {
  const [selectedStep, setSelectedStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2 });
  const hasInteracted = useRef(false); // Track if user has interacted

  // Combine refs for the main div
  const containerRef = (node: HTMLDivElement) => {
    inViewRef(node);
  };

  // Auto-scroll logic (remains disabled on mount)
  useEffect(() => {
    if (shouldReduceMotion || isPaused || !inView) return;
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    if (isPaused) return;
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [selectedStep, isPaused, shouldReduceMotion, inView]);

  // Scroll to selected card ONLY if user has interacted
  useEffect(() => {
    if (hasInteracted.current) {
      cardRefs.current[selectedStep]?.scrollIntoView({
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedStep, shouldReduceMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        hasInteracted.current = true;
        setSelectedStep(s => Math.min(s + 1, steps.length - 1));
        resetAutoScroll();
      }
      if (e.key === 'ArrowLeft') {
        hasInteracted.current = true;
        setSelectedStep(s => Math.max(s - 1, 0));
        resetAutoScroll();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset auto-scroll on user interaction
  const resetAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    setIsPaused(false);
  };

  // Pause auto-scroll on hover/focus
  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  // Mark as interacted on click, mouse enter, or focus
  const handleUserInteraction = () => {
    hasInteracted.current = true;
  };

  return (
    <div
      className="relative w-full"
      ref={containerRef}
      onMouseEnter={() => {
        handlePause();
        handleUserInteraction();
      }}
      onMouseLeave={handleResume}
      onFocus={() => {
        handlePause();
        handleUserInteraction();
      }}
      onBlur={handleResume}
    >
      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-20 disabled:opacity-30"
        onClick={() => {
          hasInteracted.current = true;
          setSelectedStep(Math.max(selectedStep - 1, 0));
          resetAutoScroll();
        }}
        disabled={selectedStep === 0}
        aria-label="Previous step"
      >
        <span className="text-2xl">&#8592;</span>
      </button>
      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-20 disabled:opacity-30"
        onClick={() => {
          hasInteracted.current = true;
          setSelectedStep(Math.min(selectedStep + 1, steps.length - 1));
          resetAutoScroll();
        }}
        disabled={selectedStep === steps.length - 1}
        aria-label="Next step"
      >
        <span className="text-2xl">&#8594;</span>
      </button>
      {/* Scrollable Cards */}
      <div
        className="flex overflow-x-auto gap-6 py-4 px-8 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        aria-label="User journey steps"
        onMouseEnter={() => {
          handlePause();
          handleUserInteraction();
        }}
        onMouseLeave={handleResume}
        onFocus={() => {
          handlePause();
          handleUserInteraction();
        }}
        onBlur={handleResume}
      >
        {/* Hide scrollbar for all browsers */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            ref={el => (cardRefs.current[idx] = el)}
            className={`min-w-[340px] max-w-sm bg-white rounded-2xl shadow-lg p-8 flex-shrink-0 cursor-pointer transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400 flex flex-col justify-between h-[370px] md:h-[400px]
              ${selectedStep === idx ? 'ring-2 ring-gray-200 scale-105 z-10' : 'opacity-80'}
            `}
            style={{ scrollSnapAlign: 'center' }}
            onClick={() => {
              hasInteracted.current = true;
              setSelectedStep(idx);
              resetAutoScroll();
            }}
            whileHover={!shouldReduceMotion ? { scale: 1.07 } : {}}
            animate={selectedStep === idx ? { scale: 1.05 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            aria-selected={selectedStep === idx}
          >
            {/* Step Number & Title */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl transition-all ${selectedStep === idx ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'}`}
              >
                {idx + 1}
              </span>
              <span className="font-bold text-gray-900 text-lg md:text-xl leading-tight flex-1">{step.title}</span>
            </div>
            {/* Role & Emotion Row */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 bg-gray-50 rounded px-3 py-1">
                <span className="text-lg">{step.role.icon}</span>
                <span className="text-gray-700 font-medium text-sm">{step.role.name}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 rounded px-3 py-1">
                <span className="text-lg">{step.emotion.emoji}</span>
                <span className="text-blue-700 font-medium text-sm">{step.emotion.label}</span>
              </div>
            </div>
            {/* Main Content */}
            {selectedStep === idx && (
              <div className="flex flex-col gap-2 mt-2">
                <div className="text-gray-800 font-semibold text-base">Action</div>
                <div className="text-gray-700 text-sm mb-1">{step.action}</div>
                {step.painPoint && (
                  <div className="text-red-700 font-semibold text-sm flex items-center gap-1">
                    ⚠️ <span className="font-normal text-red-600">{step.painPoint}</span>
                  </div>
                )}
                {step.opportunity && (
                  <div className="text-green-700 font-semibold text-sm flex items-center gap-1">
                    💡 <span className="font-normal text-green-600">{step.opportunity}</span>
                  </div>
                )}
                {step.quote && (
                  <blockquote className="mt-2 italic text-blue-900 border-l-4 border-blue-400 pl-3 text-sm">
                    {step.quote}
                  </blockquote>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {/* Progress Bar */}
      <div className="w-full flex justify-center mt-2">
        <div className="flex gap-2">
          {steps.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedStep === idx ? 'bg-blue-500 scale-110' : 'bg-blue-200'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
