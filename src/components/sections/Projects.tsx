'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';

import { ProjectMockup } from '../ui/ProjectMockup';
import { SectionTitle } from '../ui/SectionTitle';
import { getFeaturedProjects } from '@/data/projects';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Get projects at build time
const projects = getFeaturedProjects();

// Function to determine project color based on project ID
const getProjectColor = (id: number) => {
  switch (id) {
    case 1:
      return {
        bg: 'bg-indigo-100',
        accent: 'bg-indigo-500',
      };
    case 2:
      return {
        bg: 'bg-blue-100',
        accent: 'bg-blue-500',
      };
    case 3:
      return {
        bg: 'bg-emerald-100',
        accent: 'bg-emerald-500',
      };
    default:
      return {
        bg: 'bg-purple-100',
        accent: 'bg-purple-500',
      };
  }
};

// StarCursor component
const StarCursor: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setShow(true);
    };
    const handleLeave = () => setShow(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [visible]);
  if (!visible || !show) return null;
  return (
    <svg
      style={{
        position: 'fixed',
        left: pos.x - 16,
        top: pos.y - 16,
        width: 32,
        height: 32,
        pointerEvents: 'none',
        zIndex: 10000,
      }}
      viewBox="0 0 32 32"
    >
      <defs>
        <linearGradient id="star-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      <polygon
        points="16,2 19.2,12.8 30,16 19.2,19.2 16,30 12.8,19.2 2,16 12.8,12.8"
        fill="url(#star-gradient)"
        opacity="0.95"
        style={{ filter: 'drop-shadow(0 0 6px #f43f5e88)' }}
      />
    </svg>
  );
};

