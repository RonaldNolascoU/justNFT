const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      boxShadow: {
        white: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px #fff',
      },
      colors: {
        'blue-gray': colors.blueGray,
      },
    },
    screens: {
      xs: '414px',
      // => @media (min-width: 414px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1800px',
      // => @media (min-width: 1800px) { ... }
    },
  },
  variants: {
    extend: { animation: ['motion-safe'] },
  },
  plugins: [],
}
