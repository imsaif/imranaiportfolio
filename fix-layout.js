const fs = require('fs');
const path = require('path');

const content = `'use client';

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

const filePath = path.join(__dirname, 'src', 'app', 'casestudy', 'layout.tsx');

fs.writeFileSync(filePath, content, { encoding: 'utf8' });

console.log('Layout file created successfully without trailing spaces.'); 