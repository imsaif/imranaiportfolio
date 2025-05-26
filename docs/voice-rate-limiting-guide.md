# Voice Bot Rate Limiting System

## 🛡️ Overview

The voice bot rate limiting system prevents API abuse and controls costs for both ElevenLabs voice cloning and OpenAI chat interactions. It implements multiple layers of protection to ensure a great user experience while keeping costs manageable.

## 🎯 Why Rate Limiting is Essential

### Cost Protection
- **ElevenLabs charges per character** (~$0.0003 per character)
- **OpenAI charges per token** (varies by model)
- **Uncontrolled usage** could result in unexpected bills
- **Rate limiting ensures predictable costs**

### User Experience
- **Prevents system overload** during high traffic
- **Ensures fair access** for all visitors
- **Maintains response quality** by preventing rushed interactions
- **Graceful degradation** when limits are reached

### Security
- **Prevents automated abuse** from bots
- **Mitigates DoS attacks** on voice services
- **Protects against malicious usage** patterns

## 📊 Rate Limiting Layers

### 1. Session Limits (Per Browser Session)
```typescript
maxConversationsPerSession: 3,      // Max voice conversations per session
maxMessagesPerConversation: 10,     // Max messages per conversation
maxCharactersPerMessage: 500,       // Max characters per message
maxCharactersPerSession: 3000,      // Total characters per session
```

### 2. Time-Based Limits
```typescript
maxConversationsPerHour: 5,         // Max conversations per hour
maxCharactersPerHour: 5000,        // Max characters per hour
cooldownBetweenMessages: 3,        // Seconds between messages
```

### 3. Daily Limits (Reset at Midnight)
```typescript
maxConversationsPerDay: 10,        // Max conversations per day
maxCharactersPerDay: 10000,        // Max characters per day
maxCostPerDay: 5.00,              // Max cost per day ($)
```

### 4. Voice Cloning Specific
```typescript
maxClonedVoiceMinutesPerDay: 20,           // Max cloned voice minutes per day
maxClonedVoiceCharactersPerSession: 1500,  // Prefer premium voice for shorter interactions
```

## ⚙️ Configuration

### Environment Variables

You can customize rate limits using environment variables in your `.env.local`:

```bash
# Session Limits
NEXT_PUBLIC_VOICE_MAX_CONVERSATIONS_PER_SESSION=3
NEXT_PUBLIC_VOICE_MAX_MESSAGES_PER_CONVERSATION=10
NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_MESSAGE=500
NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_SESSION=3000

# Time-Based Limits
NEXT_PUBLIC_VOICE_MAX_CONVERSATIONS_PER_HOUR=5
NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_HOUR=5000
NEXT_PUBLIC_VOICE_COOLDOWN_BETWEEN_MESSAGES=3

# Daily Limits
NEXT_PUBLIC_VOICE_MAX_CONVERSATIONS_PER_DAY=10
NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_DAY=10000
NEXT_PUBLIC_VOICE_MAX_COST_PER_DAY=5.00

# Voice Cloning Specific
NEXT_PUBLIC_VOICE_MAX_CLONED_MINUTES_PER_DAY=20
NEXT_PUBLIC_VOICE_MAX_CLONED_CHARACTERS_PER_SESSION=1500
```

### Preset Configurations

Use predefined presets for different environments:

```bash
# Set a preset configuration
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=production

# Available presets:
# - development: Generous limits for testing
# - production: Conservative limits for production
# - demo: Very restrictive for public demos
```

### Preset Details

#### Development Preset
```typescript
{
  maxConversationsPerSession: 10,
  maxMessagesPerConversation: 50,
  maxCharactersPerMessage: 1000,
  maxCharactersPerSession: 10000,
  maxConversationsPerHour: 20,
  maxCharactersPerHour: 15000,
  cooldownBetweenMessages: 1,
  maxConversationsPerDay: 50,
  maxCharactersPerDay: 30000,
  maxCostPerDay: 10.00,
  maxClonedVoiceMinutesPerDay: 60,
  maxClonedVoiceCharactersPerSession: 5000,
}
```

#### Production Preset (Default)
```typescript
{
  maxConversationsPerSession: 3,
  maxMessagesPerConversation: 10,
  maxCharactersPerMessage: 500,
  maxCharactersPerSession: 3000,
  maxConversationsPerHour: 5,
  maxCharactersPerHour: 5000,
  cooldownBetweenMessages: 3,
  maxConversationsPerDay: 10,
  maxCharactersPerDay: 10000,
  maxCostPerDay: 5.00,
  maxClonedVoiceMinutesPerDay: 20,
  maxClonedVoiceCharactersPerSession: 1500,
}
```

