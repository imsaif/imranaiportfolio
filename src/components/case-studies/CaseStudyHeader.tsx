'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CaseStudyHeaderProps {
  children: ReactNode;
  level?: 'h1' | 'h2' | 'h3';
  className?: string;
  showGradientLine?: boolean;
}

export default function CaseStudyHeader({
  children,
  level = 'h2',
  className = '',
  showGradientLine = level === 'h2',
}: CaseStudyHeaderProps) {
  const baseClasses = {
    h1: 'text-4xl md:text-5xl font-bold mb-6 leading-[1.15] pb-2 overflow-visible',
    h2: 'text-3xl font-bold mb-6',
    h3: 'text-2xl font-semibold mb-4',
  };

  const gradientClass =
    level === 'h1'
      ? 'bg-gradient-to-r from-accent to-tertiary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient'
      : '';

  const HeaderComponent = ({ className: headerClassName, children: headerChildren }: { className: string; children: ReactNode }) => {
    if (level === 'h1') {
      return <h1 className={headerClassName}>{headerChildren}</h1>;
    } else if (level === 'h2') {
      return <h2 className={headerClassName}>{headerChildren}</h2>;
    } else {
      return <h3 className={headerClassName}>{headerChildren}</h3>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <HeaderComponent className={`${baseClasses[level]} ${gradientClass} ${className}`}>
        {children}
      </HeaderComponent>

      {showGradientLine && (
        <motion.div
          className="h-0.5 w-full bg-gradient-to-r from-accent to-tertiary rounded-full mt-2 mb-6"
          initial={{ scaleX: 0, opacity: 0, transformOrigin: 'left' }}
          whileInView={{ scaleX: 1, opacity: 1, transformOrigin: 'left' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      )}
    </motion.div>
  );
}
