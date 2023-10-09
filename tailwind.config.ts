import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        accent: {
          DEFAULT: "#e74c3c",
          600: "#9A3247",
          500: "#b73b54",
          100: "#ffd700"
        },
        danger: "#f44336",
        gray: {
          100: "#f0f0ef",
          200: "#d0d2cf",
          300: "#b2b6b1",
          400: "#959992",
          500: "#787e75",
          600: "#60655d",
          700: "#4a4e48",
          800: "#353834",
          900: "#222421"
        },
        neutral: {
          100: "#f2f3f2",
          200: "#d8dad8",
          300: "#c0c3bf",
          400: "#a8aca6",
          500: "#91958f",
          600: "#757973",
          700: "#5a5e59",
          800: "#414340",
          900: "#2a2b29"
        },
        primary: {
          DEFAULT: "#426133",
          100: "#C1D9B6"
        },
        success: "#499847",
        warning: "#d09119",
      }
    },
  },
  plugins: [],
}
export default config