#### Demo Preset
```typescript
{
  maxConversationsPerSession: 1,
  maxMessagesPerConversation: 5,
  maxCharactersPerMessage: 300,
  maxCharactersPerSession: 1000,
  maxConversationsPerHour: 2,
  maxCharactersPerHour: 2000,
  cooldownBetweenMessages: 5,
  maxConversationsPerDay: 3,
  maxCharactersPerDay: 3000,
  maxCostPerDay: 1.00,
  maxClonedVoiceMinutesPerDay: 5,
  maxClonedVoiceCharactersPerSession: 500,
}
```

## 🚀 How It Works

### 1. User Identification
```typescript
// Privacy-respecting user identification
// Client-side: Uses session storage
// Server-side: Uses IP-based identifier (hashed)
const userId = generateUserId(request);
```

### 2. Multi-Level Checking
```typescript
// Before each interaction
const rateLimitCheck = voiceBotRateLimiter.checkRateLimit(
  messageText,
  useClonedVoice,
  request
);

if (!rateLimitCheck.allowed) {
  // Show user-friendly error message
  // Suggest alternatives (like standard voice)
  // Provide time until reset
}
```

### 3. Smart Degradation
```typescript
// If cloned voice is rate limited, try standard voice
if (!canUseClonedVoice) {
  const standardVoiceCheck = checkRateLimit(message, false);
  if (standardVoiceCheck.allowed) {
    // Use standard browser TTS instead
    useStandardVoice(message);
  }
}
```

### 4. Usage Tracking
```typescript
// Record usage after successful interaction
voiceBotRateLimiter.recordUsage(
  messageText,
  usedClonedVoice,
  request
);
```

## 📈 Monitoring & Analytics

### Real-Time Usage Display

The system includes a usage monitor component that shows:

- **Session Progress**: Current usage vs limits
- **Estimated Costs**: Real-time cost tracking
- **Voice Minutes**: Cloned voice usage tracking
- **Daily Limits**: Remaining daily allowances

### Usage Monitoring API

```typescript
// Get current usage stats
const usage = voiceBotRateLimiter.getCurrentUsage();

// Get usage summary across all users
const summary = voiceBotRateLimiter.getUsageSummary();

// Check if user should use cloned voice
const shouldUseCloned = voiceBotRateLimiter.shouldUseClonedVoice(message);
```

### Console Logging

The system provides detailed console logging:

```typescript
// Successful usage
✅ Used Imran's cloned voice!
📢 Used standard TTS voice (rate limited)

// Configuration
Voice rate limits configured: {
  maxConversationsPerSession: 3,
  maxCharactersPerSession: 3000,
  maxCostPerDay: 5.00,
  environment: 'production',
  preset: 'auto'
}
```

## 🛠️ Implementation Examples

### Basic Integration

```typescript
import { voiceBotRateLimiter } from '../services/voiceBotRateLimit';

// Before processing user message
const rateLimitCheck = voiceBotRateLimiter.checkRateLimit(userMessage, false);

if (!rateLimitCheck.allowed) {
  showErrorMessage(rateLimitCheck.reason);
  return;
}

// Process message and record usage
const response = await generateResponse(userMessage);
voiceBotRateLimiter.recordUsage(userMessage, false);
```

### Advanced Usage with Monitoring

```typescript
import VoiceUsageMonitor from '../components/VoiceUsageMonitor';

function VoiceChat() {
  const [showUsageMonitor, setShowUsageMonitor] = useState(false);
  
  return (
    <>
      <VoiceBot />
      
      {/* Usage Monitor Button */}
      <button onClick={() => setShowUsageMonitor(true)}>
        View Usage
      </button>
      
      {/* Usage Monitor Component */}
      <VoiceUsageMonitor 
        isVisible={showUsageMonitor}
        onClose={() => setShowUsageMonitor(false)}
      />
    </>
  );
}
```

### Custom Rate Limits

```typescript
import { VoiceBotRateLimiter } from '../services/voiceBotRateLimit';

// Create custom rate limiter with different limits
const customRateLimiter = new VoiceBotRateLimiter({
  maxCharactersPerMessage: 1000,
  maxCostPerDay: 10.00,
  cooldownBetweenMessages: 1, // Faster for testing
});
```

## 🔧 Troubleshooting

### Common Issues

#### Rate Limits Too Restrictive
```bash
# Increase limits for development
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=development

# Or customize specific limits
NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_MESSAGE=1000
NEXT_PUBLIC_VOICE_COOLDOWN_BETWEEN_MESSAGES=1
```

#### Users Hitting Limits Too Quickly
```typescript
// Check current configuration
const limits = voiceBotRateLimiter.getLimits();
console.log('Current limits:', limits);

// Review usage patterns
const summary = voiceBotRateLimiter.getUsageSummary();
console.log('Usage summary:', summary);
```

