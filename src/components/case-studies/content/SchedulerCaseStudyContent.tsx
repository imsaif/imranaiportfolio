'use client';

import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import EnglishTeacherGuide from '@/components/case-studies/EnglishTeacherGuide';
import ScienceTeacherGuide from '@/components/case-studies/ScienceTeacherGuide';
import SocialStudiesTeacherGuide from '@/components/case-studies/SocialStudiesTeacherGuide';
import TabletMockup from '@/components/case-studies/TabletMockup';
import TeacherGuideContent from '@/components/case-studies/TeacherGuideContent';
import TeacherScheduleView from '@/components/case-studies/TeacherScheduleView';
import UserJourneyMapInteractive from '@/components/case-studies/UserJourneyMapInteractive';
import VoiceControlBar from '@/components/case-studies/VoiceControlBar';
import ProgressBar from '@/components/ui/ProgressBar';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { scriptMetrics } from '@/data/caseStudyVoiceScript';
import { caseStudyVoiceService } from '@/services/caseStudyVoiceService';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import InteractivePrototype from '../../../app/casestudy/scheduler/InteractivePrototype';
import { ChallengeSection } from '../../../app/casestudy/scheduler/sections/ChallengeSection';
import { IntroductionSection } from '../../../app/casestudy/scheduler/sections/IntroductionSection';
import { ProjectOverviewSection } from '../../../app/casestudy/scheduler/sections/ProjectOverviewSection';
import UserPersonasSection from '../../../app/casestudy/scheduler/sections/UserPersonasSectionNEW';
import { UserResearchSection } from '../../../app/casestudy/scheduler/sections/UserResearchSection';

interface SchedulerCaseStudyContentProps {
  showProgressBar?: boolean;
  showScrollToTop?: boolean;
}

