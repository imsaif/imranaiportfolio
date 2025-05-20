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