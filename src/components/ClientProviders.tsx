'use client';

import React, { useEffect } from 'react';

import { ChatProvider } from '../context/ChatContext';
import { ChatToggleProvider } from '../context/ChatToggleProvider';
import { reportWebVitals } from '../utils/web-vitals';
import PageTransition from './PageTransition';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  // Initialize Web Vitals reporting on component mount
  useEffect(() => {
    reportWebVitals();
  }, []);

  return (
    <ChatProvider>
      <ChatToggleProvider>
        <PageTransition>{children}</PageTransition>
      </ChatToggleProvider>
    </ChatProvider>
  );
}
