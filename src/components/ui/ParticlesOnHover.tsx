import React, { useRef, useEffect, useState } from 'react';

interface ParticlesOnHoverProps {
  className?: string;
  style?: React.CSSProperties;
}

const NUM_PARTICLES = 8;
// Use only brand colors for gradient
const GRADIENT_COLORS = ['#6366f1', '#f43f5e'];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

// Draw a star (sparkle) at (cx, cy) with given radius and a linear gradient
function drawStarWithGradient(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, points = 4) {
  const outerRadius = r;
  const innerRadius = r * 0.45;
  ctx.save();
  ctx.beginPath();
  ctx.translate(cx, cy);
  ctx.moveTo(0, -outerRadius);
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI / points) * i;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    ctx.lineTo(Math.sin(angle) * radius, -Math.cos(angle) * radius);
  }
  ctx.closePath();
  // Create a gradient for the star
  const grad = ctx.createLinearGradient(-outerRadius, 0, outerRadius, 0);
  grad.addColorStop(0, GRADIENT_COLORS[0]);
  grad.addColorStop(1, GRADIENT_COLORS[1]);
  ctx.fillStyle = grad;
  ctx.globalAlpha = 0.9;
  ctx.shadowColor = GRADIENT_COLORS[1];
  ctx.shadowBlur = 15;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.restore();
}

export const ParticlesOnHover: React.FC<ParticlesOnHoverProps> = ({ className, style }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShouldReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // Particle state
    const particles = Array.from({ length: NUM_PARTICLES }).map(() => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      r: randomBetween(5, 9),
      speed: randomBetween(0.3, 0.8),
      angle: randomBetween(0, Math.PI * 2),
      drift: randomBetween(-0.2, 0.2),
      points: 4,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        drawStarWithGradient(ctx, p.x, p.y, p.r, p.points);
        // Move
        p.x += Math.cos(p.angle) * p.speed + p.drift;
        p.y += Math.sin(p.angle) * p.speed;
        // Wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div 
      className={`${className} animate-fadeIn`} 
      style={{ 
        ...style, 
        pointerEvents: 'none', 
        position: 'absolute', 
        inset: 0,
        zIndex: 20
      }} 
      aria-hidden
    >
      <canvas ref={canvasRef} width={400} height={400} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

export default ParticlesOnHover;
