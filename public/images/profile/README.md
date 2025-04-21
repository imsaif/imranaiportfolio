# Profile Avatar Instructions

## Current Implementation
A circular avatar has been added to the header component. This avatar:
- Is displayed alongside your name in the header
- Has a subtle loading animation when the page initially loads
- Features a scale animation on hover
- Has a gradient border effect
- Remains visible as users scroll through your site

## How to Replace the Avatar
1. Prepare a square headshot photo (recommended size: 400x400px)
2. Optimize the image for web (compress it using tools like [TinyPNG](https://tinypng.com/))
3. Replace the placeholder image at `/public/images/profile/avatar.jpg` with your photo
4. Keep the same filename to ensure the header component references it correctly

## Design Tips
- Use a photo with good lighting and a clean background
- Your face should be centered and take up approximately 80% of the frame
- Consider a photo that matches your site's professional tone
- For best results, choose an image with sufficient contrast against the header background

## Technical Notes
- The header component uses Next.js Image component for optimal loading
- The image has been configured with priority loading for faster initial display
- A fallback "IM" is shown while the image loads
- The component uses Framer Motion for animations 