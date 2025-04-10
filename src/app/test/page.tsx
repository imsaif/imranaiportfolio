'use client';

import React from 'react';
import Link from 'next/link';

export default function TestPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Page</h1>
      <p>This is a simple test page to verify routing is working.</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
