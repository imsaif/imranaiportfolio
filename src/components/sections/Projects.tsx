'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';

import { ProjectMockup } from '../ui/ProjectMockup';
import { SectionTitle } from '../ui/SectionTitle';
import StickyProjectCard from '../ui/StickyProjectCard';
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

const Projects = () => {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [caseStudyHover, setCaseStudyHover] = useState(Array(projects.length).fill(false));

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
    <section id="work" className="relative w-full mt-12 pt-20" ref={sectionRef}>
      <div className="container mx-auto max-w-4xl px-4">
        <div ref={sectionRef} className="relative overflow-visible">
          {projects.map((project, idx) => (
            <StickyProjectCard
              key={project.id}
              project={project}
              index={idx}
              total={projects.length}
              containerRef={sectionRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
