'use client';

import React from 'react';

interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (question: string) => void;
}

const ChatSuggestions = ({ suggestions, onSelect }: ChatSuggestionsProps) => {
  return (
    <div className="mb-3 mt-1">
      <p className="text-xs text-accent-600 mb-2 font-medium">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            className="text-xs bg-gradient-to-r from-accent-100/80 to-accent-200/80 hover:from-accent-200 hover:to-accent-300 text-accent-700 hover:text-accent-800 px-3 py-1.5 rounded-full transition-all border border-accent-200/50 hover:border-accent-300/50 shadow-sm hover:shadow"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSuggestions;
