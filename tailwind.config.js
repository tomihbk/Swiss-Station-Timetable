module.exports = {
  // removes unused styles in production
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      'display': 'HKGrotesk-Regular, Roboto, Helvetica, sans-serif',
      'secondary': 'Inter, Roboto, Helvetica, Arial, sans-serif'
    },
    minWidth: {
      'min-suggested-station-card': '20em',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
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
