'use client';

import React from 'react';

interface SectionTitleProps {
  title?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: React.ReactNode;
}

export const SectionTitle = ({ title, subtitle, align = 'left', className = '', children }: SectionTitleProps) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={`mb-16 max-w-2xl ${alignClasses[align]} ${className}`}>
      <h2 className="section-title text-3xl md:text-4xl font-bold mb-6">{title || children}</h2>
      {subtitle && <p className="text-lg text-muted">{subtitle}</p>}
    </div>
  );
};
