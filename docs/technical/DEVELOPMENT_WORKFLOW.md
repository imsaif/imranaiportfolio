# Development Workflow Guide

## 🚀 Quick Start Commands

### **Development with Quality Checks**
```bash
# Start development server with type checking
npm run dev:quality

# Start development server only
npm run dev

# Run all quality checks
npm run quality
```

### **Type Checking**
```bash
# One-time type check
npm run type-check

# Watch mode for type checking
npm run type-check:watch
```

### **Code Quality**
```bash
# Fix all formatting and linting issues
npm run fix

# Check formatting only
npm run format:check

# Run linting only
npm run lint
```

### **Testing**
```bash
# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci
```

## 🔧 Development Tools

### **VS Code Extensions**
Install these recommended extensions for better development experience:
- **Prettier**: Code formatting
- **Tailwind CSS IntelliSense**: Tailwind class suggestions
- **TypeScript Importer**: Auto-import TypeScript modules
- **ESLint**: Code linting
- **Jest**: Test runner integration
- **Auto Rename Tag**: HTML/JSX tag renaming

### **VS Code Settings**
The `.vscode/settings.json` file includes:
- Auto-formatting on save
- Auto-fix ESLint issues on save
- Tailwind CSS IntelliSense
- Jest integration
- TypeScript auto-imports

## 🛡️ Error Prevention

### **Pre-commit Hooks**
Before each commit, the following checks run automatically:
1. **TypeScript type checking** - Catches type errors
2. **ESLint** - Catches code quality issues
3. **Prettier** - Ensures consistent formatting
4. **Tests** - Runs unit tests

### **Error Boundaries**
Use the `ErrorBoundary` component to catch React errors:
```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### **TypeScript Strict Mode**
Enhanced TypeScript configuration catches:
- Unused variables and parameters
- Implicit returns
- Unchecked indexed access
- Exact optional property types

## 📝 Best Practices

### **Component Development**
1. **Create component with TypeScript interface**
2. **Add proper error handling**
3. **Write tests for the component**
4. **Add accessibility features**
5. **Optimize for performance**

### **File Organization**
```
src/
├── components/
│   ├── ui/           # Base UI components
│   ├── sections/     # Page sections
│   └── case-studies/ # Case study components
├── hooks/            # Custom hooks
├── services/         # Business logic
├── types/            # TypeScript types
└── utils/            # Utility functions
```

### **Import Organization**
```typescript
// 1. React and Next.js imports
import React from 'react';
import { NextPage } from 'next';

// 2. Third-party libraries
import { motion } from 'framer-motion';

// 3. Internal components
import { Button } from '@/components/ui/Button';

// 4. Types
import type { ComponentProps } from '@/types/components';

// 5. Utilities
import { cn } from '@/utils/cn';
```

## 🧪 Testing Strategy

### **Unit Tests**
- Test components in isolation
- Mock external dependencies
- Test user interactions
- Test accessibility features

### **E2E Tests**
- Test complete user flows
- Test voice interactions
- Test responsive design
- Test performance

### **Test Commands**
```bash
# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run e2e

# Run performance tests
npm run perf
```

## 🎯 Performance Monitoring

### **Lighthouse CI**
```bash
# Run Lighthouse on desktop
npm run lighthouse:desktop

# Run Lighthouse on mobile
npm run lighthouse:mobile
```

### **Performance Scripts**
```bash
# Measure performance
npm run perf:measure

# Test performance
npm run perf:test
```

## 🔄 Git Workflow

### **Before Committing**
1. Run quality checks: `npm run quality`
2. Fix any issues found
3. Write meaningful commit messages
4. Push to remote repository

### **Commit Message Format**
```
type(scope): description

feat(voice): add voice rate limiting
fix(chat): resolve typing indicator issue
docs(readme): update installation instructions
```

## 🚨 Common Issues & Solutions

### **TypeScript Errors**
- Use proper type annotations
- Avoid `any` type
- Use strict mode features
- Run `npm run type-check` to find issues

### **ESLint Errors**
- Follow the established rules
- Use `npm run lint:fix` to auto-fix
- Add exceptions only when necessary

### **Performance Issues**
- Use React.memo for expensive components
- Implement proper cleanup in useEffect
- Optimize images and assets
- Monitor Core Web Vitals

### **Accessibility Issues**
- Add proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Follow WCAG 2.1 AA guidelines

## 📊 Quality Metrics

### **Code Coverage**
- Aim for >80% test coverage
- Focus on critical user paths
- Test error scenarios

### **Performance Targets**
- Lighthouse score >90
- Core Web Vitals in green
- Bundle size optimization

### **Accessibility**
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support

This workflow ensures fast, error-free development with high code quality and performance.
