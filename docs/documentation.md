# Portfolio Site Documentation

## Architecture Overview

This portfolio site uses a modern web architecture based on Next.js 13+ with the App Router. The application follows a component-based approach with a clear separation of concerns.

### Key Architecture Decisions

1. **Next.js App Router**: Using the newer App Router instead of Pages Router for improved routing, layouts, and server components capabilities.
   - **Rationale**: Provides better performance through React Server Components and simplified layout management.
   - **Date decided**: Initial project setup.

2. **TypeScript**: All components and utilities are written in TypeScript for type safety and improved developer experience.
   - **Rationale**: Reduces runtime errors through static type checking and improves maintainability.
   - **Date decided**: Initial project setup.

3. **Tailwind CSS**: Using utility-first CSS approach for consistent styling and rapid development.
   - **Rationale**: Accelerates development with predefined utility classes while maintaining design consistency.
   - **Date decided**: Initial project setup.

4. **Component Organization**: Components are organized by function and reusability:
   - UI components (buttons, cards, etc.)
   - Layout components (headers, footers, etc.)
   - Page-specific components
   - Section components
   - **Rationale**: Improves maintainability and code reusability by separating concerns.

5. **State Management**: React Context for global state and component-local state for UI elements.
   - **Rationale**: Using built-in React state management for simplicity; no need for Redux or other state managers for this project scope.
   - **Date decided**: Initial project setup.

6. **Testing Strategy**: Jest for unit/component tests and Cypress for end-to-end testing.
   - **Rationale**: Provides comprehensive test coverage from component to full application flow.
   - **Date decided**: Initial project setup.

7. **Responsive Design**: Mobile-first approach with breakpoints for larger screens.
   - **Rationale**: Ensures optimal user experience across all device sizes.
   - **Date decided**: Initial project setup.

8. **Animations**: Framer Motion for component animations with consideration for performance and accessibility.
   - **Rationale**: Provides sophisticated animation capabilities with good performance characteristics.
   - **Date decided**: Initial project setup.

## Database Schemas

The portfolio site primarily uses file-based data for content, but also connects to a database for dynamic features like contact form submissions and analytics.

### Contact Submissions Schema

```typescript
// PostgreSQL schema
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'unread',
  notes TEXT
);

// Prisma schema equivalent
model ContactSubmission {
  id        Int      @id @default(autoincrement())
  name      String   @db.VarChar(100)
  email     String   @db.VarChar(100)
  subject   String?  @db.VarChar(200)
  message   String   @db.Text
  createdAt DateTime @default(now()) @map("created_at")
  status    String   @default("unread") @db.VarChar(20)
  notes     String?  @db.Text
}
```

### Projects Schema

```typescript
// PostgreSQL schema
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  thumbnail VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  completed_date DATE NOT NULL,
  featured BOOLEAN DEFAULT false,
  url VARCHAR(200),
  github_url VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_images (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  url VARCHAR(200) NOT NULL,
  alt_text VARCHAR(200),
  display_order INTEGER DEFAULT 0
);

CREATE TABLE project_technologies (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  technology VARCHAR(50) NOT NULL
);

CREATE TABLE project_details (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  challenge TEXT,
  solution TEXT,
  outcome TEXT
);

// Prisma schema equivalent
model Project {
  id           Int       @id @default(autoincrement())
  slug         String    @unique @db.VarChar(100)
  title        String    @db.VarChar(100)
  description  String    @db.Text
  thumbnail    String    @db.VarChar(200)
  category     String    @db.VarChar(50)
  completedDate DateTime @map("completed_date")
  featured     Boolean   @default(false)
  url          String?   @db.VarChar(200)
  githubUrl    String?   @map("github_url") @db.VarChar(200)
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")
  
  images       ProjectImage[]
  technologies ProjectTechnology[]
  details      ProjectDetail?
}

model ProjectImage {
  id           Int     @id @default(autoincrement())
  project      Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId    Int     @map("project_id")
  url          String  @db.VarChar(200)
  altText      String? @map("alt_text") @db.VarChar(200)
  displayOrder Int     @default(0) @map("display_order")
}

model ProjectTechnology {
  id         Int     @id @default(autoincrement())
  project    Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId  Int     @map("project_id")
  technology String  @db.VarChar(50)
}

model ProjectDetail {
  id        Int     @id @default(autoincrement())
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId Int     @unique @map("project_id")
  challenge String? @db.Text
  solution  String? @db.Text
  outcome   String? @db.Text
}
```

