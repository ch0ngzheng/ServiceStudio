/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dbs-red': {
          50: '#fee2e2',
          100: '#fecaca',
          200: '#fca5a5',
          300: '#f87171',
          400: '#ef4444',
          500: '#dc2626',   // Main DBS red
          600: '#b91c1c',   // Dark DBS red
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#450a0a',
        },
        primary: {
          50: '#fee2e2',
          100: '#fecaca',
          200: '#fca5a5',
          300: '#f87171',
          400: '#ef4444',
          500: '#dc2626',   // Main brand color
          600: '#b91c1c',   // Darker shade
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#450a0a',
        }
      },
    },
  },
  plugins: [],
}