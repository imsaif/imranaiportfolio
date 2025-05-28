'use client';

import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface MobileOptimizedProps {
  children: React.ReactNode;
  mobileComponent?: React.ReactNode;
  className?: string;
  touchOptimized?: boolean;
}

/**
 * MobileOptimized - Component that provides mobile-specific optimizations
 * Can render different content for mobile vs desktop
 */
export const MobileOptimized: React.FC<MobileOptimizedProps> = ({
  children,
  mobileComponent,
  className = '',
  touchOptimized = true,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)');

  // Touch-optimized styles
  const touchStyles = touchOptimized && isTouchDevice ? 'touch-manipulation select-none' : '';

  // Mobile-specific styles
  const mobileStyles = isMobile ? 'mobile-optimized' : '';

  const combinedClassName = `${className} ${touchStyles} ${mobileStyles}`.trim();

  // Render mobile component if provided and on mobile
  if (mobileComponent && isMobile) {
    return <div className={combinedClassName}>{mobileComponent}</div>;
  }

  return <div className={combinedClassName}>{children}</div>;
};

export default MobileOptimized;
