# Hybrid Conversational Agent for Case Studies

## 🎯 Overview

This guide explains the cost-effective hybrid conversational agent system that combines free browser APIs with strategic premium ElevenLabs voice usage. The system provides an engaging voice chat experience for case study pages while keeping costs manageable.

## 🏗️ Architecture

### **Three Main Components:**

1. **HybridConversationalAgent** - Core service managing conversations
2. **CaseStudyConversationalAgent** - React component for the chat interface  
3. **CaseStudyVoiceToggle** - Floating button to activate voice chat

### **Cost Management Strategy:**

- **Free by default**: Uses browser Speech Recognition + Speech Synthesis
- **Strategic premium**: Uses ElevenLabs voice cloning for key moments
- **Budget controls**: Configurable limits and automatic fallbacks

## 💰 Cost Control Features

### **Built-in Limits:**
```typescript
const defaultLimits = {
  maxPremiumMinutes: 3,      // 3 minutes premium per session (~$0.50 max)
  maxDailyConversations: 5,  // 5 conversations per day
  premiumCooldownHours: 1,   // 1 hour between premium sessions
};
```

### **Smart Usage Logic:**
- **Welcome messages** use premium voice
- **First-time visitors** get premium experience
- **Key insights** use premium voice
- **Everything else** uses free browser voice

### **Real-time Cost Tracking:**
- Live cost display in chat interface
- Progress bar showing premium usage
- Automatic fallback when limits reached

## 🚀 Quick Start

### **1. Add to Any Case Study Page:**

```tsx
import CaseStudyVoiceToggle from '@/components/case-studies/CaseStudyVoiceToggle';

// Add before closing </div> of your case study page
<CaseStudyVoiceToggle
  caseStudyId="your-case-study-id"
  caseStudyTitle="Your Case Study Title"
  limits={{
    maxPremiumMinutes: 3,     // Customize as needed
    maxDailyConversations: 5,
    premiumCooldownHours: 1,
  }}
/>
```

### **2. Customize Position:**

```tsx
<CaseStudyVoiceToggle
  caseStudyId="lessonloom"
  caseStudyTitle="LessonLoom Project"
  position="bottom-left"  // or "top-right", "top-left"
  limits={{ maxPremiumMinutes: 2 }}  // Lower cost limit
/>
```

### **3. Disable for Specific Pages:**

```tsx
<CaseStudyVoiceToggle
  caseStudyId="work-in-progress"
  caseStudyTitle="Work in Progress"
  disabled={true}  // Temporarily disable
/>
```

## 📊 Expected Costs

### **Conservative Usage (Recommended):**
- **3 minutes premium per session**
- **5 sessions per day average**
- **Monthly cost: ~$25-40**

### **Sample Session Breakdown:**
```
Session Cost Breakdown:
├── Welcome message (Premium): $0.03
├── Key insight 1 (Premium): $0.05  
├── Key insight 2 (Premium): $0.04
├── 6 other responses (Free): $0.00
└── Total session cost: $0.12
```

### **Cost vs. Value:**
- **Traditional approach**: Unlimited ElevenLabs = $100+ per month
- **Hybrid approach**: Strategic usage = $25-40 per month
- **Savings**: 60-75% cost reduction while maintaining premium experience

## 🎛️ Configuration Options

### **Session Limits:**

```typescript
interface ConversationLimits {
  maxPremiumMinutes: number;     // Premium voice time limit
  maxDailyConversations: number; // Daily conversation limit
  premiumCooldownHours: number;  // Hours between premium sessions
}
```

### **Custom Welcome Messages:**

The system automatically selects appropriate welcome messages:

```typescript
const welcomeMessages = {
  'lessonloom': "Hi! I'm Imran. I'd love to walk you through the LessonLoom project...",
  'scheduler': "Welcome! I'm excited to share the EduScheduler project...",
  'default': "Hi there! I'm Imran, and I'm thrilled you're exploring my case studies..."
};
```

### **Premium Voice Triggers:**

Premium voice is used when:
- Welcome/greeting messages
- First-time visitor interactions  
- Key insights and important points
- Short responses (< 150 characters)
- High user engagement detected
- First few messages of conversation

## 🔧 Advanced Customization

### **Custom Premium Logic:**

```typescript
// Extend the service to add custom premium logic
class CustomHybridAgent extends HybridConversationalAgent {
  protected shouldUsePremiumVoice(text: string, context: ConversationContext): boolean {
    // Your custom logic here
    const isAboutDesignProcess = text.includes('design process');
    const isAboutResults = text.includes('results') || text.includes('impact');
    
    return isAboutDesignProcess || isAboutResults || super.shouldUsePremiumVoice(text, context);
  }
}
```

### **Custom Cost Limits:**

