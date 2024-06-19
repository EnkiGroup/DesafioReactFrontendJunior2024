/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "title-color": "#B83F45",
      },
      padding: {
        default: "16px 16px 16px 60px",
      },
      boxShadow: {
        "input-shadow-focus": " 0 -1px 2px 0 #B83F45",
      },
      fontFamily:{
        'helvetica': ['Helvetica', 'sans-serif']
      }
    },
  },
  plugins: [],
};
