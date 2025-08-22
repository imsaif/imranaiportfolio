'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';

import { useMouseTracking } from '../../../hooks/useMouseTracking';

interface MouseState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);
  const frameRef = useRef(0);
  const mouseState = useRef<MouseState>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  });

  // Add mouse tracking with smooth transitions, use containerRef
  const { elementRef: containerRef } = useMouseTracking<HTMLDivElement>({
    onMouseMove: (element, position) => {
      if (!element) return;

      // Calculate relative mouse position
      const rect = element.getBoundingClientRect();
      const x = (position.x - rect.left) / rect.width;
      const y = (position.y - rect.top) / rect.height;

      // Update target position for smooth transition
      mouseState.current.targetX = x;
      mouseState.current.targetY = y;
    },
  });

  // Smooth mouse movement update
  const updateMousePosition = useCallback(() => {
    const SMOOTH_FACTOR = 0.1;

    mouseState.current.x += (mouseState.current.targetX - mouseState.current.x) * SMOOTH_FACTOR;
    mouseState.current.y += (mouseState.current.targetY - mouseState.current.y) * SMOOTH_FACTOR;
  }, []);

  // Device detection: run only on mount
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasLowMemory = !!(navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
    setIsLowPowerDevice(isMobile || hasLowMemory);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size to match its display size
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let time = 0;
    let lastTime = 0;

    // Simplified configuration for low-power devices
    const getConfig = () => {
      if (isLowPowerDevice) {
        return {
          waveStep: 10, // Larger step size (less detail)
          waveCount: [10, 8], // Fewer waves
          skipFrames: 2, // Only render every 3rd frame
        };
      }
      return {
        waveStep: 5,
        waveCount: [20, 15],
        skipFrames: 0,
      };
    };

    // Draw wave lines
    const draw = (timestamp: number) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      time += Math.min(deltaTime * 0.0002, 0.01); // Cap max time step

      // Throttle for low-power devices
      const config = getConfig();
      if (config.skipFrames > 0) {
        frameRef.current = (frameRef.current + 1) % (config.skipFrames + 1);
        if (frameRef.current !== 0) {
          frameRef.current = requestAnimationFrame(draw);
          return;
        }
      }

      updateMousePosition();

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw waves without parallax translation
      ctx.save();
      drawWaves(ctx, canvas.width, canvas.height, time, config);
      ctx.restore();

      // Continue animation loop
      frameRef.current = requestAnimationFrame(draw);
    };

    // Draw complex wave patterns
    const drawWaves = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      time: number,
      config: { waveStep: number; waveCount: number[] }
    ) => {
      const { x: mouseX, y: mouseY } = mouseState.current;

      // Calculate mouse influence with distance falloff
      const distortionX = (mouseX - 0.5) * 200; // Increased range for more noticeable effect
      const distortionY = (mouseY - 0.5) * 150;

      // Create gradient backgrounds for waves using theme colors
      const createGradient = (x1: number, y1: number, x2: number, y2: number) => {
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.08)'); // --accent
        gradient.addColorStop(0.5, 'rgba(244, 63, 94, 0.07)'); // --tertiary
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.06)'); // --accent
        return gradient;
      };

      // Add a subtle gradient layer under everything
      ctx.fillStyle = createGradient(0, 0, width, height);
      ctx.globalAlpha = 0.25;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;

      // Primary waves
      const waveGroups = [
        {
          // Bottom left to top right waves
          count: config.waveCount[0],
          color: (i: number) => `rgba(99, 102, 241, ${0.08 - i * 0.002})`, // --accent
          gradientColor: (i: number) => i % 3 === 0 && !isLowPowerDevice, // Skip gradients on low power
          startY: height * 0.9,
          endY: height * 0.1,
          amplitude: (i: number) => 50 + i * 5,
          frequency: (i: number) => 0.003 + i * 0.0001,
          speed: 1,
        },
        {
          // Secondary crossing waves
          count: config.waveCount[1],
          color: (i: number) => `rgba(244, 63, 94, ${0.07 - i * 0.002})`, // --tertiary
          gradientColor: (i: number) => i % 2 === 0 && !isLowPowerDevice,
          startY: height * 0.7,
          endY: height * 0.2,
          amplitude: (i: number) => 40 + i * 4,
          frequency: (i: number) => 0.004 + i * 0.0001,
          speed: 0.8,
        },
      ];

      // Draw each wave group
      waveGroups.forEach(group => {
        // Process fewer waves on low-power devices
        const effectiveCount = group.count ?? 0;

        for (let i = 0; i < effectiveCount; i++) {
          // Skip every other wave on low power devices
          if (isLowPowerDevice && i % 2 !== 0) continue;

          const progress = effectiveCount > 1 ? i / (effectiveCount - 1) : 0;
          const offsetY = group.startY + (group.endY - group.startY) * progress;

          ctx.beginPath();

          // Use gradient for some waves to create variety
          if (group.gradientColor(i)) {
            ctx.strokeStyle = createGradient(0, offsetY - 50, width, offsetY + 50);
          } else {
            ctx.strokeStyle = group.color(i);
          }

          ctx.lineWidth = 0.8;

          // Draw complex wave with mouse influence
          for (let x = 0; x < width; x += config.waveStep) {
            const amplitude = group.amplitude(i);
            const frequency = group.frequency(i);

            // Calculate distance from mouse for localized effect
            const dx = x / width - mouseX;
            const dy = offsetY / height - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - distance * 2);

            // Enhanced wave calculation with mouse influence
            const y =
              offsetY +
              Math.sin(x * frequency + time * group.speed + distortionX * 0.01 * influence) *
                (amplitude + distortionY * influence) +
              Math.sin(x * frequency * 0.5 + time * group.speed * 1.2) * (amplitude * 0.3);

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.stroke();

          // Add gradient fill below some waves - skip on low power devices
          if (!isLowPowerDevice && i % 5 === 0 && i < (group.count ?? 0) / 2) {
            const fillGradient = ctx.createLinearGradient(0, offsetY, width, offsetY);
            fillGradient.addColorStop(0, 'rgba(99, 102, 241, 0.03)'); // --accent
            fillGradient.addColorStop(0.5, 'rgba(244, 63, 94, 0.04)'); // --tertiary
            fillGradient.addColorStop(1, 'rgba(99, 102, 241, 0.03)'); // --accent

            ctx.fillStyle = fillGradient;
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fill();
          }
        }
      });
    };

    // Start animation with requestAnimationFrame for better performance
    frameRef.current = requestAnimationFrame(draw);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [updateMousePosition, isLowPowerDevice]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-0">
      <canvas ref={canvasRef} className="w-full h-full" style={{ pointerEvents: 'none' }} />
    </div>
  );
};

export default HeroBackground;
