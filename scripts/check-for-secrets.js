#!/usr/bin/env node

/**
 * This script checks files for potential API keys, access tokens, and other secrets.
 * It's designed to be run as part of a pre-commit hook to prevent secrets from being committed.
 */

const fs = require('fs');
const path = require('path');

// Patterns that might indicate secrets (API keys, tokens, etc.)
const secretPatterns = [
  // API keys (general pattern)
  /\b(api[_-]?key|apikey|api[_-]?token|access[_-]?token)[\s]*[=:][\s]*["']?([a-zA-Z0-9_\-]{20,})["']?/i,
  
  // Service-specific API key patterns
  /(OPENAI_API_KEY|OPENAI_SECRET_KEY)[\s]*[=:][\s]*["']?[a-zA-Z0-9_\-]{20,}["']?/i,
  /(GITHUB_TOKEN|GITHUB_SECRET)[\s]*[=:][\s]*["']?[a-zA-Z0-9_\-]{20,}["']?/i,
  /(AWS_SECRET_ACCESS_KEY|AWS_ACCESS_KEY_ID)[\s]*[=:][\s]*["']?[a-zA-Z0-9/+]{20,}["']?/i,
  
  // Common formats
  /sk-[a-zA-Z0-9]{24,}/i,  // OpenAI key format
  /\bgh[pousr]_[a-zA-Z0-9]{16,}/i,  // GitHub tokens
  /\b(AKIA|ASIA)[A-Z0-9]{16,}/i,  // AWS Access Key ID
];

// Placeholder values that should be allowed
const allowedPlaceholders = [
  'your_api_key_here',
  'YOUR_API_KEY',
  'your_openai_api_key_here',
  'your_database_connection_string',
  'your_analytics_api_key',
];

function checkForSecrets(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let foundSecrets = false;

    lines.forEach((line, index) => {
      // Skip comments and empty lines
      if (line.trim().startsWith('#') || line.trim() === '') {
        return;
      }

      // Check each pattern
      for (const pattern of secretPatterns) {
        const match = line.match(pattern);
        if (match && match[0]) {
          // Check if it's a placeholder (allowed)
          let isPlaceholder = false;
          for (const placeholder of allowedPlaceholders) {
            if (line.includes(placeholder)) {
              isPlaceholder = true;
              break;
            }
          }

          if (!isPlaceholder) {
            console.error(`⛔ Potential secret found in ${filePath} at line ${index + 1}:`);
            console.error(`   ${line.trim()}`);
            foundSecrets = true;
          }
        }
      }
    });

    return !foundSecrets;
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
    return false;
  }
}

// Get file paths from arguments
const filePaths = process.argv.slice(2);

let allGood = true;
for (const filePath of filePaths) {
  if (!checkForSecrets(filePath)) {
    allGood = false;
  }
}

if (!allGood) {
  console.error('\n⚠️  Potential secrets detected in your changes!');
  console.error('   Please remove them before committing or replace with placeholder values.');
  process.exit(1);
} else {
  console.log('✅ No secrets detected.');
} 