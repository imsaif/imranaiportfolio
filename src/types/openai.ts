/**
 * OpenAI API Types
 */

/**
 * Represents a chat message for the OpenAI API
 */
export interface ChatMessage {
  /** Role of the message sender (system, user, or assistant) */
  role: 'system' | 'user' | 'assistant';
  /** Content of the message */
  content: string;
}

/**
 * Request payload for the OpenAI Chat API
 */
export interface OpenAIRequestPayload {
  /** ID of the model to use */
  model: string;
  /** Array of messages to provide as context */
  messages: ChatMessage[];
  /** Sampling temperature (0-2) */
  temperature?: number;
  /** Maximum number of tokens to generate */
  max_tokens?: number;
  /** Alternative to temperature for nucleus sampling */
  top_p?: number;
  /** Number between -2.0 and 2.0. Positive values penalize new tokens based on their frequency */
  frequency_penalty?: number;
  /** Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the prompt */
  presence_penalty?: number;
}

/**
 * Choice returned by the OpenAI API
 */
export interface OpenAIChoice {
  /** Index of the choice */
  index: number;
  /** The generated message */
  message: ChatMessage;
  /** The reason why generation stopped */
  finish_reason: 'stop' | 'length' | 'content_filter' | null;
}

/**
 * Usage information returned by the OpenAI API
 */
export interface OpenAIUsage {
  /** Number of tokens in the prompt */
  prompt_tokens: number;
  /** Number of tokens in the completion */
  completion_tokens: number;
  /** Total number of tokens used */
  total_tokens: number;
}

/**
 * Error returned by the OpenAI API
 */
export interface OpenAIError {
  /** Error message */
  message: string;
  /** Error type */
  type: string;
  /** Error code */
  code?: string | number;
  /** Parameter that caused the error */
  param?: string | null;
}

/**
 * Response from the OpenAI Chat API
 */
export interface OpenAIResponse {
  /** ID of the response */
  id: string;
  /** Object type */
  object: string;
  /** Unix timestamp of when the response was created */
  created: number;
  /** The model used */
  model: string;
  /** Array of choices/completions */
  choices: OpenAIChoice[];
  /** Usage statistics */
  usage: OpenAIUsage;
  /** Error information if present */
  error?: OpenAIError;
}

/**
 * Internal API response format
 */
export interface ChatAPIResponse {
  /** The generated text response */
  response: string;
}

/**
 * Project link format
 */
export interface ProjectLink {
  /** Name of the project */
  name: string;
  /** URL to the project page */
  url: string;
}

/**
 * Request format for the chat API
 */
export interface ChatAPIRequest {
  /** Messages to process */
  messages: (ChatMessage | string)[];
}
