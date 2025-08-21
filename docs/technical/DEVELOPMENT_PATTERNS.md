# Development Patterns & Conventions

## 🎯 TypeScript Patterns

### Component Interface Pattern
```typescript
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  // Component-specific props with proper typing
}

const Component: React.FC<ComponentProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  // Component implementation
};
```

### Hook Pattern
```typescript
interface UseHookReturn {
  value: string;
  setValue: (value: string) => void;
  isLoading: boolean;
}

const useCustomHook = (): UseHookReturn => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Hook logic
  
  return { value, setValue, isLoading };
};
```

### Service Pattern
```typescript
interface ServiceConfig {
  apiKey?: string;
  baseUrl: string;
}

class ServiceClass {
  private config: ServiceConfig;
  
  constructor(config: ServiceConfig) {
    this.config = config;
  }
  
  async methodName(): Promise<ReturnType> {
    // Service implementation
  }
}
```

## 🎨 Styling Patterns

### Tailwind CSS Classes
```typescript
// Responsive design pattern
const className = "w-full md:w-1/2 lg:w-1/3";

// Dark mode support
const className = "bg-white dark:bg-gray-900 text-black dark:text-white";

// Animation classes
const className = "transition-all duration-300 ease-in-out";

// Custom CSS variables
const className = "text-[var(--accent)] bg-[var(--secondary)]";
```

### CSS Variables Usage
```css
:root {
  --accent: #3B82F6;
  --secondary: #8B5CF6;
  --tertiary: #06B6D4;
}
```

### Component Styling Pattern
```typescript
const Component = ({ className, ...props }: ComponentProps) => {
  return (
    <div 
      className={cn(
        "base-classes",
        "responsive-classes",
        "state-classes",
        className
      )}
      {...props}
    >
      {/* Component content */}
    </div>
  );
};
```

## 🎭 Animation Patterns

### Framer Motion Pattern
```typescript
import { motion } from 'framer-motion';

const AnimatedComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated content */}
    </motion.div>
  );
};
```

### Spring Animation Pattern
```typescript
const springConfig = {
  type: "spring",
  stiffness: 100,
  damping: 10,
  mass: 1
};

<motion.div
  animate={{ x: targetX, y: targetY }}
  transition={springConfig}
>
  {/* Spring animated content */}
</motion.div>
```

### Reduced Motion Support
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animationProps = prefersReducedMotion ? {} : {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};
```

## 🔄 State Management Patterns

### Context Pattern
```typescript
interface ContextState {
  value: string;
  setValue: (value: string) => void;
}

const Context = createContext<ContextState | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, setValue] = useState('');
  
  return (
    <Context.Provider value={{ value, setValue }}>
      {children}
    </Context.Provider>
  );
};

export const useContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useContext must be used within ContextProvider');
  }
  return context;
};
```

### Custom Hook Pattern
```typescript
interface UseStateReturn {
  state: StateType;
  setState: (state: StateType) => void;
  isLoading: boolean;
  error: Error | null;
}

const useCustomState = (): UseStateReturn => {
  const [state, setState] = useState<StateType>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Hook logic with proper cleanup
  
  useEffect(() => {
    return () => {
      // Cleanup logic
    };
  }, []);
  
  return { state, setState, isLoading, error };
};
```

## 🧪 Testing Patterns

### Component Test Pattern
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  it('handles user interactions', () => {
    render(<Component />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Updated Text')).toBeInTheDocument();
  });
  
  it('accessibility requirements', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label');
  });
});
```

### API Test Pattern
```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from './api-route';

describe('API Route', () => {
  it('handles GET request', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });
    
    await handler(req, res);
    
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(expectedData);
  });
});
```

## 🎙️ Voice & AI Patterns

### Voice Recognition Pattern
```typescript
const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const recognition = useMemo(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      return new (window as any).webkitSpeechRecognition();
    }
    return null;
  }, []);
  
  const startListening = useCallback(() => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  }, [recognition]);
  
  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);
  
  useEffect(() => {
    if (!recognition) return;
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    return () => {
      recognition.abort();
    };
  }, [recognition]);
  
  return { isListening, transcript, startListening, stopListening };
};
```

### AI Chat Pattern
```typescript
interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content })
      });
      
      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return { messages, isLoading, sendMessage };
};
```

## 📱 Responsive Design Patterns

### Mobile-First Pattern
```typescript
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
};

// Usage
const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
const isDesktop = useMediaQuery('(min-width: 1025px)');
```

### Responsive Component Pattern
```typescript
const ResponsiveComponent = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div className={cn(
      "base-styles",
      isMobile ? "mobile-styles" : "desktop-styles"
    )}>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
};
```

## 🔧 Error Handling Patterns

### Error Boundary Pattern
```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    
    return this.props.children;
  }
}
```

### API Error Handling Pattern
```typescript
const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    return { error: error.message };
  }
  
  console.error('Unknown API Error:', error);
  return { error: 'An unexpected error occurred' };
};

const apiCall = async () => {
  try {
    const response = await fetch('/api/endpoint');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};
```

## 🎨 Performance Patterns

### Memoization Pattern
```typescript
const ExpensiveComponent = React.memo<ComponentProps>(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: item.value * 2
    }));
  }, [data]);
  
  const handleClick = useCallback((id: string) => {
    // Handle click with memoized callback
  }, []);
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.processed}
        </div>
      ))}
    </div>
  );
});
```

### Lazy Loading Pattern
```typescript
const LazyComponent = lazy(() => import('./HeavyComponent'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  );
};
```

## 📝 Documentation Patterns

### Component Documentation
```typescript
/**
 * Component description
 * 
 * @param props - Component props
 * @param props.className - Additional CSS classes
 * @param props.children - Child elements
 * 
 * @example
 * ```tsx
 * <Component className="custom-class">
 *   <div>Content</div>
 * </Component>
 * ```
 */
const Component: React.FC<ComponentProps> = ({ className, children }) => {
  // Component implementation
};
```

### Hook Documentation
```typescript
/**
 * Custom hook description
 * 
 * @param initialValue - Initial state value
 * @returns Hook return value
 * 
 * @example
 * ```tsx
 * const { value, setValue, isLoading } = useCustomHook('initial');
 * ```
 */
const useCustomHook = (initialValue: string) => {
  // Hook implementation
};
```

## 🔄 File Organization Patterns

### Import Organization
```typescript
// 1. React and Next.js imports
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';

// 2. Third-party library imports
import { cn } from '@/utils/cn';

// 3. Internal component imports
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/Container';

// 4. Type imports
import type { ComponentProps } from '@/types/components';

// 5. Utility imports
import { formatDate } from '@/utils/date';
```

### Export Organization
```typescript
// Named exports for components
export { Component } from './Component';
export { AnotherComponent } from './AnotherComponent';

// Default export for pages
export default Page;

// Type exports
export type { ComponentProps } from './types';
```

These patterns ensure consistency, maintainability, and best practices throughout the project. 