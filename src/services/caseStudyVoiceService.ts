/**
 * Case Study Voice Synthesis Service
 * Handles voice playback using a single pre-generated audio file with timestamp-based section tracking
 */

import {
  eduSchedulerVoiceScript,
  getSectionOrder,
  formatSectionName,
  type VoiceScriptSection,
} from '../data/caseStudyVoiceScript';

export interface VoicePlaybackCallbacks {
  onProgress: (progress: number) => void;
  onSectionChange: (sectionKey: string, sectionName: string) => void;
  onCharacterUsage: (charactersUsed: number) => void;
  onError: (error: string) => void;
  onComplete: () => void;
}

interface SectionTimestamp {
  start: number;
  end: number;
  characters: number;
  elementId: string;
}

interface VoiceServiceState {
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  totalDuration: number;
  currentSection: string;
}

export class CaseStudyVoiceService {
  private currentAudio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private isPaused = false;
  private currentSectionKey = '';
  private lastSectionKey = '';
  private totalCharactersUsed = 0;
  private callbacks: VoicePlaybackCallbacks | null = null;
  private audioUrl = '/audio/case-study/eduscheduler-complete.mp3';

  // Updated timestamp mapping based on user's provided timestamps
  private sectionTimestamps: { [key: string]: SectionTimestamp } = {
    introduction: { start: 0, end: 10, characters: 150, elementId: 'overview' },
    problem: { start: 10, end: 30, characters: 280, elementId: 'challenge' },
    research: { start: 30, end: 37, characters: 320, elementId: 'user-research' },
    userPersonas: { start: 37, end: 57, characters: 240, elementId: 'user-personas' },
    solution: { start: 57, end: 73, characters: 240, elementId: 'design-process' }, // 1:13 = 73 seconds
    approach: { start: 73, end: 85, characters: 180, elementId: 'design-process' }, // 1:25 = 85 seconds
    impact: { start: 85, end: 96, characters: 280, elementId: 'conclusion' }, // 1:36 = 96 seconds
    quote: { start: 96, end: 107, characters: 200, elementId: 'conclusion' }, // 1:47 = 107 seconds
    lessons: { start: 107, end: 119, characters: 160, elementId: 'lessons' }, // 1:59 = 119 seconds
    conclusion: { start: 119, end: 130, characters: 200, elementId: 'conclusion' },
  };

  constructor() {
    this.reset();
  }

  /**
   * Start playing the case study audio
   */
  async playScript(callbacks: VoicePlaybackCallbacks): Promise<void> {
    this.callbacks = callbacks;

    try {
      // Check if audio file exists
      const fileExists = await this.checkAudioFileExists(this.audioUrl);
      if (!fileExists) {
        throw new Error(
          'Audio file not found. Please ensure eduscheduler-complete.mp3 is in /public/audio/case-study/'
        );
      }

      // Start playback
      this.isPlaying = true;
      this.isPaused = false;
      this.currentSectionKey = 'introduction';
      this.totalCharactersUsed = 0;

      await this.startAudioPlayback();
    } catch (error) {
      console.error('Error starting voice playback:', error);
      this.callbacks?.onError(error instanceof Error ? error.message : 'Unknown error');
      this.stop();
    }
  }

