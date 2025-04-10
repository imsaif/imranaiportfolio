'use client';

import { useEffect, useRef } from 'react';

const BackgroundWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let time = 0;

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle waves with blue tones
      for (let i = 0; i < 4; i++) {
        const yOffset = canvas.height * 0.65 + i * 70;

        ctx.beginPath();

        for (let x = 0; x < canvas.width; x += 5) {
          const y = Math.sin((x + time) / 250) * 30 + Math.sin((x + time) / 120) * 15 + yOffset;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Blue tones for waves, matching the bubbles
        ctx.strokeStyle = `rgba(33, 85, 205, ${0.06 - i * 0.01})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      time += 0.7; // Speed of wave movement
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none opacity-70" />;
};

export default BackgroundWaves;
