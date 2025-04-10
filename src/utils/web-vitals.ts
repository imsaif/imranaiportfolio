import { ReportHandler, onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

/**
 * Analytics function to send web vitals to your analytics service
 * You can replace this with your own analytics implementation
 */
const sendToAnalytics = (metric: any) => {
  // Replace with your analytics code
  // Example: send to Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'web-vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  } 
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Web Vitals: ${metric.name}`, metric);
  }
  
  // You could also send to a custom endpoint
  // fetch('/api/analytics/web-vitals', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // });
};

/**
 * Initialize web vitals reporting
 * @param reportHandler Optional custom handler for metrics
 */
export function reportWebVitals(reportHandler?: ReportHandler): void {
  const handler = reportHandler || sendToAnalytics;
  
  // Report Core Web Vitals
  onCLS(handler);    // Cumulative Layout Shift
  onFID(handler);    // First Input Delay
  onLCP(handler);    // Largest Contentful Paint
  
  // Report other metrics
  onFCP(handler);    // First Contentful Paint
  onTTFB(handler);   // Time to First Byte
}

/**
 * Get performance metrics from Navigation Timing API
 * This can be used to measure initial page load performance
 */
export function getNavigationTiming() {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }
  
  const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (!navigation) return null;
  
  return {
    // DNS lookup time
    dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
    
    // TCP connection time
    tcpConnection: navigation.connectEnd - navigation.connectStart,
    
    // Time to First Byte
    ttfb: navigation.responseStart - navigation.requestStart,
    
    // Server response time
    serverResponse: navigation.responseEnd - navigation.responseStart,
    
    // DOM processing time
    domProcessing: navigation.domComplete - navigation.responseEnd,
    
    // DOM Content Loaded event
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    
    // Load event
    loadEvent: navigation.loadEventEnd - navigation.loadEventStart,
    
    // Total page load time
    totalPageLoad: navigation.loadEventEnd - navigation.startTime,
  };
}

/**
 * Measure animation performance
 * @param animationCallback Function that triggers the animation
 * @returns Promise that resolves with animation performance metrics
 */
export async function measureAnimationPerformance(animationCallback: () => void) {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }
  
  return new Promise<{
    duration: number;
    framesDropped: number;
    avgFps: number;
  }>((resolve) => {
    let startTime: number;
    let framesStart: number;
    const frameTimestamps: number[] = [];
    
    // Start measuring
    requestAnimationFrame(() => {
      startTime = performance.now();
      framesStart = window.requestAnimationFrame(() => {
        // Clear existing entries
        performance.clearMarks();
        performance.clearMeasures();
        
        // Mark start
        performance.mark('animation-start');
        
        // Run the animation
        animationCallback();
        
        // Track frame timestamps
        const recordFrames = (timestamp: number) => {
          frameTimestamps.push(timestamp);
          if (performance.now() - startTime < 1000) { // Record for 1 second
            window.requestAnimationFrame(recordFrames);
          } else {
            // Mark end
            performance.mark('animation-end');
            performance.measure('animation-duration', 'animation-start', 'animation-end');
            
            // Calculate metrics
            const duration = performance.now() - startTime;
            const framesExpected = Math.round(duration / (1000 / 60)); // At 60fps
            const framesActual = frameTimestamps.length;
            const framesDropped = Math.max(0, framesExpected - framesActual);
            const avgFps = (framesActual / duration) * 1000;
            
            // Resolve with metrics
            resolve({
              duration,
              framesDropped,
              avgFps
            });
          }
        };
        
        window.requestAnimationFrame(recordFrames);
      });
    });
  });
}

/**
 * Monitor frame rates to detect jank during animations
 * @param duration How long to monitor in milliseconds
 * @returns Promise that resolves with frame rate metrics
 */
export function monitorFrameRate(duration = 5000) {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }
  
  return new Promise((resolve) => {
    const frameTimes: number[] = [];
    let lastFrameTime = performance.now();
    let rafId: number;
    
    const frameCallback = (timestamp: number) => {
      const delta = timestamp - lastFrameTime;
      frameTimes.push(delta);
      lastFrameTime = timestamp;
      
      if (performance.now() - frameTimes[0] < duration) {
        rafId = requestAnimationFrame(frameCallback);
      } else {
        // Calculate metrics
        const avgDelta = frameTimes.reduce((sum, time) => sum + time, 0) / frameTimes.length;
        const avgFps = 1000 / avgDelta;
        const jankyFrames = frameTimes.filter(t => t > 16.67).length; // Frames that took longer than 16.67ms (60fps)
        const jankyPercentage = (jankyFrames / frameTimes.length) * 100;
        
        resolve({
          sampleCount: frameTimes.length,
          avgFrameTime: avgDelta,
          avgFps,
          minFps: 1000 / Math.max(...frameTimes),
          maxFps: 1000 / Math.min(...frameTimes.filter(t => t > 0)),
          jankyFrames,
          jankyPercentage,
        });
      }
    };
    
    rafId = requestAnimationFrame(frameCallback);
    
    // Safety cleanup in case the promise never resolves
    setTimeout(() => {
      cancelAnimationFrame(rafId);
      resolve(null);
    }, duration + 1000);
  });
} 