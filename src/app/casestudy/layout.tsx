'use client';

import React from 'react';

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="case-study-layout legacy-tokens">
      {children}
    </div>
  );
}