```typescript
// Different limits for different case studies
const getLimitsForCaseStudy = (caseStudyId: string) => {
  switch (caseStudyId) {
    case 'featured-project':
      return { maxPremiumMinutes: 5, maxDailyConversations: 10 }; // Higher budget
    case 'simple-project':
      return { maxPremiumMinutes: 1, maxDailyConversations: 3 };  // Lower budget
    default:
      return { maxPremiumMinutes: 3, maxDailyConversations: 5 };  // Standard
  }
};
```

## 📱 User Experience

### **Seamless Transition:**
- Conversation starts with premium voice
- Gradually transitions to free voice
- Users see clear indicators of voice type
- No interruption when limits are reached

### **Visual Feedback:**
- 🎤 **Imran's Voice** - Premium ElevenLabs voice
- 🔊 **Browser Voice** - Free synthesis
- Progress bar shows premium usage
- Real-time cost display

### **Accessibility:**
- Full keyboard navigation support
- Screen reader compatible
- Works across all major browsers
- Graceful fallbacks for unsupported browsers

## 🛠️ Troubleshooting

### **Common Issues:**

#### **Voice Chat Not Starting:**
```typescript
// Check browser support
if (!HybridConversationalAgent.isSupported()) {
  console.log('Browser does not support speech APIs');
}
```

#### **Premium Voice Not Working:**
```typescript
// Verify ElevenLabs configuration
import { isVoiceCloningEnabled } from '@/services/voiceCloning';

if (!isVoiceCloningEnabled()) {
  console.log('ElevenLabs not configured - using free voice only');
}
```

#### **High Costs:**
```typescript
// Monitor session costs
const status = hybridAgent.getSessionStatus();
console.log(`Session cost: $${status.totalCost.toFixed(4)}`);
console.log(`Premium minutes: ${status.premiumMinutesUsed.toFixed(1)}`);
```

### **Debug Mode:**

```typescript
// Enable detailed logging
localStorage.setItem('DEBUG_HYBRID_AGENT', 'true');

// Check session data
console.log(hybridAgent.getConversationHistory());
console.log(hybridAgent.getSessionStatus());
```

## 📈 Analytics & Monitoring

### **Track Key Metrics:**

```typescript
// Session completion events
hybridAgent.on('sessionComplete', (session) => {
  analytics.track('Voice Chat Session Complete', {
    caseStudyId: session.caseStudyId,
    duration: session.duration,
    messageCount: session.messages.length,
    totalCost: session.totalCost,
    premiumMinutesUsed: session.premiumMinutesUsed,
  });
});

// Cost threshold alerts
if (session.totalCost > 0.50) {
  analytics.track('High Cost Session', { 
    sessionId: session.id,
    cost: session.totalCost 
  });
}
```

### **Monthly Cost Reports:**

```typescript
// Generate monthly usage reports
const generateCostReport = () => {
  const sessions = getSessionsThisMonth();
  const totalCost = sessions.reduce((sum, s) => sum + s.totalCost, 0);
  const avgCostPerSession = totalCost / sessions.length;
  
  return {
    totalSessions: sessions.length,
    totalCost: totalCost,
    avgCostPerSession: avgCostPerSession,
    premiumMinutesTotal: sessions.reduce((sum, s) => sum + s.premiumMinutesUsed, 0),
  };
};
```

## 🔮 Future Enhancements

### **Planned Features:**
1. **User voice preferences** - Remember user's preferred voice settings
2. **Conversation bookmarks** - Save interesting conversation points
3. **Multi-language support** - Support for different languages
4. **Voice emotion detection** - Adjust responses based on user tone
5. **Conversation analytics** - Detailed engagement metrics

### **Cost Optimization Ideas:**
1. **Response caching** - Cache common responses locally
2. **Smart batching** - Batch multiple short responses
3. **User behavior learning** - Optimize premium usage based on user patterns
4. **A/B testing** - Test different premium allocation strategies

## 🎉 Success Metrics

### **Target Metrics:**
- **Monthly cost**: Under $50
- **User engagement**: 3+ messages per session
- **Completion rate**: 70%+ finish conversations
- **Satisfaction**: Positive feedback on voice quality

### **ROI Indicators:**
- **Increased time on case study pages**
- **Higher contact form submissions**
- **Positive user feedback mentioning voice feature**
- **Reduced bounce rates on case study pages**

---

## 🚀 Ready to Launch!

Your hybrid conversational agent is now ready! Users can:

1. **Click the floating voice button** on case study pages
2. **Ask questions** about your projects using voice
3. **Hear responses** in your actual voice (strategically)
4. **Continue conversations** seamlessly with free voice
5. **Track costs** in real-time

The system automatically manages costs while providing a premium experience where it matters most. Your portfolio now has one of the most sophisticated and cost-effective voice features available!

**Next Steps:**
1. Test the feature on your case study pages
2. Monitor initial usage and costs
3. Adjust limits based on your comfort level
4. Add to additional case studies as needed
5. Gather user feedback and iterate

**Support:** If you encounter any issues, check the browser console for detailed logs and refer to the troubleshooting section above. 