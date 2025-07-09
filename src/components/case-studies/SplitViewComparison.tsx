import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
}

interface SplitViewComparisonProps {
  wireframeImage: string;
  finalImage: string;
  hotspots: Hotspot[];
}

export default function SplitViewComparison({
  wireframeImage,
  finalImage,
  hotspots,
}: SplitViewComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.touches[0]?.clientX || 0) - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-xl overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-full cursor-col-resize"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Wireframe Image */}
        <div className="absolute inset-0">
          <Image
            src={wireframeImage}
            alt="Wireframe design"
            fill
            className="object-cover"
          />
        </div>

        {/* Final Design Image */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <Image
            src={finalImage}
            alt="Final design"
            fill
            className="object-cover"
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Hotspots */}
        {hotspots.map((hotspot) => (
          <motion.div
            key={hotspot.id}
            className="absolute w-6 h-6 bg-blue-500 rounded-full cursor-pointer"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
          >
            <div className="relative">
              {activeHotspot === hotspot.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-8 top-0 w-64 p-4 bg-white rounded-lg shadow-lg z-10"
                >
                  <h4 className="font-bold text-gray-900 mb-2">{hotspot.title}</h4>
                  <p className="text-sm text-gray-700">{hotspot.description}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
