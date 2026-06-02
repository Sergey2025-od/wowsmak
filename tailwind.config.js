/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        candy: '#e6447a',
        cream: '#fff7f0',
        neonBlue: '#46d7ff',
        neonPurple: '#9b5cff',
      },
    },
  },
  plugins: [],
}
