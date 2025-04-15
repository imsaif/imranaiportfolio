'use client';

import { useEffect, useRef, useMemo } from 'react';

// Define Brand Colors (derived from globals.css)
const COLORS = {
  accent: { r: 99, g: 102, b: 241 }, // #6366f1
  secondary: { r: 16, g: 185, b: 129 }, // #10b981
  tertiary: { r: 244, g: 63, b: 94 }, // #f43f5e
};

interface WaveBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  waveCount?: number;
  amplitudeRange?: [number, number];
  wavelengthRange?: [number, number];
  speedRange?: [number, number];
  offsetYMultiplierRange?: [number, number];
  alpha?: number; // Single alpha for all colors
  dotCount?: number;
}

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const WaveBackground: React.FC<WaveBackgroundProps> = ({
  className = 'absolute inset-0 w-full h-full',
  style = { zIndex: 0 },
  waveCount = 6,
  amplitudeRange = [4, 7], // Default amplitude for curvier waves
  wavelengthRange = [170, 250],
  speedRange = [0.004, 0.008],
  offsetYMultiplierRange = [0.1, 0.15], // Default offset range
  alpha = 0.15, // Default alpha
  dotCount = 25,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const waveParams = useMemo(() => {
    const params = [];
    const [minOffsetY, maxOffsetY] = offsetYMultiplierRange;
    const step = waveCount > 1 ? (maxOffsetY - minOffsetY) / (waveCount - 1) : 0;
    const colorKeys = Object.keys(COLORS) as Array<keyof typeof COLORS>;

    for (let i = 0; i < waveCount; i++) {
      params.push({
        amplitude: randomInRange(amplitudeRange[0], amplitudeRange[1]),
        wavelength: randomInRange(wavelengthRange[0], wavelengthRange[1]),
        speed: randomInRange(speedRange[0], speedRange[1]),
        offsetYMultiplier: minOffsetY + i * step,
        // Cycle through accent, tertiary, secondary
        colorKey: colorKeys[i % colorKeys.length],
      });
    }
    return params;
  }, [waveCount, amplitudeRange, wavelengthRange, speedRange, offsetYMultiplierRange]);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const draw = () => {
      const bufferWidth = canvas.width;
      const bufferHeight = canvas.height;
      const { width: renderedWidth, height: renderedHeight } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, bufferWidth, bufferHeight);

      // Draw waves based on memoized parameters
      waveParams.forEach(param => {
        const color = COLORS[param.colorKey];
        const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;

        ctx.beginPath();
        ctx.lineWidth = 2.0;
        ctx.strokeStyle = rgbaColor;
        const actualOffsetY = renderedHeight * param.offsetYMultiplier;

        for (let x = 0; x < renderedWidth + 10; x += 3) {
          const y = param.amplitude * Math.sin(x / param.wavelength + time * param.speed) + actualOffsetY;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Draw dots based on dotCount prop
      for (let i = 0; i < dotCount; i++) {
        const x = (Math.sin(time * 0.0005 + i) + 1) * renderedWidth * 0.5;
        const y = (Math.cos(time * 0.0008 + i * 2) + 1) * renderedHeight * 0.5;
        const radius = 0.8 + Math.sin(time * 0.005 + i) * 0.3;
        // Cycle dot colors through brands, slightly more opaque
        const dotColorKey = Object.keys(COLORS)[i % Object.keys(COLORS).length] as keyof typeof COLORS;
        const dotColor = COLORS[dotColorKey];
        const dotRgbaColor = `rgba(${dotColor.r}, ${dotColor.g}, ${dotColor.b}, ${alpha + 0.1})`;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = dotRgbaColor;
        ctx.fill();
      }

      time += 0.2;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [waveParams, alpha, dotCount]); // Updated dependencies

  return <canvas ref={canvasRef} className={className} style={style} />;
};

export default WaveBackground; 