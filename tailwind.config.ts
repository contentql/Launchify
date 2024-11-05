import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/payload/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      colors: {
        primary: {
          DEFAULT: '#6D28D9', // Deep violet for main emphasis, striking but not overpowering
          content: '#ECE6FF', // Soft lavender for text on purple background
        },
        secondary: {
          DEFAULT: '#34D399', // Muted teal for secondary actions, balancing vibrancy with elegance
          content: '#E7F6F3', // Pale mint for text on secondary background
        },
        neutral: {
          DEFAULT: '#374151', // Dark slate grey, perfect for neutral elements
          content: '#F3F4F6', // Light grey for readability on neutral backgrounds
        },
        'base-100': '#18181B', // Charcoal black for background, offering depth without starkness
        'base-200': '#25262A', // Dark graphite for secondary background elements
        'base-300': '#3B3C40', // Medium grey for tertiary backgrounds, subtly softening the palette
        'base-content': '#D1D5DB', // Light grey for text on dark backgrounds, ensuring readability
        warning: '#FBBF24', // Muted golden amber, suitable for warning elements without harshness
        info: '#60A5FA', // Soft sky blue for informational highlights
        success: '#10B981', // Calming green for success messages, aligned with the secondary color
        error: '#EF4444', // Softened red for error messages, maintaining visibility and elegance
      },
    },
  },
  prefix: '',
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}

export default config
