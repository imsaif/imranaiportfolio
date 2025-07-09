#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Starting TypeScript error fixes...');

// Function to recursively find TypeScript files
function findTsFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      findTsFiles(fullPath, files);
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Function to fix common TypeScript errors
function fixTypeScriptErrors() {
  try {
    console.log('📝 Running ESLint auto-fix...');
    execSync('npm run lint:fix', { stdio: 'inherit' });

    console.log('🎨 Running Prettier formatting...');
    execSync('npm run format', { stdio: 'inherit' });

    console.log('✅ TypeScript error fixes completed!');
    console.log('📊 Run "npm run type-check" to see remaining errors.');

  } catch (error) {
    console.error('❌ Error during TypeScript fixes:', error.message);
    process.exit(1);
  }
}

// Function to show error statistics
function showErrorStats() {
  try {
    console.log('📊 Checking current error count...');
    const result = execSync('npx tsc --noEmit 2>&1', { encoding: 'utf8' });

    const errorLines = result.split('\n').filter(line =>
      line.includes('error TS') || line.includes('Found') || line.includes('Errors')
    );

    console.log('📈 Current TypeScript Errors:');
    errorLines.forEach(line => console.log(line));

  } catch (error) {
    console.log('📊 Error count check completed.');
  }
}

// Main execution
if (require.main === module) {
  console.log('🚀 TypeScript Error Fixer');
  console.log('========================');

  fixTypeScriptErrors();
  showErrorStats();

  console.log('\n🎯 Next Steps:');
  console.log('1. Review remaining errors with: npm run type-check');
  console.log('2. Fix undefined objects manually');
  console.log('3. Resolve type mismatches');
  console.log('4. Add missing return types');
  console.log('5. Test your application: npm run test');
}
