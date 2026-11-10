/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        berry: {
          blue: '#0866E8',
          electric: '#00A8FF',
          navy: '#071B3D',
          deep: '#003B85',
          light: '#F4F8FF',
          purple: '#7048FF',
        },
      },
    },
  },
  plugins: [],
};
