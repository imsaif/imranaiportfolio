'use client';

import React, { useEffect, useRef } from 'react';
import { MdTrendingUp, MdGroup, MdLightbulb } from 'react-icons/md';
import { strategicVisionData } from '@/data/leadership';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const StrategicVision = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'strategy':
        return <MdTrendingUp className="w-8 h-8 text-gray-600" />;
      case 'team':
        return <MdGroup className="w-8 h-8 text-gray-600" />;
      case 'innovation':
        return <MdLightbulb className="w-8 h-8 text-gray-600" />;
      default:
        return <MdTrendingUp className="w-8 h-8 text-gray-600" />;
    }
  };

  const getGradient = (iconType: string) => {
    switch (iconType) {
      case 'strategy':
        return 'from-blue-500 to-blue-600';
      case 'team':
        return 'from-purple-500 to-purple-600';
      case 'innovation':
        return 'from-green-500 to-green-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.9
      });

      // Timeline for initial load animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate title and description
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

      // Animate cards with stagger
      tl.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.2");


      // Add metric counter animations
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const metric = card.querySelector('.metric-number');
          if (metric) {
            const finalValue = metric.textContent || '';

            ScrollTrigger.create({
              trigger: card,
              start: "top 70%",
              onEnter: () => {
                // Extract number from text for animation
                const match = finalValue.match(/(\d+)/);
                if (match) {
                  const number = parseInt(match[1]);
                  gsap.fromTo(metric,
                    { textContent: 0 },
                    {
                      textContent: number,
                      duration: 2,
                      ease: "power2.out",
                      snap: { textContent: 1 },
                      modifiers: {
                        textContent: function(value) {
                          return finalValue.replace(/\d+/, Math.round(value).toString());
                        }
                      }
                    }
                  );
                }
              }
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Helper function to set card ref
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 bg-background">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        {/* Title and Description */}
        <div className="text-center mb-12 md:mb-16">
          <h2 ref={titleRef} className="section-title text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            Strategic Leadership
          </h2>
          <p ref={descriptionRef} className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Driving design excellence through strategic vision, team building, and systematic innovation
          </p>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Design Strategy */}
          <div ref={setCardRef(0)} className="group">
            <div className="relative">
              {/* Gradient Background */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${getGradient(strategicVisionData.designStrategy.icon)} rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>

              {/* Card Content */}
              <div className="relative bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-6 icon-container">
                    {getIcon(strategicVisionData.designStrategy.icon)}
                  </div>

                  {/* Metric */}
                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900 metric-number">
                      {strategicVisionData.designStrategy.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {strategicVisionData.designStrategy.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {strategicVisionData.designStrategy.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Building */}
          <div ref={setCardRef(1)} className="group">
            <div className="relative">
              {/* Gradient Background */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${getGradient(strategicVisionData.teamBuilding.icon)} rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>

              {/* Card Content */}
              <div className="relative bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-6 icon-container">
                    {getIcon(strategicVisionData.teamBuilding.icon)}
                  </div>

                  {/* Metric */}
                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900 metric-number">
                      {strategicVisionData.teamBuilding.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {strategicVisionData.teamBuilding.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {strategicVisionData.teamBuilding.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Innovation */}
          <div ref={setCardRef(2)} className="group">
            <div className="relative">
              {/* Gradient Background */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${getGradient(strategicVisionData.innovation.icon)} rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>

              {/* Card Content */}
              <div className="relative bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-6 icon-container">
                    {getIcon(strategicVisionData.innovation.icon)}
                  </div>

                  {/* Metric */}
                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900 metric-number">
                      {strategicVisionData.innovation.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {strategicVisionData.innovation.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {strategicVisionData.innovation.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicVision;