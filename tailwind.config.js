module.exports = {
  // removes unused styles in production
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'display': 'HK Grotesk, Roboto, Helvetica, sans-serif',
      'secondary': 'Inter UI, Inter, sans-serif'
    },
    minWidth: {
      'min-suggested-station-card': '20em'
    },
    extend: {
    },
  },
  variants: {
    extend: {
      dropShadow: ['hover', 'focus'],
      cursor: ['hover', 'focus'],
      opacity: ['dark'],
      transform: ['hover', 'focus'],
      borderWidth: ['hover', 'focus']
    },
  },
  plugins: [],
}
