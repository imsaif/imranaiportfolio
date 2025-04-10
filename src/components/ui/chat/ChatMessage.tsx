'use client';

import React, { useRef, useEffect } from 'react';

import { Message } from '../../../types/chat';

interface ChatMessageProps {
  message: Message;
  className?: string;
}

/**
 * Chat message component with gradient glassmorphism styling
 */
const ChatMessage = ({ message, className = '' }: ChatMessageProps) => {
  const isBot = message.sender === 'bot';
  const messageRef = useRef<HTMLDivElement>(null);

  // Ensure message container has a stable layout after render
  useEffect(() => {
    if (messageRef.current) {
      // Force layout calculation to avoid shifts
      messageRef.current.getBoundingClientRect();
    }
  }, []);

  return (
    <div
      ref={messageRef}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 ${className}`}
      style={{ minHeight: '38px' }} // Minimum height to reduce layout shifts
    >
      <div
        className={`
          px-4 py-3 rounded-2xl max-w-[85%] break-words backdrop-blur-sm
          ${
            isBot
              ? 'bg-gradient-to-br from-gray-50/90 to-white/70 text-foreground border border-white/40'
              : 'bg-gradient-to-br from-indigo-500/90 to-purple-600/90 text-white border border-white/20'
          }
          ${isBot ? 'rounded-tl-sm' : 'rounded-tr-sm'}
        `}
        style={{
          boxShadow: isBot ? '0 4px 12px rgba(0, 0, 0, 0.05)' : '0 4px 12px rgba(99, 102, 241, 0.15)',
          willChange: 'transform', // Hardware acceleration for smoother rendering
          transform: 'translateZ(0)', // Force GPU rendering
        }}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatMessage;
