'use client';

import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import Image from 'next/image';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { CaseStudyTabs } from './components/CaseStudyTabs';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';

// Voice Control Bar Component (simplified)
interface VoiceControlBarProps {
  className?: string;
}

const VoiceControlBar: React.FC<VoiceControlBarProps> = ({
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

          {/* Play button */}
          <button
            disabled
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 bg-gray-100 text-gray-600"
            aria-label="Voice assistant"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Center: Progress bar */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="relative w-full bg-gray-200 rounded-full h-1">
            <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 w-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Image */}
      <div className="w-full relative">
        <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
          <Image
            src="/images/casestudy/lessonloom/lessonloomboard.png"
            alt="LessonLoom: Automated Lesson Generation Platform"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-b border-blue-200/60">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
          <div className="mb-12 text-center">
            <CaseStudyHeader level="h1" className="mb-6">
              LessonLoom: Automated Lesson Generation Platform
            </CaseStudyHeader>

            {/* Voice Control Bar */}
            <div className="w-full max-w-2xl mx-auto mb-6">
              <VoiceControlBar />
            </div>

            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Designed an AI-powered lesson generation platform that reduced educator drafting time by ~50% and helped scale curriculum delivery across NewGlobe's network. Focused on educator agency and transparent AI decision-making.
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

      <ScrollToTopButton />
    </div>
  );
}
