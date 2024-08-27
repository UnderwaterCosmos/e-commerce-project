/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        mobile: { min: '320px', max: '480px' },
        descTop: '481px',
      },
      fontFamily: {
        serif:
          'InterTightRegular, InterTightMedium, InterTightSemiBold, sans-serif',
      },
      colors: {
        'dark-background': 'rgba(40, 40, 40, 1)',
        'primary-black': 'rgba(29, 29, 29, 1)',
        'hover-black': 'rgba(55, 55, 55, 1)',
        'active-black': 'rgba(84, 84, 84, 1)',
        'dark-active-black': 'rgba(154, 154, 154, 1)',
        'primary-gray': 'rgba(238, 238, 238, 1)',
        'hover-gray': 'rgba(222, 222, 222, 1)',
        'active-gray': 'rgba(202, 202, 202, 1)',
        'primary-blue': 'rgba(1, 71, 255, 1)',
        'hover-blue': 'rgba(0, 59, 213, 1)',
        'active-blue': 'rgba(0, 46, 165, 1)',
      },
      fontSize: {
        'primary-h1': ['32px', '48px'],
      },
      borderRadius: {
        main: '10px',
      },
    },
  },
  plugins: [],
};
