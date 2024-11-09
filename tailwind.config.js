/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        'loader-orange': '#FF6B00', // Brighter, more vibrant orange
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(-2%)' },
          '50%': { transform: 'translateY(0)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg) scale(0.8)' },
          '50%': { transform: 'rotate(360deg) scale(1.2)' },
          '100%': { transform: 'rotate(720deg) scale(0.8)' },
        },
        ball1: {
          '0%': { 
            boxShadow: '30px 0 0 theme(colors.loader-orange)',
            marginBottom: '10px'
          },
          '50%': { 
            boxShadow: '0 0 0 theme(colors.loader-orange)',
            marginBottom: '0',
            transform: 'translate(15px, 15px)'
          },
          '100%': { 
            boxShadow: '30px 0 0 theme(colors.loader-orange)',
            marginBottom: '10px'
          },
        },
        ball2: {
          '0%': { 
            boxShadow: '30px 0 0 theme(colors.white)',
            marginTop: '0'
          },
          '50%': { 
            boxShadow: '0 0 0 theme(colors.white)',
            marginTop: '-20px',
            transform: 'translate(15px, 15px)'
          },
          '100%': { 
            boxShadow: '30px 0 0 theme(colors.white)',
            marginTop: '0'
          },
        }
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out forwards',
        'bounce-slight': 'bounce-slight 1s infinite',
        'loader-rotate': 'rotate 1s infinite',
        'loader-ball1': 'ball1 1s infinite',
        'loader-ball2': 'ball2 1s infinite'
      },
    },
  },
  plugins: [],
}