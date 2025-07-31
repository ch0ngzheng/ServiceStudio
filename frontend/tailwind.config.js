/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#C1121F',
        'dark-blue': '#003049',
        'light-red-background': '#fca5a5',
        'dark-red': '#B31410',
        'text-dark-gray': '#213547',
        'text-medium-gray': '#4B5563',
        'text-darker-gray': '#1F2937',
        'text-darkest-gray': '#111827',
        'text-light-gray': '#6B7280',
        'border-light-gray': '#E5E7EB',
        'border-medium-gray': '#D1D5DB',
        'text-lighter-gray': '#9CA3AF',
        'text-black': '#000000',
        'light-gray-background': '#f9fafb',
        'lighter-gray-background': '#f3f4f6',
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
        'dbs-blue': {
          50: '#eff6ff',
          200: '#bfdbfe',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        'dbs-green': {
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          800: '#166534',
          900: '#14532d',
        },
        'dbs-indigo': {
          500: '#6366f1',
        },
        'dbs-yellow': {
          200: '#fde047',
          400: '#facc15',
          600: '#eab308',
        },
        'dbs-teal': {
          400: '#2dd4bf',
          500: '#14b8a6',
        },
        'dbs-navy': '#003049',
      }
    },
  },
  plugins: [],
}