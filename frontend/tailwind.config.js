/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#0f58b7',
      },
      fontSize: {
        small: '10px',
      },
    },
    screens: {
      sm: '690px',
      md: '850px',
      lg: '1070px',
      //   // xl: '',
    },
    backgroundImage: {
      background: 'url(src/assets/img/image.png)',
    },
  },
  plugins: [],
};

