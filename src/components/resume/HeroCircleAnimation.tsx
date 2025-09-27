'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TechIcon } from './TechIcon';
import { heroTechStack } from '@/data/techStack';
import { useCircularAnimation } from '@/hooks/useScrollAnimation';

interface HeroCircleAnimationProps {
  className?: string;
}

export const HeroCircleAnimation: React.FC<HeroCircleAnimationProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, radius: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Minimal scroll effect for subtle movement
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 1000], [0, -30]);
  const smoothOffset = useSpring(yOffset, { stiffness: 50, damping: 20 });

  // Update dimensions based on viewport
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;

      const width = window.innerWidth;
      const isMobileView = width < 768;

      setIsMobile(isMobileView);

      if (isMobileView) {
        setDimensions({
          width: width,
          radius: Math.min(width * 0.35, 300)
        });
      } else {
        setDimensions({
          width: width,
          radius: Math.min(width * 0.3, 350)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);


  return (
    <div
      ref={containerRef}
      className={`hero-circle-animation relative overflow-hidden w-full flex items-center justify-center ${className}`}
      style={{
        height: isMobile ? '300px' : '400px',
        marginTop: isMobile ? '20px' : '40px'
      }}
    >
      {/* Multiple concentric circles with tech icons */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          y: smoothOffset,
          width: `${dimensions.radius * 2}px`,
          height: `${dimensions.radius * 2}px`
        }}
      >
        {/* Outer semicircle icons */}
        <motion.div
          className="absolute inset-0"
        >
        {heroTechStack.slice(0, 10).map((tech, index) => {
          const totalIcons = 10;
          const angle = Math.PI + (index / (totalIcons - 1)) * Math.PI; // Semicircle from left to right
          const radius = dimensions.radius * 0.85;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <motion.div
              key={tech.id}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 260,
                damping: 20
              }}
            >
              <TechIcon
                tech={tech}
                index={index}
                size={isMobile ? 'sm' : 'md'}
                animate={true}
                delay={0}
                showTooltip={!isMobile}
              />
            </motion.div>
          );
        })}
        </motion.div>

        {/* Inner semicircle icons */}
        <motion.div
          className="absolute inset-0"
        >
        {heroTechStack.slice(10, 16).map((tech, index) => {
          const totalIcons = 6;
          const angle = Math.PI + (index / (totalIcons - 1)) * Math.PI; // Semicircle from left to right
          const radius = dimensions.radius * 0.65;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <motion.div
              key={tech.id}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: (index + 10) * 0.1,
                type: 'spring',
                stiffness: 260,
                damping: 20
              }}
            >
              <TechIcon
                tech={tech}
                index={index + 10}
                size={isMobile ? 'sm' : 'sm'}
                animate={true}
                delay={0}
                showTooltip={!isMobile}
              />
            </motion.div>
          );
        })}
        </motion.div>


        {/* Orbital paths visualization - Semicircle arcs */}
        <svg
          className="absolute inset-0 pointer-events-none opacity-20"
          width="100%"
          height="100%"
        >
          {/* Outer semicircle arc */}
          <path
            d={`M ${dimensions.radius * 2 * 0.15} ${dimensions.radius} A ${dimensions.radius * 0.85} ${dimensions.radius * 0.85} 0 0 1 ${dimensions.radius * 2 * 0.85} ${dimensions.radius}`}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1"
            strokeDasharray="5 10"
          />
          {/* Inner semicircle arc */}
          <path
            d={`M ${dimensions.radius * 2 * 0.35} ${dimensions.radius} A ${dimensions.radius * 0.65} ${dimensions.radius * 0.65} 0 0 1 ${dimensions.radius * 2 * 0.65} ${dimensions.radius}`}
            fill="none"
            stroke="#10B981"
            strokeWidth="1"
            strokeDasharray="4 9"
          />
        </svg>
      </motion.div>

      {/* Center content - Name and Description positioned below semicircles */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center w-full px-4 z-20 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.h1
          className={`
            ${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'}
            font-bold text-transparent bg-clip-text
            animate-gradient-text mb-2
          `}
          style={{
            backgroundImage: 'linear-gradient(90deg, var(--accent), var(--tertiary), var(--accent))',
            backgroundSize: '200% auto'
          }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 10,
            delay: 0.6
          }}
        >
          Imran Mohammed
        </motion.h1>

        <motion.p
          className={`
            ${isMobile ? 'text-base' : 'text-lg'}
            text-gray-600 dark:text-gray-400 leading-relaxed mb-2
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Senior Product Designer
        </motion.p>

        <motion.p
          className={`
            ${isMobile ? 'text-sm' : 'text-base'}
            text-gray-500 dark:text-gray-500
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Design Leader & AI Innovation
        </motion.p>
      </motion.div>

    </div>
  );
};