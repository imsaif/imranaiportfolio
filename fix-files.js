const fs = require('fs');
const path = require('path');

// Fix the layout.tsx file
const layoutContent = `'use client';

import React from 'react';

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="case-study-layout">
      {children}
    </div>
  );
}`;

const layoutFilePath = path.join(__dirname, 'src', 'app', 'casestudy', 'layout.tsx');
fs.writeFileSync(layoutFilePath, layoutContent, { encoding: 'utf8' });
console.log('Layout file fixed successfully.');

// Fix the page.tsx file
const pageContent = `'use client';

import React from 'react';
import Link from 'next/link';

export default function CaseStudyIndex() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Case Studies
      </h1>
      
      <p style={{ marginBottom: '20px' }}>
        Select a case study from the list below:
      </p>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <Link href="/casestudy/lessonloom" style={{ 
            color: '#3b82f6', 
            textDecoration: 'none',
            display: 'block',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px'
          }}>
            Lesson Loom - AI-powered Educational Content
          </Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link href="/casestudy/scheduler" style={{ 
            color: '#3b82f6', 
            textDecoration: 'none',
            display: 'block',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px'
          }}>
            Educational Scheduler Project
          </Link>
        </li>
        <li>
          <Link href="/test" style={{ 
            color: '#3b82f6', 
            textDecoration: 'none',
            display: 'block',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px'
          }}>
            Test Page
          </Link>
        </li>
      </ul>
      
      <div style={{ marginTop: '30px' }}>
        <Link href="/" style={{ 
          color: '#3b82f6', 
          textDecoration: 'none'
        }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}`;

const pageFilePath = path.join(__dirname, 'src', 'app', 'casestudy', 'page.tsx');
fs.writeFileSync(pageFilePath, pageContent, { encoding: 'utf8' });
console.log('Page file fixed successfully.');

// Fix the scheduler page.tsx file
const schedulerPageContent = fs.readFileSync(
  path.join(__dirname, 'src', 'app', 'casestudy', 'scheduler', 'page.tsx'),
  { encoding: 'utf8' }
);
const schedulerPageClean = schedulerPageContent.trimEnd() + '\n';
const schedulerPagePath = path.join(__dirname, 'src', 'app', 'casestudy', 'scheduler', 'page.tsx');
fs.writeFileSync(schedulerPagePath, schedulerPageClean, { encoding: 'utf8' });
console.log('Scheduler page file fixed successfully.');

// Fix the lessonloom page.tsx file
const lessonLoomPageContent = fs.readFileSync(
  path.join(__dirname, 'src', 'app', 'casestudy', 'lessonloom', 'page.tsx'),
  { encoding: 'utf8' }
);
const lessonLoomPageClean = lessonLoomPageContent.trimEnd() + '\n';
const lessonLoomPagePath = path.join(__dirname, 'src', 'app', 'casestudy', 'lessonloom', 'page.tsx');
fs.writeFileSync(lessonLoomPagePath, lessonLoomPageClean, { encoding: 'utf8' });
console.log('LessonLoom page file fixed successfully.');

console.log('All case study files have been fixed and trailing spaces removed.'); 