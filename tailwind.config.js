/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            light: '#e8f5fe',
            DEFAULT: '#008BD3',
            hover: '#006CB7',
            sky: '#00A5EC',
          },
          gray: {
            light: '#f8f8f8',
            DEFAULT: '#8A8A8A',
            dark: '#333333',
            border: '#e0e0e0',
          },
          green: {
            light: '#e7f7f1',
            DEFAULT: '#129B73',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08)',
        'sidebar': '0 2px 10px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
