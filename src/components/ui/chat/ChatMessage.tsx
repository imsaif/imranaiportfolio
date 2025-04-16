'use client';

import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

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

  // Enhanced function to parse markdown links and improve formatting of case study content
  const createMarkup = (content: string) => {
    // Enhanced link detection with case study-specific styling
    const caseStudyLinkRegex = /\[View ([^\]]+) Case Study\]\(([^)]+)\)/g;
    
    // Replace case study links with specially styled buttons
    let formattedContent = content.replace(
      caseStudyLinkRegex, 
      '<a href="$2" class="block px-4 py-2.5 my-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium text-center w-full sm:w-auto" target="_self" rel="noopener noreferrer">View $1 Case Study</a>'
    );
    
    // Style project titles more prominently
    formattedContent = formattedContent.replace(
      /\*\*(LessonLoom|EduScheduler)\*\*/g,
      '<h3 class="text-lg font-bold text-indigo-700 mt-4 mb-2">$1</h3>'
    );
    
    // Basic markdown link regex - for other links not related to case studies
    const regularLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    // Replace regular markdown links with styled button HTML
    formattedContent = formattedContent.replace(
      regularLinkRegex, 
      '<a href="$2" class="inline-block px-4 py-2 mt-2 mb-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm font-medium" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    
    // Format lists better
    formattedContent = formattedContent.replace(/- /g, '• ');
    
    // Add proper styling to bold text that isn't already styled as a heading
    formattedContent = formattedContent.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-indigo-700 font-semibold block mt-3 mb-1">$1</strong>');
    
    // Convert line breaks to proper HTML with more spacing between paragraphs
    formattedContent = formattedContent.replace(/\n\n/g, '</p><p class="mt-3">').replace(/\n/g, '<br/>');
    
    // Wrap in a paragraph tag to ensure proper styling
    return { __html: `<p>${formattedContent}</p>` };
  };

  // Add global style to head once
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    style.innerHTML = `
      .chat-message-content a {
        display: inline-block;
        padding: 0.5rem 1rem;
        margin: 0.5rem 0;
        color: white;
        background-color: #4f46e5;
        border-radius: 0.375rem;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
      .chat-message-content a:hover {
        background-color: #4338ca;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
      }
      .chat-message-content a:active {
        transform: translateY(0);
      }
      .chat-message-content p {
        margin-bottom: 0.75rem;
      }
      .chat-message-content p:last-child {
        margin-bottom: 0;
      }
      .chat-message-content strong {
        color: #4f46e5;
        font-weight: 600;
        display: block;
        margin-top: 1rem;
        margin-bottom: 0.25rem;
      }
      .chat-message-content h3 {
        color: #4338ca;
        font-weight: 700;
        font-size: 1.125rem;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        display: block;
      }
    `;
    document.head.appendChild(style);

    // Clean up on unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      ref={messageRef}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3 sm:mb-4 ${className}`}
      style={{ minHeight: '34px' }} // Slightly smaller min height for mobile
    >
      <div
        className={`
          px-3 sm:px-4 py-2 sm:py-3 rounded-2xl max-w-[90%] sm:max-w-[85%] break-words backdrop-blur-sm
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
        {/* Use ReactMarkdown for bot messages, plain text for user */}
        {isBot ? (
          // Use dangerouslySetInnerHTML for bot messages to ensure links work
          <div 
            dangerouslySetInnerHTML={createMarkup(message.text)}
            className="chat-message-content"
          />
        ) : (
          // Keep user messages as simple text
          message.text
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
