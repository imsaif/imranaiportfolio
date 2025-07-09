# Component Reference Guide

## 🏗️ Core Architecture Components

### Layout Components
- **`src/app/layout.tsx`**: Root layout with metadata and providers
- **`src/components/layout/Header.tsx`**: Navigation header with mobile menu
- **`src/components/layout/Footer.tsx`**: Site footer with links and info
- **`src/components/Container.tsx`**: Responsive container wrapper

### Page Components
- **`src/app/page.tsx`**: Home page with hero and sections
- **`src/app/projects/[slug]/page.tsx`**: Dynamic project pages
- **`src/app/casestudy/scheduler/page.tsx`**: EduScheduler case study
- **`src/app/casestudy/lessonloom/page.tsx`**: LessonLoom case study
- **`src/app/resume/page.tsx`**: Resume page

## 🎨 UI Components (`src/components/ui/`)

### Interactive Elements
- **`Button.tsx`**: Reusable button component with variants
- **`ChatInterface.tsx`**: AI chat interface with suggestions
- **`CursorDot.tsx`**: Magnetic cursor following animation
- **`ModeToggle.tsx`**: Voice/Chat mode switcher
- **`ScrollToTopButton.tsx`**: Smooth scroll to top button

### Chat Components
- **`chat/ChatInput.tsx`**: Chat input with voice support
- **`chat/ChatMessage.tsx`**: Individual chat message display
- **`chat/ChatMessageList.tsx`**: Chat message container
- **`chat/ChatSuggestions.tsx`**: Suggested questions component
- **`chat/ChatTransition.tsx`**: Smooth chat transitions
- **`chat/ChatTypingIndicator.tsx`**: Typing animation

### Animation Components
- **`AnimatedHeading.tsx`**: Animated text headings
- **`AnimatedScrollableList.tsx`**: Scrollable animated lists
- **`ParticlesOnHover.tsx`**: Interactive particle effects
- **`WaveAnimation.tsx`**: Wave background animations
- **`WaveSeparator.tsx`**: Animated section separators

### Utility Components
- **`MobileOptimized.tsx`**: Mobile-specific optimizations
- **`PerformanceMonitor.tsx`**: Performance tracking
- **`ProgressBar.tsx`**: Progress indicator
- **`ResponsiveContainer.tsx`**: Responsive wrapper
- **`SectionTitle.tsx`**: Section heading component
- **`StickyProjectCard.tsx`**: Sticky project display

## 🎯 Section Components (`src/components/sections/`)

### Hero Section
- **`hero/Hero.tsx`**: Main hero component
- **`hero/HeroBackground.tsx`**: Animated background
- **`hero/HeroButtons.tsx`**: CTA buttons
- **`hero/HeroChatSection.tsx`**: Chat integration
- **`hero/HeroContactInfo.tsx`**: Contact information
- **`hero/HeroHeading.tsx`**: Main heading with animations

### Content Sections
- **`About.tsx`**: About section with animations
- **`Contact.tsx`**: Contact form section
- **`Process.tsx`**: Work process showcase
- **`Projects.tsx`**: Project grid display
- **`Skills.tsx`**: Skills and technologies

## 🎙️ Voice & AI Components

### Voice Assistant
- **`VoiceBot.tsx`**: Main voice assistant component
- **`VoiceUsageMonitor.tsx`**: Voice usage tracking
- **`services/voiceBotRateLimit.ts`**: Rate limiting logic
- **`services/voiceCloning.ts`**: ElevenLabs integration

### Chat System
- **`context/ChatContext.tsx`**: Chat state management
- **`context/ChatToggleProvider.tsx`**: Chat toggle state
- **`services/hybridConversationalAgent.ts`**: AI conversation logic

## 📚 Case Study Components (`src/components/case-studies/`)

### EduScheduler Case Study
- **`AIPTimetableVisualization.tsx`**: AI visualization component
- **`AnimatedContent.tsx`**: Animated case study content
- **`CaseStudyConversationalAgent.tsx`**: Case study specific chat
- **`CaseStudyFooter.tsx`**: Case study footer
- **`CaseStudyHeader.tsx`**: Case study header
- **`CaseStudyNav.tsx`**: Case study navigation
- **`CaseStudyVoiceToggle.tsx`**: Voice toggle for case studies
- **`DesignComparisons.tsx`**: Before/after comparisons
- **`InfoArchitectureDiagrams.tsx`**: Information architecture
- **`LessonLoom.tsx`**: LessonLoom specific components
- **`ProjectContent.tsx`**: Project content display
- **`ProjectHeader.tsx`**: Project header component
- **`ProjectImages.tsx`**: Project image gallery
- **`SplitViewComparison.tsx`**: Split view comparisons
- **`UserJourneyMapInteractive.tsx`**: Interactive user journey
- **`VoiceControlBar.tsx`**: Voice playback controls
- **`VoiceTimestampDebugger.tsx`**: Voice timing debug tool

