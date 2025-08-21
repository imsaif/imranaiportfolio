'use client';

import React from 'react';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo = ({ className = '' }: AnimatedLogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-start h-6">
        {/* Vertical line - I */}
        <div
          className="w-1 h-full rounded-sm mr-1"
          style={{
            background: 'linear-gradient(to bottom, var(--accent), var(--tertiary))',
            backgroundSize: '100% 300%',
            animation: 'gradientFlow 4s ease infinite',
          }}
        ></div>

        {/* Three diagonal slashes - M */}
        <div className="flex gap-0.5">
          {[0, 1, 2].map(index => (
            <div
              key={index}
              className="w-1 h-full rounded-sm transform -skew-x-12"
              style={{
                height: '24px',
                background: 'linear-gradient(135deg, var(--accent), var(--tertiary))',
                backgroundSize: '200% 200%',
                animation: `gradientFlow ${4 + index * 0.5}s ease infinite`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Add keyframes for the gradient animation */}
      <style jsx global>{`
        @keyframes gradientFlow {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
