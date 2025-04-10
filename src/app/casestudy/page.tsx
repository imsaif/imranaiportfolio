'use client';

import Link from 'next/link';
import React from 'react';

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
}
