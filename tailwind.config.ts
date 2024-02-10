import type { Config } from "tailwindcss"

const daisyuiColorObj = require('daisyui/src/theming/index')

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        border: daisyuiColorObj['base-content'],
        input: daisyuiColorObj['base-content'],
        ring: daisyuiColorObj['base-content'],
        background: daisyuiColorObj['base-100'],
        foreground: daisyuiColorObj['base-content'],
        primary: {
          DEFAULT: daisyuiColorObj['primary'],
          foreground: daisyuiColorObj['primary-content'],
        },
        secondary: {
          DEFAULT: daisyuiColorObj['secondary'],
          foreground: daisyuiColorObj['secondary-content'],
        },
        destructive: {
          DEFAULT: daisyuiColorObj['error'],
          foreground: daisyuiColorObj['error-content'],
        },
        muted: {
          DEFAULT: daisyuiColorObj['base-300'],
          foreground: daisyuiColorObj['base-content'],
        },
        accent: {
          DEFAULT: daisyuiColorObj['accent'],
          foreground: daisyuiColorObj['accent-content'],
        },
        popover: {
          DEFAULT: daisyuiColorObj['base-100'],
          foreground: daisyuiColorObj['base-content'],
        },
        card: {
          DEFAULT: daisyuiColorObj['base-100'],
          foreground: daisyuiColorObj['base-content'],
        },
      },
      borderRadius: {
        lg: 'var(--rounded-btn)',
        md: 'calc(var(--rounded-btn) - 2px)',
        sm: 'calc(var(--rounded-btn) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui"), require('@tailwindcss/typography')],
  daisyui: {
    themes: ["cupcake"]
  }
} satisfies Config

export default config