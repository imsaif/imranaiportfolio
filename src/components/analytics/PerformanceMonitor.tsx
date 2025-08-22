'use client';

import { useEffect } from 'react';

// interface Metric {
//   name: string;
//   value: number;
//   rating: 'good' | 'needs-improvement' | 'poor';
// }

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in browser and development
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          const lcp = entry.startTime;
          const rating = lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs-improvement' : 'poor';

          console.log(`🎯 LCP: ${Math.round(lcp)}ms (${rating})`);

          // Optional: Send to analytics
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(lcp),
              custom_map: { metric_rating: rating }
            });
          }
        }

        if (entry.entryType === 'first-input') {
          const fid = (entry as any).processingStart - entry.startTime;
          const rating = fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor';

          console.log(`⚡ FID: ${Math.round(fid)}ms (${rating})`);
        }

        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          const cls = (entry as any).value;
          const rating = cls <= 0.1 ? 'good' : cls <= 0.25 ? 'needs-improvement' : 'poor';

          console.log(`📐 CLS: ${cls.toFixed(3)} (${rating})`);
        }
      });
    });

    // Observe different entry types based on browser support
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      observer.observe({ entryTypes: ['first-input'] });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Fallback for older browsers
      observer.observe({ entryTypes: ['paint', 'navigation'] });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Component doesn't render anything visible
  return null;
};

export default PerformanceMonitor;
