/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'cfe-blue': '#003a70',
        'cfe-yellow': '#ffd100',
        'cfe-light': '#f3f8ff',
        'cfe-dark': '#052a4f'
      },
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
    }
  },
  plugins: [],
}
