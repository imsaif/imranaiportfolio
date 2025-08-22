'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  rating: {
    lcp: string;
    fid: string;
    cls: string;
    ttfb: string;
  };
}

const ProductionPerformanceTest = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    rating: {
      lcp: 'unknown',
      fid: 'unknown',
      cls: 'unknown',
      ttfb: 'unknown'
    }
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show in development or when ?perf=true
    const showPerf =
      process.env.NODE_ENV === 'development' ||
      (typeof window !== 'undefined' && window.location.search.includes('perf=true'));

    setIsVisible(showPerf);

    if (!showPerf || typeof window === 'undefined') return;

    // Manual TTFB measurement
    const measureTTFB = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        const rating = ttfb <= 800 ? 'good' : ttfb <= 1800 ? 'needs-improvement' : 'poor';

        setMetrics(prev => ({
          ...prev,
          ttfb: Math.round(ttfb),
          rating: { ...prev.rating, ttfb: rating }
        }));
      }
    };

    // Manual LCP measurement using Performance Timeline
    const measureLCP = () => {
      try {
        // Method 1: Performance Timeline API
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        if (lcpEntries.length > 0) {
          const lcp = lcpEntries[lcpEntries.length - 1]?.startTime;
          if (lcp === undefined) return;
          const rating = lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs-improvement' : 'poor';

          console.log('LCP found via Performance Timeline:', lcp);
          setMetrics(prev => ({
            ...prev,
            lcp: Math.round(lcp!),
            rating: { ...prev.rating, lcp: rating }
          }));
          return;
        }

        // Method 2: Manual largest element detection
        const hero = document.querySelector('section'); // Hero section
        const images = document.querySelectorAll('img');
        const textElements = document.querySelectorAll('h1, h2, p');

        if (hero || images.length > 0 || textElements.length > 0) {
          // Estimate LCP based on when images/text are loaded
          const loadTime = performance.now();
          const rating = loadTime <= 2500 ? 'good' : loadTime <= 4000 ? 'needs-improvement' : 'poor';

          console.log('LCP estimated via DOM method:', loadTime);
          setMetrics(prev => ({
            ...prev,
            lcp: Math.round(loadTime),
            rating: { ...prev.rating, lcp: rating }
          }));
        }
      } catch (e) {
        console.log('LCP measurement failed:', e);
      }
    };

    // Manual CLS measurement
    const measureCLS = () => {
      let clsValue = 0;
      try {
        const clsEntries = performance.getEntriesByType('layout-shift');
        clsEntries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        const rating = clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor';

        setMetrics(prev => ({
          ...prev,
          cls: Number(clsValue.toFixed(3)),
          rating: { ...prev.rating, cls: rating }
        }));
      } catch (e) {
        console.log('CLS measurement failed:', e);
      }
    };

    // Measure TTFB immediately
    measureTTFB();

    // Try to measure LCP after a short delay
    setTimeout(measureLCP, 100);
    setTimeout(measureLCP, 500);
    setTimeout(measureLCP, 1000);
    setTimeout(measureLCP, 2000);

    // Measure CLS
    setTimeout(measureCLS, 1000);
    setTimeout(measureCLS, 2000);
    setTimeout(measureCLS, 3000);

    // Set up Performance Observer
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        entries.forEach((entry) => {
          console.log('Performance entry:', entry.entryType, entry);

          if (entry.entryType === 'largest-contentful-paint') {
            const lcp = entry.startTime;
            const rating = lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs-improvement' : 'poor';

            setMetrics(prev => ({
              ...prev,
              lcp: Math.round(lcp),
              rating: { ...prev.rating, lcp: rating }
            }));
          }

          if (entry.entryType === 'first-input') {
            const fid = (entry as any).processingStart - entry.startTime;
            const rating = fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor';

            setMetrics(prev => ({
              ...prev,
              fid: Math.round(fid),
              rating: { ...prev.rating, fid: rating }
            }));
          }

          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            const cls = (entry as any).value;
            const rating = cls <= 0.1 ? 'good' : cls <= 0.25 ? 'needs-improvement' : 'poor';

            setMetrics(prev => ({
              ...prev,
              cls: Number(cls.toFixed(3)),
              rating: { ...prev.rating, cls: rating }
            }));
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        observer.observe({ entryTypes: ['first-input'] });
        observer.observe({ entryTypes: ['layout-shift'] });
        console.log('Performance Observer initialized successfully');
      } catch (e) {
        console.log('Performance Observer setup failed:', e);
      }

      // Add click listener for FID measurement
      const handleFirstInput = () => {
        // Manual FID measurement fallback
        const now = performance.now();
        setMetrics(prev => ({
          ...prev,
          fid: Math.round(now - (window as any).loadTime || 0),
          rating: { ...prev.rating, fid: 'good' }
        }));
      };

      document.addEventListener('click', handleFirstInput, { once: true });
      document.addEventListener('keydown', handleFirstInput, { once: true });

      return () => {
        observer.disconnect();
        document.removeEventListener('click', handleFirstInput);
        document.removeEventListener('keydown', handleFirstInput);
      };
    }
  }, []);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-lg text-xs font-mono z-50 min-w-[200px]">
      <div className="font-bold mb-2 text-center">🎯 Core Web Vitals</div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getRatingColor(metrics.rating.lcp)}>
            {metrics.lcp ? `${metrics.lcp}ms` : '⏳'} ({metrics.rating.lcp})
          </span>
        </div>

        <div className="flex justify-between">
          <span>FID:</span>
          <span className={getRatingColor(metrics.rating.fid)}>
            {metrics.fid ? `${metrics.fid}ms` : '👆 Click me'} ({metrics.rating.fid})
          </span>
        </div>

        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getRatingColor(metrics.rating.cls)}>
            {metrics.cls !== null ? metrics.cls : '📐'} ({metrics.rating.cls})
          </span>
        </div>

        <div className="flex justify-between">
          <span>TTFB:</span>
          <span className={getRatingColor(metrics.rating.ttfb)}>
            {metrics.ttfb ? `${metrics.ttfb}ms` : '⏳'} ({metrics.rating.ttfb})
          </span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-200 text-[10px] text-gray-500 text-center">
        Refresh page to re-measure
      </div>
    </div>
  );
};

export default ProductionPerformanceTest;
