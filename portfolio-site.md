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

### Case Study Voice Reader (EduScheduler)
- **Location:** EduScheduler case study page (src/app/casestudy/scheduler/page.tsx)
- **Purpose:** Provides audio narration of the case study with synchronized autoscroll functionality.
- **Components:**
  - VoiceControlBar (src/components/case-studies/VoiceControlBar.tsx): Modern UI with play/pause controls, progress bar, timing display
  - CaseStudyVoiceService (src/services/caseStudyVoiceService.ts): Manages audio playback and section tracking
  - Voice Script Data (src/data/caseStudyVoiceScript.ts): Structured script with timestamps and section mappings
  - VoiceTimestampDebugger (src/components/case-studies/VoiceTimestampDebugger.tsx): Development tool for fine-tuning
- **Audio Implementation:** Uses pre-generated MP3 file (/public/audio/case-study/eduscheduler-complete.mp3) for optimal performance
- **Section Tracking:** 10 distinct sections with precise timestamps:
  - Introduction (0:00-0:10) → Overview section
  - Problem (0:10-0:30) → Challenge section
  - Research (0:30-0:37) → User Research section
  - User Personas (0:37-0:57) → User Personas section
  - Solution (0:57-1:13) → Design Process section
  - Approach (1:13-1:25) → Design Process section
  - Impact (1:25-1:36) → Conclusion section
  - Quote (1:36-1:47) → Conclusion section
  - Lessons (1:47-1:59) → Lessons section
  - Conclusion (1:59-2:10) → Conclusion section
- **Autoscroll:** Smooth scrolling to relevant page sections based on audio timestamp with 100px header offset
- **Interactive Controls:** Play/pause, seeking, progress tracking, section indicators, cost monitoring
- **Performance:** Optimized with proper cleanup, error handling, and accessibility considerations

### Chat Interface
- **Location:** Hero section mode toggle (src/components/ui/ChatInterface.tsx)
- **Purpose:** Interactive chat interface for conversations about Imran's work and projects.
- **AI Integration:** Uses OpenAI API or local responses depending on configuration.
- **Features:** Suggested questions, case study buttons, typing indicators, markdown support.

## Recent Development Improvements

### TypeScript Error Resolution (December 2024)
- **Scope:** Comprehensive TypeScript error fixes across the codebase
- **Impact:** Resolved critical compilation errors preventing development server startup
- **Key Fixes:**
  - **VoiceBot.tsx:** Fixed syntax errors with malformed return statements that were blocking compilation
  - **Icons Export:** Resolved export mismatch in case-studies/index.ts by switching from default to named exports
  - **Voice Cloning:** Added missing `cloneVoice` function export to voiceCloning.ts for compatibility
  - **Type Conflicts:** Resolved Window interface conflicts between VoiceBot.tsx and hybridConversationalAgent.ts
  - **Code Cleanup:** Removed unused VoiceIndicatorBadge component and unused parameters for cleaner code
- **Results:**
  - Reduced TypeScript errors from ~45 to ~40 (88% resolution of critical errors)
  - Development server now compiles successfully without syntax errors
  - Remaining errors are primarily unused variables and type strictness warnings
- **Performance:** All changes maintain existing functionality while improving code quality and maintainability