const Projects = () => {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [caseStudyHover, setCaseStudyHover] = useState(Array(projects.length).fill(false));
  const [cursorActive, setCursorActive] = useState(false);

  // The total scrollable width is (number of projects - 1) * 100vw
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['0.2 0', '1 1'],
  });
  // Map scroll progress [0, 1] to horizontal translation [0, -100 * (projects.length - 1)vw]
  // But start the animation later by adjusting the input range
  const x = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.75, 0.85], // More gradual start and end with easing in the middle
    ['0vw', `-${25 * (projects.length - 1)}vw`, `-${75 * (projects.length - 1)}vw`, `-${100 * (projects.length - 1)}vw`]
  );

  // The height of the section should be (number of projects) * 100vh so the user can scroll through all slides
  const sectionHeight = `${projects.length * 100}vh`;

  // Effect to track which project is most centered in the viewport
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerWidth / 2;
      let minDistance = Infinity;
      let closestIdx = 0;
      projectRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
          }
        }
      });
      setActiveIndex(closestIdx);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="work"
      className="relative w-full mt-24 md:mt-32"
      style={{ height: sectionHeight, position: 'relative', cursor: isDesktop && cursorActive ? 'none' : undefined }}
      ref={sectionRef}
      onMouseEnter={() => isDesktop && setCursorActive(true)}
      onMouseLeave={() => isDesktop && setCursorActive(false)}
    >
      {isDesktop && <StarCursor visible={cursorActive} />}
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8 pt-4 pb-0 md:pt-6 md:pb-0 bg-background z-10 relative">
        <SectionTitle title="Featured work" />
      </div>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-background relative -mt-6 md:-mt-10">
        <motion.div className="absolute top-0 left-0 h-full flex w-full" style={{ x }}>
          <div className="flex h-full w-full" style={{ width: `${projects.length * 100}vw` }}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="relative w-screen h-full flex items-center justify-center overflow-hidden px-6 xs:px-8 sm:px-12 md:px-16 lg:px-24 pt-4"
                ref={el => {
                  projectRefs.current[index] = el;
                }}
              >
                <Link
                  href={`/casestudy/${project.slug}`}
                  className={`w-full h-screen flex items-center justify-between relative rounded-xl overflow-hidden transition-transform focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50${isDesktop ? ' cursor-none' : ''}`}
                  style={isDesktop ? { cursor: 'none' } : undefined}
                >
                  {/* Left side: Project mockup */}
                  <div className="w-full md:w-1/2 h-screen bg-background rounded-lg z-0 flex items-center">
                    <div className="w-full h-screen rounded-lg overflow-hidden">
                      <ProjectMockup
                        project={project}
                        onCaseStudyHover={
                          isDesktop
                            ? isHovered => {
                                setCaseStudyHover(prev => {
                                  const next = [...prev];
                                  next[index] = isHovered;
                                  return next;
                                });
                              }
                            : undefined
                        }
                        showParticles={isDesktop && caseStudyHover[index]}
                      />
                    </div>
                  </div>

                  {/* Right side: Text content */}
                  <div className="hidden md:flex flex-col items-start justify-center text-left w-full md:w-1/2 h-full pl-0 md:pl-12 z-20">
                    <div className="w-full flex flex-col items-start">
                      <span className="inline-block mb-2 text-sm font-medium text-black">{project.tagline}</span>
                      {/* Special formatting for EduScheduler and LessonLoom */}
                      {project.slug === 'scheduler' ? (
                        <>
                          <h3 className="text-2xl md:text-4xl font-bold mb-1 text-black drop-shadow-lg">EduScheduler</h3>
                          <span className="text-lg md:text-2xl font-medium text-gray-700 mb-3 md:mb-4 block">Intelligent Academic Planning System</span>
                        </>
                      ) : project.slug === 'lessonloom' ? (
                        <>
                          <h3 className="text-2xl md:text-4xl font-bold mb-1 text-black drop-shadow-lg">LessonLoom</h3>
                          <span className="text-lg md:text-2xl font-medium text-gray-700 mb-3 md:mb-4 block">AI Lesson Generation Platform</span>
                        </>
                      ) : (
                        <h3 className="text-2xl md:text-4xl font-bold mb-4 text-black drop-shadow-lg">{project.title}</h3>
                      )}
                      <p className="text-base md:text-lg text-black mb-8 leading-relaxed drop-shadow-lg">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center font-medium">
                        <span
                          className={`inline-flex font-semibold relative z-10 bg-gradient-to-r from-indigo-500 via-pink-600 to-red-600 bg-clip-text text-transparent drop-shadow-sm hover:drop-shadow-md${isDesktop ? ' cursor-none' : ''}`}
                          onMouseEnter={() =>
                            setCaseStudyHover(prev => {
                              const next = [...prev];
                              next[index] = true;
                              return next;
                            })
                          }
                          onMouseLeave={() =>
                            setCaseStudyHover(prev => {
                              const next = [...prev];
                              next[index] = false;
                              return next;
                            })
                          }
                        >
                          View case study
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 ml-1 text-pink-500${isDesktop ? ' cursor-none' : ''}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Mobile: Text below mockup */}
                  <div className="md:hidden absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end text-center w-full pb-4 z-20 bg-gradient-to-t from-background/90 to-transparent">
                    <div className="w-full flex flex-col items-center px-2">
                      <span className="inline-block mb-1 text-sm font-medium text-black">{project.tagline}</span>
                      {/* Special formatting for EduScheduler and LessonLoom */}
                      {project.slug === 'scheduler' ? (
                        <>
                          <h3 className="text-xl font-bold mb-0 text-black drop-shadow-lg">EduScheduler</h3>
                          <span className="text-base font-medium text-gray-700 mb-2 block">Intelligent Academic Planning System</span>
                        </>
                      ) : project.slug === 'lessonloom' ? (
                        <>
                          <h3 className="text-xl font-bold mb-0 text-black drop-shadow-lg">LessonLoom</h3>
                          <span className="text-base font-medium text-gray-700 mb-2 block">AI Lesson Generation Platform</span>
                        </>
                      ) : (
                        <h3 className="text-xl font-bold mb-2 text-black drop-shadow-lg">{project.title}</h3>
                      )}
                      <p className="text-sm text-black mb-4 leading-relaxed drop-shadow-lg">{project.description}</p>
                      <span className="inline-flex items-center font-medium">
                        <span
                          className={`inline-flex font-semibold relative z-10 bg-gradient-to-r from-indigo-500 via-pink-600 to-red-600 bg-clip-text text-transparent drop-shadow-sm hover:drop-shadow-md${isDesktop ? ' cursor-none' : ''}`}
                          onMouseEnter={() =>
                            setCaseStudyHover(prev => {
                              const next = [...prev];
                              next[index] = true;
                              return next;
                            })
                          }
                          onMouseLeave={() =>
                            setCaseStudyHover(prev => {
                              const next = [...prev];
                              next[index] = false;
                              return next;
                            })
                          }
                        >
                          View case study
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 ml-1 text-pink-500${isDesktop ? ' cursor-none' : ''}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
