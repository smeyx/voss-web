const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.{jsx,js,tsx,ts}', './components/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
    colors: {
      'primary': {
        50: '#62f8ee',
        100: '#14f5e6',
        200: '#09d7ca',
        300: '#07b0a5',
        400: '#068980',
        500: '#04615b',
        600: '#034e49',
        700: '#023b37',
        800: '#022725',
        900: '#011412',
      },
      'secondary': {
        50: '#e3e08c',
        100: '#dbd76b',
        200: '#d7d35b',
        300: '#d3cf4a',
        400: '#cfca3a',
        500: '#B8B42D',
        600: '#a4a028',
        700: '#949024',
        800: '#838020',
        900: '#73701c',
      },
      'gray': colors.gray,
      'white': colors.white,
      'zinc': colors.zinc,
      'red': colors.red,
      'neutral': colors.neutral,
      'dark': '#141414',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
      // 'gray': {
      //   50: '#f2f0f2',
      //   100: '#d7d1d8',
      //   200: '#bcb3be',
      //   300: '#695c6b',
      //   400: '#4b414c',
      //   500: '#3E363F',
      //   600: '#362f37',
      //   700: '#2b262c',
      //   800: '#201c21',
      //   900: '#161316',
      // },
