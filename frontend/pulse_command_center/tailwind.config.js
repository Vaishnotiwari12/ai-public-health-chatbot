/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // slate-200
        input: "var(--color-input)", // slate-200
        ring: "var(--color-ring)", // blue-700
        background: "var(--color-background)", // slate-50
        foreground: "var(--color-foreground)", // slate-900
        primary: {
          DEFAULT: "var(--color-primary)", // blue-700
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // teal-700
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-600
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // slate-100
          foreground: "var(--color-muted-foreground)", // slate-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // red-600
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // slate-900
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // slate-900
        },
        success: {
          DEFAULT: "var(--color-success)", // emerald-600
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-600
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-600
          foreground: "var(--color-error-foreground)", // white
        },
        // Brand-specific colors
        surface: "var(--color-surface)", // slate-100
        'text-primary': "var(--color-text-primary)", // slate-900
        'text-secondary': "var(--color-text-secondary)", // slate-600
        cta: {
          DEFAULT: "var(--color-cta)", // violet-600
          foreground: "var(--color-cta-foreground)", // white
        },
        trust: {
          DEFAULT: "var(--color-trust)", // cyan-600
          foreground: "var(--color-trust-foreground)", // white
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
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
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-vital": "pulse-vital 2s ease-in-out infinite",
        "urgent-pulse": "urgent-pulse 0.8s ease-in-out infinite",
        "success-pulse": "success-pulse 0.6s ease-out",
        "flow": "flow 3s linear infinite",
        "float": "float 4s ease-in-out infinite alternate",
        "pulse-monitor": "pulse-monitor 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-vital": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.08)",
            opacity: "0.8",
          },
        },
        "urgent-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(220, 38, 38, 0.4)",
          },
          "50%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 0 8px rgba(220, 38, 38, 0)",
          },
        },
        "success-pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "flow": {
          "0%": { strokeDashoffset: "100%" },
          "100%": { strokeDashoffset: "0%" },
        },
        "float": {
          "0%": {
            transform: "translateY(0px) rotate(0deg)",
            opacity: "0.7",
          },
          "100%": {
            transform: "translateY(-10px) rotate(5deg)",
            opacity: "1",
          },
        },
        "pulse-monitor": {
          "0%, 100%": {
            opacity: "1",
            transform: "scaleX(1)",
          },
          "50%": {
            opacity: "0.5",
            transform: "scaleX(0.95)",
          },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      boxShadow: {
        'medical': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'medical-lg': '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)',
        'authority': '0 0 20px rgba(5, 150, 105, 0.3)',
        'cta': '0 4px 12px rgba(124, 58, 237, 0.4)',
      },
      backdropBlur: {
        'medical': '8px',
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(280px, 1fr))',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}