/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        berry: {
          blue: '#087BFF',
          electric: '#00A8FF',
          navy: '#061A3A',
          deep: '#003B85',
          light: '#F4F8FF',
          purple: '#673DE6',
        },
      },
    },
  },
  plugins: [],
};
