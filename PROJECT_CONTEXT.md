# Portfolio Site Project Context

## 🎯 Project Purpose
This is a Next.js 13+ portfolio website for Imran Mohammed, showcasing his work as an AI Experience Designer. The site features interactive elements, voice AI integration, and detailed case studies demonstrating AI-powered user experiences.

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion with accessibility support
- **State Management**: React Context + local state
- **Testing**: Jest (unit) + Cypress (E2E)
- **Deployment**: Vercel

### Key Architectural Decisions
1. **App Router**: Chosen for better performance and server components
2. **TypeScript**: For type safety and better developer experience
3. **Component-Based**: Modular, reusable components
4. **Mobile-First**: Responsive design approach
5. **Accessibility-First**: WCAG 2.1 AA compliance

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (contact, chat, analytics)
│   ├── casestudy/         # Case study pages
│   │   ├── lessonloom/    # LessonLoom case study
│   │   └── scheduler/     # EduScheduler case study
│   ├── projects/          # Project showcase pages
│   └── globals.css        # Global styles and CSS variables
├── components/            # React components
│   ├── ui/               # Base UI components (Button, ChatInterface, etc.)
│   ├── sections/         # Page sections (Hero, About, Projects, Contact)
│   ├── case-studies/     # Case study specific components
│   └── layout/           # Layout components (Header, Footer)
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── services/             # Business logic (voice, chat, analytics)
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── data/                 # Static content and data
```

## 🎨 Design System

### Brand Colors (CSS Variables)
```css
--accent: #3B82F6      /* Primary blue */
--secondary: #8B5CF6   /* Purple */
--tertiary: #06B6D4    /* Cyan */
```

### Typography
- **Primary**: Inter (sans-serif)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

### Spacing
- **Mobile**: 16px base spacing
- **Desktop**: 24px base spacing
- **Consistent**: Tailwind spacing scale

## 🚀 Key Features

### 1. Voice Mode Assistant
- **Component**: `src/components/VoiceBot.tsx`
- **Purpose**: AI-powered voice interactions
- **Features**:
  - Speech recognition (Web Speech API)
  - AI responses (OpenAI integration)
  - Voice cloning (ElevenLabs)
  - Rate limiting (3 conversations/session, $5/day)
  - Real-time cost monitoring

### 2. Chat Interface
- **Component**: `src/components/ui/ChatInterface.tsx`
- **Purpose**: Interactive AI chat about projects
- **Features**:
  - Suggested questions
  - Case study navigation
  - Typing indicators
  - Markdown support

### 3. Case Study Voice Reader
- **Location**: `src/app/casestudy/scheduler/page.tsx`
- **Purpose**: Audio narration with synchronized scrolling
- **Components**:
  - `VoiceControlBar.tsx`: Playback controls
  - `CaseStudyVoiceService.ts`: Audio management
  - `VoiceTimestampDebugger.tsx`: Development tool

### 4. CursorDot (Magnetic Cursor)
- **Component**: `src/components/ui/CursorDot.tsx`
- **Purpose**: Interactive magnetic cursor following
- **Features**:
  - Framer Motion animations
  - Accessibility support
  - Performance optimized
  - Brand color gradients

### 5. Interactive Case Studies
- **EduScheduler**: AI-powered timetable optimization with conversational interface
- **LessonLoom**: AI content generation platform with hybrid human-AI workflow
- **Features**: Interactive prototypes, voice narration, detailed analysis of AI UX patterns

## 🗄️ Database Schema

### Contact Submissions
```typescript
interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date;
  status: 'unread' | 'read' | 'replied';
  notes?: string;
}
```

### Projects
```typescript
interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  completedDate: Date;
  featured: boolean;
  url?: string;
  githubUrl?: string;
  images: ProjectImage[];
  technologies: ProjectTechnology[];
  details?: ProjectDetail;
}
```

### Voice Usage Tracking
```typescript
interface VoiceUsageLog {
  id: number;
  sessionId: string;
  userIdHash: string;
  interactionType: 'user_message' | 'bot_response';
  characterCount: number;
  usedClonedVoice: boolean;
  estimatedCost: number;
  rateLimitHit?: string;
  createdAt: Date;
}
```

## 🧪 Testing Strategy

### Unit Tests (Jest)
- **Location**: `src/__tests__/`
- **Coverage**: Components, utilities, API routes
- **Pattern**: Component testing with user interactions

### E2E Tests (Cypress)
- **Location**: `cypress/e2e/`
- **Coverage**: User flows, voice interactions, chat functionality
- **Pattern**: Real user scenarios

### Test Files Structure
```
src/__tests__/
├── components/           # Component tests
├── api/                 # API route tests
└── utils/               # Utility function tests
```

## 🔧 Development Guidelines

### Code Standards
1. **TypeScript**: Strict mode, proper typing
2. **Components**: Functional with hooks, named exports
3. **Styling**: Tailwind CSS, mobile-first
4. **Performance**: React.memo, useCallback, useMemo
5. **Accessibility**: WCAG 2.1 AA, keyboard navigation

### File Organization
- **Components**: Feature-based folders
- **Naming**: PascalCase for components, camelCase for functions
- **Imports**: Organized, consistent order
- **Size**: Keep files under 300 lines

### State Management
- **Global**: React Context for app-wide state
- **Local**: Component state for UI elements
- **Avoid**: Prop drilling (use custom hooks)

### Animation Guidelines
- **Library**: Framer Motion
- **Performance**: Optimized, proper cleanup
- **Accessibility**: Reduced motion support
- **Purpose**: Subtle, meaningful interactions

## 🌐 Environment Configuration

### Development
```bash
NEXT_PUBLIC_USE_AI_API=false  # Disable AI API in dev
VOICE_RATE_LIMITS=development  # Development rate limits
```

### Production
```bash
NEXT_PUBLIC_USE_AI_API=true   # Enable AI API
VOICE_RATE_LIMITS=production   # Production rate limits
```

## 📊 Performance Considerations

### Core Web Vitals
- **LCP**: Optimize hero section loading
- **FID**: Minimize JavaScript execution
- **CLS**: Stable layouts, proper image sizing

### Optimization Strategies
- **Images**: Next.js Image component
- **Code Splitting**: Dynamic imports
- **Caching**: Proper cache headers
- **Bundle**: Tree shaking, code splitting

## ♿ Accessibility Requirements

### WCAG 2.1 AA Compliance
- **Color Contrast**: 4.5:1 minimum
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels
- **Motion**: Reduced motion support

### Voice Control
- **Speech Recognition**: Web Speech API
- **Voice Commands**: Natural language processing
- **Feedback**: Visual and audio indicators

## 🚀 Deployment

### Vercel Configuration
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Environment Variables**: Configured in Vercel dashboard

### Monitoring
- **Performance**: Core Web Vitals tracking
- **Errors**: Error boundary implementation
- **Analytics**: Page view tracking
- **Voice Usage**: Cost monitoring

## 📚 Documentation

### Key Files
- `portfolio-site.md`: Main project documentation
- `docs/documentation.md`: Technical architecture
- `docs/FEATURES.md`: Feature specifications
- `docs/project_milestones.md`: Development milestones

### Update Process
1. Read `portfolio-site.md` before coding
2. Update documentation after major features
3. Document database schema changes
4. Update component specifications

## 🔄 Development Workflow

### Adding Features
1. **Plan**: Define requirements and architecture
2. **Code**: Follow established patterns
3. **Test**: Unit and E2E tests
4. **Document**: Update relevant docs
5. **Deploy**: Vercel deployment

### Code Review Checklist
- [ ] TypeScript types defined
- [ ] Accessibility implemented
- [ ] Performance optimized
- [ ] Tests written
- [ ] Documentation updated

## 🎯 Current Focus Areas

### Active Development
- Voice assistant improvements
- Case study enhancements
- Performance optimization
- Accessibility compliance

### Planned Features
- Enhanced analytics
- More interactive case studies showcasing AI UX patterns
- Advanced voice capabilities and conversational interfaces
- Performance monitoring
- AI interaction design patterns documentation

## 📝 Notes for Cursor

### Always Remember
1. This is a Next.js 13+ portfolio site for an AI Experience Designer
2. TypeScript is used throughout
3. Tailwind CSS for styling
4. Framer Motion for animations
5. Voice AI and conversational interfaces are key features
6. Accessibility is critical for AI interactions
7. Performance optimization is ongoing
8. Documentation must be kept updated

### Key Patterns
- Functional components with hooks
- TypeScript interfaces for all data
- Tailwind utility classes
- Framer Motion animations
- React Context for global state
- Jest + Cypress for testing
- Mobile-first responsive design

### Common Tasks
- Adding new components
- Implementing voice features and conversational interfaces
- Creating case studies showcasing AI UX patterns
- Optimizing performance
- Improving accessibility for AI interactions
- Writing tests
- Updating documentation

This context should help Cursor understand the project structure, patterns, and requirements for any development tasks. 