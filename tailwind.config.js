/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bgPrim:'#2D2D2D',
        bgItem: 'white/20',
        textPrim:'white',
        textSec:'#A5A5A5',

      }

    },
  },
  plugins: [],
}
