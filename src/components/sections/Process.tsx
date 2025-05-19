'use client';

import { motion } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import Button from '../ui/Button';
import { SparklesIcon, LightBulbIcon, BeakerIcon, ShieldCheckIcon, RefreshCwIcon } from '../ui/ProcessIcons';

import { SectionTitle } from '../ui/SectionTitle';

type Framework = {
  title: string;
  description: string;
  number: string;
};

const icons = [
  <LightBulbIcon key="1" className="w-8 h-8 text-accent" />,
  <BeakerIcon key="2" className="w-8 h-8 text-secondary" />,
  <SparklesIcon key="3" className="w-8 h-8 text-tertiary" />,
  <ShieldCheckIcon key="4" className="w-8 h-8 text-accent" />,
  <RefreshCwIcon key="5" className="w-8 h-8 text-secondary" />,
];

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.08, type: 'spring', stiffness: 60 } }),
};

const Process = () => {
  const frameworks: Framework[] = [
    {
      title: 'Research & Problem Definition',
      description: 'Explore user needs and define the problem to ensure AI addresses real challenges.',
      number: '01',
    },
    {
      title: 'AI Capability Mapping',
      description: 'Work with experts to map AI strengths and limits, focusing on user value.',
      number: '02',
    },
    {
      title: 'Experience Prototyping',
      description: 'Build and test interactive prototypes to show how AI will work in practice.',
      number: '03',
    },
    {
      title: 'Ethical Evaluation',
      description: 'Review for bias, fairness, and accessibility to ensure responsible AI.',
      number: '04',
    },
    {
      title: 'Iterative Testing',
      description: 'Test with real users, gather feedback, and refine the experience.',
      number: '05',
    },
  ];

  // Automatic horizontal scroll logic
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = 0.7; // slower, smoother
    let frameId: number;

    const scrollStep = () => {
      if (!container || isHovered.current) {
        frameId = requestAnimationFrame(scrollStep);
        return;
      }
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollAmount;
      }
      frameId = requestAnimationFrame(scrollStep);
    };
    frameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Pause scroll on hover for accessibility
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseEnter = () => {
      isHovered.current = true;
    };
    const handleMouseLeave = () => {
      isHovered.current = false;
    };
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-accent/5 -z-10"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-secondary/5 -z-10"></div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        <SectionTitle title="AI Design Methodology" subtitle="A clear, user-focused process for effective AI design." />

        <div
          className="flex flex-row gap-8 xs:gap-12 mt-16 xs:mt-24 overflow-x-hidden overflow-y-hidden snap-x snap-mandatory h-[320px] md:h-[380px]"
          ref={containerRef}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {frameworks.map((framework, index) => (
            <motion.div
              key={framework.title}
              className="card min-w-[280px] max-w-xs md:min-w-[320px] md:max-w-sm h-[260px] md:h-[320px] group flex-shrink-0 flex flex-col items-start justify-center p-10 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-card-border rounded-2xl hover:scale-[1.03] focus-within:ring-2 focus-within:ring-accent outline-none snap-center"
              tabIndex={0}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              custom={index}
              aria-label={framework.title}
            >
              {/* Removed icons and number badges for a minimal look */}
              <h3 className="text-xl font-bold mb-2 text-foreground">{framework.title}</h3>
              <p className="text-muted text-base leading-relaxed mb-1">{framework.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