  /**
   * Start audio playback with event listeners
   */
  private async startAudioPlayback(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.currentAudio = new Audio(this.audioUrl);

        // Set up event listeners
        this.currentAudio.onloadedmetadata = () => {
          console.log('Audio loaded, duration:', this.currentAudio?.duration);
          resolve();
        };

        this.currentAudio.oncanplay = () => {
          this.currentAudio?.play().catch(error => {
            console.error('Error playing audio:', error);
            this.callbacks?.onError('Failed to play audio. Please check your browser permissions.');
          });
        };

        this.currentAudio.ontimeupdate = () => {
          if (this.currentAudio && this.isPlaying) {
            const currentTime = this.currentAudio.currentTime;
            const duration = this.currentAudio.duration || 1;
            const progress = (currentTime / duration) * 100;

            this.callbacks?.onProgress(progress);
            this.updateCurrentSection(currentTime);
          }
        };

        this.currentAudio.onended = () => {
          this.callbacks?.onComplete();
          this.stop();
        };

        this.currentAudio.onerror = error => {
          console.error('Audio error:', error);
          this.callbacks?.onError('Audio playback error');
          reject(error);
        };

        // Load the audio
        this.currentAudio.load();
      } catch (error) {
        console.error('Error setting up audio:', error);
        reject(error);
      }
    });
  }

  /**
   * Pause audio playback
   */
  pause(): void {
    if (this.currentAudio && this.isPlaying) {
      this.currentAudio.pause();
      this.isPlaying = false;
      this.isPaused = true;
    }
  }

  /**
   * Resume audio playback
   */
  async resume(): Promise<void> {
    if (this.currentAudio && this.isPaused) {
      try {
        await this.currentAudio.play();
        this.isPlaying = true;
        this.isPaused = false;
      } catch (error) {
        console.error('Error resuming audio:', error);
        this.callbacks?.onError('Failed to resume audio playback');
      }
    }
  }

  /**
   * Stop audio playback and reset
   */
  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    this.reset();
  }

  /**
   * Seek to specific time in audio
   */
  seekToTime(time: number): void {
    if (this.currentAudio) {
      this.currentAudio.currentTime = Math.max(0, Math.min(time, this.currentAudio.duration || 0));
    }
  }

  /**
   * Get current service state
   */
  getState(): VoiceServiceState {
    return {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentTime: this.currentAudio?.currentTime || 0,
      totalDuration: this.currentAudio?.duration || 0,
      currentSection: this.currentSectionKey,
    };
  }

  /**
   * Get section timestamps for debugging
   */
  getSectionTimestamps(): { [key: string]: SectionTimestamp } {
    return this.sectionTimestamps;
  }

  /**
   * Reset service state
   */
  private reset(): void {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentSectionKey = '';
    this.lastSectionKey = '';
    this.totalCharactersUsed = 0;
    this.callbacks = null;
  }

  /**
   * Check if audio file exists
   */
  private async checkAudioFileExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Update current section based on timestamp and trigger autoscroll
   */
  private updateCurrentSection(currentTime: number): void {
    const newSectionKey = this.getCurrentSectionKey(currentTime);

    if (newSectionKey && newSectionKey !== this.lastSectionKey) {
      this.currentSectionKey = newSectionKey;
      this.lastSectionKey = newSectionKey;

      // Update UI
      this.callbacks?.onSectionChange(newSectionKey, formatSectionName(newSectionKey));

      // Trigger autoscroll to the current section
      this.scrollToSection(newSectionKey);

      // Update character usage
      this.updateCharacterUsage(newSectionKey);
    }
  }

  /**
   * Get current section key based on timestamp
   */
  private getCurrentSectionKey(currentTime: number): string {
    for (const [sectionKey, timestamp] of Object.entries(this.sectionTimestamps)) {
      if (currentTime >= timestamp.start && currentTime < timestamp.end) {
        return sectionKey;
      }
    }
    return '';
  }

  /**
   * Scroll to the section element with smooth animation
   */
  private scrollToSection(sectionKey: string): void {
    const timestamp = this.sectionTimestamps[sectionKey];
    if (!timestamp) return;

    const elementId = timestamp.elementId;
    const element = document.getElementById(elementId);

    if (element) {
      // Smooth scroll to element with offset for fixed header
      const headerOffset = 100; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      console.log(`Auto-scrolled to section: ${formatSectionName(sectionKey)} (${elementId})`);
    } else {
      console.warn(`Element with ID '${elementId}' not found for section '${sectionKey}'`);
    }
  }

  /**
   * Update character usage tracking
   */
  private updateCharacterUsage(sectionKey: string): void {
    const timestamp = this.sectionTimestamps[sectionKey];
    if (timestamp) {
      // Calculate cumulative characters used up to current section
      const sectionOrder = getSectionOrder();
      const currentIndex = sectionOrder.indexOf(sectionKey);

      this.totalCharactersUsed = sectionOrder.slice(0, currentIndex + 1).reduce((total, key) => {
        const sectionTimestamp = this.sectionTimestamps[key];
        return total + (sectionTimestamp?.characters || 0);
      }, 0);

      this.callbacks?.onCharacterUsage(this.totalCharactersUsed);
    }
  }
}

// Export singleton instance
export const caseStudyVoiceService = new CaseStudyVoiceService();
