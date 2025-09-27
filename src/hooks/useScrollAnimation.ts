import { useState, useEffect, useCallback } from 'react';
import { useMotionValue, useTransform } from 'framer-motion';

interface ScrollAnimationValues {
  scrollY: number;
  scrollProgress: number;
  rotation: number;
  scale: number;
  opacity: number;
  isInView: boolean;
}

export const useScrollAnimation = (
  elementRef?: React.RefObject<HTMLElement>,
  options?: {
    rotationRange?: [number, number];
    scaleRange?: [number, number];
    opacityRange?: [number, number];
    offsetTop?: number;
    offsetBottom?: number;
  }
) => {
  const {
    rotationRange = [0, 360],
    scaleRange = [0.8, 1],
    opacityRange = [0.3, 1],
    offsetTop = 0,
    offsetBottom = 0
  } = options || {};

  const [scrollValues, setScrollValues] = useState<ScrollAnimationValues>({
    scrollY: 0,
    scrollProgress: 0,
    rotation: 0,
    scale: scaleRange[0],
    opacity: opacityRange[0],
    isInView: false
  });

  const scrollYMotion = useMotionValue(0);
  const rotationMotion = useTransform(scrollYMotion, [0, 1000], rotationRange);
  const scaleMotion = useTransform(scrollYMotion, [0, 500], scaleRange);
  const opacityMotion = useTransform(scrollYMotion, [0, 300], opacityRange);

  const calculateProgress = useCallback((scrollY: number): number => {
    if (!elementRef?.current) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      return docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0;
    }

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + scrollY;
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;

    const scrollStart = Math.max(0, elementTop - windowHeight + offsetTop);
    const scrollEnd = elementTop + elementHeight + offsetBottom;
    const scrollRange = scrollEnd - scrollStart;

    if (scrollY < scrollStart) return 0;
    if (scrollY > scrollEnd) return 100;

    return ((scrollY - scrollStart) / scrollRange) * 100;
  }, [elementRef, offsetTop, offsetBottom]);

  const checkInView = useCallback((): boolean => {
    if (!elementRef?.current) return true;

    const rect = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementBottom = rect.bottom;

    return elementTop < windowHeight && elementBottom > 0;
  }, [elementRef]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const progress = calculateProgress(scrollY);
    const isInView = checkInView();

    // Calculate rotation based on scroll progress
    const rotation = (progress / 100) * (rotationRange[1] - rotationRange[0]) + rotationRange[0];

    // Calculate scale based on scroll position
    const scaleFactor = Math.min(scrollY / 500, 1);
    const scale = scaleRange[0] + (scaleRange[1] - scaleRange[0]) * scaleFactor;

    // Calculate opacity based on scroll position
    const opacityFactor = Math.min(scrollY / 300, 1);
    const opacity = opacityRange[0] + (opacityRange[1] - opacityRange[0]) * opacityFactor;

    scrollYMotion.set(scrollY);

    setScrollValues({
      scrollY,
      scrollProgress: progress,
      rotation,
      scale,
      opacity,
      isInView
    });
  }, [
    calculateProgress,
    checkInView,
    rotationRange,
    scaleRange,
    opacityRange,
    scrollYMotion
  ]);

  useEffect(() => {
    handleScroll(); // Initial calculation

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  return {
    ...scrollValues,
    motionValues: {
      scrollY: scrollYMotion,
      rotation: rotationMotion,
      scale: scaleMotion,
      opacity: opacityMotion
    }
  };
};

// Specialized hook for circular animations
export const useCircularAnimation = (
  radius: number = 200,
  itemCount: number = 10,
  options?: {
    startAngle?: number;
    endAngle?: number;
    rotationSpeed?: number;
  }
) => {
  const {
    startAngle = -90,
    endAngle = 90,
    rotationSpeed = 0.3
  } = options || {};

  const scrollAnimation = useScrollAnimation();
  const angleRange = endAngle - startAngle;
  const angleStep = angleRange / (itemCount - 1);

  const calculateItemPosition = (index: number) => {
    const baseAngle = startAngle + (index * angleStep);
    const animatedAngle = baseAngle + (scrollAnimation.rotation * rotationSpeed);
    const angleInRadians = (animatedAngle * Math.PI) / 180;

    const x = radius * Math.cos(angleInRadians);
    const y = radius * Math.sin(angleInRadians);

    return {
      x,
      y,
      rotation: animatedAngle + 90, // Adjust rotation to face outward
      scale: scrollAnimation.scale,
      opacity: scrollAnimation.opacity
    };
  };

  return {
    ...scrollAnimation,
    calculateItemPosition
  };
};