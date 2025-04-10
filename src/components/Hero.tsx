'use client';

// Remove console log
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientTextRef = useRef<HTMLSpanElement>(null);
  const [typing, setTyping] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);

  const aiTextOptions = ['human-centered', 'intuitive', 'intelligent', 'adaptive'];

  // Create wave animation background
  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Draw waves
    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw waves
      const drawWave = (
        amplitude: number,
        wavelength: number,
        speed: number,
        lineWidth: number,
        color: string,
        offsetY: number
      ) => {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;

        for (let x = 0; x < width + 10; x += 3) {
          // Smaller increment for smoother waves
          const y = amplitude * Math.sin(x / wavelength + time * speed) + offsetY;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      };

      // Primary color (accent - indigo)
      const primaryColor = 'rgba(99, 102, 241, ';
      // Secondary color (tertiary - rose/pink)
      const secondaryColor = 'rgba(244, 63, 94, ';

      // Draw waves at the bottom of the hero section - significantly thicker lines (2px) and very close together (1% apart)
      drawWave(5, 200, 0.005, 2.0, primaryColor + '0.15)', height * 0.75);
      drawWave(6, 220, 0.006, 2.0, primaryColor + '0.2)', height * 0.755);
      drawWave(7, 250, 0.004, 2.0, primaryColor + '0.1)', height * 0.76);
      drawWave(8, 180, 0.007, 2.0, secondaryColor + '0.1)', height * 0.765);
      drawWave(6, 190, 0.008, 2.0, secondaryColor + '0.15)', height * 0.77);
      drawWave(7, 210, 0.005, 2.0, primaryColor + '0.2)', height * 0.775);
      drawWave(8, 230, 0.006, 2.0, secondaryColor + '0.1)', height * 0.78);
      drawWave(5, 170, 0.007, 2.0, primaryColor + '0.15)', height * 0.785);

      // Add a few more waves to create denser effect
      drawWave(6, 210, 0.0045, 2.0, primaryColor + '0.18)', height * 0.79);
      drawWave(7, 190, 0.0055, 2.0, secondaryColor + '0.12)', height * 0.795);
      drawWave(8, 230, 0.0065, 2.0, primaryColor + '0.16)', height * 0.8);
      drawWave(5, 200, 0.0075, 2.0, secondaryColor + '0.14)', height * 0.805);

      // Add small glowing dots
      for (let i = 0; i < 25; i++) {
        const x = (Math.sin(time * 0.0005 + i) + 1) * width * 0.5;
        const y = (Math.cos(time * 0.0008 + i * 2) + 1) * height * 0.5;
        const radius = 0.8 + Math.sin(time * 0.005 + i) * 0.3;

        // Alternate between accent and tertiary colors
        const dotColor = i % 2 === 0 ? primaryColor + '0.25)' : secondaryColor + '0.25)';

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }

      // Reduced time increment for slower animation
      time += 0.2;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);

    // Text cycling effect with more subtle transitions
    const textInterval = setInterval(() => {
      if (!typing) {
        // Start fade out
        setTextOpacity(0);
        setTyping(true);

        // After fade out, change text
        setTimeout(() => {
          setTextIndex(prev => (prev + 1) % aiTextOptions.length);
          // Start fade in
          setTextOpacity(1);

          // End typing state after complete transition
          setTimeout(() => {
            setTyping(false);
          }, 1000); // Longer delay before ending typing state
        }, 1200); // Longer delay before showing new text
      }
    }, 7000); // Change text less frequently (7 seconds)

    return () => clearInterval(textInterval);
  }, [typing]);

  // Track mouse movement for subtle AI-like responsiveness
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        // Update gradient position based on mouse (subtle neural network-like effect)
        if (gradientTextRef.current) {
          // Very subtle gradient shift
          const gradientShift = `${50 + (x / rect.width) * 3}%, ${50 + (y / rect.height) * 3}%`;
          gradientTextRef.current.style.backgroundPosition = gradientShift;
        }
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden relative bg-background">
      {/* Wave background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl">
          <span
            className={`inline-block text-accent mb-6 text-lg font-medium transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            AI Experience Designer
          </span>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight transition-all duration-700 ease-out delay-150 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Creating{' '}
            <span className="relative inline-block">
              <span
                ref={gradientTextRef}
                className="gradient-text animate-gradient"
                style={{
                  backgroundSize: '300% 300%',
                  transition: 'all 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: textOpacity,
                }}
              >
                {aiTextOptions[textIndex]}
                {typing && (
                  <span className="absolute right-[-2px] top-1/2 -translate-y-1/2 h-[60%] w-[2px] bg-accent animate-blink inline-block opacity-60"></span>
                )}
              </span>
            </span>{' '}
            experiences with purpose and precision.
          </h1>

          <p
            className={`text-lg md:text-xl text-muted mb-12 max-w-2xl leading-relaxed transition-all duration-700 ease-out delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            I'm a Product Designer specialized in AI experience design, creating thoughtful interfaces for intelligent
            systems that balance automation with human-centered control.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out delay-450 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Link href="#work" className="btn btn-primary group">
              View My Work
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link href="#contact" className="btn btn-outline group">
              Chat with my AI
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </Link>
          </div>

          <div
            className={`mt-20 pt-8 border-t border-border flex flex-col sm:flex-row gap-8 text-sm text-muted transition-all duration-700 ease-out delay-600 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <div className="hover-scale">
              <p className="font-medium mb-1">Email</p>
              <a href="mailto:your.email@example.com" className="hover:text-accent transition-colors">
                your.email@example.com
              </a>
            </div>
            <div className="hover-scale">
              <p className="font-medium mb-1">Location</p>
              <span>[Your City], [Country]</span>
            </div>
            <div className="hover-scale">
              <p className="font-medium mb-1">Available For</p>
              <span className="text-accent">AI Design Consulting & Full-time Opportunities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
        <span className="text-xs uppercase tracking-wider mb-2 text-muted">Scroll</span>
        <div className="w-0.5 h-12 bg-accent/20 relative overflow-hidden">
          <div className="w-full h-1/2 bg-accent absolute top-0 left-0 animate-scrollDown"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
