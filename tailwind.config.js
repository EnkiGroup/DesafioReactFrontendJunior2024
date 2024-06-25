/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'gray-4': '#ECECEC',
      'gray-1': '#949494',
      'gray-2': '#E6E6E6',
      'gray-3': '#989898',
      'green': '#3EA390',
      'red': '#B83F45',
      'white-1': '#F5F5F5',
      'white-2': '#FEFEFE',
      'black': '#000000',
      'black-2': '#484848',
    },
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