## 🔧 Context & State Management

### Context Providers
- **`context/ChatContext.tsx`**: Global chat state
- **`context/ChatToggleProvider.tsx`**: Chat toggle state
- **`ClientProviders.tsx`**: Client-side providers wrapper

### Custom Hooks
- **`hooks/useChatToggle.ts`**: Chat toggle logic
- **`hooks/useMediaQuery.ts`**: Media query hook
- **`hooks/useMouseTracking.ts`**: Mouse tracking hook
- **`hooks/useTextCycling.tsx`**: Text cycling animation

## 🎨 Animation & Visual Components

### Background Components
- **`BackgroundWaves.tsx`**: Wave background effects
- **`WaveBackground.tsx`**: Wave pattern backgrounds
- **`InteractiveBubbles.tsx`**: Interactive bubble effects

### Logo & Branding
- **`AnimatedLogo.tsx`**: Animated logo component
- **`Icons.tsx`**: Icon components

## 📊 Data & Content Components

### Data Management
- **`data/projects.ts`**: Project data structure
- **`data/portfolio-context.json`**: Portfolio context data
- **`data/caseStudyVoiceScript.ts`**: Voice script data
- **`data/scheduler-comparison.ts`**: Comparison data

### Content Display
- **`GenerationWorkflow.tsx`**: Workflow visualization
- **`ProcessIcons.tsx`**: Process step icons

## 🧪 Testing Components

### Test Files Structure
```
src/__tests__/
├── AnimatedLogo.test.tsx
├── Contact.test.tsx
├── Container.test.tsx
├── Header.test.tsx
├── api/
│   ├── contact.test.ts
│   ├── project-slug.test.ts
│   ├── projects.test.ts
│   └── rate-limit.test.ts
└── scrollLock.test.ts
```

## 🔗 Component Relationships

### Data Flow
1. **Layout** → **Sections** → **UI Components**
2. **Context** → **Components** (state management)
3. **Services** → **Components** (business logic)
4. **Hooks** → **Components** (custom logic)

### State Management Flow
```
ChatContext → ChatInterface → Chat Components
VoiceBot → VoiceUsageMonitor → Voice Services
CaseStudyContext → CaseStudyComponents → VoiceControlBar
```

### Animation Hierarchy
```
Layout → BackgroundWaves → WaveAnimation
Hero → HeroBackground → AnimatedHeading
CursorDot → MouseTracking → FramerMotion
```

## 📝 Component Guidelines

### Creating New Components
1. **Location**: Place in appropriate folder (`ui/`, `sections/`, etc.)
2. **Naming**: PascalCase for components, camelCase for functions
3. **Props**: Define TypeScript interfaces for all props
4. **Styling**: Use Tailwind CSS classes
5. **Animation**: Use Framer Motion for animations
6. **Accessibility**: Implement proper ARIA labels and keyboard navigation

### Component Patterns
- **Functional Components**: Use hooks for state and effects
- **Named Exports**: Export components by name
- **TypeScript**: Define proper types for all props and state
- **Error Boundaries**: Wrap components that might fail
- **Performance**: Use React.memo for expensive components

### Common Props Interface
```typescript
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  // Component-specific props
}
```

## 🎯 Key Component Responsibilities

### Layout Components
- **Header**: Navigation, mobile menu, branding
- **Footer**: Links, social media, contact info
- **Container**: Responsive width management

### UI Components
- **Button**: Interactive elements with variants
- **ChatInterface**: AI conversation interface
- **CursorDot**: Interactive cursor following
- **ModeToggle**: Voice/Chat mode switching

### Section Components
- **Hero**: Main landing section with animations
- **About**: Personal information and background
- **Projects**: Project showcase and filtering
- **Contact**: Contact form and information

### Voice Components
- **VoiceBot**: Speech recognition and AI responses
- **VoiceControlBar**: Audio playback controls
- **VoiceUsageMonitor**: Usage tracking and limits

### Case Study Components
- **CaseStudyHeader**: Case study introduction
- **VoiceControlBar**: Audio narration controls
- **InteractivePrototype**: Interactive demonstrations

## 🔄 Component Update Process

### When Adding New Components
1. **Create**: Component file with TypeScript interface
2. **Style**: Use Tailwind CSS classes
3. **Animate**: Add Framer Motion if needed
4. **Test**: Write Jest tests for component
5. **Document**: Update this reference guide
6. **Accessibility**: Ensure WCAG 2.1 AA compliance

### When Modifying Existing Components
1. **Check**: Existing tests and documentation
2. **Update**: Component logic and styling
3. **Test**: Ensure existing functionality works
4. **Document**: Update component documentation
5. **Review**: Check for breaking changes

This component reference should help Cursor understand the project's component architecture and relationships. 