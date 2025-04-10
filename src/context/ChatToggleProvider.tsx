'use client';

import React, { createContext, useContext, useState } from 'react';

interface ChatToggleContextType {
  isChatOpen: boolean;
  toggleChat: () => void;
}

const ChatToggleContext = createContext<ChatToggleContextType>({
  isChatOpen: false,
  toggleChat: () => {},
});

export const ChatToggleProvider = ({ children }: { children: React.ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return <ChatToggleContext.Provider value={{ isChatOpen, toggleChat }}>{children}</ChatToggleContext.Provider>;
};

export const useChatToggle = () => {
  return useContext(ChatToggleContext);
};

export default ChatToggleProvider;
