/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif:
          'InterTightRegular, InterTightMedium, InterTightSemiBold, sans-serif',
      },
      colors: {
        'light-background': 'rgba(246, 246, 246, 1)',
        // 'light-background': '#d9d9d9',
        'main-black': 'rgba(29, 29, 29, 1)',
        'main-gray': 'rgba(238, 238, 238, 1)',
      },
    },
  },
  plugins: [],
};
