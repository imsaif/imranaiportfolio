/**
 * Types for the chat functionality
 */

/**
 * Represents the possible message senders in the chat
 */
export type MessageSender = 'bot' | 'user';

/**
 * Represents a chat message
 */
export interface Message {
  /** Unique identifier for the message */
  id: string;
  /** Content of the message */
  text: string;
  /** Who sent the message */
  sender: 'user' | 'bot';
  /** When the message was sent */
  timestamp: Date;
  /** Optional metadata for the message */
  metadata?: Record<string, any>;
}

/**
 * Chat message list state
 */
export interface ChatMessagesState {
  /** List of messages in the chat */
  messages: Message[];
  /** Whether the bot is currently typing */
  isTyping: boolean;
}

/**
 * Function to send a chat message
 */
export type SendMessageFunction = (text: string) => void;

/**
 * Chat context state and functions
 */
export interface ChatContextType {
  /** Whether the chat interface is open */
  isOpen: boolean;
  /** Function to open the chat interface */
  openChat: () => void;
  /** Function to close the chat interface */
  closeChat: () => void;
}

/**
 * Props for the ChatToggle hook return value
 */
export interface ChatToggleState {
  /** Whether the chat is currently open */
  isChatOpen: boolean;
  /** Function to toggle the chat open/closed state */
  toggleChat: (e?: React.MouseEvent) => void;
}
