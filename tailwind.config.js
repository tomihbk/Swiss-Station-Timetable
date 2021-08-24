module.exports = {
  // removes unused styles in production
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'display': 'Inter UI, Inter'
    },
    extend: {},
  },
  variants: {
    extend: {
      dropShadow: ['hover', 'focus'],
      cursor: ['hover', 'focus']
    },
  },
  plugins: [],
}
