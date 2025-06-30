/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary (Warm Brown) - Professional Trust
        primary: {
          50: '#faf8f6',
          100: '#f5f0eb',
          200: '#e8dccf',
          300: '#d4c0a8',
          400: '#b89a7a',
          500: '#8b5e3c',
          600: '#7a5234',
          700: '#6a472c',
          800: '#5a3c24',
          900: '#4a311c',
          950: '#3a2614',
        },
        
        // Secondary (Deep Brown / Espresso) - Sophistication
        secondary: {
          50: '#f8f6f5',
          100: '#f0ece9',
          200: '#e0d8d2',
          300: '#c8b8ad',
          400: '#a89482',
          500: '#5c4033',
          600: '#523a2e',
          700: '#483329',
          800: '#3e2c24',
          900: '#34251f',
          950: '#2a1e1a',
        },
        
        // Accent (Muted Orange) - Call-to-Action
        accent: {
          50: '#fef8f4',
          100: '#fdf0e7',
          200: '#fae0c9',
          300: '#f6c8a3',
          400: '#f0a875',
          500: '#d97a3e',
          600: '#c46e38',
          700: '#af6232',
          800: '#9a562c',
          900: '#854a26',
          950: '#703e20',
        },
        
        // Status Colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        
        // Neutral Colors
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        
        // Semantic Colors
        background: '#f5f5f5',
        'background-secondary': '#fafafa',
        'background-tertiary': '#f0f0f0',
        
        surface: '#ffffff',
        'surface-secondary': '#fafafa',
        'surface-tertiary': '#f5f5f5',
        'surface-elevated': '#ffffff',
        
        foreground: '#333333',
        'foreground-secondary': '#666666',
        'foreground-tertiary': '#999999',
        'foreground-muted': '#b0b0b0',
        
        border: '#b0b0b0',
        'border-secondary': '#c0c0c0',
        'border-tertiary': '#d0d0d0',
        
        // Philippine-specific colors
        'philippine-blue': '#0038a8',
        'philippine-red': '#ce1126',
        'philippine-gold': '#fcd116',
      },
      
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'strong': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(139, 94, 60, 0.3)',
        'glow-secondary': '0 0 20px rgba(92, 64, 51, 0.3)',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8b5e3c 0%, #7a5234 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #5c4033 0%, #523a2e 100%)',
        'gradient-accent': 'linear-gradient(135deg, #d97a3e 0%, #c46e38 100%)',
        'gradient-philippine': 'linear-gradient(135deg, #0038a8 0%, #ce1126 100%)',
      },
      
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}; 