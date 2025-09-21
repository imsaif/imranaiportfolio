'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { SectionTitle } from '../ui/SectionTitle';

type Framework = {
  title: string;
  description: string;
  number: string;
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.08, type: 'spring', stiffness: 60 } }),
};

const Process = () => {
  const frameworks: Framework[] = [
    {
      title: 'Discover',
      description: 'Deep dive into the problem space through research and analysis to understand user needs, business goals, and technical constraints.',
      number: '1',
    },
    {
      title: 'Define',
      description: 'Translate insights into actionable strategy, establishing clear principles, priorities, and requirements that guide design decisions.',
      number: '2',
    },
    {
      title: 'Design',
      description: 'Create solutions through iterative exploration, from initial concepts to detailed interfaces, balancing user needs with technical feasibility.',
      number: '3',
    },
    {
      title: 'Deliver',
      description: 'Partner with engineering to ensure quality implementation, maintaining design integrity while adapting to technical realities.',
      number: '4',
    },
    {
      title: 'Measure',
      description: 'Analyze real-world usage to validate decisions, identify opportunities, and drive continuous improvement through data-informed iteration.',
      number: '5',
    },
  ];

  // Transform-based infinite scroll logic
  const rowRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const isHovered = useRef(false);
  const [setWidth, setSetWidth] = useState(0);
  const speed = 0.5; // px per frame (further reduced speed for a more subtle scroll)
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const updateSetWidth = () => {
      if (!rowRef.current) return;
      // Only measure the first set
      const children = Array.from(rowRef.current.children).slice(0, frameworks.length) as HTMLElement[];
      const width = children.reduce((acc, child) => acc + child.offsetWidth, 0) + (children.length - 1) * 32; // 32px gap-8
      setSetWidth(width);
    };
    setTimeout(updateSetWidth, 100);
    window.addEventListener('resize', updateSetWidth);
    return () => window.removeEventListener('resize', updateSetWidth);
  }, [frameworks.length]);

  // Check if element is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry?.isIntersecting || false);
      },
      { threshold: 0.1 }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => {
      if (rowRef.current) {
        observer.unobserve(rowRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (!isHovered.current && setWidth > 0 && isInViewport) {
        setScrollX(prev => {
          const next = prev + speed;
          return next >= setWidth ? 0 : next;
        });
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [setWidth, isInViewport]);

  // Reset scroll position when component mounts
  useEffect(() => {
    setScrollX(0);
  }, []);

  // Pause scroll on hover for accessibility
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const handleMouseEnter = () => {
      isHovered.current = true;
    };
    const handleMouseLeave = () => {
      isHovered.current = false;
    };
    row.addEventListener('mouseenter', handleMouseEnter);
    row.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      row.removeEventListener('mouseenter', handleMouseEnter);
      row.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-32 md:py-40 lg:py-48 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-accent/5 -z-10"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-secondary/5 -z-10"></div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        <SectionTitle title="Product Design Process" subtitle="A battle-tested framework refined through 8+ years of enterprise design." />
      </div>

      {/* Full-width cards row with transform-based scroll */}
      <div
        className="w-full max-w-none px-0 mt-4 xs:mt-6 overflow-hidden h-[200px] md:h-[240px]"
        style={{ position: 'relative' }}
      >
        <div
          ref={rowRef}
          className="flex flex-row gap-8 xs:gap-12 h-full will-change-transform"
          style={{
            transform: `translateX(-${scrollX}px)`,
            transition: 'none',
          }}
          aria-label="AI Design Methodology Cards"
        >
          {/* Duplicate cards for infinite scroll */}
          {[...Array(2)].flatMap((_, dupIdx) =>
            frameworks.map((framework, index) => (
              <motion.div
                key={framework.title + '-' + dupIdx}
                className="card min-w-[280px] max-w-xs md:min-w-[320px] md:max-w-sm h-[200px] md:h-[240px] group flex-shrink-0 flex flex-col items-start justify-center p-10 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-card-border rounded-2xl hover:scale-[1.03] focus-within:ring-2 focus-within:ring-accent outline-none snap-center relative overflow-hidden"
                tabIndex={0}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                custom={index}
                aria-label={framework.title}
              >
                {/* Modern large number, very subtle and cropped */}
                <span
                  className="absolute left-4 md:left-8 -bottom-4 md:-bottom-8 text-[110px] md:text-[180px] font-extralight text-gray-200 select-none pointer-events-none z-0 leading-none"
                  aria-hidden="true"
                >
                  {framework.number}
                </span>
                {/* Card content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{framework.title}</h3>
                  <p className="text-muted text-base leading-relaxed mb-1">{framework.description}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Process;
