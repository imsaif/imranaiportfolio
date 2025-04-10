/**
 * TypeScript interfaces for component props
 */

import { ReactNode } from 'react';

import { AnimationProps } from './animations';
import { Message, SendMessageFunction } from './chat';

/**
 * Props for HeroHeading component
 */
export interface HeroHeadingProps {
  /** Whether the component is visible */
  isVisible: boolean;
  /** Array of text options to cycle through */
  aiTextOptions: string[];
  /** Additional animation props */
  animationProps?: AnimationProps;
}

/**
 * Props for HeroChatSection component
 */
export interface HeroChatSectionProps {
  /** Function to close the chat section */
  closeChat: () => void;
  /** Additional animation props */
  animationProps?: AnimationProps;
}

/**
 * Props for HeroButtons component
 */
export interface HeroButtonsProps {
  /** Whether the component is visible */
  isVisible: boolean;
  /** Whether the chat is currently open */
  isChatOpen: boolean;
  /** Function to toggle the chat open/closed state */
  onChatToggle: (e?: React.MouseEvent) => void;
}

/**
 * Props for HeroContactInfo component
 */
export interface HeroContactInfoProps {
  /** Whether the component is visible */
  isVisible: boolean;
}

/**
 * Props for Button component
 */
export interface ButtonProps {
  /** Button children/content */
  children: ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Additional CSS classes */
  className?: string;
  /** Link href (if button is a link) */
  href?: string;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Additional attributes */
  [key: string]: any;
}

/**
 * Props for ChatInterface component
 */
export interface ChatInterfaceProps {
  /** Function to close the chat interface */
  closeChat?: () => void;
  /** Initial messages to display */
  initialMessages?: Message[];
  /** Whether to display suggested questions */
  showSuggestions?: boolean;
  /** Callback when a message is sent */
  onMessageSend?: (message: Message) => void;
}

/**
 * Props for ChatMessageList component
 */
export interface ChatMessageListProps {
  /** Array of messages to display */
  messages: Message[];
  /** Whether to show the typing indicator */
  isTyping: boolean;
}

/**
 * Props for ChatMessage component
 */
export interface ChatMessageProps {
  /** The message to display */
  message: Message;
  /** Whether to show the sender information */
  showSender?: boolean;
  /** Whether to show the timestamp */
  showTimestamp?: boolean;
}

/**
 * Props for ChatInput component
 */
export interface ChatInputProps {
  /** Callback when a message is sent */
  onSendMessage: SendMessageFunction;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Initial value for the input */
  initialValue?: string;
}

/**
 * Props for ChatSuggestions component
 */
export interface ChatSuggestionsProps {
  /** Array of suggested questions */
  suggestions: string[];
  /** Callback when a suggestion is selected */
  onSelect: SendMessageFunction;
}

/**
 * Props for ChatTypingIndicator component
 */
export interface ChatTypingIndicatorProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the ChatProvider component
 */
export interface ChatProviderProps {
  /** Child components */
  children: ReactNode;
  /** Initial state */
  initialIsOpen?: boolean;
}
