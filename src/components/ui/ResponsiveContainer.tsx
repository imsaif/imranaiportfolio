import React from 'react';
import { cn } from '../../utils/cn';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean;
}

/**
 * ResponsiveContainer - A flexible container component optimized for mobile-first design
 * Provides consistent spacing and responsive behavior across the portfolio site
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  size = 'lg',
  padding = 'md',
  center = true,
}) => {
  // Size variants - mobile-first approach
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  // Padding variants - mobile-first
  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-4 sm:px-6 lg:px-8 xl:px-12',
  };

  const baseClasses = center ? 'mx-auto' : '';

  return <div className={cn(baseClasses, sizeClasses[size], paddingClasses[padding], className)}>{children}</div>;
};

export default ResponsiveContainer;
