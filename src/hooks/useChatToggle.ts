'use client';

import { useState, useCallback } from 'react';

import { useChat } from '../context/ChatContext';
import { ChatToggleState } from '../types/chat';
import { toggleScrollLock } from '../utils/scrollLock';

/**
 * Custom hook options for useChatToggle
 */
interface UseChatToggleOptions {
  /**
   * Whether to automatically update the global chat context
   * @default true
   */
  updateGlobalContext?: boolean;

  /**
   * Initial state of the chat (open or closed)
   * @default false
   */
  initialState?: boolean;

  /**
   * Whether to lock page scrolling when chat is open
   * @default false
   */
  lockScroll?: boolean;
}

/**
 * Custom hook to manage chat toggle state and related effects
 * This centralizes chat toggle functionality across components
 *
 * @param options Configuration options for the hook
 * @returns Object containing the chat open state and toggle function
 */
export const useChatToggle = (options?: UseChatToggleOptions): ChatToggleState => {
  const { updateGlobalContext = true, initialState = false, lockScroll = false } = options || {};

  const [isChatOpen, setIsChatOpen] = useState<boolean>(initialState);
  const { openChat, closeChat } = useChat();

  /**
   * Toggle chat visibility and manage side effects
   * @param e Optional event object to prevent default behavior
   */
  const toggleChat = useCallback(
    (e?: React.MouseEvent) => {
      // Prevent default behavior if event exists
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const newChatOpenState = !isChatOpen;

      // First update the local state
      setIsChatOpen(newChatOpenState);

      // Apply scroll locking if enabled
      if (lockScroll) {
        toggleScrollLock(newChatOpenState);
      }

      // Update the global context if needed
      if (updateGlobalContext) {
        if (newChatOpenState) {
          openChat();
        } else {
          closeChat();
        }
      }
    },
    [isChatOpen, openChat, closeChat, updateGlobalContext, lockScroll]
  );

  return {
    isChatOpen,
    toggleChat,
  };
};

export default useChatToggle;
