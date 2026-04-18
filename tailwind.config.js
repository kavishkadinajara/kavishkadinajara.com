import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        display: ["var(--font-space-grotesk)", '"Space Grotesk"', "sans-serif"],
        mono:    ["var(--font-jetbrains-mono)", '"JetBrains Mono"', "monospace"],
        body:    ["var(--font-inter)", '"Inter"', "sans-serif"],
      },
      colors: {
        'bg-primary': '#050810',
        'bg-secondary': '#0A1020',
        'bg-card': '#0D1829',
        'accent-blue': '#0EA5E9',
        'accent-cyan': '#06B6D4',
        'accent-green': '#10B981',
        'text-primary': '#F0F4FF',
        'text-muted': '#8B9EC0',
      },
      animation: {
        'orbit': 'orbit 8s linear infinite',
        'orbit-reverse': 'orbit 12s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fadeIn': 'fadeIn 0.6s ease-out forwards',
        'slideUp': 'slideUp 0.6s ease-out forwards',
        'gradient-border': 'gradientBorder 3s ease infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        gradientBorder: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(14,165,233,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(14,165,233,0.05) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(14,165,233,0.4), 0 0 40px rgba(14,165,233,0.1)',
        'glow-cyan': '0 0 20px rgba(6,182,212,0.4), 0 0 40px rgba(6,182,212,0.1)',
        'glow-green': '0 0 20px rgba(16,185,129,0.4)',
        'card': '0 0 0 1px rgba(14,165,233,0.15), 0 4px 20px rgba(0,0,0,0.4)',
      },
      borderColor: {
        'accent': 'rgba(14,165,233,0.2)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    nextui(),
  ],
}
