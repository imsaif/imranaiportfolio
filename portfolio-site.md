## Features

### CursorDot (Magnetic Cursor Dot)
- **Location:** Home page (src/app/page.tsx), component in src/components/ui/CursorDot.tsx
- **Purpose:** Displays a magnetic dot that follows the user's cursor, providing a modern, branded interactive effect.
- **Animation:** Uses Framer Motion for smooth, spring-based magnetic following. Animates scale and color gradient on movement.
- **Brand Colors:** Styled with a linear gradient using --accent, --secondary, and --tertiary CSS variables (see globals.css and tailwind.config.js).
- **Accessibility:**
  - Respects reduced motion settings (hides if prefers-reduced-motion is enabled).
  - Hides on keyboard navigation (Tab, arrow keys) for accessibility.
  - Pointer-events are none, so it never blocks interaction.
- **Performance:**
  - Uses requestAnimationFrame and Framer Motion's optimized springs.
  - Cleans up all event listeners on unmount.
- **Responsiveness:**
  - Dot size can be customized via props.
  - Mix-blend mode ensures visibility on all backgrounds.

### Voice Mode Assistant
- **Location:** Hero section mode toggle (src/components/VoiceBot.tsx)
- **Purpose:** Fully functional voice assistant that can listen to user speech and respond with AI-generated answers about Imran's work.
- **Speech Recognition:** Real-time voice input using Web Speech Recognition API with comprehensive error handling.
- **AI Integration:** Connected to the same AI service as chat mode, providing intelligent responses about projects and experience.
- **Speech Synthesis:** Text-to-speech responses with configurable voice parameters and ElevenLabs voice cloning integration.
- **Voice Cloning:** Integration with ElevenLabs for personalized voice responses using Imran's actual voice.
- **Rate Limiting:** Comprehensive cost control system to prevent API abuse:
  - Session limits (3 conversations, 10 messages each)
  - Daily cost limits ($5.00 max per day)
  - Smart fallback to free TTS when limits reached
  - Real-time usage monitoring and cost estimation
- **Visual Feedback:** 
  - State indicators (listening, processing, speaking, error)
  - Animated waveform during voice activity
  - Color-coded status with clear messaging
  - Usage monitor component showing limits and costs
- **Browser Support:** Chrome, Safari, Edge (full support), Firefox (limited)
- **Accessibility:** Screen reader compatible, keyboard navigation, visual indicators for hearing-impaired users.
- **Error Handling:** Graceful fallbacks for unsupported browsers, permission issues, network problems, and rate limit scenarios.

### Chat Interface
- **Location:** Hero section mode toggle (src/components/ui/ChatInterface.tsx)
- **Purpose:** Interactive chat interface for conversations about Imran's work and projects.
- **AI Integration:** Uses OpenAI API or local responses depending on configuration.
- **Features:** Suggested questions, case study buttons, typing indicators, markdown support. 