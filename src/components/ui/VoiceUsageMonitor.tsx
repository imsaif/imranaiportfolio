'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { voiceBotRateLimiter, VoiceRateLimits, VoiceUsageStats } from '../../services/voiceBotRateLimit';

interface VoiceUsageMonitorProps {
  isVisible: boolean;
  onClose?: () => void;
}

const VoiceUsageMonitor: React.FC<VoiceUsageMonitorProps> = ({ isVisible, onClose }) => {
  const [usage, setUsage] = useState<VoiceUsageStats | null>(null);
  const [limits, setLimits] = useState<VoiceRateLimits | null>(null);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    if (isVisible) {
      // Get current usage stats
      const currentUsage = voiceBotRateLimiter.getCurrentUsage();
      const currentLimits = voiceBotRateLimiter.getLimits();
      const usageSummary = voiceBotRateLimiter.getUsageSummary();

      setUsage(currentUsage);
      setLimits(currentLimits);
      setSummary(usageSummary);

      // Update every 5 seconds while visible
      const interval = setInterval(() => {
        const updatedUsage = voiceBotRateLimiter.getCurrentUsage();
        const updatedSummary = voiceBotRateLimiter.getUsageSummary();
        setUsage(updatedUsage);
        setSummary(updatedSummary);
      }, 5000);

      return () => clearInterval(interval);
    }
    // Return cleanup function even when not visible (no-op)
    return () => {};
  }, [isVisible]);

  if (!isVisible || !limits) return null;

  const getUsagePercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const formatCost = (cost: number) => {
    return `$${cost.toFixed(4)}`;
  };

  const formatMinutes = (minutes: number) => {
    return `${minutes.toFixed(1)} min`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 z-50 max-w-sm w-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Voice Usage
            </h3>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Current Session Stats */}
          {usage && (
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Session</h4>

              {/* Characters Used */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Characters</span>
                  <span className="font-medium">
                    {usage.totalCharacters} / {limits.maxCharactersPerSession}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      getUsagePercentage(usage.totalCharacters, limits.maxCharactersPerSession) >= 90
                        ? 'bg-red-500'
                        : getUsagePercentage(usage.totalCharacters, limits.maxCharactersPerSession) >= 75
                          ? 'bg-orange-500'
                          : 'bg-indigo-500'
                    }`}
                    style={{
                      width: `${getUsagePercentage(usage.totalCharacters, limits.maxCharactersPerSession)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Estimated Cost */}
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Est. Cost</span>
                <span className="font-medium">{formatCost(usage.estimatedCost)}</span>
              </div>

              {/* Voice Minutes */}
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Voice Minutes</span>
                <span className="font-medium">{formatMinutes(usage.clonedVoiceMinutes)}</span>
              </div>
            </div>
          )}

          {/* Daily Limits */}
          <div className="space-y-3 mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Limits</h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-gray-600 dark:text-gray-400 block">Characters</span>
                <span className="font-medium">{limits.maxCharactersPerDay}</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-600 dark:text-gray-400 block">Max Cost</span>
                <span className="font-medium">{formatCost(limits.maxCostPerDay)}</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-600 dark:text-gray-400 block">Voice Minutes</span>
                <span className="font-medium">{formatMinutes(limits.maxClonedVoiceMinutesPerDay)}</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-600 dark:text-gray-400 block">Conversations</span>
                <span className="font-medium">{limits.maxConversationsPerDay}</span>
              </div>
            </div>
          </div>

          {/* Global Stats */}
          {summary && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Today's Activity</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-gray-600 dark:text-gray-400 block">Active Sessions</span>
                  <span className="font-medium">{summary.activeSessions}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-600 dark:text-gray-400 block">Total Cost</span>
                  <span className="font-medium">{formatCost(summary.totalCostToday)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              💡 <strong>Tip:</strong> Keep messages under {limits.maxCharactersPerMessage} characters for best
              experience.
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceUsageMonitor;
