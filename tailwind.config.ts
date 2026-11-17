/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: '#10B981',
          'emerald-dark': '#059669',
          'emerald-deep': '#047857',
          coral: '#F97316',
          'coral-dark': '#EA580C',
          charcoal: '#111827',
          ivory: '#FAFAF5',
          slate: '#1F2937',
          'slate-muted': '#64748B',
          mint: '#34D399',
          rose: '#F43F5E',
          amber: '#FBBF24',
          violet: '#A78BFA',
          'text-primary': '#0F172A',
          'text-secondary': '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
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
      },
    },
  },
  plugins: [],
};
