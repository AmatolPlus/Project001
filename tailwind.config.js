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
          'Poppins-Regular',
          'Poppins-Light',
          'Poppins-SemiBold',
          'Poppins-Medium',
        ],
        'sans-bold': ['Poppins-Bold', 'Poppins-ExtraBold'],
      },
    },
  },
  plugins: [],
};
