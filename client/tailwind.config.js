/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#fd7e14', // Vibrant Orange from Logo
          blue: '#0f172a',   // Deep Navy from Logo
          dark: '#020617',   // Background
        },
        neon: {
          blue: '#00f3ff',
          purple: '#bc13fe',
          pink: '#ff0055',
          green: '#0aff68',
        },
        dark: {
          DEFAULT: '#050505',
          surface: '#0a0a0a',
          card: '#121212',
        }
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 5px rgba(0, 243, 255, 0.5)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 15px rgba(0, 243, 255, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
