'use client';

import { useEffect, useState } from 'react';
import { getNavigationTiming, monitorFrameRate } from '../../utils/web-vitals';

interface PerformanceMetrics {
  fps?: {
    avg: number;
    min: number;
    max: number;
    jank: number;
    jankPercentage: number;
  };
  navigation?: {
    ttfb: number;
    fcp: number;
    lcp: number;
    cls: number;
    totalLoad: number;
  };
  memory?: {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
    usagePercentage: number;
  };
}

interface PerformanceMonitorProps {
  showControls?: boolean;
  initiallyVisible?: boolean;
  monitoringInterval?: number; // milliseconds
}

/**
 * A component that displays real-time performance metrics
 * Useful during development and testing
 */
export function PerformanceMonitor({
  showControls = true,
  initiallyVisible = false,
  monitoringInterval = 2000,
}: PerformanceMonitorProps) {
  const [isVisible, setIsVisible] = useState(initiallyVisible);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  // Start monitoring
  useEffect(() => {
    if (!isVisible) return;

    let intervalId: NodeJS.Timeout;

    const startMonitoring = () => {
      setIsMonitoring(true);

      // Initial metrics collection
      collectMetrics();

      // Setup interval for continuous monitoring
      intervalId = setInterval(() => {
        collectMetrics();
      }, monitoringInterval);
    };

    const stopMonitoring = () => {
      setIsMonitoring(false);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };

    // Start monitoring when component becomes visible
    startMonitoring();

    // Cleanup
    return () => {
      stopMonitoring();
    };
  }, [isVisible, monitoringInterval]);

  // Collect performance metrics
  const collectMetrics = async () => {
    if (typeof window === 'undefined') return;

    // Get frame rate metrics
    const frameMetrics = await monitorFrameRate(1000);

    // Get navigation timing
    const navTiming = getNavigationTiming();

    // Get memory usage if available
    let memoryMetrics = null;
    if ((performance as any).memory) {
      const memory = (performance as any).memory;
      memoryMetrics = {
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        totalJSHeapSize: memory.totalJSHeapSize,
        usedJSHeapSize: memory.usedJSHeapSize,
        usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
      };
    }

    // Get paint metrics
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    const fcpTime = fcpEntry ? fcpEntry.startTime : 0;

    // Get LCP if available
    let lcpTime = 0;
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntries.length > 0) {
      lcpTime = lcpEntries[lcpEntries.length - 1]?.startTime || 0;
    }

    // Get CLS if available
    let clsValue = 0;
    const layoutShiftEntries = performance.getEntriesByType('layout-shift');
    for (const entry of layoutShiftEntries) {
      clsValue += (entry as any).value;
    }

    // Update metrics
    setMetrics({
      fps: frameMetrics && typeof frameMetrics === 'object' && 'avgFps' in frameMetrics ? {
        avg: (frameMetrics as any).avgFps,
        min: (frameMetrics as any).minFps,
        max: (frameMetrics as any).maxFps,
        jank: (frameMetrics as any).jankyFrames,
        jankPercentage: (frameMetrics as any).jankyPercentage,
      } : undefined,
      navigation: {
        ttfb: navTiming?.ttfb || 0,
        fcp: fcpTime,
        lcp: lcpTime,
        cls: clsValue,
        totalLoad: navTiming?.totalPageLoad || 0,
      },
      memory: memoryMetrics || undefined,
    });
  };

  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  // If not visible and no controls, render nothing
  if (!isVisible && !showControls) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showControls && (
        <button
          onClick={toggleVisibility}
          className="bg-black/80 text-white px-3 py-1 rounded-full text-xs font-mono mb-2"
          aria-label={isVisible ? "Hide performance metrics" : "Show performance metrics"}
        >
          {isVisible ? "Hide Metrics" : "Show Metrics"}
        </button>
      )}

      {isVisible && (
        <div className="bg-black/80 text-white p-4 rounded-lg shadow-lg w-80 max-h-96 overflow-auto font-mono text-xs">
          <h3 className="text-lg font-semibold mb-3 text-accent">Performance Metrics</h3>

          {isMonitoring ? (
            <>
              {/* FPS Metrics */}
              {metrics.fps && (
                <div className="mb-4">
                  <h4 className="text-accent/80 mb-1">Frames Per Second</h4>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <span>Average:</span>
                    <span className={metrics.fps.avg < 50 ? 'text-red-400' : 'text-green-400'}>
                      {metrics.fps.avg.toFixed(1)} FPS
                    </span>

                    <span>Min:</span>
                    <span className={metrics.fps.min < 30 ? 'text-red-400' : 'text-yellow-400'}>
                      {metrics.fps.min.toFixed(1)} FPS
                    </span>

                    <span>Max:</span>
                    <span className="text-green-400">
                      {metrics.fps.max.toFixed(1)} FPS
                    </span>

                    <span>Jank Frames:</span>
                    <span className={metrics.fps.jank > 5 ? 'text-red-400' : 'text-green-400'}>
                      {metrics.fps.jank} ({metrics.fps.jankPercentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              )}

              {/* Web Vitals */}
              {metrics.navigation && (
                <div className="mb-4">
                  <h4 className="text-accent/80 mb-1">Web Vitals</h4>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <span>TTFB:</span>
                    <span className={metrics.navigation.ttfb > 500 ? 'text-red-400' : 'text-green-400'}>
                      {metrics.navigation.ttfb.toFixed(0)} ms
                    </span>

                    <span>FCP:</span>
                    <span className={metrics.navigation.fcp > 2000 ? 'text-red-400' : 'text-green-400'}>
                      {metrics.navigation.fcp.toFixed(0)} ms
                    </span>

                    <span>LCP:</span>
                    <span className={metrics.navigation.lcp > 2500 ? 'text-red-400' : 'text-green-400'}>
                      {metrics.navigation.lcp.toFixed(0)} ms
                    </span>

                    <span>CLS:</span>
                    <span className={metrics.navigation.cls > 0.1 ? 'text-red-400' : 'text-green-400'}>
                      {metrics.navigation.cls.toFixed(3)}
                    </span>

                    <span>Total Load:</span>
                    <span className={metrics.navigation.totalLoad > 3000 ? 'text-red-400' : 'text-green-400'}>
                      {metrics.navigation.totalLoad.toFixed(0)} ms
                    </span>
                  </div>
                </div>
              )}

              {/* Memory Usage */}
              {metrics.memory && (
                <div className="mb-2">
                  <h4 className="text-accent/80 mb-1">Memory Usage</h4>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <span>Used:</span>
                    <span className={metrics.memory.usagePercentage > 80 ? 'text-red-400' : 'text-green-400'}>
                      {(metrics.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1)} MB
                    </span>

                    <span>Total:</span>
                    <span>
                      {(metrics.memory.totalJSHeapSize / (1024 * 1024)).toFixed(1)} MB
                    </span>

                    <span>Limit:</span>
                    <span>
                      {(metrics.memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(1)} MB
                    </span>

                    <span>Usage:</span>
                    <span className={metrics.memory.usagePercentage > 80 ? 'text-red-400' : 'text-green-400'}>
                      {metrics.memory.usagePercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}

              <div className="text-center text-xs opacity-80 mt-3">
                <span>Refreshed every {monitoringInterval / 1000}s</span>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              Loading metrics...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
