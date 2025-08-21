# AI Chat Implementation Guide

This document explains how to set up and use the OpenAI-powered chat feature on your portfolio site.

## Overview

The AI chat assistant is designed to provide genuine, context-aware responses about your portfolio, skills, and experience. It can be configured to use:

1. **OpenAI GPT Integration** - For natural, dynamic responses based on your portfolio data
2. **Local Fallback Mode** - For simple, predefined responses when the API is unavailable

## Setup Instructions

### 1. Get an OpenAI API Key

1. Create an account at [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API Keys and create a new secret key
3. Copy this key for the next step

### 2. Configure Environment Variables

1. Open the `.env.local` file in the root directory
2. Replace `your_openai_key_here` with your actual OpenAI API key
3. To enable the OpenAI integration, change `NEXT_PUBLIC_USE_AI_API` to `true`

```
# OpenAI API Configuration
OPENAI_API_KEY=your_actual_key_here
NEXT_PUBLIC_USE_AI_API=true
```

### 3. Customize Your Portfolio Context

The AI uses the data in `src/data/portfolio-context.json` to generate informed responses about your work. Update this file with your:

- Professional experience
- Skills and tools
- Projects and case studies
- Design philosophy and approach
- Education and certifications

Be as detailed as possible - this data forms the AI's knowledge base about you.

## How It Works

1. When a visitor asks a question through the chat interface, the request is sent to a secure API route
2. This route forwards the request to OpenAI with your portfolio context
3. OpenAI generates a response based on your portfolio data
4. If the API is unavailable, the system falls back to local predefined responses

## Testing and Verification

After setup, test the chat by asking various questions about your work. Verify that:

1. The AI provides responses that accurately reflect your portfolio data
2. Responses feel natural and conversational
3. The system gracefully handles questions outside its knowledge scope

## Troubleshooting

If you encounter issues:

- **API Key Error**: Verify your OpenAI API key is correct and has sufficient credits
- **Rate Limiting**: OpenAI has usage limits; you may need to upgrade your plan for higher traffic
- **Unexpected Responses**: Refine your portfolio context with more specific information

## Privacy and Security

- Your OpenAI API key is stored securely in environment variables
- The key is never exposed to clients or included in client-side code
- All API requests are made server-side through a secure API route

## Customization Options

### Adjust Response Style

To modify how the AI responds, edit the system message in `src/app/api/chat/route.ts`. You can:

- Change the tone (professional, casual, technical)
- Modify response length constraints
- Emphasize different aspects of your portfolio

### Update Suggested Questions

Edit the suggested questions that appear at the start of the chat by modifying the `localSuggestedQuestions` array in `src/components/ui/ChatInterface.tsx`.

### Style Customization

The chat interface can be styled by editing the components in:
- `src/components/ui/ChatInterface.tsx`
- `src/components/ui/chat/ChatMessageList.tsx`
- `src/components/ui/chat/ChatInput.tsx`
- `src/components/ui/chat/ChatSuggestions.tsx` 