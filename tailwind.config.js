/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: { DEFAULT: '#800020', deep: '#6B0019', light: '#8F1A33' },
        cream: { DEFAULT: '#F5EBDD', soft: '#E8D9C5' },
        pink: '#F4C2C2',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
