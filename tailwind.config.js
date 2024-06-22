/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        '3xl': '0px 2px 5px 0px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}

