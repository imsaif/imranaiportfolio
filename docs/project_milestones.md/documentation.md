# Portfolio Website Documentation

## Project Structure
```
src/
├── app/             # Next.js App Router pages and layouts
├── components/      # React components organized by purpose
│   ├── layout/      # Layout components (header, footer)
│   ├── sections/    # Page section components (Hero, Projects, etc.)
│   └── ui/          # Reusable UI components (Button, WaveAnimation, etc.)
├── context/         # React Context providers
│   └── ChatContext.tsx  # Chat functionality context
├── hooks/           # Custom React hooks
│   └── useTextCycling.tsx  # Hook for animated text cycling
└── types/           # TypeScript type definitions
```

## Component Specifications

### Layout Components

#### `Layout` (`layout.tsx`)
- **Purpose**: Main layout wrapper for the entire application
- **Props**: `children` - React nodes to be rendered within the layout
- **Features**:
  - Includes Header and Footer
  - Handles global styling and layout structure
  - Controls page container width and padding

#### `Header` (`components/layout/Header.tsx`)
- **Purpose**: Navigation header for the site
- **Props**: None
- **Features**:
  - Responsive navigation with mobile menu
  - Smooth scrolling to page sections
  - Handles active state for current section

#### `Footer` (`components/layout/Footer.tsx`)
- **Purpose**: Site footer with contact information and links
- **Props**: None
- **Features**:
  - Social media links
  - Copyright information
  - Contact links

### Section Components

#### `Hero` (`components/sections/Hero.tsx`)
- **Purpose**: Main hero section with animated text and chat feature
- **Props**: None
- **Features**:
  - Text cycling animation for rotating phrases
  - Integrated chat button that expands to full interface
  - Responsive design with mobile optimization

#### `Projects` (`components/sections/Projects.tsx`)
- **Purpose**: Showcase portfolio projects
- **Props**: None
- **Features**:
  - Project card grid with filtering options
  - Interactive project cards with hover effects
  - Modal for detailed project view

#### `Skills` (`components/sections/Skills.tsx`)
- **Purpose**: Display designer's skill areas
- **Props**: None
- **Features**:
  - Visual representation of skill categories
  - Animated on scroll reveal

#### `Process` (`components/sections/Process.tsx`)
- **Purpose**: Explain design process methodology
- **Props**: None
- **Features**:
  - Step-by-step process visualization
  - Interactive elements to explain each step

#### `About` (`components/sections/About.tsx`)
- **Purpose**: Personal information and background
- **Props**: None
- **Features**:
  - Personal bio and background information
  - Education and experience highlights

#### `Contact` (`components/sections/Contact.tsx`)
- **Purpose**: Contact form and information
- **Props**: None
- **Features**:
  - Contact form with validation
  - Direct contact information
  - Form submission handling

### UI Components

#### `Button` (`components/ui/Button.tsx`)
- **Purpose**: Reusable button component
- **Props**: 
  - `variant`: 'primary' | 'outline' | 'secondary' | 'gradient'
  - `size`: 'sm' | 'md' | 'lg'
  - `children`: React node
  - `onClick`: function
  - `className`: string (optional)
  - `disabled`: boolean (optional)
  - Other standard button attributes
- **Features**:
  - Multiple style variants
  - Size options
  - Support for icons
  - Accessibility features

#### `WaveAnimation` (`components/ui/WaveAnimation.tsx`)
- **Purpose**: Canvas-based animated waves
- **Props**:
  - `height`: number - Height of the wave container
  - `colors`: string[] - Array of colors for waves
  - `className`: string (optional)
- **Features**:
  - Responsive to container width
  - Multiple wave layers with different speeds
  - Device pixel ratio awareness for crisp rendering
  - Performance optimized

#### `SectionTitle` (`components/ui/SectionTitle.tsx`)
- **Purpose**: Consistent section title component
- **Props**:
  - `title`: string - Main title text
  - `subtitle`: string (optional) - Subtitle text
  - `alignment`: 'left' | 'center' | 'right' (default: 'left')
  - `className`: string (optional)
- **Features**:
  - Consistent styling across sections
  - Optional subtitle
  - Alignment options

### Context and Hooks

#### `ChatContext` (`context/ChatContext.tsx`)
- **Purpose**: Global state management for chat functionality
- **State**:
  - `isOpen`: boolean - Whether chat is currently open
  - `messages`: Message[] - Array of chat messages
  - `isTyping`: boolean - Whether AI is currently "typing"
- **Methods**:
  - `toggleChat()`: Toggle chat open/closed
  - `sendMessage(text: string)`: Send a new user message
  - `closeChat()`: Close the chat interface
  - `selectSuggestedQuestion(text: string)`: Choose a suggested question

#### `useTextCycling` (`hooks/useTextCycling.tsx`)
- **Purpose**: Hook for cycling through text phrases with animation
- **Params**:
  - `phrases`: string[] - Array of phrases to cycle through
  - `typingSpeed`: number - Milliseconds per character for typing animation
  - `delayBetweenPhrases`: number - Milliseconds to wait between phrases
- **Returns**:
  - `currentText`: string - Current displayed text
  - `isDeleting`: boolean - Whether currently in delete animation phase
  - `currentPhraseIndex`: number - Index of current phrase

## Animation Specifications

### Wave Animation
- **Implementation**: Canvas-based with procedural generation
- **Features**:
  - Multiple wave layers with different amplitudes and frequencies
  - Dynamic resizing with window changes
  - Device pixel ratio awareness
  - Optimized rendering with requestAnimationFrame
- **Performance Considerations**:
  - Uses memoization to prevent unnecessary re-renders
  - Proper cleanup of animation frames
  - Reduced drawing operations

### Text Cycling Animation
- **Implementation**: Custom React hook with useState and useEffect
- **Features**:
  - Character-by-character typing effect
  - Smooth deletion animation
  - Configurable typing speed and delays
- **Stages**:
  1. Type characters one by one until phrase is complete
  2. Pause for specified delay
  3. Delete characters one by one
  4. Begin typing next phrase

## Accessibility Considerations
- Semantic HTML structure
- Keyboard navigation support
- ARIA attributes for interactive elements
- Sufficient color contrast
- Reduced motion options
- Screen reader friendly content structure

## Architecture Decisions

### Next.js App Router
- **Decision**: Use Next.js App Router instead of Pages Router
- **Rationale**: 
  - Better support for React Server Components
  - Improved performance for static content
  - More intuitive routing system
  - Better alignment with React's future direction

### Canvas for Animations
- **Decision**: Use Canvas API for wave animations instead of SVG or CSS
- **Rationale**:
  - Better performance for complex animations
  - More control over drawing operations
  - Reduced DOM nodes compared to SVG approach
  - Better support for particle effects

### React Context for Chat
- **Decision**: Use React Context for chat state instead of a state management library
- **Rationale**:
  - Simpler implementation for a single-feature state
  - Reduced bundle size without external dependencies
  - Sufficient for the scope of the chat functionality
  - Easy to test and maintain

### Client Components for Interactivity
- **Decision**: Use "use client" directive for interactive components
- **Rationale**:
  - Necessary for components using browser APIs
  - Allows for proper event handling
  - Enables use of hooks and state
  - Clear separation between server and client logic