#### Cost Overruns
```bash
# Set stricter daily cost limits
NEXT_PUBLIC_VOICE_MAX_COST_PER_DAY=2.00

# Reduce cloned voice usage
NEXT_PUBLIC_VOICE_MAX_CLONED_CHARACTERS_PER_SESSION=500
```

### Debugging Rate Limits

```typescript
// Enable detailed logging
localStorage.setItem('DEBUG_VOICE_RATE_LIMITS', 'true');

// Check rate limit status for specific message
const result = voiceBotRateLimiter.checkRateLimit(testMessage, true);
console.log('Rate limit result:', result);

// Get current usage
const usage = voiceBotRateLimiter.getCurrentUsage();
console.log('Current usage:', usage);
```

### Reset User Session

```typescript
// For testing or support purposes
voiceBotRateLimiter.resetUserSession();
```

## 📊 Cost Estimation

### ElevenLabs Pricing
- **Characters**: ~$0.0003 per character
- **10,000 characters/day**: ~$3.00/day
- **Free tier**: 10,000 characters/month

### OpenAI Pricing (GPT-4)
- **Input tokens**: ~$0.03 per 1K tokens
- **Output tokens**: ~$0.06 per 1K tokens
- **Average conversation**: ~$0.01-0.05

### Daily Cost Examples

#### Conservative Usage (Production Preset)
- **Characters/day**: 10,000
- **ElevenLabs cost**: ~$3.00
- **OpenAI cost**: ~$0.50
- **Total daily cost**: ~$3.50

#### High Usage (Development Preset)
- **Characters/day**: 30,000
- **ElevenLabs cost**: ~$9.00
- **OpenAI cost**: ~$1.50
- **Total daily cost**: ~$10.50

## 🚀 Best Practices

### For Development
1. **Use development preset** for generous limits
2. **Monitor usage patterns** during testing
3. **Test rate limiting scenarios** thoroughly
4. **Validate configuration** before deployment

### For Production
1. **Start with conservative limits** (production preset)
2. **Monitor actual usage** in the first week
3. **Adjust limits based on data** and user feedback
4. **Set up alerts** for high usage/costs
5. **Review limits monthly** and adjust as needed

### For Public Demos
1. **Use demo preset** for restrictive limits
2. **Show usage monitor** to demonstrate transparency
3. **Provide clear messaging** about demo limitations
4. **Consider separate demo environment** with different limits

## 📝 User Communication

### Error Messages

The system provides user-friendly error messages:

- `"Please wait 3 seconds before sending another message."`
- `"Session character limit reached. Maximum 3000 characters per session."`
- `"Daily voice cloning limit reached. Standard voice will be used instead."`
- `"Maximum conversations per session reached. Please refresh to start a new session."`

### Usage Transparency

Users can see their usage in real-time:
- Progress bars for session limits
- Estimated costs
- Time until reset
- Daily allowances remaining

## 🔄 Future Enhancements

### Planned Features
1. **Redis-based rate limiting** for multi-server deployments
2. **User authentication** for personalized limits
3. **Premium tiers** with higher limits
4. **Usage analytics dashboard** for administrators
5. **Automatic limit adjustment** based on usage patterns
6. **Integration with payment systems** for paid usage

### Advanced Configurations
1. **Geographic rate limiting** (different limits by region)
2. **Time-based variations** (higher limits during off-peak hours)
3. **User behavior analysis** (adjust limits based on engagement)
4. **A/B testing** for optimal limit configurations

## 📚 API Reference

### VoiceBotRateLimiter Methods

```typescript
// Check if interaction is allowed
checkRateLimit(messageText: string, useClonedVoice: boolean, request?: Request): RateLimitResult

// Record usage after successful interaction
recordUsage(messageText: string, useClonedVoice: boolean, request?: Request): void

// Start new conversation
startNewConversation(request?: Request): boolean

// Get current usage stats
getCurrentUsage(request?: Request): VoiceUsageStats | null

// Get usage summary
getUsageSummary(): UsageSummary

// Check if should use cloned voice
shouldUseClonedVoice(messageText: string, request?: Request): boolean

// Reset user session
resetUserSession(request?: Request): void

// Get current limits
getLimits(): VoiceRateLimits
```

## 🎯 Success Metrics

You'll know the rate limiting system is working effectively when:

1. **Costs remain predictable** and within budget
2. **Users don't frequently hit limits** during normal usage
3. **System performance** remains stable under load
4. **Error messages are clear** and helpful
5. **Usage patterns show healthy engagement** without abuse

The rate limiting system ensures your voice bot provides an excellent user experience while protecting your API costs and maintaining system stability. 