# Vapi.ai Setup Guide

## Quick Setup Steps

### 1. Get Vapi.ai API Key
1. Go to [Vapi.ai Dashboard](https://dashboard.vapi.ai)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key

### 2. Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Update with your Vapi.ai credentials:

```bash
# Required: Vapi.ai API Key
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key_here

# Imran's Product Designer Assistant ID (pre-configured)
NEXT_PUBLIC_VAPI_ASSISTANT_ID=fcd09324-15d1-4bd3-8059-fce614a3c946

# Fallback: OpenAI API Key (for TTS fallback)
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Test Voice Mode
1. Start the development server: `npm run dev`
2. Navigate to your portfolio
3. Click the "Voice" mode toggle
4. Click the microphone to start a conversation
5. Speak naturally - Vapi.ai will respond in real-time!

## Advanced Configuration

### Your Pre-configured Assistant
Your assistant is already set up with these specifications:

- **Assistant ID**: `fcd09324-15d1-4bd3-8059-fce614a3c946`
- **Name**: "Product designer"
- **Voice**: Rohan (Vapi provider)
- **Model**: GPT-5-mini
- **Role**: Senior Product Designer with AI expertise
- **First Message**: "Hi my name is Imran, I'm a senior product designer. I can listen and respond to your voice. What would you like to know about my work"
- **System Prompt**: Configured as a knowledgeable senior product designer with extensive AI application experience
- **Transcriber**: Deepgram Nova-2 for accurate speech recognition

No additional setup needed - just add your API key!

### Your Voice Configuration
```javascript
// Your assistant uses Rohan voice from Vapi
voice: {
  provider: 'vapi',
  voiceId: 'Rohan',  // Professional, clear voice for product discussions
}
```

### Voice Characteristics
- **Rohan (Vapi)**: Professional, articulate voice perfect for product design discussions
- **Tone**: Knowledgeable and approachable, ideal for technical conversations
- **Clarity**: Optimized for explaining complex AI and design concepts
- **Personality**: Matches your senior product designer expertise

## Troubleshooting

### Common Issues

1. **"Vapi.ai not configured" error**
   - Check your API key in `.env.local`
   - Ensure the key starts with your account prefix
   - Restart the development server

2. **"Failed to start voice call" error**
   - Verify your Vapi.ai account has sufficient credits
   - Check browser console for detailed error messages
   - Try refreshing the page

3. **Voice quality issues**
   - Try different voice providers in your assistant config
   - Check your internet connection speed
   - Ensure microphone permissions are granted

4. **Fallback to browser TTS**
   - This is normal if Vapi.ai is unavailable
   - Check your API key and account status
   - Verify you have active credits

### Browser Requirements
- **Chrome**: Full support (recommended)
- **Safari**: Full support on macOS/iOS
- **Edge**: Full support
- **Firefox**: Works with some limitations

### Rate Limiting
The system includes built-in rate limiting:
- 3 conversations per session (development)
- $5 daily cost limit
- 3000 characters per session

Adjust in environment variables:
```bash
NEXT_PUBLIC_VOICE_MAX_CONVERSATIONS_PER_SESSION=5
NEXT_PUBLIC_VOICE_MAX_COST_PER_DAY=10.00
```

## Monitoring & Analytics

### Voice Usage Tracking
- Check browser console for voice system logs
- Monitor API usage in Vapi.ai Dashboard
- Track conversation metrics and costs

### Performance Optimization
- Use assistants for consistent experiences
- Preload common responses when possible
- Monitor latency and adjust voice settings

## Support

- **Vapi.ai Documentation**: https://docs.vapi.ai
- **Vapi.ai Discord**: Join their community for support
- **GitHub Issues**: Report bugs in the portfolio repository

## Pricing

### Vapi.ai Pricing (as of 2024)
- **Pay per minute**: ~$0.10-0.15 per minute of conversation
- **Free tier**: Usually includes some free minutes monthly
- **Volume discounts**: Available for higher usage

### Cost Estimation
- Average conversation: 2-3 minutes = ~$0.30
- Daily limit of $5 = ~16-25 conversations
- OpenAI TTS fallback: ~$0.015 per 1K characters