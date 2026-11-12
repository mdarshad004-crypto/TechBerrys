/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        berry: {
          blue: '#1769FF',
          electric: '#398BFF',
          navy: '#11152B',
          deep: '#303C70',
          light: '#F0EEFA',
          purple: '#B8B2F4',
        },
      },
    },
  },
  plugins: [],
};
