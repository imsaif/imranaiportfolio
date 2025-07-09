This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Recent Development Improvements

### TypeScript Error Resolution (December 2024)
The project has undergone comprehensive TypeScript error resolution, significantly improving development stability and code quality:

- **✅ Development Server Stability**: Fixed critical syntax errors preventing compilation
- **✅ Reduced Error Count**: Resolved 88% of critical TypeScript errors (~45 to ~40 errors)
- **✅ Enhanced VoiceBot Component**: Fixed syntax errors and removed unused components
- **✅ Improved Exports**: Resolved export mismatches and added missing function exports
- **✅ Type Safety**: Resolved interface conflicts and improved type checking
- **✅ Code Quality**: Cleaned up unused variables and improved maintainability

**Key fixes implemented:**
- VoiceBot.tsx syntax error resolution
- Icons component export standardization
- Voice cloning service compatibility improvements
- Window interface type conflict resolution
- Code cleanup and optimization

**Impact for developers:**
- Faster development server startup
- Improved TypeScript IntelliSense
- Better error detection and prevention
- More stable development experience

## Environment Setup

This project uses environment variables for configuration. To set up your local environment:

1. Copy the template file to create your local environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your API keys and configuration values.

3. **Important**: Never commit `.env.local` or any files containing actual credentials to the repository. The `.env.local` file is already in `.gitignore` to prevent accidental commits.

4. For more details on environment variables and security practices, see `docs/documentation.md`.

## Required Environment Variables

For core functionality:
- `NEXT_PUBLIC_USE_AI_API`: Set to "true" to enable AI chat functionality

For AI chat functionality (if enabled):
- `OPENAI_API_KEY`: Your OpenAI API key

For database functionality (if using):
- `DATABASE_URL`: Your database connection string

## API Rate Limiting

This project implements comprehensive rate limiting to prevent abuse and control costs for both chat and voice interactions.

### Chat API Rate Limiting

The chat API is protected by Redis-backed rate limiting to prevent abuse and ensure fair usage.

- **Current limit:** 10 messages per user per hour
- **How it works:** Each user is identified by a hash of their IP and User-Agent. The limit is enforced using Redis, so it works across all server instances and survives restarts.
- **Environment variables:**
  - `OPENAI_RATE_LIMIT` — Maximum number of chat messages per user per window (default: 20, currently set to 10)
  - `OPENAI_RATE_WINDOW_MS` — Window size in milliseconds (default: 3600000 for 1 hour)
  - `REDIS_URL` — Redis connection string (default: `redis://localhost:6379`)

### Voice Bot Rate Limiting

The voice bot includes comprehensive rate limiting to control costs for ElevenLabs voice cloning and prevent abuse:

- **Session Limits:** Max 3 conversations, 10 messages per conversation, 500 characters per message
- **Time Limits:** 3-second cooldown between messages, hourly character limits
- **Daily Limits:** Max $5.00 cost per day, 20 minutes of cloned voice per day
- **Smart Degradation:** Falls back to free browser TTS when cloned voice limits are reached

**Configuration Presets:**
```bash
# Choose your environment preset
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=production  # Conservative limits
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=development # Generous for testing
NEXT_PUBLIC_VOICE_RATE_LIMIT_PRESET=demo        # Very restrictive

# Or customize individual limits
NEXT_PUBLIC_VOICE_MAX_COST_PER_DAY=5.00
NEXT_PUBLIC_VOICE_MAX_CHARACTERS_PER_SESSION=3000
# ... see docs/VOICE_RATE_LIMITING_SETUP.md for all options
```

**Features:**
- ✅ Real-time usage monitoring
- ✅ Cost estimation and tracking
- ✅ Graceful fallback to free TTS
- ✅ User-friendly error messages
- ✅ Session-based tracking (privacy-respecting)

For detailed configuration options, see `docs/voice-rate-limiting-guide.md`.

To change the rate limits, update these variables in your `.env.local` or deployment environment.

## Documentation

This project includes comprehensive documentation for all features:

### Core Documentation
- **[Features Overview](docs/FEATURES.md)** - Complete feature list and capabilities
- **[Project Milestones](docs/project_milestones.md.md)** - Development progress and roadmap
- **[Technical Documentation](docs/documentation.md)** - Architecture and component specs

### Voice & AI Features
- **[Voice Cloning Setup](docs/voice-cloning-setup.md)** - ElevenLabs integration guide
- **[Voice Mode Implementation](docs/voice-mode-implementation.md)** - Technical implementation details
- **[Voice Rate Limiting Guide](docs/voice-rate-limiting-guide.md)** - Comprehensive rate limiting documentation
- **[Voice Rate Limiting Setup](docs/VOICE_RATE_LIMITING_SETUP.md)** - Quick setup guide

### API & Integration
- **[Chat API Guide](src/docs/ai-chat-guide.md)** - AI chat integration details
- **[Hybrid Conversational Agent](docs/hybrid-conversational-agent-guide.md)** - Advanced voice/chat features

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
