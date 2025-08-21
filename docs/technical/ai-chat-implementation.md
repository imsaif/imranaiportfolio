# AI Chat Implementation Guide

This document explains how the "Chat with my AI" feature works in the portfolio site and how to fully activate the OpenAI integration.

## Overview

The chat feature allows visitors to interact with an AI assistant that can answer questions about Imran's work, skills, projects, and design approach. The implementation has two modes:

1. **Local Mode (Default)**: Uses predefined responses based on keyword matching
2. **API Mode**: Uses OpenAI's GPT model to generate more natural and context-aware responses

## How It Works

The chat system consists of the following components:

- **ChatInterface**: The main component that displays messages and handles user input
- **ChatMessageList**: Renders the message history with typing indicators
- **ChatInput**: Handles user message input
- **ChatSuggestions**: Displays suggested questions to help users get started
- **chatService.ts**: Core logic for generating responses, with fallback to local responses
- **API Route**: A Next.js API route that securely calls OpenAI

## Activating OpenAI Integration

To fully activate the OpenAI integration:

1. **Set up your OpenAI API key**:
   - Get an API key from [OpenAI](https://platform.openai.com/)
   - Add it to the `.env.local` file:
   ```
   OPENAI_API_KEY=YOUR_API_KEY_HERE
   USE_AI_API=true
   ```

2. **Customize the portfolio context**:
   - Edit the `src/data/portfolio-context.json` file to include accurate information about your work, skills, and projects
   - This context is used to generate relevant and accurate responses

3. **Test the integration**:
   - Run the site locally with `npm run dev`
   - Click "Chat with my AI" and ask questions
   - Verify that responses are generated from OpenAI rather than using local fallbacks

## Customization Options

You can customize the chat experience by:

1. **Editing suggested questions**:
   - Modify the `suggestedQuestions` array in `src/utils/chatService.ts`

2. **Changing initial greeting messages**:
   - Update the `initialMessages` array in `src/utils/chatService.ts`

3. **Adjusting the AI model settings**:
   - In `src/app/api/chat/route.ts`, modify the OpenAI API payload parameters
   - For example, adjust `temperature` for more/less creative responses
   - Change `max_tokens` to control response length

4. **Styling the chat interface**:
   - Modify the components in `src/components/ui/chat/` to match your site's design

## Fallback Response System

If the OpenAI API is unavailable or disabled (USE_AI_API=false), the system falls back to local predefined responses based on keyword matching:

- Keywords like "experience," "background," "process," etc. trigger specific responses
- These fallbacks ensure the chat remains functional even without the API connection

## Technical Implementation Notes

- The chat uses React state to track messages and typing status
- Framer Motion provides smooth animations for message transitions
- Messages are automatically scrolled into view when new ones arrive
- The API route keeps your OpenAI API key secure by not exposing it to the client

## Troubleshooting

If you encounter issues with the OpenAI integration:

1. Verify your API key is correct and has sufficient credits
2. Check browser console for error messages
3. Ensure `USE_AI_API` is set to `true` in `.env.local`
4. Test with simple questions first before more complex queries

---

For further customization or help, refer to the OpenAI API documentation or contact Imran. 