### Analytics Schema (Optional)

```typescript
// PostgreSQL schema
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  page_path VARCHAR(200) NOT NULL,
  view_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_hash VARCHAR(64),
  user_agent TEXT,
  referrer VARCHAR(200)
);

// Prisma schema equivalent
model PageView {
  id        Int      @id @default(autoincrement())
  pagePath  String   @map("page_path") @db.VarChar(200)
  viewDate  DateTime @default(now()) @map("view_date")
  ipHash    String?  @map("ip_hash") @db.VarChar(64)
  userAgent String?  @map("user_agent") @db.Text
  referrer  String?  @db.VarChar(200)
}
```

## Component Specifications

### Layout Components

#### Header (`Header.tsx`)
- **Purpose**: Main navigation and site identity
- **Features**:
  - Responsive navigation menu
  - Mobile hamburger menu
  - Logo/brand link to homepage
  - Smooth scroll to page sections
- **Props**:
  - `transparent?: boolean` - Whether the header should be transparent over content
  - `activeSection?: string` - Currently active section for highlighting nav items

#### Footer (`Footer.tsx`)
- **Purpose**: Site footer with links and information
- **Features**:
  - Social media links
  - Contact information
  - Copyright notice
  - Additional navigation
- **Props**:
  - `showExtendedInfo?: boolean` - Whether to show additional information

### Page Sections

#### Hero (`Hero.tsx`)
- **Purpose**: Main landing section of the site
- **Features**:
  - Animated introduction
  - Call-to-action buttons
  - Background animations
- **Props**:
  - `title: string` - Main headline
  - `subtitle?: string` - Supporting text
  - `ctaText?: string` - Text for primary CTA button
  - `ctaLink?: string` - Link for primary CTA

#### About (`About.tsx`)
- **Purpose**: Personal or professional information
- **Features**:
  - Professional background
  - Skills and expertise
  - Optional profile image
- **Props**:
  - `data: AboutData` - Content for the about section

#### Projects (`Projects.tsx`)
- **Purpose**: Showcase portfolio projects
- **Features**:
  - Project cards with previews
  - Filtering options
  - Links to case studies
- **Props**:
  - `projects: Project[]` - Array of project data
  - `showFilters?: boolean` - Whether to show category filters

#### Contact (`Contact.tsx`)
- **Purpose**: Contact form and information
- **Features**:
  - Form with validation
  - Success/error messages
  - Alternative contact methods
- **Props**:
  - `contactInfo: ContactInfo` - Contact information
  - `formEndpoint?: string` - API endpoint for form submission

#### Process (`Process.tsx`)
- **Purpose**: Explain work process or methodology
- **Features**:
  - Step-by-step visualization
  - Animated progression
- **Props**:
  - `steps: ProcessStep[]` - Array of process steps

#### Resume (`Resume.tsx`)
- **Purpose**: Displays professional resume/CV
- **Features**:
  - Formatted sections (Experience, Education, Skills)
  - Downloadable PDF option
  - Responsive layout
- **Props**:
  - `resumeData: ResumeData` - Data object containing resume information

### Reusable UI Components

#### Container (`Container.tsx`)
- **Purpose**: Consistent container for page content
- **Props**:
  - `children: ReactNode` - Child components
  - `className?: string` - Additional CSS classes
  - `maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'` - Container max width

#### AnimatedLogo (`AnimatedLogo.tsx`)
- **Purpose**: Animated site logo
- **Features**:
  - SVG animation with Framer Motion
  - Interaction effects
