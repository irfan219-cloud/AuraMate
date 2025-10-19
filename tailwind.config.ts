import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          pink: '#FFB5E8',
          purple: '#DDA0DD',
          blue: '#B4E4FF',
          lavender: '#E0BBE4',
          peach: '#FFDFD3',
          mint: '#C7FFDA',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bloom': 'bloom 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bloom: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(180deg)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
