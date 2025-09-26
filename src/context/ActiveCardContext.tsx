'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveCardContextType {
  activeCardId: string | null;
  setActiveCardId: (id: string | null) => void;
}

const ActiveCardContext = createContext<ActiveCardContextType | undefined>(undefined);

export const useActiveCard = () => {
  const context = useContext(ActiveCardContext);
  if (context === undefined) {
    throw new Error('useActiveCard must be used within an ActiveCardProvider');
  }
  return context;
};

interface ActiveCardProviderProps {
  children: ReactNode;
}

export const ActiveCardProvider: React.FC<ActiveCardProviderProps> = ({ children }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <ActiveCardContext.Provider value={{ activeCardId, setActiveCardId }}>
      {children}
    </ActiveCardContext.Provider>
  );
};