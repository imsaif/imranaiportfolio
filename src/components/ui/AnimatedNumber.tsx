'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 2000,
  className = ''
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse the value to extract number and suffix
    const match = value.match(/^(\d+)(\+?)(%?)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const [, numberStr, plus = '', percent = ''] = match;
    const targetNumber = parseInt(numberStr || '0');
    const suffix = plus + percent;

    // Animate the number
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use easeOutQuad for smooth deceleration
      const easeOutQuad = 1 - Math.pow(1 - progress, 2);
      const current = Math.floor(targetNumber * easeOutQuad);

      setDisplayValue(current + suffix);

      if (progress >= 1) {
        clearInterval(timer);
        setDisplayValue(targetNumber + suffix);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};

export default AnimatedNumber;