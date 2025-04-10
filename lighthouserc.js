module.exports = {
  ci: {
    collect: {
      // Use Puppeteer to collect Lighthouse metrics
      method: 'node',
      // Number of samples to collect
      numberOfRuns: 3,
      // URL to test
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/casestudy/scheduler',
        'http://localhost:3000/casestudy/lessonloom',
      ],
      // Chrome flags
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage --headless',
      },
    },
    upload: {
      // Where to upload the results
      target: 'temporary-public-storage',
    },
    assert: {
      // Performance score thresholds for different categories
      // These are optimized for a portfolio site with animations
      assertions: {
        // Performance thresholds
        'categories:performance': ['warn', { minScore: 0.85 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        
        // Accessibility thresholds
        'categories:accessibility': ['error', { minScore: 0.9 }],
        
        // Best practices thresholds
        'categories:best-practices': ['error', { minScore: 0.9 }],
        
        // SEO thresholds
        'categories:seo': ['error', { minScore: 0.9 }],
        
        // PWA thresholds (lower since this may not be a PWA)
        'categories:pwa': ['off', { minScore: 0.5 }],

        // Animation-specific metrics
        'non-composited-animations': ['warn', { maxNumericValue: 0 }],
        'unused-javascript': ['warn', { maxNumericValue: 0.2 }],
      },
    },
  },
}; 