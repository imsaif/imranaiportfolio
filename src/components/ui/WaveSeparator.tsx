'use client';

import { useEffect, useRef, useState } from 'react';

const WaveSeparator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up intersection observer
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    observer.observe(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let animationFrameId: number;
    let progress = 0;
    const duration = 2000; // Animation duration in milliseconds
    let startTime: number | null = null;

    const animate = () => {
      if (!ctx || !canvas) return;

      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // Start animation when visible
      if (isVisible && startTime === null) {
        startTime = Date.now();
      }

      // Calculate animation progress
      if (startTime !== null) {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);
      }

      // Draw glow effect
      const glowGradient = ctx.createLinearGradient(0, 0, width, 0);
      glowGradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)'); // accent color with opacity
      glowGradient.addColorStop(1, 'rgba(244, 63, 94, 0.2)'); // tertiary color with opacity

      // Draw multiple lines with decreasing opacity for glow effect
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        const currentWidth = width * progress;
        ctx.lineTo(currentWidth, height / 2);

        ctx.strokeStyle = glowGradient;
        ctx.lineWidth = 3 - i; // Decreasing line width
        ctx.globalAlpha = 0.3 - i * 0.1; // Decreasing opacity
        ctx.stroke();
      }

      // Reset global alpha
      ctx.globalAlpha = 1;

      // Draw main line
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      const currentWidth = width * progress;
      ctx.lineTo(currentWidth, height / 2);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#6366f1'); // accent color
      gradient.addColorStop(1, '#f43f5e'); // tertiary color

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Fill below the line with gradient
      ctx.lineTo(currentWidth, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const fillGradient = ctx.createLinearGradient(0, 0, width, 0);
      fillGradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
      fillGradient.addColorStop(1, 'rgba(244, 63, 94, 0.15)');

      ctx.fillStyle = fillGradient;
      ctx.fill();

      // Continue animation if not complete
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isVisible, hasAnimated]);

  return (
    <canvas ref={canvasRef} className="absolute bottom-0 left-0 w-full h-[4px]" style={{ pointerEvents: 'none' }} />
  );
};

export default WaveSeparator;
