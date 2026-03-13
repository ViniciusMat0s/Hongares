/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: '#0b1214',
          ivory: '#f4eee0',
          paper: '#fbf7ee',
          gold: '#e3be64',
          clay: '#aa683f',
          sage: '#7e9577',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(19, 18, 14, 0.08)',
        panel: '0 30px 80px rgba(0, 0, 0, 0.24)',
        elevated: '0 24px 70px rgba(19, 18, 14, 0.12)',
      },
    },
  },
  plugins: [],
}