- **Props**:
  - `size?: 'sm' | 'md' | 'lg'` - Logo size variant
  - `color?: string` - Primary color

#### InteractiveBubbles (`InteractiveBubbles.tsx`)
- **Purpose**: Interactive background element
- **Features**:
  - Canvas-based animation
  - Mouse interaction
  - Performance optimizations
- **Props**:
  - `density?: number` - Number of elements
  - `colors?: string[]` - Color palette

#### Icons (`Icons.tsx`)
- **Purpose**: Collection of SVG icons
- **Features**:
  - Consistent sizing and styling
  - Accessibility attributes
- **Individual Icon Props**:
  - `size?: number` - Icon size in pixels
  - `color?: string` - Icon color
  - `className?: string` - Additional CSS classes

### Case Study Components

#### CaseStudyHeader (`CaseStudyHeader.tsx`)
- **Purpose**: Header for case study pages
- **Features**:
  - Project title and summary
  - Key project details
  - Featured image (enhanced with better loading/display)
- **Props**:
  - `project: Project` - Project data
  - `showNav?: boolean` - Whether to show case study navigation

#### CaseStudyBody (`CaseStudyBody.tsx`)
- **Purpose**: Main content area for a case study
- **Features**:
  - Renders detailed sections (Challenge, Solution, Outcome)
  - Displays project images and media (enhanced gallery/display)
  - Integrates technology tags
- **Props**:
  - `project: Project` - Project data including details and images

### Context Providers

#### ClientProviders (`ClientProviders.tsx`)
- **Purpose**: Wrapper for client-side context providers
- **Features**:
  - Theme provider
  - Animation settings provider
  - Other global contexts

## Data Models

