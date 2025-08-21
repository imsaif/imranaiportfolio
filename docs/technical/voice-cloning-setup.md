# ElevenLabs Voice Cloning Setup Guide

## 🎯 Overview

This guide will help you set up ElevenLabs voice cloning integration so that your portfolio's voice assistant speaks in your actual voice! This creates an incredibly personal and memorable experience for visitors.

### **Recent Updates (December 2024)**
- **Enhanced Compatibility**: Added missing `cloneVoice` function export for hybrid conversational agent
- **Improved Error Handling**: Better fallback mechanisms and error recovery
- **Code Quality**: Resolved TypeScript errors and improved type safety
- **Simplified API**: Streamlined function exports for easier integration

## 📋 Prerequisites

- ElevenLabs account (free tier available)
- ~10-15 minutes of high-quality voice recordings
- Access to your portfolio's environment variables

## 🚀 Step-by-Step Setup

### Step 1: Create ElevenLabs Account

1. Go to [ElevenLabs](https://elevenlabs.io)
2. Sign up for a free account (includes 10,000 characters per month)
3. Navigate to your **Profile** → **API Keys**
4. Generate a new API key and save it securely

### Step 2: Record Voice Samples

**Recording Requirements:**
- **Quality**: Clear, noise-free audio
- **Duration**: 10-15 minutes minimum
- **Content**: Natural speech, varied sentences
- **Format**: MP3, WAV, or M4A
- **Environment**: Quiet room, good microphone

**Recommended Recording Script:**
```
Hi, I'm Imran Mohammed, a UX designer passionate about creating AI-enhanced experiences.

I specialize in designing intuitive interfaces that solve real-world problems. My work focuses on educational technology, where I combine user-centered design with cutting-edge AI capabilities.

Let me tell you about my projects. I've worked on LessonLoom, an innovative platform that automates the creation of educational materials using AI and templating systems. This project showcases my ability to design complex workflows while maintaining simplicity for end users.

Another significant project is EduScheduler, an intelligent academic planning system that generates optimized teaching schedules. This demonstrates my expertise in designing systems that handle complex algorithmic processes while providing clear, actionable insights to users.

I believe in the power of design to make technology more accessible and human. Whether it's designing voice interfaces, chat systems, or complex dashboards, my goal is always to create experiences that feel natural and intuitive.

Thanks for visiting my portfolio. I'm excited to discuss how my design skills can contribute to your team's success. What would you like to know about my experience or approach to UX design?

[Continue with more natural conversation, questions about your work, personality, etc.]
```

**Pro Tips:**
- Record multiple sessions to get varied emotional tones
- Include both formal and casual speaking styles
- Add some enthusiasm when talking about exciting projects
- Record common responses you'll use frequently

### Step 3: Create Voice Clone

1. Log into ElevenLabs dashboard
2. Go to **Voice Library** → **Add Voice** → **Instant Voice Cloning**
3. Upload your recorded audio files
4. Name your voice (e.g., "Imran Portfolio Voice")
5. Add description and labels
6. Click **Add Voice**
7. **Copy the Voice ID** (you'll need this for configuration)

### Step 4: Configure Environment Variables

Add these variables to your `.env.local` file:

```bash
# ElevenLabs Voice Cloning Configuration
NEXT_PUBLIC_ELEVENLABS_API_KEY=sk_4b78f4bb9e31e71f54dd6a3284c33df2aa77fb4d713d78d5
NEXT_PUBLIC_ELEVENLABS_VOICE_ID=3VhXx4qDZgzyG9nOyUIf
```

**Important:** Replace the placeholder values with your actual API key and Voice ID.

### Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your portfolio
3. Click on **Voice** mode in the mode toggle
4. You should see:
   - A green ring around the interface (indicating voice cloning is enabled)
   - "Imran ready to help" message
   - Welcome message speaks in your cloned voice!

### Step 6: Verify Voice Quality

**Quality Checklist:**
- [ ] Voice sounds natural and clear
- [ ] Pronunciation is accurate
- [ ] Emotional tone matches your speaking style
- [ ] No robotic artifacts or distortions
- [ ] Consistent quality across different text lengths

**If quality is poor:**
1. Record additional samples with better audio quality
2. Try different speaking styles in your recordings
3. Adjust voice settings in the service configuration
4. Consider using ElevenLabs' paid tiers for higher quality models

## 🎛️ Advanced Configuration

### Voice Settings Optimization

You can fine-tune the voice synthesis in `src/services/voiceCloning.ts`:

```typescript
const DEFAULT_CONFIG: VoiceCloneConfig = {
  voiceId: process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || '',
  modelId: 'eleven_monolingual_v1', // or 'eleven_multilingual_v1'
  settings: {
    stability: 0.5,          // 0-1: Lower = more expressive, Higher = more consistent
    similarity_boost: 0.75,   // 0-1: How similar to original voice
    style: 0.3,              // 0-1: Amount of style to apply
    use_speaker_boost: true   // Enhance speaker characteristics
  }
};
```

**Setting Recommendations:**
- **Stability**: 0.4-0.6 for natural conversation
- **Similarity Boost**: 0.7-0.8 for close voice match
- **Style**: 0.2-0.4 for subtle personality
- **Speaker Boost**: true for better voice characteristics

### Cost Management & Rate Limiting

**Free Tier Limits:**
- 10,000 characters per month
- ~50-100 responses depending on length

**Automatic Rate Limiting (Built-in):**
The voice bot includes comprehensive rate limiting to control costs and prevent abuse:

- **Session Limits:** Max 3 conversations per session, 10 messages each
- **Daily Limits:** Max $5.00 cost per day, 20 minutes of cloned voice
- **Smart Fallback:** Automatically uses free browser TTS when limits reached
- **Real-time Monitoring:** Track usage and costs in real-time

**Configuration:**
```bash
# In your .env.local file
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=production  # Conservative limits

# Or customize individual limits
NEXT_PUBLIC_VOICE_MAX_COST_PER_DAY=5.00
NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_SESSION=3000
```

**Cost Optimization Strategies:**
1. **Preload common responses** (already implemented)
2. **Automatic rate limiting** (prevents overuse)
3. **Smart degradation** to free TTS when needed
4. **Real-time cost monitoring** with usage alerts

```typescript
// Built-in cost monitoring
const usage = voiceBotRateLimiter.getCurrentUsage();
console.log(`Current session cost: $${usage.estimatedCost.toFixed(4)}`);
```

For detailed rate limiting configuration, see `docs/voice-rate-limiting-guide.md`.

## 🔧 Troubleshooting

### Voice Cloning Not Working

**Check these common issues:**

1. **API Key Issues:**
   ```bash
   # Verify your API key is set correctly
   echo $NEXT_PUBLIC_ELEVENLABS_API_KEY
   ```

2. **Voice ID Issues:**
   - Ensure Voice ID matches exactly (case-sensitive)
   - Check that voice was successfully created in ElevenLabs dashboard

3. **Network Issues:**
   - Check browser console for API errors
   - Verify internet connection
   - Try disabling ad blockers

4. **Browser Compatibility:**
   - Test in Chrome/Safari (best support)
   - Check if audio playback is enabled
   - Verify microphone permissions

### Fallback Behavior

The system automatically falls back to standard TTS if:
- ElevenLabs API is unavailable
- API key/Voice ID is missing
- Network errors occur
- Browser doesn't support required features

**Fallback Indicators:**
- "AI Voice" badge instead of "Imran's Voice"
- Standard blue waveform instead of green
- Console messages indicating fallback usage

### Quality Issues

**Common fixes:**
1. **Re-record voice samples** with better quality
2. **Adjust voice settings** for your speaking style
3. **Use shorter sentences** for better synthesis
4. **Train with more diverse speech samples**

## 📊 Monitoring & Analytics

### Usage Tracking

Monitor voice cloning usage in browser console:

```javascript
// Successful cloned voice usage
✅ Used Imran's cloned voice!

// Fallback to standard TTS
📢 Used standard TTS voice

// Preloading status
Preloaded 6 responses
```

### Performance Metrics

Track these metrics:
- **Synthesis latency** (target: <3 seconds)
- **Success rate** (target: >95%)
- **Character usage** (monitor monthly limits)
- **User engagement** (voice mode usage)

## 🚀 Next Steps

### Immediate Improvements

1. **Record more samples** for better voice quality
2. **Add personality-specific responses** for different topics
3. **Optimize voice settings** based on feedback
4. **Monitor usage** and adjust caching strategy

### Future Enhancements

1. **Emotional voice variations** for different response types
2. **Multi-language support** if needed
3. **Voice model updates** as ElevenLabs improves
4. **Custom voice training** for specific portfolio terms

## 💡 Pro Tips

### Recording Best Practices

1. **Consistent environment** - same room, microphone, setup
2. **Natural speech patterns** - don't over-enunciate
3. **Varied content** - questions, statements, emotions
4. **Multiple sessions** - spread recording over several days
5. **Quality check** - listen to samples before uploading

### Portfolio Integration

1. **Personalize responses** - use "I" instead of "Imran"
2. **Match personality** - ensure voice matches your style
3. **Test thoroughly** - try various question types
4. **Update regularly** - refresh voice model as needed

## 🎉 Success Metrics

**You'll know it's working perfectly when:**
- Visitors comment on the voice quality
- Response time is consistently fast
- Voice sounds natural and engaging
- System handles errors gracefully
- Usage stays within API limits

Your portfolio will now have one of the most unique and memorable features possible - a voice assistant that literally speaks in your voice! This creates an unprecedented level of personal connection with visitors.

## 🆘 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Test with ElevenLabs' playground to ensure voice works
4. Review the troubleshooting section above
5. Consider the ElevenLabs documentation for advanced features

**Remember:** The voice cloning feature gracefully falls back to standard TTS, so your voice assistant will always work even if there are configuration issues.
