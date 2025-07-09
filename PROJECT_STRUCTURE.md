# Portfolio Site Project Structure

## Root Directory
```
imranaiportfolio/
├── docs/                    # All project documentation
│   ├── technical/          # Technical documentation
│   ├── features/           # Feature documentation
│   └── setup/             # Setup and installation guides
├── src/                    # Source code
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   ├── context/           # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── services/          # Business logic services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── data/              # Static data and content
│   └── __tests__/         # Test files
├── public/                # Static assets
├── cypress/               # E2E tests
├── scripts/               # Build and utility scripts
└── logs/                  # Application logs
```

## Component Organization

### `/src/components/`
- **`core/`**: Fundamental components (AnimatedLogo, ErrorBoundary, etc.)
- **`features/`**: Feature-specific components (Hero, About, Projects, etc.)
- **`layout/`**: Layout components (Header, Footer, Container)
- **`ui/`**: Reusable UI components (Button, ChatInterface, etc.)
- **`sections/`**: Page section components
- **`case-studies/`**: Case study specific components
- **`analytics/`**: Analytics and tracking components

### `/src/app/`
- **`api/`**: API routes
- **`casestudy/`**: Case study pages
- **`projects/`**: Project pages
- **`resume/`**: Resume page

## Key Configuration Files
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest testing configuration
- `cypress.config.ts` - Cypress E2E testing configuration

## Documentation Structure
- **Technical**: Development patterns, architecture decisions, voice implementation
- **Features**: Feature documentation, mobile improvements
- **Setup**: Installation guides, rate limiting setup

## Best Practices
1. Use index files for cleaner imports
2. Keep components under 300 lines
3. Follow TypeScript best practices
4. Implement proper error boundaries
5. Use Framer Motion for animations
6. Follow accessibility guidelines (WCAG 2.1 AA)
