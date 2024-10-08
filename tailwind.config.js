/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'min-365-max-640': { min: '365px', max: '640px' },
        'min-500-max-640': { min: '500px', max: '640px' },
        'min-500-max-904': { min: '500px', max: '904px' },
        'min-641-max-904': { min: '641px', max: '904px' },
        'min-905-max-920': { min: '905px', max: '920px' },
        'min-762-max-920': { min: '762px', max: '920px' },
        'max-425': { max: '425px' },
        'min-641': '641px',
        'max-640': { max: '640px' },
        'max-904': { max: '904px' },
        'min-905': '905px',
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
