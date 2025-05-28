'use client';

import { motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { getSectionOrder, formatSectionName } from '@/data/caseStudyVoiceScript';
import { caseStudyVoiceService } from '@/services/caseStudyVoiceService';

/**
 * Voice Timestamp Debugger
 * Helps fine-tune section timestamps by providing real-time audio controls
 */
export default function VoiceTimestampDebugger() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [customSections, setCustomSections] = useState<
    Array<{ key: string; name: string; start: number; end: number }>
  >([]);
  const [isEditingCustom, setIsEditingCustom] = useState(false);

  // Get current timestamps from service
  const timestamps = caseStudyVoiceService.getSectionTimestamps();
  const sectionOrder = getSectionOrder();

  useEffect(() => {
    // Initialize audio
    const audio = new Audio('/audio/case-study/eduscheduler-complete.mp3');
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
      console.log('Audio loaded successfully. Duration:', audio.duration);
    };

    audio.onended = () => {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    audio.onerror = e => {
      console.error('Audio loading error:', e);
      console.error('Audio error details:', {
        error: audio.error,
        networkState: audio.networkState,
        readyState: audio.readyState,
        src: audio.src,
      });
    };

    audio.oncanplay = () => {
      console.log('Audio can play');
    };

    audio.onloadstart = () => {
      console.log('Audio load started');
    };

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      audio.pause();
    };
  }, []);

  const startTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const time = audioRef.current.currentTime;
        setCurrentTime(time);

        // Find current section
        const section = findCurrentSection(time);
        setCurrentSection(section);
      }
    }, 100); // Update every 100ms for smooth tracking
  };

  const findCurrentSection = (time: number): string => {
    for (const [sectionKey, timestamp] of Object.entries(timestamps)) {
      if (time >= timestamp.start && time <= timestamp.end) {
        return sectionKey;
      }
    }
    return '';
  };

  const handlePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      try {
        console.log('Attempting to play audio...');
        console.log('Audio src:', audioRef.current.src);
        console.log('Audio readyState:', audioRef.current.readyState);
        console.log('Audio networkState:', audioRef.current.networkState);

        await audioRef.current.play();
        setIsPlaying(true);
        startTimeTracking();
        console.log('Audio playback started successfully');
      } catch (error) {
        console.error('Failed to play audio:', error);
        alert(`Audio playback failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const handleSeek = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const seekToSection = (sectionKey: string) => {
    const timestamp = timestamps[sectionKey];
    if (timestamp && audioRef.current) {
      audioRef.current.currentTime = timestamp.start;
      setCurrentTime(timestamp.start);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const copyTimestamps = () => {
    const timestampCode = `
// Updated timestamps - copy this to your voice service
private sectionTimestamps: { [key: string]: SectionTimestamp } = {
${Object.entries(timestamps)
  .map(([key, ts]) => `  ${key}: { start: ${ts.start}, end: ${ts.end}, characters: ${ts.characters} }`)
  .join(',\n')}
};`;

    navigator.clipboard.writeText(timestampCode);
    alert('Timestamps copied to clipboard!');
  };

  const testAudioFile = async () => {
    try {
      const response = await fetch('/audio/case-study/eduscheduler-complete.mp3', { method: 'HEAD' });
      if (response.ok) {
        alert(`Audio file found! Status: ${response.status}, Size: ${response.headers.get('content-length')} bytes`);
      } else {
        alert(`Audio file not accessible! Status: ${response.status}`);
      }
    } catch (error) {
      alert(`Error checking audio file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const addCustomSection = () => {
    const sectionName = prompt('Enter section name:');
    if (!sectionName) return;

    const newSection = {
      key: `custom_${Date.now()}`,
      name: sectionName,
      start: currentTime,
      end: currentTime + 10, // Default 10 seconds, can be adjusted
    };

    setCustomSections(prev => [...prev, newSection]);
  };

  const exportCustomSections = () => {
    const sectionsCode = `
// Custom sections based on actual audio content
const customSections = [
${customSections
  .map(
    section =>
      `  { key: '${section.key}', name: '${section.name}', start: ${section.start.toFixed(2)}, end: ${section.end.toFixed(2)} }`
  )
  .join(',\n')}
];`;

    navigator.clipboard.writeText(sectionsCode);
    alert('Custom sections copied to clipboard!');
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
        >
          🎵 Debug Timestamps
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-xl shadow-xl p-6 w-96 max-h-96 overflow-y-auto z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Voice Timestamp Debugger</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* Audio Controls */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={handlePlay}
            className={`px-4 py-2 rounded-lg ${isPlaying ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <span className="text-sm text-gray-600">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-100"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>

        {/* Current Section */}
        <div className="text-sm">
          <strong>Current Section:</strong> {currentSection ? formatSectionName(currentSection) : 'None'}
        </div>
      </div>

      {/* Section List */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Predefined Sections:</h4>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {sectionOrder.map(sectionKey => {
            const timestamp = timestamps[sectionKey];
            const isActive = currentSection === sectionKey;

            return (
              <div
                key={sectionKey}
                className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                  isActive ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => seekToSection(sectionKey)}
              >
                <div className="font-medium">{formatSectionName(sectionKey)}</div>
                <div className="text-gray-600">
                  {formatTime(timestamp.start)} - {formatTime(timestamp.end)}
                  <span className="ml-2">({timestamp.characters} chars)</span>
                  <span className="ml-2 text-purple-600">→ {timestamp.elementId}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Sections */}
      {customSections.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Custom Sections (Based on Actual Audio):</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {customSections.map(section => (
              <div key={section.key} className="p-2 rounded text-xs bg-green-50 border border-green-200">
                <div className="font-medium">{section.name}</div>
                <div className="text-gray-600">
                  {formatTime(section.start)} - {formatTime(section.end)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-2">
        <button
          onClick={testAudioFile}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          🔍 Test Audio File
        </button>

        <button
          onClick={copyTimestamps}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          📋 Copy Timestamps Code
        </button>

        <button
          onClick={addCustomSection}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          ➕ Add Custom Section
        </button>

        <button
          onClick={exportCustomSections}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          📋 Export Custom Sections
        </button>

        <div className="text-xs text-gray-600">
          <strong>Instructions:</strong>
          <ol className="list-decimal list-inside mt-1 space-y-1">
            <li>Play the audio and listen to each section</li>
            <li>When you hear a new section start, click "➕ Add Custom Section"</li>
            <li>Enter the section name (e.g., "Introduction", "Problem", etc.)</li>
            <li>Continue for all sections in your audio</li>
            <li>Click "📋 Export Custom Sections" to get the code</li>
            <li>Use this to update your voice service</li>
          </ol>
        </div>
      </div>
    </motion.div>
  );
}