### Project
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  category: string;
  url?: string;
  github?: string;
  featured: boolean;
  completed: string; // Date
  details?: {
    challenge: string;
    solution: string;
    outcome: string;
  };
}
```

### AboutData
```typescript
interface AboutData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
}
```

### ProcessStep
```typescript
interface ProcessStep {
  title: string;
  description: string;
  icon: ReactNode;
  color?: string;
}
```

### ContactInfo
```typescript
interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  socialLinks: {
    platform: string;
    url: string;
    icon: ReactNode;
  }[];
}
```

### ResumeData
```typescript
interface ResumeData {
  contact: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    website?: string;
    location?: string;
  };
  summary: string;
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  pdfUrl?: string; // Optional link to downloadable PDF
}
```

## API Endpoints

### Contact Form Submission
- **Endpoint**: `/api/contact`
- **Method**: POST
- **Authentication**: None (public endpoint with rate limiting)
- **Rate Limiting**: Max 5 requests per IP per hour
- **Request Body**:
  ```typescript
  {
    name: string;       // Required, Name of the person
    email: string;      // Required, Valid email format
    message: string;    // Required, Min 10 characters
    subject?: string;   // Optional
  }
  ```
- **Response**:
  ```typescript
  {
    success: boolean;   // Whether the submission was successful
    message: string;    // Success or error message
    id?: string;        // ID of the submission (only on success)
  }
  ```
- **Status Codes**:
  - 200: Success
  - 400: Validation error
  - 429: Rate limit exceeded
  - 500: Server error
- **Validation Rules**:
  - Name: Required, 2-100 characters
  - Email: Required, valid email format
  - Message: Required, 10-2000 characters
  - Subject: Optional, 0-200 characters

### Project Data Retrieval
- **Endpoint**: `/api/projects`
- **Method**: GET
- **Authentication**: None (public endpoint)
- **Query Parameters**:
  - `category`: Filter by project category
  - `featured`: Filter for featured projects only (true/false)
  - `limit`: Maximum number of projects to return
  - `page`: Page number for pagination
- **Response**:
  ```typescript
  {
    projects: Project[];  // Array of projects
    total: number;        // Total number of projects
    page: number;         // Current page
    pageSize: number;     // Page size
    totalPages: number;   // Total number of pages
  }
  ```
- **Status Codes**:
  - 200: Success
  - 400: Invalid parameters
  - 500: Server error

### Single Project Retrieval
- **Endpoint**: `/api/projects/[slug]`
- **Method**: GET
- **Authentication**: None (public endpoint)
- **URL Parameters**:
  - `slug`: Project slug/identifier
- **Response**:
  ```typescript
  {
    project: Project;    // Project data
  }
  ```
- **Status Codes**:
  - 200: Success
  - 404: Project not found
  - 500: Server error

### Analytics Tracking (Internal)
- **Endpoint**: `/api/analytics/pageview`
- **Method**: POST
- **Authentication**: None (internal use with CSRF protection)
- **Request Body**:
  ```typescript
  {
    path: string;        // Page path
    referrer?: string;   // Referring URL
  }
  ```
- **Response**:
  ```typescript
  {
    success: boolean;
  }
  ```
- **Status Codes**:
  - 200: Success
  - 400: Invalid parameters
  - 403: Invalid CSRF token
  - 500: Server error

## Server-Side Validation

1. **Validation Approach**:
   - All API endpoints implement comprehensive server-side validation
   - Client-side validation is used for immediate feedback only
   - Server-side validation is the primary security control
   - Validation failures are logged and returned as structured errors

2. **Validation Utilities**:
   - Central validation utility in `src/utils/api/validation.ts`
   - Type-safe validation functions for each data model
   - Comprehensive error messages for failed validations
   - Validation functions return both validity status and detailed error messages

3. **Key Validations by Endpoint**:

   **Contact Form (`/api/contact`)**:
   - Name: Required, 2-100 characters
   - Email: Required, valid email format per RFC 5322
   - Message: Required, 10-2000 characters
   - Subject: Optional, max 200 characters
   - Rate limiting: Configurable requests per time window

   **Projects List (`/api/projects`)**:
   - Category: Optional, 1-50 characters
   - Featured: Optional boolean flag
   - Limit: Optional, 1-100 integer
   - Page: Optional, positive integer
   - Query parameters sanitized and validated

   **Single Project (`/api/projects/[slug]`)**:
   - Slug: Required, alphanumeric with hyphens and underscores only
   - Security checks for path traversal attacks

   **Analytics (`/api/analytics/pageview`)**:
   - Path: Required, 1-200 characters
   - Referrer: Optional, max 200 characters
   - CSRF token validation
   - IP address anonymized via hashing

4. **Security Considerations**:
   - Input sanitization to prevent XSS and injection attacks
   - Type checking and data format validation
   - Prevention of parameter pollution attacks
   - Strict validation of all request bodies

5. **Error Handling**:
   - Standard error response format across all endpoints
   - Detailed error messages in development, generic in production
   - Comprehensive error logging for debugging
   - Rate limiting applied to prevent abuse

## Environment Variables and Security

1. **Environment Variable Management**:
   - All sensitive credentials are stored in environment variables
   - Local development uses `.env.local` files
   - Production uses Vercel environment variables
   - Never commit `.env*` files to the repository

2. **Environment Variable Categories**:
   - **API Keys**: External service credentials (e.g., OpenAI)
   - **Database Credentials**: Connection strings and access credentials
   - **Feature Flags**: Toggle features on/off
   - **Service URLs**: URLs for external services

3. **Required Environment Variables**:
   ```
   # OpenAI API (if chat functionality is enabled)
   OPENAI_API_KEY=your_api_key_here
   OPENAI_MODEL=gpt-4o  # Optional, defaults to gpt-4o
   OPENAI_API_URL=https://api.openai.com/v1  # Optional
   NEXT_PUBLIC_USE_AI_API=true|false  # Enable/disable AI chat functionality
   
   # Database connection (if using)
   DATABASE_URL=your_connection_string
   
   # Analytics (if enabled)
   ANALYTICS_API_KEY=your_api_key
   
   # Rate limiting (optional)
   OPENAI_RATE_LIMIT=5  # Requests per window
   OPENAI_RATE_WINDOW_MS=60000  # Window size in milliseconds
   OPENAI_REQUEST_TIMEOUT=15000  # Request timeout in milliseconds
   ```

4. **Security Best Practices**:
   - Never hardcode credentials in the codebase
   - Ensure `.env*` files are in `.gitignore`
   - Use different credentials for development and production
   - Rotate credentials regularly
   - For client-side environment variables, only use `NEXT_PUBLIC_` prefix
   - Keep sensitive operations on the server-side only

5. **Environment Setup**:
   - Local development: Create `.env.local` file at project root
   - CI/CD: Configure environment variables in CI pipeline
   - Production: Set environment variables in hosting platform (e.g., Vercel)

6. **Accessing Environment Variables**:
   - Server-side: `process.env.VARIABLE_NAME`
   - Client-side: Only variables prefixed with `NEXT_PUBLIC_` are accessible
   - Always validate environment variables are available before using them

## Performance Considerations

1. **Image Optimization**:
   - Use Next.js Image component for automatic optimization
   - Implement proper sizing and lazy loading
   - Use WebP format with fallbacks

2. **Code Splitting**:
   - Leveraging Next.js automatic code splitting
   - Lazy loading components when appropriate

3. **Animation Performance**:
   - Use `will-change` property judiciously
   - Optimize animations for 60fps
   - Implement reduced motion alternatives

4. **Asset Loading**:
   - Prioritize critical CSS and JS
   - Defer non-critical resources
   - Optimize font loading with proper display strategies

5. **Server Components**:
   - Use React Server Components for static content
   - Reserve client components for interactive elements

## Accessibility Guidelines

1. **Semantic HTML**:
   - Use proper heading hierarchy
   - Implement ARIA attributes where needed
   - Ensure proper landmark regions

2. **Keyboard Navigation**:
   - All interactive elements must be keyboard accessible
   - Implement focus styles and tab order
   - Ensure no keyboard traps

3. **Color Contrast**:
   - Maintain WCAG 2.1 AA contrast ratios
   - Don't rely solely on color for information

4. **Motion & Animations**:
   - Respect prefers-reduced-motion settings
   - No flashing content that could cause seizures
   - Provide controls to pause/stop animations

5. **Forms & Inputs**:
   - Proper labels and error messages
   - Clear instructions and validation
   - Accessible form controls

## Deployment Procedures

1. **Development Workflow**:
   - Feature branches with PRs to main
   - CI/CD pipeline for testing and preview deployments
   - Code reviews before merging

2. **Staging Environment**:
   - Deployed automatically from main branch
   - Used for QA and stakeholder review

3. **Production Deployment**:
   - Tagged releases from main branch
   - Post-deployment verification

4. **Monitoring & Maintenance**:
   - Performance monitoring with Vercel Analytics
   - Error tracking with Sentry or similar
   - Regular dependency updates

## Content Management

1. **Adding New Projects**:
   - Update project data files in `/src/data`
   - Add project images to `/public/images/projects`
   - Create case study page if needed

2. **Updating Content**:
   - Most content is stored in data files for easy updates
   - Keep image assets optimized when adding new ones

3. **SEO Updates**:
   - Metadata can be updated in page components
   - Sitemap is generated automatically during build

## Change Log

### Major Feature Additions & Updates
- 2024-04-05: Added Resume page (`/resume`)
- 2024-04-10: Implemented Case Study template and initial pages (`/casestudy/lessonloom`, `/casestudy/scheduler`)
- 2024-04-12: Enhanced project image display in Case Studies and Project Showcase

### Major Architecture Decisions
- 2023-10-15: Migrated to Next.js 13.5 with App Router
- 2023-11-01: Added Framer Motion for animations
- 2023-12-05: Implemented database schema for contact submissions
- 2024-01-20: Added analytics tracking system
- 2024-03-10: Enhanced API endpoints with better validation and documentation
- 2024-04-08: Added comprehensive environment variable documentation and security practices
- 2024-04-09: Implemented comprehensive server-side validation for all API endpoints 