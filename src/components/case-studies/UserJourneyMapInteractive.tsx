import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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

// Add icon components at the top of the file
const EditIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block" aria-hidden="true">
    <path
      d="M16.862 5.487l1.65-1.65a2.121 2.121 0 113 3l-1.65 1.65m-2-2l-9.193 9.193a2 2 0 00-.497.88l-1.01 3.366a.5.5 0 00.62.62l3.366-1.01a2 2 0 00.88-.497l9.193-9.193m-2-2l2 2"
      stroke="#111"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const RoleIcons: Record<string, JSX.Element> = {
  'School Manager': (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block" aria-hidden="true">
      <rect x="4" y="10" width="16" height="8" rx="2" stroke="#111" strokeWidth="2" fill="none" />
      <path d="M2 10l10-6 10 6" stroke="#111" strokeWidth="2" fill="none" />
      <rect x="10" y="14" width="4" height="4" stroke="#111" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  'Academic Director': (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block" aria-hidden="true">
      <path d="M12 3L2 9l10 6 10-6-10-6z" stroke="#111" strokeWidth="2" fill="none" />
      <path d="M12 21v-6" stroke="#111" strokeWidth="2" />
      <path d="M7 12v2c0 1.1 2.24 2 5 2s5-.9 5-2v-2" stroke="#111" strokeWidth="2" fill="none" />
    </svg>
  ),
  'Production Staff': EditIcon,
};

const EmotionIcons: Record<string, JSX.Element> = {
  Neutral: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#111" strokeWidth="2" fill="none" />
      <circle cx="9" cy="10" r="1" fill="#111" />
      <circle cx="15" cy="10" r="1" fill="#111" />
      <path d="M9 15h6" stroke="#111" strokeWidth="2" />
    </svg>
  ),
  Thoughtful: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#111" strokeWidth="2" fill="none" />
      <circle cx="9" cy="10" r="1" fill="#111" />
      <circle cx="15" cy="10" r="1" fill="#111" />
      <path d="M9 16c1-1 5-1 6 0" stroke="#111" strokeWidth="2" />
    </svg>
  ),
  Anxious: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#111" strokeWidth="2" fill="none" />
      <circle cx="9" cy="10" r="1" fill="#111" />
      <circle cx="15" cy="10" r="1" fill="#111" />
      <path d="M9 16c1-2 5-2 6 0" stroke="#111" strokeWidth="2" />
    </svg>
  ),
  Frustrated: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#111" strokeWidth="2" fill="none" />
      <circle cx="9" cy="10" r="1" fill="#111" />
      <circle cx="15" cy="10" r="1" fill="#111" />
      <path d="M9 16c2-2 4-2 6 0" stroke="#111" strokeWidth="2" />
    </svg>
  ),
  Relieved: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#111" strokeWidth="2" fill="none" />
      <circle cx="9" cy="10" r="1" fill="#111" />
      <circle cx="15" cy="10" r="1" fill="#111" />
      <path d="M9 15c1 2 5 2 6 0" stroke="#111" strokeWidth="2" />
    </svg>
  ),
};

const PainPointIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block" aria-hidden="true">
    <path d="M12 3L2 21h20L12 3z" stroke="#111" strokeWidth="2" fill="none" />
    <circle cx="12" cy="16" r="1" fill="#111" />
    <path d="M12 8v5" stroke="#111" strokeWidth="2" />
  </svg>
);

const OpportunityIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block" aria-hidden="true">
    <path
      d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      stroke="#111"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="5" stroke="#111" strokeWidth="2" fill="none" />
  </svg>
);

