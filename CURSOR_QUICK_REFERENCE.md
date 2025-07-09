# Cursor Quick Reference - Portfolio Project

## 🚀 Project Overview
**Next.js 13+ portfolio site** for Imran Mohammed, an AI Experience Designer, featuring voice AI, interactive case studies, and modern animations showcasing AI-powered user experiences.

## 🏗️ Tech Stack
- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State**: React Context + local state
- **Testing**: Jest + Cypress
- **Deployment**: Vercel

## 📁 Key Directories
```
src/
├── app/                    # Next.js pages & API routes
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── sections/         # Page sections
│   └── case-studies/     # Case study components
├── context/              # React Context providers
├── hooks/                # Custom hooks
├── services/             # Business logic
├── types/                # TypeScript types
└── utils/                # Utility functions
```

## 🎯 Key Features
1. **Voice Assistant** (`VoiceBot.tsx`) - AI-powered voice interactions and conversational UX
2. **Chat Interface** (`ChatInterface.tsx`) - Interactive AI chat with hybrid human-AI workflow
3. **Case Studies** - Interactive project showcases demonstrating AI UX patterns
4. **CursorDot** - Magnetic cursor following animation
5. **Responsive Design** - Mobile-first approach

## 🎨 Design System
- **Colors**: `--accent` (#3B82F6), `--secondary` (#8B5CF6), `--tertiary` (#06B6D4)
- **Typography**: Inter font family
- **Spacing**: Tailwind utility classes
- **Animations**: Framer Motion with accessibility support

## 📝 Coding Standards
- **TypeScript**: All components and functions
- **Components**: Functional with hooks, named exports
- **Styling**: Tailwind CSS classes
- **Performance**: React.memo, useCallback, useMemo
- **Accessibility**: WCAG 2.1 AA compliance
- **File Size**: Keep under 300 lines

## 🔧 Common Patterns

### Component Template
```typescript
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

const Component: React.FC<ComponentProps> = ({ className, children }) => {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  );
};
```

### Animation Pattern
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

### Hook Pattern
```typescript
const useCustomHook = () => {
  const [state, setState] = useState();
  
  useEffect(() => {
    // Logic
    return () => {
      // Cleanup
    };
  }, []);
  
  return { state, setState };
};
```

## 🎙️ Voice & AI Features
- **Speech Recognition**: Web Speech API
- **AI Responses**: OpenAI integration
- **Voice Cloning**: ElevenLabs integration
- **Rate Limiting**: 3 conversations/session, $5/day limit
- **Cost Monitoring**: Real-time usage tracking

## 🧪 Testing
- **Unit Tests**: Jest (`src/__tests__/`)
- **E2E Tests**: Cypress (`cypress/e2e/`)
- **Test Pattern**: Component testing with user interactions

## 📊 Performance
- **Core Web Vitals**: LCP, FID, CLS optimization
- **Code Splitting**: Dynamic imports
- **Image Optimization**: Next.js Image component
- **Bundle Optimization**: Tree shaking, code splitting

## ♿ Accessibility
- **WCAG 2.1 AA**: Full compliance
- **Keyboard Navigation**: Full support
- **Screen Readers**: Proper ARIA labels
- **Reduced Motion**: Respects user preferences
- **Color Contrast**: 4.5:1 minimum

## 🔄 State Management
- **Global State**: React Context for app-wide state
- **Local State**: Component state for UI elements
- **Avoid**: Prop drilling (use custom hooks)

## 📚 Documentation Files
- `portfolio-site.md` - Main project documentation
- `PROJECT_CONTEXT.md` - Detailed project context
- `COMPONENT_REFERENCE.md` - Component architecture
- `DEVELOPMENT_PATTERNS.md` - Coding patterns
- `docs/documentation.md` - Technical architecture

## 🚀 Development Workflow
1. **Read** `portfolio-site.md` before coding
2. **Follow** established patterns and conventions
3. **Test** new functionality
4. **Document** changes and updates
5. **Deploy** via Vercel

## 🎯 Current Focus
- Voice assistant improvements and conversational UX patterns
- Case study enhancements showcasing AI interaction design
- Performance optimization
- Accessibility compliance for AI interactions

## ⚡ Quick Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run lint         # Run ESLint
```

## 🔍 Common Tasks
- **Add Component**: Create in appropriate folder with TypeScript interface
- **Add Animation**: Use Framer Motion with accessibility support
- **Add Voice Feature**: Follow voice patterns in `VoiceBot.tsx` for conversational UX
- **Add AI UX Pattern**: Implement hybrid human-AI interaction patterns
- **Add Test**: Write Jest test with user interaction testing
- **Update Docs**: Modify relevant documentation files

## 📝 Remember
- Always use TypeScript for new code
- Follow mobile-first responsive design
- Implement proper error handling
- Add accessibility features for AI interactions
- Keep components under 300 lines
- Update documentation after major changes
- Focus on AI Experience Design patterns and conversational UX

This quick reference should help Cursor understand the project context and patterns immediately. 