/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        swing: 'swing 3s ease-in-out infinite',
        slideUp: 'slideUp 0.4s ease-out'
      },
      keyframes: {
        swing: {
          '0%, 100%': { transform: 'translateX(0deg)' },
          '50%': { transform: 'translateX(2deg)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      willChange: {
      'transform-opacity': 'transform, opacity',
      },
      colors: {
        primary: '#0f3460',
        secondary: '#533483',
        accent: '#e94560',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

