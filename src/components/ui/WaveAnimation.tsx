'use client';

import { useEffect, useRef } from 'react';

interface WaveAnimationProps {
  className?: string;
}

const WaveAnimation = ({ className = '' }: WaveAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.getBoundingClientRect().height;

      // Removed DPR scaling to reduce rendering load

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        draw();
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Extremely simplified draw function - just 2 waves
    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Reduced to just 2 waves
      const waveConfig = [
        { color: 'rgba(99, 102, 241, 0.12)', amplitude: 7, wavelength: width / 6, speed: 0.002, offsetY: height * 0.3 },
        { color: 'rgba(244, 63, 94, 0.09)', amplitude: 5, wavelength: width / 5, speed: 0.0015, offsetY: height * 0.7 },
      ];

      // Draw each wave with much larger step size
      waveConfig.forEach(wave => {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = wave.color;

        // Use much larger step size for better performance
        const step = Math.max(8, Math.floor(width / 100));

        for (let x = 0; x <= width; x += step) {
          const y = wave.amplitude * Math.sin(x / wave.wavelength + time * wave.speed) + wave.offsetY;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      // Removed glowing dots completely

      time += 0.5; // Slower animation
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Reduce animation frame rate for Windows with proper typing
    if (navigator.userAgent.indexOf('Windows') !== -1) {
      const originalRAF = window.requestAnimationFrame;
      let lastRAFTime = 0;

      // Use a simpler throttling approach to avoid TypeScript errors
      const throttledRAF = (callback: FrameRequestCallback): number => {
        const currentTime = Date.now();
        if (currentTime - lastRAFTime < 50) {
          // Limit to ~20fps on Windows
          const timeoutId = window.setTimeout(() => {
            lastRAFTime = Date.now();
            callback(performance.now());
          }, 50);
          // Store timeout ID in a way that doesn't confuse TypeScript
          // @ts-ignore - This is a valid workaround for the animation frame ID
          return timeoutId;
        }
        lastRAFTime = currentTime;
        return originalRAF(callback);
      };

      window.requestAnimationFrame = throttledRAF;
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
      }}
    />
  );
};

export default WaveAnimation;
