'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the message type with proper structure
export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'system';
}

// Define the shape of our context with improved typing
interface ChatContextType {
  // Message handling
  messages: ChatMessage[];
  addMessage: (text: string, sender: 'user' | 'system') => void;
  clearMessages: () => void;

  // Chat interface state
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

// Create the context with default values
const ChatContext = createContext<ChatContextType>({
  // Message handling defaults
  messages: [],
  addMessage: () => {},
  clearMessages: () => {},

  // Chat interface state defaults
  isOpen: false,
  openChat: () => {},
  closeChat: () => {},
});

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Provider component that wraps the app
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  // Message state
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Chat interface state
  const [isOpen, setIsOpen] = useState(false);

  // Message handlers
  const addMessage = (text: string, sender: 'user' | 'system') => {
    const newMessage: ChatMessage = {
      id: generateId(),
      text,
      timestamp: new Date(),
      sender,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  // Chat interface handlers
  const openChat = () => {
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        isOpen,
        openChat,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Hook for easy context access
export const useChat = () => useContext(ChatContext);

export default ChatContext;
