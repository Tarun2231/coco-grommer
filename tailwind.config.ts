import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF6F0',
          100: '#F4ECE1',
          200: '#E8D8C3',
          300: '#D9C0A0',
          400: '#C8A379',
          500: '#B88652', // Main Warm Bronze / Gold Accent
          600: '#A16E3D',
          700: '#84532D',
          800: '#694125',
          900: '#52331F',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FAF8F5', // Soft background
          200: '#F5F1EA',
          300: '#ECE5DA',
        },
        sage: {
          50: '#F4F8F5',
          100: '#E4EFE8',
          500: '#4A7C59',
          700: '#2E523A',
        },
        blush: {
          50: '#FFF8F7',
          100: '#FDEEEB',
          500: '#E07A5F',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 25px rgba(184, 134, 82, 0.25)',
      }
    },
  },
  plugins: [],
};
export default config;
