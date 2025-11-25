/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity-server/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      scrollbars: ['thin'],
      keyframes: {
        'typo-fade': {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(.99)' },
          '60%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        floatSlow: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        floatFast: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' },
        },
        floatMid: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(0)' },
        },
        tilt: {
          '0%': { transform: 'rotate(-6deg) translateY(0)' },
          '50%': { transform: 'rotate(2deg) translateY(-6px)' },
          '100%': { transform: 'rotate(-6deg) translateY(0)' },
        }
      },
      animation: {
        'typo-fade': 'typo-fade 900ms ease both',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-fast': 'floatFast 4s ease-in-out infinite',
        'float-mid': 'floatMid 5s ease-in-out infinite',
        'tilt': 'tilt 8s ease-in-out infinite'
      },
      colors: {
        primary: '#5315FC',
        secondary: 'var(--secondary-color)',
        bg: {
          primary: '#5315FC',
          secondary: 'var(--bg-secondary)'
        },
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms')
  ],
}
