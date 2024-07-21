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
        'primary-black': 'rgba(29, 29, 29, 1)',
        'primary-gray': 'rgba(238, 238, 238, 1)',
        'primary-blue': 'rgba(1, 71, 255, 1)',
      },
			fontSize: {
				'primary-h1': ['32px', '48px']
			},
      borderRadius: {
        main: '10px',
      },
    },
  },
  plugins: [],
};
