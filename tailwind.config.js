/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0050FF',
          secondary: '#00D9FF',
        },
        success: '#00C853',
        error: '#FF1744',
        warning: '#FFB300',
      },
    },
  },
  plugins: [],
}

