'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface VoiceControlBarProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSeek?: (time: number) => void;
  progress: number;
  currentSection: string;
  charactersUsed: number;
  charactersLimit: number;
  currentTime?: number;
  totalDuration?: number;
}

/**
 * Voice Control Bar - Provides voice reading controls for case studies
 * Features: Play/Pause, Progress tracking, Scrubbing, Skip controls, Cost monitoring, Section display
 */
export default function VoiceControlBar({
  isPlaying,
  onPlay,
  onPause,
  onSeek,
  progress,
  currentSection,
  charactersUsed,
  charactersLimit,
  currentTime = 0,
  totalDuration = 0,
}: VoiceControlBarProps) {
  const [isVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Format time in MM:SS format
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle progress bar click and drag
  const handleProgressBarInteraction = (clientX: number) => {
    if (!progressBarRef.current || !onSeek) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = (clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(totalDuration, clickPosition * totalDuration));

    onSeek(newTime);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleProgressBarInteraction(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const dragPosition = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setDragProgress(dragPosition * 100);
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;

    setIsDragging(false);
    handleProgressBarInteraction(e.clientX);
  };

  // Mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Voice icon with gradient
  const VoiceIcon = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block">
      <defs>
        <linearGradient id="voice-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="url(#voice-gradient)" />
      <path
        d="M19 10v2a7 7 0 0 1-14 0v-2"
        stroke="url(#voice-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12 19v4" stroke="url(#voice-gradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 23h8" stroke="url(#voice-gradient)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  // Play icon
  const PlayIcon = (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );

  // Pause icon
  const PauseIcon = (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
      <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" />
    </svg>
  );

  const displayProgress = isDragging ? dragProgress : progress;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-4">
          {/* Left: Voice indicator and controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">{VoiceIcon}</div>

            {/* Play/Pause button */}
            <button
              onClick={isPlaying ? onPause : onPlay}
              className={`
                flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
                ${
                  isPlaying
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
              aria-label={isPlaying ? 'Pause voice reading' : 'Start voice reading'}
            >
              {isPlaying ? PauseIcon : PlayIcon}
            </button>
          </div>

          {/* Center: Progress bar and timing - aligned with play button */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Interactive progress bar */}
            <div
              ref={progressBarRef}
              className="relative w-full bg-gray-200 rounded-full h-1 cursor-pointer hover:h-2 transition-all duration-200"
              onMouseDown={handleMouseDown}
            >
              <motion.div
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-full rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ duration: isDragging ? 0 : 0.3 }}
              >
                {/* Draggable thumb */}
                <div
                  className={`
                    absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2
                    w-3 h-3 bg-white border-2 border-pink-500 rounded-full shadow-sm
                    transition-all duration-200
                    ${isDragging || totalDuration > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                    hover:scale-110 cursor-grab active:cursor-grabbing
                  `}
                />
              </motion.div>
            </div>

            {/* Time display */}
            {(currentTime > 0 || totalDuration > 0) && (
              <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalDuration)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Playing status section - fixed height to prevent layout shift */}
        <div className="overflow-hidden">
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-gray-100"
            >
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Playing with Imran's voice</span>
                </div>

                {/* Current section indicator */}
                {currentSection && <span className="text-xs text-gray-500">Current: {currentSection}</span>}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
