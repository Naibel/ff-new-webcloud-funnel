/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs OVHcloud officielles via variables ODS
        ovh: {
          blue: 'var(--ods-color-primary-500)',
          'blue-light': '#E6F0FF',
          'blue-dark': '#003DB3',
          cyan: '#00D9FF',
        },
        primary: {
          50: 'var(--ods-color-primary-050)',
          100: 'var(--ods-color-primary-100)',
          200: 'var(--ods-color-primary-200)',
          300: 'var(--ods-color-primary-300)',
          400: 'var(--ods-color-primary-400)',
          500: 'var(--ods-color-primary-500)',
          600: 'var(--ods-color-primary-600)',
          700: 'var(--ods-color-primary-700)',
          800: 'var(--ods-color-primary-800)',
          900: 'var(--ods-color-primary-900)',
          DEFAULT: 'var(--ods-color-primary-500)',
        },
        success: {
          50: '#E6F9EF',
          500: '#00C853',
          DEFAULT: '#00C853',
        },
        warning: {
          50: '#FFF8E6',
          500: '#FFB300',
          DEFAULT: '#FFB300',
        },
        critical: {
          50: '#FFE6EA',
          500: '#FF1744',
          DEFAULT: '#FF1744',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
