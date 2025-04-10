/**
 * Performance testing script
 * Runs all performance tests and generates a combined report
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create results directory if it doesn't exist
const resultsDir = path.join(__dirname, '../performance-results');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

// Get current date/time for report naming
const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
const reportDir = path.join(resultsDir, `perf-report-${timestamp}`);
fs.mkdirSync(reportDir, { recursive: true });

// Log with timestamp
const log = (message) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${message}`);
};

// Clear console
console.clear();
console.log('\n-------------------------------------------------');
console.log('📊 PORTFOLIO PERFORMANCE TEST SUITE');
console.log('-------------------------------------------------\n');

// Check if Next.js server is running
let isServerRunning = false;
try {
  execSync('curl -s http://localhost:3000 > /dev/null');
  isServerRunning = true;
  log('✓ Next.js server is already running on port 3000');
} catch (e) {
  log('! Next.js server is not running, will start it automatically');
}

// Track started processes for cleanup
const startedProcesses = [];

// Start Next.js server if needed
async function startServer() {
  if (isServerRunning) return;
  
  return new Promise((resolve) => {
    log('Starting Next.js server...');
    
    const serverProcess = spawn('npm', ['run', 'dev'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: false,
    });
    
    startedProcesses.push(serverProcess);
    
    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('ready') && output.includes('localhost:3000')) {
        log('✓ Next.js server started successfully');
        resolve(serverProcess);
      }
    });
    
    serverProcess.stderr.on('data', (data) => {
      console.error(`Server Error: ${data}`);
    });
  });
}

// Run Lighthouse tests
async function runLighthouse() {
  log('Running Lighthouse performance tests...');
  
  return new Promise((resolve, reject) => {
    // Run Lighthouse CI
    const lighthouseProcess = spawn('npx', ['lhci', 'autorun', '--collect.settings.output=json'], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    
    startedProcesses.push(lighthouseProcess);
    
    lighthouseProcess.stdout.on('data', (data) => {
      console.log(data.toString().trim());
    });
    
    lighthouseProcess.stderr.on('data', (data) => {
      console.error(data.toString().trim());
    });
    
    lighthouseProcess.on('close', (code) => {
      if (code === 0) {
        log('✓ Lighthouse tests completed successfully');
        
        // Copy Lighthouse results to the report directory
        if (fs.existsSync('.lighthouseci')) {
          const files = fs.readdirSync('.lighthouseci');
          const htmlReports = files.filter(file => file.endsWith('.html'));
          
          if (htmlReports.length > 0) {
            const lighthouseDir = path.join(reportDir, 'lighthouse');
            fs.mkdirSync(lighthouseDir, { recursive: true });
            
            htmlReports.forEach(file => {
              fs.copyFileSync(
                path.join('.lighthouseci', file),
                path.join(lighthouseDir, file)
              );
            });
            
            log(`✓ Copied ${htmlReports.length} Lighthouse reports to ${lighthouseDir}`);
          }
        }
        
        resolve();
      } else {
        log(`✗ Lighthouse tests failed with code ${code}`);
        resolve(); // Continue even if Lighthouse fails
      }
    });
  });
}

// Run animation performance measurements
async function measureAnimationPerformance() {
  log('Running animation performance measurements...');
  
  return new Promise((resolve, reject) => {
    const perfProcess = spawn('node', ['scripts/measure-performance.js'], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    
    startedProcesses.push(perfProcess);
    
    perfProcess.stdout.on('data', (data) => {
      console.log(data.toString().trim());
    });
    
    perfProcess.stderr.on('data', (data) => {
      console.error(data.toString().trim());
    });
    
    perfProcess.on('close', (code) => {
      if (code === 0) {
        log('✓ Animation performance measurements completed successfully');
        
        // Copy latest performance results to the report directory
        const files = fs.readdirSync('performance-results');
        const jsonFiles = files.filter(file => file.endsWith('.json') && file.startsWith('performance-results-'));
        
        if (jsonFiles.length > 0) {
          // Sort by modified time to get the latest
          const latestFile = jsonFiles.sort((a, b) => {
            return fs.statSync(path.join('performance-results', b)).mtime.getTime() - 
                   fs.statSync(path.join('performance-results', a)).mtime.getTime();
          })[0];
          
          fs.copyFileSync(
            path.join('performance-results', latestFile),
            path.join(reportDir, 'animation-metrics.json')
          );
          
          log(`✓ Copied animation metrics to ${reportDir}/animation-metrics.json`);
        }
        
        resolve();
      } else {
        log(`✗ Animation measurements failed with code ${code}`);
        resolve(); // Continue even if animation measurements fail
      }
    });
  });
}

// Generate a simple HTML report combining all results
function generateReport() {
  log('Generating combined performance report...');
  
  // Check if we have the necessary data
  const hasLighthouse = fs.existsSync(path.join(reportDir, 'lighthouse')) && 
                        fs.readdirSync(path.join(reportDir, 'lighthouse')).length > 0;
  
  const hasAnimationMetrics = fs.existsSync(path.join(reportDir, 'animation-metrics.json'));
  
  if (!hasLighthouse && !hasAnimationMetrics) {
    log('✗ No performance data found to generate report');
    return;
  }
  
  // Read animation metrics
  let animationData = null;
  if (hasAnimationMetrics) {
    try {
      animationData = JSON.parse(fs.readFileSync(path.join(reportDir, 'animation-metrics.json')));
    } catch (e) {
      console.error('Error parsing animation metrics:', e);
    }
  }
  
  // Get Lighthouse reports
  let lighthouseReports = [];
  if (hasLighthouse) {
    lighthouseReports = fs.readdirSync(path.join(reportDir, 'lighthouse'))
      .filter(file => file.endsWith('.html'))
      .map(file => ({
        name: file.replace(/\.html$/, '').replace(/^lhr-/, ''),
        path: `./lighthouse/${file}`
      }));
  }
  
  // Create HTML report
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio Performance Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    h1 {
      font-size: 2.5rem;
      color: #2563eb;
    }
    h2 {
      font-size: 1.8rem;
      margin-top: 40px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    h3 {
      font-size: 1.5rem;
      margin-top: 30px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    table, th, td {
      border: 1px solid #ddd;
    }
    th, td {
      padding: 12px 15px;
      text-align: left;
    }
    th {
      background-color: #f8f9fa;
    }
    .report-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .metric-group {
      margin-bottom: 30px;
    }
    .metric {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding: 8px 0;
    }
    .good {
      color: #22c55e;
    }
    .warning {
      color: #f59e0b;
    }
    .poor {
      color: #ef4444;
    }
    .lighthouse-links {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin: 20px 0;
    }
    .lighthouse-link {
      display: inline-block;
      padding: 10px 15px;
      background-color: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
    }
    .timestamp {
      font-style: italic;
      color: #666;
      text-align: center;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Portfolio Performance Report</h1>
    <p>Generated on ${new Date().toLocaleString()}</p>
  </header>
  
  <main>
    <h2>Performance Overview</h2>
    
    ${lighthouseReports.length > 0 ? `
    <section>
      <h3>Lighthouse Reports</h3>
      <p>The following Lighthouse reports were generated for different pages:</p>
      
      <div class="lighthouse-links">
        ${lighthouseReports.map(report => `
          <a href="${report.path}" class="lighthouse-link" target="_blank">
            ${report.name} Report
          </a>
        `).join('')}
      </div>
    </section>
    ` : ''}
    
    ${animationData ? `
    <section>
      <h3>Animation & Interaction Performance</h3>
      
      ${Object.entries(animationData).map(([pageName, metrics]) => `
        <div class="report-card">
          <h3>${pageName}</h3>
          
          ${metrics.fps ? `
          <div class="metric-group">
            <h4>Frame Rates</h4>
            <div class="metric">
              <span>Average FPS:</span>
              <span class="${metrics.fps.average >= 55 ? 'good' : metrics.fps.average >= 30 ? 'warning' : 'poor'}">
                ${metrics.fps.average.toFixed(1)} FPS
              </span>
            </div>
            <div class="metric">
              <span>Min FPS:</span>
              <span class="${metrics.fps.min >= 30 ? 'good' : metrics.fps.min >= 20 ? 'warning' : 'poor'}">
                ${metrics.fps.min} FPS
              </span>
            </div>
            <div class="metric">
              <span>Max FPS:</span>
              <span>${metrics.fps.max} FPS</span>
            </div>
            <div class="metric">
              <span>Jank Frames:</span>
              <span class="${metrics.fps.jank <= 3 ? 'good' : metrics.fps.jank <= 10 ? 'warning' : 'poor'}">
                ${metrics.fps.jank} frames
              </span>
            </div>
          </div>
          ` : ''}
          
          ${metrics.navigationTiming ? `
          <div class="metric-group">
            <h4>Navigation Timing</h4>
            <div class="metric">
              <span>Time to First Byte:</span>
              <span class="${metrics.navigationTiming.firstByte <= 100 ? 'good' : metrics.navigationTiming.firstByte <= 300 ? 'warning' : 'poor'}">
                ${metrics.navigationTiming.firstByte.toFixed(0)} ms
              </span>
            </div>
            <div class="metric">
              <span>DOM Interactive:</span>
              <span class="${metrics.navigationTiming.domInteractive <= 1000 ? 'good' : metrics.navigationTiming.domInteractive <= 2000 ? 'warning' : 'poor'}">
                ${metrics.navigationTiming.domInteractive.toFixed(0)} ms
              </span>
            </div>
            <div class="metric">
              <span>Total Load Time:</span>
              <span class="${metrics.navigationTiming.load <= 2000 ? 'good' : metrics.navigationTiming.load <= 4000 ? 'warning' : 'poor'}">
                ${metrics.navigationTiming.load ? metrics.navigationTiming.load.toFixed(0) : 'N/A'} ms
              </span>
            </div>
          </div>
          ` : ''}
          
          ${metrics.jsCoverage ? `
          <div class="metric-group">
            <h4>JavaScript Usage</h4>
            <div class="metric">
              <span>JS Usage:</span>
              <span class="${metrics.jsCoverage.usagePercentage >= 70 ? 'good' : metrics.jsCoverage.usagePercentage >= 50 ? 'warning' : 'poor'}">
                ${metrics.jsCoverage.usagePercentage}% (${(metrics.jsCoverage.usedBytes / 1024).toFixed(1)} KB of ${(metrics.jsCoverage.totalBytes / 1024).toFixed(1)} KB)
              </span>
            </div>
          </div>
          ` : ''}
          
          ${metrics.cumulativeLayoutShift !== undefined ? `
          <div class="metric-group">
            <h4>Core Web Vitals</h4>
            <div class="metric">
              <span>Cumulative Layout Shift:</span>
              <span class="${metrics.cumulativeLayoutShift <= 0.1 ? 'good' : metrics.cumulativeLayoutShift <= 0.25 ? 'warning' : 'poor'}">
                ${metrics.cumulativeLayoutShift.toFixed(3)}
              </span>
            </div>
            ${metrics.largestContentfulPaint ? `
            <div class="metric">
              <span>Largest Contentful Paint:</span>
              <span class="${metrics.largestContentfulPaint <= 2500 ? 'good' : metrics.largestContentfulPaint <= 4000 ? 'warning' : 'poor'}">
                ${metrics.largestContentfulPaint.toFixed(0)} ms
              </span>
            </div>
            ` : ''}
          </div>
          ` : ''}
          
          ${metrics.frameDurations ? `
          <div class="metric-group">
            <h4>Frame Durations</h4>
            <div class="metric">
              <span>Average Frame Time:</span>
              <span class="${metrics.frameDurations.average <= 16 ? 'good' : metrics.frameDurations.average <= 33 ? 'warning' : 'poor'}">
                ${metrics.frameDurations.average.toFixed(2)} ms
              </span>
            </div>
            <div class="metric">
              <span>Max Frame Time:</span>
              <span class="${metrics.frameDurations.max <= 33 ? 'good' : metrics.frameDurations.max <= 50 ? 'warning' : 'poor'}">
                ${metrics.frameDurations.max.toFixed(2)} ms
              </span>
            </div>
            <div class="metric">
              <span>Janky Frames:</span>
              <span class="${metrics.frameDurations.jank <= 5 ? 'good' : metrics.frameDurations.jank <= 15 ? 'warning' : 'poor'}">
                ${metrics.frameDurations.jank} frames
              </span>
            </div>
          </div>
          ` : ''}
        </div>
      `).join('')}
    </section>
    ` : ''}
  </main>
  
  <p class="timestamp">Report generated: ${new Date().toISOString()}</p>
</body>
</html>
  `;
  
  // Write HTML report
  fs.writeFileSync(path.join(reportDir, 'index.html'), html);
  
  log(`✓ Generated performance report at ${path.join(reportDir, 'index.html')}`);
  
  // Open the report in the default browser
  try {
    const openCommand = process.platform === 'win32' ? 'start' : 
                        process.platform === 'darwin' ? 'open' : 'xdg-open';
    execSync(`${openCommand} ${path.join(reportDir, 'index.html')}`);
  } catch (e) {
    log('! Could not open report automatically in browser');
  }
}

// Clean up processes on exit
function cleanup() {
  log('Cleaning up...');
  
  startedProcesses.forEach(process => {
    try {
      process.kill();
    } catch (e) {
      // Ignore errors when killing processes
    }
  });
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nGracefully shutting down...');
  cleanup();
  process.exit(0);
});

// Main function
async function main() {
  try {
    // Start server if needed
    if (!isServerRunning) {
      await startServer();
      
      // Give the server a moment to fully start
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    // Run tests sequentially
    await runLighthouse();
    await measureAnimationPerformance();
    
    // Generate combined report
    generateReport();
    
    // Cleanup if we started the server
    if (!isServerRunning) {
      cleanup();
    }
    
    log('✓ All performance tests completed!');
    log(`  Report available at: ${path.join(reportDir, 'index.html')}`);
    
  } catch (error) {
    console.error('Error running performance tests:', error);
    
    // Make sure to clean up before exiting
    cleanup();
    process.exit(1);
  }
}

// Run the main function
main(); 