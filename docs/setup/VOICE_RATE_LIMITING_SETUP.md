# Voice Rate Limiting - Quick Setup Guide

## 🚀 Quick Start

### 1. Choose Your Environment

Add to your `.env.local` file:

```bash
# For development (generous limits)
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=development

# For production (conservative limits) 
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=production

# For public demos (very restrictive)
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=demo
```

### 2. Custom Configuration (Optional)

Override specific limits by adding these to `.env.local`:

```bash
# Session Limits
NEXT_PUBLIC_VOICE_MAX_CONVERSATIONS_PER_SESSION=3
NEXT_PUBLIC_VOICE_MAX_MESSAGES_PER_CONVERSATION=10
NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_MESSAGE=500
NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_SESSION=3000

# Time Limits
NEXT_PUBLIC_VOICE_MAX_CONVERSATIONS_PER_HOUR=5
NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_HOUR=5000
NEXT_PUBLIC_VOICE_COOLDOWN_BETWEEN_MESSAGES=3

# Daily Limits
NEXT_PUBLIC_VOICE_MAX_CONVERSATIONS_PER_DAY=10
NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_DAY=10000
NEXT_PUBLIC_VOICE_MAX_COST_PER_DAY=5.00

# Voice Cloning Limits
NEXT_PUBLIC_VOICE_MAX_CLONED_MINUTES_PER_DAY=20
NEXT_PUBLIC_VOICE_MAX_CLONED_CHARACTERS_PER_SESSION=1500
```

## 🎯 Recommended Settings

### Development
```bash
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=development
# Allows generous testing with higher limits
```

### Production
```bash
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=production
# Conservative limits to control costs (~$3-5/day max)
```

### Public Demo
```bash
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=demo
# Very restrictive for public demonstrations
```

## 💰 Cost Control

The system automatically:
- ✅ Prevents unlimited API usage
- ✅ Falls back to free TTS when limits reached
- ✅ Shows real-time cost estimates
- ✅ Resets limits daily at midnight
- ✅ Provides user-friendly error messages

## 📊 Monitoring

Users can see their usage in real-time:
- Character usage vs limits
- Estimated costs
- Voice minutes used
- Time until reset

## 🔧 Testing

To test rate limiting:

```typescript
// In browser console
voiceBotRateLimiter.resetUserSession(); // Reset for testing
voiceBotRateLimiter.getCurrentUsage();  // Check current usage
```

## 📖 Full Documentation

See [voice-rate-limiting-guide.md](./voice-rate-limiting-guide.md) for complete documentation. 