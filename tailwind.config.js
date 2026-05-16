/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        board: {
          green: '#2d6a4f',
          'green-dark': '#1b4332',
          line: '#1a3a2a',
        },
      },
    },
  },
  plugins: [],
}
