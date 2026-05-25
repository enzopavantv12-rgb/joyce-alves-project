import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EF',
        ivory: '#FBF8F4',
        porcelain: '#FFFFFF',
        nude: {
          50: '#FAF1EB',
          100: '#F2E2D6',
          200: '#E8CDBC',
          300: '#D8B7A3',
          400: '#C9A088',
          500: '#B5876D',
        },
        rose: {
          400: '#D4A89E',
          500: '#C9998D',
          600: '#B07F73',
        },
        cocoa: {
          400: '#8B6650',
          500: '#6E4B3A',
          600: '#503426',
          700: '#3A2519',
          800: '#231410',
        },
        gold: {
          300: '#D8BA8A',
          400: '#C6A16E',
          500: '#A8845A',
          600: '#8A6A47',
        },
        ink: {
          DEFAULT: '#2A1F1A',
          soft: '#5C4A3F',
          muted: '#8A7668',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'section-y': '6rem',
        'section-y-lg': '10rem',
      },
      maxWidth: {
        'content': '1280px',
        'prose': '640px',
        'tight': '880px',
      },
      boxShadow: {
        'custom': '0 30px 60px -30px rgba(110,75,58,0.25)',
      }
    },
  },
  plugins: [],
} satisfies Config
