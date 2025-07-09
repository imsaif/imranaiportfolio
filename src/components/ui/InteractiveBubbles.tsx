'use client';

import { useEffect, useRef, useState } from 'react';

interface Bubble {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface InteractiveBubblesProps {
  containerId: string;
}

const InteractiveBubbles = ({ containerId }: InteractiveBubblesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [containerFound, setContainerFound] = useState(false);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number>();

  // Initialize and handle resize - with debug logging
  useEffect(() => {
    console.log(`Looking for container with ID: ${containerId}`);
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(`Container with ID "${containerId}" not found!`);
      return;
    }

    console.log('Container found!', container);
    containerRef.current = container;
    setContainerFound(true);

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newDimensions = {
          width: rect.width,
          height: rect.height,
        };
        console.log('Container dimensions:', newDimensions);
        setDimensions(newDimensions);

        if (canvasRef.current) {
          canvasRef.current.width = rect.width;
          canvasRef.current.height = rect.height;
        }
      }
    };

    // Create bubbles
    const initializeBubbles = () => {
      if (!containerRef.current) return;

      const bubbles: Bubble[] = [];
      // Debug colors - bright and very visible
      const colors = [
        'rgba(255, 0, 0, 0.7)', // Bright red
        'rgba(0, 0, 255, 0.7)', // Bright blue
        'rgba(0, 255, 0, 0.7)', // Bright green
        'rgba(255, 255, 0, 0.7)', // Bright yellow
      ];

      // Create fewer, larger bubbles for debugging
      for (let i = 0; i < 20; i++) {
        bubbles.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size: Math.random() * 10 + 10, // Larger: 10-20px
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      console.log(`Created ${bubbles.length} bubbles`);
      bubblesRef.current = bubbles;
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    // Initialize after dimensions are set
    setTimeout(() => {
      console.log('Initializing bubbles after timeout');
      initializeBubbles();
    }, 500);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [containerId]);

  // Animation loop with error handling
  useEffect(() => {
    if (!canvasRef.current || !containerFound || dimensions.width === 0) {
      console.log('Canvas or dimensions not ready yet');
      return;
    }

    console.log('Starting animation loop');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    const animate = () => {
      try {
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw a border around canvas for debugging
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        if (bubblesRef.current.length === 0) {
          console.warn('No bubbles to animate');
          // Draw text in canvas for debugging
          ctx.fillStyle = 'red';
          ctx.font = '16px Arial';
          ctx.fillText('No bubbles to animate', 20, 40);
        }

        // Draw and update bubbles
        bubblesRef.current.forEach(bubble => {
          // Move bubbles
          bubble.x += bubble.speedX;
          bubble.y += bubble.speedY;

          // Draw bubble
          ctx.beginPath();
          ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
          ctx.fillStyle = bubble.color;
          ctx.fill();

          // Wrap bubbles around the container
          if (bubble.x < -bubble.size) bubble.x = canvas.width + bubble.size;
          if (bubble.x > canvas.width + bubble.size) bubble.x = -bubble.size;
          if (bubble.y < -bubble.size) bubble.y = canvas.height + bubble.size;
          if (bubble.y > canvas.height + bubble.size) bubble.y = -bubble.size;
        });
      } catch (error) {
        console.error('Error in animation loop:', error);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, containerFound]);

  if (!containerFound) {
    return <div className="p-4 bg-red-100 text-red-700">Container not found!</div>;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{
        border: '1px dashed blue',
        zIndex: 5, // Higher z-index for debugging
        opacity: 1, // Full opacity for debugging
      }}
    />
  );
};

export default InteractiveBubbles;
