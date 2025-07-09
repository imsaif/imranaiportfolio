'use client';

// Remove console log
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useChatToggle } from '../../context/ChatToggleProvider';
import { WaveBackground } from '../WaveBackground'; // Import the new component

const Hero = () => {
  const { isChatOpen, toggleChat } = useChatToggle();
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const gradientTextRef = useRef<HTMLSpanElement>(null);
  const [typing, setTyping] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);

  const aiTextOptions = ['human-centered', 'intuitive', 'intelligent', 'adaptive'];

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

  return (
    <section ref={heroRef} className="pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden relative bg-background">
      {/* Use WaveBackground component for the bottom half with default props */}
      <WaveBackground
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{ zIndex: 0 }}
        // No specific props needed, defaults match the previous state:
        // waveCount = 6
        // amplitudeRange = [2.5, 4]
        // offsetYMultiplierRange = [0.1, 0.15]
      />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl">
          <span
            className={`inline-block text-accent mb-6 text-lg font-normal transition-all duration-700 ease-out ${
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
            className={`text-lg md:text-xl text-muted mb-12 max-w-2xl leading-relaxed font-normal transition-all duration-700 ease-out delay-300 ${
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
              <p className="font-normal mb-1">Email</p>
              <a href="mailto:your.email@example.com" className="hover:text-accent transition-colors font-normal">
                your.email@example.com
              </a>
            </div>
            <div className="hover-scale">
              <p className="font-normal mb-1">Location</p>
              <span className="font-normal">[Your City], [Country]</span>
            </div>
            <div className="hover-scale">
              <p className="font-normal mb-1">Available For</p>
              <span className="text-accent font-normal">AI Design Consulting & Full-time Opportunities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
        <span className="text-xs uppercase tracking-wider mb-2 text-muted font-normal">Scroll</span>
        <div className="w-0.5 h-12 bg-accent/20 relative overflow-hidden">
          <div className="w-full h-1/2 bg-accent absolute top-0 left-0 animate-scrollDown"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
