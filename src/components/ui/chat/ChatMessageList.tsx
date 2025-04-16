'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

import { Message } from '../../../types/chat';

interface ChatMessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatMessageList = ({ messages, isTyping }: ChatMessageListProps) => {
  // Auto scroll to the bottom when new messages are added
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div 
      className="flex flex-col p-2 sm:p-4 overflow-y-auto h-full space-y-2 sm:space-y-4"
      style={{
        scrollbarWidth: 'thin', /* Firefox */
        scrollbarColor: 'var(--accent-200) transparent', /* Firefox */
      }}
    >
      {/* Custom scrollbar styling for WebKit browsers */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background-color: var(--accent-200);
          border-radius: 20px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background-color: var(--accent-300);
        }
      `}</style>

      {messages.map(message => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[90%] sm:max-w-[85%] px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
              message.sender === 'user'
                ? 'bg-gradient-to-r from-accent to-tertiary text-white rounded-tr-none'
                : 'bg-gradient-to-br from-white/90 to-accent-50/50 text-foreground border border-accent-100 rounded-tl-none'
            }`}
          >
            <div className="text-sm">{message.text}</div>
          </div>
        </motion.div>
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="max-w-[85%] px-4 py-3 rounded-lg bg-gradient-to-br from-white/90 to-accent-50/50 text-foreground border border-accent-100 rounded-tl-none">
            <div className="flex space-x-2 items-center">
              <span className="text-xs text-accent-600">Thinking...</span>
              <motion.div 
                className="flex space-x-1"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Invisible element to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
