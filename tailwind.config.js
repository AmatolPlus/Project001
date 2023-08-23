/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e8e7f0',
        secondary: '#9ea0c0',
        info: '#585990',
        danger: '#FF506B',
      },
      fontFamily: {
        sans: [
          'Rubik-Regular',
          'Rubik-Light',
          'Rubik-SemiBold',
          'Rubik-Medium',
        ],
        'sans-bold': ['Rubik-Bold', 'Rubik-ExtraBold'],
      },
    },
  },
  plugins: [],
};
