'use client';

import Link from 'next/link';
import React from 'react';
import { AnimatedScrollableList } from '@/components/ui';

const sampleItems = [
  <div key="1" className="p-4 bg-blue-100 rounded shadow w-full text-center">
    Item 1: Welcome to the animated list!
  </div>,
  <div key="2" className="p-4 bg-green-100 rounded shadow w-full text-center">
    Item 2: Scroll resets to 1 when in view.
  </div>,
  <div key="3" className="p-4 bg-yellow-100 rounded shadow w-full text-center">
    Item 3: Try scrolling away and back!
  </div>,
];

export default function TestPage() {
  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-200">
        This is a simple test page to verify routing and demo the AnimatedScrollableList component.
      </p>
      <div className="w-full max-w-md mb-8">
        <AnimatedScrollableList items={sampleItems} />
      </div>
      <Link href="/" className="text-blue-600 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