export const SchedulerCaseStudyContent: React.FC<SchedulerCaseStudyContentProps> = ({
  showProgressBar = true,
  showScrollToTop = true,
}) => {
  // Teacher Guide flow state
  const [currentView, setCurrentView] = useState<'schedule' | 'guide'>('schedule');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');

  // Scroll progress state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Voice control state
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(0);
  const [currentVoiceSection, setCurrentVoiceSection] = useState('');
  const [charactersUsed, setCharactersUsed] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const charactersLimit = scriptMetrics.totalCharacters;

  // Voice control handlers
  const handleVoicePlay = async () => {
    try {
      const state = caseStudyVoiceService.getState();

      if (state.isPaused) {
        await caseStudyVoiceService.resume();
        setIsVoicePlaying(true);
        return;
      }

      setIsVoicePlaying(true);
      setCurrentVoiceSection('Opening');

      await caseStudyVoiceService.playScript({
        onProgress: progress => {
          setVoiceProgress(progress);
        },
        onSectionChange: (_, sectionName) => {
          setCurrentVoiceSection(sectionName);
        },
        onCharacterUsage: charactersUsed => {
          setCharactersUsed(charactersUsed);
        },
        onError: error => {
          console.error('Voice playback error:', error);
          setIsVoicePlaying(false);
          setCurrentVoiceSection('Error: ' + error);
        },
        onComplete: () => {
          setIsVoicePlaying(false);
          setVoiceProgress(100);
          setCurrentVoiceSection('Completed');
        },
      });
    } catch (error) {
      console.error('Failed to start voice playback:', error);
      setIsVoicePlaying(false);
      setCurrentVoiceSection('Failed to start');
    }
  };

  const handleVoicePause = () => {
    const state = caseStudyVoiceService.getState();

    if (state.isPlaying) {
      caseStudyVoiceService.pause();
      setIsVoicePlaying(false);
    } else if (state.isPaused) {
      caseStudyVoiceService.resume();
      setIsVoicePlaying(true);
    } else {
      caseStudyVoiceService.stop();
      setIsVoicePlaying(false);
      setVoiceProgress(0);
      setCurrentVoiceSection('');
      setCharactersUsed(0);
    }
  };

  const handleSeek = (time: number) => {
    caseStudyVoiceService.seekToTime(time);
  };

  // Cleanup voice service on component unmount
  useEffect(() => {
    return () => {
      caseStudyVoiceService.stop();
    };
  }, []);

  // Update timing information while playing
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isVoicePlaying) {
      interval = setInterval(() => {
        const state = caseStudyVoiceService.getState();
        setCurrentTime(state.currentTime);
        setTotalDuration(state.totalDuration);
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isVoicePlaying]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sticky section title logic with Intersection Observer for four sections
  const [currentSection, setCurrentSection] = useState<
    'overview' | 'challenge' | 'userresearch' | 'userpersonas' | 'designprocess'
  >('overview');
  const overviewRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const userResearchRef = useRef<HTMLDivElement>(null);
  const userPersonasRef = useRef<HTMLDivElement>(null);
  const designProcessRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {

      const challengeTop = challengeRef.current?.getBoundingClientRect().top ?? 0;
      const userResearchTop = userResearchRef.current?.getBoundingClientRect().top ?? 0;
      const userPersonasTop = userPersonasRef.current?.getBoundingClientRect().top ?? 0;
      const designProcessTop = designProcessRef.current?.getBoundingClientRect().top ?? 0;
      if (designProcessTop <= 150) {
        setCurrentSection('designprocess');
      } else if (userPersonasTop <= 150) {
        setCurrentSection('userpersonas');
      } else if (userResearchTop <= 150) {
        setCurrentSection('userresearch');
      } else if (challengeTop <= 150) {
        setCurrentSection('challenge');
      } else {
        setCurrentSection('overview');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Edit (pencil) icon for Design Process section title with gradient stroke
  const DesignProcessIcon = (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block align-middle" aria-hidden="true">
      <defs>
        <linearGradient id="designprocess-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path
        d="M16.862 5.487l1.65-1.65a2.121 2.121 0 113 3l-1.65 1.65m-2-2l-9.193 9.193a2 2 0 00-.497.88l-1.01 3.366a.5.5 0 00.62.62l3.366-1.01a2 2 0 00.88-.497l9.193-9.193m-2-2l2 2"
        stroke="url(#designprocess-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  // Lightbulb icon for Lessons Learned section
  const LessonsLearnedIcon = (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block align-middle" aria-hidden="true">
      <defs>
        <linearGradient id="lessons-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A21CAF" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <path
        d="M9 18h6m-3 0v2m-4-2a4 4 0 01-1-2.83V15a7 7 0 1114 0v.17A4 4 0 0116 18H8z"
        stroke="url(#lessons-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12 2v2" stroke="url(#lessons-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.93 4.93l1.41 1.41" stroke="url(#lessons-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 12h2" stroke="url(#lessons-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M19.07 4.93l-1.41 1.41" stroke="url(#lessons-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 12h-2" stroke="url(#lessons-gradient)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  // Check-circle icon for Conclusion section
  const ConclusionIcon = (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block align-middle" aria-hidden="true">
      <defs>
        <linearGradient id="conclusion-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A21CAF" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9" stroke="url(#conclusion-gradient)" strokeWidth="2" fill="none" />
      <path
        d="M9 12l2 2 4-4"
        stroke="url(#conclusion-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  return (
    <div className="bg-white min-h-screen">
      {showProgressBar && <ProgressBar progress={scrollProgress} />}

      {/* Hero image in its own container */}
      <div>
        <div className="w-full relative">
          <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
            <Image
              src="/images/casestudy/scheduler/teacherafri1.png"
              alt="EduScheduler: Intelligent Academic Planning System"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <IntroductionSection>
          <CaseStudyHeader level="h1" className="text-center mb-4">
            EduScheduler: Intelligent Academic Planning System
          </CaseStudyHeader>
          <VoiceControlBar
            isPlaying={isVoicePlaying}
            onPlay={handleVoicePlay}
            onPause={handleVoicePause}
            onSeek={handleSeek}
            progress={voiceProgress}
            currentSection={currentVoiceSection}
            charactersUsed={charactersUsed}
            charactersLimit={charactersLimit}
            currentTime={currentTime}
            totalDuration={totalDuration}
          />
        </IntroductionSection>

        {/* Vertically stacked sections with sticky dynamic title for four sections */}
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
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="url(#overview-gradient)"
                      strokeWidth="2"
                      className="inline-block align-middle"
                    >
                      <defs>
                        <linearGradient
                          id="overview-gradient"
                          x1="4"
                          y1="4"
                          x2="20"
                          y2="20"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EC4899" />
                          <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                      <rect x="4" y="4" width="16" height="16" rx="3" />
                      <path d="M8 8h8M8 12h8M8 16h4" />
                    </svg>
                    <span>Overview</span>
                  </>
                )}
                {currentSection === 'challenge' && (
                  <>
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="url(#challenge-gradient)"
                      strokeWidth="2"
                      className="inline-block align-middle"
                    >
                      <defs>
                        <linearGradient
                          id="challenge-gradient"
                          x1="4"
                          y1="4"
                          x2="20"
                          y2="20"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EC4899" />
                          <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                      <path d="M7 21V5a2 2 0 012-2h6a2 2 0 012 2v16l-5-3-5 3z" />
                    </svg>
                    <span>Challenge</span>
                  </>
                )}
                {currentSection === 'userresearch' && (
                  <>
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="url(#userresearch-gradient)"
                      strokeWidth="2"
                      className="inline-block align-middle"
                    >
                      <defs>
                        <linearGradient
                          id="userresearch-gradient"
                          x1="4"
                          y1="4"
                          x2="20"
                          y2="20"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EC4899" />
                          <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <span>User Research</span>
                  </>
                )}
                {currentSection === 'userpersonas' && (
                  <>
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="url(#userpersonas-gradient)"
                      strokeWidth="2"
                      className="inline-block align-middle"
                    >
                      <defs>
                        <linearGradient
                          id="userpersonas-gradient"
                          x1="4"
                          y1="4"
                          x2="20"
                          y2="20"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#EC4899" />
                          <stop offset="1" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                      <circle cx="9" cy="10" r="4" />
                      <circle cx="17" cy="13" r="3" />
                      <path d="M2 20c0-3 4-5 7-5s7 2 7 5" />
                      <path d="M14 20c0-2 2-3 3-3s3 1 3 3" />
                    </svg>
                    <span>User Personas</span>
                  </>
                )}
                {currentSection === 'designprocess' && (
                  <>
                    {DesignProcessIcon}
                    <span>Design Process</span>
                  </>
                )}
              </CaseStudyHeader>
            </AnimatePresence>
          </div>
          {/* Vertically stacked content with increased width */}
          <div className="flex-1 pl-0 pr-4">
            <div className="flex flex-col gap-8 max-w-5xl">
              <div ref={overviewRef} id="overview">
                <ProjectOverviewSection />
              </div>
              {/* Gradient separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />
              <div ref={challengeRef} id="challenge">
                <ChallengeSection />
              </div>
              {/* Gradient separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />
              <div ref={userResearchRef} id="user-research">
                <UserResearchSection />
              </div>
              {/* Gradient separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />
              <div ref={userPersonasRef} id="user-personas">
                <UserPersonasSection />
              </div>
              {/* Gradient separator */}
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />
              {/* Move Design Process section here */}
              <div ref={designProcessRef} id="design-process">
                {/* Design Process Section Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Information Architecture & Workflow Design content */}
                  <div className="mb-6 border border-gray-300 rounded-xl px-8 py-10 bg-white">
                    <h3 className="text-gray-800 font-bold text-xl mb-6">Information Architecture & Workflow Design</h3>
                    <p className="text-gray-800 mb-6">
                      Clear structure and workflows were essential for scalable scheduling.
                    </p>

                    {/* Information Architecture Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                      {/* Programs Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                      >
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mb-2">
                          <circle cx="12" cy="10" r="5" stroke="#334155" strokeWidth="2" fill="none" />
                          <path
                            d="M12 22c3-4 7-7.5 7-12A7 7 0 0 0 5 10c0 4.5 4 8 7 12z"
                            stroke="#334155"
                            strokeWidth="2"
                            fill="none"
                          />
                          <circle cx="12" cy="10" r="2" fill="#334155" />
                        </svg>
                        <div className="font-bold text-blue-700 mb-1">Programs</div>
                        <div className="text-gray-600 text-sm text-center">
                          Represents the geographical location (e.g., Nigeria).
                        </div>
                      </motion.div>
                      {/* Schools Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                      >
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mb-2">
                          <rect
                            x="4"
                            y="10"
                            width="16"
                            height="8"
                            rx="2"
                            stroke="#334155"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path d="M2 10l10-6 10 6" stroke="#334155" strokeWidth="2" fill="none" />
                          <rect x="10" y="14" width="4" height="4" stroke="#334155" strokeWidth="1.5" fill="none" />
                        </svg>
                        <div className="font-bold text-blue-700 mb-1">Schools</div>
                        <div className="text-gray-600 text-sm text-center">Each program contains multiple schools.</div>
                      </motion.div>
                      {/* Additional cards truncated for brevity */}
                    </div>

                    <p className="text-gray-700 italic">
                      This foundation made the system intuitive for both development and user training.
                    </p>
                  </div>

                  {/* User Journey Mapping */}
                  <div className="border border-gray-300 rounded-xl px-8 py-10 bg-white mb-10">
                    <UserJourneyMapInteractive />
                  </div>

                  <p className="text-gray-700 mb-8">
                    These insights shaped targeted improvements across the user experience.
                  </p>
                </motion.div>
              </div>
              <div className="w-full h-0.5 my-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70" />
              <div className="mt-16" />
            </div>
          </div>
        </section>

        {/* Interactive Prototype Section */}
        <div className="mb-20">
          <InteractivePrototype />
        </div>

        {/* Teacher Guide Flow Section */}
        <section className="relative grid grid-cols-1 md:grid-cols-[300px_1fr] gap-0 mb-20 min-h-[500px]">
          {/* Sticky Title */}
          <div className="sticky left-0 top-24 h-fit min-w-[300px] w-[300px] max-w-md flex flex-col justify-start items-start pr-4 py-8 bg-gradient-to-b from-white/90 to-white/60 z-10">
            <div className="flex items-center mb-8 w-full">
              <CaseStudyHeader level="h2" showGradientLine className="flex items-center gap-3 w-full">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Teacher Guide Flow</span>
              </CaseStudyHeader>
            </div>
          </div>

          {/* Content */}
          <div className="pr-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-md mb-12"
            >
              {/* Section Introduction */}
              <div className="mb-8">
                <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                  Teachers start by viewing their daily schedule and can click on any lesson to instantly access the detailed teaching guide for that subject.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-blue-800 font-medium">
                    <span className="font-bold">Interactive Flow:</span> Click any subject in the schedule below to see how the teacher guide appears instantly.
                  </p>
                </div>
              </div>

              {/* Instructions Above Tablet */}
              <div className="mb-6 text-center">
                {currentView === 'schedule' && (
                  <p className="text-gray-600 text-lg">
                    <span className="font-semibold">Try it:</span> Click on any lesson in the schedule below to view the teacher guide
                  </p>
                )}
                {currentView === 'guide' && (
                  <div>
                    <p className="text-gray-600 mb-4 text-lg">
                      Currently viewing: <span className="font-semibold text-blue-600">{selectedSubject} Lesson Guide</span>
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="text-sm text-gray-500 mr-2">Try other subjects:</span>
                      {['Mathematics', 'English', 'Science', 'Social Studies'].map((subject) => (
                        <button
                          key={subject}
                          onClick={() => setSelectedSubject(subject)}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                            selectedSubject === subject
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tablet with Flow Content Inside */}
              <div className="flex justify-center">
                <div style={{ height: '650px' }}>
                  <TabletMockup>
                    <AnimatePresence mode="wait">
                      {currentView === 'schedule' && (
                        <motion.div
                          key="schedule"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full overflow-hidden"
                        >
                          <TeacherScheduleView
                            onSubjectClick={(subject) => {
                              setSelectedSubject(subject);
                              setCurrentView('guide');
                            }}
                          />
                        </motion.div>
                      )}

                      {currentView === 'guide' && (
                        <motion.div
                          key="guide"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full relative overflow-hidden"
                        >
                          {/* Guide Content */}
                          {selectedSubject === 'Mathematics' && <TeacherGuideContent onBack={() => setCurrentView('schedule')} />}
                          {selectedSubject === 'English' && <EnglishTeacherGuide onBack={() => setCurrentView('schedule')} />}
                          {selectedSubject === 'Science' && <ScienceTeacherGuide onBack={() => setCurrentView('schedule')} />}
                          {selectedSubject === 'Social Studies' && <SocialStudiesTeacherGuide onBack={() => setCurrentView('schedule')} />}
                          {selectedSubject === 'Reading Time' && <EnglishTeacherGuide onBack={() => setCurrentView('schedule')} />}
                          {selectedSubject === 'Art Class' && <EnglishTeacherGuide onBack={() => setCurrentView('schedule')} />}
                          {selectedSubject === 'Physical Education' && <ScienceTeacherGuide onBack={() => setCurrentView('schedule')} />}
                          {selectedSubject === 'Music Class' && <SocialStudiesTeacherGuide onBack={() => setCurrentView('schedule')} />}
                          {selectedSubject === 'Study Hall' && <TeacherGuideContent onBack={() => setCurrentView('schedule')} />}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </TabletMockup>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <CaseStudyFooter />
      </main>
      {showScrollToTop && <ScrollToTopButton targetId="intro-section" />}
    </div>
  );
};