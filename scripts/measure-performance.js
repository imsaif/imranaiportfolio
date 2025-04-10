const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Measure animation performance for different pages
 */
async function measurePerformance() {
  console.log('Starting performance measurements...');
  
  // Create the results directory if it doesn't exist
  const resultsDir = path.join(__dirname, '../performance-results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 800
    },
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  
  // Pages to test
  const pages = [
    { name: 'Home', url: 'http://localhost:3000/' },
    { name: 'SchedulerCaseStudy', url: 'http://localhost:3000/casestudy/scheduler' },
    { name: 'LessonLoomCaseStudy', url: 'http://localhost:3000/casestudy/lessonloom' },
  ];
  
  const results = {};
  
  try {
    for (const page of pages) {
      console.log(`Measuring performance for ${page.name}...`);
      
      // Create a new page for each test
      const tab = await browser.newPage();
      
      // Start tracing
      await tab.tracing.start({
        path: path.join(resultsDir, `${page.name}-trace.json`),
        screenshots: true,
        categories: ['devtools.timeline', 'blink.user_timing']
      });
      
      // Enable JS coverage
      await tab.coverage.startJSCoverage();
      
      // Navigate to the page and wait until network is idle
      await tab.goto(page.url, { waitUntil: 'networkidle0' });
      
      // Capture Web Vitals using PerformanceObserver
      const metrics = await tab.evaluate(() => {
        return new Promise(resolve => {
          // Add a small delay to ensure metrics are captured
          setTimeout(() => {
            const metrics = {};
            
            // Performance metrics from Navigation Timing API
            const navigationTiming = performance.getEntriesByType('navigation')[0];
            metrics.navigationTiming = {
              domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
              load: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
              domInteractive: navigationTiming.domInteractive - navigationTiming.startTime,
              firstByte: navigationTiming.responseStart - navigationTiming.requestStart,
            };
            
            // Get FPS sample during scrolling
            const fpsSamples = [];
            let lastTimestamp = performance.now();
            let frames = 0;
            
            // Scroll slowly down the page to trigger animations
            const scrollInterval = setInterval(() => {
              window.scrollBy(0, 100);
              const now = performance.now();
              frames++;
              
              // Calculate FPS every 100ms
              if (now - lastTimestamp > 100) {
                const fps = Math.round((frames * 1000) / (now - lastTimestamp));
                fpsSamples.push(fps);
                frames = 0;
                lastTimestamp = now;
              }
            }, 100);
            
            // Stop after 2 seconds of scrolling
            setTimeout(() => {
              clearInterval(scrollInterval);
              
              // Calculate FPS stats
              metrics.fps = {
                samples: fpsSamples,
                average: fpsSamples.reduce((sum, fps) => sum + fps, 0) / fpsSamples.length,
                min: Math.min(...fpsSamples),
                max: Math.max(...fpsSamples),
              };
              
              // Get paint metrics
              const paintMetrics = performance.getEntriesByType('paint');
              for (const paint of paintMetrics) {
                metrics[paint.name] = paint.startTime;
              }
              
              // Get layout shift metrics
              const layoutShiftEntries = performance.getEntriesByType('layout-shift');
              let cumulativeLayoutShift = 0;
              for (const entry of layoutShiftEntries) {
                cumulativeLayoutShift += entry.value;
              }
              metrics.cumulativeLayoutShift = cumulativeLayoutShift;
              
              // LCP metric
              const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
              if (lcpEntries.length > 0) {
                metrics.largestContentfulPaint = lcpEntries[lcpEntries.length - 1].startTime;
              }
              
              // Animation frames
              const frameTimes = performance.getEntriesByType('frame');
              if (frameTimes.length > 1) {
                const frameDurations = [];
                for (let i = 1; i < frameTimes.length; i++) {
                  frameDurations.push(frameTimes[i].startTime - frameTimes[i-1].startTime);
                }
                metrics.frameDurations = {
                  average: frameDurations.reduce((sum, duration) => sum + duration, 0) / frameDurations.length,
                  max: Math.max(...frameDurations),
                  jank: frameDurations.filter(duration => duration > 16.67).length, // Frames that took longer than 16.67ms (60fps)
                };
              }
              
              resolve(metrics);
            }, 2000);
          }, 1000);
        });
      });
      
      // Stop JS coverage
      const jsCoverage = await tab.coverage.stopJSCoverage();
      
      // Calculate JS usage
      let totalBytes = 0;
      let usedBytes = 0;
      
      for (const entry of jsCoverage) {
        totalBytes += entry.text.length;
        for (const range of entry.ranges) {
          usedBytes += range.end - range.start;
        }
      }
      
      metrics.jsCoverage = {
        totalBytes,
        usedBytes,
        usagePercentage: Math.round((usedBytes / totalBytes) * 100),
      };
      
      // Stop tracing
      await tab.tracing.stop();
      
      // Store results
      results[page.name] = metrics;
      
      // Close the tab
      await tab.close();
      
      console.log(`Completed measuring ${page.name}`);
    }
  } catch (error) {
    console.error('Error during performance measurement:', error);
  } finally {
    await browser.close();
  }
  
  // Write the results to a file
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  fs.writeFileSync(
    path.join(resultsDir, `performance-results-${timestamp}.json`),
    JSON.stringify(results, null, 2)
  );
  
  console.log(`Performance measurement completed. Results saved to performance-results-${timestamp}.json`);
  
  // Output a summary of the results
  console.log('\nPerformance Summary:');
  console.log('====================');
  
  for (const [pageName, metrics] of Object.entries(results)) {
    console.log(`\n${pageName}:`);
    
    if (metrics.fps) {
      console.log(`  FPS: avg=${metrics.fps.average.toFixed(2)}, min=${metrics.fps.min}, max=${metrics.fps.max}`);
    }
    
    if (metrics.jsCoverage) {
      console.log(`  JS Usage: ${metrics.jsCoverage.usagePercentage}% (${(metrics.jsCoverage.usedBytes / 1024).toFixed(2)}KB of ${(metrics.jsCoverage.totalBytes / 1024).toFixed(2)}KB)`);
    }
    
    if (metrics.cumulativeLayoutShift !== undefined) {
      console.log(`  Cumulative Layout Shift: ${metrics.cumulativeLayoutShift.toFixed(3)}`);
    }
    
    if (metrics.largestContentfulPaint) {
      console.log(`  Largest Contentful Paint: ${metrics.largestContentfulPaint.toFixed(2)}ms`);
    }
    
    if (metrics.frameDurations) {
      console.log(`  Frame Times: avg=${metrics.frameDurations.average.toFixed(2)}ms, max=${metrics.frameDurations.max.toFixed(2)}ms, jank=${metrics.frameDurations.jank} frames`);
    }
    
    if (metrics.navigationTiming) {
      console.log(`  DOM Interactive: ${metrics.navigationTiming.domInteractive.toFixed(2)}ms`);
      console.log(`  First Byte: ${metrics.navigationTiming.firstByte.toFixed(2)}ms`);
    }
  }
}

// Start the measurements
measurePerformance().catch(console.error); 