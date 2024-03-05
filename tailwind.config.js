/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontWeight:{
        'thin': '100',  
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semi-bold': '600',
        'bold': '700',
        'extra-bold': '800',
        'black': '900',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans'],
        roboto: ['Roboto', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        helvetica: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        
      },
      screens: {
        'xxs': { 'min': '0px', 'max': '374px' }, 
        'xs': { 'min': '375px', 'max': '639px' },
        'sm': { 'min': '640px', 'max': '767px' },
        // => @media (min-width: 640px and max-width: 767px) { ... }

        'md': { 'min': '768px', 'max': '1023px' },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        'lg': { 'min': '1024px', 'max': '1279px' },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        'xl': { 'min': '1280px', 'max': '1535px' },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        '2xl': { 'min': '1536px' },
        // => @media (min-width: 1536px) { ... }
      },
    },
    colors: {
      "white": "#ffffff",
      "gray": "#4d4d4d",
      "purple": "#17162E",
      "purple-shadow": "#100f20",
      "light-purple": "#201e3f",
      "light-gray": "#c9c9c9",
      "red": "#ff0f0f",
      "todo": "#b83f45",
      "background": "#f5f5f5",
      "focusInput": "#cf7d7d",
      "borderColor": "#ce4646",
      "light-gray": "#949494",
      "light-gray-2": "#ededed",
    },
  },

  plugins: [],
}