export default function UserJourneyMapInteractive() {
  const shouldReduceMotion = useReducedMotion();
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2 });
  const hasInteracted = useRef(false); // Track if user has interacted

  // Overlay effect setup
  const containerRef = useRef<HTMLDivElement>(null);
  // Height: each card is 340px + gap, so set container height accordingly
  const cardHeight = 340;
  const cardGap = 24;
  const containerHeight = `${steps.length * cardHeight + (steps.length - 1) * cardGap}px`;

  // Combine refs for the main div
  const outerContainerRef = (node: HTMLDivElement) => {
    inViewRef(node);
  };

  // --- FIX: Manually create refs and hooks for each card ---
  const cardRef0 = useRef<HTMLDivElement>(null);
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);
  const cardRef4 = useRef<HTMLDivElement>(null);

  const { scrollYProgress: scrollYProgress0 } = useScroll({
    target: cardRef0,
    container: containerRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: cardRef1,
    container: containerRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: cardRef2,
    container: containerRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: cardRef3,
    container: containerRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: scrollYProgress4 } = useScroll({
    target: cardRef4,
    container: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale0 = useTransform(scrollYProgress0, [0, 0.5, 1], [0.96, 1, 0.96]);
  const scale1 = useTransform(scrollYProgress1, [0, 0.5, 1], [0.96, 1, 0.96]);
  const scale2 = useTransform(scrollYProgress2, [0, 0.5, 1], [0.96, 1, 0.96]);
  const scale3 = useTransform(scrollYProgress3, [0, 0.5, 1], [0.96, 1, 0.96]);
  const scale4 = useTransform(scrollYProgress4, [0, 0.5, 1], [0.96, 1, 0.96]);

  const boxShadow0 = useTransform(
    scrollYProgress0,
    [0, 0.5, 1],
    [
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
      '0 6px 18px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.08)',
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
    ]
  );
  const boxShadow1 = useTransform(
    scrollYProgress1,
    [0, 0.5, 1],
    [
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
      '0 6px 18px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.08)',
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
    ]
  );
  const boxShadow2 = useTransform(
    scrollYProgress2,
    [0, 0.5, 1],
    [
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
      '0 6px 18px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.08)',
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
    ]
  );
  const boxShadow3 = useTransform(
    scrollYProgress3,
    [0, 0.5, 1],
    [
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
      '0 6px 18px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.08)',
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
    ]
  );
  const boxShadow4 = useTransform(
    scrollYProgress4,
    [0, 0.5, 1],
    [
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
      '0 6px 18px rgba(99,102,241,0.10), 0 2px 8px rgba(0,0,0,0.08)',
      '0 2px 8px rgba(99,102,241,0.04), 0 1px 4px rgba(0,0,0,0.04)',
    ]
  );
  // --- END FIX ---

  // Auto-scroll logic (remains disabled on mount)
  useEffect(() => {
    if (shouldReduceMotion || !inView) return;
    return () => {};
  }, [shouldReduceMotion, inView]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        hasInteracted.current = true;
        // Scroll logic would be here if needed
      }
      if (e.key === 'ArrowLeft') {
        hasInteracted.current = true;
        // Scroll logic would be here if needed
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset auto-scroll on user interaction
  const resetAutoScroll = () => {
    // Reset logic would be here if needed
  };

  // Pause auto-scroll on hover/focus
  const handlePause = () => {
    // Pause logic would be here if needed
  };
  const handleResume = () => {
    // Resume logic would be here if needed
  };

  // Mark as interacted on click, mouse enter, or focus
  const handleUserInteraction = () => {
    hasInteracted.current = true;
  };

  return (
    <div className="w-full relative" style={{ height: containerHeight }} ref={outerContainerRef}>
      <div ref={containerRef} className="relative h-full">
        {/* Sticky Heading and Intro */}
        <div className="sticky top-0 z-20 bg-white pb-4">
          <h3 className="text-gray-800 font-bold text-xl mb-2">User Journey Mapping</h3>
          <p className="text-gray-800 mb-0">
            Mapped real user steps, emotions, and pain points to guide design decisions.
          </p>
        </div>
        {/* Card 0 */}
        <motion.div
          ref={cardRef0}
          className="sticky top-24 z-[10] w-full max-w-4xl bg-white rounded-2xl p-10 flex flex-col h-[420px] md:h-[380px] lg:h-[320px] border border-gray-200 transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400"
          style={{ scale: scale0 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0 }}
        >
          {/* Step Number, Title, Role & Emotion Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl bg-blue-100 text-blue-700">
              1
            </span>
            <span className="font-bold text-gray-900 text-base md:text-lg leading-tight flex-1 min-w-[120px]">
              {steps[0].title}
            </span>
            <div className="flex items-center gap-2 bg-gray-50 rounded px-3 py-1">
              {RoleIcons[steps[0].role.name]}
              <span className="text-gray-700 font-medium text-sm">{steps[0].role.name}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded px-3 py-1">
              {EmotionIcons[steps[0].emotion.label]}
              <span className="text-blue-700 font-medium text-sm">{steps[0].emotion.label}</span>
            </div>
          </div>
          {/* Main Content Hierarchy */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Action */}
            <div className="flex flex-row items-baseline gap-2">
              <span className="text-gray-700 font-semibold text-base">Action:</span>
              <span className="text-gray-800 text-base leading-snug">{steps[0].action}</span>
            </div>
            {/* Pain Point */}
            {steps[0].painPoint && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-gray-800 font-semibold text-base">Pain Point:</span>
                <span className="text-gray-800 text-base leading-snug">{steps[0].painPoint}</span>
              </div>
            )}
            {/* Opportunity */}
            {steps[0].opportunity && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-gray-800 font-semibold text-base">Opportunity:</span>
                <span className="text-gray-800 text-base leading-snug">{steps[0].opportunity}</span>
              </div>
            )}
            {/* Quote */}
            {steps[0].quote && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-blue-700 font-semibold text-base flex items-center gap-1">
                  <span className="text-lg">""</span>User Quote:
                </span>
                <span className="italic text-blue-900 text-base leading-snug">{steps[0].quote}</span>
              </div>
            )}
          </div>
        </motion.div>
        {/* Card 1 */}
        <motion.div
          ref={cardRef1}
          className="sticky top-36 z-[11] w-full max-w-4xl bg-white rounded-2xl p-10 flex flex-col h-[420px] md:h-[380px] lg:h-[320px] border border-gray-200 transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400"
          style={{ scale: scale1 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.08 }}
        >
          {/* Step Number, Title, Role & Emotion Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl bg-blue-100 text-blue-700">
              2
            </span>
            <span className="font-bold text-gray-900 text-base md:text-lg leading-tight flex-1 min-w-[120px]">
              {steps[1].title}
            </span>
            <div className="flex items-center gap-2 bg-gray-50 rounded px-3 py-1">
              {RoleIcons[steps[1].role.name]}
              <span className="text-gray-700 font-medium text-sm">{steps[1].role.name}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded px-3 py-1">
              {EmotionIcons[steps[1].emotion.label]}
              <span className="text-blue-700 font-medium text-sm">{steps[1].emotion.label}</span>
            </div>
          </div>
          {/* Main Content Hierarchy */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Action */}
            <div className="flex flex-row items-baseline gap-2">
              <span className="text-gray-700 font-semibold text-base">Action:</span>
              <span className="text-gray-800 text-base leading-snug">{steps[1].action}</span>
            </div>
            {/* Pain Point */}
            {steps[1].painPoint && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-gray-800 font-semibold text-base">Pain Point:</span>
                <span className="text-gray-800 text-base leading-snug">{steps[1].painPoint}</span>
              </div>
            )}
            {/* Opportunity */}
            {steps[1].opportunity && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-gray-800 font-semibold text-base">Opportunity:</span>
                <span className="text-gray-800 text-base leading-snug">{steps[1].opportunity}</span>
              </div>
            )}
            {/* Quote */}
            {steps[1].quote && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-blue-700 font-semibold text-base flex items-center gap-1">
                  <span className="text-lg">""</span>User Quote:
                </span>
                <span className="italic text-blue-900 text-base leading-snug">{steps[1].quote}</span>
              </div>
            )}
          </div>
        </motion.div>
        {/* Card 2 */}
        <motion.div
          ref={cardRef2}
          className="sticky top-48 z-[12] w-full max-w-4xl bg-white rounded-2xl p-10 flex flex-col h-[420px] md:h-[380px] lg:h-[320px] border border-gray-200 transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400"
          style={{ scale: scale2 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.16 }}
        >
          {/* Step Number, Title, Role & Emotion Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl bg-blue-100 text-blue-700">
              3
            </span>
            <span className="font-bold text-gray-900 text-base md:text-lg leading-tight flex-1 min-w-[120px]">
              {steps[2].title}
            </span>
            <div className="flex items-center gap-2 bg-gray-50 rounded px-3 py-1">
              {RoleIcons[steps[2].role.name]}
              <span className="text-gray-700 font-medium text-sm">{steps[2].role.name}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded px-3 py-1">
              {EmotionIcons[steps[2].emotion.label]}
              <span className="text-blue-700 font-medium text-sm">{steps[2].emotion.label}</span>
            </div>
          </div>
          {/* Main Content Hierarchy */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Action */}
            <div className="flex flex-row items-baseline gap-2">
              <span className="text-gray-700 font-semibold text-base">Action:</span>
              <span className="text-gray-800 text-base leading-snug">{steps[2].action}</span>
            </div>
            {/* Pain Point */}
            {steps[2].painPoint && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-gray-800 font-semibold text-base">Pain Point:</span>
                <span className="text-gray-800 text-base leading-snug">{steps[2].painPoint}</span>
              </div>
            )}
            {/* Opportunity */}
            {steps[2].opportunity && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-gray-800 font-semibold text-base">Opportunity:</span>
                <span className="text-gray-800 text-base leading-snug">{steps[2].opportunity}</span>
              </div>
            )}
            {/* Quote */}
            {steps[2].quote && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-blue-700 font-semibold text-base flex items-center gap-1">
                  <span className="text-lg">""</span>User Quote:
                </span>
                <span className="italic text-blue-900 text-base leading-snug">{steps[2].quote}</span>
              </div>
            )}
          </div>
        </motion.div>
        {/* Card 3 */}
        <motion.div
          ref={cardRef3}
          className="sticky top-60 z-[13] w-full max-w-4xl bg-white rounded-2xl p-10 flex flex-col h-[420px] md:h-[380px] lg:h-[320px] border border-gray-200 transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400"
          style={{ scale: scale3 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.24 }}
        >
          {/* Step Number, Title, Role & Emotion Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl bg-blue-100 text-blue-700">
              4
            </span>
            <span className="font-bold text-gray-900 text-base md:text-lg leading-tight flex-1 min-w-[120px]">
              {steps[3].title}
            </span>
            <div className="flex items-center gap-2 bg-gray-50 rounded px-3 py-1">
              {RoleIcons[steps[3].role.name]}
              <span className="text-gray-700 font-medium text-sm">{steps[3].role.name}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded px-3 py-1">
              {EmotionIcons[steps[3].emotion.label]}
              <span className="text-blue-700 font-medium text-sm">{steps[3].emotion.label}</span>
            </div>
          </div>
          {/* Main Content Hierarchy */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Action */}
            <div className="flex flex-row items-baseline gap-2">
              <span className="text-gray-700 font-semibold text-base">Action:</span>
              <span className="text-gray-800 text-base leading-snug">{steps[3].action}</span>
            </div>
            {/* Pain Point */}
            {steps[3].painPoint && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-gray-800 font-semibold text-base">Pain Point:</span>
                <span className="text-gray-800 text-base leading-snug">{steps[3].painPoint}</span>
              </div>
            )}
            {/* Opportunity */}
            {steps[3].opportunity && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-gray-800 font-semibold text-base">Opportunity:</span>
                <span className="text-gray-800 text-base leading-snug">{steps[3].opportunity}</span>
              </div>
            )}
            {/* Quote */}
            {steps[3].quote && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-blue-700 font-semibold text-base flex items-center gap-1">
                  <span className="text-lg">""</span>User Quote:
                </span>
                <span className="italic text-blue-900 text-base leading-snug">{steps[3].quote}</span>
              </div>
            )}
          </div>
        </motion.div>
        {/* Card 4 */}
        <motion.div
          ref={cardRef4}
          className="sticky top-72 z-[14] w-full max-w-4xl bg-white rounded-2xl p-10 flex flex-col h-[420px] md:h-[380px] lg:h-[320px] border border-gray-200 transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-400"
          style={{ scale: scale4 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.32 }}
        >
          {/* Step Number, Title, Role & Emotion Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl bg-blue-100 text-blue-700">
              5
            </span>
            <span className="font-bold text-gray-900 text-base md:text-lg leading-tight flex-1 min-w-[120px]">
              {steps[4].title}
            </span>
            <div className="flex items-center gap-2 bg-gray-50 rounded px-3 py-1">
              {RoleIcons[steps[4].role.name]}
              <span className="text-gray-700 font-medium text-sm">{steps[4].role.name}</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 rounded px-3 py-1">
              {EmotionIcons[steps[4].emotion.label]}
              <span className="text-blue-700 font-medium text-sm">{steps[4].emotion.label}</span>
            </div>
          </div>
          {/* Main Content Hierarchy */}
          <div className="flex flex-col gap-4 mt-2">
            {/* Action */}
            <div className="flex flex-row items-baseline gap-2">
              <span className="text-gray-700 font-semibold text-base">Action:</span>
              <span className="text-gray-800 text-base leading-snug">{steps[4].action}</span>
            </div>
            {/* Pain Point */}
            {steps[4].painPoint && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-gray-800 font-semibold text-base">Pain Point:</span>
                <span className="text-gray-800 text-base leading-snug">{steps[4].painPoint}</span>
              </div>
            )}
            {/* Opportunity */}
            {steps[4].opportunity && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-gray-800 font-semibold text-base">Opportunity:</span>
                <span className="text-gray-800 text-base leading-snug">{steps[4].opportunity}</span>
              </div>
            )}
            {/* Quote */}
            {steps[4].quote && (
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-blue-700 font-semibold text-base flex items-center gap-1">
                  <span className="text-lg">""</span>User Quote:
                </span>
                <span className="italic text-blue-900 text-base leading-snug">{steps[4].quote}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
