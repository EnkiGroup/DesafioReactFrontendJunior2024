/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'gray-1': '#949494',
      'gray-2': '#E6E6E6',
      'gray-3': '#989898',
      'gray-4': '#ECECEC',
      'green': '#3EA390',
      'red': '#B83F45',
      'white': '#ffffff',
      'white-1': '#F5F5F5',
      'white-2': '#FEFEFE',
      'black': '#000000',
      'black-2': '#484848',
    },
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

