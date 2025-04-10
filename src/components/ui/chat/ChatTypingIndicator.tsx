'use client';

import React from 'react';

const ChatTypingIndicator = () => {
  return (
    <div className="flex mb-4 justify-start" style={{ minHeight: '38px' }}>
      <div
        className="px-4 py-3 backdrop-blur-sm bg-gradient-to-r from-gray-50/90 to-white/70 text-foreground border border-white/40 rounded-2xl rounded-tl-sm shadow-sm"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        <div className="flex space-x-2">
          <div
            className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse"
            style={{ animationDelay: '300ms' }}
          ></div>
          <div
            className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse"
            style={{ animationDelay: '600ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChatTypingIndicator;
