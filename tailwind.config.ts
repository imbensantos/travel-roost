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
          25: "#f8f8f8",
          50: "#f6f6f6",
          100: "#f2f3f2",
          200: "#e5e6e4",
          300: "#d8dad8",
          400: "#c0c3bf",
          500: "#91958f",
          600: "#757973",
          700: "#5a5e59",
          800: "#414340",
          900: "#2a2b29"
        },
        primary: {
          DEFAULT: "#426133",
          100: "#c3ccbf",
          200: "#9eab97",
          300: "#788c70",
          400: "#556d49",
          500: "#426133",
          600: "#37512a",
          700: "#2a3e21",
          800: "#1f2d18",
          900: "#141d0f"
        },
        secondary: {
          DEFAULT: "#C1D9B6",
          100: "#f8fbf7",
          200: "#eaf2e6",
          300: "#ddead7",
          400: "#d0e2c7",
          500: "#C1D9B6",
          600: "#95a58e",
          700: "#74806e",
          800: "#535c4f",
          900: "#363c33"
        },
        success: "#499847",
        warning: "#d09119",
      }
    },
  },
  plugins: [],
}
export default config
