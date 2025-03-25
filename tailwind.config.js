/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tech-blue': '#0a2463',
        'tech-purple': '#5a31f4',
        'tech-teal': '#21e6c1',
        'tech-coral': '#ff6b6b',
        'light-bg': '#f7f9fc',
        'dark-slate': '#1e293b',
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #0a2463 0%, #5a31f4 100%)',
        'gradient-teal': 'linear-gradient(135deg, #21e6c1 0%, #5a31f4 100%)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 