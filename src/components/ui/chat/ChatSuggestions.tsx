'use client';

import React from 'react';

interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (question: string) => void;
}

const ChatSuggestions = ({ suggestions, onSelect }: ChatSuggestionsProps) => {
  return (
    <div className="mb-2 mt-1">
      <p className="text-xs text-accent-600 mb-2 font-medium text-left">Suggested questions:</p>
      <div className="flex flex-wrap gap-1 sm:gap-2 justify-start">
        {suggestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            className="text-xs sm:text-xs bg-gradient-to-r from-accent-100/80 to-accent-200/80 hover:from-accent-200 hover:to-accent-300 text-accent-700 hover:text-accent-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all border border-accent-200/50 hover:border-accent-300/50 shadow-sm hover:shadow"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSuggestions;
